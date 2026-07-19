import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Terminal, Server, Shield, Zap, Copy, Check, Github, Boxes, Cpu, HardDrive } from "lucide-react";

const INSTALL_CMD = "curl -fsSL https://legacycloud.lovable.app/install.sh | sudo bash";

function Feature({ icon: Icon, title, desc }: { icon: any; title: string; desc: string }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-6 ring-glow"
    >
      <div className="w-11 h-11 rounded-xl grad-btn flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-white" />
      </div>
      <h3 className="font-semibold text-lg mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  );
}

export default function App() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    toast.success("Command copied");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg grad-btn flex items-center justify-center">
            <Boxes className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg">Legacy Panel</span>
        </div>
        <a
          href="https://discord.gg/YFNWrZ68Dv"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition"
        >
          Discord →
        </a>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-12 pb-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Self-hosted • One-command install
        </motion.div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-5">
          Your own <span className="grad-text">Minecraft panel</span>
          <br />on your own VPS.
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Legacy Panel installs a full Minecraft hosting control plane —
          Docker-isolated servers, live console, file manager, backups — in one command.
        </p>

        {/* Install command */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass rounded-2xl p-4 max-w-3xl mx-auto ring-glow"
        >
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <Terminal className="w-5 h-5 text-primary shrink-0" />
              <code className="font-mono text-sm text-left truncate">
                {INSTALL_CMD}
              </code>
            </div>
            <button
              onClick={copy}
              className="shrink-0 grad-btn text-white text-sm font-medium px-4 py-2 rounded-lg flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-border/50 text-xs text-muted-foreground text-left">
            Runs on Ubuntu 22.04 / 24.04. Requires root. Installs Docker, Postgres, and Nginx.
          </div>
        </motion.div>

        <div className="mt-6 flex items-center justify-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5" /> 2+ vCPU</span>
          <span>·</span>
          <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5" /> 4+ GB RAM</span>
          <span>·</span>
          <span>Ubuntu 22/24</span>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-4">
          <Feature icon={Server} title="Docker Isolated" desc="Every Minecraft server runs in its own container with CPU / RAM / disk limits." />
          <Feature icon={Terminal} title="Live Console" desc="Real-time xterm console over WebSockets. Send commands, tail logs, restart in one click." />
          <Feature icon={Shield} title="Secure by default" desc="Nginx reverse proxy, auto SSL via Let's Encrypt, JWT auth, and per-user RBAC." />
          <Feature icon={Zap} title="Fast provisioning" desc="Create a new server in under 10 seconds. Pre-pulled Paper / Purpur / Fabric images." />
          <Feature icon={Boxes} title="Multi-node" desc="Add worker nodes later — one control plane manages many hosts." />
          <Feature icon={HardDrive} title="Backups" desc="Scheduled backups to local disk or S3-compatible storage." />
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-3xl font-bold text-center mb-10">Three steps. That's it.</h2>
        <div className="space-y-3">
          {[
            { n: 1, t: "SSH into your VPS", d: "ssh root@your-vps-ip" },
            { n: 2, t: "Run the install command", d: INSTALL_CMD },
            { n: 3, t: "Open the panel", d: "https://panel.yourdomain.com — login with the admin credentials printed at the end." },
          ].map((s) => (
            <div key={s.n} className="glass rounded-xl p-5 flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg grad-btn flex items-center justify-center text-white font-semibold text-sm shrink-0">
                {s.n}
              </div>
              <div className="min-w-0">
                <div className="font-semibold mb-1">{s.t}</div>
                <code className="text-sm text-muted-foreground font-mono break-all">{s.d}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} Legacy Cloud</span>
          <a href="/install.sh" className="hover:text-foreground transition flex items-center gap-1.5">
            <Github className="w-4 h-4" /> View install.sh
          </a>
        </div>
      </footer>
    </div>
  );
}
