import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, Server, Cloud, UserCheck, LifeBuoy, Activity } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Stats = {
  total_users: number;
  total_services: number;
  total_vps: number;
  active_customers: number;
  tickets_solved: number;
  uptime_pct: number;
};

const LiveStats = () => {
  const [s, setS] = useState<Stats | null>(null);

  useEffect(() => {
    const load = () =>
      supabase.rpc("get_homepage_stats").then(({ data }) => {
        if (data) setS(data as unknown as Stats);
      });
    load();
    const id = setInterval(load, 5000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { icon: Users, label: "Total Users", value: s?.total_users ?? 0 },
    { icon: Server, label: "Minecraft Services", value: s?.total_services ?? 0 },
    { icon: Cloud, label: "VPS Servers", value: s?.total_vps ?? 0 },
    { icon: UserCheck, label: "Active Customers", value: s?.active_customers ?? 0 },
    { icon: LifeBuoy, label: "Tickets Solved", value: s?.tickets_solved ?? 0 },
    { icon: Activity, label: "Uptime", value: `${s?.uptime_pct ?? 99.9}%` },
  ];

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 -z-10 bg-grid opacity-10" />
      <div className="container">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-primary mb-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" /> LIVE STATS · AUTO-REFRESH 5s
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Real numbers, <span className="text-gradient">updated live.</span>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card rounded-2xl p-5 text-center"
            >
              <it.icon className="h-5 w-5 text-primary mx-auto mb-3" />
              <motion.div
                key={String(it.value)}
                initial={{ scale: 0.9, opacity: 0.6 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="font-display text-2xl md:text-3xl font-bold text-gradient"
              >
                {it.value}
              </motion.div>
              <div className="text-xs text-muted-foreground mt-1">{it.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
