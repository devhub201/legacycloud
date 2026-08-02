import { useState } from "react";
import { Save } from "lucide-react";
import { DISCORD } from "@/data/plans";
import { useCurrency } from "@/lib/currency";

export default function AdminSettings() {
  const { currency, setCurrency } = useCurrency() as any;
  const [brand, setBrand] = useState(() => localStorage.getItem("lc-brand") || "Legacy Cloud");
  const [discord, setDiscord] = useState(() => localStorage.getItem("lc-discord") || DISCORD);
  const [maintenance, setMaintenance] = useState(() => localStorage.getItem("lc-maintenance") === "1");
  const [saved, setSaved] = useState(false);

  function save() {
    localStorage.setItem("lc-brand", brand);
    localStorage.setItem("lc-discord", discord);
    localStorage.setItem("lc-maintenance", maintenance ? "1" : "0");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-4 max-w-xl">
      <div className="glass rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-bold">Brand</h3>
        <label className="block text-sm">
          <span className="text-xs text-muted-foreground">Store name</span>
          <input value={brand} onChange={(e) => setBrand(e.target.value)}
            className="mt-1 w-full bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary" />
        </label>
        <label className="block text-sm">
          <span className="text-xs text-muted-foreground">Discord invite</span>
          <input value={discord} onChange={(e) => setDiscord(e.target.value)}
            className="mt-1 w-full bg-secondary rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-primary" />
        </label>
      </div>

      <div className="glass rounded-2xl p-6 space-y-4">
        <h3 className="font-display font-bold">Store</h3>
        <div className="flex items-center justify-between text-sm">
          <span>Default currency</span>
          <div className="glass rounded-xl p-1 flex gap-1">
            {(["INR", "USD"] as const).map((c) => (
              <button key={c} onClick={() => setCurrency?.(c)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium ${currency === c ? "grad-btn text-primary-foreground" : "text-muted-foreground"}`}>
                {c}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span>Maintenance mode banner</span>
          <button onClick={() => setMaintenance((v) => !v)}
            className={`w-12 h-6 rounded-full transition relative ${maintenance ? "grad-btn" : "bg-secondary"}`}>
            <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-all ${maintenance ? "left-6" : "left-0.5"}`} />
          </button>
        </div>
      </div>

      <button onClick={save} className="grad-btn text-primary-foreground px-5 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
        <Save className="w-4 h-4" /> {saved ? "Saved" : "Save settings"}
      </button>
    </div>
  );
}
