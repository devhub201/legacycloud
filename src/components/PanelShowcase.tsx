import { motion } from "framer-motion";
import { Terminal, Puzzle, Boxes, Activity, Search, ArrowRight } from "lucide-react";

const PANEL_FEATURES = [
  { icon: Terminal, title: "Shell Workspace", desc: "Live console, metrics, and quick actions in a real customer control surface.", progress: 92 },
  { icon: Puzzle, title: "Plugin Manager", desc: "Browse packages, check compatibility, and queue installs from a structured library.", progress: 64 },
  { icon: Boxes, title: "Mod Library", desc: "Search loader-aware mods, review dependencies, and route installs cleanly into /mods.", progress: 48 },
  { icon: Activity, title: "Server Insights", desc: "Track server health, install activity, and usage trends without leaving the panel.", progress: 76 },
];

const PLUGINS = [
  { name: "LuckPerms", ver: "v5.4.145", desc: "Permissions, groups, contexts, and editor sync for networked servers.", tags: ["Paper", "Permissions"], installed: true },
  { name: "BlueMap", ver: "v5.4", desc: "Render a live web map and keep world previews in sync with production.", tags: ["Paper", "Maps"] },
  { name: "spark", ver: "v1.10.119", desc: "Profile ticks, timings, and memory pressure before performance issues spread.", tags: ["Paper", "Profiling"] },
  { name: "Chunky", ver: "v1.4.28", desc: "Pre-generate terrain in clean jobs before opening new regions to players.", tags: ["Paper", "Worlds"] },
];

export default function PanelShowcase() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Your control panel, done right</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to run a server — console, plugins, mods and insights in one place.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="space-y-3">
          {PANEL_FEATURES.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-5 hover:ring-glow-blossom transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl grad-btn flex items-center justify-center shrink-0">
                  <f.icon className="w-4 h-4 text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{f.desc}</p>
                  <div className="mt-4 h-1 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }} whileInView={{ width: `${f.progress}%` }}
                      viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.15 }}
                      className="h-full grad-btn"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
          className="glass rounded-3xl p-6"
        >
          <div className="flex items-center justify-between gap-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="w-2 h-2 rounded-full bg-muted" />
              <span className="w-2 h-2 rounded-full bg-muted" />
              <span className="ml-2 text-[11px] tracking-[0.18em] text-muted-foreground uppercase">Legacy Plugin Manager</span>
            </div>
            <span className="glass rounded-xl px-3 py-1.5 text-xs">Paper 1.21.5</span>
          </div>

          <h3 className="font-display text-xl font-bold mb-2">Structured plugin library</h3>
          <p className="text-sm text-muted-foreground mb-5">Search, compare and prepare installs from a clean marketplace that mirrors the real console experience.</p>

          <div className="glass rounded-xl flex items-center gap-2 px-3 py-2.5 mb-4">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Search plugins, categories, or versions</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {PLUGINS.map((p) => (
              <div key={p.name} className={`glass rounded-xl p-4 ${p.installed ? "ring-1 ring-primary/50" : ""}`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="font-medium text-sm">{p.name}</div>
                    <div className="text-[11px] text-muted-foreground">{p.ver}</div>
                  </div>
                  {p.installed && <span className="text-[10px] grad-btn text-primary-foreground px-2 py-0.5 rounded-full">Installed</span>}
                </div>
                <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
                <div className="flex gap-1.5 mt-3">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <a href="/support" className="mt-5 inline-flex items-center gap-2 text-sm text-primary hover:gap-3 transition-all">
            Preview plugin manager <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
