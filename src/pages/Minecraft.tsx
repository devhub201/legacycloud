import PlanSwitcher from "@/components/PlanSwitcher";
import { MC_GROUPS } from "@/data/plans";

export default function Minecraft() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">
          Minecraft <span className="text-gradient-blossom">Hosting</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Choose Budget at ₹15/GB for friend SMPs, or Premium at ₹20/GB for modpacks and public networks.
          Every plan includes DDoS protection, full panel access and unlimited player slots.
        </p>
      </section>
      <PlanSwitcher groups={MC_GROUPS} labels={["Budget", "Premium"]} />
    </>
  );
}
