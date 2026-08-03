import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Cpu, Rocket, ShieldCheck, Terminal, HardDrive, Gauge, Globe, Clock, Layers,
  Database, GitBranch, LifeBuoy, ArrowRight, MessageCircle,
} from "lucide-react";
import { DISCORD } from "@/data/plans";

const REASONS = [
  { icon: Cpu, tone: "", title: "Ryzen 9 + DDR5", desc: "5.4 GHz boost clocks and DDR5-5200 memory — single-thread power is what Minecraft actually needs." },
  { icon: HardDrive, tone: "tone-cyan", title: "Enterprise NVMe", desc: "Gen4 NVMe in RAID with daily snapshots. Chunk loading and world saves stay instant." },
  { icon: ShieldCheck, tone: "tone-violet", title: "DDoS protected", desc: "Always-on layer 3/4/7 filtering on every plan — no extra fee, no downgrade during attacks." },
  { icon: Rocket, tone: "tone-mint", title: "Live in 60 seconds", desc: "One-click Paper, Purpur, Fabric, Forge and 1000+ modpacks straight from the panel." },
  { icon: Terminal, tone: "tone-amber", title: "Full panel access", desc: "Console, SFTP, scheduled tasks, subusers, databases and file editor — nothing locked." },
  { icon: Gauge, tone: "tone-cyan", title: "TPS-tuned by default", desc: "Aikar flags, pre-tuned paper.yml and anti-lag configs shipped on first boot." },
  { icon: Globe, tone: "tone-mint", title: "4 global regions", desc: "Mumbai, Singapore, Frankfurt and New York so your players ping under 40 ms." },
  { icon: Database, tone: "tone-violet", title: "Free backups", desc: "Automated rotating backups plus one-click restore points before every update." },
  { icon: GitBranch, tone: "tone-amber", title: "Instant upgrades", desc: "Scale RAM, CPU or disk mid-month — prorated, no reinstall, no data loss." },
  { icon: Clock, tone: "", title: "99.9% uptime SLA", desc: "Node monitoring every 20 seconds with public status page and incident history." },
  { icon: LifeBuoy, tone: "tone-cyan", title: "Real human support", desc: "Owners and staff answer on Discord — median first response under 10 minutes." },
  { icon: Layers, tone: "tone-mint", title: "Honest pricing", desc: "₹15/GB budget, ₹20/GB premium. Renewal price = signup price. Forever." },
];

export default function Features() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mb-12">
        <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-5">
          <Gauge className="w-3 h-3 text-info" /> Built for 20 TPS
        </span>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">
          Why choose <span className="text-gradient-anim">Legacy Cloud</span>
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          Every plan ships with the same hardware, protection and panel. The only thing that changes is how much
          RAM and CPU you want.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {REASONS.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: (i % 3) * 0.06, duration: 0.4 }}
            whileHover={{ y: -7 }}
            className="glass rounded-2xl p-6 card-3d hover-lift"
          >
            <span aria-hidden className="card-sheen" />
            <span className={`icon-tile ${r.tone} w-12 h-12 mb-4 icon-hover`}><r.icon className="w-5 h-5" /></span>
            <h3 className="font-display font-semibold text-lg mb-2">{r.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl p-8 mt-12 text-center card-3d">
        <h2 className="font-display text-2xl font-bold mb-3">Ready to bloom?</h2>
        <p className="text-sm text-muted-foreground mb-6">Pick a plan or ask us anything on Discord first.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/minecraft" className="group grad-btn text-primary-foreground font-semibold px-6 py-3 rounded-xl inline-flex items-center gap-2">
            <Rocket className="w-4 h-4" /> Get Started
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="glass px-6 py-3 rounded-xl font-medium hover:bg-secondary transition inline-flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-info" /> Ask on Discord
          </a>
        </div>
      </div>
    </div>
  );
}
