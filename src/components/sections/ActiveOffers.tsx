import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Tag, ArrowRight, Copy, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

type Promo = { id: string; code: string; description: string | null; discount_percent: number };

const ActiveOffers = () => {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    supabase.from("promo_codes")
      .select("id, code, description, discount_percent")
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .then(({ data }) => setPromos((data ?? []) as Promo[]));
  }, []);

  if (promos.length === 0) return null;

  const copy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(code);
    toast.success(`Copied ${code}`);
    setTimeout(() => setCopied(null), 1500);
  };

  const apply = async (code: string) => {
    sessionStorage.setItem("pending_promo", code);
    if (!user) {
      toast.info(`${code} saved — login to apply at checkout`);
      return nav("/login");
    }
    const { data: cart } = await supabase.from("cart_items").select("id").eq("user_id", user.id).limit(1);
    if (!cart?.length) {
      toast.info(`${code} saved — add a plan to your cart first`);
      return nav("/plans");
    }
    toast.success(`${code} will auto-apply at checkout`);
    nav("/dashboard/checkout");
  };

  return (
    <section className="py-20 relative">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-primary mb-2">LIMITED TIME</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Current <span className="text-gradient">Offers</span>
            </h2>
          </div>
          <Link to="/offers"><Button variant="outline" className="border-primary/40 hover:bg-primary/10">All Offers <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {promos.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card rounded-2xl p-6 ring-glow border-primary/40 relative overflow-hidden"
            >
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              <div className="relative">
                <Tag className="h-6 w-6 text-primary mb-3" />
                <div className="font-display text-4xl font-bold text-gradient mb-1">
                  {p.discount_percent}% OFF
                </div>
                <div className="text-sm text-muted-foreground mb-5">{p.description ?? "Use this code at checkout."}</div>
                <button onClick={() => copy(p.code)} className="w-full flex items-center justify-between rounded-xl border-2 border-dashed border-primary/40 bg-primary/5 px-4 py-3 hover:bg-primary/10 transition-colors mb-3">
                  <span className="font-mono font-bold text-primary">{p.code}</span>
                  {copied === p.code ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4 text-primary" />}
                </button>
                <Button onClick={() => apply(p.code)} className="w-full btn-pink ring-glow">
                  <Sparkles className="h-4 w-4 mr-2" /> Apply at Checkout
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActiveOffers;
