import { CheckCircle2 } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const systems = [
  { name: "All Systems", status: "Operational" },
  { name: "Minecraft Nodes", status: "Operational" },
  { name: "VPS Nodes", status: "Operational" },
  { name: "Website & API", status: "Operational" },
];

const detail = [
  { name: "Website", desc: "The main website and control panel" },
  { name: "API", desc: "API and authentication services" },
  { name: "Minecraft Hosting", desc: "All Minecraft game servers" },
  { name: "VPS Hosting", desc: "All VPS nodes and services" },
  { name: "Payments", desc: "Payment gateway and billing" },
];

const StatusPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 tracking-tight">System Status</h1>
          <p className="text-muted-foreground">Real time status of our services</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {systems.map((s) => (
            <div key={s.name} className="glass-card rounded-xl p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-success/15 border border-success/30 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-success" />
              </div>
              <div>
                <div className="font-semibold text-sm">{s.name}</div>
                <div className="text-xs text-success">{s.status}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-5">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="font-display text-xl font-semibold mb-5">Detailed Status</h2>
            <div className="divide-y divide-border">
              {detail.map((d) => (
                <div key={d.name} className="py-3 flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">{d.name}</div>
                    <div className="text-xs text-muted-foreground">{d.desc}</div>
                  </div>
                  <span className="text-xs font-semibold text-success">Operational</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center text-center">
            <div className="text-sm text-muted-foreground mb-2">Uptime</div>
            <div className="relative w-32 h-32 mb-3">
              <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                <circle cx="50" cy="50" r="42" fill="none" stroke="hsl(var(--success))" strokeWidth="6" strokeDasharray="264" strokeDashoffset="0" strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-display text-2xl font-bold">100%</div>
                <div className="text-[10px] text-muted-foreground">All Systems</div>
              </div>
            </div>
            <div className="text-xs text-muted-foreground">Last 30 Days</div>
            <div className="font-display text-lg font-bold">100% Uptime</div>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default StatusPage;
