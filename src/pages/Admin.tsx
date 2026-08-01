import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, Receipt, Server, Users, Bot, Send, Activity, Cpu, HardDrive,
  MemoryStick, TrendingUp, Boxes, ShieldCheck, Loader2, Sparkles, Trash2, Search,
} from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { LOCATIONS } from "@/data/plans";

type Order = {
  id: string;
  items: { id: string; name: string; group: string; ram: string; cpu: string; storage: string; price: number; qty: number; months: number }[];
  total: number;
  method: string;
  createdAt: string;
  customer?: { name?: string; email?: string };
};

type Msg = { role: "user" | "assistant"; content: string };

const TABS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: Receipt },
  { id: "services", label: "Services", icon: Server },
  { id: "nodes", label: "Nodes", icon: Activity },
  { id: "ai", label: "AI Assistant", icon: Bot },
] as const;

const SUGGESTIONS = [
  "Draft a reply for a customer whose server keeps hitting 12 TPS.",
  "How much RAM headroom do I need to add 40 more Budget servers?",
  "Write an incident status update for Frankfurt packet loss.",
  "Suggest an upgrade path from MC Budget 4GB for a 60-player SMP.",
];

const NODES = [
  { name: "blossom-mum-01", region: "Mumbai", cpu: 62, ram: 71, disk: 48 },
  { name: "blossom-sgp-01", region: "Singapore", cpu: 44, ram: 58, disk: 39 },
  { name: "blossom-fra-01", region: "Frankfurt", cpu: 77, ram: 66, disk: 55 },
  { name: "blossom-nyc-01", region: "New York", cpu: 31, ram: 40, disk: 27 },
];

function Bar({ value }: { value: number }) {
  const tone = value > 75 ? "bg-warning" : "bg-primary";
  return (
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }} whileInView={{ width: `${value}%` }} viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full rounded-full ${tone}`}
      />
    </div>
  );
}

export default function Admin() {
  const { format } = useCurrency();
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [q, setQ] = useState("");

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { setOrders(JSON.parse(localStorage.getItem("lc-orders") || "[]")); } catch { setOrders([]); }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, busy]);

  const services = useMemo(
    () => orders.flatMap((o) => o.items.map((i) => ({ ...i, order: o.id, since: o.createdAt }))),
    [orders]
  );
  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const mcCount = services.filter((s) => s.group.toLowerCase().includes("minecraft")).length;
  const vpsCount = services.length - mcCount;

  const filteredOrders = orders.filter((o) =>
    (o.id + (o.customer?.email ?? "") + o.method).toLowerCase().includes(q.toLowerCase())
  );

  const kpis = [
    { icon: Receipt, label: "Revenue", value: format(revenue) },
    { icon: Server, label: "Active services", value: String(services.length) },
    { icon: Users, label: "Orders", value: String(orders.length) },
    { icon: TrendingUp, label: "Avg order", value: format(orders.length ? revenue / orders.length : 0) },
  ];

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
      const res = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-ai`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
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
      setBusy(false);
    }
  }

  return (
    <section className="max-w-6xl mx-auto px-6 pt-14 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-4">
            <ShieldCheck className="w-3 h-3 text-primary" /> Staff area
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold mb-2">
            Admin <span className="text-gradient-anim">Panel</span>
          </h1>
          <p className="text-muted-foreground">Revenue, services, node health and an AI ops assistant.</p>
        </div>
      </div>

      <div className="glass rounded-2xl p-1.5 flex flex-wrap gap-1.5 mb-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`relative px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition ${
              tab === t.id ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab === t.id && (
              <motion.span layoutId="admin-tab" className="absolute inset-0 rounded-xl grad-btn" transition={{ type: "spring", stiffness: 340, damping: 30 }} />
            )}
            <span className="relative z-10 flex items-center gap-2"><t.icon className="w-4 h-4" /> {t.label}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {tab === "overview" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {kpis.map((k, i) => (
                  <motion.div
                    key={k.label}
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -5, rotateX: 7 }} style={{ transformStyle: "preserve-3d" }}
                    className="glass rounded-2xl p-5 card-3d"
                  >
                    <span className="icon-tile w-10 h-10 mb-3"><k.icon className="w-5 h-5 text-primary" /></span>
                    <div className="text-2xl font-bold text-gradient-blossom">{k.value}</div>
                    <div className="text-xs text-muted-foreground mt-1">{k.label}</div>
                  </motion.div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display font-bold mb-4 flex items-center gap-2"><Boxes className="w-4 h-4 text-primary" /> Product split</h3>
                  <div className="space-y-4 text-sm">
                    <div>
                      <div className="flex justify-between mb-1.5"><span>Minecraft</span><span className="text-muted-foreground">{mcCount}</span></div>
                      <Bar value={services.length ? (mcCount / services.length) * 100 : 0} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1.5"><span>VPS</span><span className="text-muted-foreground">{vpsCount}</span></div>
                      <Bar value={services.length ? (vpsCount / services.length) * 100 : 0} />
                    </div>
                  </div>
                </div>
                <div className="glass rounded-2xl p-6">
                  <h3 className="font-display font-bold mb-4 flex items-center gap-2"><Activity className="w-4 h-4 text-primary" /> Region latency</h3>
                  <ul className="space-y-3 text-sm">
                    {LOCATIONS.map((l) => (
                      <li key={l.city} className="flex items-center justify-between">
                        <span>{l.flag} {l.city}</span>
                        <span className="flex items-center gap-2 text-xs text-muted-foreground">
                          {l.ping}<span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {tab === "orders" && (
            <div className="space-y-4">
              <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
                <Search className="w-4 h-4 text-muted-foreground" />
                <input
                  value={q} onChange={(e) => setQ(e.target.value)}
                  placeholder="Search order id, email or method"
                  className="bg-transparent outline-none text-sm flex-1"
                />
              </div>
              {filteredOrders.length === 0 ? (
                <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">No orders yet.</div>
              ) : (
                <div className="glass rounded-2xl divide-y divide-border/60">
                  {filteredOrders.map((o) => (
                    <div key={o.id} className="p-4 flex flex-wrap items-center justify-between gap-3 text-sm">
                      <div>
                        <div className="font-medium">{o.id}</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(o.createdAt).toLocaleString()} · {o.method?.toUpperCase()} · {o.items.length} item(s)
                          {o.customer?.email ? ` · ${o.customer.email}` : ""}
                        </div>
                      </div>
                      <span className="font-semibold text-gradient-blossom">{format(o.total)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {tab === "services" && (
            <div className="grid md:grid-cols-2 gap-4">
              {services.length === 0 ? (
                <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground md:col-span-2">
                  No provisioned services yet.
                </div>
              ) : (
                services.map((s) => (
                  <motion.div key={`${s.order}-${s.id}`} whileHover={{ y: -4 }} className="glass rounded-2xl p-5 card-3d">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div className="text-xs text-muted-foreground">{s.group}</div>
                        <h3 className="font-display font-bold text-lg">{s.name}</h3>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded-full bg-success/15 text-success font-medium">Active</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1.5"><MemoryStick className="w-3.5 h-3.5 text-primary" /> {s.ram}</span>
                      <span className="flex items-center gap-1.5"><Cpu className="w-3.5 h-3.5 text-primary" /> {s.cpu}</span>
                      <span className="flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-primary" /> {s.storage}</span>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">Order {s.order} · {s.months} month term</div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {tab === "nodes" && (
            <div className="grid md:grid-cols-2 gap-4">
              {NODES.map((n, i) => (
                <motion.div
                  key={n.name}
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl p-5 card-3d"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="font-display font-bold">{n.name}</div>
                      <div className="text-xs text-muted-foreground">{n.region}</div>
                    </div>
                    <span className="text-xs px-2.5 py-1 rounded-full bg-success/15 text-success font-medium">Online</span>
                  </div>
                  <div className="space-y-3 text-xs">
                    {([["CPU", n.cpu], ["RAM", n.ram], ["Disk", n.disk]] as const).map(([label, v]) => (
                      <div key={label}>
                        <div className="flex justify-between mb-1.5 text-muted-foreground"><span>{label}</span><span>{v}%</span></div>
                        <Bar value={v} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {tab === "ai" && (
            <div className="grid lg:grid-cols-[1fr_260px] gap-5 items-start">
              <div className="glass rounded-2xl flex flex-col h-[560px] overflow-hidden">
                <div className="flex items-center gap-3 p-4 border-b border-border/60">
                  <span className="icon-tile w-10 h-10 animate-glow-pulse"><Bot className="w-5 h-5 text-primary" /></span>
                  <div>
                    <div className="font-display font-bold leading-tight">Blossom AI</div>
                    <div className="text-xs text-muted-foreground">Ops assistant · sees your live panel stats</div>
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
                      <p className="text-sm text-muted-foreground mb-5">Ask anything about your nodes, tickets or pricing.</p>
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

                <form
                  onSubmit={(e) => { e.preventDefault(); send(input); }}
                  className="p-3 border-t border-border/60 flex items-center gap-2"
                >
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
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
