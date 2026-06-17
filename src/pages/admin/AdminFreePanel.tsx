import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Save, Gift } from "lucide-react";

const STATUS_CLS: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
  creating: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  failed: "bg-rose-500/20 text-rose-300 border-rose-500/40",
  expired: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40",
  queued: "bg-blue-500/20 text-blue-300 border-blue-500/40",
};

export default function AdminFreePanel() {
  const [s, setS] = useState<any>(null);
  const [claims, setClaims] = useState<any[]>([]);
  const [todayCount, setTodayCount] = useState(0);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const [{ data: settings }, { data: rows }, { count }] = await Promise.all([
      supabase.from("free_panel_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("free_panel_claims").select("*").order("created_at", { ascending: false }).limit(50),
      supabase.from("free_panel_claims").select("*", { count: "exact", head: true })
        .gte("created_at", new Date(Date.now() - 86400000).toISOString()),
    ]);
    setS(settings ?? { enabled: true, daily_quota: 50, per_user_limit: 1, min_account_age_hours: 0, expiry_days: 45 });
    setClaims(rows ?? []);
    setTodayCount(count ?? 0);
  };

  useEffect(() => { load(); }, []);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("free_panel_settings").upsert({ id: 1, ...s, updated_at: new Date().toISOString() });
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Settings saved");
  };

  if (!s) return <AdminLayout title="Free Panel"><div className="text-muted-foreground">Loading…</div></AdminLayout>;

  return (
    <AdminLayout title="Free Panel Management">
      <div className="space-y-6">
        <div className="grid md:grid-cols-3 gap-4">
          <Stat label="Claims today" value={todayCount} sub={`Quota: ${s.daily_quota}`} />
          <Stat label="Total claims (last 50)" value={claims.length} />
          <Stat label="Active claims" value={claims.filter(c => c.status === "active").length} />
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <Gift className="h-5 w-5 text-primary" />
            <h2 className="font-display font-semibold text-lg">Quota & Eligibility</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="flex items-center justify-between p-3 rounded-lg border border-border bg-background/40">
              <div>
                <Label>Claims enabled</Label>
                <p className="text-xs text-muted-foreground">Allow new free server claims</p>
              </div>
              <Switch checked={s.enabled} onCheckedChange={(v) => setS({ ...s, enabled: v })} />
            </div>
            <Field label="Daily global quota" value={s.daily_quota}
                   onChange={(v) => setS({ ...s, daily_quota: v })} hint="Max claims allowed across all users per 24h" />
            <Field label="Per-user lifetime limit" value={s.per_user_limit}
                   onChange={(v) => setS({ ...s, per_user_limit: v })} hint="Max number of claims a single user can make" />
            <Field label="Min account age (hours)" value={s.min_account_age_hours}
                   onChange={(v) => setS({ ...s, min_account_age_hours: v })} hint="0 = no restriction" />
            <Field label="Expiry (days)" value={s.expiry_days}
                   onChange={(v) => setS({ ...s, expiry_days: v })} hint="Default 45 days (~1.5 months)" />
          </div>
          <Button onClick={save} disabled={saving} className="btn-pink mt-5">
            <Save className="h-4 w-4 mr-2" />{saving ? "Saving…" : "Save Settings"}
          </Button>
        </div>

        <div className="glass-card rounded-xl p-6">
          <h2 className="font-display font-semibold text-lg mb-4">Recent Claims</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground border-b border-border">
                <tr><th className="text-left p-2">Created</th><th className="text-left p-2">User</th>
                <th className="text-left p-2">Status</th><th className="text-left p-2">Server</th>
                <th className="text-left p-2">Expires</th></tr>
              </thead>
              <tbody>
                {claims.map((c) => (
                  <tr key={c.id} className="border-b border-border/40">
                    <td className="p-2 text-xs">{new Date(c.created_at).toLocaleString()}</td>
                    <td className="p-2 font-mono text-xs">{c.user_id.slice(0, 8)}…</td>
                    <td className="p-2"><Badge variant="outline" className={STATUS_CLS[c.status] ?? ""}>{c.status}</Badge></td>
                    <td className="p-2 font-mono text-xs">{c.panel_server_identifier ?? "—"}</td>
                    <td className="p-2 text-xs">{c.expires_at ? new Date(c.expires_at).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
                {claims.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">No claims yet</td></tr>}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

function Field({ label, value, onChange, hint }: any) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <Input type="number" min={0} value={value} onChange={(e) => onChange(parseInt(e.target.value || "0", 10))} />
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function Stat({ label, value, sub }: any) {
  return (
    <div className="glass-card rounded-xl p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-display font-bold mt-1">{value}</div>
      {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
    </div>
  );
}
