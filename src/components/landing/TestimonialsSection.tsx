import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  { name: "Alex_Builder", role: "Survival Server", text: "Best hosting I've ever used. Zero lag even with 50+ players online!", rating: 5 },
  { name: "CraftMaster99", role: "Modded Server", text: "The modpack support is incredible. One-click install and everything just works.", rating: 5 },
  { name: "PixelQueen", role: "Creative Server", text: "Amazing uptime and the control panel is super easy to use.", rating: 5 },
  { name: "RedstoneKing", role: "Technical Server", text: "Ryzen 9 performance is no joke. My redstone contraptions run flawlessly.", rating: 4 },
  { name: "NetherExplorer", role: "Adventure Server", text: "Customer support responds in minutes, not hours. Really impressed!", rating: 5 },
  { name: "DiamondHunter", role: "SMP Server", text: "Switched from another host and the difference is night and day.", rating: 5 },
  { name: "EnderDragon_X", role: "PvP Server", text: "Low latency across all regions. Our PvP community loves it.", rating: 5 },
  { name: "BlockWizard", role: "Minigames Server", text: "The daily backups saved us once. Will never switch to another host.", rating: 5 },
];

const TestimonialsSection = () => {
  return (
    <section className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="section-divider mb-12">
          <span className="text-primary text-xl">⚔</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            What Our Clients Are Saying
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-6 neon-border text-center transition-shadow hover:box-glow"
            >
              <div className="flex justify-center gap-0.5 mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className={`h-4 w-4 ${j < t.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
              <p className="font-display text-xs font-bold">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
