-- WEBFIKRA restaurant platform — run once in Supabase SQL editor before enabling the portal.
-- Uses Supabase Auth for identities and RLS for restaurant-level isolation.
create extension if not exists pgcrypto;

create table if not exists public.wf_restaurants (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  slug text not null unique check (slug ~ '^[a-z0-9][a-z0-9-]{2,39}$'),
  name text not null check (char_length(name) between 2 and 100),
  description text not null default '' check (char_length(description) <= 1200),
  whatsapp text not null check (whatsapp ~ '^[0-9]{7,15}$'),
  address text not null default '' check (char_length(address) <= 300),
  hours text not null default '' check (char_length(hours) <= 300),
  instagram text not null default '' check (char_length(instagram) <= 250),
  tiktok text not null default '' check (char_length(tiktok) <= 250),
  logo_url text not null default '' check (char_length(logo_url) <= 1000),
  cover_url text not null default '' check (char_length(cover_url) <= 1000),
  accent_color text not null default '#EF9754' check (accent_color ~ '^#[0-9A-Fa-f]{6}$'),
  currency text not null default 'USD' check (currency in ('USD', 'LBP')),
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.wf_categories (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.wf_restaurants(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 90),
  position integer not null default 0 check (position between 0 and 9999),
  visible boolean not null default true
);

create table if not exists public.wf_items (
  id uuid primary key default gen_random_uuid(),
  restaurant_id uuid not null references public.wf_restaurants(id) on delete cascade,
  category_id uuid not null references public.wf_categories(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  description text not null default '' check (char_length(description) <= 1000),
  price numeric(12,2) not null check (price >= 0 and price <= 9999999999.99),
  image_url text not null default '' check (char_length(image_url) <= 1000),
  visible boolean not null default true,
  position integer not null default 0 check (position between 0 and 9999),
  created_at timestamptz not null default now()
);

-- Prevent cross-restaurant category assignment even for an authenticated owner.
create or replace function public.wf_validate_item_category()
returns trigger language plpgsql set search_path = '' as $$
begin
  if not exists (
    select 1 from public.wf_categories
    where id = new.category_id and restaurant_id = new.restaurant_id
  ) then
    raise exception 'Category does not belong to this restaurant';
  end if;
  return new;
end $$;
drop trigger if exists wf_item_category_guard on public.wf_items;
create trigger wf_item_category_guard
  before insert or update of category_id, restaurant_id on public.wf_items
  for each row execute function public.wf_validate_item_category();

create or replace function public.wf_restaurant_touch()
returns trigger language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  return new;
end $$;
drop trigger if exists wf_restaurant_updated on public.wf_restaurants;
create trigger wf_restaurant_updated
  before update on public.wf_restaurants
  for each row execute function public.wf_restaurant_touch();

create index if not exists wf_restaurant_owner_idx on public.wf_restaurants(owner_id);
create index if not exists wf_categories_restaurant_idx on public.wf_categories(restaurant_id, position);
create index if not exists wf_items_restaurant_idx on public.wf_items(restaurant_id, category_id, position);

alter table public.wf_restaurants enable row level security;
alter table public.wf_categories enable row level security;
alter table public.wf_items enable row level security;

-- Explicit privileges; never expose privileged keys in the browser.
revoke all on public.wf_restaurants, public.wf_categories, public.wf_items from public;
-- Restrict anonymous queries to public menu columns; never expose owner_id.
grant select (id, slug, name, description, whatsapp, address, hours, instagram, tiktok,
              logo_url, cover_url, accent_color, currency, published)
on public.wf_restaurants to anon;
grant select (id, restaurant_id, name, position, visible)
on public.wf_categories to anon;
grant select (id, restaurant_id, category_id, name, description, price, image_url, position, visible)
on public.wf_items to anon;
grant select, insert, update, delete on public.wf_restaurants, public.wf_categories, public.wf_items to authenticated;

drop policy if exists wf_restaurants_public_read on public.wf_restaurants;
create policy wf_restaurants_public_read on public.wf_restaurants for select to anon, authenticated
using (published = true);

drop policy if exists wf_restaurants_owner_read on public.wf_restaurants;
create policy wf_restaurants_owner_read on public.wf_restaurants for select to authenticated
using (owner_id = (select auth.uid()));
drop policy if exists wf_restaurants_owner_insert on public.wf_restaurants;
create policy wf_restaurants_owner_insert on public.wf_restaurants for insert to authenticated
with check (owner_id = (select auth.uid()));
drop policy if exists wf_restaurants_owner_update on public.wf_restaurants;
create policy wf_restaurants_owner_update on public.wf_restaurants for update to authenticated
using (owner_id = (select auth.uid()))
with check (owner_id = (select auth.uid()));
drop policy if exists wf_restaurants_owner_delete on public.wf_restaurants;
create policy wf_restaurants_owner_delete on public.wf_restaurants for delete to authenticated
using (owner_id = (select auth.uid()));

drop policy if exists wf_categories_public_read on public.wf_categories;
create policy wf_categories_public_read on public.wf_categories for select to anon, authenticated
using (
  visible and exists (
    select 1 from public.wf_restaurants r
    where r.id = restaurant_id and r.published
  )
);
drop policy if exists wf_categories_owner_read on public.wf_categories;
create policy wf_categories_owner_read on public.wf_categories for select to authenticated
using (
  exists (select 1 from public.wf_restaurants r
          where r.id = restaurant_id and r.owner_id = (select auth.uid()))
);
drop policy if exists wf_categories_owner_insert on public.wf_categories;
create policy wf_categories_owner_insert on public.wf_categories for insert to authenticated
with check (
  exists (select 1 from public.wf_restaurants r
          where r.id = restaurant_id and r.owner_id = (select auth.uid()))
);
drop policy if exists wf_categories_owner_update on public.wf_categories;
create policy wf_categories_owner_update on public.wf_categories for update to authenticated
using (
  exists (select 1 from public.wf_restaurants r
          where r.id = restaurant_id and r.owner_id = (select auth.uid()))
)
with check (
  exists (select 1 from public.wf_restaurants r
          where r.id = restaurant_id and r.owner_id = (select auth.uid()))
);
drop policy if exists wf_categories_owner_delete on public.wf_categories;
create policy wf_categories_owner_delete on public.wf_categories for delete to authenticated
using (
  exists (select 1 from public.wf_restaurants r
          where r.id = restaurant_id and r.owner_id = (select auth.uid()))
);

drop policy if exists wf_items_public_read on public.wf_items;
create policy wf_items_public_read on public.wf_items for select to anon, authenticated
using (
  visible and exists (
    select 1 from public.wf_restaurants r
    where r.id = restaurant_id and r.published
  )
  and exists (
    select 1 from public.wf_categories c
    where c.id = category_id and c.visible
  )
);
drop policy if exists wf_items_owner_read on public.wf_items;
create policy wf_items_owner_read on public.wf_items for select to authenticated
using (
  exists (select 1 from public.wf_restaurants r
          where r.id = restaurant_id and r.owner_id = (select auth.uid()))
);
drop policy if exists wf_items_owner_insert on public.wf_items;
create policy wf_items_owner_insert on public.wf_items for insert to authenticated
with check (
  exists (select 1 from public.wf_restaurants r
          where r.id = restaurant_id and r.owner_id = (select auth.uid()))
);
drop policy if exists wf_items_owner_update on public.wf_items;
create policy wf_items_owner_update on public.wf_items for update to authenticated
using (
  exists (select 1 from public.wf_restaurants r
          where r.id = restaurant_id and r.owner_id = (select auth.uid()))
)
with check (
  exists (select 1 from public.wf_restaurants r
          where r.id = restaurant_id and r.owner_id = (select auth.uid()))
);
drop policy if exists wf_items_owner_delete on public.wf_items;
create policy wf_items_owner_delete on public.wf_items for delete to authenticated
using (
  exists (select 1 from public.wf_restaurants r
          where r.id = restaurant_id and r.owner_id = (select auth.uid()))
);
