import { Link } from "react-router-dom";
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";

const TERMS = [1, 3, 6, 12];

export default function Cart() {
  const { items, remove, setQty, setMonths, subtotal, clear } = useCart();
  const { format } = useCurrency();

  return (
    <section className="max-w-5xl mx-auto px-6 pt-14 pb-24">
      <h1 className="font-display text-3xl md:text-5xl font-bold mb-2">
        Your <span className="text-gradient-blossom">Cart</span>
      </h1>
      <p className="text-muted-foreground mb-10">Review your plans, pick a billing term, then continue to billing.</p>

      {items.length === 0 ? (
        <div className="glass rounded-3xl p-12 text-center">
          <ShoppingCart className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="font-display text-xl font-bold mb-2">Cart is empty</h2>
          <p className="text-muted-foreground text-sm mb-6">Add a Minecraft or VPS plan to get started.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/minecraft" className="grad-btn text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium">Minecraft Plans</Link>
            <Link to="/vps" className="glass px-5 py-2.5 rounded-xl text-sm hover:bg-secondary transition">VPS Plans</Link>
          </div>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
          <div className="space-y-4">
            {items.map((it, i) => (
              <motion.div
                key={it.id}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}
                className="glass rounded-2xl p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-xs text-muted-foreground">{it.group}</div>
                    <h3 className="font-display font-bold text-lg">{it.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{it.ram} RAM · {it.cpu} · {it.storage}</p>
                  </div>
                  <button onClick={() => remove(it.id)} aria-label="Remove" className="text-muted-foreground hover:text-destructive transition">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-4 justify-between">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setQty(it.id, it.qty - 1)} aria-label="Decrease" className="glass w-8 h-8 rounded-lg flex items-center justify-center">
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-sm font-medium">{it.qty}</span>
                    <button onClick={() => setQty(it.id, it.qty + 1)} aria-label="Increase" className="glass w-8 h-8 rounded-lg flex items-center justify-center">
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex gap-1.5">
                    {TERMS.map((m) => (
                      <button
                        key={m}
                        onClick={() => setMonths(it.id, m)}
                        className={`px-3 py-1.5 rounded-lg text-xs transition ${
                          it.months === m ? "grad-btn text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {m}mo
                      </button>
                    ))}
                  </div>

                  <div className="font-bold text-gradient-blossom">{format(it.price * it.qty * it.months)}</div>
                </div>
              </motion.div>
            ))}
            <button onClick={clear} className="text-xs text-muted-foreground hover:text-destructive transition">Clear cart</button>
          </div>

          <div className="glass rounded-2xl p-6 lg:sticky lg:top-24">
            <h2 className="font-display font-bold text-lg mb-4">Order summary</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between"><span>Subtotal</span><span className="text-foreground">{format(subtotal)}</span></div>
              <div className="flex justify-between"><span>GST (18%)</span><span className="text-foreground">{format(Math.round(subtotal * 0.18))}</span></div>
            </div>
            <div className="border-t border-border/60 my-4" />
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium">Total</span>
              <span className="text-xl font-bold text-gradient-blossom">{format(Math.round(subtotal * 1.18))}</span>
            </div>
            <Link to="/billing" className="grad-btn text-primary-foreground w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2">
              Continue to billing <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
