import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, AlertCircle, XCircle, Wrench, Clock } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Status = { id: string; name: string; status: string; message: string | null; updated_at: string };

const ICONS: Record<string, { icon: typeof CheckCircle2; className: string; label: string }> = {
  operational: { icon: CheckCircle2, className: "text-emerald-400", label: "Operational" },
  degraded: { icon: AlertCircle, className: "text-amber-400", label: "Degraded" },
  down: { icon: XCircle, className: "text-red-400", label: "Down" },
  maintenance: { icon: Wrench, className: "text-sky-400", label: "Maintenance" },
};

const timeAgo = (iso: string) => {
  const diff = Math.max(0, Date.now() - new Date(iso).getTime());
  const m = Math.floor(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
};

const StatusPreview = () => {
  const [rows, setRows] = useState<Status[]>([]);

  useEffect(() => {
    supabase.from("service_status").select("id, name, status, message, updated_at").order("sort_order")
      .then(({ data }) => setRows((data ?? []) as Status[]));
  }, []);

  const allOk = rows.length > 0 && rows.every((r) => r.status === "operational");
  const latest = rows.reduce<Status | null>((a, r) => (!a || new Date(r.updated_at) > new Date(a.updated_at) ? r : a), null);
  const incidents = rows.filter((r) => r.status !== "operational" && r.message);

  return (
    <section className="py-20">
      <div className="container">
        <div className="glass-card rounded-3xl p-8 md:p-10">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-semibold tracking-[0.18em] text-primary mb-2">SYSTEM STATUS</div>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                {allOk ? "All systems operational" : "Some services degraded"}
              </h2>
              {latest && (
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> Last updated {timeAgo(latest.updated_at)}
                </div>
              )}
            </div>
            <Link to="/status" className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1 font-semibold">
              Full status <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {incidents.length > 0 && (
            <div className="mb-6 space-y-2">
              {incidents.map((inc) => {
                const meta = ICONS[inc.status] ?? ICONS.operational;
                const Icon = meta.icon;
                return (
                  <div key={inc.id} className="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/5 p-3">
                    <Icon className={`h-5 w-5 mt-0.5 ${meta.className}`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold">{inc.name} — {meta.label}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{inc.message}</div>
                    </div>
                    <div className="text-[10px] text-muted-foreground whitespace-nowrap">{timeAgo(inc.updated_at)}</div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {rows.map((r) => {
              const meta = ICONS[r.status] ?? ICONS.operational;
              const Icon = meta.icon;
              return (
                <div key={r.id} className="flex items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-3">
                  <Icon className={`h-5 w-5 ${meta.className}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold truncate">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{meta.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatusPreview;
