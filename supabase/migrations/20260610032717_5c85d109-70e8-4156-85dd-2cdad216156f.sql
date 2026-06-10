
-- REVIEWS
CREATE TABLE public.reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  username TEXT NOT NULL,
  rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  is_approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.reviews TO anon, authenticated;
GRANT INSERT ON public.reviews TO authenticated;
GRANT ALL ON public.reviews TO service_role;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Approved reviews are public" ON public.reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Users can submit reviews" ON public.reviews FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins manage reviews" ON public.reviews FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_reviews_updated BEFORE UPDATE ON public.reviews FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- SERVICE STATUS
CREATE TABLE public.service_status (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'operational' CHECK (status IN ('operational','degraded','down','maintenance')),
  message TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.service_status TO anon, authenticated;
GRANT ALL ON public.service_status TO service_role;
ALTER TABLE public.service_status ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Status is public" ON public.service_status FOR SELECT USING (true);
CREATE POLICY "Admins manage status" ON public.service_status FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER trg_status_updated BEFORE UPDATE ON public.service_status FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.service_status (name, status, sort_order) VALUES
  ('Website', 'operational', 1),
  ('Minecraft Hosting', 'operational', 2),
  ('VPS Nodes', 'operational', 3),
  ('API', 'operational', 4),
  ('Billing', 'operational', 5);

-- PUBLIC STATS RPC (counts only, no PII)
CREATE OR REPLACE FUNCTION public.get_homepage_stats()
RETURNS JSON
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
  SELECT json_build_object(
    'total_users', (SELECT count(*) FROM public.profiles),
    'total_services', (SELECT count(*) FROM public.services WHERE plan_type = 'mc'),
    'total_vps', (SELECT count(*) FROM public.services WHERE plan_type = 'vps'),
    'active_customers', (SELECT count(DISTINCT user_id) FROM public.services WHERE status = 'active'),
    'tickets_solved', (SELECT count(*) FROM public.support_tickets WHERE status IN ('closed','resolved')),
    'uptime_pct', 99.9
  );
$$;
GRANT EXECUTE ON FUNCTION public.get_homepage_stats() TO anon, authenticated;

-- Seed a few approved reviews so homepage isn't empty on day 1
INSERT INTO public.reviews (username, rating, comment, is_approved) VALUES
  ('AryanGamer', 5, 'Best Minecraft hosting in India! Lag-free SMP with 30+ players.', true),
  ('NotGamer', 5, 'Switched from another host — Legacy Cloud VPS is way faster for the price.', true),
  ('SkyblockKing', 4, 'Setup was instant, support replied on Discord in 5 mins.', true),
  ('ProPlayer', 5, 'Cheap pricing but enterprise-grade NVMe. Renewing for sure.', true);
