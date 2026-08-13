import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck, Heart, Globe, MessageCircle, Sparkles, Users, Server, Rocket, Cpu, Clock, Gift,
} from "lucide-react";
import { DISCORD } from "@/data/plans";
import { useTeam } from "@/lib/team";
import TeamCard from "@/components/TeamCard";

const VALUES = [
  { icon: Heart, tone: "", title: "Players first", desc: "We host what we play. Every roadmap item starts with a real server owner's problem." },
  { icon: ShieldCheck, tone: "tone-cyan", title: "Honest pricing", desc: "The price you see is the renewal price. No promo tricks, no hidden setup fees." },
  { icon: Globe, tone: "tone-mint", title: "Global, low ping", desc: "Multiple regions so your community connects close to home, not across an ocean." },
  { icon: Cpu, tone: "tone-violet", title: "Real hardware", desc: "Ryzen 9 cores, DDR5 memory and enterprise NVMe — never oversold to breaking point." },
  { icon: Clock, tone: "tone-amber", title: "Minutes, not tickets", desc: "Instant provisioning, and humans on Discord when automation isn't enough." },
  { icon: Gift, tone: "tone-cyan", title: "Free tier forever", desc: "4 GB RAM free servers so anyone can start, even with zero budget." },
];

const STATS = [
  { n: "2021", l: "Founded", icon: Sparkles, tone: "tone-amber" },
  { n: "2,800+", l: "Servers hosted", icon: Server, tone: "tone-cyan" },
  { n: "30+", l: "Countries served", icon: Globe, tone: "tone-mint" },
  { n: "99.9%", l: "Network uptime", icon: ShieldCheck, tone: "tone-violet" },
];

const TIMELINE = [
  { year: "2021", title: "One box, one SMP", desc: "Legacy Cloud starts as a single Ryzen server shared between friends who were tired of 5 TPS." },
  { year: "2022", title: "Panel & automation", desc: "Instant provisioning goes live. Setup time drops from hours to under a minute." },
  { year: "2024", title: "VPS & cloud", desc: "Full root KVM instances join the lineup for bots, panels and dev workloads." },
  { year: "2026", title: "Free tier + SaaS cloud", desc: "Free 4 GB game panel for everyone, and a full SaaS hosting catalog managed end to end." },
];

export default function About() {
  const { data: team } = useTeam();
  const leaders = team?.leaders ?? [];
  const staff = team?.staff ?? [];

  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
        <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-5">
          <Sparkles className="w-3 h-3 text-primary" /> Since 2021 · Made in India
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
          The team behind <span className="text-gradient-anim">Legacy Cloud</span>
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          We build hosting we would actually pay for: fast nodes, a panel that doesn't fight you, and support
          that answers in minutes. Today Legacy Cloud runs Ryzen 9 nodes with DDR5 memory and enterprise NVMe
          across multiple regions, powering game servers, VPS instances and full SaaS workloads — plus a
          genuinely free tier for people just getting started.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-12">
        {STATS.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -5, rotateX: 7 }} style={{ transformStyle: "preserve-3d" }}
            className="glass-pro rounded-2xl p-5 text-center overflow-hidden"
          >
            <span aria-hidden className="glass-sweep absolute inset-0 pointer-events-none" />
            <span className={`icon-tile ${s.tone} w-10 h-10 mx-auto mb-3 icon-hover`}><s.icon className="w-5 h-5" /></span>
            <div className="text-2xl font-bold text-gradient-blossom">{s.n}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </motion.div>
        ))}
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Owners &amp; leadership</h2>
      <p className="text-muted-foreground text-sm mb-8">The people who answer for every node we run.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {leaders.map((p, i) => <TeamCard key={p.name} member={p} index={i} />)}
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Staff &amp; crew</h2>
      <p className="text-muted-foreground text-sm mb-8">Real humans on Discord, not a ticket robot.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {staff.map((s, i) => <TeamCard key={s.name} member={s} index={i} compact />)}
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">How we got here</h2>
      <div className="relative mb-16 pl-6 border-l border-border/70 space-y-6">
        {TIMELINE.map((t, i) => (
          <motion.div
            key={t.year}
            initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="relative glass-pro rounded-2xl p-5 overflow-hidden"
          >
            <span aria-hidden className="absolute -left-[31px] top-7 w-3 h-3 rounded-full grad-btn" />
            <div className="text-xs font-semibold text-gradient-blossom mb-1">{t.year}</div>
            <h3 className="font-display font-semibold">{t.title}</h3>
            <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">{t.desc}</p>
          </motion.div>
        ))}
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">What we stand for</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="glass-pro rounded-2xl p-6 overflow-hidden"
          >
            <span aria-hidden className="glass-sweep absolute inset-0 pointer-events-none" />
            <span className={`icon-tile ${v.tone} w-12 h-12 mb-4 icon-hover`}><v.icon className="w-5 h-5" /></span>
            <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <a href={DISCORD} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 grad-btn text-primary-foreground font-medium px-6 py-3 rounded-xl hover:brightness-110 transition">
          <MessageCircle className="w-4 h-4" /> Join our community
        </a>
        <Link to="/free-panel" className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl font-medium hover:bg-secondary transition">
          <Gift className="w-4 h-4 text-mint" /> Get a free server
        </Link>
        <Link to="/careers" className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl font-medium hover:bg-secondary transition">
          <Rocket className="w-4 h-4 text-info" /> We're hiring
        </Link>
      </div>
    </div>
  );
}
