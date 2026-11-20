-- WEBFIKRA restaurant appearance profiles — backwards-compatible.
alter table public.wf_restaurants
  add column if not exists menu_layout text not null default 'grid'
    check (menu_layout in ('grid','list','compact')),
  add column if not exists font_style text not null default 'modern'
    check (font_style in ('modern','classic')),
  add column if not exists theme_background text not null default '#FBF7F0'
    check (theme_background ~ '^#[0-9A-Fa-f]{6}$'),
  add column if not exists theme_surface text not null default '#FFFFFF'
    check (theme_surface ~ '^#[0-9A-Fa-f]{6}$'),
  add column if not exists theme_text text not null default '#241B15'
    check (theme_text ~ '^#[0-9A-Fa-f]{6}$');

-- Anonymous visitors may read ONLY the public appearance settings of published restaurants.
grant select (menu_layout,font_style,theme_background,theme_surface,theme_text)
  on public.wf_restaurants to anon;
-- Existing authenticated owner RLS already restricts modification to owned restaurants.
