import { motion } from "framer-motion";
import { Check, ArrowRight, Cpu, MapPin, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import blockDirt from "@/assets/block-dirt.png";
import blockCobblestone from "@/assets/block-cobblestone.png";
import blockIron from "@/assets/block-iron.png";
import blockRedstone from "@/assets/block-redstone.png";
import blockGold from "@/assets/block-gold.png";
import blockDiamond from "@/assets/block-diamond.png";
import blockNetherite from "@/assets/block-netherite.png";
import blockBeacon from "@/assets/block-beacon.png";

const plans = [
  { name: "Dirt plan", price: "$1", ram: "1GB RAM", cpu: "1 vCPU", storage: "10GB SSD Storage", uplink: "1000MBPS Uplink", img: blockDirt },
  { name: "Cobblestone plan", price: "$2", ram: "2GB RAM", cpu: "1 vCPU", storage: "20GB SSD Storage", uplink: "1000MBPS Uplink", img: blockCobblestone },
  { name: "Iron plan", price: "$4", ram: "4GB RAM", cpu: "2 vCPU", storage: "30GB SSD Storage", uplink: "1000MBPS Uplink", img: blockIron },
  { name: "Redstone plan", price: "$6", ram: "6GB RAM", cpu: "2 vCPU", storage: "40GB SSD Storage", uplink: "1000MBPS Uplink", img: blockRedstone },
  { name: "Gold plan", price: "$8", ram: "8GB RAM", cpu: "3 vCPU", storage: "50GB SSD Storage", uplink: "1000MBPS Uplink", img: blockGold },
  { name: "Diamond plan", price: "$12", ram: "12GB RAM", cpu: "4 vCPU", storage: "60GB SSD Storage", uplink: "1000MBPS Uplink", img: blockDiamond },
  { name: "Netherite plan", price: "$16", ram: "16GB RAM", cpu: "4 vCPU", storage: "80GB SSD Storage", uplink: "1000MBPS Uplink", img: blockNetherite },
  { name: "Beacon plan", price: "$24", ram: "24GB RAM", cpu: "6 vCPU", storage: "100GB SSD Storage", uplink: "1000MBPS Uplink", img: blockBeacon },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="relative py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/10 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
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
            Minecraft Hosting Plans
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass rounded-xl p-6 neon-border transition-shadow hover:box-glow"
            >
              {/* Block image */}
              <div className="flex justify-center mb-3">
                <img src={plan.img} alt={plan.name} className="w-16 h-16 object-contain" />
              </div>

              <h3 className="font-display text-sm font-bold mb-2 text-center text-primary">{plan.name}</h3>
              <div className="mb-5">
                <span className="font-display text-4xl font-black text-foreground">{plan.price}</span>
                <span className="text-muted-foreground text-sm"> /mo</span>
              </div>
              <div className="space-y-2 mb-5">
                {[plan.ram, plan.cpu, plan.storage, plan.uplink].map((f) => (
                  <div key={f} className="flex items-center gap-2 text-sm">
                    <Check className="h-3.5 w-3.5 text-primary shrink-0" />
                    <span className="text-muted-foreground">{f}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-border/30 pt-4 mb-5 space-y-1.5 text-xs text-muted-foreground">
                <div className="flex items-center gap-1.5"><Cpu className="h-3 w-3" /> Ryzen 9 7900x @ 5.6GHz</div>
                <div className="flex items-center gap-1.5"><MapPin className="h-3 w-3" /> EU, NA, SA, EUW</div>
                <div className="flex items-center gap-1.5"><Timer className="h-3 w-3" /> Fast Response: 10ms</div>
              </div>
              <a href="https://panel.legacycloud.com" target="_blank" rel="noopener noreferrer">
                <Button className="w-full font-display bg-primary hover:bg-primary/80 box-glow text-primary-foreground">
                  Deploy Server <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-5 neon-border text-center mt-10"
        >
          <p className="text-muted-foreground">Can't find what you need? <a href="#faq" className="text-primary hover:underline">Get in touch</a> for custom packages or services.</p>
        </motion.div>
      </div>
    </section>
  );
};

export default PricingSection;
