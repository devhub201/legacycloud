import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HardDrive, Power } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const MyVpsPage = () => {
  const { user } = useAuth();
  const [list, setList] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from("services").select("*").eq("user_id", user.id).eq("plan_type", "vps").order("created_at", { ascending: false })
      .then(({ data }) => setList(data ?? []));
  }, [user]);

  return (
    <DashboardLayout title="My VPS">
      <div className="flex items-center justify-between mb-5">
        <p className="text-muted-foreground text-sm">All your virtual private servers</p>
        <Link to="/vps"><Button className="btn-pink">Order New VPS</Button></Link>
      </div>

      {list.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center">
          <HardDrive className="h-12 w-12 text-primary mx-auto mb-4 opacity-50" />
          <h3 className="font-display text-xl font-semibold mb-2">No VPS yet</h3>
          <Link to="/vps"><Button className="btn-pink ring-glow mt-2">Browse VPS Plans</Button></Link>
        </div>
      ) : (
        <div className="space-y-3">
          {list.map((v) => (
            <div key={v.id} className="glass-card rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <div className="h-12 w-12 rounded-lg bg-primary/15 flex items-center justify-center">
                  <HardDrive className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold">{v.plan_name}</h3>
                  <div className="text-xs text-muted-foreground">{v.location} · {v.ram} RAM · {v.cpu} CPU · {v.storage}</div>
                  {v.ip_address && <div className="text-xs font-mono mt-1">IP: {v.ip_address}</div>}
                </div>
              </div>
              <Badge>{v.status}</Badge>
              <div className="flex gap-2">
                <Button size="sm" variant="outline"><Power className="h-3.5 w-3.5 mr-1" />Console</Button>
                <Link to={`/dashboard/renew/${v.id}`}><Button size="sm" className="btn-pink">Renew</Button></Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
};

export default MyVpsPage;
