REVOKE ALL ON FUNCTION public.grant_owner_admin() FROM anon, authenticated;
REVOKE ALL ON FUNCTION public.has_role(uuid, public.app_role) FROM anon;