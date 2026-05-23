import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const statusVariant: Record<string, string> = {
  paid: "bg-emerald-500/15 text-emerald-400",
  pending: "bg-yellow-500/15 text-yellow-400",
  cancelled: "bg-red-500/15 text-red-400",
};

const InvoicesPage = () => {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("invoices").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => setInvoices(data ?? []));
  }, [user]);

  return (
    <DashboardLayout title="Invoices">
      {invoices.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <FileText className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
          <h3 className="font-display text-xl font-semibold">No invoices yet</h3>
        </div>
      ) : (
        <div className="glass-card rounded-xl overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Due</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((i) => (
                <TableRow key={i.id} className="cursor-pointer">
                  <TableCell>
                    <Link to={`/dashboard/invoices/${i.id}`} className="font-medium text-primary hover:underline">{i.invoice_number}</Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{new Date(i.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="text-muted-foreground">{i.due_date ? new Date(i.due_date).toLocaleDateString() : "—"}</TableCell>
                  <TableCell className="font-semibold">₹{i.total}</TableCell>
                  <TableCell><Badge className={statusVariant[i.status]}>{i.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </DashboardLayout>
  );
};
export default InvoicesPage;
