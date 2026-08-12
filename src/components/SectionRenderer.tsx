import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, MessageCircle } from "lucide-react";
import { iconByName } from "@/lib/icons";
import type { Category, DbPlan, Section } from "@/lib/catalog";
import PlanCard from "@/components/PlanCard";
import hero3d from "@/assets/hero-3d.png";

function Heading({ s }: { s: Section }) {
  if (!s.heading && !s.eyebrow) return null;
  return (
    <div className="text-center mb-10">
      {s.eyebrow && (
        <span className="inline-block glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-3">{s.eyebrow}</span>
      )}
      {s.heading && (
        <h2 className="font-display text-2xl md:text-4xl font-bold">
          <span className="text-gradient-anim">{s.heading}</span>
        </h2>
      )}
      {s.subheading && <p className="text-muted-foreground mt-3 max-w-2xl mx-auto text-sm md:text-base">{s.subheading}</p>}
    </div>
  );
}

function Hero({ s }: { s: Section }) {
  return (
    <section className="relative max-w-6xl mx-auto px-6 pt-14 pb-16">
      <div aria-hidden className="absolute inset-0 grid-backdrop -z-10" />
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {s.eyebrow && (
            <span className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-xs text-muted-foreground mb-5">
              <Rocket className="w-3.5 h-3.5 text-primary" /> {s.eyebrow}
            </span>
          )}
          <h1 className="font-display text-4xl md:text-6xl font-bold leading-[1.05] mb-5">
            <span className="text-gradient-anim">{s.heading ?? "Legacy Cloud"}</span>
          </h1>
          {s.subheading && <p className="text-muted-foreground text-base md:text-lg max-w-xl mb-8">{s.subheading}</p>}
          <div className="flex flex-wrap gap-3">
            <Link
              to={s.cta_href ?? "/pricing"}
              className="grad-btn text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:brightness-110 transition"
            >
              {s.cta_label ?? "Get Started"} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/status" className="glass px-6 py-3 rounded-xl text-sm font-semibold hover:bg-secondary transition">
              Live status
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative animate-float-slow"
        >
          <img
            src={s.image_url || hero3d}
            alt="Legacy Cloud infrastructure illustration"
            className="w-full rounded-3xl ring-glow-blossom"
            loading="eager"
          />
        </motion.div>
      </div>
    </section>
  );
}

function Stats({ s }: { s: Section }) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {s.items.map((it: any, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl p-5 text-center hover-lift"
          >
            <div className="font-display text-2xl md:text-3xl font-bold text-gradient-blossom">{it.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{it.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Features({ s }: { s: Section }) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <Heading s={s} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {s.items.map((it: any, i: number) => {
          const Icon = iconByName(it.icon);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-5 hover-lift"
            >
              <span className={`icon-tile ${it.tone ?? ""} w-11 h-11 mb-4 icon-hover`}><Icon className="w-5 h-5" /></span>
              <h3 className="font-display font-bold mb-1.5">{it.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function CategoriesGrid({ s, categories }: { s: Section; categories: Category[] }) {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <Heading s={s} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c, i) => {
          const Icon = iconByName(c.icon);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/hosting/${c.slug}`} className="block glass rounded-2xl p-5 card-3d hover-lift h-full">
                {c.image_url && <span aria-hidden className="card-art" style={{ backgroundImage: `url(${c.image_url})` }} />}
                <span aria-hidden className="card-sheen" />
                <div className="relative">
                  <span className={`icon-tile ${c.tone} w-11 h-11 mb-4 icon-hover`}><Icon className="w-5 h-5" /></span>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display font-bold">{c.name}</h3>
                    {c.rate_label && <span className="text-xs text-gradient-blossom font-semibold">{c.rate_label}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1.5">{c.tagline ?? c.description}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary font-medium">
                    View plans <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function PopularPlans({ s, categories, plans }: { s: Section; categories: Category[]; plans: DbPlan[] }) {
  const popular = plans.filter((p) => p.is_popular).slice(0, 3);
  const list = popular.length ? popular : plans.slice(0, 3);
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <Heading s={s} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p, i) => {
          const cat = categories.find((c) => c.id === p.category_id);
          return <PlanCard key={p.id} plan={p} index={i} group={cat?.name ?? "Plan"} art={cat?.image_url} tone={cat?.tone ?? ""} />;
        })}
      </div>
      <div className="text-center mt-8">
        <Link to="/pricing" className="glass px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-secondary transition">
          See all plans <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}

function RichText({ s }: { s: Section }) {
  return (
    <section className="max-w-4xl mx-auto px-6 pb-16">
      <Heading s={s} />
      {s.body && <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed text-center">{s.body}</p>}
    </section>
  );
}

function Cta({ s }: { s: Section }) {
  return (
    <section className="max-w-5xl mx-auto px-6 pb-24">
      <div className="glass rounded-3xl p-8 md:p-12 text-center ring-glow-blossom relative overflow-hidden">
        <span aria-hidden className="absolute inset-0 animate-shimmer" />
        <div className="relative">
          <span className="icon-tile tone-cyan w-14 h-14 mx-auto mb-5"><MessageCircle className="w-6 h-6" /></span>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-3">{s.heading}</h2>
          {s.subheading && <p className="text-muted-foreground max-w-xl mx-auto mb-7">{s.subheading}</p>}
          <a
            href={s.cta_href ?? "#"}
            target="_blank"
            rel="noreferrer"
            className="grad-btn text-primary-foreground px-7 py-3.5 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:brightness-110 transition"
          >
            {s.cta_label ?? "Join"} <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

export default function SectionRenderer({
  sections,
  categories,
  plans,
}: {
  sections: Section[];
  categories: Category[];
  plans: DbPlan[];
}) {
  return (
    <>
      {sections.map((s) => {
        switch (s.type) {
          case "hero": return <Hero key={s.id} s={s} />;
          case "stats": return <Stats key={s.id} s={s} />;
          case "features": return <Features key={s.id} s={s} />;
          case "categories": return <CategoriesGrid key={s.id} s={s} categories={categories} />;
          case "plans": return <PopularPlans key={s.id} s={s} categories={categories} plans={plans} />;
          case "cta": return <Cta key={s.id} s={s} />;
          case "text": return <RichText key={s.id} s={s} />;
          default: return <RichText key={s.id} s={s} />;
        }
      })}
    </>
  );
}

export const SECTION_TYPES = ["hero", "stats", "features", "categories", "plans", "cta", "text"];
