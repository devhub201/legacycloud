import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Cloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/contexts/AuthContext";

const RegisterPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const { user } = useAuth();
  useEffect(() => { if (user) nav("/dashboard"); }, [user, nav]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) return toast.error("Passwords don't match");
    if (!agreed) return toast.error("Accept the terms to continue");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { display_name: form.name },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created! Logging in...");
    nav("/dashboard");
  };

  const google = async () => {
    await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 bg-grid">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md glass-card rounded-2xl p-8 ring-glow">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <Cloud className="h-7 w-7 text-primary" />
          <span className="font-display font-bold text-lg"><span className="text-primary">LEGACY</span> CLOUD</span>
        </Link>
        <h1 className="font-display text-3xl font-bold text-center mb-1">Create Your Account</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">Start hosting in minutes</p>

        <form onSubmit={onSubmit} className="space-y-3">
          <div><Label>Username</Label><Input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your username" /></div>
          <div><Label>Email</Label><Input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></div>
          <div><Label>Password</Label><Input type="password" required minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="At least 6 characters" /></div>
          <div><Label>Confirm Password</Label><Input type="password" required value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} /></div>
          <div className="flex items-start gap-2 pt-1">
            <Checkbox id="terms" checked={agreed} onCheckedChange={(v) => setAgreed(!!v)} />
            <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
              I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
            </Label>
          </div>
          <Button type="submit" disabled={loading} className="w-full btn-pink ring-glow h-11 mt-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Register"}
          </Button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-border" /><span className="text-xs text-muted-foreground">OR</span><div className="flex-1 h-px bg-border" />
        </div>
        <Button onClick={google} variant="outline" className="w-full h-11">Sign up with Google</Button>

        <p className="text-center text-sm mt-6 text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary font-medium hover:underline">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
