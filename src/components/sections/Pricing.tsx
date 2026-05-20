import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    price: "2",
    desc: "Perfect for small SMP servers and friends.",
    features: ["2 GB RAM", "Unlimited Slots", "NVMe Storage", "DDoS Protection"],
  },
  {
    name: "Pro",
    price: "8",
    desc: "Modded servers and growing communities.",
    features: ["8 GB RAM", "Priority CPU", "Modpack Installer", "Daily Backups", "24/7 Support"],
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "24",
    desc: "High-traffic networks and dedicated nodes.",
    features: ["24 GB RAM", "Dedicated vCores", "Multi-Region", "Premium Support", "Custom SLA"],
  },
];

const Pricing = () => (
  <section id="pricing" className="py-24 relative">
    <div className="absolute inset-0 -z-10 bg-grid opacity-20" />
    <div className="container">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="text-sm font-medium text-primary mb-3">Pricing</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Plans that grow with your community.
        </h2>
        <p className="text-muted-foreground text-lg">
          Transparent pricing. No hidden fees. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
        {tiers.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className={`relative rounded-2xl p-8 glass-card ${
              t.highlight ? "ring-glow border-primary/50" : ""
            }`}
          >
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                Most Popular
              </div>
            )}
            <div className="mb-6">
              <div className="font-display text-lg font-semibold mb-2">{t.name}</div>
              <div className="flex items-baseline gap-1 mb-3">
                <span className="text-muted-foreground">$</span>
                <span className="font-display text-5xl font-bold">{t.price}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <p className="text-sm text-muted-foreground">{t.desc}</p>
            </div>

            <ul className="space-y-3 mb-8">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  {f}
                </li>
              ))}
            </ul>

            <a href="https://discord.gg/guxyBXut2E" target="_blank" rel="noreferrer" className="block">
              <Button
                className={`w-full ${t.highlight ? "ring-glow" : ""}`}
                variant={t.highlight ? "default" : "outline"}
              >
                Get Started
              </Button>
            </a>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
