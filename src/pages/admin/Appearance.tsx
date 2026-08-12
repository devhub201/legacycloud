import { useState } from "react";
import { toast } from "sonner";
import { Save, Palette } from "lucide-react";
import { useSite, saveSetting } from "@/lib/site";
import { Field, TextInput, Select } from "@/components/admin/Fields";

const PRESETS = [
  { name: "Azure Deep", theme: { background: "215 65% 6%", primary: "217 100% 59%", primaryGlow: "203 100% 74%", accent: "197 92% 62%" } },
  { name: "Sky Light Blue", theme: { background: "212 60% 10%", primary: "205 95% 62%", primaryGlow: "195 100% 78%", accent: "188 92% 62%" } },
  { name: "Electric Cobalt", theme: { background: "228 70% 5%", primary: "228 96% 62%", primaryGlow: "196 100% 70%", accent: "250 90% 68%" } },
];

export default function AdminAppearance() {
  const { theme, brand, appearance, refresh } = useSite();
  const [t, setT] = useState({ ...theme });
  const [b, setB] = useState({ ...brand });
  const [a, setA] = useState({ ...appearance });

  async function save() {
    try {
      await saveSetting("theme", t);
      await saveSetting("brand", b);
      await saveSetting("appearance", a);
      refresh();
      toast.success("Appearance saved — live on the site");
    } catch (e: any) {
      toast.error(e.message);
    }
  }

  return (
    <div className="space-y-4 max-w-2xl">
      <div className="glass rounded-2xl p-5 space-y-3">
        <h3 className="font-display font-bold flex items-center gap-2"><Palette className="w-4 h-4 text-primary" /> Theme colors (HSL values)</h3>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button key={p.name} onClick={() => setT({ ...t, ...p.theme })} className="glass px-3 py-2 rounded-xl text-xs hover:bg-secondary transition">
              {p.name}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Background"><TextInput value={t.background ?? ""} onChange={(e) => setT({ ...t, background: e.target.value })} /></Field>
          <Field label="Primary"><TextInput value={t.primary ?? ""} onChange={(e) => setT({ ...t, primary: e.target.value })} /></Field>
          <Field label="Primary glow"><TextInput value={t.primaryGlow ?? ""} onChange={(e) => setT({ ...t, primaryGlow: e.target.value })} /></Field>
          <Field label="Accent"><TextInput value={t.accent ?? ""} onChange={(e) => setT({ ...t, accent: e.target.value })} /></Field>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 space-y-3">
        <h3 className="font-display font-bold">Background & particles</h3>
        <Field label="Background image URL"><TextInput value={a.backgroundImage ?? ""} onChange={(e) => setA({ ...a, backgroundImage: e.target.value })} /></Field>
        <Field label="Background opacity (0 - 1)">
          <TextInput type="number" step="0.05" min="0" max="1" value={a.backgroundOpacity ?? 0.35}
            onChange={(e) => setA({ ...a, backgroundOpacity: Number(e.target.value) })} />
        </Field>
        <Field label="Floating particles">
          <Select options={["bubbles", "none"]} value={a.particles ?? "bubbles"} onChange={(e) => setA({ ...a, particles: e.target.value as any })} />
        </Field>
      </div>

      <div className="glass rounded-2xl p-5 space-y-3">
        <h3 className="font-display font-bold">Brand</h3>
        <Field label="Brand name"><TextInput value={b.name ?? ""} onChange={(e) => setB({ ...b, name: e.target.value })} /></Field>
        <Field label="Tagline"><TextInput value={b.tagline ?? ""} onChange={(e) => setB({ ...b, tagline: e.target.value })} /></Field>
        <Field label="Discord invite"><TextInput value={b.discord ?? ""} onChange={(e) => setB({ ...b, discord: e.target.value })} /></Field>
      </div>

      <button onClick={save} className="grad-btn text-primary-foreground px-5 py-3 rounded-xl text-sm font-medium inline-flex items-center gap-2">
        <Save className="w-4 h-4" /> Save appearance
      </button>
    </div>
  );
}
