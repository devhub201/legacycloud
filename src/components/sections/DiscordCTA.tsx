import { motion } from "framer-motion";
import { MessageCircle, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DiscordCTA = () => (
  <section id="community" className="py-24">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden rounded-3xl glass-card p-10 md:p-16 text-center"
      >
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 via-transparent to-accent/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-6">
          <Users className="h-3.5 w-3.5" />
          5,000+ members
        </div>

        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4 tracking-tight max-w-3xl mx-auto">
          Join the Legacy Cloud <span className="text-gradient">community.</span>
        </h2>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8">
          Order servers, get support, and chat with thousands of fellow players and admins.
        </p>

        <a href="https://discord.gg/guxyBXut2E" target="_blank" rel="noreferrer">
          <Button size="lg" className="ring-glow text-base h-12 px-7 group">
            <MessageCircle className="mr-2 h-5 w-5" />
            Join Discord
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </a>
      </motion.div>
    </div>
  </section>
);

export default DiscordCTA;
