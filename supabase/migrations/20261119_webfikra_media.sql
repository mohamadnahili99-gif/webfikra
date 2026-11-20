-- WEBFIKRA menu media bucket. Apply after 20261119_webfikra_platform.sql.
-- Public READ-only images; authenticated owners may upload only to a path
-- under their own user ID and a restaurant they own.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'wf-menu-media', 'wf-menu-media', true, 5242880,
  array['image/png', 'image/jpeg', 'image/webp']
)
on conflict (id) do update
  set public = excluded.public,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists wf_media_owner_insert on storage.objects;
create policy wf_media_owner_insert on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'wf-menu-media'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and exists (
      select 1 from public.wf_restaurants r
      where r.id::text = (storage.foldername(name))[2]
        and r.owner_id = (select auth.uid())
    )
  );
-- Existing media can be read through the bucket's public URL; owners are not
-- granted delete or overwrite by the app. This prevents an accidental
-- upload from replacing an existing image.
