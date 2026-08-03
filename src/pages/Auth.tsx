import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Mail, Lock, LogIn, UserPlus, MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/lib/auth";
import { DISCORD } from "@/data/plans";

export default function Auth() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const { user } = useAuth();
  const nav = useNavigate();

  useEffect(() => {
    if (user) nav("/dashboard", { replace: true });
  }, [user, nav]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success("Account banaya! Confirmation mail check karo.");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back to Legacy Cloud");
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

  return (
    <section className="max-w-5xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-10 items-center">
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }}>
        <span className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground mb-5">
          <Sparkles className="w-3 h-3 text-primary" /> Legacy Cloud account
        </span>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-4">
          Sign in to your <span className="text-gradient-anim">blossom panel</span>
        </h1>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          Manage your Minecraft servers and VPS, track invoices and open tickets — all in one place.
        </p>
        <ul className="space-y-3 text-sm">
          {[
            { icon: ShieldCheck, t: "Secure sessions with 2-step ready auth", tone: "tone-cyan" },
            { icon: MessageCircle, t: "Support handled by real humans on Discord", tone: "tone-violet" },
            { icon: LogIn, t: "One account for cart, billing and dashboard", tone: "tone-mint" },
          ].map((r) => (
            <li key={r.t} className="flex items-center gap-3">
              <span className={`icon-tile ${r.tone} w-9 h-9 shrink-0`}><r.icon className="w-4 h-4" /></span>
              <span className="text-muted-foreground">{r.t}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}
        className="glass rounded-2xl p-6 md:p-8 card-3d"
      >
        <span aria-hidden className="card-sheen" />
        <div className="relative">
          <div className="glass rounded-full p-1 flex text-sm font-medium mb-6">
            {(["login", "signup"] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-full transition ${
                  mode === m ? "grad-btn text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {m === "login" ? "Log in" : "Sign up"}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <label className="block">
              <span className="text-xs text-muted-foreground">Email</span>
              <div className="mt-1.5 flex items-center gap-2 rounded-xl bg-secondary px-3.5 py-3">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-xs text-muted-foreground">Password</span>
              <div className="mt-1.5 flex items-center gap-2 rounded-xl bg-secondary px-3.5 py-3">
                <Lock className="w-4 h-4 text-primary shrink-0" />
                <input
                  type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>
            </label>
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              disabled={busy} type="submit"
              className="w-full grad-btn text-primary-foreground font-semibold py-3 rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {mode === "login" ? <><LogIn className="w-4 h-4" /> Log in</> : <><UserPlus className="w-4 h-4" /> Create account</>}
            </motion.button>
          </form>

          <div className="flex items-center gap-3 my-5 text-xs text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or continue with <span className="h-px flex-1 bg-border" />
          </div>

          <button
            onClick={google} disabled={busy}
            className="w-full glass rounded-xl py-3 text-sm font-medium hover:bg-secondary transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden>
              <path fill="currentColor" d="M12 11v3.2h5.4c-.2 1.4-1.6 4-5.4 4A6.2 6.2 0 1 1 16.1 7l2.4-2.3A9.6 9.6 0 1 0 21.6 12c0-.4 0-.7-.1-1z" />
            </svg>
            Google
          </button>

          <a
            href={DISCORD} target="_blank" rel="noreferrer"
            className="mt-3 w-full glass rounded-xl py-3 text-sm font-medium hover:bg-secondary transition flex items-center justify-center gap-2 text-info"
          >
            <MessageCircle className="w-4 h-4" /> Join Discord community
          </a>
          <p className="text-[11px] text-muted-foreground mt-3 text-center leading-relaxed">
            Discord login OAuth abhi hosted backend par supported nahi hai — filhaal email ya Google se login karo,
            support aur community Discord par hi hai.
          </p>
          <p className="text-[11px] text-muted-foreground mt-3 text-center">
            By continuing you agree to our <Link to="/tos" className="text-primary">Terms</Link> and{" "}
            <Link to="/privacy" className="text-primary">Privacy Policy</Link>.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
