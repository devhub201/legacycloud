import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, RefreshCw } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const cycles = [
  { months: 1, label: "1 Month", discount: 0 },
  { months: 3, label: "3 Months", discount: 5 },
  { months: 6, label: "6 Months", discount: 10 },
  { months: 12, label: "12 Months", discount: 20 },
];

const RenewPage = () => {
  const { serviceId } = useParams();
  const { user } = useAuth();
  const nav = useNavigate();
  const [svc, setSvc] = useState<any>(null);
  const [cycle, setCycle] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!serviceId) return;
    supabase.from("services").select("*").eq("id", serviceId).maybeSingle().then(({ data }) => setSvc(data));
  }, [serviceId]);

  if (!svc) return <DashboardLayout><div className="text-center py-12 text-muted-foreground">Loading...</div></DashboardLayout>;

  const selected = cycles.find((c) => c.months === cycle)!;
  const base = Number(svc.price) * cycle;
  const discount = (base * selected.discount) / 100;
  const total = base - discount;

  const renew = async () => {
    if (!user) return;
    setLoading(true);
    const { data: inv, error } = await supabase.from("invoices").insert({
      user_id: user.id, service_id: svc.id,
      amount: base, discount, total, status: "pending",
      items: [{ name: `Renew ${svc.plan_name}`, type: svc.plan_type, price: svc.price, qty: cycle }],
      due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
    }).select().single();
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Renewal invoice created!");
    nav(`/dashboard/invoices/${inv.id}`);
  };

  return (
    <DashboardLayout title="Renew Service">
      <div className="max-w-2xl mx-auto">
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-12 w-12 rounded-lg bg-primary/15 flex items-center justify-center">
              <RefreshCw className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold">{svc.plan_name}</h2>
              <div className="text-xs text-muted-foreground">{svc.ram} · {svc.cpu} · {svc.storage}</div>
            </div>
          </div>

          <div className="text-sm font-medium mb-3">Select billing cycle</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            {cycles.map((c) => (
              <button key={c.months} onClick={() => setCycle(c.months)}
                className={`p-3 rounded-lg border text-center transition ${cycle === c.months ? "border-primary bg-primary/10 ring-glow" : "border-border hover:border-primary/50"}`}>
                <div className="font-display font-bold">{c.label}</div>
                {c.discount > 0 && <div className="text-xs text-emerald-400">−{c.discount}%</div>}
              </button>
            ))}
          </div>

          <div className="space-y-2 text-sm border-t border-border pt-4">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal ({cycle} mo)</span><span>₹{base}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-400"><span>Cycle discount</span><span>−₹{discount.toFixed(0)}</span></div>}
            <div className="flex justify-between font-display text-lg font-bold border-t border-border pt-2">
              <span>Total</span><span className="text-gradient">₹{total.toFixed(0)}</span>
            </div>
          </div>

          <Button onClick={renew} disabled={loading} className="w-full btn-pink ring-glow h-11 mt-6">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : `Renew for ₹${total.toFixed(0)}`}
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default RenewPage;
