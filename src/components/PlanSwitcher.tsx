import { useState } from "react";
import { motion } from "framer-motion";
import PlanCard from "./PlanCard";
import { PlanGroup } from "@/data/plans";

export default function PlanSwitcher({ groups, labels }: { groups: PlanGroup[]; labels?: string[] }) {
  const [active, setActive] = useState(0);
  const group = groups[active];
  const tabs = labels ?? groups.map((g) => g.title);

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      <div className="flex justify-center mb-8">
        <div className="glass rounded-2xl p-1.5 flex gap-1.5">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setActive(i)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition ${
                active === i ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {active === i && (
                <motion.span layoutId="plan-tab" className="absolute inset-0 rounded-xl grad-btn" transition={{ type: "spring", stiffness: 340, damping: 30 }} />
              )}
              <span className="relative z-10">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">{group.title}</h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-xl">{group.blurb}</p>
        </div>
        <span className="glass rounded-full px-4 py-1.5 text-sm text-gradient-blossom font-semibold">{group.rate}</span>
      </div>

      <motion.div key={group.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {group.plans.map((p, i) => <PlanCard key={p.name} plan={p} index={i} group={group.title} />)}
      </motion.div>
    </section>
  );
}
