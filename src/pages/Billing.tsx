import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { motion } from "framer-motion";
import {
  CreditCard, Smartphone, Bitcoin, ShieldCheck, MessageCircle, UserCheck, Lock, LogOut,
} from "lucide-react";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { useAuth } from "@/lib/auth";
import { DISCORD } from "@/data/plans";
import AuthInline from "@/components/AuthInline";
import { supabase } from "@/integrations/supabase/client";

const METHODS = [
  { id: "upi", label: "UPI / QR", icon: Smartphone, desc: "GPay, PhonePe, Paytm" },
  { id: "card", label: "Card", icon: CreditCard, desc: "Visa, Mastercard, RuPay" },
  { id: "crypto", label: "Crypto", icon: Bitcoin, desc: "USDT, BTC, LTC" },
];

const detailsSchema = z.object({
  name: z.string().trim().min(2, { message: "Enter your full name" }).max(80),
  discord: z.string().trim().min(2, { message: "Enter your Discord username" }).max(40)
    .regex(/^[a-zA-Z0-9._#-]+$/, { message: "Discord username has invalid characters" }),
  country: z.string().trim().min(2, { message: "Enter your country" }).max(56),
  notes: z.string().trim().max(300).optional(),
});

export default function Billing() {
  const { items, subtotal, clear } = useCart();
  const { format } = useCurrency();
  const { user, loading, signOut } = useAuth();
  const nav = useNavigate();
  const [method, setMethod] = useState("upi");
  const [form, setForm] = useState({ name: "", discord: "", country: "India", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const total = Math.round(subtotal * 1.18);
  const field = "w-full bg-secondary rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!items.length) return toast.error("Your cart is empty");

    const parsed = detailsSchema.safeParse(form);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { const k = String(i.path[0]); if (!map[k]) map[k] = i.message; });
      return setErrors(map);
    }

    // Re-validate the session with the auth server before creating an order.
    setBusy(true);
    const { data: fresh } = await supabase.auth.getUser();
    if (!fresh.user) {
      setBusy(false);
      return toast.error("Your session expired — please log in again");
    }

    const invoiceNumber = `LC-${Date.now().toString().slice(-8)}`;
    const payload = {
      invoice_number: invoiceNumber,
      user_id: fresh.user.id,
      amount: subtotal,
      discount: 0,
      total,
      status: "pending",
      items: items.map((i) => ({
        name: i.name, group: i.group, qty: i.qty, months: i.months,
        price: i.price, ram: i.ram, cpu: i.cpu, storage: i.storage,
      })),
      due_date: new Date(Date.now() + 2 * 864e5).toISOString(),
    };

    const { error } = await supabase.from("invoices").insert(payload);
    setBusy(false);

    if (error) {
      toast.error("Could not create the invoice", { description: error.message });
      return;
    }

    clear();
    toast.success(`Invoice ${invoiceNumber} created`, {
      description: "Complete the payment and our billing team activates it within minutes.",
    });
    nav("/dashboard");
  };

  const Err = ({ k }: { k: string }) =>
    errors[k] ? <p className="text-xs text-destructive mt-1.5">{errors[k]}</p> : null;

  return (
    <section className="max-w-5xl mx-auto px-6 pt-14 pb-24">
      <h1 className="font-display text-3xl md:text-5xl font-bold mb-2">
        Secure <span className="text-gradient-blossom">Checkout</span>
      </h1>
      <p className="text-muted-foreground mb-10">
        Create your account here at checkout, add your details, then pay — no account needed just to browse the site.
      </p>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6 items-start">
        <div className="space-y-6">
          {/* Step 1 — account */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="glass-pro rounded-2xl p-6 overflow-hidden">
            <div className="flex items-center gap-3 mb-4">
              <span className="icon-tile w-9 h-9 shrink-0 text-xs font-bold">1</span>
              <h2 className="font-display font-bold text-lg">Your account</h2>
            </div>

            {loading ? (
              <p className="text-sm text-muted-foreground">Checking session…</p>
            ) : user ? (
              <div className="flex flex-wrap items-center gap-3">
                <span className="icon-tile tone-mint w-10 h-10 shrink-0"><UserCheck className="w-5 h-5" /></span>
                <div className="mr-auto">
                  <div className="text-sm font-medium">Signed in</div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
                <button onClick={() => signOut()} className="glass rounded-xl px-3.5 py-2 text-xs flex items-center gap-2 hover:bg-secondary transition">
                  <LogOut className="w-3.5 h-3.5" /> Use another account
                </button>
              </div>
            ) : (
              <AuthInline
                defaultMode="signup"
                subtitle="Registration happens right here at checkout so your order, invoices and servers are tied to a verified account."
              />
            )}
          </motion.div>

          {/* Step 2 + 3 — details and payment (locked until signed in) */}
          <form onSubmit={submit} className={`space-y-6 transition ${user ? "" : "opacity-50 pointer-events-none select-none"}`} noValidate>
            <div className="glass-pro rounded-2xl p-6 space-y-4 overflow-hidden">
              <div className="flex items-center gap-3">
                <span className="icon-tile tone-cyan w-9 h-9 shrink-0 text-xs font-bold">2</span>
                <h2 className="font-display font-bold text-lg">Billing details</h2>
                {!user && <Lock className="w-4 h-4 text-muted-foreground ml-auto" />}
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <input maxLength={80} placeholder="Full name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  <Err k="name" />
                </div>
                <div>
                  <input maxLength={40} placeholder="Discord username" className={field} value={form.discord} onChange={(e) => setForm({ ...form, discord: e.target.value })} />
                  <Err k="discord" />
                </div>
                <div>
                  <input maxLength={56} placeholder="Country" className={field} value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                  <Err k="country" />
                </div>
                <div>
                  <input maxLength={300} placeholder="Order notes (optional)" className={field} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  <Err k="notes" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Billing email is taken from your verified account — we never let orders use an unverified email.
              </p>
            </div>

            <div className="glass-pro rounded-2xl p-6 overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <span className="icon-tile tone-violet w-9 h-9 shrink-0 text-xs font-bold">3</span>
                <h2 className="font-display font-bold text-lg">Payment method</h2>
              </div>
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
                <ShieldCheck className="w-4 h-4 text-success" /> Payments are verified by our billing team on Discord within minutes.
              </p>
            </div>

            <button
              type="submit" disabled={busy || !user}
              className="grad-btn text-primary-foreground w-full py-3.5 rounded-xl font-semibold disabled:opacity-60 lg:hidden"
            >
              {busy ? "Creating invoice…" : "Place order"}
            </button>
          </form>
        </div>

        <div className="glass-pro rounded-2xl p-6 lg:sticky lg:top-24 overflow-hidden">
          <h2 className="font-display font-bold text-lg mb-4">Summary</h2>
          {items.length === 0 ? (
            <p className="text-sm text-muted-foreground mb-4">
              Cart is empty. <Link to="/pricing" className="text-primary">Browse plans</Link>
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
            <span className="font-medium">Total (incl. GST)</span>
            <span className="text-xl font-bold text-gradient-blossom">{format(total)}</span>
          </div>
          <button
            onClick={submit as any} disabled={busy || !user}
            className="grad-btn text-primary-foreground w-full py-3 rounded-xl font-semibold disabled:opacity-60 hidden lg:block"
          >
            {busy ? "Creating invoice…" : user ? "Place order" : "Create account first"}
          </button>
          <a href={DISCORD} target="_blank" rel="noreferrer" className="mt-3 glass w-full py-3 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-secondary transition">
            <MessageCircle className="w-4 h-4" /> Pay on Discord
          </a>
        </div>
      </div>
    </section>
  );
}
