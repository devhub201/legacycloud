import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCategories, usePlans } from "@/lib/catalog";
import PlanSwitcher from "@/components/PlanSwitcher";
import { iconByName } from "@/lib/icons";

export default function CategoryPage() {
  const { slug } = useParams();
  const { data: categories = [], isLoading } = useCategories();
  const { data: plans = [] } = usePlans();
  const cat = categories.find((c) => c.slug === slug);
  const siblings = cat ? categories.filter((c) => c.kind === cat.kind) : [];

  useEffect(() => {
    if (cat) document.title = `${cat.name} — Legacy Cloud`;
  }, [cat]);

  if (isLoading) {
    return <div className="max-w-6xl mx-auto px-6 py-24"><div className="h-64 glass rounded-2xl animate-pulse" /></div>;
  }

  if (!cat) {
    return (
      <section className="max-w-3xl mx-auto px-6 py-28 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Category not found</h1>
        <Link to="/pricing" className="grad-btn text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium">Browse pricing</Link>
      </section>
    );
  }

  const Icon = iconByName(cat.icon);

  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-8 text-center">
        <span className={`icon-tile ${cat.tone} w-14 h-14 mx-auto mb-5`}><Icon className="w-6 h-6" /></span>
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
          <span className="text-gradient-anim">{cat.name}</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{cat.description ?? cat.tagline}</p>
      </section>
      <PlanSwitcher categories={siblings.length ? siblings : [cat]} plans={plans} />
    </>
  );
}
