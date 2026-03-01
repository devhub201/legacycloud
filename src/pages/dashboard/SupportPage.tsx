import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const existingTickets = [
  { id: "#1024", subject: "Server won't start after modpack install", status: "Open", date: "Feb 28, 2026" },
  { id: "#1018", subject: "Billing question about upgrade", status: "Resolved", date: "Feb 20, 2026" },
];

const SupportPage = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Support</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 neon-border">
          <h2 className="font-display text-sm font-semibold mb-4">New Ticket</h2>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Subject</label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Describe your issue" className="glass border-border/30" />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Message</label>
              <Textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Provide details..." rows={5} className="glass border-border/30" />
            </div>
            <Button className="w-full bg-primary hover:bg-primary/80 box-glow font-display text-sm">
              <Send className="mr-2 h-4 w-4" /> Submit Ticket
            </Button>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6 neon-border">
          <h2 className="font-display text-sm font-semibold mb-4">My Tickets</h2>
          <div className="space-y-3">
            {existingTickets.map((t) => (
              <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/10 border border-border/20">
                <div>
                  <p className="text-sm font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">{t.id} · {t.date}</p>
                </div>
                <Badge
                  variant="outline"
                  className={t.status === "Open" ? "bg-secondary/10 text-secondary border-secondary/30" : "bg-green-500/10 text-green-400 border-green-500/30"}
                >
                  {t.status}
                </Badge>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SupportPage;
