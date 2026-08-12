import { Helmet } from "react-helmet-async";
import { useCategories, usePlans, usePageSections, type Section } from "@/lib/catalog";
import SectionRenderer from "@/components/SectionRenderer";
import { useSite } from "@/lib/site";

export default function Home() {
  const { brand } = useSite();
  const { data: sections = [], isLoading } = usePageSections("home");
  const { data: categories = [] } = useCategories();
  const { data: plans = [] } = usePlans();

  return (
    <>
      <Helmet>
        <title>{brand.name} — Full-stack SaaS Cloud Hosting</title>
        <meta
          name="description"
          content={brand.tagline ?? "Game servers, VPS, web hosting and managed SaaS apps on one cloud platform."}
        />
      </Helmet>

      {isLoading ? (
        <div className="max-w-6xl mx-auto px-6 py-24 space-y-6">
          <div className="h-40 glass rounded-3xl animate-pulse" />
          <div className="h-24 glass rounded-2xl animate-pulse" />
        </div>
      ) : (
        <SectionRenderer sections={sections as Section[]} categories={categories} plans={plans} />
      )}
    </>
  );
}
