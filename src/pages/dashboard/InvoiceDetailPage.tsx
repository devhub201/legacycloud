import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MessageCircle, Printer } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { DISCORD_INVITE } from "@/data/plans";

const InvoiceDetailPage = () => {
  const { id } = useParams();
  const [inv, setInv] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    supabase.from("invoices").select("*").eq("id", id).maybeSingle().then(({ data }) => setInv(data));
  }, [id]);

  if (!inv) return <DashboardLayout title="Invoice"><div className="text-center py-12 text-muted-foreground">Loading...</div></DashboardLayout>;

  const items = Array.isArray(inv.items) ? inv.items : [];

  return (
    <DashboardLayout title={`Invoice ${inv.invoice_number}`}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link to="/dashboard/invoices" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" /> Back to invoices
          </Link>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => window.print()}><Printer className="h-4 w-4 mr-1" /> Print</Button>
          </div>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="font-display text-2xl font-bold text-gradient">LEGACY CLOUD</div>
              <div className="text-xs text-muted-foreground mt-1">legacycloud.lovable.app</div>
            </div>
            <div className="text-right">
              <div className="text-xs text-muted-foreground">Invoice</div>
              <div className="font-display font-bold">{inv.invoice_number}</div>
              <Badge className={inv.status === "paid" ? "bg-emerald-500/15 text-emerald-400 mt-2" : "bg-yellow-500/15 text-yellow-400 mt-2"}>{inv.status}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
            <div><div className="text-muted-foreground text-xs">Date</div><div>{new Date(inv.created_at).toLocaleDateString()}</div></div>
            <div><div className="text-muted-foreground text-xs">Due Date</div><div>{inv.due_date ? new Date(inv.due_date).toLocaleDateString() : "—"}</div></div>
          </div>

          <div className="border border-border rounded-lg overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-muted/30">
                <tr><th className="text-left p-3">Item</th><th className="text-right p-3">Qty</th><th className="text-right p-3">Price</th></tr>
              </thead>
              <tbody>
                {items.map((it: any, idx: number) => (
                  <tr key={idx} className="border-t border-border">
                    <td className="p-3">{it.name} <span className="text-muted-foreground">({it.type})</span></td>
                    <td className="p-3 text-right">{it.qty}</td>
                    <td className="p-3 text-right">₹{it.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="ml-auto max-w-xs space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{inv.amount}</span></div>
            {Number(inv.discount) > 0 && <div className="flex justify-between text-emerald-400"><span>Discount</span><span>−₹{inv.discount}</span></div>}
            <div className="flex justify-between font-display text-lg font-bold border-t border-border pt-2">
              <span>Total</span><span className="text-gradient">₹{inv.total}</span>
            </div>
          </div>

          {inv.status === "pending" && (
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="block mt-8">
              <Button className="w-full btn-pink ring-glow h-12">
                <MessageCircle className="h-4 w-4 mr-2" /> Complete Payment via Discord
              </Button>
            </a>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};
export default InvoiceDetailPage;
