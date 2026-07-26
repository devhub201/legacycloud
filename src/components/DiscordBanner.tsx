import { motion } from "framer-motion";
import { MessageCircle, ArrowRight } from "lucide-react";
import { DISCORD } from "@/data/plans";

export default function DiscordBanner() {
  return (
    <section className="max-w-6xl mx-auto px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}
        className="glass rounded-3xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center ring-glow-blossom"
      >
        <div>
          <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-6">
            <MessageCircle className="w-3 h-3 text-primary" /> Join our Discord
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold leading-tight mb-4">
            Need faster setup help or cloud onboarding?
          </h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Jump into the Legacy Cloud Discord and get direct help with plan activation, onboarding and product questions — from real humans.
          </p>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all">
            Open Discord Server <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <div className="[perspective:1000px]">
          <motion.a
            href={DISCORD}
            target="_blank"
            rel="noreferrer"
            whileHover={{ rotateY: -8, rotateX: 6, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200, damping: 18 }}
            style={{ transformStyle: "preserve-3d" }}
            className="block glass rounded-2xl p-4"
          >
            <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-gradient-to-br from-primary/30 via-accent/20 to-background flex flex-col items-center justify-center text-center">
              <span className="absolute top-3 left-3 text-[10px] glass px-2 py-0.5 rounded-md">Legacy Cloud</span>
              <MessageCircle className="w-14 h-14 text-primary drop-shadow-[0_0_24px_hsl(var(--primary))] mb-3" />
              <div className="font-display font-bold text-2xl leading-none">JOIN OUR</div>
              <div className="font-display font-bold text-3xl text-gradient-blossom">DISCORD</div>
              <div className="text-xs text-muted-foreground mt-2 tracking-[0.2em] uppercase">Community</div>
            </div>
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
