import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import PlanCard from "@/components/PlanCard";
import { budgetMcPlans, powerfulMcPlans, budgetVpsPlans } from "@/data/plans";

type Tab = "budget-mc" | "powerful-mc" | "vps";

const tabs: { id: Tab; label: string }[] = [
  { id: "budget-mc", label: "Budget MC Plans" },
  { id: "powerful-mc", label: "Powerful MC Plans" },
  { id: "vps", label: "VPS Plans" },
];

const PlansPage = () => {
  const [tab, setTab] = useState<Tab>("budget-mc");
  const plans = tab === "budget-mc" ? budgetMcPlans : tab === "powerful-mc" ? powerfulMcPlans : budgetVpsPlans;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-10"
          >
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-3 tracking-tight">
              Choose Your <span className="text-gradient">Perfect Plan</span>
            </h1>
            <p className="text-lg text-muted-foreground">High performance plans for everyone</p>
          </motion.div>

          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1 rounded-full glass-card">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-5 py-2 text-sm font-medium rounded-full transition-all ${
                    tab === t.id ? "btn-pink ring-glow" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {plans.map((p, i) => <PlanCard key={p.name + i} plan={p} index={i} planType={tab === "vps" ? "vps" : "mc"} />)}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PlansPage;
