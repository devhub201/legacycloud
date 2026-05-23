import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";

const AdminTickets = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("support_tickets").select("*, profiles!inner(display_name)").order("created_at", { ascending: false })
      .then(({ data }) => setTickets(data ?? []));
  }, []);
  return (
    <AdminLayout title="All Tickets">
      <div className="glass-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader><TableRow>
            <TableHead>#</TableHead><TableHead>User</TableHead><TableHead>Subject</TableHead>
            <TableHead>Category</TableHead><TableHead>Priority</TableHead><TableHead>Status</TableHead>
          </TableRow></TableHeader>
          <TableBody>
            {tickets.map((t) => (
              <TableRow key={t.id}>
                <TableCell><Link to={`/dashboard/tickets/${t.id}`} className="font-mono text-primary hover:underline">{t.ticket_number}</Link></TableCell>
                <TableCell>{t.profiles?.display_name}</TableCell>
                <TableCell>{t.subject}</TableCell>
                <TableCell><Badge>{t.category}</Badge></TableCell>
                <TableCell><Badge>{t.priority}</Badge></TableCell>
                <TableCell><Badge className="bg-primary/15 text-primary">{t.status}</Badge></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};
export default AdminTickets;
