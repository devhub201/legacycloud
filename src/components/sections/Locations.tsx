import { motion } from "framer-motion";

const locations = [
  { flag: "🇮🇳", country: "India", city: "Mumbai", ping: "< 10ms" },
  { flag: "🇸🇬", country: "Singapore", city: "Singapore", ping: "~ 60ms" },
  { flag: "🇩🇪", country: "Germany", city: "Frankfurt", ping: "~ 120ms" },
  { flag: "🇺🇸", country: "United States", city: "New York", ping: "~ 240ms" },
];

const Locations = () => (
  <section className="py-20">
    <div className="container">
      <div className="text-center mb-12">
        <div className="text-xs font-semibold tracking-[0.18em] text-primary mb-3">GLOBAL NETWORK</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          Servers across the <span className="text-gradient">globe.</span>
        </h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {locations.map((l, i) => (
          <motion.div
            key={l.country}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass-card rounded-2xl p-6 text-center hover:border-primary/50 transition-colors"
          >
            <div className="text-4xl mb-3">{l.flag}</div>
            <div className="font-display font-semibold">{l.country}</div>
            <div className="text-xs text-muted-foreground">{l.city}</div>
            <div className="text-xs text-primary mt-2 font-semibold">{l.ping}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Locations;
