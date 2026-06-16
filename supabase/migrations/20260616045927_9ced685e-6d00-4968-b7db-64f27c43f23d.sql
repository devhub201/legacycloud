
ALTER TABLE public.services
  ADD COLUMN IF NOT EXISTS panel_type text,
  ADD COLUMN IF NOT EXISTS panel_url text,
  ADD COLUMN IF NOT EXISTS panel_server_id integer,
  ADD COLUMN IF NOT EXISTS panel_server_identifier text,
  ADD COLUMN IF NOT EXISTS panel_user_id integer,
  ADD COLUMN IF NOT EXISTS panel_username text,
  ADD COLUMN IF NOT EXISTS panel_password text,
  ADD COLUMN IF NOT EXISTS provisioned_at timestamptz;

CREATE TABLE IF NOT EXISTS public.free_panel_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  panel_url text NOT NULL,
  panel_user_id integer,
  panel_username text,
  panel_password text,
  panel_server_id integer,
  panel_server_identifier text,
  ram_mb integer NOT NULL DEFAULT 2048,
  disk_mb integer NOT NULL DEFAULT 4096,
  cpu_pct integer NOT NULL DEFAULT 40,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.free_panel_claims TO authenticated;
GRANT ALL ON public.free_panel_claims TO service_role;

ALTER TABLE public.free_panel_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view their own free claim"
  ON public.free_panel_claims FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

CREATE TRIGGER update_free_panel_claims_updated_at
  BEFORE UPDATE ON public.free_panel_claims
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
