import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$4",
    ram: "2 GB",
    cpu: "1 vCPU",
    storage: "10 GB NVMe",
    players: "10 Players",
    features: ["DDoS Protection", "Instant Setup", "Daily Backups"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    ram: "6 GB",
    cpu: "2 vCPU",
    storage: "30 GB NVMe",
    players: "50 Players",
    features: ["DDoS Protection", "Instant Setup", "Hourly Backups", "Modpack Support", "Priority Support"],
    popular: true,
  },
  {
    name: "Ultimate",
    price: "$24",
    ram: "12 GB",
    cpu: "4 vCPU",
    storage: "60 GB NVMe",
    players: "100 Players",
    features: ["DDoS Protection", "Instant Setup", "Real-time Backups", "Modpack Support", "Dedicated IP", "24/7 Priority Support"],
    popular: false,
  },
  {
    name: "Enterprise",
    price: "$48",
    ram: "32 GB",
    cpu: "8 vCPU",
    storage: "150 GB NVMe",
    players: "Unlimited",
    features: ["DDoS Protection", "Instant Setup", "Real-time Backups", "Custom Modpacks", "Dedicated IP", "Dedicated Manager", "SLA Guarantee"],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Simple</span> Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            No hidden fees. Pick a plan and start playing in minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className={`glass rounded-xl p-6 relative transition-shadow ${
                plan.popular ? "box-glow neon-border border-primary/40" : "neon-border"
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground animate-glow-pulse">
                  Most Popular
                </Badge>
              )}
              <h3 className="font-display text-lg font-bold mb-1">{plan.name}</h3>
              <div className="mb-4">
                <span className="font-display text-4xl font-black gradient-text">{plan.price}</span>
                <span className="text-muted-foreground text-sm">/mo</span>
              </div>
              <div className="space-y-1 text-sm text-muted-foreground mb-4">
                <p>{plan.ram} RAM</p>
                <p>{plan.cpu}</p>
                <p>{plan.storage}</p>
                <p>{plan.players}</p>
              </div>
              <div className="border-t border-border/30 pt-4 mb-6 space-y-2">
                {plan.features.map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-3.5 w-3.5 text-neon-blue shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <Link to="/dashboard">
                <Button
                  className={`w-full font-display ${
                    plan.popular ? "bg-primary hover:bg-primary/80 box-glow" : "variant-outline neon-border bg-transparent hover:bg-muted/30"
                  }`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
