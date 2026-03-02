import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const locations = [
  { city: "New York", country: "USA", ping: "12ms", flag: "🇺🇸" },
  { city: "London", country: "UK", ping: "18ms", flag: "🇬🇧" },
  { city: "Frankfurt", country: "Germany", ping: "15ms", flag: "🇩🇪" },
  { city: "Singapore", country: "Singapore", ping: "22ms", flag: "🇸🇬" },
  { city: "São Paulo", country: "Brazil", ping: "20ms", flag: "🇧🇷" },
  { city: "Toronto", country: "Canada", ping: "14ms", flag: "🇨🇦" },
];

const LocationsSection = () => {
  return (
    <section id="locations" className="relative py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Global</span> Network
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Low-latency servers deployed worldwide for the best gaming experience
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.city}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="glass rounded-xl p-6 neon-border flex items-center gap-4 group hover:box-glow-teal transition-shadow"
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-2xl">
                  {loc.flag}
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-primary pulse-dot" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-sm font-semibold flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  {loc.city}
                </h3>
                <p className="text-xs text-muted-foreground">{loc.country}</p>
              </div>
              <div className="text-right">
                <span className="font-display text-sm font-bold text-primary">{loc.ping}</span>
                <p className="text-xs text-muted-foreground">latency</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
