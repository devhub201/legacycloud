import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Cpu, HardDrive, MemoryStick, ShoppingCart } from "lucide-react";
import { Plan } from "@/data/plans";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";

export default function PlanCard({ plan, index = 0, group = "Plan" }: { plan: Plan; index?: number; group?: string }) {
  const { add } = useCart();
  const { format } = useCurrency();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [10, -10]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-12, 12]), { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className="[perspective:1200px]">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45, delay: index * 0.05 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`relative glass rounded-2xl p-6 flex flex-col card-3d ${
          plan.popular ? "ring-2 ring-primary/60 ring-glow-blossom" : ""
        }`}
      >
        <span aria-hidden className="card-sheen" />
        {plan.popular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 grad-btn text-primary-foreground text-[11px] font-semibold px-3 py-1 rounded-full">
            Most Popular
          </span>
        )}
        <div style={{ transform: "translateZ(38px)" }} className="flex flex-col flex-1">
          <h3 className="font-display text-xl font-bold">{plan.name}</h3>
          <div className="mt-3 mb-5">
            <span className="text-3xl font-bold text-gradient-blossom">{format(plan.price)}</span>
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
          <button
            onClick={() =>
              add({ name: plan.name, group, ram: plan.ram, cpu: plan.cpu, storage: plan.storage, price: plan.price })
            }
            className="mt-auto text-sm font-medium py-2.5 rounded-xl grad-btn text-primary-foreground flex items-center justify-center gap-2 hover:brightness-110 transition"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
  );
}
