import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Gift, MemoryStick, HardDrive, Cpu, Zap, Terminal, FolderTree, Database, Users, Clock,
  ShieldCheck, Boxes, Globe, Activity, Camera, Bot, Network, Sparkles, MessageCircle, Check,
  ArrowRight, Rocket, Layers, Lock,
} from "lucide-react";
import { DISCORD } from "@/data/plans";
import AuthInline from "@/components/AuthInline";
import { useAuth } from "@/lib/auth";

const SPECS = [
  { icon: MemoryStick, tone: "", label: "4 GB RAM", desc: "DDR5 memory, no burst throttling" },
  { icon: HardDrive, tone: "tone-cyan", label: "8 GB NVMe", desc: "Enterprise SSD storage" },
  { icon: Cpu, tone: "tone-violet", label: "150% CPU", desc: "1.5 dedicated Ryzen threads" },
  { icon: Network, tone: "tone-mint", label: "Unmetered", desc: "1 Gbps port, DDoS filtered" },
];

const FEATURES = [
  { icon: Zap, tone: "", title: "Instant provisioning", desc: "Server is created, installed and online in under 60 seconds — no queue, no manual approval." },
  { icon: Terminal, tone: "tone-cyan", title: "Live console", desc: "Full stdin/stdout console with command history, search and one-click restart/kill." },
  { icon: FolderTree, tone: "tone-violet", title: "File manager + SFTP", desc: "Drag-drop uploads, in-browser editor with syntax highlighting, archive/unarchive, SFTP creds." },
  { icon: Boxes, tone: "tone-mint", title: "1-click modpacks & jars", desc: "Paper, Purpur, Fabric, Forge, Velocity, BungeeCord and CurseForge packs auto-installed." },
  { icon: Layers, tone: "tone-amber", title: "Plugin & mod manager", desc: "Browse SpigotMC and Modrinth in the panel, install and update without touching files." },
  { icon: Camera, tone: "", title: "Backups & snapshots", desc: "Scheduled and manual backups with one-click rollback to any restore point." },
  { icon: Clock, tone: "tone-cyan", title: "Cron scheduler", desc: "Timed restarts, broadcast messages, backup jobs and custom commands." },
  { icon: Database, tone: "tone-violet", title: "MySQL databases", desc: "Create databases and users for economy, LuckPerms and web-map plugins." },
  { icon: Users, tone: "tone-mint", title: "Subusers & roles", desc: "Invite your staff with granular permissions — console only, files only, or full access." },
  { icon: Activity, tone: "tone-amber", title: "Live metrics & TPS", desc: "Real-time CPU, RAM, disk, player count and TPS graphs with lag spike history." },
  { icon: Globe, tone: "", title: "Free subdomain", desc: "yourname.legacycloud.fun plus extra ports for Geyser, dynmap and voice chat." },
  { icon: Bot, tone: "tone-cyan", title: "Discord alerts", desc: "Crash, restart and player-join webhooks delivered to your own Discord server." },
  { icon: ShieldCheck, tone: "tone-violet", title: "DDoS protection", desc: "Always-on layer 4 and 7 filtering, the same stack our paid nodes use." },
  { icon: Sparkles, tone: "tone-mint", title: "No forced ads", desc: "No vote walls, no MOTD branding, no coin grinding to keep your server alive." },
];

const RULES = [
  "One free server per person and per household — alt accounts get both servers removed.",
  "Server suspends after 7 days of inactivity and can be woken with one click from the panel.",
  "No crypto mining, proxies, nukers, botting or anything illegal — instant permanent ban.",
  "Free nodes are best-effort: no SLA. Upgrade to a paid plan for guaranteed resources.",
];

const STEPS = [
  { n: "01", title: "Create your account", desc: "Verify your email — this is the only step that needs a real signup." },
  { n: "02", title: "Claim your server", desc: "Pick a region and jar. Provisioning starts immediately." },
  { n: "03", title: "Play in 60 seconds", desc: "Credentials land in your dashboard, and your subdomain is live." },
];

const PAID_COMPARE = [
  { label: "RAM", free: "4 GB", paid: "Up to 64 GB" },
  { label: "CPU", free: "150%", paid: "Up to 800% dedicated" },
  { label: "Storage", free: "8 GB NVMe", paid: "Unlimited NVMe" },
  { label: "Uptime SLA", free: "Best effort", paid: "99.9% guaranteed" },
  { label: "Backups", free: "2 slots", paid: "Unlimited + offsite" },
  { label: "Support", free: "Community", paid: "Priority ticket + Discord" },
];

export default function FreePanel() {
  const { user } = useAuth();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-6 pt-16 pb-24">
      {/* Hero */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-10 items-start">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
          <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-5">
            <Gift className="w-3 h-3 text-primary" /> Free forever · No card required
          </span>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">
            A <span className="text-gradient-anim">free game panel</span> that beats most paid ones
          </h1>
          <p className="text-muted-foreground leading-relaxed mb-7 max-w-2xl">
            4 GB RAM, 8 GB NVMe and 150% CPU on real Ryzen hardware — with a console, file manager, plugin
            installer, backups, databases, subusers and live metrics. Everything a Pterodactyl panel gives you,
            plus the extras it never had.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {SPECS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 * i }}
                className="glass-pro rounded-2xl p-4 overflow-hidden"
              >
                <span aria-hidden className="glass-sweep absolute inset-0 pointer-events-none" />
                <span className={`icon-tile ${s.tone} w-9 h-9 mb-3 icon-hover`}><s.icon className="w-4 h-4" /></span>
                <div className="font-display font-bold">{s.label}</div>
                <div className="text-[11px] text-muted-foreground mt-1 leading-snug">{s.desc}</div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {user ? (
              <Link to="/dashboard" className="inline-flex items-center gap-2 grad-btn text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:brightness-110 transition">
                <Rocket className="w-4 h-4" /> Claim from dashboard
              </Link>
            ) : (
              <button onClick={() => setShowAuth(true)} className="inline-flex items-center gap-2 grad-btn text-primary-foreground font-semibold px-6 py-3 rounded-xl hover:brightness-110 transition">
                <Gift className="w-4 h-4" /> Claim free server <ArrowRight className="w-4 h-4" />
              </button>
            )}
            <a href={DISCORD} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 glass px-6 py-3 rounded-xl font-medium hover:bg-secondary transition">
              <MessageCircle className="w-4 h-4 text-info" /> Ask on Discord
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="glass-pro rounded-2xl p-6 lg:sticky lg:top-24 overflow-hidden"
        >
          <span aria-hidden className="glass-sweep absolute inset-0 pointer-events-none" />
          <div className="relative">
            {user ? (
              <>
                <span className="icon-tile tone-mint w-12 h-12 mb-4"><Gift className="w-5 h-5" /></span>
                <h2 className="font-display font-bold text-lg mb-2">You're eligible</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  Your account is verified. Head to your dashboard to pick a region and spin up your free server.
                </p>
                <Link to="/dashboard" className="grad-btn text-primary-foreground w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2">
                  <Rocket className="w-4 h-4" /> Go to dashboard
                </Link>
              </>
            ) : showAuth ? (
              <AuthInline defaultMode="signup" title="Claim your free server" subtitle="Verify an email and the panel is yours — no card, no trial timer." />
            ) : (
              <>
                <span className="icon-tile w-12 h-12 mb-4"><Lock className="w-5 h-5" /></span>
                <h2 className="font-display font-bold text-lg mb-2">One quick signup</h2>
                <p className="text-sm text-muted-foreground mb-5">
                  We only ask for an email so one person can't hoard twenty free servers. Takes 20 seconds.
                </p>
                <button onClick={() => setShowAuth(true)} className="grad-btn text-primary-foreground w-full py-3 rounded-xl font-semibold">
                  Start now
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>

      {/* Features */}
      <h2 className="font-display text-2xl md:text-3xl font-bold mt-20 mb-2">Everything included</h2>
      <p className="text-muted-foreground text-sm mb-8">All of it on the free tier — nothing paywalled behind an upsell.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURES.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: (i % 3) * 0.05 }}
            whileHover={{ y: -6 }}
            className="glass-pro rounded-2xl p-6 overflow-hidden"
          >
            <span aria-hidden className="glass-sweep absolute inset-0 pointer-events-none" />
            <span className={`icon-tile ${f.tone} w-11 h-11 mb-4 icon-hover`}><f.icon className="w-5 h-5" /></span>
            <h3 className="font-display font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Steps */}
      <h2 className="font-display text-2xl md:text-3xl font-bold mt-20 mb-8">How it works</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {STEPS.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.07 }}
            className="glass-pro rounded-2xl p-6 overflow-hidden"
          >
            <div className="text-3xl font-display font-bold text-gradient-blossom mb-3">{s.n}</div>
            <h3 className="font-display font-semibold mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Compare */}
      <h2 className="font-display text-2xl md:text-3xl font-bold mt-20 mb-8">Free vs paid</h2>
      <div className="glass-pro rounded-2xl overflow-hidden">
        <div className="grid grid-cols-3 text-xs uppercase tracking-wide text-muted-foreground px-5 py-3 border-b border-border/60">
          <span>Resource</span><span>Free tier</span><span>Paid plans</span>
        </div>
        {PAID_COMPARE.map((r) => (
          <div key={r.label} className="grid grid-cols-3 px-5 py-3.5 text-sm border-b border-border/40 last:border-0">
            <span className="text-muted-foreground">{r.label}</span>
            <span>{r.free}</span>
            <span className="text-gradient-blossom font-medium">{r.paid}</span>
          </div>
        ))}
      </div>
      <Link to="/pricing" className="mt-5 inline-flex items-center gap-2 glass px-5 py-3 rounded-xl text-sm font-medium hover:bg-secondary transition">
        Compare paid plans <ArrowRight className="w-4 h-4 text-primary" />
      </Link>

      {/* Rules */}
      <h2 className="font-display text-2xl md:text-3xl font-bold mt-20 mb-6">Fair-use rules</h2>
      <ul className="grid sm:grid-cols-2 gap-3">
        {RULES.map((r) => (
          <li key={r} className="glass rounded-xl p-4 text-sm text-muted-foreground flex gap-3">
            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" /> {r}
          </li>
        ))}
      </ul>
    </div>
  );
}
