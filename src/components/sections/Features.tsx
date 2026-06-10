import { motion } from "framer-motion";
import { Zap, HardDrive, Headphones, Shield, Rocket, Activity, Tag, Globe } from "lucide-react";

const features = [
  { icon: Zap, title: "Ultra Fast Performance", desc: "Latest-gen Ryzen CPUs tuned for low latency." },
  { icon: HardDrive, title: "NVMe SSD Storage", desc: "Up to 10x faster than legacy SATA SSDs." },
  { icon: Headphones, title: "24/7 Support", desc: "Real humans on Discord & tickets, any time." },
  { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade Layer 4/7 mitigation built-in." },
  { icon: Rocket, title: "Instant Setup", desc: "Server live in under 60 seconds after checkout." },
  { icon: Activity, title: "High Uptime", desc: "99.9% SLA backed by redundant infrastructure." },
  { icon: Tag, title: "Affordable Pricing", desc: "Starting at ₹30/mo — no hidden fees, ever." },
  { icon: Globe, title: "Multiple Locations", desc: "India, Singapore, Germany & United States." },
];

const Features = () => (
  <section id="features" className="py-20">
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 tracking-tight">
          Why Hosting On <span className="text-gradient">Legacy Cloud</span> Hits Different
        </h2>
        <p className="text-muted-foreground">Built for creators, communities, and businesses.</p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-colors text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display text-base font-semibold mb-2">{f.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
