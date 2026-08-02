import { useState } from "react";
import { Search } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { useAdminData } from "@/lib/adminData";

export default function AdminOrders() {
  const { format } = useCurrency();
  const { orders } = useAdminData();
  const [q, setQ] = useState("");

  const filtered = orders.filter((o) =>
    (o.id + (o.customer?.email ?? "") + o.method).toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="glass rounded-2xl px-4 py-3 flex items-center gap-3">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          value={q} onChange={(e) => setQ(e.target.value)}
          placeholder="Search order id, email or method"
          className="bg-transparent outline-none text-sm flex-1"
        />
      </div>
      {filtered.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">No orders found.</div>
      ) : (
        <div className="glass rounded-2xl divide-y divide-border/60">
          {filtered.map((o) => (
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
  );
}
