import { motion } from "framer-motion";
import { Shield, Zap, Package, Clock, HardDrive, Download, Database, Settings } from "lucide-react";

const features = [
  { icon: Zap, title: "Fast Performance", desc: "High-speed servers optimized for smooth, lag-free gameplay." },
  { icon: Settings, title: "Control Panel", desc: "Easily manage your server with our user-friendly dashboard." },
  { icon: Shield, title: "DDoS Protection", desc: "Stay safe with built-in protection against online attacks." },
  { icon: Database, title: "Global Servers", desc: "Choose from worldwide locations for the lowest ping." },
  { icon: Clock, title: "Unlimited Players", desc: "There is no limit on how many players can join your server." },
  { icon: Package, title: "Plugin / Mods", desc: "Easily install plugins or mods to customize your server." },
  { icon: Download, title: "Daily Backups", desc: "Our systems do backups every day to keep your data safe." },
  { icon: HardDrive, title: "Allocated Ports", desc: "Allocated ports specifically for your Minecraft server." },
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
                <f.icon className="h-6 w-6 text-primary" />
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
