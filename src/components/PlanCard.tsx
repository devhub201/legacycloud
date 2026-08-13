import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check, Cpu, HardDrive, MemoryStick, ShoppingCart, Network } from "lucide-react";
import type { DbPlan } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import BlockIcon from "@/components/BlockIcon";

export default function PlanCard({
  plan,
  index = 0,
  group = "Plan",
  art,
  tone = "",
}: {
  plan: DbPlan;
  index?: number;
  group?: string;
  art?: string | null;
  tone?: string;
}) {
  const { add } = useCart();
  const { format } = useCurrency();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [9, -9]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-11, 11]), { stiffness: 200, damping: 18 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div className="[perspective:1200px]">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, delay: index * 0.06 }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        whileHover={{ y: -8 }}
        style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
        className={`relative glass-pro rounded-2xl p-5 flex flex-col overflow-hidden ${
          plan.is_popular ? "ring-2 ring-primary/60 ring-glow-blossom" : ""
        }`}
      >
        <span aria-hidden className="glass-sweep absolute inset-0 pointer-events-none" />

        {plan.is_popular && (
          <span className="absolute top-4 right-4 grad-btn text-primary-foreground text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full z-20">
            Popular
          </span>
        )}

        <div style={{ transform: "translateZ(40px)" }} className="relative flex flex-col flex-1">
          {/* Block banner */}
          <div
            className="pixel-banner mb-4 flex items-center gap-4 px-4"
            style={art ? { backgroundImage: `url(${art})` } : undefined}
          >
            <span className="relative z-10">
              <BlockIcon name={plan.name} size={54} />
            </span>
            <span className="relative z-10">
              <div className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">{group}</div>
              <h3 className="font-display text-xl font-bold leading-tight">{plan.name}</h3>
            </span>
          </div>

          <div className="mb-5">
            <span className="text-3xl font-bold text-gradient-blossom">{format(plan.price)}</span>
            <span className="text-sm text-muted-foreground">
              /{plan.billing_cycle === "yearly" ? "year" : "month"}
            </span>
          </div>

          <ul className="space-y-2.5 text-sm mb-6">
            {plan.ram && <li className="flex items-center gap-2"><MemoryStick className="w-4 h-4 text-primary shrink-0" /> {plan.ram} RAM</li>}
            {plan.cpu && <li className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary shrink-0" /> {plan.cpu}</li>}
            {plan.storage && <li className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary shrink-0" /> {plan.storage}</li>}
            {plan.bandwidth && <li className="flex items-center gap-2"><Network className="w-4 h-4 text-primary shrink-0" /> {plan.bandwidth}</li>}
            {plan.features.map((e) => (
              <li key={String(e)} className="flex items-center gap-2"><Check className="w-4 h-4 text-mint shrink-0" /> {String(e)}</li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              add({
                id: plan.id,
                name: plan.name,
                group,
                ram: plan.ram ?? "",
                cpu: plan.cpu ?? "",
                storage: plan.storage ?? "",
                price: plan.price,
              })
            }
            className="mt-auto text-sm font-semibold py-3 rounded-xl grad-btn text-primary-foreground flex items-center justify-center gap-2 hover:brightness-110 transition"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
