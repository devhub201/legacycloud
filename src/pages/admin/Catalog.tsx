import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Plus, Trash2, Save, Layers, ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useCategories, usePlans, type Category, type DbPlan } from "@/lib/catalog";
import { iconByName } from "@/lib/icons";
import { Field, TextInput, TextArea, IconSelect, ToneSelect, Select, Toggle } from "@/components/admin/Fields";

const KINDS = ["game", "vps", "web", "saas", "other"];

export default function AdminCatalog() {
  const qc = useQueryClient();
  const { data: categories = [] } = useCategories(true);
  const { data: plans = [] } = usePlans(true);
  const [open, setOpen] = useState<string | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: ["catalog"] });

  async function saveCategory(c: Partial<Category> & { id?: string }) {
    const payload = { ...c };
    delete (payload as any).created_at;
    delete (payload as any).updated_at;
    const { error } = c.id
      ? await supabase.from("product_categories").update(payload).eq("id", c.id)
      : await supabase.from("product_categories").insert(payload as any);
    if (error) return toast.error(error.message);
    toast.success("Category saved");
    refresh();
  }

  async function addCategory() {
    const n = categories.length + 1;
    await saveCategory({ name: `New Category ${n}`, slug: `new-category-${Date.now().toString(36)}`, kind: "other", sort_order: n * 10 } as any);
  }

  async function deleteCategory(id: string) {
    if (!confirm("Delete this category and all its plans?")) return;
    const { error } = await supabase.from("product_categories").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Category deleted");
    refresh();
  }

  async function savePlan(p: Partial<DbPlan> & { id?: string }) {
    const payload: any = { ...p };
    delete payload.created_at;
    delete payload.updated_at;
    const { error } = p.id
      ? await supabase.from("product_plans").update(payload).eq("id", p.id)
      : await supabase.from("product_plans").insert(payload);
    if (error) return toast.error(error.message);
    toast.success("Plan saved");
    refresh();
  }

  async function deletePlan(id: string) {
    const { error } = await supabase.from("product_plans").delete().eq("id", id);
    if (error) return toast.error(error.message);
    toast.success("Plan deleted");
    refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold">Catalog</h2>
          <p className="text-xs text-muted-foreground">Categories and plans shown across the site.</p>
        </div>
        <button onClick={addCategory} className="grad-btn text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Category
        </button>
      </div>

      {categories.map((c) => {
        const Icon = iconByName(c.icon);
        const list = plans.filter((p) => p.category_id === c.id);
        const isOpen = open === c.id;
        return (
          <div key={c.id} className="glass rounded-2xl overflow-hidden">
            <button onClick={() => setOpen(isOpen ? null : c.id)} className="w-full flex items-center gap-3 p-4 text-left">
              <span className={`icon-tile ${c.tone} w-10 h-10 shrink-0`}><Icon className="w-5 h-5" /></span>
              <div className="min-w-0">
                <div className="font-display font-bold truncate">{c.name}</div>
                <div className="text-xs text-muted-foreground truncate">/hosting/{c.slug} · {list.length} plans · {c.kind}</div>
              </div>
              <span className={`ml-auto text-xs px-2 py-1 rounded-full ${c.is_active ? "bg-secondary text-mint" : "bg-secondary text-muted-foreground"}`}>
                {c.is_active ? "live" : "hidden"}
              </span>
              <ChevronDown className={`w-4 h-4 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
              <div className="p-4 pt-0 space-y-5">
                <CategoryForm category={c} onSave={saveCategory} onDelete={() => deleteCategory(c.id)} />
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium flex items-center gap-2"><Layers className="w-4 h-4 text-primary" /> Plans</h4>
                    <button
                      onClick={() => savePlan({ category_id: c.id, name: "New Plan", sort_order: (list.length + 1) * 10, price: 0 } as any)}
                      className="glass px-3 py-2 rounded-xl text-xs inline-flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add plan
                    </button>
                  </div>
                  {list.map((p) => <PlanForm key={p.id} plan={p} onSave={savePlan} onDelete={() => deletePlan(p.id)} />)}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function CategoryForm({ category, onSave, onDelete }: { category: Category; onSave: (c: any) => void; onDelete: () => void }) {
  const [f, setF] = useState<Category>(category);
  const set = (k: keyof Category) => (e: any) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="grid sm:grid-cols-2 gap-3 border-t border-border/60 pt-4">
      <Field label="Name"><TextInput value={f.name} onChange={set("name")} /></Field>
      <Field label="Slug (URL)"><TextInput value={f.slug} onChange={set("slug")} /></Field>
      <Field label="Kind"><Select options={KINDS} value={f.kind} onChange={set("kind")} /></Field>
      <Field label="Rate label"><TextInput value={f.rate_label ?? ""} onChange={set("rate_label")} /></Field>
      <Field label="Icon"><IconSelect value={f.icon} onChange={set("icon")} /></Field>
      <Field label="Accent tone"><ToneSelect value={f.tone} onChange={set("tone")} /></Field>
      <Field label="Tagline"><TextInput value={f.tagline ?? ""} onChange={set("tagline")} /></Field>
      <Field label="Card image URL"><TextInput value={f.image_url ?? ""} onChange={set("image_url")} /></Field>
      <div className="sm:col-span-2"><Field label="Description"><TextArea value={f.description ?? ""} onChange={set("description")} /></Field></div>
      <Field label="Sort order"><TextInput type="number" value={f.sort_order} onChange={(e) => setF({ ...f, sort_order: Number(e.target.value) })} /></Field>
      <div className="flex items-end"><div className="w-full"><Toggle label="Visible on site" value={f.is_active} onChange={(v) => setF({ ...f, is_active: v })} /></div></div>
      <div className="sm:col-span-2 flex gap-2">
        <button onClick={() => onSave(f)} className="grad-btn text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
          <Save className="w-4 h-4" /> Save category
        </button>
        <button onClick={onDelete} className="glass px-4 py-2.5 rounded-xl text-sm text-destructive inline-flex items-center gap-2">
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
}

function PlanForm({ plan, onSave, onDelete }: { plan: DbPlan; onSave: (p: any) => void; onDelete: () => void }) {
  const [f, setF] = useState<DbPlan>(plan);
  const set = (k: keyof DbPlan) => (e: any) => setF({ ...f, [k]: e.target.value });

  return (
    <div className="bg-secondary/40 rounded-2xl p-4 grid sm:grid-cols-3 gap-3">
      <Field label="Plan name"><TextInput value={f.name} onChange={set("name")} /></Field>
      <Field label="Icon"><IconSelect value={f.icon} onChange={set("icon")} /></Field>
      <Field label="Price (INR/mo)"><TextInput type="number" value={f.price} onChange={(e) => setF({ ...f, price: Number(e.target.value) })} /></Field>
      <Field label="RAM"><TextInput value={f.ram ?? ""} onChange={set("ram")} /></Field>
      <Field label="CPU"><TextInput value={f.cpu ?? ""} onChange={set("cpu")} /></Field>
      <Field label="Storage"><TextInput value={f.storage ?? ""} onChange={set("storage")} /></Field>
      <Field label="Bandwidth"><TextInput value={f.bandwidth ?? ""} onChange={set("bandwidth")} /></Field>
      <Field label="Billing cycle"><Select options={["monthly", "yearly"]} value={f.billing_cycle} onChange={set("billing_cycle")} /></Field>
      <Field label="Sort order"><TextInput type="number" value={f.sort_order} onChange={(e) => setF({ ...f, sort_order: Number(e.target.value) })} /></Field>
      <div className="sm:col-span-3">
        <Field label="Features (one per line)">
          <TextArea
            value={(f.features ?? []).join("\n")}
            onChange={(e) => setF({ ...f, features: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })}
          />
        </Field>
      </div>
      <Toggle label="Popular" value={f.is_popular} onChange={(v) => setF({ ...f, is_popular: v })} />
      <Toggle label="Active" value={f.is_active} onChange={(v) => setF({ ...f, is_active: v })} />
      <div className="flex gap-2 items-end">
        <button onClick={() => onSave(f)} className="grad-btn text-primary-foreground px-4 py-2.5 rounded-xl text-sm font-medium inline-flex items-center gap-2">
          <Save className="w-4 h-4" /> Save
        </button>
        <button onClick={onDelete} className="glass px-3 py-2.5 rounded-xl text-sm text-destructive" aria-label="Delete plan">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
