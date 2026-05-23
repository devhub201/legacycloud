import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Server, FileText, Wallet, MessageCircle, ArrowRight, Activity } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { DISCORD_INVITE } from "@/data/plans";

const DashboardHome = () => {
  const { profile, user } = useAuth();
  const [stats, setStats] = useState({ services: 0, pending: 0, invoices: 0 });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    (async () => {
      const [s, i] = await Promise.all([
        supabase.from("services").select("id,status", { count: "exact" }).eq("user_id", user.id),
        supabase.from("invoices").select("*").eq("user_id", user.id).order("created_at", { ascending: false }).limit(5),
      ]);
      setStats({
        services: s.data?.filter((x: any) => x.status === "active").length ?? 0,
        pending: s.data?.filter((x: any) => x.status === "pending").length ?? 0,
        invoices: i.data?.filter((x: any) => x.status === "pending").length ?? 0,
      });
      setRecent(i.data ?? []);
    })();
  }, [user]);

  const cards = [
    { icon: Server, label: "Active Services", value: stats.services, color: "text-primary" },
    { icon: Activity, label: "Pending Orders", value: stats.pending, color: "text-yellow-400" },
    { icon: FileText, label: "Open Invoices", value: stats.invoices, color: "text-blue-400" },
    { icon: Wallet, label: "Balance", value: `₹${Number(profile?.balance ?? 0).toFixed(0)}`, color: "text-emerald-400" },
  ];

  return (
    <DashboardLayout title="Dashboard">
      <div className="space-y-6">
        <div className="glass-card rounded-2xl p-6 md:p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <h2 className="font-display text-2xl md:text-3xl font-bold relative">Welcome back, <span className="text-gradient">{profile?.display_name || "Player"}</span></h2>
          <p className="text-muted-foreground mt-2 relative">Manage your servers, invoices, and account from here.</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {cards.map((c) => (
            <div key={c.label} className="glass-card rounded-xl p-4">
              <c.icon className={`h-6 w-6 ${c.color} mb-3`} />
              <div className="text-2xl font-display font-bold">{c.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-display font-semibold">Recent Invoices</h3>
              <Link to="/dashboard/invoices" className="text-xs text-primary hover:underline">View all →</Link>
            </div>
            {recent.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground text-sm">No invoices yet</div>
            ) : (
              <div className="space-y-2">
                {recent.map((inv) => (
                  <Link key={inv.id} to={`/dashboard/invoices/${inv.id}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-primary/5 transition">
                    <div>
                      <div className="font-medium text-sm">{inv.invoice_number}</div>
                      <div className="text-xs text-muted-foreground">{new Date(inv.created_at).toLocaleDateString()}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">₹{inv.total}</div>
                      <div className={`text-xs ${inv.status === "paid" ? "text-emerald-400" : "text-yellow-400"}`}>{inv.status}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="glass-card rounded-xl p-5 space-y-3">
            <h3 className="font-display font-semibold mb-2">Quick Actions</h3>
            <Link to="/plans"><Button className="w-full btn-pink justify-between">Buy New Server <ArrowRight className="h-4 w-4" /></Button></Link>
            <Link to="/dashboard/tickets"><Button variant="outline" className="w-full justify-between">Open Ticket <ArrowRight className="h-4 w-4" /></Button></Link>
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer"><Button variant="outline" className="w-full justify-between"><MessageCircle className="h-4 w-4 mr-2" />Join Discord</Button></a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardHome;
