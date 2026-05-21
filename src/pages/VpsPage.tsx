import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, HardDrive, Activity, Zap } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PlanCard from "@/components/PlanCard";
import { budgetVpsPlans, powerfulVpsPlans } from "@/data/plans";

const features = [
  { icon: Shield, label: "Full Root Access" },
  { icon: HardDrive, label: "NVMe SSD Storage" },
  { icon: Activity, label: "99.9% Uptime" },
  { icon: Zap, label: "Instant Setup" },
];

const VpsPage = () => {
  const [tab, setTab] = useState<"budget" | "powerful">("budget");
  const plans = tab === "budget" ? budgetVpsPlans : powerfulVpsPlans;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-3 tracking-tight">
              <span className="text-gradient">VPS Hosting</span>
            </h1>
            <p className="text-lg text-muted-foreground">Powerful VPS for everything you need</p>
          </motion.div>

          <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
            {features.map((f) => (
              <div key={f.label} className="glass-card rounded-full px-4 py-2 flex items-center gap-2 text-sm">
                <f.icon className="h-4 w-4 text-primary" /> {f.label}
              </div>
            ))}
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex p-1 rounded-full glass-card">
              {(["budget", "powerful"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all capitalize ${
                    tab === t ? "btn-pink ring-glow" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t} VPS Plans
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {plans.map((p, i) => <PlanCard key={p.name + i} plan={p} index={i} />)}
          </div>

          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold mb-5 text-center">All Locations</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { flag: "🇮🇳", country: "India", city: "Mumbai" },
                { flag: "🇸🇬", country: "Singapore", city: "Sg" },
                { flag: "🇩🇪", country: "Germany", city: "Frankfurt" },
                { flag: "🇺🇸", country: "United States", city: "New York" },
              ].map((l) => (
                <div key={l.country} className="glass-card rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{l.flag}</div>
                  <div className="font-semibold text-sm">{l.country}</div>
                  <div className="text-xs text-muted-foreground">{l.city}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VpsPage;
