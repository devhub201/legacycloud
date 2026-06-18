import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./AuthContext";

interface CartCtx {
  count: number;
  total: number;
  refresh: () => Promise<void>;
}

const Ctx = createContext<CartCtx>({ count: 0, total: 0, refresh: async () => {} });

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);

  const refresh = useCallback(async () => {
    if (!user) { setCount(0); setTotal(0); return; }
    const { data } = await supabase.from("cart_items").select("price").eq("user_id", user.id);
    setCount(data?.length ?? 0);
    setTotal((data ?? []).reduce((s: number, i: any) => s + Number(i.price || 0), 0));
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  useEffect(() => {
    if (!user) return;
    const ch = supabase.channel(`cart-${user.id}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "cart_items", filter: `user_id=eq.${user.id}` }, () => refresh())
      .subscribe();
    return () => { supabase.removeChannel(ch); };
  }, [user, refresh]);

  return <Ctx.Provider value={{ count, total, refresh }}>{children}</Ctx.Provider>;
};

export const useCart = () => useContext(Ctx);
