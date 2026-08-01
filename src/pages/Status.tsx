import { motion } from "framer-motion";
import { CheckCircle2, Activity, Server, Terminal, Bot, Gauge, Globe } from "lucide-react";
import { LOCATIONS, DISCORD } from "@/data/plans";

const SERVICES = [
  { name: "Minecraft Nodes", uptime: "99.98%", pct: 99.98, icon: Server },
  { name: "VPS Nodes", uptime: "99.99%", pct: 99.99, icon: Gauge },
  { name: "Control Panel", uptime: "100%", pct: 100, icon: Terminal },
  { name: "Billing & Discord Bot", uptime: "99.95%", pct: 99.95, icon: Bot },
];

// Deterministic 30-day uptime sparkline (all-green with a couple of dips)
const DAYS = Array.from({ length: 30 }, (_, i) => (i === 11 || i === 23 ? "warn" : "ok"));

export default function Status() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-5">
          <Activity className="w-3 h-3 text-primary" /> Updated just now
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
          Network <span className="text-gradient-anim">Status</span>
        </h1>
        <p className="text-muted-foreground mb-10">All systems are operating normally. Live incidents are posted in our Discord.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-2xl p-6 mb-8 flex items-center gap-4 ring-glow-blossom"
      >
        <span className="icon-tile w-12 h-12 animate-glow-pulse"><CheckCircle2 className="w-6 h-6 text-success" /></span>
        <div>
          <div className="font-display font-bold">All systems operational</div>
          <div className="text-xs text-muted-foreground">No active incidents reported · 30-day uptime 99.98%</div>
        </div>
      </motion.div>

      <h2 className="font-display text-xl font-semibold mb-4">Services</h2>
      <div className="space-y-3 mb-12">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm flex items-center gap-3">
                <span className="icon-tile w-9 h-9"><s.icon className="w-4 h-4 text-primary" /></span> {s.name}
              </span>
              <span className="flex items-center gap-2 text-sm">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-muted-foreground">{s.uptime} · 30d</span>
              </span>
            </div>
            <div className="flex gap-[3px]">
              {DAYS.map((d, j) => (
                <motion.span
                  key={j}
                  initial={{ scaleY: 0.2, opacity: 0 }} whileInView={{ scaleY: 1, opacity: 1 }} viewport={{ once: true }}
                  transition={{ delay: j * 0.012 }}
                  className={`flex-1 h-6 rounded-sm ${d === "ok" ? "bg-success/70" : "bg-warning/80"}`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="font-display text-xl font-semibold mb-4 flex items-center gap-2">
        <Globe className="w-4 h-4 text-primary" /> Regions
      </h2>
      <div className="grid sm:grid-cols-2 gap-3 mb-12">
        {LOCATIONS.map((l, i) => (
          <motion.div
            key={l.city}
            initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }}
            className="glass rounded-2xl px-5 py-4 flex items-center justify-between card-3d"
          >
            <span className="text-sm">{l.flag} {l.city}</span>
            <span className="text-sm text-gradient-blossom font-semibold">{l.ping}</span>
          </motion.div>
        ))}
      </div>

      <a href={DISCORD} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 glass px-5 py-3 rounded-xl text-sm hover:bg-secondary transition">
        <Activity className="w-4 h-4 text-primary" /> Subscribe to incident updates on Discord
      </a>
    </div>
  );
}
