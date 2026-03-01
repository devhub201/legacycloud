import { motion } from "framer-motion";
import { Shield, Zap, Package, Clock, HardDrive, Download, Database, Settings } from "lucide-react";

const features = [
  { icon: Shield, title: "DDoS Protection", desc: "Enterprise-grade protection keeps your server online 24/7" },
  { icon: Zap, title: "Instant Setup", desc: "Your server is ready in under 30 seconds, no waiting" },
  { icon: Package, title: "Modpack Support", desc: "One-click install for Forge, Fabric, Paper, and more" },
  { icon: Clock, title: "99.9% Uptime", desc: "Guaranteed uptime with automatic failover systems" },
  { icon: HardDrive, title: "NVMe SSD Storage", desc: "Lightning-fast storage for zero-lag chunk loading" },
  { icon: Download, title: "One-Click Modpacks", desc: "Install popular modpacks like RLCraft, Pixelmon instantly" },
  { icon: Database, title: "Auto Backups", desc: "Automatic daily backups with one-click restore" },
  { icon: Settings, title: "Custom Panel", desc: "Intuitive control panel designed for gamers" },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Powerful</span> Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Everything you need to run the perfect Minecraft server
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass rounded-xl p-6 neon-border group cursor-default transition-shadow hover:box-glow"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <f.icon className="h-6 w-6 text-neon-purple" />
              </div>
              <h3 className="font-display text-sm font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
