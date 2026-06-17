import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RefreshCw, Search } from "lucide-react";

const LEVEL_CLS: Record<string, string> = {
  info: "bg-blue-500/20 text-blue-300 border-blue-500/40",
  warn: "bg-amber-500/20 text-amber-300 border-amber-500/40",
  error: "bg-rose-500/20 text-rose-300 border-rose-500/40",
};

export default function AdminLogs() {
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [level, setLevel] = useState("all");

  const load = async () => {
    setLoading(true);
    let query = supabase.from("activity_logs").select("*").order("created_at", { ascending: false }).limit(500);
    if (level !== "all") query = query.eq("level", level);
    const { data } = await query;
    setLogs(data ?? []);
    setLoading(false);
  };

  useEffect(() => { load(); }, [level]);

  const filtered = logs.filter((l) => {
    if (!q) return true;
    const hay = `${l.action} ${l.user_email ?? ""} ${l.target ?? ""} ${JSON.stringify(l.details ?? {})}`.toLowerCase();
    return hay.includes(q.toLowerCase());
  });

  return (
    <AdminLayout title="Activity Logs">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search action, user, details…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-9" />
          </div>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger className="w-36"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="info">Info</SelectItem>
              <SelectItem value="warn">Warning</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={load} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />Refresh
          </Button>
        </div>

        <div className="glass-card rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-xs text-muted-foreground border-b border-border bg-card/40">
                <tr>
                  <th className="text-left p-3">Time</th>
                  <th className="text-left p-3">Level</th>
                  <th className="text-left p-3">Action</th>
                  <th className="text-left p-3">User</th>
                  <th className="text-left p-3">Target</th>
                  <th className="text-left p-3">Details</th>
                  <th className="text-left p-3">IP</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-b border-border/40 hover:bg-card/30">
                    <td className="p-3 text-xs whitespace-nowrap">{new Date(l.created_at).toLocaleString()}</td>
                    <td className="p-3"><Badge variant="outline" className={LEVEL_CLS[l.level] ?? ""}>{l.level}</Badge></td>
                    <td className="p-3 font-mono text-xs">{l.action}</td>
                    <td className="p-3 text-xs">{l.user_email ?? "—"}</td>
                    <td className="p-3 text-xs">{l.target ?? "—"}</td>
                    <td className="p-3 text-xs max-w-xs">
                      {l.details ? <pre className="text-[10px] truncate font-mono text-muted-foreground">{JSON.stringify(l.details)}</pre> : "—"}
                    </td>
                    <td className="p-3 text-xs font-mono">{l.ip ?? "—"}</td>
                  </tr>
                ))}
                {filtered.length === 0 && !loading && (
                  <tr><td colSpan={7} className="p-8 text-center text-muted-foreground">No logs found</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Showing latest {logs.length} entries.</p>
      </div>
    </AdminLayout>
  );
}
