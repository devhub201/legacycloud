import PlanSwitcher from "@/components/PlanSwitcher";
import { VPS_GROUPS } from "@/data/plans";

export default function Vps() {
  return (
    <>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-10 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold mb-5">
          VPS <span className="text-gradient-blossom">Hosting</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Full root KVM virtual servers on NVMe storage. Budget at ₹40/GB, Premium dedicated cores at ₹65/GB.
          Ubuntu, Debian, AlmaLinux or Windows — your choice.
        </p>
      </section>
      <PlanSwitcher groups={VPS_GROUPS} labels={["Budget", "Premium"]} />
    </>
  );
}
