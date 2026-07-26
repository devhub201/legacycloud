import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { CreditCard, Smartphone, Bitcoin, ShieldCheck, MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { DISCORD } from "@/data/plans";

const METHODS = [
  { id: "upi", label: "UPI / QR", icon: Smartphone, desc: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
  { id: "crypto", label: "Crypto", icon: Bitcoin, desc: "USDT, BTC, LTC" },
];

export default function Billing() {
  const { items, subtotal, clear } = useCart();
  const { format } = useCurrency();
  const nav = useNavigate();
  const [method, setMethod] = useState("upi");
  const [form, setForm] = useState({ name: "", email: "", discord: "", country: "India" });

  const total = Math.round(subtotal * 1.18);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) return toast.error("Your cart is empty");
    const order = {
      id: `LC-${Date.now().toString().slice(-6)}`,
      items,
      total,
      method,
      customer: form,
      createdAt: new Date().toISOString(),
    };
    const prev = JSON.parse(localStorage.getItem("lc-orders") || "[]");
    localStorage.setItem("lc-orders", JSON.stringify([order, ...prev]));
    clear();
    toast.success(`Order ${order.id} placed`, { description: "Confirm payment on Discord to activate instantly." });
    nav("/dashboard");
  };

  const field = "glass w-full rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50 bg-transparent";

  return (
    <section className="max-w-5xl mx-auto px-6 pt-14 pb-24">
      <h1 className="font-display text-3xl md:text-5xl font-bold mb-2">
        Billing &amp; <span className="text-gradient-blossom">Checkout</span>
      </h1>
      <p className="text-muted-foreground mb-10">Fill your details, choose a payment method and place the order.</p>

      <form onSubmit={submit} className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="space-y-6">
          <div className="glass rounded-2xl p-6 space-y-4">
            <h2 className="font-display font-bold text-lg">Customer details</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <input required placeholder="Full name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required type="email" placeholder="Email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              <input required placeholder="Discord username" className={field} value={form.discord} onChange={(e) => setForm({ ...form, discord: e.target.value })} />
              <input placeholder="Country" className={field} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h2 className="font-display font-bold text-lg mb-4">Payment method</h2>
            <div className="grid sm:grid-cols-3 gap-3">
              {METHODS.map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`rounded-xl p-4 text-left transition ${
                    method === m.id ? "grad-btn text-primary-foreground" : "glass hover:bg-secondary"
                  }`}
                >
                  <m.icon className="w-5 h-5 mb-2" />
                  <div className="text-sm font-medium">{m.label}</div>
                  <div className={`text-xs ${method === m.id ? "opacity-80" : "text-muted-foreground"}`}>{m.desc}</div>
                </button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-4 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-success" /> Payment is confirmed by our billing team on Discord within minutes.
            </p>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 lg:sticky lg:top-24">
          <h2 className="font-display font-bold text-lg mb-4">Summary</h2>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground mb-4">
              Cart is empty. <Link to="/minecraft" className="text-primary">Browse plans</Link>
            </p>
          ) : (
            <ul className="space-y-2 text-sm mb-4">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between gap-3 text-muted-foreground">
                  <span>{i.name} × {i.qty} · {i.months}mo</span>
                  <span className="text-foreground">{format(i.price * i.qty * i.months)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="border-t border-border/60 my-4" />
          <div className="flex justify-between items-center mb-6">
            <span className="font-medium">Total</span>
            <span className="text-xl font-bold text-gradient-blossom">{format(total)}</span>
          </div>
          <button type="submit" className="grad-btn text-primary-foreground w-full py-3 rounded-xl font-medium">
            Place order
          </button>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="mt-3 glass w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-secondary transition">
            <MessageCircle className="w-4 h-4" /> Pay on Discord
          </a>
        </div>
      </form>
    </section>
  );
}
