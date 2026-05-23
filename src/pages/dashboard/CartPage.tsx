import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const CartPage = () => {
  const { user } = useAuth();
  const nav = useNavigate();
  const [items, setItems] = useState<any[]>([]);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from("cart_items").select("*").eq("user_id", user.id).order("created_at");
    setItems(data ?? []);
  };
  useEffect(() => { load(); }, [user]);

  const remove = async (id: string) => {
    await supabase.from("cart_items").delete().eq("id", id);
    toast.success("Removed");
    load();
  };

  const subtotal = items.reduce((s, i) => s + Number(i.price) * i.quantity, 0);
  const total = subtotal;

  return (
    <DashboardLayout title="Your Cart">
      {items.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <ShoppingCart className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
          <h3 className="font-display text-xl font-semibold mb-2">Your cart is empty</h3>
          <p className="text-muted-foreground mb-6">Browse plans and add servers to checkout.</p>
          <Link to="/plans"><Button className="btn-pink ring-glow">Browse Plans</Button></Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-3">
            {items.map((i) => (
              <div key={i.id} className="glass-card rounded-xl p-4 flex items-center gap-4">
                <div className="flex-1">
                  <div className="text-xs text-muted-foreground uppercase">{i.plan_type === "vps" ? "VPS" : "Minecraft"} · {i.billing_cycle}</div>
                  <h3 className="font-display font-semibold">{i.plan_name}</h3>
                  <div className="text-xs text-muted-foreground">{i.ram} RAM · {i.cpu} CPU · {i.storage}</div>
                </div>
                <div className="text-right">
                  <div className="font-display font-bold">₹{i.price}<span className="text-xs text-muted-foreground">/mo</span></div>
                </div>
                <Button size="icon" variant="ghost" onClick={() => remove(i.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
              </div>
            ))}
          </div>
          <div className="glass-card rounded-xl p-5 h-fit sticky top-20">
            <h3 className="font-display font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{subtotal}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>₹0</span></div>
              <div className="border-t border-border pt-2 mt-2 flex justify-between font-display text-lg font-bold">
                <span>Total</span><span className="text-gradient">₹{total}</span>
              </div>
            </div>
            <Button onClick={() => nav("/dashboard/checkout")} className="w-full btn-pink ring-glow">
              Checkout <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};
export default CartPage;
