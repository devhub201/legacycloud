import { useState } from "react";
import { Link } from "react-router-dom";
import { Cloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Reset link sent! Check your email.");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 bg-grid">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 ring-glow">
        <Link to="/" className="flex items-center justify-center gap-2 mb-6">
          <Cloud className="h-7 w-7 text-primary" />
          <span className="font-display font-bold text-lg"><span className="text-primary">LEGACY</span> CLOUD</span>
        </Link>
        <h1 className="font-display text-2xl font-bold text-center mb-2">Forgot Password?</h1>
        <p className="text-sm text-muted-foreground text-center mb-6">We'll send you a reset link</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div><Label>Email</Label><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></div>
          <Button type="submit" disabled={loading} className="w-full btn-pink ring-glow h-11">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Send Reset Link"}
          </Button>
        </form>
        <p className="text-center text-sm mt-6 text-muted-foreground">
          <Link to="/login" className="text-primary hover:underline">Back to login</Link>
        </p>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;
