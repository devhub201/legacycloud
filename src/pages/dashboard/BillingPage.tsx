import { useEffect, useState } from "react";
import { Wallet, ArrowDown, ArrowUp, MessageCircle } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { DISCORD_INVITE } from "@/data/plans";

const BillingPage = () => {
  const { user, profile } = useAuth();
  const [tx, setTx] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("transactions").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(10),
      supabase.from("invoices").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
    ]).then(([t, i]) => { setTx(t.data ?? []); setInvoices(i.data ?? []); });
  }, [user]);

  return (
    <DashboardLayout title="Billing Overview">
      <div className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-4">
              <Wallet className="h-5 w-5 text-primary mb-2" />
              <div className="text-xs text-muted-foreground">Wallet Balance</div>
              <div className="font-display text-2xl font-bold">₹{Number(profile?.balance ?? 0).toFixed(2)}</div>
            </div>
            <div className="glass-card rounded-xl p-4">
              <ArrowUp className="h-5 w-5 text-emerald-400 mb-2" />
              <div className="text-xs text-muted-foreground">Lifetime Spent</div>
              <div className="font-display text-2xl font-bold">₹{invoices.filter(i => i.status === "paid").reduce((s, i) => s + Number(i.total), 0).toFixed(0)}</div>
            </div>
            <div className="glass-card rounded-xl p-4">
              <ArrowDown className="h-5 w-5 text-yellow-400 mb-2" />
              <div className="text-xs text-muted-foreground">Pending</div>
              <div className="font-display text-2xl font-bold">₹{invoices.filter(i => i.status === "pending").reduce((s, i) => s + Number(i.total), 0).toFixed(0)}</div>
            </div>
          </div>

          <div className="glass-card rounded-xl p-5">
            <h3 className="font-display font-semibold mb-3">Recent Invoices</h3>
            {invoices.length === 0 ? <div className="text-sm text-muted-foreground text-center py-6">No invoices</div> :
              <div className="space-y-2">
                {invoices.map((i) => (
                  <div key={i.id} className="flex justify-between p-3 rounded-lg bg-muted/20">
                    <div>
                      <div className="font-medium text-sm">{i.invoice_number}</div>
                      <div className="text-xs text-muted-foreground">{new Date(i.created_at).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{i.total}</div>
                      <div className="text-xs">{i.status}</div>
                    </div>
                  </div>
                ))}
              </div>}
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 h-fit">
          <h3 className="font-display font-semibold mb-3">Top Up Wallet</h3>
          <p className="text-sm text-muted-foreground mb-4">Contact us on Discord to add credits to your wallet.</p>
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer">
            <Button className="w-full btn-pink ring-glow">
              <MessageCircle className="h-4 w-4 mr-2" /> Top Up via Discord
            </Button>
          </a>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default BillingPage;
