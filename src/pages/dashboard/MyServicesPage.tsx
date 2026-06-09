import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Server, ShoppingCart, RefreshCw } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

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

  const load = () => {
    if (!user) return;
    supabase.from("services").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setServices(data ?? []); setLoading(false); });
  };
  useEffect(() => { load(); }, [user]);

  const toggleAutoRenew = async (id: string, value: boolean) => {
    const { error } = await supabase.from("services").update({ auto_renew: value }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(value ? "Auto-renew enabled" : "Auto-renew disabled");
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, auto_renew: value } : s));
  };

  const setCycle = async (id: string, months: number) => {
    const { error } = await supabase.from("services").update({ auto_renew_cycle_months: months }).eq("id", id);
    if (error) return toast.error(error.message);
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, auto_renew_cycle_months: months } : s));
  };

  const daysLeft = (iso?: string) => iso ? Math.ceil((new Date(iso).getTime() - Date.now()) / 86400000) : null;
  const expiring = services.filter((s) => { const d = daysLeft(s.expires_at); return s.status === "active" && d !== null && d <= 7 && d >= 0; });

  return (
    <DashboardLayout title="My Services">
      <div className="flex items-center justify-between mb-5">
        <p className="text-muted-foreground text-sm">All your active hosting services</p>
        <Link to="/plans"><Button className="btn-pink"><ShoppingCart className="h-4 w-4 mr-2" />Order New</Button></Link>
      </div>

      {expiring.length > 0 && (
        <div className="glass-card rounded-xl p-4 mb-5 border-l-4 border-primary flex items-start gap-3">
          <RefreshCw className="h-5 w-5 text-primary mt-0.5" />
          <div className="text-sm">
            <div className="font-semibold">{expiring.length} service{expiring.length > 1 ? "s" : ""} expiring soon</div>
            <div className="text-muted-foreground text-xs">Enable auto-renew below or top up your balance to avoid downtime. We'll email you 7, 3, and 1 day before expiry.</div>
          </div>
        </div>
      )}

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
          {services.map((s) => {
            const dl = daysLeft(s.expires_at);
            return (
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
              {s.ip_address && <div className="text-xs text-muted-foreground mb-2">IP: <span className="text-foreground font-mono">{s.ip_address}</span></div>}
              {s.expires_at && (
                <div className="text-xs mb-3">
                  <span className="text-muted-foreground">Expires: </span>
                  <span className="text-foreground">{new Date(s.expires_at).toLocaleDateString()}</span>
                  {dl !== null && dl <= 7 && dl >= 0 && <span className="ml-2 text-primary font-semibold">({dl}d left)</span>}
                </div>
              )}

              <div className="bg-muted/20 rounded-lg p-3 mb-3 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold flex items-center gap-1.5"><RefreshCw className="h-3 w-3 text-primary" />Auto-renew</div>
                  <Switch checked={!!s.auto_renew} onCheckedChange={(v) => toggleAutoRenew(s.id, v)} />
                </div>
                {s.auto_renew && (
                  <>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs text-muted-foreground">Cycle</span>
                      <Select value={String(s.auto_renew_cycle_months || 1)} onValueChange={(v) => setCycle(s.id, Number(v))}>
                        <SelectTrigger className="h-7 w-28 text-xs"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 month</SelectItem>
                          <SelectItem value="3">3 months</SelectItem>
                          <SelectItem value="6">6 months</SelectItem>
                          <SelectItem value="12">12 months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="text-[11px] text-muted-foreground">Will charge ₹{Number(s.price) * (s.auto_renew_cycle_months || 1)} from balance on expiry.</div>
                    {s.last_auto_renew_status?.startsWith("insufficient_balance") && (
                      <div className="text-[11px] text-red-400">Last attempt failed: insufficient balance. Top up to retry.</div>
                    )}
                  </>
                )}
              </div>

              <div className="flex gap-2">
                <Link to={`/dashboard/renew/${s.id}`} className="flex-1"><Button variant="outline" size="sm" className="w-full">Renew</Button></Link>
                <Button size="sm" className="flex-1 btn-pink">Manage</Button>
              </div>
            </div>
            );
          })}
        </div>
      )}
    </DashboardLayout>
  );
};


export default MyServicesPage;
