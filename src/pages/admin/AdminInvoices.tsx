import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminInvoices = () => {
  const [invs, setInvs] = useState<any[]>([]);
  const load = async () => {
    const { data } = await supabase.from("invoices").select("*").order("created_at", { ascending: false });
    const { data: profs } = await supabase.from("profiles").select("user_id, display_name");
    const map = new Map((profs ?? []).map((p: any) => [p.user_id, p.display_name]));
    setInvs((data ?? []).map((i: any) => ({ ...i, profiles: { display_name: map.get(i.user_id) } })));
  };
  useEffect(() => { load(); }, []);

  const markPaid = async (inv: any) => {
    await supabase.from("invoices").update({ status: "paid", paid_at: new Date().toISOString() }).eq("id", inv.id);
    if (inv.service_id) {
      await supabase.from("services").update({
        status: "active",
        expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
      }).eq("id", inv.service_id);
    } else {
      // activate pending services for this user created around same time
      await supabase.from("services").update({
        status: "active",
        expires_at: new Date(Date.now() + 30 * 86400000).toISOString(),
      }).eq("user_id", inv.user_id).eq("status", "pending");
    }
    await supabase.from("transactions").insert({
      user_id: inv.user_id, invoice_id: inv.id, amount: inv.total,
      type: "charge", description: `Payment for ${inv.invoice_number}`,
    });
    toast.success("Marked paid & services activated");
    load();
  };

  return (
    <AdminLayout title="All Invoices">
      <div className="glass-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader><TableRow>
            <TableHead>#</TableHead><TableHead>User</TableHead><TableHead>Date</TableHead>
            <TableHead>Total</TableHead><TableHead>Status</TableHead><TableHead>Action</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {invs.map((i) => (
              <TableRow key={i.id}>
                <TableCell className="font-mono text-primary">{i.invoice_number}</TableCell>
                <TableCell>{i.profiles?.display_name}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{new Date(i.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="font-semibold">₹{i.total}</TableCell>
                <TableCell><Badge className={i.status === "paid" ? "bg-emerald-500/15 text-emerald-400" : "bg-yellow-500/15 text-yellow-400"}>{i.status}</Badge></TableCell>
                <TableCell>
                  {i.status === "pending" && <Button size="sm" className="btn-pink" onClick={() => markPaid(i)}>Mark Paid</Button>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};
export default AdminInvoices;
