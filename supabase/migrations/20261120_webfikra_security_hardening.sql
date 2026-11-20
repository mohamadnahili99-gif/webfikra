-- WEBFIKRA security hardening applied to Supabase on 2026-11-20.
-- RLS does not protect TRUNCATE; explicitly withdraw unsafe default table privileges.
REVOKE TRUNCATE, TRIGGER, REFERENCES
ON TABLE public.wf_restaurants, public.wf_categories, public.wf_items
FROM PUBLIC, anon, authenticated;

-- The previous storage policy accidentally resolved "name" to wf_restaurants.name
-- inside the correlated subquery. Qualify storage.objects.name explicitly.
DROP POLICY IF EXISTS wf_media_owner_insert ON storage.objects;
CREATE POLICY wf_media_owner_insert ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (
    bucket_id = 'wf-menu-media'
    AND (storage.foldername(storage.objects.name))[1] = (SELECT auth.uid())::text
    AND EXISTS (
      SELECT 1 FROM public.wf_restaurants AS r
      WHERE r.id::text = (storage.foldername(storage.objects.name))[2]
        AND r.owner_id = (SELECT auth.uid())
    )
  );
