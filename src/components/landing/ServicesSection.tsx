import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import serviceMinecraft from "@/assets/service-minecraft.jpg";
import serviceVps from "@/assets/service-vps.jpg";
import serviceWeb from "@/assets/service-web.jpg";
import serviceBot from "@/assets/service-bot.jpg";

const DISCORD = "https://discord.gg/guxyBXut2E";

const services = [
  { name: "Minecraft Hosting", desc: "Lag-free Minecraft servers with instant setup, modpack support and DDoS protection.", img: serviceMinecraft },
  { name: "VPS Hosting", desc: "High-performance virtual private servers with NVMe SSD, root access and 1Gbps uplinks.", img: serviceVps },
  { name: "Web Hosting", desc: "Blazing fast web hosting with free SSL, unlimited bandwidth and a global CDN.", img: serviceWeb },
  { name: "Discord Bots", desc: "24/7 hosting for your Discord bots — Node, Python, and more, with auto-restart.", img: serviceBot },
];

const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-secondary/10 rounded-full blur-[150px]" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="section-divider mb-12">
          <span className="text-primary text-xl">✦</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Everything you need to launch and scale — from Minecraft realms to enterprise-grade VPS.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="glass rounded-xl overflow-hidden neon-border transition-shadow hover:box-glow flex flex-col"
            >
              <div className="aspect-video overflow-hidden">
                <img src={s.img} alt={s.name} loading="lazy" width={768} height={512} className="w-full h-full object-cover" />
              </div>
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-display text-base font-bold mb-2 text-primary">{s.name}</h3>
                <p className="text-sm text-muted-foreground mb-5 flex-1">{s.desc}</p>
                <a href={DISCORD} target="_blank" rel="noopener noreferrer">
                  <Button className="w-full font-display bg-primary hover:bg-primary/80 box-glow text-primary-foreground">
                    Buy Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
