import PlanCard from "./PlanCard";
import { PlanGroup } from "@/data/plans";

export default function PlanSection({ group }: { group: PlanGroup }) {
  return (
    <section id={group.id} className="max-w-6xl mx-auto px-6 pb-20">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-8">
        <div>
          <h2 className="font-display text-2xl md:text-3xl font-bold">{group.title}</h2>
          <p className="text-muted-foreground text-sm mt-2 max-w-xl">{group.blurb}</p>
        </div>
        <span className="glass rounded-full px-4 py-1.5 text-sm text-gradient-blossom font-semibold">{group.rate}</span>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {group.plans.map((p, i) => <PlanCard key={p.name} plan={p} index={i} />)}
      </div>
    </section>
  );
}
