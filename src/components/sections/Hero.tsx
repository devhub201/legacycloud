import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-mc.jpg";
import { DISCORD_INVITE } from "@/data/plans";

const Hero = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-24 pb-16 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroBg}
          alt="Legacy Cloud cherry blossom Minecraft world"
          width={1792}
          height={1024}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/40" />
      </div>

      <div className="container relative">
        <div className="max-w-2xl">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6"
          >
            High Performance<br />
            Hosting For <span className="text-gradient">Everyone.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-muted-foreground max-w-xl mb-4"
          >
            We provide ultra-fast, high-performance cloud hosting and gaming
            servers for you.
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="text-xs font-semibold tracking-[0.18em] text-primary mb-10"
          >
            24/7 SUPPORT · CHEAP RATES · MID-RANGE TO ULTRA USERS
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="flex flex-col sm:flex-row items-start gap-3"
          >
            <Link to="/plans">
              <Button size="lg" className="btn-pink ring-glow group h-12 px-7">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer">
              <Button size="lg" variant="outline" className="h-12 px-7 border-primary/40 hover:bg-primary/10">
                Join Discord
              </Button>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
