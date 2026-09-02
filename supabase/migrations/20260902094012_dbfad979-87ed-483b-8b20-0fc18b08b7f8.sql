UPDATE public.product_plans
SET name = '8GB Free Tier',
    ram = '8 GB RAM',
    storage = '8 GB NVMe',
    features = '["8 GB RAM Guaranteed","8 GB NVMe Storage","150% CPU","Full Pterodactyl Panel","Unlimited Player Slots","Sub-10ms Latency & DDoS Shield"]'::jsonb
WHERE name ILIKE '%free tier%';