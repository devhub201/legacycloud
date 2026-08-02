import { motion } from "framer-motion";
import { NODES } from "@/lib/adminData";
import { Bar } from "@/components/admin/AdminShell";

export default function AdminNodes() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {NODES.map((n, i) => (
        <motion.div
          key={n.name}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="glass rounded-2xl p-5"
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
  );
}
