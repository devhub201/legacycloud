import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, MessageCircle } from "lucide-react";
import { DISCORD } from "@/data/plans";

const FAQ = [
  { q: "Instant setup kitna fast hai?", a: "Payment confirm hone ke 60 seconds ke andar server live ho jata hai — panel login details Discord DM aur email par aa jaati hain." },
  { q: "Kya renewal price badhta hai?", a: "Nahi. Jis price par sign up kiya, wahi renewal price rehta hai — ₹15/GB budget aur ₹20/GB premium." },
  { q: "Which Minecraft versions are supported?", a: "1.7 se latest release tak — Paper, Purpur, Spigot, Fabric, Forge, NeoForge, Velocity, BungeeCord aur 1000+ modpacks." },
  { q: "Do you offer refunds?", a: "Haan — first order par 24 ghante ka no-questions refund window hai, jab tak ToS violation na ho." },
  { q: "Is DDoS protection included?", a: "Every Minecraft and VPS plan par always-on L3/L4/L7 filtering included hai, koi extra charge nahi." },
  { q: "Can I upgrade my plan later?", a: "Panel se ek click mein RAM, CPU ya disk upgrade karo — prorated billing, no reinstall, data safe." },
  { q: "Do I get full root on VPS?", a: "Yes — KVM VPS par full root access, custom ISO, aur reverse DNS control milta hai." },
  { q: "How do I get support?", a: "Discord par tickets — median first response 10 minute se kam. Billing ke liye email bhi kar sakte ho." },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-5">
          <HelpCircle className="w-3 h-3 text-info" /> Answers in plain language
        </span>
        <h1 className="font-display text-4xl md:text-5xl font-bold">
          Frequently asked <span className="text-gradient-anim">questions</span>
        </h1>
      </motion.div>

      <div className="space-y-3">
        {FAQ.map((f, i) => (
          <motion.div
            key={f.q}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: (i % 4) * 0.04 }}
            className="glass rounded-2xl overflow-hidden hover-lift"
          >
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 p-5 text-left"
            >
              <span className="font-medium text-sm md:text-base">{f.q}</span>
              <ChevronDown className={`w-4 h-4 text-primary shrink-0 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {open === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <a href={DISCORD} target="_blank" rel="noreferrer"
        className="mt-10 inline-flex items-center gap-2 grad-btn text-primary-foreground font-medium px-6 py-3 rounded-xl">
        <MessageCircle className="w-4 h-4" /> Still confused? Ask on Discord
      </a>
    </div>
  );
}
