import { motion } from "framer-motion";
import { Cpu, HardDrive, MemoryStick } from "lucide-react";
import { useAdminData } from "@/lib/adminData";

export default function AdminServices() {
  const { services } = useAdminData();

  if (services.length === 0)
    return <div className="glass rounded-2xl p-10 text-center text-sm text-muted-foreground">No provisioned services yet.</div>;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {services.map((s, i) => (
        <motion.div
          key={`${s.order}-${s.id}-${i}`}
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
          className="glass rounded-2xl p-5"
        >
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
          <div className="mt-3 text-xs text-muted-foreground">
            Order {s.order} · {s.months} month term{s.email ? ` · ${s.email}` : ""}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
