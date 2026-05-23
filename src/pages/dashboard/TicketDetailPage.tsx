import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const TicketDetailPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [ticket, setTicket] = useState<any>(null);
  const [msgs, setMsgs] = useState<any[]>([]);
  const [text, setText] = useState("");

  const load = async () => {
    if (!id) return;
    const { data: t } = await supabase.from("support_tickets").select("*").eq("id", id).maybeSingle();
    const { data: m } = await supabase.from("ticket_messages").select("*").eq("ticket_id", id).order("created_at");
    setTicket(t); setMsgs(m ?? []);
  };
  useEffect(() => { load(); }, [id]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !id || !text.trim()) return;
    await supabase.from("ticket_messages").insert({ ticket_id: id, user_id: user.id, message: text });
    setText(""); load();
  };

  if (!ticket) return <DashboardLayout><div className="text-center py-12 text-muted-foreground">Loading...</div></DashboardLayout>;

  return (
    <DashboardLayout title={ticket.subject}>
      <div className="max-w-3xl mx-auto">
        <Link to="/dashboard/tickets" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4">
          <ArrowLeft className="h-4 w-4" /> Back to tickets
        </Link>
        <div className="glass-card rounded-xl p-5 mb-4 flex justify-between">
          <div>
            <div className="font-display text-lg font-semibold">{ticket.subject}</div>
            <div className="text-xs text-muted-foreground">{ticket.ticket_number} · {ticket.category}</div>
          </div>
          <Badge className="bg-primary/15 text-primary">{ticket.status}</Badge>
        </div>

        <div className="space-y-3 mb-4">
          {msgs.map((m) => (
            <div key={m.id} className={`glass-card rounded-xl p-4 ${m.is_staff ? "border-primary/40 ring-1 ring-primary/20" : ""}`}>
              <div className="text-xs text-muted-foreground mb-2">
                {m.is_staff ? "Support Staff" : "You"} · {new Date(m.created_at).toLocaleString()}
              </div>
              <p className="text-sm whitespace-pre-wrap">{m.message}</p>
            </div>
          ))}
        </div>

        {ticket.status !== "closed" && (
          <form onSubmit={send} className="glass-card rounded-xl p-4 space-y-3">
            <Textarea required rows={3} value={text} onChange={(e) => setText(e.target.value)} placeholder="Type your reply..." />
            <Button type="submit" className="btn-pink"><Send className="h-4 w-4 mr-2" />Send Reply</Button>
          </form>
        )}
      </div>
    </DashboardLayout>
  );
};
export default TicketDetailPage;
