import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  Rocket, Shield, Cpu, Globe, Terminal, HeadphonesIcon, Sparkles, Zap, Server, ChevronDown,
  MousePointerClick, CreditCard, PlayCircle, Boxes, Gauge, Database, ArrowRight, Cloud, Layers,
} from "lucide-react";
import { useState } from "react";
import { DISCORD, LOCATIONS, MC_BUDGET, VPS_BUDGET } from "@/data/plans";
import PlanCard from "@/components/PlanCard";
import PanelShowcase from "@/components/PanelShowcase";
import Testimonials from "@/components/Testimonials";
import DiscordBanner from "@/components/DiscordBanner";
import hero3d from "@/assets/hero-3d.png";

const FEATURES = [
  { icon: Cpu, title: "Ryzen 9 + DDR5", desc: "High clock speeds and NVMe storage keep your TPS locked at 20 even with heavy modpacks." },
  { icon: Rocket, title: "Instant Setup", desc: "Server live in under 60 seconds. One-click Paper, Purpur, Forge, Fabric and modpacks." },
  { icon: Shield, title: "DDoS Protection", desc: "Always-on filtering at the network edge so your players never get dropped mid-raid." },
  { icon: Globe, title: "4 Global Regions", desc: "Mumbai, Singapore, Frankfurt and New York — host closest to your community." },
  { icon: Terminal, title: "Full Panel Access", desc: "Live console, file manager, SFTP, schedules, databases and one-click backups." },
  { icon: HeadphonesIcon, title: "Human Support", desc: "Real people on Discord who actually play Minecraft. No template replies." },
];

const STEPS = [
  { icon: MousePointerClick, title: "Pick a plan", desc: "Choose Budget or Premium RAM tier on the Minecraft or VPS page." },
  { icon: CreditCard, title: "Checkout", desc: "Add to cart, pick your term, pay by UPI, card or crypto." },
  { icon: PlayCircle, title: "Play in 60s", desc: "Panel credentials arrive instantly — install a jar and invite friends." },
];

const MARQUEE = [
  { icon: Boxes, label: "Paper" }, { icon: Layers, label: "Purpur" }, { icon: Cloud, label: "Fabric" },
  { icon: Server, label: "Forge" }, { icon: Database, label: "MySQL" }, { icon: Gauge, label: "Pterodactyl" },
  { icon: Shield, label: "Anti-DDoS" }, { icon: Terminal, label: "SFTP" },
];

const FAQ = [
  { q: "How fast is my server ready?", a: "Under 60 seconds. Ping us on Discord, pick a plan, and the panel provisions everything automatically." },
  { q: "Can I install mods and plugins?", a: "Yes — Paper, Purpur, Spigot, Forge, Fabric and Quilt are one click, plus SFTP for your own JARs." },
  { q: "Is DDoS protection included?", a: "On every plan, Minecraft and VPS. Enterprise-grade filtering at no extra cost." },
  { q: "Which payment methods work?", a: "UPI, cards (Visa/Mastercard/RuPay), PayPal and crypto — all handled on Discord by our billing team." },
  { q: "Are backups included?", a: "Daily automatic backups on Premium plans, and manual backups on demand for every plan." },
  { q: "Can I upgrade later?", a: "Anytime. Upgrades apply instantly and you only pay the prorated difference." },
];

function Faq({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <button onClick={() => setOpen((v) => !v)} className="w-full flex items-center justify-between gap-4 p-5 text-left">
        <span className="font-medium">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
      </button>
      <motion.div initial={false} animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }} className="overflow-hidden">
        <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
      </motion.div>
    </div>
  );
}

function Hero3D() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [14, -14]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-18, 18]), { stiffness: 160, damping: 18 });

  return (
    <div
      className="[perspective:1200px] mx-auto max-w-lg"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      <motion.div
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className="relative animate-float-slow"
      >
        <div aria-hidden className="absolute inset-8 rounded-full bg-primary/30 blur-3xl animate-glow-pulse" />
        <div aria-hidden className="absolute -inset-6 rounded-full border border-primary/20 animate-spin-slow" />
        <img
          src={hero3d}
          alt="3D voxel island with Legacy Cloud Minecraft servers"
          width={1024}
          height={1024}
          className="relative w-full drop-shadow-[0_40px_60px_hsl(var(--primary)/0.35)]"
        />
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-16 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
            <Sparkles className="w-3 h-3 text-primary" /> Minecraft &amp; VPS hosting from ₹30/month
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
            className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Hosting that blooms under{" "}
            <span className="text-gradient-anim">cherry blossoms.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8"
          >
            Ryzen 9 powered Minecraft servers and full-root KVM VPS, provisioned in seconds
            with DDoS protection, daily backups and support that actually replies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
          >
            <Link
              to="/minecraft"
              className="group grad-btn text-primary-foreground font-semibold px-7 py-3.5 rounded-xl flex items-center gap-2 animate-glow-pulse"
            >
              <Rocket className="w-4 h-4" /> Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/vps" className="glass font-medium px-6 py-3.5 rounded-xl hover:bg-secondary transition flex items-center gap-2">
              <Server className="w-4 h-4 text-primary" /> View VPS Plans
            </Link>
            <a href={DISCORD} target="_blank" rel="noreferrer" className="glass font-medium px-6 py-3.5 rounded-xl hover:bg-secondary transition flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Talk to us
            </a>
          </motion.div>
        </div>

        <Hero3D />
      </section>

      {/* Marquee trust strip */}
      <section className="pb-20 overflow-hidden">
        <div className="relative max-w-6xl mx-auto">
          <div className="flex w-max animate-marquee gap-4">
            {[...MARQUEE, ...MARQUEE].map((m, i) => (
              <div key={i} className="glass rounded-xl px-5 py-3 flex items-center gap-2 text-sm text-muted-foreground whitespace-nowrap">
                <m.icon className="w-4 h-4 text-primary" /> {m.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { n: "2,800+", l: "Servers Hosted", icon: Server },
            { n: "12,400+", l: "Players Online", icon: Boxes },
            { n: "99.9%", l: "Uptime", icon: Gauge },
            { n: "4", l: "Global Regions", icon: Globe },
          ].map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -6, rotateX: 8 }}
              style={{ transformStyle: "preserve-3d" }}
              className="glass rounded-2xl p-5 text-center card-3d"
            >
              <span className="icon-tile w-10 h-10 mx-auto mb-3"><s.icon className="w-5 h-5 text-primary" /></span>
              <div className="text-2xl md:text-3xl font-bold text-gradient-blossom">{s.n}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Live in three steps</h2>
          <p className="text-muted-foreground">No sales calls, no waiting queue.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6 card-3d relative"
            >
              <span aria-hidden className="card-sheen" />
              <span className="absolute top-5 right-6 font-display text-4xl font-bold text-primary/15">0{i + 1}</span>
              <span className="icon-tile w-12 h-12 mb-4"><s.icon className="w-5 h-5 text-primary" /></span>
              <h3 className="font-display font-semibold text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Why Legacy Cloud?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Premium hardware, instant provisioning, and a panel that feels good to use.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={f.title} className="[perspective:1000px]">
              <motion.div
                initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6, rotateX: 6, rotateY: -6 }}
                style={{ transformStyle: "preserve-3d" }}
                className="glass rounded-2xl p-6 card-3d h-full"
              >
                <span aria-hidden className="card-sheen" />
                <div className="icon-tile w-12 h-12 mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      <PanelShowcase />

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Popular plans</h2>
          <p className="text-muted-foreground">A taste of our lineup — choose Budget or Premium on the hosting pages.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <PlanCard plan={MC_BUDGET.plans[1]} index={0} group={MC_BUDGET.title} />
          <PlanCard plan={MC_BUDGET.plans[2]} index={1} group={MC_BUDGET.title} />
          <PlanCard plan={VPS_BUDGET.plans[1]} index={2} group={VPS_BUDGET.title} />
          <PlanCard plan={VPS_BUDGET.plans[2]} index={3} group={VPS_BUDGET.title} />
        </div>
        <div className="text-center mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/minecraft" className="glass px-5 py-2.5 rounded-xl text-sm hover:bg-secondary transition">All Minecraft plans</Link>
          <Link to="/vps" className="glass px-5 py-2.5 rounded-xl text-sm hover:bg-secondary transition">All VPS plans</Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Pick your region</h2>
          <p className="text-muted-foreground">Low latency nodes on four continents.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LOCATIONS.map((l, i) => (
            <motion.div
              key={l.city}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}
              className="glass rounded-2xl p-5 flex items-center justify-between card-3d"
            >
              <div>
                <div className="font-medium">{l.flag} {l.city}</div>
                <div className="text-xs text-muted-foreground">{l.country}</div>
              </div>
              <span className="text-sm text-gradient-blossom font-semibold">{l.ping}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <Testimonials />
      <DiscordBanner />

      <section className="max-w-3xl mx-auto px-6 pb-24">
        <div className="text-center mb-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Frequently asked questions</h2>
          <p className="text-muted-foreground">Everything you need before you launch.</p>
        </div>
        <div className="space-y-3">{FAQ.map((f) => <Faq key={f.q} {...f} />)}</div>
      </section>

      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="glass rounded-3xl p-10 text-center ring-glow-blossom">
          <div className="icon-tile w-14 h-14 mx-auto mb-5 animate-glow-pulse">
            <Server className="w-7 h-7 text-primary" />
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Ready to plant your server?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join our Discord, tell us the plan you want, and you'll be online in a minute.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/minecraft" className="inline-flex items-center gap-2 grad-btn text-primary-foreground font-semibold px-6 py-3 rounded-xl">
              <Rocket className="w-4 h-4" /> Get Started
            </Link>
            <a href={DISCORD} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 glass font-medium px-6 py-3 rounded-xl hover:bg-secondary transition">
              <Zap className="w-4 h-4 text-primary" /> Join Discord
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
