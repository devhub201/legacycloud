import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { toast } from "sonner";

export type CartItem = {
  id: string;
  name: string;
  group: string;
  ram: string;
  cpu: string;
  storage: string;
  price: number; // INR / month
  qty: number;
  months: number;
};

type Ctx = {
  items: CartItem[];
  add: (item: Omit<CartItem, "qty" | "months" | "id"> & { id?: string }) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  setMonths: (id: string, months: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<Ctx>({} as Ctx);
const KEY = "lc-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const add: Ctx["add"] = (item) => {
    const id = item.id ?? `${item.group}-${item.name}`;
    setItems((prev) => {
      const found = prev.find((i) => i.id === id);
      if (found) return prev.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i));
      return [...prev, { ...item, id, qty: 1, months: 1 }];
    });
    toast.success(`${item.name} added to cart`, { description: item.group });
  };

  const remove = (id: string) => setItems((p) => p.filter((i) => i.id !== id));
  const setQty = (id: string, qty: number) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i)));
  const setMonths = (id: string, months: number) =>
    setItems((p) => p.map((i) => (i.id === id ? { ...i, months } : i)));
  const clear = () => setItems([]);

  const { count, subtotal } = useMemo(
    () => ({
      count: items.reduce((s, i) => s + i.qty, 0),
      subtotal: items.reduce((s, i) => s + i.price * i.qty * i.months, 0),
    }),
    [items],
  );

  return (
    <CartContext.Provider value={{ items, add, remove, setQty, setMonths, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
