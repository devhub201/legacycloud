import { useEffect, useState } from "react";
import { Check, X, Trash2, Star } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Review = {
  id: string; username: string; rating: number; comment: string;
  is_approved: boolean; created_at: string;
};

const AdminReviews = () => {
  const [tab, setTab] = useState<"pending" | "approved" | "all">("pending");
  const [rows, setRows] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    let q = supabase.from("reviews").select("*").order("created_at", { ascending: false });
    if (tab === "pending") q = q.eq("is_approved", false);
    if (tab === "approved") q = q.eq("is_approved", true);
    const { data, error } = await q;
    if (error) toast.error(error.message);
    setRows((data ?? []) as Review[]);
    setLoading(false);
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, [tab]);

  const setApproved = async (id: string, val: boolean) => {
    const { error } = await supabase.from("reviews").update({ is_approved: val }).eq("id", id);
    if (error) return toast.error(error.message);
    toast.success(val ? "Review approved" : "Review unapproved");
    load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    const { error } = await supabase.from("reviews").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Deleted");
    load();
  };

  return (
    <AdminLayout title="Reviews">
      <Tabs value={tab} onValueChange={(v) => setTab(v as typeof tab)} className="mb-5">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
      </Tabs>

      {loading && <div className="text-sm text-muted-foreground">Loading…</div>}
      {!loading && rows.length === 0 && <div className="text-sm text-muted-foreground">No reviews here.</div>}

      <div className="grid gap-3">
        {rows.map((r) => (
          <div key={r.id} className="glass-card rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold">@{r.username}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
                  ))}
                </div>
                {r.is_approved
                  ? <Badge variant="outline" className="border-emerald-500/40 text-emerald-400">Approved</Badge>
                  : <Badge variant="outline" className="border-amber-500/40 text-amber-400">Pending</Badge>}
                <span className="text-xs text-muted-foreground ml-auto">{new Date(r.created_at).toLocaleString()}</span>
              </div>
              <p className="text-sm text-foreground/90">{r.comment}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              {!r.is_approved ? (
                <Button size="sm" onClick={() => setApproved(r.id, true)} className="btn-pink"><Check className="h-4 w-4 mr-1" /> Approve</Button>
              ) : (
                <Button size="sm" variant="outline" onClick={() => setApproved(r.id, false)}><X className="h-4 w-4 mr-1" /> Unapprove</Button>
              )}
              <Button size="sm" variant="ghost" onClick={() => del(r.id)} className="text-red-400 hover:text-red-300"><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};

export default AdminReviews;
