import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Crown, Users, Plus, Trash2, Save, RotateCcw } from "lucide-react";
import { Field, TextInput, TextArea, IconSelect, ToneSelect } from "@/components/admin/Fields";
import TeamCard from "@/components/TeamCard";
import { useTeam, DEFAULT_TEAM, type TeamData, type TeamMember } from "@/lib/team";
import { saveSetting } from "@/lib/site";

const EMPTY: TeamMember = {
  name: "New member",
  handle: "@handle",
  role: "Staff",
  icon: "Users",
  tone: "",
  bio: "",
  focus: "",
  since: `Since ${new Date().getFullYear()}`,
  tags: [],
  socials: [],
};

type Group = "leaders" | "staff";

export default function AdminStaff() {
  const { data } = useTeam();
  const qc = useQueryClient();
  const [team, setTeam] = useState<TeamData>(DEFAULT_TEAM);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (data) setTeam(data);
  }, [data]);

  const update = (group: Group, i: number, patch: Partial<TeamMember>) =>
    setTeam((t) => ({ ...t, [group]: t[group].map((m, idx) => (idx === i ? { ...m, ...patch } : m)) }));

  const addMember = (group: Group) =>
    setTeam((t) => ({ ...t, [group]: [...t[group], { ...EMPTY, role: group === "leaders" ? "Owner" : "Staff" }] }));

  const removeMember = (group: Group, i: number) =>
    setTeam((t) => ({ ...t, [group]: t[group].filter((_, idx) => idx !== i) }));

  const save = async () => {
    setSaving(true);
    try {
      await saveSetting("team", team);
      qc.invalidateQueries({ queryKey: ["site-team"] });
      toast.success("Team saved — About page updated live");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not save team");
    } finally {
      setSaving(false);
    }
  };

  const editor = (group: Group, title: string, subtitle: string, tone: string, Icon: typeof Crown) => (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className={`icon-tile ${tone} w-10 h-10`}><Icon className="w-5 h-5" /></span>
        <div className="mr-auto">
          <h2 className="font-display text-xl font-bold">{title}</h2>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <button onClick={() => addMember(group)} className="glass rounded-xl px-3.5 py-2 text-sm flex items-center gap-2 hover:bg-secondary transition">
          <Plus className="w-4 h-4" /> Add
        </button>
      </div>

      <div className="space-y-4">
        {team[group].map((m, i) => (
          <div key={`${group}-${i}`} className="grid lg:grid-cols-[1fr_300px] gap-4 items-start glass rounded-2xl p-4">
            <div className="grid sm:grid-cols-2 gap-3">
              <Field label="Name"><TextInput maxLength={60} value={m.name} onChange={(e) => update(group, i, { name: e.target.value })} /></Field>
              <Field label="Role"><TextInput maxLength={60} value={m.role} onChange={(e) => update(group, i, { role: e.target.value })} /></Field>
              <Field label="Handle"><TextInput maxLength={40} value={m.handle} onChange={(e) => update(group, i, { handle: e.target.value })} /></Field>
              <Field label="Since"><TextInput maxLength={30} value={m.since} onChange={(e) => update(group, i, { since: e.target.value })} /></Field>
              <Field label="Icon"><IconSelect value={m.icon} onChange={(e) => update(group, i, { icon: e.target.value })} /></Field>
              <Field label="Tone"><ToneSelect value={m.tone} onChange={(e) => update(group, i, { tone: e.target.value })} /></Field>
              <div className="sm:col-span-2">
                <Field label="Bio"><TextArea maxLength={400} value={m.bio} onChange={(e) => update(group, i, { bio: e.target.value })} /></Field>
              </div>
              <Field label="Focus"><TextInput maxLength={120} value={m.focus} onChange={(e) => update(group, i, { focus: e.target.value })} /></Field>
              <Field label="Tags (comma separated)">
                <TextInput
                  maxLength={160}
                  value={m.tags.join(", ")}
                  onChange={(e) => update(group, i, { tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) })}
                />
              </Field>
              <Field label="Discord / profile link">
                <TextInput
                  maxLength={200}
                  placeholder="https://discord.gg/…"
                  value={m.socials.find((s) => s.label === "Discord")?.href ?? ""}
                  onChange={(e) => {
                    const rest = m.socials.filter((s) => s.label !== "Discord");
                    update(group, i, { socials: e.target.value ? [{ label: "Discord", href: e.target.value }, ...rest] : rest });
                  }}
                />
              </Field>
              <Field label="Email">
                <TextInput
                  maxLength={200}
                  placeholder="mailto:name@legacycloud.fun"
                  value={m.socials.find((s) => s.label === "Email")?.href ?? ""}
                  onChange={(e) => {
                    const rest = m.socials.filter((s) => s.label !== "Email");
                    update(group, i, { socials: e.target.value ? [...rest, { label: "Email", href: e.target.value }] : rest });
                  }}
                />
              </Field>
              <button
                onClick={() => removeMember(group, i)}
                className="sm:col-span-2 justify-self-start text-xs text-muted-foreground hover:text-destructive transition flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" /> Remove member
              </button>
            </div>
            <TeamCard member={m} compact />
          </div>
        ))}
        {team[group].length === 0 && <p className="text-sm text-muted-foreground">No members yet.</p>}
      </div>
    </div>
  );

  return (
    <div className="space-y-10">
      <div className="glass-pro rounded-2xl p-4 flex flex-wrap items-center gap-3">
        <p className="text-sm text-muted-foreground mr-auto">
          Edit owners, CEO and staff here — changes go live on the About page instantly.
        </p>
        <button onClick={() => setTeam(DEFAULT_TEAM)} className="glass rounded-xl px-3.5 py-2 text-sm flex items-center gap-2 hover:bg-secondary transition">
          <RotateCcw className="w-4 h-4" /> Reset to defaults
        </button>
        <button onClick={save} disabled={saving} className="grad-btn text-primary-foreground rounded-xl px-4 py-2 text-sm font-semibold flex items-center gap-2 disabled:opacity-60">
          <Save className="w-4 h-4" /> {saving ? "Saving…" : "Save team"}
        </button>
      </div>

      {editor("leaders", "Owners & leadership", "Full access to billing, nodes and staff management.", "tone-amber", Crown)}
      {editor("staff", "Staff & crew", "Support, moderation and security rotation.", "tone-cyan", Users)}
    </div>
  );
}
