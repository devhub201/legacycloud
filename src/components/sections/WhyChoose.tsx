import { motion } from "framer-motion";
import { Tag, Cpu, LifeBuoy, Rocket, Lock, Activity } from "lucide-react";

const items = [
  { icon: Tag, title: "Affordable Prices", desc: "Premium hardware at India-friendly INR pricing." },
  { icon: Cpu, title: "Powerful Hardware", desc: "Ryzen 7000 / 9000 series + DDR5 + NVMe Gen4." },
  { icon: LifeBuoy, title: "Reliable Support", desc: "Avg. ticket response < 10 minutes, 24x7." },
  { icon: Rocket, title: "Fast Deployment", desc: "Automated provisioning — ready in 60 seconds." },
  { icon: Lock, title: "Secure Infrastructure", desc: "DDoS protection, isolated containers, daily backups." },
  { icon: Activity, title: "High Availability", desc: "99.9% uptime SLA with redundant power & network." },
];

const WhyChoose = () => (
  <section className="py-20 relative">
    <div className="container">
      <div className="text-center mb-12">
        <div className="text-xs font-semibold tracking-[0.18em] text-primary mb-3">WHY LEGACY CLOUD</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          Built different. <span className="text-gradient">Priced fairly.</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 to-primary/5 border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <it.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">{it.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChoose;
