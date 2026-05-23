import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const AdminPromoCodes = () => {
  const [codes, setCodes] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ code: "", description: "", discount_percent: 10, max_uses: "" });

  const load = async () => {
    const { data } = await supabase.from("promo_codes").select("*").order("created_at", { ascending: false });
    setCodes(data ?? []);
  };
  useEffect(() => { load(); }, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("promo_codes").insert({
      code: form.code.toUpperCase(), description: form.description,
      discount_percent: form.discount_percent,
      max_uses: form.max_uses ? Number(form.max_uses) : null,
    });
    if (error) return toast.error(error.message);
    toast.success("Promo created!");
    setOpen(false); setForm({ code: "", description: "", discount_percent: 10, max_uses: "" });
    load();
  };

  const toggle = async (c: any) => {
    await supabase.from("promo_codes").update({ active: !c.active }).eq("id", c.id);
    load();
  };

  return (
    <AdminLayout title="Promo Codes">
      <div className="flex justify-end mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="btn-pink"><Plus className="h-4 w-4 mr-2" />New Code</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Create Promo Code</DialogTitle></DialogHeader>
            <form onSubmit={create} className="space-y-3">
              <div><Label>Code</Label><Input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="font-mono uppercase" /></div>
              <div><Label>Description</Label><Input required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Discount %</Label><Input type="number" required min={1} max={100} value={form.discount_percent} onChange={(e) => setForm({ ...form, discount_percent: Number(e.target.value) })} /></div>
                <div><Label>Max Uses (optional)</Label><Input type="number" value={form.max_uses} onChange={(e) => setForm({ ...form, max_uses: e.target.value })} /></div>
              </div>
              <Button type="submit" className="w-full btn-pink ring-glow">Create</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead><TableHead>Description</TableHead><TableHead>Discount</TableHead>
              <TableHead>Uses</TableHead><TableHead>Active</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {codes.map((c) => (
              <TableRow key={c.id}>
                <TableCell className="font-mono font-bold text-primary">{c.code}</TableCell>
                <TableCell>{c.description}</TableCell>
                <TableCell><Badge>{c.discount_percent}%</Badge></TableCell>
                <TableCell>{c.used_count}/{c.max_uses ?? "∞"}</TableCell>
                <TableCell><Switch checked={c.active} onCheckedChange={() => toggle(c)} /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </AdminLayout>
  );
};
export default AdminPromoCodes;
