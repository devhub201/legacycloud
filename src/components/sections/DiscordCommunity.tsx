import { MessageCircle, Users, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCORD_INVITE } from "@/data/plans";

const DiscordCommunity = () => (
  <section className="py-20">
    <div className="container">
      <div className="glass-card rounded-3xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-xs font-semibold text-primary mb-4">
              <MessageCircle className="h-3.5 w-3.5" /> DISCORD COMMUNITY
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
              Join <span className="text-gradient">2,500+</span> gamers & developers.
            </h2>
            <p className="text-muted-foreground mb-6">
              Get live support, server giveaways, plan launches, and connect with builders running their dream Minecraft servers and VPS projects.
            </p>
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer">
              <Button size="lg" className="btn-pink ring-glow h-12 px-7">Join Discord</Button>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-6 text-center">
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="font-display text-3xl font-bold text-gradient">2,547</div>
              <div className="text-xs text-muted-foreground mt-1">Members</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center">
              <Circle className="h-6 w-6 text-emerald-400 fill-emerald-400 mx-auto mb-2" />
              <div className="font-display text-3xl font-bold text-emerald-400">428</div>
              <div className="text-xs text-muted-foreground mt-1">Online Now</div>
            </div>
            <div className="glass-card rounded-2xl p-6 text-center col-span-2">
              <div className="font-display text-xl font-semibold mb-1">Legacy Cloud Official</div>
              <div className="text-xs text-muted-foreground">Daily giveaways · Free server reviews · 24/7 staff</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default DiscordCommunity;
