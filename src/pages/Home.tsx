import { useEffect } from "react";
import { useCategories, usePlans, usePageSections, type Section } from "@/lib/catalog";
import SectionRenderer from "@/components/SectionRenderer";
import { useSite } from "@/lib/site";

export default function Home() {
  const { brand } = useSite();
  const { data: sections = [], isLoading } = usePageSections("home");
  const { data: categories = [] } = useCategories();
  const { data: plans = [] } = usePlans();

  useEffect(() => {
    document.title = `${brand.name ?? "Legacy Cloud"} — Full-stack SaaS Cloud Hosting`;
  }, [brand.name]);

  return isLoading ? (
    <div className="max-w-6xl mx-auto px-6 py-24 space-y-6">
      <div className="h-40 glass rounded-3xl animate-pulse" />
      <div className="h-24 glass rounded-2xl animate-pulse" />
    </div>
  ) : (
    <SectionRenderer sections={sections as Section[]} categories={categories} plans={plans} />
  );
}
