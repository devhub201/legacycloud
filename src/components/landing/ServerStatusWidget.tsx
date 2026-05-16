import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Activity, Users, Server, Zap } from "lucide-react";

const ServerStatusWidget = () => {
  const [players, setPlayers] = useState(2847);
  const [uptime] = useState(99.98);

  useEffect(() => {
    const id = setInterval(() => {
      setPlayers((p) => p + Math.floor(Math.random() * 11) - 5);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const stats = [
    { icon: Activity, label: "Uptime (30d)", value: `${uptime}%`, color: "text-primary" },
    { icon: Users, label: "Players Online", value: players.toLocaleString(), color: "text-secondary" },
    { icon: Server, label: "Active Nodes", value: "142", color: "text-primary" },
    { icon: Zap, label: "Avg Response", value: "9ms", color: "text-secondary" },
  ];

  return (
    <section className="relative py-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl p-6 md:p-8 neon-border max-w-5xl mx-auto"
        >
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <h3 className="font-display text-xl font-bold">Live Network Status</h3>
            </div>
            <span className="text-xs text-primary font-display tracking-wider">ALL SYSTEMS OPERATIONAL</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-4 text-center"
              >
                <s.icon className={`h-5 w-5 mx-auto mb-2 ${s.color}`} />
                <div className="font-display text-2xl font-black">{s.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServerStatusWidget;
