INSERT INTO public.site_settings (key, value) VALUES
('theme', '{"background":"215 65% 6%","primary":"217 100% 59%","primaryGlow":"203 100% 74%","accent":"197 92% 62%","radius":"1rem"}'::jsonb),
('brand', '{"name":"Legacy Cloud","tagline":"Full-stack SaaS hosting cloud","discord":"https://discord.gg/YFNWrZ68Dv","logoText":"Legacy Cloud"}'::jsonb),
('appearance', '{"backgroundImage":"/background.png","backgroundOpacity":0.35,"particles":"bubbles"}'::jsonb)
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.product_categories (slug, name, kind, tagline, description, icon, tone, rate_label, sort_order) VALUES
('minecraft-budget','Minecraft Budget','game','SMPs with friends','Shared Ryzen power with unlimited slots and full panel access.','Boxes','', '₹15 / GB', 10),
('minecraft-premium','Minecraft Premium','game','Modpacks & networks','Ryzen 9 + DDR5 for heavy modpacks and public networks.','Flame','tone-violet','₹20 / GB', 20),
('vps-budget','VPS Budget','vps','Bots, panels, dev','Full root KVM virtual servers on NVMe storage.','Server','tone-cyan','₹40 / GB', 30),
('vps-premium','VPS Premium','vps','Dedicated cores','Dedicated vCores, DDR5 memory and enterprise NVMe.','Cpu','tone-mint','₹65 / GB', 40),
('web-hosting','Web Hosting','web','Sites & domains','cPanel-style hosting with free SSL, email and domain support.','Globe','tone-amber','from ₹99 / mo', 50),
('saas-apps','SaaS Apps','saas','Bots, storage, licenses','Managed app hosting for Discord bots, panels and storage buckets.','Sparkles','tone-violet','from ₹49 / mo', 60)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.product_plans (category_id, name, icon, ram, cpu, storage, price, features, is_popular, sort_order)
SELECT c.id, p.name, p.icon, p.ram, p.cpu, p.storage, p.price, p.features::jsonb, p.pop, p.ord
FROM public.product_categories c
JOIN (VALUES
('minecraft-budget','Dirt','Boxes','2 GB','100% CPU','10 GB NVMe',30,'["1 Database","Unlimited Slots"]',false,10),
('minecraft-budget','Stone','Mountain','4 GB','150% CPU','20 GB NVMe',60,'["2 Databases","Full FTP Access"]',false,20),
('minecraft-budget','Iron','Shield','6 GB','200% CPU','30 GB NVMe',90,'["3 Databases","DDoS Protection"]',true,30),
('minecraft-budget','Gold','Crown','8 GB','250% CPU','40 GB NVMe',120,'["4 Databases","Daily Backups"]',false,40),
('minecraft-budget','Diamond','Gem','12 GB','300% CPU','60 GB NVMe',180,'["6 Databases","Priority Support"]',false,50),
('minecraft-budget','Netherite','Flame','16 GB','400% CPU','80 GB NVMe',240,'["Unlimited DBs","Priority Support"]',false,60),
('minecraft-premium','Dirt','Boxes','4 GB','200% CPU','25 GB NVMe',80,'["Ryzen 9 5950X","2 Databases"]',false,10),
('minecraft-premium','Stone','Mountain','6 GB','250% CPU','40 GB NVMe',120,'["Ryzen 9 5950X","Daily Backups"]',false,20),
('minecraft-premium','Iron','Shield','8 GB','300% CPU','60 GB NVMe',160,'["DDR5 Memory","Daily Backups"]',true,30),
('minecraft-premium','Gold','Crown','12 GB','400% CPU','80 GB NVMe',240,'["DDR5 Memory","Free Subdomain"]',false,40),
('minecraft-premium','Diamond','Gem','16 GB','500% CPU','120 GB NVMe',320,'["Dedicated IP option","Priority Support"]',false,50),
('minecraft-premium','Netherite','Flame','24 GB','600% CPU','160 GB NVMe',480,'["Dedicated IP option","24/7 Priority"]',false,60),
('vps-budget','VPS-2','Server','2 GB','1 vCore','25 GB NVMe',80,'["Full Root","1 Gbps Port"]',false,10),
('vps-budget','VPS-4','Server','4 GB','2 vCore','50 GB NVMe',160,'["Full Root","Free OS Reinstall"]',true,20),
('vps-budget','VPS-8','Server','8 GB','4 vCore','100 GB NVMe',320,'["Full Root","DDoS Protection"]',false,30),
('vps-budget','VPS-16','Server','16 GB','6 vCore','200 GB NVMe',640,'["Full Root","Snapshot Support"]',false,40),
('vps-premium','Pro-4','Zap','4 GB','2 dedicated vCore','80 GB NVMe',260,'["Ryzen 9 Dedicated","DDR5"]',false,10),
('vps-premium','Pro-8','Zap','8 GB','4 dedicated vCore','160 GB NVMe',520,'["Ryzen 9 Dedicated","DDR5"]',true,20),
('vps-premium','Pro-16','Zap','16 GB','6 dedicated vCore','300 GB NVMe',1040,'["Dedicated IP","Daily Snapshots"]',false,30),
('vps-premium','Pro-32','Zap','32 GB','8 dedicated vCore','500 GB NVMe',2080,'["Dedicated IP","24/7 Priority"]',false,40),
('web-hosting','Starter','Globe','1 GB','1 vCore','10 GB SSD',99,'["1 Website","Free SSL","5 Email accounts"]',false,10),
('web-hosting','Business','Globe','2 GB','2 vCore','40 GB SSD',249,'["10 Websites","Free SSL","Free domain 1st year"]',true,20),
('web-hosting','Agency','Globe','4 GB','4 vCore','100 GB SSD',549,'["Unlimited Websites","Daily Backups","Priority Support"]',false,30),
('saas-apps','Bot Lite','Bot','512 MB','50% CPU','5 GB SSD',49,'["1 Bot","Auto restart"]',false,10),
('saas-apps','Bot Pro','Bot','2 GB','150% CPU','20 GB SSD',149,'["3 Bots","Logs & metrics"]',true,20),
('saas-apps','Storage Cloud','HardDrive','—','—','250 GB S3',299,'["S3 API","Public buckets","CDN"]',false,30)
) AS p(slug,name,icon,ram,cpu,storage,price,features,pop,ord) ON p.slug = c.slug;

INSERT INTO public.page_sections (page, type, eyebrow, heading, subheading, cta_label, cta_href, items, sort_order) VALUES
('home','hero','Full-stack SaaS hosting','Deploy anything on Legacy Cloud','Game servers, VPS, web hosting and managed SaaS apps — one cloud, one dashboard, Indian latency.','Get Started','/pricing','[]'::jsonb,10),
('home','stats',NULL,NULL,NULL,NULL,NULL,'[{"label":"Uptime","value":"99.9%"},{"label":"Deploys","value":"12k+"},{"label":"Regions","value":"4"},{"label":"Support","value":"24/7"}]'::jsonb,20),
('home','features','Why Legacy Cloud','Built for builders','Everything you need to launch, scale and monitor your workloads.',NULL,NULL,'[{"icon":"Zap","title":"Instant deploy","text":"Servers live in under 60 seconds with automated provisioning.","tone":""},{"icon":"ShieldCheck","title":"DDoS protected","text":"Always-on filtering on every node, no extra cost.","tone":"tone-cyan"},{"icon":"Gauge","title":"NVMe + DDR5","text":"Ryzen 9 nodes with enterprise NVMe for real performance.","tone":"tone-violet"},{"icon":"Headphones","title":"Human support","text":"Real engineers on Discord, day and night.","tone":"tone-mint"}]'::jsonb,30),
('home','categories','Catalog','Pick your cloud','Every category is managed live from the admin panel.',NULL,NULL,'[]'::jsonb,40),
('home','plans','Popular plans','Straightforward pricing','Transparent per-GB pricing in ₹ or $.',NULL,NULL,'[]'::jsonb,50),
('home','cta','Community','Join the Legacy Cloud Discord','Sales, support and status updates happen in our server.','Join Discord','https://discord.gg/YFNWrZ68Dv','[]'::jsonb,60);