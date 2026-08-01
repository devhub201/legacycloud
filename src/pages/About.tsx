import { motion } from "framer-motion";
import {
  Crown, Code2, Server, HeadphonesIcon, ShieldCheck, Users, Rocket, Heart,
  Globe, MessageCircle, Sparkles,
} from "lucide-react";
import { DISCORD } from "@/data/plans";

const LEADERS = [
  {
    name: "Aryan Mehta",
    role: "Founder & CEO",
    icon: Crown,
    bio: "Started Legacy Cloud from one laggy SMP box in 2021. Handles hardware sourcing, pricing and long nights.",
    tags: ["Strategy", "Hardware", "Pricing"],
  },
  {
    name: "Ishita Rao",
    role: "Co-Founder & CTO",
    icon: Code2,
    bio: "Builds the panel, provisioning automation and the anti-lag tuning stack that keeps TPS at 20.",
    tags: ["Panel", "Automation", "Performance"],
  },
  {
    name: "Kabir Singh",
    role: "Head of Infrastructure",
    icon: Server,
    bio: "Runs our Ryzen 9 + DDR5 nodes across Mumbai, Singapore, Frankfurt and New York.",
    tags: ["Nodes", "Networking", "DDoS"],
  },
];

const STAFF = [
  { name: "Riya", role: "Support Lead", icon: HeadphonesIcon, detail: "First reply under 5 min on Discord" },
  { name: "Dev", role: "Security Engineer", icon: ShieldCheck, detail: "Edge filtering & abuse handling" },
  { name: "Nikhil", role: "Community Manager", icon: Users, detail: "Events, giveaways & partner SMPs" },
  { name: "Sana", role: "Billing Specialist", icon: Rocket, detail: "Invoices, upgrades & refunds" },
  { name: "Omkar", role: "Modpack Specialist", icon: Sparkles, detail: "Forge, Fabric & Quilt tuning" },
  { name: "Tanvi", role: "Design & Brand", icon: Heart, detail: "Everything blossom-shaped" },
];

const VALUES = [
  { icon: Heart, title: "Players first", desc: "We host what we play. Every decision starts with the server owner." },
  { icon: ShieldCheck, title: "Honest pricing", desc: "₹15/GB is the real price — no promo tricks, no renewal surprises." },
  { icon: Globe, title: "Global, low ping", desc: "Four regions so your community connects close to home." },
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

      <div className="grid sm:grid-cols-4 gap-4 my-12">
        {[
          { n: "2021", l: "Founded" },
          { n: "2,800+", l: "Servers hosted" },
          { n: "30+", l: "Countries served" },
          { n: "12", l: "Team members" },
        ].map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -5, rotateX: 7 }} style={{ transformStyle: "preserve-3d" }}
            className="glass rounded-2xl p-5 text-center card-3d"
          >
            <div className="text-2xl font-bold text-gradient-blossom">{s.n}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </motion.div>
        ))}
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Leadership</h2>
      <p className="text-muted-foreground text-sm mb-8">The people who answer for every node we run.</p>
      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {LEADERS.map((p, i) => (
          <div key={p.name} className="[perspective:1000px]">
            <motion.div
              initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -6, rotateX: 6, rotateY: -5 }} style={{ transformStyle: "preserve-3d" }}
              className="glass rounded-2xl p-6 card-3d h-full"
            >
              <span aria-hidden className="card-sheen" />
              <div className="flex items-center gap-4 mb-4">
                <span className="icon-tile w-14 h-14 animate-glow-pulse">
                  <p.icon className="w-6 h-6 text-primary" />
                </span>
                <div>
                  <h3 className="font-display font-bold text-lg leading-tight">{p.name}</h3>
                  <div className="text-xs text-gradient-blossom font-semibold">{p.role}</div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.bio}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="text-[11px] px-2.5 py-1 rounded-full bg-secondary text-muted-foreground">{t}</span>
                ))}
              </div>
            </motion.div>
          </div>
        ))}
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">Staff &amp; crew</h2>
      <p className="text-muted-foreground text-sm mb-8">Real humans on Discord, not a ticket robot.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {STAFF.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-5 flex items-start gap-4 card-3d"
          >
            <span className="icon-tile w-11 h-11 shrink-0"><s.icon className="w-5 h-5 text-primary" /></span>
            <div>
              <div className="font-medium">{s.name}</div>
              <div className="text-xs text-gradient-blossom font-semibold mb-1">{s.role}</div>
              <div className="text-xs text-muted-foreground">{s.detail}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <h2 className="font-display text-2xl md:text-3xl font-bold mb-8">What we stand for</h2>
      <div className="grid md:grid-cols-3 gap-5 mb-14">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className="glass rounded-2xl p-6 card-3d"
          >
            <span className="icon-tile w-11 h-11 mb-4"><v.icon className="w-5 h-5 text-primary" /></span>
            <h3 className="font-display font-semibold text-lg mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </div>

      <a href={DISCORD} target="_blank" rel="noreferrer"
        className="inline-flex items-center gap-2 grad-btn text-primary-foreground font-medium px-6 py-3 rounded-xl">
        <MessageCircle className="w-4 h-4" /> Join our community
      </a>
    </div>
  );
}
