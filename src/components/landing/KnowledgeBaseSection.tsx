import { motion } from "framer-motion";
import { BookOpen, Rocket, Puzzle, Shield, Settings, HelpCircle, ArrowRight } from "lucide-react";

const docs = [
  { icon: Rocket, title: "Getting Started", desc: "Spin up your first server in under 60 seconds.", count: "8 articles" },
  { icon: Puzzle, title: "Plugins & Mods", desc: "Install Spigot, Paper, Forge, Fabric modpacks.", count: "24 articles" },
  { icon: Settings, title: "Server Config", desc: "Tune server.properties, world settings & performance.", count: "16 articles" },
  { icon: Shield, title: "Security & Backups", desc: "DDoS protection, automatic backups & whitelisting.", count: "12 articles" },
  { icon: BookOpen, title: "Panel Guide", desc: "Master the control panel — files, console, schedules.", count: "20 articles" },
  { icon: HelpCircle, title: "Troubleshooting", desc: "Fix lag, crashes, connection issues and more.", count: "18 articles" },
];

const KnowledgeBaseSection = () => {
  return (
    <section id="docs" className="relative py-24">
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-secondary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="section-divider mb-12">
          <span className="text-primary text-xl">📚</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Knowledge Base</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Guides, tutorials & answers — everything you need to run an unstoppable server.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((d, i) => (
            <motion.a
              key={d.title}
              href="#faq"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-6 neon-border transition-shadow hover:box-glow group block"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition">
                <d.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-bold mb-2">{d.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{d.desc}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{d.count}</span>
                <span className="text-primary flex items-center gap-1 group-hover:translate-x-1 transition">
                  Browse <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KnowledgeBaseSection;
