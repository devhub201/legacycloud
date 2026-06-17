
-- 1. Promote itscube847 to admin
INSERT INTO public.user_roles (user_id, role) 
VALUES ('b64a041d-34b6-4072-96a8-ac835a8946a8', 'admin') 
ON CONFLICT (user_id, role) DO NOTHING;

-- 2. free_panel_claims: add status, error, allow history
ALTER TABLE public.free_panel_claims DROP CONSTRAINT IF EXISTS free_panel_claims_user_id_key;
ALTER TABLE public.free_panel_claims ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'active';
ALTER TABLE public.free_panel_claims ADD COLUMN IF NOT EXISTS error_message text;
ALTER TABLE public.free_panel_claims ALTER COLUMN panel_user_id DROP NOT NULL;
ALTER TABLE public.free_panel_claims ALTER COLUMN panel_server_id DROP NOT NULL;
ALTER TABLE public.free_panel_claims ALTER COLUMN expires_at DROP NOT NULL;
CREATE UNIQUE INDEX IF NOT EXISTS free_panel_claims_one_active_per_user
  ON public.free_panel_claims (user_id)
  WHERE status IN ('queued','creating','active');

-- 3. free_panel_settings (singleton)
CREATE TABLE IF NOT EXISTS public.free_panel_settings (
  id int PRIMARY KEY DEFAULT 1,
  enabled boolean NOT NULL DEFAULT true,
  daily_quota int NOT NULL DEFAULT 50,
  per_user_limit int NOT NULL DEFAULT 1,
  min_account_age_hours int NOT NULL DEFAULT 0,
  expiry_days int NOT NULL DEFAULT 45,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT one_row CHECK (id = 1)
);
GRANT SELECT ON public.free_panel_settings TO authenticated, anon;
GRANT ALL ON public.free_panel_settings TO service_role;
ALTER TABLE public.free_panel_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "anyone read settings" ON public.free_panel_settings FOR SELECT USING (true);
CREATE POLICY "admins manage settings" ON public.free_panel_settings FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
INSERT INTO public.free_panel_settings (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

-- 4. activity_logs
CREATE TABLE IF NOT EXISTS public.activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email text,
  action text NOT NULL,
  target text,
  details jsonb,
  ip text,
  user_agent text,
  level text NOT NULL DEFAULT 'info',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.activity_logs TO authenticated;
GRANT ALL ON public.activity_logs TO service_role;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "admins read logs" ON public.activity_logs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));
CREATE INDEX IF NOT EXISTS activity_logs_created_idx ON public.activity_logs (created_at DESC);
CREATE INDEX IF NOT EXISTS activity_logs_user_idx ON public.activity_logs (user_id);

-- 5. Allow user to read their own claims history
DROP POLICY IF EXISTS "users read own claims" ON public.free_panel_claims;
CREATE POLICY "users read own claims" ON public.free_panel_claims FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
