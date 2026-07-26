import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, Cpu, HardDrive, MemoryStick, Receipt, Server, Users, MessageCircle } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { DISCORD, LOCATIONS } from "@/data/plans";

type Order = {
  id: string;
  items: { id: string; name: string; group: string; ram: string; cpu: string; storage: string; price: number; qty: number; months: number }[];
  total: number;
  method: string;
  createdAt: string;
};

export default function Dashboard() {
  const { format } = useCurrency();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    try {
      setOrders(JSON.parse(localStorage.getItem("lc-orders") || "[]"));
    } catch {
      setOrders([]);
    }
  }, []);

  const services = orders.flatMap((o) => o.items.map((i) => ({ ...i, order: o.id, since: o.createdAt })));
  const spend = orders.reduce((s, o) => s + o.total, 0);

  const widgets = [
    { icon: Server, label: "Active Services", value: String(services.length) },
    { icon: Receipt, label: "Total Spend", value: format(spend) },
    { icon: Activity, label: "Uptime (30d)", value: "99.98%" },
    { icon: Users, label: "Players Online", value: services.length ? "37" : "0" },
  ];

  return (
    <section className="max-w-6xl mx-auto px-6 pt-14 pb-24">
      <h1 className="font-display text-3xl md:text-5xl font-bold mb-2">
        Your <span className="text-gradient-blossom">Dashboard</span>
      </h1>
      <p className="text-muted-foreground mb-10">Services, billing history and live node health in one place.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {widgets.map((w, i) => (
          <motion.div
            key={w.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5, rotateX: 7 }} style={{ transformStyle: "preserve-3d" }}
            className="glass rounded-2xl p-5 card-3d"
          >
            <w.icon className="w-5 h-5 text-primary mb-3" />
            <div className="text-2xl font-bold text-gradient-blossom">{w.value}</div>
            <div className="text-xs text-muted-foreground mt-1">{w.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="space-y-4">
          <h2 className="font-display text-xl font-bold">My services</h2>
          {services.length === 0 ? (
            <div className="glass rounded-2xl p-10 text-center">
              <Server className="w-8 h-8 text-primary mx-auto mb-3" />
              <p className="text-sm text-muted-foreground mb-5">No services yet. Order a plan and it will appear here instantly.</p>
              <Link to="/minecraft" className="grad-btn text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium">Browse plans</Link>
            </div>
          ) : (
            services.map((s) => (
              <div key={`${s.order}-${s.id}`} className="glass rounded-2xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs text-muted-foreground">{s.group}</div>
                    <h3 className="font-display font-bold text-lg">{s.name}</h3>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-success/15 text-success font-medium">Active</span>
                </div>
                <div className="grid sm:grid-cols-3 gap-3 mt-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2"><MemoryStick className="w-4 h-4 text-primary" /> {s.ram}</span>
                  <span className="flex items-center gap-2"><Cpu className="w-4 h-4 text-primary" /> {s.cpu}</span>
                  <span className="flex items-center gap-2"><HardDrive className="w-4 h-4 text-primary" /> {s.storage}</span>
                </div>
                <div className="mt-4 text-xs text-muted-foreground">
                  Order {s.order} · {s.months} month term · renews {format(s.price * s.qty)}/mo
                </div>
              </div>
            ))
          )}

          <h2 className="font-display text-xl font-bold pt-4">Billing history</h2>
          {orders.length === 0 ? (
            <div className="glass rounded-2xl p-6 text-sm text-muted-foreground">No invoices yet.</div>
          ) : (
            <div className="glass rounded-2xl divide-y divide-border/60">
              {orders.map((o) => (
                <div key={o.id} className="flex items-center justify-between gap-3 p-4 text-sm">
                  <div>
                    <div className="font-medium">{o.id}</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(o.createdAt).toLocaleDateString()} · {o.method.toUpperCase()}
                    </div>
                  </div>
                  <span className="font-semibold text-gradient-blossom">{format(o.total)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-4 lg:sticky lg:top-24">
          <div className="glass rounded-2xl p-5">
            <h3 className="font-display font-bold mb-4">Node status</h3>
            <ul className="space-y-3 text-sm">
              {LOCATIONS.map((l) => (
                <li key={l.city} className="flex items-center justify-between">
                  <span>{l.flag} {l.city}</span>
                  <span className="flex items-center gap-2 text-muted-foreground text-xs">
                    {l.ping}<span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="glass rounded-2xl p-5 flex items-center gap-3 hover:bg-secondary transition">
            <MessageCircle className="w-5 h-5 text-primary" />
            <div>
              <div className="text-sm font-medium">Need help?</div>
              <div className="text-xs text-muted-foreground">Open a ticket on Discord</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
