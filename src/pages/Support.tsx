import { motion } from "framer-motion";
import { DISCORD } from "@/data/plans";
import { MessageCircle, Mail, BookOpen, Clock, LifeBuoy, AlertTriangle, PlugZap, Gauge } from "lucide-react";

const CHANNELS = [
  { icon: MessageCircle, title: "Discord Support", desc: "Fastest way to reach us. Open a ticket in #support.", href: DISCORD, external: true },
  { icon: Mail, title: "Email", desc: "support@legacycloud.fun — for billing and account issues.", href: "mailto:support@legacycloud.fun" },
  { icon: Clock, title: "Hours", desc: "24/7 for outages. 9 AM – 2 AM IST for everything else." },
  { icon: BookOpen, title: "Knowledgebase", desc: "Setup guides, plugin help and modpack tutorials in our Discord." },
];

const FIXES = [
  { icon: AlertTriangle, title: "Server won't start", desc: "Check the console for a plugin error, then remove the newest JAR you added." },
  { icon: PlugZap, title: "Can't connect", desc: "Confirm you're using the exact IP:port from the panel and that the version matches." },
  { icon: Gauge, title: "Lag / low TPS", desc: "Reduce view-distance, pregenerate the world, and check for entity farms." },
];

export default function Support() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-5">
          <LifeBuoy className="w-3 h-3 text-primary" /> Avg first reply · 4 min
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">
          Need a <span className="text-gradient-anim">hand?</span>
        </h1>
        <p className="text-muted-foreground mb-10">Our team lives on Discord and replies fast — usually within a few minutes.</p>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-4 mb-14">
        {CHANNELS.map((c, i) => {
          const inner = (
            <>
              <span className="icon-tile w-12 h-12 mb-4"><c.icon className="w-5 h-5 text-primary" /></span>
              <h2 className="font-display font-semibold mb-1">{c.title}</h2>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
            </>
          );
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.06 }} whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 card-3d"
            >
              <span aria-hidden className="card-sheen" />
              {c.href ? (
                <a href={c.href} target={c.external ? "_blank" : undefined} rel="noreferrer" className="block relative">{inner}</a>
              ) : (
                <div className="relative">{inner}</div>
              )}
            </motion.div>
          );
        })}
      </div>

      <h2 className="font-display text-2xl font-bold mb-6">Common fixes</h2>
      <div className="grid gap-3 mb-12">
        {FIXES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl p-5 flex items-start gap-4"
          >
            <span className="icon-tile w-10 h-10 shrink-0"><f.icon className="w-4 h-4 text-primary" /></span>
            <div>
              <div className="font-medium mb-1">{f.title}</div>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <a href={DISCORD} target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-2 grad-btn text-primary-foreground font-medium px-6 py-3 rounded-xl">
        <MessageCircle className="w-4 h-4" /> Open a ticket on Discord
      </a>
    </div>
  );
}
