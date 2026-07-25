import { DISCORD } from "@/data/plans";
import { MessageCircle, Mail, BookOpen, Clock } from "lucide-react";

export default function Support() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Need a <span className="text-gradient-blossom">hand?</span></h1>
      <p className="text-muted-foreground mb-10">Our team lives on Discord and replies fast — usually within a few minutes.</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <a href={DISCORD} target="_blank" rel="noreferrer" className="glass rounded-2xl p-6 hover:ring-glow-blossom transition-shadow">
          <MessageCircle className="w-6 h-6 text-primary mb-3" />
          <h2 className="font-display font-semibold mb-1">Discord Support</h2>
          <p className="text-sm text-muted-foreground">Fastest way to reach us. Open a ticket in #support.</p>
        </a>
        <a href="mailto:support@legacycloud.fun" className="glass rounded-2xl p-6 hover:ring-glow-blossom transition-shadow">
          <Mail className="w-6 h-6 text-primary mb-3" />
          <h2 className="font-display font-semibold mb-1">Email</h2>
          <p className="text-sm text-muted-foreground">support@legacycloud.fun — for billing and account issues.</p>
        </a>
        <div className="glass rounded-2xl p-6">
          <Clock className="w-6 h-6 text-primary mb-3" />
          <h2 className="font-display font-semibold mb-1">Hours</h2>
          <p className="text-sm text-muted-foreground">24/7 for outages. 9 AM – 2 AM IST for everything else.</p>
        </div>
        <div className="glass rounded-2xl p-6">
          <BookOpen className="w-6 h-6 text-primary mb-3" />
          <h2 className="font-display font-semibold mb-1">Knowledgebase</h2>
          <p className="text-sm text-muted-foreground">Setup guides, plugin help and modpack tutorials in our Discord.</p>
        </div>
      </div>

      <h2 className="font-display text-2xl font-bold mb-4">Common fixes</h2>
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="glass rounded-xl p-5"><span className="text-foreground font-medium">Server won't start:</span> check the console for a plugin error, then remove the newest JAR you added.</div>
        <div className="glass rounded-xl p-5"><span className="text-foreground font-medium">Can't connect:</span> confirm you're using the exact IP:port from the panel and that the version matches.</div>
        <div className="glass rounded-xl p-5"><span className="text-foreground font-medium">Lag / low TPS:</span> reduce view-distance, pregenerate the world, and check for entity farms.</div>
      </div>
    </div>
  );
}
