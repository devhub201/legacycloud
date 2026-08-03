import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Heart, Globe, MessageCircle, Sparkles, Users, Server, Rocket } from "lucide-react";
import { DISCORD } from "@/data/plans";
import { LEADERS, STAFF } from "@/data/team";
import TeamCard from "@/components/TeamCard";

const VALUES = [
  { icon: Heart, tone: "", title: "Players first", desc: "We host what we play. Every decision starts with the server owner." },
  { icon: ShieldCheck, tone: "tone-cyan", title: "Honest pricing", desc: "₹15/GB is the real price — no promo tricks, no renewal surprises." },
  { icon: Globe, tone: "tone-mint", title: "Global, low ping", desc: "Four regions so your community connects close to home." },
];

const STATS = [
  { n: "2021", l: "Founded", icon: Sparkles, tone: "tone-amber" },
  { n: "2,800+", l: "Servers hosted", icon: Server, tone: "tone-cyan" },
  { n: "30+", l: "Countries served", icon: Globe, tone: "tone-mint" },
  { n: "12", l: "Team members", icon: Users, tone: "tone-violet" },
];

export default function About() {
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
          Legacy Cloud started the way most good things in Minecraft do — a few friends, one laggy server,
          and a stubborn refusal to accept 5 TPS. Today we run Ryzen 9 nodes with DDR5 memory and enterprise
          NVMe across four regions, hosting thousands of Minecraft servers and VPS instances.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-12">
        {STATS.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -5, rotateX: 7 }} style={{ transformStyle: "preserve-3d" }}
            className="glass rounded-2xl p-5 text-center card-3d hover-lift"
          >
            <span className={`icon-tile ${s.tone} w-10 h-10 mx-auto mb-3 icon-hover`}><s.icon className="w-5 h-5" /></span>
            <div className="text-2xl font-bold text-gradient-blossom">{s.n}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </motion.div>
        ))}
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Owners &amp; leadership</h2>
      <p className="text-muted-foreground text-sm mb-8">The people who answer for every node we run.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
        {LEADERS.map((p, i) => <TeamCard key={p.name} member={p} index={i} />)}
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Staff &amp; crew</h2>
      <p className="text-muted-foreground text-sm mb-8">Real humans on Discord, not a ticket robot.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
        {STAFF.map((s, i) => <TeamCard key={s.name} member={s} index={i} compact />)}
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">What we stand for</h2>
      <div className="grid md:grid-cols-3 gap-5 mb-14">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-6 card-3d hover-lift"
          >
            <span aria-hidden className="card-sheen" />
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
        <Link to="/careers" className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl font-medium hover:bg-secondary transition">
          <Rocket className="w-4 h-4 text-info" /> We're hiring
        </Link>
      </div>
    </div>
  );
}
