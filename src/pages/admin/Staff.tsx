import { LEADERS, STAFF } from "@/data/team";
import TeamCard from "@/components/TeamCard";
import { Crown, Users } from "lucide-react";

export default function AdminStaff() {
  return (
    <div className="space-y-10">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="icon-tile tone-amber w-10 h-10"><Crown className="w-5 h-5" /></span>
          <div>
            <h2 className="font-display text-xl font-bold">Owners &amp; leadership</h2>
            <p className="text-xs text-muted-foreground">Full access to billing, nodes and staff management.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {LEADERS.map((p, i) => <TeamCard key={p.name} member={p} index={i} compact />)}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="icon-tile tone-cyan w-10 h-10"><Users className="w-5 h-5" /></span>
          <div>
            <h2 className="font-display text-xl font-bold">Staff &amp; crew</h2>
            <p className="text-xs text-muted-foreground">Support, moderation and security rotation.</p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {STAFF.map((s, i) => <TeamCard key={s.name} member={s} index={i} compact />)}
        </div>
      </div>
    </div>
  );
}
