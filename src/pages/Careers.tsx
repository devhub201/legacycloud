import { motion } from "framer-motion";
import { Briefcase, Code2, HeadphonesIcon, Megaphone, MessageCircle, Sparkles } from "lucide-react";
import { DISCORD } from "@/data/plans";

const ROLES = [
  { icon: HeadphonesIcon, tone: "tone-cyan", title: "Support Staff", type: "Part-time · Remote", desc: "Discord tickets, plugin help and server setup guidance for new owners." },
  { icon: Code2, tone: "tone-violet", title: "Panel Developer", type: "Contract · Remote", desc: "Node/React work on our provisioning panel and automation bots." },
  { icon: Megaphone, tone: "tone-mint", title: "Community Manager", type: "Part-time · Remote", desc: "Events, giveaways, creator collabs and keeping the blossom vibe alive." },
];

export default function Careers() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-5">
          <Sparkles className="w-3 h-3 text-primary" /> Small team, real ownership
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-5">
          Join the <span className="text-gradient-anim">Legacy crew</span>
        </h1>
        <p className="text-muted-foreground leading-relaxed">
          We hire from our own community. If you already help people in our Discord, you're halfway there.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {ROLES.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-6 card-3d hover-lift"
          >
            <span aria-hidden className="card-sheen" />
            <span className={`icon-tile ${r.tone} w-12 h-12 mb-4 icon-hover`}><r.icon className="w-5 h-5" /></span>
            <h3 className="font-display font-semibold text-lg">{r.title}</h3>
            <div className="text-[11px] text-info mb-2">{r.type}</div>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>

      <div className="glass rounded-2xl p-8 text-center card-3d">
        <span className="icon-tile tone-amber w-12 h-12 mx-auto mb-4"><Briefcase className="w-5 h-5" /></span>
        <h2 className="font-display text-xl font-bold mb-2">How to apply</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Open a ticket in our Discord with the role name and a short intro. Owners read every application.
        </p>
        <a href={DISCORD} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 grad-btn text-primary-foreground font-medium px-6 py-3 rounded-xl">
          <MessageCircle className="w-4 h-4" /> Apply on Discord
        </a>
      </div>
    </div>
  );
}
