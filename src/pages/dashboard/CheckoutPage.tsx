import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, MessageCircle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CheckoutPage = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [method, setMethod] = useState("discord");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("cart_items").select("*").eq("user_id", user.id).then(({ data }) => {
      setItems(data ?? []);
      if (!data?.length) nav("/dashboard/cart");
    });
  }, [user, nav]);

  const subtotal = items.reduce((s, i) => s + Number(i.price) * i.quantity, 0);
  const discountAmt = (subtotal * discount) / 100;
  const total = subtotal - discountAmt;

  const applyPromo = async () => {
    if (!promo) return;
    const { data } = await supabase.from("promo_codes").select("*").eq("code", promo.toUpperCase()).eq("active", true).maybeSingle();
    if (!data) { setDiscount(0); return toast.error("Invalid code"); }
    setDiscount(data.discount_percent);
    toast.success(`${data.discount_percent}% off applied!`);
  };

  const placeOrder = async () => {
    if (!user) return;
    setLoading(true);
    const itemsJson = items.map((i) => ({ name: i.plan_name, type: i.plan_type, price: i.price, qty: i.quantity }));
    const { data: inv, error } = await supabase.from("invoices").insert({
      user_id: user.id, amount: subtotal, discount: discountAmt, total,
      status: "pending", items: itemsJson,
      due_date: new Date(Date.now() + 7 * 86400000).toISOString(),
    }).select().single();

    if (error) { setLoading(false); return toast.error(error.message); }

    for (const i of items) {
      await supabase.from("services").insert({
        user_id: user.id, plan_name: i.plan_name, plan_type: i.plan_type,
        ram: i.ram, cpu: i.cpu, storage: i.storage, price: i.price, status: "pending",
      });
    }
    await supabase.from("cart_items").delete().eq("user_id", user.id);
    toast.success("Order placed!");
    nav(`/dashboard/invoices/${inv.id}`);
  };

  return (
    <DashboardLayout title="Checkout">
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass-card rounded-xl p-5">
            <h3 className="font-display font-semibold mb-4">Order Summary</h3>
            {items.map((i) => (
              <div key={i.id} className="flex justify-between py-2 border-b border-border/40 last:border-0">
                <div>
                  <div className="font-medium text-sm">{i.plan_name}</div>
                  <div className="text-xs text-muted-foreground">{i.ram} · {i.billing_cycle}</div>
                </div>
                <div className="font-semibold">₹{i.price}</div>
              </div>
            ))}
          </div>

          <div className="glass-card rounded-xl p-5">
            <h3 className="font-display font-semibold mb-4">Payment Method</h3>
            <RadioGroup value={method} onValueChange={setMethod}>
              {[
                { v: "discord", l: "Discord (UPI / Bank Transfer)", d: "Complete payment in our Discord ticket" },
                { v: "upi", l: "UPI", d: "Pay via any UPI app" },
                { v: "card", l: "Credit/Debit Card", d: "Coming soon" },
                { v: "paypal", l: "PayPal", d: "Coming soon" },
              ].map((o) => (
                <label key={o.v} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/30 cursor-pointer">
                  <RadioGroupItem value={o.v} id={o.v} className="mt-1" />
                  <div>
                    <div className="font-medium text-sm">{o.l}</div>
                    <div className="text-xs text-muted-foreground">{o.d}</div>
                  </div>
                </label>
              ))}
            </RadioGroup>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 h-fit space-y-4 sticky top-20">
          <div>
            <Label className="text-xs">Promo Code</Label>
            <div className="flex gap-2 mt-1">
              <Input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="LEGACY25" />
              <Button variant="outline" onClick={applyPromo}>Apply</Button>
            </div>
          </div>
          <div className="space-y-2 text-sm border-t border-border pt-4">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal}</span></div>
            {discount > 0 && <div className="flex justify-between text-emerald-400"><span>Discount ({discount}%)</span><span>−₹{discountAmt.toFixed(2)}</span></div>}
            <div className="border-t border-border pt-2 flex justify-between font-display text-lg font-bold">
              <span>Total</span><span className="text-gradient">₹{total.toFixed(2)}</span>
            </div>
          </div>
          <Button onClick={placeOrder} disabled={loading} className="w-full btn-pink ring-glow h-11">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><MessageCircle className="h-4 w-4 mr-2" />Pay ₹{total.toFixed(0)}</>}
          </Button>
          <p className="text-xs text-muted-foreground text-center">After placing order, complete payment via Discord ticket.</p>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default CheckoutPage;
