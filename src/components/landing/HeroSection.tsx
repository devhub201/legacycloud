import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 neon-border">
            <Zap className="h-4 w-4 text-neon-blue" />
            <span className="text-sm text-muted-foreground">Next-Gen Minecraft Hosting</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight"
        >
          <span className="gradient-text">Ultimate</span>
          <br />
          <span className="text-foreground">Cloud</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
        >
          Blazing fast, always online Minecraft servers with DDoS protection,
          instant setup, and one-click modpack support. Built for gamers.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/dashboard">
            <Button size="lg" className="bg-primary hover:bg-primary/80 box-glow text-lg px-8 py-6 font-display">
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <a href="#pricing">
            <Button size="lg" variant="outline" className="neon-border text-lg px-8 py-6 font-display hover:bg-muted/30">
              View Plans
            </Button>
          </a>
        </motion.div>

        {/* Floating blocks */}
        <div className="absolute top-20 left-[10%] w-8 h-8 rounded bg-primary/30 border border-primary/20 animate-float" />
        <div className="absolute bottom-32 right-[15%] w-6 h-6 rounded bg-secondary/30 border border-secondary/20 animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-40 right-[20%] w-10 h-10 rounded bg-accent/20 border border-accent/20 animate-float" style={{ animationDelay: "4s" }} />
      </div>
    </section>
  );
};

export default HeroSection;
