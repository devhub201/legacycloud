import { useState, useEffect } from "react";
import { Loader2, Save } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ProfilePage = () => {
  const { user, profile, refreshProfile } = useAuth();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setName(profile?.display_name || "");
    setAvatar(profile?.avatar_url || "");
  }, [profile]);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    const { error } = await supabase.from("profiles").update({ display_name: name, avatar_url: avatar }).eq("user_id", user.id);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Profile updated!");
    refreshProfile();
  };

  return (
    <DashboardLayout title="Profile Settings">
      <div className="max-w-2xl">
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center font-display text-3xl font-bold text-primary ring-2 ring-primary/40">
              {avatar ? <img src={avatar} alt="" className="h-full w-full rounded-full object-cover" /> : (name[0] || "U").toUpperCase()}
            </div>
            <div>
              <h2 className="font-display text-xl font-semibold">{name || "Your name"}</h2>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
          </div>

          <form onSubmit={save} className="space-y-4">
            <div>
              <Label>Display Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="How others see you" />
            </div>
            <div>
              <Label>Avatar URL</Label>
              <Input value={avatar} onChange={(e) => setAvatar(e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <Label>Email</Label>
              <Input value={user?.email || ""} disabled />
            </div>
            <div>
              <Label>Referral Code</Label>
              <Input value={profile?.referral_code || ""} disabled className="font-mono" />
            </div>
            <Button type="submit" disabled={loading} className="btn-pink ring-glow">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="h-4 w-4 mr-2" />Save Changes</>}
            </Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default ProfilePage;
