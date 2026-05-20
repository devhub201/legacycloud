import { motion } from "framer-motion";
import { Gamepad2, Server, Globe, Bot, ArrowUpRight } from "lucide-react";

const services = [
  {
    icon: Gamepad2,
    title: "Minecraft Hosting",
    desc: "Vanilla, modded, and modpacks with one-click installers and instant scaling.",
    tag: "From $2/mo",
  },
  {
    icon: Server,
    title: "VPS Hosting",
    desc: "Root-access NVMe-backed VPS instances on AMD EPYC with KVM virtualization.",
    tag: "From $5/mo",
  },
  {
    icon: Globe,
    title: "Web Hosting",
    desc: "LiteSpeed-powered shared hosting with free SSL, daily backups, and CDN.",
    tag: "From $1/mo",
  },
  {
    icon: Bot,
    title: "Discord Bot Hosting",
    desc: "24/7 uptime for Node.js, Python, and Java bots with auto-restart and logs.",
    tag: "From $1/mo",
  },
];

const Services = () => (
  <section id="services" className="py-24">
    <div className="container">
      <div className="max-w-2xl mb-16">
        <div className="text-sm font-medium text-primary mb-3">Services</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Everything you need to host, ship, and scale.
        </h2>
        <p className="text-muted-foreground text-lg">
          One platform, four product lines — picked, tuned, and battle-tested for performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <motion.a
            key={s.title}
            href="https://discord.gg/guxyBXut2E"
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group glass-card rounded-2xl p-6 hover:border-primary/50 transition-all relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
            <div className="relative">
              <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{s.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary">{s.tag}</span>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
