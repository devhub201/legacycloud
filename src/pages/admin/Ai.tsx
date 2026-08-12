import { useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, Sparkles, Trash2 } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { NODES, useAdminData } from "@/lib/adminData";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "Add a new 'Dedicated Servers' category with 3 plans.",
  "Switch the site theme to a lighter medium blue.",
  "Make the homepage hero headline punchier and update the CTA.",
  "Suggest an upgrade path from MC Budget 4GB for a 60-player SMP.",
];

export default function AdminAi() {
  const { format } = useCurrency();
  const qc = useQueryClient();
  const { orders, revenue, mcCount, vpsCount } = useAdminData();
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  async function send(text: string) {
    const prompt = text.trim();
    if (!prompt || busy) return;
    setError(null);
    setInput("");
    const next: Msg[] = [...messages, { role: "user", content: prompt }];
    setMessages(next);
    setBusy(true);

    const snapshot = [
      `orders=${orders.length}`,
      `revenue_inr=${revenue}`,
      `minecraft_services=${mcCount}`,
      `vps_services=${vpsCount}`,
      `nodes=${NODES.map((n) => `${n.name}(cpu ${n.cpu}%, ram ${n.ram}%)`).join(", ")}`,
    ].join("\n");

    try {
      const { data: sess } = await supabase.auth.getSession();
      const token = sess.session?.access_token ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string,
        },
        body: JSON.stringify({ messages: next, context: snapshot }),
      });

      if (!res.ok || !res.body) {
        setError(res.status === 429 ? "Rate limited — thoda ruk ke try karo." : res.status === 402 ? "AI credits khatam ho gaye." : "AI request failed.");
        setBusy(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      setMessages([...next, { role: "assistant", content: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages([...next, { role: "assistant", content: acc }]);
      }
    } catch {
      setError("Network error — AI se connect nahi ho paya.");
    } finally {
      qc.invalidateQueries({ queryKey: ["catalog"] });
      qc.invalidateQueries({ queryKey: ["page-sections"] });
      qc.invalidateQueries({ queryKey: ["site-settings"] });
      setBusy(false);
    }
  }

  return (
    <div className="grid lg:grid-cols-[1fr_240px] gap-5 items-start">
      <div className="glass rounded-2xl flex flex-col h-[560px] overflow-hidden">
        <div className="flex items-center gap-3 p-4 border-b border-border/60">
          <span className="icon-tile w-10 h-10"><Bot className="w-5 h-5" /></span>
          <div>
            <div className="font-display font-bold leading-tight">Blossom AI</div>
            <div className="text-xs text-muted-foreground">Site manager · edits plans, pages & theme live</div>
          </div>
          {messages.length > 0 && (
            <button onClick={() => setMessages([])} className="ml-auto glass w-9 h-9 rounded-lg flex items-center justify-center" aria-label="Clear chat">
              <Trash2 className="w-4 h-4 text-muted-foreground" />
            </button>
          )}
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && (
            <div className="text-center py-10">
              <Sparkles className="w-7 h-7 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-5">Ask anything about nodes, tickets or pricing.</p>
              <div className="grid gap-2 max-w-md mx-auto">
                {SUGGESTIONS.map((s) => (
                  <button key={s} onClick={() => send(s)} className="glass rounded-xl px-4 py-2.5 text-xs text-left hover:bg-secondary transition">
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${
                m.role === "user" ? "grad-btn text-primary-foreground" : "bg-secondary"
              }`}>
                {m.content || <Loader2 className="w-4 h-4 animate-spin" />}
              </div>
            </div>
          ))}
          {error && <div className="text-xs text-destructive text-center">{error}</div>}
        </div>

        <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="p-3 border-t border-border/60 flex items-center gap-2">
          <input
            value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Blossom AI…"
            className="flex-1 bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-1 focus:ring-primary"
          />
          <button type="submit" disabled={busy || !input.trim()} className="grad-btn text-primary-foreground w-11 h-11 rounded-xl flex items-center justify-center disabled:opacity-50">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </button>
        </form>
      </div>

      <div className="glass rounded-2xl p-5 space-y-3 text-sm">
        <h3 className="font-display font-bold">Snapshot sent to AI</h3>
        <div className="flex justify-between text-muted-foreground"><span>Orders</span><span>{orders.length}</span></div>
        <div className="flex justify-between text-muted-foreground"><span>Revenue</span><span>{format(revenue)}</span></div>
        <div className="flex justify-between text-muted-foreground"><span>Minecraft</span><span>{mcCount}</span></div>
        <div className="flex justify-between text-muted-foreground"><span>VPS</span><span>{vpsCount}</span></div>
        <div className="flex justify-between text-muted-foreground"><span>Nodes</span><span>{NODES.length}</span></div>
      </div>
    </div>
  );
}
