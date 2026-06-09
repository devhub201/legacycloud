
ALTER TABLE public.services 
  ADD COLUMN IF NOT EXISTS auto_renew boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS auto_renew_cycle_months integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS reminder_7d_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS reminder_3d_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS reminder_1d_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_auto_renew_at timestamptz,
  ADD COLUMN IF NOT EXISTS last_auto_renew_status text;

CREATE INDEX IF NOT EXISTS services_expires_at_idx ON public.services(expires_at) WHERE status = 'active';

-- Allow users to update their own services' auto_renew settings (other fields restricted via app/admin)
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE schemaname='public' AND tablename='services' AND policyname='Users can update own service auto_renew') THEN
    CREATE POLICY "Users can update own service auto_renew" ON public.services
      FOR UPDATE TO authenticated
      USING (auth.uid() = user_id)
      WITH CHECK (auth.uid() = user_id);
  END IF;
END $$;
