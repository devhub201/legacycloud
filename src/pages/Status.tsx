import { LOCATIONS } from "@/data/plans";
import { CheckCircle2 } from "lucide-react";

const SERVICES = [
  { name: "Minecraft Nodes", uptime: "99.98%" },
  { name: "VPS Nodes", uptime: "99.99%" },
  { name: "Control Panel", uptime: "100%" },
  { name: "Billing & Discord Bot", uptime: "99.95%" },
];

export default function Status() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-16 pb-24">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Network <span className="text-gradient-blossom">Status</span></h1>
      <p className="text-muted-foreground mb-10">All systems are operating normally. Live incidents are posted in our Discord.</p>

      <div className="glass rounded-2xl p-6 mb-8 flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-success" />
        <div>
          <div className="font-medium">All systems operational</div>
          <div className="text-xs text-muted-foreground">No active incidents reported</div>
        </div>
      </div>

      <h2 className="font-display text-xl font-semibold mb-4">Services</h2>
      <div className="space-y-3 mb-12">
        {SERVICES.map((s) => (
          <div key={s.name} className="glass rounded-xl px-5 py-4 flex items-center justify-between">
            <span className="text-sm">{s.name}</span>
            <span className="flex items-center gap-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-muted-foreground">{s.uptime} · 30d</span>
            </span>
          </div>
        ))}
      </div>

      <h2 className="font-display text-xl font-semibold mb-4">Regions</h2>
      <div className="grid sm:grid-cols-2 gap-3">
        {LOCATIONS.map((l) => (
          <div key={l.city} className="glass rounded-xl px-5 py-4 flex items-center justify-between">
            <span className="text-sm">{l.flag} {l.city}</span>
            <span className="text-sm text-gradient-blossom font-semibold">{l.ping}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
