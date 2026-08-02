import { useEffect, useState } from "react";
import { LifeBuoy, MessageCircle } from "lucide-react";
import { DISCORD } from "@/data/plans";

type Ticket = { id: string; subject: string; email: string; status: "open" | "pending" | "closed"; createdAt: string };

const TONE: Record<Ticket["status"], string> = {
  open: "bg-primary/15 text-primary",
  pending: "bg-warning/15 text-warning",
  closed: "bg-success/15 text-success",
};

export default function AdminTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    try { setTickets(JSON.parse(localStorage.getItem("lc-tickets") || "[]")); } catch { setTickets([]); }
  }, []);

  function setStatus(id: string, status: Ticket["status"]) {
    const next = tickets.map((t) => (t.id === id ? { ...t, status } : t));
    setTickets(next);
    localStorage.setItem("lc-tickets", JSON.stringify(next));
  }

  return (
    <div className="space-y-4">
      {tickets.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center">
          <span className="icon-tile w-12 h-12 mx-auto mb-4"><LifeBuoy className="w-5 h-5" /></span>
          <p className="text-sm text-muted-foreground mb-5">No tickets in the queue. Support requests from the Support page land here.</p>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 grad-btn text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium">
            <MessageCircle className="w-4 h-4" /> Open Discord queue
          </a>
        </div>
      ) : (
        <div className="glass rounded-2xl divide-y divide-border/60">
          {tickets.map((t) => (
            <div key={t.id} className="p-4 flex flex-wrap items-center justify-between gap-3 text-sm">
              <div>
                <div className="font-medium">{t.subject}</div>
                <div className="text-xs text-muted-foreground">{t.email} · {new Date(t.createdAt).toLocaleString()}</div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${TONE[t.status]}`}>{t.status}</span>
                {t.status !== "closed" && (
                  <button onClick={() => setStatus(t.id, "closed")} className="glass px-3 py-1.5 rounded-lg text-xs hover:bg-secondary transition">
                    Close
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
