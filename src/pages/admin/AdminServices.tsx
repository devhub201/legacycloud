import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminServices = () => {
  const [services, setServices] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("services").select("*").order("created_at", { ascending: false });
    const { data: profs } = await supabase.from("profiles").select("user_id, display_name");
    const map = new Map((profs ?? []).map((p: any) => [p.user_id, p.display_name]));
    setServices((data ?? []).map((s: any) => ({ ...s, profiles: { display_name: map.get(s.user_id) } })));
  };
  useEffect(() => { load(); }, []);

  const update = async (id: string, patch: any) => {
    await supabase.from("services").update(patch).eq("id", id);
    toast.success("Updated");
    load();
  };

  return (
    <AdminLayout title="Service Management">
      <div className="glass-card rounded-xl overflow-hidden overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead><TableHead>Plan</TableHead><TableHead>Type</TableHead>
              <TableHead>IP</TableHead><TableHead>Status</TableHead><TableHead>Expires</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {services.map((s) => (
              <TableRow key={s.id}>
                <TableCell className="font-medium">{s.profiles?.display_name}</TableCell>
                <TableCell>{s.plan_name}</TableCell>
                <TableCell><Badge>{s.plan_type}</Badge></TableCell>
                <TableCell>
                  <Input className="w-32 h-8" defaultValue={s.ip_address || ""} placeholder="—"
                    onBlur={(e) => e.target.value !== s.ip_address && update(s.id, { ip_address: e.target.value })} />
                </TableCell>
                <TableCell>
                  <Select value={s.status} onValueChange={(v) => update(s.id, { status: v, ...(v === "active" && !s.expires_at ? { expires_at: new Date(Date.now() + 30 * 86400000).toISOString() } : {}) })}>
                    <SelectTrigger className="w-32 h-8"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">{s.expires_at ? new Date(s.expires_at).toLocaleDateString() : "—"}</TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => update(s.id, { expires_at: new Date(Date.now() + 30 * 86400000).toISOString() })}>+30d</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};
export default AdminServices;
