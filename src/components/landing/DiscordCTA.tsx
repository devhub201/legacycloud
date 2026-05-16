import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { MessageCircle, Users, Activity, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const INVITE_CODE = "guxyBXut2E";
const DISCORD_URL = `https://discord.gg/${INVITE_CODE}`;

const DiscordCTA = () => {
  const [members, setMembers] = useState<number | null>(null);
  const [online, setOnline] = useState<number | null>(null);

  useEffect(() => {
    fetch(`https://discord.com/api/v10/invites/${INVITE_CODE}?with_counts=true`)
      .then((r) => r.json())
      .then((data) => {
        if (data?.approximate_member_count) setMembers(data.approximate_member_count);
        if (data?.approximate_presence_count) setOnline(data.approximate_presence_count);
      })
      .catch(() => {});
  }, []);

  return (
    <section id="discord" className="relative py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#5865F2]/20 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-strong rounded-3xl p-10 md:p-14 neon-border text-center max-w-4xl mx-auto box-glow overflow-hidden relative"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-secondary/20 rounded-full blur-3xl" />

          <motion.div
            animate={{ rotate: [0, 8, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-[#5865F2]/20 border border-[#5865F2]/40 mb-6 relative z-10"
          >
            <MessageCircle className="h-10 w-10 text-[#7289DA]" />
          </motion.div>

          <h2 className="font-display text-3xl md:text-5xl font-black mb-4 relative z-10">
            Join the <span className="gradient-text">Legacy Cloud</span> Community
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 relative z-10">
            Hang out with thousands of server owners, get 24/7 support, exclusive perks, plugin help and giveaways — all on our Discord.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-8 relative z-10">
            <div className="glass rounded-xl px-6 py-4 neon-border min-w-[160px]">
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs mb-1">
                <Users className="h-3.5 w-3.5" /> Members
              </div>
              <div className="font-display text-3xl font-black text-primary">
                {members !== null ? members.toLocaleString() : "—"}
              </div>
            </div>
            <div className="glass rounded-xl px-6 py-4 neon-border min-w-[160px]">
              <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs mb-1">
                <Activity className="h-3.5 w-3.5" /> Online Now
              </div>
              <div className="font-display text-3xl font-black text-primary flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                {online !== null ? online.toLocaleString() : "—"}
              </div>
            </div>
          </div>

          <a href={DISCORD_URL} target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block">
            <Button size="lg" className="bg-[#5865F2] hover:bg-[#4752C4] text-white text-lg px-10 py-7 font-display shadow-[0_0_40px_hsl(235,86%,65%,0.5)]">
              <MessageCircle className="mr-2 h-5 w-5" /> Join Discord <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default DiscordCTA;
