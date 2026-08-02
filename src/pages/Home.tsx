import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Rocket, Shield, Cpu, Terminal, Server, Zap, ArrowRight, Gauge, Globe, Boxes, MessageCircle } from "lucide-react";
import { DISCORD, LOCATIONS, MC_BUDGET, VPS_BUDGET } from "@/data/plans";
import PlanCard from "@/components/PlanCard";
import hero3d from "@/assets/hero-3d.png";

const FEATURES = [
  { icon: Cpu, title: "Ryzen 9 + DDR5", desc: "NVMe storage and high clocks keep TPS locked at 20." },
  { icon: Rocket, title: "Live in 60 seconds", desc: "One-click Paper, Purpur, Forge, Fabric and modpacks." },
  { icon: Shield, title: "DDoS protected", desc: "Always-on filtering on every Minecraft and VPS plan." },
  { icon: Terminal, title: "Full panel access", desc: "Console, SFTP, backups, schedules and databases." },
];

const STATS = [
  { n: "2,800+", l: "Servers hosted", icon: Server },
  { n: "12,400+", l: "Players online", icon: Boxes },
  { n: "99.9%", l: "Uptime", icon: Gauge },
  { n: "4", l: "Regions", icon: Globe },
];

function Hero3D() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [12, -12]), { stiffness: 160, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-16, 16]), { stiffness: 160, damping: 18 });

  return (
    <div
      className="[perspective:1200px] mx-auto max-w-md"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
    >
      <motion.div style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }} className="relative animate-float-slow">
        <div aria-hidden className="absolute inset-8 rounded-full bg-primary/30 blur-3xl animate-glow-pulse" />
        <img
          src={hero3d}
          alt="3D voxel island with Legacy Cloud Minecraft servers"
          width={1024} height={1024}
          className="relative w-full drop-shadow-[0_40px_60px_hsl(var(--primary)/0.35)]"
        />
      </motion.div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-14 pb-14 grid lg:grid-cols-2 gap-10 items-center">
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> Minecraft &amp; VPS from ₹30/month
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-bold tracking-tight mb-5">
            Hosting that blooms under <span className="text-gradient-anim">cherry blossoms.</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-7">
            Ryzen 9 Minecraft servers and full-root KVM VPS — instant setup, DDoS protection, real human support.
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
            <Link to="/minecraft" className="group grad-btn text-primary-foreground font-semibold px-7 py-3.5 rounded-xl flex items-center gap-2 animate-glow-pulse">
              <Rocket className="w-4 h-4" /> Get Started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/vps" className="glass font-medium px-6 py-3.5 rounded-xl hover:bg-secondary transition flex items-center gap-2">
              <Server className="w-4 h-4 text-primary" /> VPS Plans
            </Link>
          </div>
        </div>
        <Hero3D />
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.l}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 text-center card-3d"
            >
              <span className="icon-tile w-10 h-10 mx-auto mb-3"><s.icon className="w-5 h-5" /></span>
              <div className="text-2xl md:text-3xl font-bold text-gradient-blossom">{s.n}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-10">Why Legacy Cloud?</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05 }} whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 card-3d"
            >
              <span aria-hidden className="card-sheen" />
              <span className="icon-tile w-12 h-12 mb-4"><f.icon className="w-5 h-5" /></span>
              <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular plans */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="text-center mb-8">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">Popular plans</h2>
          <p className="text-muted-foreground text-sm">Budget and Premium tiers on the hosting pages.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <PlanCard plan={MC_BUDGET.plans[1]} index={0} group={MC_BUDGET.title} />
          <PlanCard plan={MC_BUDGET.plans[2]} index={1} group={MC_BUDGET.title} />
          <PlanCard plan={VPS_BUDGET.plans[1]} index={2} group={VPS_BUDGET.title} />
          <PlanCard plan={VPS_BUDGET.plans[2]} index={3} group={VPS_BUDGET.title} />
        </div>
        <div className="text-center mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/minecraft" className="glass px-5 py-2.5 rounded-xl text-sm hover:bg-secondary transition">All Minecraft plans</Link>
          <Link to="/vps" className="glass px-5 py-2.5 rounded-xl text-sm hover:bg-secondary transition">All VPS plans</Link>
        </div>
      </section>

      {/* Regions */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {LOCATIONS.map((l) => (
            <div key={l.city} className="glass rounded-2xl p-5 flex items-center justify-between">
              <div>
                <div className="font-medium">{l.flag} {l.city}</div>
                <div className="text-xs text-muted-foreground">{l.country}</div>
              </div>
              <span className="text-sm text-gradient-blossom font-semibold">{l.ping}</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="glass rounded-3xl p-10 text-center ring-glow-blossom">
          <span className="icon-tile w-14 h-14 mx-auto mb-5 animate-glow-pulse"><Server className="w-6 h-6" /></span>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Ready to plant your server?</h2>
          <p className="text-muted-foreground mb-7 max-w-md mx-auto">Pick a plan, checkout, and you're online in a minute.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/minecraft" className="inline-flex items-center gap-2 grad-btn text-primary-foreground font-semibold px-6 py-3 rounded-xl">
              <Rocket className="w-4 h-4" /> Get Started
            </Link>
            <a href={DISCORD} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 glass font-medium px-6 py-3 rounded-xl hover:bg-secondary transition">
              <MessageCircle className="w-4 h-4 text-primary" /> Join Discord
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
