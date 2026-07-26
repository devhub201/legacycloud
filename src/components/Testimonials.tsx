import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const REVIEWS = [
  { name: "Aarav S.", place: "Mumbai", stars: 5, text: "Shifted our 20-player SMP here. Zero lag spikes and support fixed a plugin conflict in minutes." },
  { name: "BlossomMia", place: "Australia", stars: 5, text: "The cherry blossom vibe sold me, the hardware kept me. Modpack loads faster than my old host." },
  { name: "Lucas F.", place: "Brazil", stars: 5, text: "VPS Premium runs my bots and panel together. Full root, snapshots, no downtime in 3 months." },
  { name: "xShadowPvP", place: "Germany", stars: 4, text: "PvP server with 30 players, TPS stays at 20. Frankfurt node ping is excellent." },
  { name: "Ryan P.", place: "Delhi", stars: 5, text: "₹15/GB pricing is unreal for this quality. Backups saved my world after a griefing incident." },
  { name: "NetherNico", place: "Netherlands", stars: 5, text: "Panel is clean, console is instant. Best budget host I've used, and I've used many." },
];

export default function Testimonials() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <div className="text-center mb-10">
        <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Loved by our community</h2>
        <p className="text-muted-foreground">Real vouches from players across 30+ countries.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {REVIEWS.map((r, i) => (
          <div key={r.name} className="[perspective:1000px]">
            <motion.div
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.05 }}
              whileHover={{ rotateX: 5, rotateY: -5, y: -4 }}
              style={{ transformStyle: "preserve-3d" }}
              className="glass rounded-2xl p-6 card-3d h-full"
            >
              <span aria-hidden className="card-sheen" />
              <Quote className="w-6 h-6 text-primary/60 mb-3" />
              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className={`w-3.5 h-3.5 ${s < r.stars ? "text-primary fill-current" : "text-muted"}`} />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full grad-btn flex items-center justify-center text-primary-foreground font-semibold text-sm">
                  {r.name[0]}
                </div>
                <div>
                  <div className="text-sm font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.place}</div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
