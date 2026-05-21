import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Gamepad2, Server, ArrowRight } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Features from "@/components/sections/Features";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Gamepad2,
    title: "Minecraft Hosting",
    desc: "Budget & Powerful Minecraft servers with NVMe SSDs, one-click modpack installs, and full DDoS protection. Starting at ₹40/month.",
    to: "/plans",
    tag: "Most Popular",
  },
  {
    icon: Server,
    title: "VPS Hosting",
    desc: "Full root access NVMe-backed VPS instances powered by enterprise hardware. Budget & Powerful tiers up to 128GB RAM.",
    to: "/vps",
    tag: "From ₹80/mo",
  },
];

const ServicesPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-3 tracking-tight">
            Our <span className="text-gradient">Services</span>
          </h1>
          <p className="text-lg text-muted-foreground">Everything you need to host, play, and scale.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="glass-card rounded-2xl p-8 hover:border-primary/60 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 text-xs px-2 py-1 rounded-full bg-primary/15 text-primary border border-primary/30">
                {s.tag}
              </div>
              <div className="w-14 h-14 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-5">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-2xl font-semibold mb-3">{s.title}</h3>
              <p className="text-muted-foreground mb-6">{s.desc}</p>
              <Link to={s.to}>
                <Button className="btn-pink ring-glow group">
                  View Plans <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <Features />
      </div>
    </main>
    <Footer />
  </div>
);

export default ServicesPage;
