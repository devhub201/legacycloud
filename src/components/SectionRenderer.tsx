import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Rocket, MessageCircle, ShieldCheck, Zap, Globe2, Server, Bot, Mail, HardDrive, Check, Play, Users, Headphones, CloudCog } from "lucide-react";
import { iconByName } from "@/lib/icons";
import type { Category, DbPlan, Section } from "@/lib/catalog";
import PlanCard from "@/components/PlanCard";
import hero3d from "@/assets/hero-3d.png";
import heroCloud from "@/assets/hero-cloud-infrastructure.png";

const FALLBACK_CATEGORIES = [
  { slug: "vps-budget", name: "VPS Hosting", tagline: "Root access, predictable performance", description: "KVM virtual servers for apps, panels and production workloads.", icon: "Server", tone: "tone-cyan", rate_label: "from ₹80/mo" },
  { slug: "web-hosting", name: "Web Hosting", tagline: "Fast sites. Zero busywork.", description: "Managed hosting with SSL, mailboxes, backups and a simple control panel.", icon: "Globe", tone: "tone-mint", rate_label: "from ₹99/mo" },
  { slug: "saas-apps", name: "Bot Hosting", tagline: "Keep your automations online", description: "Reliable runtime for Discord bots, APIs, workers and scheduled jobs.", icon: "Bot", tone: "tone-violet", rate_label: "from ₹49/mo" },
  { slug: "email-hosting", name: "Business Email", tagline: "Professional inboxes for your team", description: "Branded email with spam protection, storage and dependable delivery.", icon: "Mail", tone: "tone-amber", rate_label: "from ₹79/mo" },
];

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
    <section className="relative max-w-6xl mx-auto px-6 pt-16 pb-12 md:pt-24 md:pb-20">
      <div aria-hidden className="absolute inset-0 grid-backdrop -z-10" />
      <div className="grid lg:grid-cols-[1.02fr_.98fr] gap-10 lg:gap-14 items-center">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {s.eyebrow && (
            <span className="inline-flex items-center gap-2 glass rounded-full px-3.5 py-1.5 text-xs text-muted-foreground mb-5">
              <Rocket className="w-3.5 h-3.5 text-primary" /> {s.eyebrow}
            </span>
          )}
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-bold leading-[1.02] tracking-tight mb-5 max-w-3xl">
            {s.heading ?? "Cloud hosting built for what’s next"}
          </h1>
          {s.subheading && <p className="text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed mb-8">{s.subheading}</p>}
          <div className="flex flex-wrap gap-3">
            <Link
              to={s.cta_href ?? "/pricing"}
              className="grad-btn text-primary-foreground px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:brightness-110 transition"
            >
              {s.cta_label ?? "Get Started"} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/features" className="glass px-6 py-3 rounded-xl text-sm font-semibold hover:bg-secondary transition inline-flex items-center gap-2">
              <Play className="w-4 h-4 text-primary" /> Explore platform
            </Link>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-8 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-success" /> 99.9% uptime SLA</span>
            <span className="inline-flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Instant deployment</span>
            <span className="inline-flex items-center gap-2"><Headphones className="w-4 h-4 text-accent" /> Human support</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative animate-float-slow"
        >
          <div className="relative hero-visual">
            <div aria-hidden className="hero-visual-glow" />
            <img
            src={s.image_url || heroCloud || hero3d}
            alt="Legacy Cloud infrastructure illustration"
            width={1200}
            height={912}
            className="relative z-10 w-full object-contain"
            loading="eager"
            />
            <div className="absolute z-20 left-2 bottom-7 sm:left-0 glass-pro rounded-xl px-3.5 py-3 hero-float-card">
              <div className="flex items-center gap-2 text-xs font-medium"><span className="status-dot" /> All systems operational</div>
              <div className="text-[11px] text-muted-foreground mt-1">Mumbai · Singapore · Frankfurt</div>
            </div>
            <div className="absolute z-20 right-0 top-8 glass-pro rounded-xl px-3.5 py-3 hero-float-card hero-float-card-delay">
              <div className="text-[11px] text-muted-foreground">Deploy in</div>
              <div className="font-display font-bold text-lg text-gradient-blossom">&lt; 60 sec</div>
            </div>
          </div>
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

function TrustStrip() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <div className="trust-strip flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-xs text-muted-foreground">
        <span className="uppercase tracking-[.2em] text-[10px]">Powering the next wave of builders</span>
        <span className="inline-flex items-center gap-2"><CloudCog className="w-4 h-4 text-primary" /> Docker-ready infrastructure</span>
        <span className="inline-flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-primary" /> DDoS protected by default</span>
        <span className="inline-flex items-center gap-2"><Globe2 className="w-4 h-4 text-primary" /> Global-ready regions</span>
      </div>
    </section>
  );
}

function CategoriesGrid({ s, categories }: { s: Section; categories: Category[] }) {
  const visibleCategories = categories.length ? categories : FALLBACK_CATEGORIES as Category[];
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <Heading s={s} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visibleCategories.map((c, i) => {
          const Icon = iconByName(c.icon);
          return (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <Link to={`/hosting/${c.slug}`} className="group block glass rounded-2xl p-5 card-3d hover-lift h-full min-h-[190px]">
                {c.image_url && <span aria-hidden className="card-art" style={{ backgroundImage: `url(${c.image_url})` }} />}
                <span aria-hidden className="card-sheen" />
                <div className="relative">
                   <span className={`icon-tile ${c.tone} w-11 h-11 mb-4 icon-hover`}><Icon className="w-5 h-5" /></span>
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display font-bold">{c.name}</h3>
                    {c.rate_label && <span className="text-xs text-gradient-blossom font-semibold">{c.rate_label}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1.5">{c.tagline ?? c.description}</p>
                   <span className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary font-medium group-hover:gap-3 transition-all">
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

function FreeOffer() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-16">
      <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="free-offer glass-pro rounded-3xl p-7 md:p-10 grid md:grid-cols-[1.2fr_.8fr] items-center gap-8 overflow-hidden">
        <div className="relative z-10">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[.18em] text-primary mb-4"><GiftIcon /> Launch free</span>
          <h2 className="font-display text-2xl md:text-4xl font-bold mb-3">Start with an 8GB free server</h2>
          <p className="text-muted-foreground max-w-xl leading-relaxed mb-6">Build, test and learn with 8GB RAM, 8GB NVMe storage and 150% CPU. No credit card needed to claim your first workspace.</p>
          <Link to="/free-panel" className="grad-btn text-primary-foreground px-5 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2">Claim free server <ArrowRight className="w-4 h-4" /></Link>
        </div>
        <div className="relative z-10 grid grid-cols-3 gap-2 sm:gap-3">
          {[['8GB','RAM'],['8GB','NVMe'],['150%','CPU']].map(([value, label]) => <div key={label} className="offer-stat glass rounded-xl p-3 sm:p-4 text-center"><div className="font-display text-xl sm:text-2xl font-bold text-gradient-blossom">{value}</div><div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">{label}</div></div>)}
        </div>
      </motion.div>
    </section>
  );
}

function GiftIcon() { return <span className="inline-flex items-center justify-center w-5 h-5 rounded-md bg-primary/15"><Zap className="w-3 h-3" /></span>; }

function Benefits() {
  const items = [
    [Server, "Infrastructure without the noise", "Production-ready compute, NVMe storage and sensible defaults from day one."],
    [ShieldCheck, "Security comes standard", "DDoS protection, isolated workloads and backups designed into the platform."],
    [Users, "Built around your team", "Invite collaborators, manage access and keep every project visible in one dashboard."],
    [HardDrive, "Scale when you are ready", "Move from a small experiment to serious workloads without changing your workflow."],
  ];
  return <section className="max-w-6xl mx-auto px-6 pb-16"><div className="text-center mb-9"><span className="eyebrow-label">The Legacy Cloud difference</span><h2 className="font-display text-3xl md:text-4xl font-bold mt-3">Everything you need to ship</h2></div><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{items.map(([Icon, title, text], i) => { const I = Icon as typeof Server; return <motion.div key={String(title)} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }} className="benefit-item"><span className="icon-tile tone-cyan w-10 h-10 mb-4"><I className="w-4 h-4" /></span><h3 className="font-display font-bold text-sm mb-2">{String(title)}</h3><p className="text-xs text-muted-foreground leading-relaxed">{String(text)}</p></motion.div> })}</div></section>;
}

function ReviewsPreview() {
  return <section className="max-w-6xl mx-auto px-6 pb-16"><div className="text-center mb-9"><span className="eyebrow-label">Trusted by builders</span><h2 className="font-display text-3xl md:text-4xl font-bold mt-3">A better home for your workloads</h2></div><div className="grid md:grid-cols-3 gap-4">{[{q:'“The VPS went live in under a minute. The dashboard is simple enough for our whole team.”',n:'Rohan K.',r:'SaaS founder'},{q:'“We moved our bots and APIs to one place. Support replies like they actually care.”',n:'Aditi M.',r:'Indie developer'},{q:'“Transparent pricing, fast nodes and no mystery limits. Exactly what a growing project needs.”',n:'Kabir S.',r:'Product builder'}].map((review, i) => <motion.div key={review.n} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }} className="glass rounded-2xl p-5"><div className="flex gap-1 mb-4">{[1,2,3,4,5].map((s) => <span key={s} className="text-primary text-sm">★</span>)}</div><p className="text-sm leading-relaxed text-foreground/90 mb-5">{review.q}</p><div className="flex items-center gap-3"><div className="avatar-mark">{review.n[0]}</div><div><div className="text-sm font-medium">{review.n}</div><div className="text-xs text-muted-foreground">{review.r}</div></div></div></motion.div>)}</div></section>;
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
          case "trust": return <TrustStrip key={s.id} />;
          case "features": return <Features key={s.id} s={s} />;
          case "categories": return <CategoriesGrid key={s.id} s={s} categories={categories} />;
          case "plans": return <PopularPlans key={s.id} s={s} categories={categories} plans={plans} />;
          case "free": return <FreeOffer key={s.id} />;
          case "benefits": return <Benefits key={s.id} />;
          case "reviews": return <ReviewsPreview key={s.id} />;
          case "cta": return <Cta key={s.id} s={s} />;
          case "text": return <RichText key={s.id} s={s} />;
          default: return <RichText key={s.id} s={s} />;
        }
      })}
    </>
  );
}

export const SECTION_TYPES = ["hero", "stats", "trust", "features", "categories", "plans", "free", "benefits", "reviews", "cta", "text"];
