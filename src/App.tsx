import { useState } from "react";
import { motion } from "framer-motion";
import {
  Boxes, Zap, Shield, Cpu, HardDrive, Globe, Terminal, Clock,
  Check, Sparkles, HeadphonesIcon, Server, ChevronDown, Rocket,
} from "lucide-react";
import logoAsset from "@/assets/legacy-cloud-logo.png.asset.json";


const DISCORD = "https://discord.gg/YFNWrZ68Dv";

type Plan = {
  name: string;
  tag: string;
  price: string;
  period: string;
  ram: string;
  storage: string;
  players: string;
  cpu: string;
  extra?: string;
  popular?: boolean;
  free?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "Starter",
    tag: "Auto-Sleep When Idle",
    price: "₹0", period: "/forever",
    ram: "4 GB DDR4 RAM", storage: "10 GB NVMe SSD",
    players: "Ideal for 8 Players", cpu: "Ryzen 5 CPU",
    free: true,
  },
  {
    name: "Creeper",
    tag: "24/7 Always Online",
    price: "₹149", period: "/month",
    ram: "4 GB DDR5 RAM", storage: "Unmetered NVMe SSD",
    players: "Ideal for 16 Players", cpu: "Ryzen 9 CPU",
    extra: "DDoS Protection",
  },
  {
    name: "Enderman",
    tag: "24/7 Always Online",
    price: "₹299", period: "/month",
    ram: "8 GB DDR5 RAM", storage: "Unmetered NVMe SSD",
    players: "Ideal for 32 Players", cpu: "Ryzen 9 CPU",
    extra: "DDoS Protection",
    popular: true,
  },
  {
    name: "Wither",
    tag: "24/7 Always Online",
    price: "₹599", period: "/month",
    ram: "16 GB DDR5 RAM", storage: "Unmetered NVMe SSD",
    players: "Ideal for 64 Players", cpu: "Ryzen 9 CPU",
    extra: "DDoS Protection",
  },
];

const FEATURES = [
  { icon: Cpu, title: "Premium Hardware",
    desc: "Ryzen 9 processors, DDR5 memory, and NVMe SSDs. Your world loads instantly, TPS stays at 20." },
  { icon: Rocket, title: "Instant Setup",
    desc: "Server ready in under 60 seconds. One-click plugins, modpacks, and version switching." },
  { icon: Shield, title: "DDoS Protection",
    desc: "Enterprise-grade filtering keeps your server online during attacks. 99.9% uptime guarantee." },
  { icon: Globe, title: "Global Locations",
    desc: "India, Singapore, Frankfurt, and New York — pick the region closest to your players." },
  { icon: Terminal, title: "Full Control Panel",
    desc: "Live console, file manager, SFTP, scheduled tasks, and MySQL databases included." },
  { icon: HeadphonesIcon, title: "24/7 Support",
    desc: "Real humans on Discord who actually know Minecraft. No copy-paste replies." },
];

const REVIEWS = [
  { name: "Aarav S.", country: "India",
    text: "Free plan handled our 6-friend SMP without a hiccup. Setup was under a minute — genuinely surprised." },
  { name: "MinecraftMia", country: "Australia",
    text: "Been using the panel for datapack testing. File manager + console access make it painless to iterate." },
  { name: "Lucas F.", country: "Brazil",
    text: "Moved from another host after constant lag. TPS is rock solid here even during 15+ player events." },
  { name: "xShadowPvP", country: "Germany",
    text: "10-player PvP server, TPS locked at 20. Upgraded to Ryzen tier — the difference is real." },
  { name: "Ryan P.", country: "India",
    text: "Support on Discord actually explained the plugin conflict instead of pasting a template. Stable for 2 months." },
  { name: "NetherNico", country: "Netherlands",
    text: "Started on free just to try — still here weeks later. Uptime is solid and the community is friendly." },
];

const FAQ = [
  { q: "How fast can I get my server running?",
    a: "Under 60 seconds. Pick a plan, name your server, and the panel provisions everything automatically — you'll be online before your friends finish joining Discord." },
  { q: "Can I upgrade or downgrade later?",
    a: "Yes. Upgrades apply instantly and you only pay the prorated difference. Downgrades kick in at the next billing cycle so you keep what you paid for." },
  { q: "Is DDoS protection actually included?",
    a: "Yes, on every plan including free. Enterprise-grade filtering at the network edge — your server stays reachable even during large attacks." },
  { q: "Can I install mods, plugins, and modpacks?",
    a: "Full control. Paper, Purpur, Spigot, Forge, Fabric, Quilt — all one click. Or upload your own JARs via SFTP." },
  { q: "What payment methods do you accept?",
    a: "UPI, cards (Visa/Mastercard/RuPay), PayPal, and crypto. Payments are handled through PCI-compliant providers." },
  { q: "Are backups included?",
    a: "Paid plans include daily automatic backups with one-click restore. You can also trigger manual backups anytime and download them." },
];

function Feature({ icon: Icon, title, desc }: (typeof FEATURES)[number]) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-6 ring-glow"
    >
      <div className="w-11 h-11 rounded-xl grad-btn flex items-center justify-center mb-4">
        <Icon className="w-5 h-5 text-primary-foreground" />
      </div>
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
    </motion.div>
  );
}

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={`relative glass rounded-2xl p-6 flex flex-col ${
        plan.popular ? "ring-2 ring-primary/60 ring-glow" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 grad-btn text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
          Most Popular
        </div>
      )}
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-xl font-bold">{plan.name}</h3>
        <Boxes className="w-6 h-6 text-primary/70" />
      </div>
      <p className="text-xs text-muted-foreground mb-4">{plan.tag}</p>
      <div className="mb-5">
        <span className="text-3xl font-bold grad-text">{plan.price}</span>
        <span className="text-sm text-muted-foreground">{plan.period}</span>
      </div>
      <ul className="space-y-2 text-sm mb-6">
        <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-primary shrink-0" /> {plan.ram}</li>
        <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-primary shrink-0" /> {plan.storage}</li>
        <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-primary shrink-0" /> {plan.players}</li>
        <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-primary shrink-0" /> {plan.cpu}</li>
        {plan.extra && (
          <li className="flex gap-2 items-center"><Check className="w-4 h-4 text-primary shrink-0" /> {plan.extra}</li>
        )}
      </ul>
      <a
        href={DISCORD}
        target="_blank"
        rel="noreferrer"
        className={`mt-auto text-center text-sm font-medium py-2.5 rounded-lg transition ${
          plan.free
            ? "border border-border hover:bg-secondary"
            : "grad-btn text-primary-foreground"
        }`}
      >
        {plan.free ? "Start Free" : "Get Started"}
      </a>
    </motion.div>
  );
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="font-medium">{q}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
          {a}
        </div>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={logoAsset.url}
            alt="Legacy Cloud logo"
            className="w-10 h-10 rounded-lg object-cover ring-1 ring-primary/40"
          />
          <span className="font-bold text-lg tracking-wide">Legacy <span className="grad-text">Cloud</span></span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#features" className="hover:text-foreground transition">Features</a>
          <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          <a href="#reviews" className="hover:text-foreground transition">Reviews</a>
          <a href="#faq" className="hover:text-foreground transition">FAQ</a>
        </nav>
        <a
          href={DISCORD}
          target="_blank"
          rel="noreferrer"
          className="grad-btn text-primary-foreground text-sm font-medium px-4 py-2 rounded-lg"
        >
          Join Discord
        </a>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-muted-foreground mb-6"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <Sparkles className="w-3 h-3 text-primary" />
          Free 4GB servers · No queue · No ads
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Minecraft servers <br />
          that <span className="grad-text">just work.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Free 4GB Minecraft hosting with low latency worldwide. No waiting queue,
          no ads, no fine print. Click create — you're playing in under a minute.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer"
            className="grad-btn text-primary-foreground font-medium px-6 py-3 rounded-xl flex items-center gap-2"
          >
            <Rocket className="w-4 h-4" /> Create Server
          </a>
          <a
            href="#pricing"
            className="glass font-medium px-6 py-3 rounded-xl hover:bg-secondary transition"
          >
            View Plans
          </a>
        </motion.div>

        {/* Stat row */}
        <div className="mt-16 grid grid-cols-3 max-w-2xl mx-auto gap-4">
          {[
            { n: "12,400+", l: "Players Online" },
            { n: "2,800+", l: "Active Servers" },
            { n: "99.9%", l: "Uptime" },
          ].map((s) => (
            <div key={s.l} className="glass rounded-xl p-4">
              <div className="text-2xl md:text-3xl font-bold grad-text">{s.n}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Legacy Cloud?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Premium hardware, instant provisioning, and a control panel that actually feels good to use.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {FEATURES.map((f) => <Feature key={f.title} {...f} />)}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Minecraft Hosting Plans</h2>
          <p className="text-muted-foreground">Start free or scale up. Cancel anytime, no hidden fees.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLANS.map((p) => <PlanCard key={p.name} plan={p} />)}
        </div>
      </section>

      {/* Reviews */}
      <section id="reviews" className="max-w-6xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Trusted by players worldwide</h2>
          <p className="text-muted-foreground">Real reviews from our community across 30+ countries.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((r) => (
            <motion.div
              key={r.name}
              whileHover={{ y: -3 }}
              className="glass rounded-2xl p-6"
            >
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full grad-btn flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.country}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="max-w-3xl mx-auto px-6 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Frequently asked questions</h2>
          <p className="text-muted-foreground">Everything you need to know before you start.</p>
        </div>
        <div className="space-y-3">
          {FAQ.map((f) => <FaqItem key={f.q} {...f} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <div className="glass rounded-3xl p-10 text-center ring-glow">
          <div className="w-14 h-14 mx-auto rounded-2xl grad-btn flex items-center justify-center mb-5">
            <Server className="w-7 h-7 text-primary-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Ready to launch?</h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            Join thousands of players hosting on Legacy Cloud. Start with a free 4GB server — upgrade only when you outgrow it.
          </p>
          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 grad-btn text-primary-foreground font-medium px-6 py-3 rounded-xl"
          >
            <Zap className="w-4 h-4" /> Get started on Discord
          </a>
        </div>
      </section>

      <footer className="border-t border-border/50 py-8 text-center text-sm text-muted-foreground">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded grad-btn flex items-center justify-center">
              <Boxes className="w-3.5 h-3.5 text-primary-foreground" />
            </div>
            <span>© {new Date().getFullYear()} Legacy Cloud</span>
          </div>
          <div className="flex items-center gap-5">
            <a href={DISCORD} target="_blank" rel="noreferrer" className="hover:text-foreground transition">Discord</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
            <a href="#faq" className="hover:text-foreground transition">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
