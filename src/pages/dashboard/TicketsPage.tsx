import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LifeBuoy, Plus } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const TicketsPage = () => {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ subject: "", category: "general", priority: "normal", message: "" });

  const load = async () => {
    if (!user) return;
    const { data } = await supabase.from("support_tickets").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setTickets(data ?? []);
  };
  useEffect(() => { load(); }, [user]);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const { data: t, error } = await supabase.from("support_tickets").insert({
      user_id: user.id, subject: form.subject, category: form.category, priority: form.priority,
    }).select().single();
    if (error) return toast.error(error.message);
    await supabase.from("ticket_messages").insert({ ticket_id: t.id, user_id: user.id, message: form.message });
    toast.success("Ticket created!");
    setOpen(false); setForm({ subject: "", category: "general", priority: "normal", message: "" });
    load();
  };

  return (
    <DashboardLayout title="Support Tickets">
      <div className="flex justify-between items-center mb-5">
        <p className="text-muted-foreground text-sm">Get help from our team</p>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild><Button className="btn-pink"><Plus className="h-4 w-4 mr-2" />New Ticket</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Open a support ticket</DialogTitle></DialogHeader>
            <form onSubmit={create} className="space-y-3">
              <div><Label>Subject</Label><Input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label>Category</Label>
                  <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="billing">Billing</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="sales">Sales</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label>Priority</Label>
                  <Select value={form.priority} onValueChange={(v) => setForm({ ...form, priority: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div><Label>Message</Label><Textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></div>
              <Button type="submit" className="w-full btn-pink ring-glow">Submit Ticket</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {tickets.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <LifeBuoy className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
          <h3 className="font-display text-xl font-semibold">No tickets yet</h3>
        </div>
      ) : (
        <div className="space-y-2">
          {tickets.map((t) => (
            <Link key={t.id} to={`/dashboard/tickets/${t.id}`} className="glass-card rounded-xl p-4 flex items-center justify-between hover:ring-1 hover:ring-primary/40 transition">
              <div>
                <div className="font-medium">{t.subject}</div>
                <div className="text-xs text-muted-foreground">{t.ticket_number} · {t.category} · {new Date(t.created_at).toLocaleDateString()}</div>
              </div>
              <div className="flex gap-2"><Badge>{t.priority}</Badge><Badge className="bg-primary/15 text-primary">{t.status}</Badge></div>
            </Link>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};
export default TicketsPage;
