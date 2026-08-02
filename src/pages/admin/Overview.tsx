import { Boxes, Receipt, Server, TrendingUp, Users, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useCurrency } from "@/lib/currency";
import { LOCATIONS } from "@/data/plans";
import { useAdminData } from "@/lib/adminData";
import { Bar } from "@/components/admin/AdminShell";

export default function AdminOverview() {
  const { format } = useCurrency();
  const { orders, services, revenue, mcCount, vpsCount, customers } = useAdminData();

  const kpis = [
    { icon: Receipt, label: "Revenue", value: format(revenue) },
    { icon: Server, label: "Active services", value: String(services.length) },
    { icon: Users, label: "Customers", value: String(customers.length) },
    { icon: TrendingUp, label: "Avg order", value: format(orders.length ? revenue / orders.length : 0) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <motion.div
            key={k.label}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5"
          >
            <span className="icon-tile w-10 h-10 mb-3"><k.icon className="w-5 h-5" /></span>
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

      <div className="glass rounded-2xl p-6">
        <h3 className="font-display font-bold mb-4">Recent orders</h3>
        {orders.length === 0 ? (
          <p className="text-sm text-muted-foreground">No orders yet.</p>
        ) : (
          <div className="divide-y divide-border/60">
            {orders.slice(-5).reverse().map((o) => (
              <div key={o.id} className="py-3 flex items-center justify-between text-sm">
                <div>
                  <div className="font-medium">{o.id}</div>
                  <div className="text-xs text-muted-foreground">{new Date(o.createdAt).toLocaleString()}</div>
                </div>
                <span className="font-semibold text-gradient-blossom">{format(o.total)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
