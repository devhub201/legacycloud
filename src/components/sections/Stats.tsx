import { motion } from "framer-motion";

const stats = [
  { value: "6.9K+", label: "Discord Members" },
  { value: "99.9%", label: "Uptime" },
  { value: "<60s", label: "Deploy Time" },
  { value: "24/7", label: "Support" },
];

const Stats = () => (
  <section className="py-12 border-y border-border bg-card/30">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="text-center"
          >
            <div className="font-display text-3xl md:text-4xl font-bold text-gradient">{s.value}</div>
            <div className="text-xs text-muted-foreground mt-1 tracking-wider">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
