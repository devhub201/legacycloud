import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import PlanCard from "@/components/PlanCard";
import { budgetMcPlans, powerfulMcPlans, budgetVpsPlans } from "@/data/plans";

const PopularPlans = () => (
  <section className="py-20">
    <div className="container space-y-16">
      {[
        { title: "MC Budget Plans", gradient: "Budget Minecraft", plans: budgetMcPlans.slice(0, 3), type: "mc" as const, link: "/plans" },
        { title: "MC Premium Plans", gradient: "Premium Minecraft", plans: powerfulMcPlans.slice(0, 3), type: "mc" as const, link: "/plans" },
        { title: "VPS Plans", gradient: "VPS Hosting", plans: budgetVpsPlans.slice(0, 3), type: "vps" as const, link: "/vps" },
      ].map((g) => (
        <div key={g.title}>
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
                <span className="text-gradient">{g.gradient}</span>
              </h2>
              <p className="text-muted-foreground text-sm mt-2">Top-picked plans from our {g.title}.</p>
            </div>
            <Link to={g.link}>
              <Button variant="outline" className="border-primary/40 hover:bg-primary/10 group">
                View All <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {g.plans.map((p, i) => <PlanCard key={g.title + p.name} plan={p} index={i} planType={g.type} />)}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default PopularPlans;
