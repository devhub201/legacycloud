import { motion } from "framer-motion";
import { Cpu, ShieldCheck, Globe2, Rocket, Database, HeadphonesIcon } from "lucide-react";

const features = [
  { icon: Cpu, title: "AMD EPYC Hardware", desc: "Latest-gen CPUs with NVMe SSDs across every node." },
  { icon: ShieldCheck, title: "Enterprise DDoS", desc: "Always-on Layer 3/4/7 protection at no extra cost." },
  { icon: Globe2, title: "Global Network", desc: "Deploy in 8 regions spanning NA, EU, and Asia." },
  { icon: Rocket, title: "Instant Deploy", desc: "Provisioned in under 60 seconds. No waiting." },
  { icon: Database, title: "Daily Backups", desc: "Automated off-site backups with one-click restore." },
  { icon: HeadphonesIcon, title: "Real Humans", desc: "Average response under 5 minutes via Discord." },
];

const Features = () => (
  <section id="features" className="py-24 bg-card/30 border-y border-border">
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-sm font-medium text-primary mb-3">Why Legacy</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Built for the long run.
        </h2>
        <p className="text-muted-foreground text-lg">
          Every layer of our stack is engineered for reliability and speed.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="p-6 rounded-2xl glass-card hover:border-primary/40 transition-colors"
          >
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
