import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Server, ShoppingCart } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const statusColor: Record<string, string> = {
  active: "bg-emerald-500/15 text-emerald-400",
  pending: "bg-yellow-500/15 text-yellow-400",
  suspended: "bg-red-500/15 text-red-400",
  expired: "bg-muted text-muted-foreground",
};

const MyServicesPage = () => {
  const { user } = useAuth();
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("services").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setServices(data ?? []); setLoading(false); });
  }, [user]);

  return (
    <DashboardLayout title="My Services">
      <div className="flex items-center justify-between mb-5">
        <p className="text-muted-foreground text-sm">All your active hosting services</p>
        <Link to="/plans"><Button className="btn-pink"><ShoppingCart className="h-4 w-4 mr-2" />Order New</Button></Link>
      </div>

      {loading ? (
        <div className="text-center py-16 text-muted-foreground">Loading...</div>
      ) : services.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <Server className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
          <h3 className="font-display text-xl font-semibold mb-2">No services yet</h3>
          <p className="text-muted-foreground mb-6">Order your first server to get started.</p>
          <Link to="/plans"><Button className="btn-pink ring-glow">Browse Plans</Button></Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {services.map((s) => (
            <div key={s.id} className="glass-card rounded-xl p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{s.plan_type === "vps" ? "VPS" : "Minecraft"}</div>
                  <h3 className="font-display text-lg font-semibold">{s.plan_name}</h3>
                </div>
                <Badge className={statusColor[s.status] || ""}>{s.status}</Badge>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                <div className="bg-muted/30 rounded p-2"><div className="text-muted-foreground">RAM</div><div className="font-semibold">{s.ram}</div></div>
                <div className="bg-muted/30 rounded p-2"><div className="text-muted-foreground">CPU</div><div className="font-semibold">{s.cpu}</div></div>
                <div className="bg-muted/30 rounded p-2"><div className="text-muted-foreground">Disk</div><div className="font-semibold">{s.storage}</div></div>
              </div>
              {s.ip_address && <div className="text-xs text-muted-foreground mb-3">IP: <span className="text-foreground font-mono">{s.ip_address}</span></div>}
              {s.expires_at && <div className="text-xs text-muted-foreground mb-3">Expires: {new Date(s.expires_at).toLocaleDateString()}</div>}
              <div className="flex gap-2">
                <Link to={`/dashboard/renew/${s.id}`} className="flex-1"><Button variant="outline" size="sm" className="w-full">Renew</Button></Link>
                <Button size="sm" className="flex-1 btn-pink">Manage</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyServicesPage;
