import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Receipt, Server, Users, Activity, Bot, LifeBuoy, UserCog, Settings, ShieldCheck,
} from "lucide-react";

const LINKS = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/orders", label: "Orders", icon: Receipt },
  { to: "/admin/services", label: "Services", icon: Server },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/nodes", label: "Nodes", icon: Activity },
  { to: "/admin/tickets", label: "Tickets", icon: LifeBuoy },
  { to: "/admin/staff", label: "Staff", icon: UserCog },
  { to: "/admin/ai", label: "Blossom AI", icon: Bot },
  { to: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminShell() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 pb-24">
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-3">
          <ShieldCheck className="w-3 h-3 text-primary" /> Staff area
        </span>
        <h1 className="font-display text-2xl md:text-4xl font-bold">
          Admin <span className="text-gradient-anim">Panel</span>
        </h1>
      </div>

      <div className="grid lg:grid-cols-[220px_1fr] gap-6 items-start">
        <nav className="glass rounded-2xl p-2 flex lg:flex-col gap-1 overflow-x-auto lg:sticky lg:top-24">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition ${
                  isActive ? "grad-btn text-primary-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`
              }
            >
              <l.icon className="w-4 h-4 shrink-0" /> {l.label}
            </NavLink>
          ))}
        </nav>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <Outlet />
        </motion.div>
      </div>
    </section>
  );
}

export function Bar({ value }: { value: number }) {
  const tone = value > 75 ? "bg-warning" : "bg-primary";
  return (
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
      <motion.div
        initial={{ width: 0 }} animate={{ width: `${value}%` }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`h-full rounded-full ${tone}`}
      />
    </div>
  );
}
