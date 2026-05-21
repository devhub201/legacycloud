import { MessageCircle, Users, Bell, Gift, MessagesSquare, Megaphone } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { DISCORD_INVITE } from "@/data/plans";

const perks = [
  { icon: Bell, label: "Fast Support" },
  { icon: Gift, label: "Giveaways & Events" },
  { icon: MessagesSquare, label: "Community Chat" },
  { icon: Megaphone, label: "Server Updates" },
];

const channels = [
  { name: "announcements", icon: Megaphone },
  { name: "updates", icon: Bell },
  { name: "giveaways", icon: Gift },
  { name: "support", icon: MessagesSquare },
  { name: "general", icon: Users },
  { name: "media", icon: MessageCircle },
];

const DiscordPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              Join Our <span className="text-gradient">Discord</span> Community
            </h1>
            <p className="text-muted-foreground mb-6">
              Join our Discord server to get support, updates, giveaways and more!
            </p>

            <ul className="space-y-3 mb-8">
              {perks.map((p) => (
                <li key={p.label} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 border border-primary/30 flex items-center justify-center">
                    <p.icon className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm">{p.label}</span>
                </li>
              ))}
            </ul>

            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer">
              <Button size="lg" className="btn-pink ring-glow h-12 px-7">
                <MessageCircle className="mr-2 h-5 w-5" /> Join Discord Server
              </Button>
            </a>
          </div>

          <div className="glass-card rounded-2xl p-5">
            <div className="flex items-center gap-3 pb-3 border-b border-border">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Legacy Cloud</div>
                <div className="text-xs text-muted-foreground">6,941 Members</div>
              </div>
            </div>

            <div className="grid grid-cols-[140px_1fr] gap-4 pt-4">
              <div className="space-y-1">
                {channels.map((c) => (
                  <div key={c.name} className="flex items-center gap-2 px-2 py-1.5 rounded-md text-xs text-muted-foreground hover:bg-muted/40 cursor-default">
                    <c.icon className="h-3.5 w-3.5" /> {c.name}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                <div className="text-[10px] text-muted-foreground">December 5, 2024</div>
                <div className="glass-card rounded-lg p-3">
                  <div className="text-xs font-semibold text-primary mb-1">Legacy Cloud</div>
                  <div className="text-sm">Welcome to Legacy Cloud Discord server!</div>
                </div>
                <div className="glass-card rounded-lg p-3">
                  <div className="text-xs font-semibold text-primary mb-1">CloudBot</div>
                  <div className="text-sm">Thank you for joining us! Enjoy your stay 💖</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default DiscordPage;
