import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { z } from "zod";
import { Mail, Lock, User, LogIn, UserPlus, ShieldCheck, MailCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";

/** Strong-ish password rules, validated client side and enforced again by the auth server. */
const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(72, { message: "Password must be under 72 characters" })
  .regex(/[a-z]/, { message: "Add at least one lowercase letter" })
  .regex(/[A-Z]/, { message: "Add at least one uppercase letter" })
  .regex(/[0-9]/, { message: "Add at least one number" });

const signupSchema = z
  .object({
    name: z.string().trim().min(2, { message: "Enter your full name" }).max(80),
    email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
    password: passwordSchema,
    confirm: z.string(),
  })
  .refine((v) => v.password === v.confirm, { path: ["confirm"], message: "Passwords do not match" });

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email" }).max(255),
  password: z.string().min(1, { message: "Enter your password" }).max(72),
});

const field = "w-full bg-secondary rounded-xl pl-10 pr-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/50";

export default function AuthInline({
  defaultMode = "signup",
  title,
  subtitle,
  onDone,
}: {
  defaultMode?: "signup" | "login";
  title?: string;
  subtitle?: string;
  onDone?: () => void;
}) {
  const [mode, setMode] = useState<"signup" | "login">(defaultMode);
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = mode === "signup" ? signupSchema.safeParse(form) : loginSchema.safeParse(form);
    if (!parsed.success) {
      const map: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { const k = String(i.path[0] ?? "form"); if (!map[k]) map[k] = i.message; });
      setErrors(map);
      return;
    }

    setBusy(true);
    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email: form.email.trim(),
          password: form.password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { display_name: form.name.trim() },
          },
        });
        if (error) throw error;
        if (!data.session) {
          setSent(true);
          toast.success("Account created — confirm your email to continue");
        } else {
          toast.success("Account created");
          onDone?.();
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email: form.email.trim(),
          password: form.password,
        });
        if (error) throw error;
        toast.success("Welcome back to Legacy Cloud");
        onDone?.();
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  };

  const google = async () => {
    setBusy(true);
    const res = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin });
    if (res?.error) toast.error(res.error.message);
    setBusy(false);
  };

  if (sent) {
    return (
      <div className="text-center py-6">
        <span className="icon-tile tone-mint w-14 h-14 mx-auto mb-4"><MailCheck className="w-6 h-6" /></span>
        <h3 className="font-display font-bold text-lg mb-2">Check your inbox</h3>
        <p className="text-sm text-muted-foreground">
          We sent a confirmation link to <span className="text-foreground">{form.email}</span>. Click it, then come
          back here to finish your order.
        </p>
      </div>
    );
  }

  const Err = ({ k }: { k: string }) =>
    errors[k] ? <p className="text-xs text-destructive mt-1.5">{errors[k]}</p> : null;

  return (
    <div>
      <div className="glass rounded-full p-1 flex text-sm font-medium mb-5">
        {(["signup", "login"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => { setMode(m); setErrors({}); }}
            className={`flex-1 py-2 rounded-full transition ${
              mode === m ? "grad-btn text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m === "signup" ? "Create account" : "I have an account"}
          </button>
        ))}
      </div>

      {title && <h3 className="font-display font-bold text-lg">{title}</h3>}
      {subtitle && <p className="text-sm text-muted-foreground mt-1 mb-4">{subtitle}</p>}

      <form onSubmit={submit} className="space-y-3.5" noValidate>
        {mode === "signup" && (
          <div>
            <div className="relative">
              <User className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input className={field} maxLength={80} placeholder="Full name" value={form.name} onChange={set("name")} autoComplete="name" />
            </div>
            <Err k="name" />
          </div>
        )}

        <div>
          <div className="relative">
            <Mail className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input className={field} type="email" maxLength={255} placeholder="Email address" value={form.email} onChange={set("email")} autoComplete="email" />
          </div>
          <Err k="email" />
        </div>

        <div>
          <div className="relative">
            <Lock className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              className={field}
              type="password"
              maxLength={72}
              placeholder={mode === "signup" ? "Password (8+, A-z, 0-9)" : "Password"}
              value={form.password}
              onChange={set("password")}
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
            />
          </div>
          <Err k="password" />
        </div>

        {mode === "signup" && (
          <div>
            <div className="relative">
              <ShieldCheck className="w-4 h-4 text-primary absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input className={field} type="password" maxLength={72} placeholder="Confirm password" value={form.confirm} onChange={set("confirm")} autoComplete="new-password" />
            </div>
            <Err k="confirm" />
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
          type="submit" disabled={busy}
          className="w-full grad-btn text-primary-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
        >
          {mode === "signup" ? <><UserPlus className="w-4 h-4" /> Create account &amp; continue</> : <><LogIn className="w-4 h-4" /> Log in</>}
        </motion.button>
      </form>

      <div className="flex items-center gap-3 my-4 text-xs text-muted-foreground">
        <span className="h-px flex-1 bg-border" /> or <span className="h-px flex-1 bg-border" />
      </div>

      <button
        type="button" onClick={google} disabled={busy}
        className="w-full glass rounded-xl py-3 text-sm font-medium hover:bg-secondary transition flex items-center justify-center gap-2 disabled:opacity-60"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
          <path fill="currentColor" d="M12 11v3.2h5.4c-.2 1.4-1.6 4-5.4 4A6.2 6.2 0 1 1 16.1 7l2.4-2.3A9.6 9.6 0 1 0 21.6 12c0-.4 0-.7-.1-1z" />
        </svg>
        Continue with Google
      </button>

      <p className="text-[11px] text-muted-foreground mt-3 flex items-start gap-1.5">
        <ShieldCheck className="w-3.5 h-3.5 text-success shrink-0 mt-0.5" />
        Passwords are hashed and never stored by us. We never ask for your password on Discord.
      </p>
    </div>
  );
}
