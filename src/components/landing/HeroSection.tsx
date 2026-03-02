import { motion } from "framer-motion";
import { Zap, ArrowRight, Globe, Signal, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6 neon-border"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Limited Offer: Use Code <span className="font-bold text-primary">STARTER</span></span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            >
              Power Your{" "}
              <span className="gradient-text">Minecraft</span>
              <br />
              Server With Confidence.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-lg mb-6"
            >
              Power up your Minecraft server with unbeatable performance.
              No lag, no limits — <span className="text-primary underline">just smooth gameplay</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass rounded-lg px-5 py-3 inline-flex items-center gap-3 mb-8 neon-border"
            >
              <span className="text-sm">Rated <strong className="text-foreground">Excellent</strong></span>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">Based on <strong>100 reviews</strong></span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4"
            >
              <a href="#pricing">
                <Button size="lg" className="bg-primary hover:bg-primary/80 box-glow text-lg px-8 py-6 font-display text-primary-foreground">
                  View Plans <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="#faq">
                <Button size="lg" variant="outline" className="neon-border text-lg px-8 py-6 font-display hover:bg-muted/30">
                  Knowledgebase
                </Button>
              </a>
            </motion.div>
          </div>

          {/* Right side - floating info cards */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative h-[450px]">
              {/* Main glow circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-80 h-80 rounded-full bg-primary/10 border border-primary/20 blur-sm" />
              </div>

              {/* Global Network card */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 right-0 glass-strong rounded-xl px-5 py-4 neon-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="font-display text-xs font-bold">Global Network</span>
                </div>
                <div className="flex gap-2 text-xl">
                  🇺🇸 🇫🇷 🇩🇪 🇮🇳 🇧🇷 🇨🇦
                </div>
              </motion.div>

              {/* Ping card */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-44 right-4 glass-strong rounded-xl px-5 py-3 neon-border flex items-center gap-3"
              >
                <span className="text-primary font-display text-sm font-bold">⚡ UltimateCloud</span>
                <span className="font-display text-sm font-bold">16 ms</span>
                <Signal className="h-4 w-4 text-primary" />
              </motion.div>

              {/* Uptime card */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-16 right-8 glass-strong rounded-xl px-5 py-3 neon-border flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4 text-primary" />
                <span className="font-display text-sm font-bold">99.9% Server Uptime</span>
              </motion.div>

              {/* Floating blocks */}
              <div className="absolute top-20 left-16 w-8 h-8 rounded bg-primary/30 border border-primary/20 animate-float" />
              <div className="absolute bottom-32 left-8 w-6 h-6 rounded bg-secondary/30 border border-secondary/20 animate-float" style={{ animationDelay: "2s" }} />
              <div className="absolute top-52 left-32 w-10 h-10 rounded bg-accent/20 border border-accent/20 animate-float" style={{ animationDelay: "4s" }} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
