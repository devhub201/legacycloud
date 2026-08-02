import { useEffect, useMemo, useState } from "react";

export type OrderItem = {
  id: string; name: string; group: string; ram: string; cpu: string; storage: string;
  price: number; qty: number; months: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  method: string;
  createdAt: string;
  customer?: { name?: string; email?: string };
};

export const NODES = [
  { name: "blossom-mum-01", region: "Mumbai", cpu: 62, ram: 71, disk: 48 },
  { name: "blossom-sgp-01", region: "Singapore", cpu: 44, ram: 58, disk: 39 },
  { name: "blossom-fra-01", region: "Frankfurt", cpu: 77, ram: 66, disk: 55 },
  { name: "blossom-nyc-01", region: "New York", cpu: 31, ram: 40, disk: 27 },
];

export function useAdminData() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const read = () => {
      try { setOrders(JSON.parse(localStorage.getItem("lc-orders") || "[]")); } catch { setOrders([]); }
    };
    read();
    window.addEventListener("storage", read);
    return () => window.removeEventListener("storage", read);
  }, []);

  const services = useMemo(
    () => orders.flatMap((o) => o.items.map((i) => ({ ...i, order: o.id, since: o.createdAt, email: o.customer?.email }))),
    [orders]
  );

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const mcCount = services.filter((s) => s.group.toLowerCase().includes("minecraft")).length;
  const vpsCount = services.length - mcCount;

  const customers = useMemo(() => {
    const map = new Map<string, { email: string; name?: string; orders: number; spend: number; last: string }>();
    orders.forEach((o) => {
      const email = o.customer?.email || "guest@legacycloud.fun";
      const prev = map.get(email);
      map.set(email, {
        email,
        name: o.customer?.name || prev?.name,
        orders: (prev?.orders ?? 0) + 1,
        spend: (prev?.spend ?? 0) + o.total,
        last: o.createdAt,
      });
    });
    return [...map.values()].sort((a, b) => b.spend - a.spend);
  }, [orders]);

  return { orders, services, revenue, mcCount, vpsCount, customers };
}
