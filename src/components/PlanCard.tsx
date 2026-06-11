import { motion } from "framer-motion";
import { Cpu, MemoryStick, HardDrive, Loader2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { type Plan } from "@/data/plans";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const PlanCard = ({ plan, index = 0, planType = "mc" }: { plan: Plan; index?: number; planType?: "mc" | "vps" }) => {
  const { user } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const buy = async () => {
    if (!user) {
      toast.info("Please login to continue");
      return nav("/login");
    }
    setLoading(true);
    const { error } = await supabase.from("cart_items").insert({
      user_id: user.id,
      plan_name: plan.name, plan_type: planType,
      ram: plan.ram, cpu: plan.cpu, storage: plan.storage,
      price: plan.price, billing_cycle: "monthly",
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Added to cart — redirecting to checkout");
    nav("/dashboard/checkout");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="glass-card rounded-2xl p-6 hover:border-primary/60 transition-all group relative overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
      <div className="relative flex flex-col items-center text-center">
        <img src={plan.image} alt={plan.name} loading="lazy" width={512} height={512}
          className="w-24 h-24 object-contain mb-4 drop-shadow-[0_0_20px_hsl(var(--primary)/0.4)] group-hover:scale-105 transition-transform" />
        <h3 className="font-display text-xl font-semibold mb-4">{plan.name}</h3>
        <ul className="text-sm text-muted-foreground space-y-2 mb-5 w-full">
          <li className="flex items-center justify-center gap-2"><Cpu className="h-3.5 w-3.5 text-primary" /> CPU: {plan.cpu}</li>
          <li className="flex items-center justify-center gap-2"><MemoryStick className="h-3.5 w-3.5 text-primary" /> RAM: {plan.ram}</li>
          <li className="flex items-center justify-center gap-2"><HardDrive className="h-3.5 w-3.5 text-primary" /> {plan.storage}</li>
        </ul>
        <div className="flex items-baseline gap-1 mb-5">
          <span className="text-primary text-lg">₹</span>
          <span className="font-display text-3xl font-bold">{plan.price}</span>
          <span className="text-muted-foreground text-sm">/month</span>
        </div>
        <Button onClick={buy} disabled={loading} className="w-full btn-pink ring-glow">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buy Now"}
        </Button>
      </div>
    </motion.div>
  );
};

export default PlanCard;
