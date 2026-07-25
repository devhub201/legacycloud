import PlanSection from "@/components/PlanSection";
import { MC_GROUPS } from "@/data/plans";

export default function Minecraft() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-14 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">
          Minecraft <span className="text-gradient-blossom">Hosting</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Budget plans at ₹15/GB for friend SMPs, Premium at ₹20/GB for modpacks and public networks.
          Every plan includes DDoS protection, full panel access and unlimited player slots.
        </p>
      </section>
      {MC_GROUPS.map((g) => <PlanSection key={g.id} group={g} />)}
    </>
  );
}
