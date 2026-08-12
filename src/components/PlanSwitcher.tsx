import { useState } from "react";
import { motion } from "framer-motion";
import PlanCard from "./PlanCard";
import type { Category, DbPlan } from "@/lib/catalog";

export default function PlanSwitcher({
  categories,
  plans,
}: {
  categories: Category[];
  plans: DbPlan[];
}) {
  const [active, setActive] = useState(0);
  const cat = categories[active];
  if (!cat) return null;
  const list = plans.filter((p) => p.category_id === cat.id);

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20">
      {categories.length > 1 && (
        <div className="flex justify-center mb-8">
          <div className="glass rounded-2xl p-1.5 flex gap-1.5 overflow-x-auto max-w-full">
            {categories.map((c, i) => (
              <button
                key={c.id}
                onClick={() => setActive(i)}
                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                  active === i ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {active === i && (
                  <motion.span layoutId="plan-tab" className="absolute inset-0 rounded-xl grad-btn" transition={{ type: "spring", stiffness: 340, damping: 30 }} />
                )}
                <span className="relative z-10">{c.name}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">{cat.name}</h2>
          {cat.description && <p className="text-muted-foreground text-sm mt-2 max-w-xl">{cat.description}</p>}
        </div>
        {cat.rate_label && (
          <span className="glass rounded-full px-4 py-1.5 text-sm text-gradient-blossom font-semibold">{cat.rate_label}</span>
        )}
      </div>

      <motion.div key={cat.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map((p, i) => (
          <PlanCard key={p.id} plan={p} index={i} group={cat.name} art={cat.image_url} tone={cat.tone} />
        ))}
      </motion.div>
      {list.length === 0 && (
        <p className="text-center text-muted-foreground text-sm py-10">No plans in this category yet.</p>
      )}
    </section>
  );
}
