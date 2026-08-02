import { LEADERS, STAFF } from "@/data/team";

export default function AdminStaff() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-xl font-bold mb-3">Leadership</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {LEADERS.map((p) => (
            <div key={p.name} className="glass rounded-2xl p-5">
              <span className="icon-tile w-11 h-11 mb-3"><p.icon className="w-5 h-5" /></span>
              <div className="font-display font-bold">{p.name}</div>
              <div className="text-xs text-gradient-blossom font-semibold mb-2">{p.role}</div>
              <p className="text-xs text-muted-foreground leading-relaxed">{p.bio}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl font-bold mb-3">Staff &amp; crew</h2>
        <div className="glass rounded-2xl divide-y divide-border/60">
          {STAFF.map((s) => (
            <div key={s.name} className="p-4 flex items-center gap-3 text-sm">
              <span className="icon-tile w-10 h-10 shrink-0"><s.icon className="w-4 h-4" /></span>
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground">{s.role} · {s.detail}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
