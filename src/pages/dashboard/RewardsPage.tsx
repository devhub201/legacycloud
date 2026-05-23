import { Gift, Copy, Users, Wallet } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const RewardsPage = () => {
  const { profile } = useAuth();
  const code = profile?.referral_code || "—";
  const link = `${window.location.origin}/register?ref=${code}`;

  return (
    <DashboardLayout title="Invite & Earn Rewards">
      <div className="max-w-3xl">
        <div className="glass-card rounded-2xl p-6 md:p-8 mb-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <Gift className="h-10 w-10 text-primary mb-3 relative" />
          <h2 className="font-display text-2xl font-bold relative">Earn ₹100 for every friend you invite</h2>
          <p className="text-muted-foreground mt-2 relative">They get 10% off their first order, you get ₹100 credit.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mb-5">
          <div className="glass-card rounded-xl p-4 text-center">
            <Users className="h-5 w-5 text-primary mx-auto mb-2" />
            <div className="font-display text-2xl font-bold">0</div>
            <div className="text-xs text-muted-foreground">Friends Invited</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Wallet className="h-5 w-5 text-emerald-400 mx-auto mb-2" />
            <div className="font-display text-2xl font-bold">₹0</div>
            <div className="text-xs text-muted-foreground">Rewards Earned</div>
          </div>
          <div className="glass-card rounded-xl p-4 text-center">
            <Gift className="h-5 w-5 text-yellow-400 mx-auto mb-2" />
            <div className="font-display text-2xl font-bold">0</div>
            <div className="text-xs text-muted-foreground">Pending</div>
          </div>
        </div>

        <div className="glass-card rounded-xl p-5 space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">Your Referral Code</div>
            <div className="flex gap-2">
              <Input readOnly value={code} className="font-mono text-lg font-bold text-primary" />
              <Button variant="outline" onClick={() => { navigator.clipboard.writeText(code); toast.success("Copied!"); }}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Referral Link</div>
            <div className="flex gap-2">
              <Input readOnly value={link} />
              <Button variant="outline" onClick={() => { navigator.clipboard.writeText(link); toast.success("Copied!"); }}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
export default RewardsPage;
