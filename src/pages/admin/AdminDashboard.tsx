import { useEffect, useState } from "react";
import { Users, Server, FileText, DollarSign } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, services: 0, invoices: 0, revenue: 0 });
  const [chart, setChart] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [u, s, i] = await Promise.all([
        supabase.from("profiles").select("*", { count: "exact", head: true }),
        supabase.from("services").select("*", { count: "exact" }),
        supabase.from("invoices").select("*"),
      ]);
      const paid = (i.data ?? []).filter((x: any) => x.status === "paid");
      setStats({
        users: u.count ?? 0,
        services: s.data?.length ?? 0,
        invoices: i.data?.length ?? 0,
        revenue: paid.reduce((sum: number, x: any) => sum + Number(x.total), 0),
      });
      // build 7-day chart
      const days: any[] = [];
      for (let d = 6; d >= 0; d--) {
        const date = new Date(Date.now() - d * 86400000);
        const dayStr = date.toISOString().slice(0, 10);
        const rev = paid.filter((x: any) => x.created_at.slice(0, 10) === dayStr).reduce((s: number, x: any) => s + Number(x.total), 0);
        days.push({ day: date.toLocaleDateString(undefined, { weekday: "short" }), revenue: rev });
      }
      setChart(days);
    })();
  }, []);

  const cards = [
    { icon: Users, label: "Total Users", value: stats.users, color: "text-primary" },
    { icon: Server, label: "Active Services", value: stats.services, color: "text-emerald-400" },
    { icon: FileText, label: "Total Invoices", value: stats.invoices, color: "text-blue-400" },
    { icon: DollarSign, label: "Revenue", value: `₹${stats.revenue.toFixed(0)}`, color: "text-yellow-400" },
  ];

  return (
    <AdminLayout title="Admin Dashboard">
      <div className="space-y-5">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div key={c.label} className="glass-card rounded-xl p-5">
              <c.icon className={`h-6 w-6 ${c.color} mb-3`} />
              <div className="text-2xl font-display font-bold">{c.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="font-display font-semibold mb-4">Revenue (Last 7 days)</h3>
          <div className="h-64">
            <ResponsiveContainer>
              <LineChart data={chart}>
                <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
export default AdminDashboard;
