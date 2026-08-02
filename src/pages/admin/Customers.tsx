import { Mail } from "lucide-react";
import { useCurrency } from "@/lib/currency";
import { useAdminData } from "@/lib/adminData";

export default function AdminCustomers() {
  const { format } = useCurrency();
  const { customers } = useAdminData();

  if (customers.length === 0)
    return <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">No customers yet.</div>;

  return (
    <div className="glass rounded-2xl divide-y divide-border/60">
      {customers.map((c) => (
        <div key={c.email} className="p-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex items-center gap-3">
            <span className="icon-tile w-10 h-10 shrink-0"><Mail className="w-4 h-4" /></span>
            <div>
              <div className="font-medium">{c.name || c.email}</div>
              <div className="text-xs text-muted-foreground">
                {c.email} · {c.orders} order(s) · last {new Date(c.last).toLocaleDateString()}
              </div>
            </div>
          </div>
          <span className="font-semibold text-gradient-blossom">{format(c.spend)}</span>
        </div>
      ))}
    </div>
  );
}
