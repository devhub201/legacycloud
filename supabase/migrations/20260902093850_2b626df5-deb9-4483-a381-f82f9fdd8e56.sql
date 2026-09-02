-- Reorder homepage sections to the new reference layout and add the new blocks
UPDATE public.page_sections SET sort_order = 10,
  eyebrow = 'Save on your first month',
  heading = 'Enterprise-grade cloud hosting built for growing teams',
  subheading = 'VPS, web, bot and business email hosting on fast NVMe infrastructure — instant deployment, honest pricing and real human support.',
  cta_label = 'Hosting plans & pricing', cta_href = '/pricing'
WHERE page='home' AND type='hero';

UPDATE public.page_sections SET sort_order = 30, heading = 'Enterprise-grade hosting solutions', subheading = 'Affordable, fast and secure hosting to help you grow at a pace best suited to your needs.' WHERE page='home' AND type='categories';
UPDATE public.page_sections SET sort_order = 40 WHERE page='home' AND type='stats';
UPDATE public.page_sections SET sort_order = 70, heading = 'Advantages of our hosting plans' WHERE page='home' AND type='features';
UPDATE public.page_sections SET sort_order = 80, heading = 'Straightforward pricing' WHERE page='home' AND type='plans';
UPDATE public.page_sections SET sort_order = 100 WHERE page='home' AND type='cta';

INSERT INTO public.page_sections (page, type, eyebrow, heading, subheading, items, sort_order, is_visible)
SELECT 'home', v.type, v.eyebrow, v.heading, v.subheading, '[]'::jsonb, v.sort_order, true
FROM (VALUES
  ('trust', NULL::text, NULL::text, NULL::text, 20),
  ('benefits', 'Why choose us', 'Everything you need to ship', NULL, 50),
  ('reviews', 'Trusted by builders', 'A better home for your workloads', NULL, 60),
  ('free', NULL, 'Start with an 8GB free server', NULL, 90)
) AS v(type, eyebrow, heading, subheading, sort_order)
WHERE NOT EXISTS (SELECT 1 FROM public.page_sections p WHERE p.page='home' AND p.type = v.type);