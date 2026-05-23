import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Cloud, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated!");
    nav("/dashboard");
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4 bg-grid">
      <div className="w-full max-w-md glass-card rounded-2xl p-8 ring-glow">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Cloud className="h-7 w-7 text-primary" />
          <span className="font-display font-bold text-lg"><span className="text-primary">LEGACY</span> CLOUD</span>
        </div>
        <h1 className="font-display text-2xl font-bold text-center mb-6">Set new password</h1>
        <form onSubmit={onSubmit} className="space-y-4">
          <div><Label>New password</Label><Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></div>
          <Button type="submit" disabled={loading} className="w-full btn-pink ring-glow h-11">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};
export default ResetPasswordPage;
