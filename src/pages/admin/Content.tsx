import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Save, Trash2, ChevronDown, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { usePageSections, type Section } from "@/lib/catalog";
import { SECTION_TYPES } from "@/components/SectionRenderer";
import { Field, TextInput, TextArea, Select, Toggle } from "@/components/admin/Fields";

export default function AdminContent() {
  const qc = useQueryClient();
  const [page, setPage] = useState("home");
  const { data: sections = [] } = usePageSections(page, true);
  const [open, setOpen] = useState<string | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: ["page-sections"] });

  async function save(s: any) {
    const payload = { ...s };
    delete payload.created_at;
    delete payload.updated_at;
    const { error } = s.id
      ? await supabase.from("page_sections").update(payload).eq("id", s.id)
      : await supabase.from("page_sections").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Section saved");
    refresh();
  }

  async function remove(id: string) {
    if (!confirm("Delete this section?")) return;
    const { error } = await supabase.from("page_sections").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Section deleted");
    refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold">Site content</h2>
          <p className="text-xs text-muted-foreground">Sections render top-to-bottom by sort order.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-40"><Select options={["home", "about", "features", "support"]} value={page} onChange={(e) => setPage(e.target.value)} /></div>
          <button
            onClick={() => save({ page, type: "text", heading: "New section", sort_order: (sections.length + 1) * 10, items: [] })}
            className="grad-btn text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Section
          </button>
        </div>
      </div>

      {(sections as Section[]).map((s) => {
        const isOpen = open === s.id;
        return (
          <div key={s.id} className="glass rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(isOpen ? null : s.id)} className="w-full flex items-center gap-3 p-4 text-left">
              <span className="glass rounded-lg px-2.5 py-1 text-[11px] uppercase tracking-wide text-primary">{s.type}</span>
              <div className="min-w-0">
                <div className="font-display font-bold truncate">{s.heading ?? s.eyebrow ?? "(untitled)"}</div>
                <div className="text-xs text-muted-foreground">order {s.sort_order}</div>
              </div>
              <span className="ml-auto text-muted-foreground">{s.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</span>
              <ChevronDown className={`w-4 h-4 transition ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && <SectionForm section={s} onSave={save} onDelete={() => remove(s.id)} />}
          </div>
        );
      })}
      {sections.length === 0 && <p className="text-sm text-muted-foreground py-8 text-center">No sections on this page yet.</p>}
    </div>
  );
}

function SectionForm({ section, onSave, onDelete }: { section: Section; onSave: (s: any) => void; onDelete: () => void }) {
  const [f, setF] = useState<Section>(section);
  const [itemsText, setItemsText] = useState(JSON.stringify(section.items ?? [], null, 2));
  const set = (k: keyof Section) => (e: any) => setF({ ...f, [k]: e.target.value });

  function submit() {
    let items: any[] = [];
    try {
      items = itemsText.trim() ? JSON.parse(itemsText) : [];
      if (!Array.isArray(items)) throw new Error("Items must be a list");
    } catch (e: any) {
      return toast.error(`Items JSON invalid: ${e.message}`);
    }
    onSave({ ...f, items });
  }

  return (
    <div className="p-4 pt-0 grid sm:grid-cols-2 gap-3 border-t border-border/60">
      <Field label="Type"><Select options={SECTION_TYPES} value={f.type} onChange={set("type")} /></Field>
      <Field label="Sort order"><TextInput type="number" value={f.sort_order} onChange={(e) => setF({ ...f, sort_order: Number(e.target.value) })} /></Field>
      <Field label="Eyebrow"><TextInput value={f.eyebrow ?? ""} onChange={set("eyebrow")} /></Field>
      <Field label="Heading"><TextInput value={f.heading ?? ""} onChange={set("heading")} /></Field>
      <div className="sm:col-span-2"><Field label="Subheading"><TextArea value={f.subheading ?? ""} onChange={set("subheading")} /></Field></div>
      <div className="sm:col-span-2"><Field label="Body"><TextArea value={f.body ?? ""} onChange={set("body")} /></Field></div>
      <Field label="Image URL"><TextInput value={f.image_url ?? ""} onChange={set("image_url")} /></Field>
      <Field label="CTA label"><TextInput value={f.cta_label ?? ""} onChange={set("cta_label")} /></Field>
      <Field label="CTA link"><TextInput value={f.cta_href ?? ""} onChange={set("cta_href")} /></Field>
      <div className="flex items-end"><div className="w-full"><Toggle label="Visible" value={f.is_visible} onChange={(v) => setF({ ...f, is_visible: v })} /></div></div>
      <div className="sm:col-span-2">
        <Field label="Items (JSON list — stats: {label,value}; features: {icon,title,text,tone})">
          <TextArea value={itemsText} onChange={(e) => setItemsText(e.target.value)} className="font-mono" />
        </Field>
      </div>
      <div className="sm:col-span-2 flex gap-2">
        <button onClick={submit} className="grad-btn text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
          <Save className="w-4 h-4" /> Save section
        </button>
        <button onClick={onDelete} className="glass px-4 py-2.5 rounded-xl text-sm text-destructive inline-flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
}
