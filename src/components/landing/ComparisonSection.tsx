import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const features = [
  { label: "RAM", values: ["2 GB", "8 GB", "24 GB"] },
  { label: "vCPU Cores", values: ["1", "3", "6"] },
  { label: "NVMe Storage", values: ["20 GB", "50 GB", "100 GB"] },
  { label: "Players Supported", values: ["~10", "~50", "Unlimited"] },
  { label: "Modpack Support", values: [false, true, true] },
  { label: "DDoS Protection", values: [true, true, true] },
  { label: "Daily Backups", values: [false, true, true] },
  { label: "Dedicated IP", values: [false, false, true] },
  { label: "Priority Support", values: [false, true, true] },
];

const plans = ["Cobblestone", "Gold", "Beacon"];

const Cell = ({ value }: { value: string | boolean }) => {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="h-5 w-5 text-primary mx-auto" />
    ) : (
      <X className="h-5 w-5 text-muted-foreground/50 mx-auto" />
    );
  }
  return <span className="text-sm font-display font-bold">{value}</span>;
};

const ComparisonSection = () => {
  return (
    <section id="compare" className="relative py-24">
      <div className="container mx-auto px-4 relative z-10">
        <div className="section-divider mb-12">
          <span className="text-primary text-xl">⚖</span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Compare Plans Side-by-Side</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Not sure which plan to pick? Here's a quick comparison of our most popular tiers.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-2xl neon-border overflow-x-auto max-w-5xl mx-auto"
        >
          <table className="w-full text-center min-w-[600px]">
            <thead>
              <tr className="border-b border-border/40">
                <th className="text-left p-5 font-display text-sm text-muted-foreground">Feature</th>
                {plans.map((p, i) => (
                  <th key={p} className={`p-5 font-display ${i === 1 ? "bg-primary/10 text-primary" : ""}`}>
                    {p}
                    {i === 1 && <div className="text-[10px] font-normal text-primary/80 mt-1">MOST POPULAR</div>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f.label} className="border-b border-border/20 last:border-0">
                  <td className="text-left p-4 text-sm text-muted-foreground">{f.label}</td>
                  {f.values.map((v, i) => (
                    <td key={i} className={`p-4 ${i === 1 ? "bg-primary/5" : ""}`}>
                      <Cell value={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
