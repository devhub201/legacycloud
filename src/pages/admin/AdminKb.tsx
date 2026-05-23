import { useEffect, useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const empty = { id: "", title: "", slug: "", category: "General", excerpt: "", content: "", published: true };

const AdminKb = () => {
  const [arts, setArts] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>(empty);

  const load = async () => {
    const { data } = await supabase.from("kb_articles").select("*").order("created_at", { ascending: false });
    setArts(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { ...form, slug: form.slug || form.title.toLowerCase().replace(/\s+/g, "-") };
    delete payload.id;
    if (form.id) await supabase.from("kb_articles").update(payload).eq("id", form.id);
    else await supabase.from("kb_articles").insert(payload);
    toast.success("Saved");
    setOpen(false); setForm(empty); load();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this article?")) return;
    await supabase.from("kb_articles").delete().eq("id", id);
    load();
  };

  return (
    <AdminLayout title="Knowledgebase">
      <div className="flex justify-end mb-4">
        <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setForm(empty); }}>
          <DialogTrigger asChild><Button className="btn-pink" onClick={() => setForm(empty)}><Plus className="h-4 w-4 mr-2" />New Article</Button></DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader><DialogTitle>{form.id ? "Edit" : "New"} Article</DialogTitle></DialogHeader>
            <form onSubmit={save} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Title</Label><Input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
                <div><Label>Category</Label><Input required value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></div>
              </div>
              <div><Label>Slug (auto if empty)</Label><Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></div>
              <div><Label>Excerpt</Label><Input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></div>
              <div><Label>Content (Markdown)</Label><Textarea required rows={8} value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
              <div className="flex items-center gap-2"><Switch checked={form.published} onCheckedChange={(v) => setForm({ ...form, published: v })} /><Label>Published</Label></div>
              <Button type="submit" className="w-full btn-pink ring-glow">Save</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-2">
        {arts.map((a) => (
          <div key={a.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
            <div>
              <div className="font-medium">{a.title} {!a.published && <span className="text-xs text-muted-foreground">(draft)</span>}</div>
              <div className="text-xs text-muted-foreground">{a.category} · /kb/{a.slug}</div>
            </div>
            <div className="flex gap-2">
              <Button size="icon" variant="outline" onClick={() => { setForm(a); setOpen(true); }}><Edit className="h-4 w-4" /></Button>
              <Button size="icon" variant="outline" onClick={() => del(a.id)}><Trash2 className="h-4 w-4 text-red-400" /></Button>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  );
};
export default AdminKb;
