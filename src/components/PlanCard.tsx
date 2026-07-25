import { motion } from "framer-motion";
import { Check, Cpu, HardDrive, MemoryStick } from "lucide-react";
import { DISCORD, Plan } from "@/data/plans";

export default function PlanCard({ plan, index = 0 }: { plan: Plan; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -6 }}
      className={`relative glass rounded-2xl p-6 flex flex-col transition-shadow hover:ring-glow-blossom ${
        plan.popular ? "ring-2 ring-primary/60 ring-glow-blossom" : ""
      }`}
    >
      {plan.popular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 grad-btn text-primary-foreground text-[11px] font-semibold px-3 py-1 rounded-full">
          Most Popular
        </span>
      )}
      <h3 className="font-display text-xl font-bold">{plan.name}</h3>
      <div className="mt-3 mb-5">
        <span className="text-3xl font-bold text-gradient-blossom">₹{plan.price}</span>
        <span className="text-sm text-muted-foreground">/month</span>
      </div>
      <ul className="space-y-2.5 text-sm mb-6">
        <li className="flex items-center gap-2"><MemoryStick className="w-4 h-4 text-primary shrink-0" /> {plan.ram} RAM</li>
        <li className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary shrink-0" /> {plan.cpu}</li>
        <li className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary shrink-0" /> {plan.storage}</li>
        {plan.extras.map((e) => (
          <li key={e} className="flex items-center gap-2"><Check className="w-4 h-4 text-primary shrink-0" /> {e}</li>
        ))}
      </ul>
      <a
        href={DISCORD}
        target="_blank"
        rel="noreferrer"
        className="mt-auto text-center text-sm font-medium py-2.5 rounded-xl grad-btn text-primary-foreground"
      >
        Buy Now
      </a>
    </motion.div>
  );
}
