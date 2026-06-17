import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Gift, ExternalLink, Cpu, HardDrive, MemoryStick, Clock } from "lucide-react";

const STATUS: Record<string, { label: string; cls: string }> = {
  queued:   { label: "Queued",     cls: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
  creating: { label: "Provisioning", cls: "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse" },
  active:   { label: "Active",     cls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
  failed:   { label: "Failed",     cls: "bg-rose-500/20 text-rose-300 border-rose-500/40" },
  expired:  { label: "Expired",    cls: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40" },
};

export default function FreeClaimsHistoryPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    supabase.from("free_panel_claims").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setRows(data ?? []); setLoading(false); });
  }, [user]);

  return (
    <DashboardLayout title="Free Server History">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">All your free server claims, past and present.</p>
          <Button asChild className="btn-pink" size="sm">
            <Link to="/free-panel"><Gift className="h-4 w-4 mr-2" />Claim Free Server</Link>
          </Button>
        </div>

        {loading ? (
          <div className="glass-card rounded-xl p-8 text-center text-muted-foreground">Loading…</div>
        ) : rows.length === 0 ? (
          <div className="glass-card rounded-xl p-10 text-center">
            <Gift className="h-10 w-10 mx-auto text-primary mb-3" />
            <h3 className="font-display text-xl font-semibold mb-2">No claims yet</h3>
            <p className="text-sm text-muted-foreground mb-5">You haven't claimed a free server. Get yours in seconds.</p>
            <Button asChild className="btn-pink"><Link to="/free-panel">Claim Now</Link></Button>
          </div>
        ) : (
          <div className="grid gap-4">
            {rows.map((r) => {
              const st = STATUS[r.status] ?? { label: r.status, cls: "bg-zinc-500/20 text-zinc-300" };
              return (
                <div key={r.id} className="glass-card rounded-xl p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className={st.cls}>{st.label}</Badge>
                        <span className="text-xs text-muted-foreground">
                          Claimed {new Date(r.created_at).toLocaleString()}
                        </span>
                      </div>
                      {r.panel_server_identifier && (
                        <div className="font-mono text-xs text-muted-foreground">ID: {r.panel_server_identifier}</div>
                      )}
                    </div>
                    {r.status === "active" && r.panel_url && (
                      <Button asChild size="sm" className="btn-pink">
                        <a href={r.panel_url} target="_blank" rel="noopener noreferrer">
                          Open Panel <ExternalLink className="h-3.5 w-3.5 ml-2" />
                        </a>
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <Spec icon={MemoryStick} label="RAM" value={`${r.ram_mb} MB`} />
                    <Spec icon={HardDrive}   label="Disk" value={`${r.disk_mb} MB`} />
                    <Spec icon={Cpu}         label="CPU" value={`${r.cpu_pct}%`} />
                    <Spec icon={Clock}       label="Expires"
                          value={r.expires_at ? new Date(r.expires_at).toLocaleDateString() : "—"} />
                  </div>
                  {r.status === "failed" && r.error_message && (
                    <div className="mt-3 text-xs p-2 rounded bg-rose-500/10 border border-rose-500/30 text-rose-300">
                      {r.error_message}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

function Spec({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-center gap-2 p-2 rounded bg-background/40 border border-border/40">
      <Icon className="h-4 w-4 text-primary shrink-0" />
      <div className="min-w-0">
        <div className="text-[10px] uppercase text-muted-foreground">{label}</div>
        <div className="font-medium truncate">{value}</div>
      </div>
    </div>
  );
}
