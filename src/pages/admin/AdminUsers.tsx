import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminUsers = () => {
  const [users, setUsers] = useState<any[]>([]);

  const load = async () => {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    const { data: roles } = await supabase.from("user_roles").select("*");
    const merged = (data ?? []).map((u: any) => ({
      ...u, role: roles?.find((r: any) => r.user_id === u.user_id)?.role ?? "user"
    }));
    setUsers(merged);
  };
  useEffect(() => { load(); }, []);

  const toggleAdmin = async (u: any) => {
    if (u.role === "admin") {
      await supabase.from("user_roles").delete().eq("user_id", u.user_id).eq("role", "admin");
      toast.success("Admin removed");
    } else {
      await supabase.from("user_roles").insert({ user_id: u.user_id, role: "admin" });
      toast.success("Admin granted");
    }
    load();
  };

  return (
    <AdminLayout title="User Management">
      <div className="glass-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead><TableHead>Balance</TableHead><TableHead>Referral</TableHead>
              <TableHead>Joined</TableHead><TableHead>Role</TableHead><TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u.id}>
                <TableCell className="font-medium">{u.display_name}</TableCell>
                <TableCell>₹{u.balance}</TableCell>
                <TableCell className="font-mono text-xs">{u.referral_code}</TableCell>
                <TableCell className="text-xs text-muted-foreground">{new Date(u.created_at).toLocaleDateString()}</TableCell>
                <TableCell><Badge className={u.role === "admin" ? "bg-primary/15 text-primary" : ""}>{u.role}</Badge></TableCell>
                <TableCell>
                  <Button size="sm" variant="outline" onClick={() => toggleAdmin(u)}>
                    {u.role === "admin" ? "Remove Admin" : "Make Admin"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};
export default AdminUsers;
