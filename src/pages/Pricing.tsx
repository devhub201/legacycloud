import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useCategories, usePlans } from "@/lib/catalog";
import PlanSwitcher from "@/components/PlanSwitcher";
import { iconByName } from "@/lib/icons";

export default function Pricing() {
  const { data: categories = [], isLoading } = useCategories();
  const { data: plans = [] } = usePlans();

  useEffect(() => { document.title = "Pricing — Legacy Cloud SaaS Hosting"; }, []);

  const kinds = [...new Set(categories.map((c) => c.kind))];

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">
          Simple <span className="text-gradient-anim">cloud pricing</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Game servers, VPS, web hosting and managed SaaS apps — pick a category, pay monthly in ₹ or $.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-7">
          {categories.map((c) => {
            const Icon = iconByName(c.icon);
            return (
              <Link key={c.id} to={`/hosting/${c.slug}`} className="glass rounded-full pl-2 pr-4 py-1.5 text-sm flex items-center gap-2 hover:bg-secondary transition">
                <span className={`icon-tile ${c.tone} w-7 h-7`}><Icon className="w-3.5 h-3.5" /></span>
                {c.name}
              </Link>
            );
          })}
        </div>
      </section>

      {isLoading && <div className="max-w-6xl mx-auto px-6 pb-20"><div className="h-64 glass rounded-2xl animate-pulse" /></div>}

      {kinds.map((k) => (
        <div key={k}>
          <div className="max-w-6xl mx-auto px-6 pt-6">
            <h2 className="font-display text-xl font-bold text-muted-foreground uppercase tracking-wider text-xs">{k}</h2>
          </div>
          <PlanSwitcher categories={categories.filter((c) => c.kind === k)} plans={plans} />
        </div>
      ))}

      <section className="max-w-6xl mx-auto px-6 pb-20 text-center">
        <Link to="/support" className="glass px-6 py-3 rounded-xl text-sm font-semibold inline-flex items-center gap-2 hover:bg-secondary transition">
          Need a custom quote? <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </>
  );
}
