import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type Category = {
  id: string;
  slug: string;
  name: string;
  kind: string;
  tagline: string | null;
  description: string | null;
  icon: string;
  tone: string;
  image_url: string | null;
  rate_label: string | null;
  sort_order: number;
  is_active: boolean;
};

export type DbPlan = {
  id: string;
  category_id: string;
  name: string;
  icon: string;
  ram: string | null;
  cpu: string | null;
  storage: string | null;
  bandwidth: string | null;
  price: number;
  currency: string;
  billing_cycle: string;
  features: string[];
  is_popular: boolean;
  sort_order: number;
  is_active: boolean;
};

function normalizePlan(p: any): DbPlan {
  return { ...p, price: Number(p.price), features: Array.isArray(p.features) ? p.features : [] };
}

export function useCategories(includeHidden = false) {
  return useQuery({
    queryKey: ["catalog", "categories", includeHidden],
    queryFn: async () => {
      let q = supabase.from("product_categories").select("*").order("sort_order");
      if (!includeHidden) q = q.eq("is_active", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []) as Category[];
    },
  });
}

export function usePlans(includeHidden = false) {
  return useQuery({
    queryKey: ["catalog", "plans", includeHidden],
    queryFn: async () => {
      let q = supabase.from("product_plans").select("*").order("sort_order");
      if (!includeHidden) q = q.eq("is_active", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []).map(normalizePlan);
    },
  });
}

export function usePageSections(page = "home", includeHidden = false) {
  return useQuery({
    queryKey: ["page-sections", page, includeHidden],
    queryFn: async () => {
      let q = supabase.from("page_sections").select("*").eq("page", page).order("sort_order");
      if (!includeHidden) q = q.eq("is_visible", true);
      const { data, error } = await q;
      if (error) throw error;
      return (data ?? []).map((s: any) => ({ ...s, items: Array.isArray(s.items) ? s.items : [] }));
    },
  });
}

export type Section = {
  id: string;
  page: string;
  type: string;
  eyebrow: string | null;
  heading: string | null;
  subheading: string | null;
  body: string | null;
  image_url: string | null;
  cta_label: string | null;
  cta_href: string | null;
  items: any[];
  sort_order: number;
  is_visible: boolean;
};
