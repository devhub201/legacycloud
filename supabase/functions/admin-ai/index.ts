import { createClient } from "npm:@supabase/supabase-js@2";
import { createLovableAiGatewayProvider } from "../_shared/ai-gateway.ts";
import { streamText, tool, stepCountIs } from "npm:ai@5";
import { z } from "npm:zod@3";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are "Blossom", the AI site manager inside the Legacy Cloud admin panel.
Legacy Cloud is a full-stack SaaS hosting cloud (game servers, VPS/cloud, web hosting + domains, managed SaaS apps).
Brand theme: Azure Deep — dark navy background with light/medium blue accents. Prices in ₹ (INR) per month.

You can actually EDIT the live website with your tools:
- list_site: read categories, plans, sections and settings
- upsert_category / delete_category: manage product categories
- upsert_plan / delete_plan: manage plans inside a category
- upsert_section / delete_section: manage page sections (hero, stats, features, categories, plans, cta, text)
- update_setting: theme colors (HSL strings like "217 100% 59%"), brand, appearance (backgroundImage, backgroundOpacity, particles)

Rules: read before you write when unsure; use existing ids for edits; keep copy short and professional;
tell the admin exactly what you changed. Never delete many things without being asked.
Icons must be lucide names such as Server, Cpu, Globe, Sparkles, Zap, ShieldCheck, Gauge, Headphones, Bot, HardDrive, Cloud, Database, Rocket.
Tones: "", tone-cyan, tone-violet, tone-mint, tone-amber.`;

type Msg = { role: "user" | "assistant"; content: string };

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) {
      return new Response(JSON.stringify({ error: "AI is not configured" }), {
        status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const authHeader = req.headers.get("Authorization") ?? "";
    const url = Deno.env.get("SUPABASE_URL")!;
    const anon = Deno.env.get("SUPABASE_ANON_KEY")!;
    const service = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    // Verify the caller is an admin
    const userClient = createClient(url, anon, { global: { headers: { Authorization: authHeader } } });
    const { data: userData } = await userClient.auth.getUser();
    const user = userData?.user;
    if (!user) {
      return new Response(JSON.stringify({ error: "Sign in required" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const admin = createClient(url, service);
    const { data: roles } = await admin.from("user_roles").select("role").eq("user_id", user.id).eq("role", "admin");
    if (!roles || roles.length === 0) {
      return new Response(JSON.stringify({ error: "Admin only" }), {
        status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, context } = (await req.json()) as { messages: Msg[]; context?: string };
    const gateway = createLovableAiGatewayProvider(key);

    const ok = (v: unknown) => JSON.stringify(v).slice(0, 6000);

    const tools = {
      list_site: tool({
        description: "Read the current catalog, page sections and site settings.",
        inputSchema: z.object({ what: z.enum(["all", "categories", "plans", "sections", "settings"]) }),
        execute: async ({ what }) => {
          const out: Record<string, unknown> = {};
          if (what === "all" || what === "categories") out.categories = (await admin.from("product_categories").select("*").order("sort_order")).data;
          if (what === "all" || what === "plans") out.plans = (await admin.from("product_plans").select("*").order("sort_order")).data;
          if (what === "all" || what === "sections") out.sections = (await admin.from("page_sections").select("*").order("sort_order")).data;
          if (what === "all" || what === "settings") out.settings = (await admin.from("site_settings").select("*")).data;
          return ok(out);
        },
      }),
      upsert_category: tool({
        description: "Create or update a product category.",
        inputSchema: z.object({
          id: z.string().nullable(), slug: z.string().nullable(), name: z.string().nullable(),
          kind: z.string().nullable(), tagline: z.string().nullable(), description: z.string().nullable(),
          icon: z.string().nullable(), tone: z.string().nullable(), image_url: z.string().nullable(),
          rate_label: z.string().nullable(), sort_order: z.number().nullable(), is_active: z.boolean().nullable(),
        }),
        execute: async (input) => {
          const row: Record<string, unknown> = {};
          Object.entries(input).forEach(([k, v]) => { if (v !== null && k !== "id") row[k] = v; });
          const res = input.id
            ? await admin.from("product_categories").update(row).eq("id", input.id).select().single()
            : await admin.from("product_categories").insert(row).select().single();
          return ok(res.error ? { error: res.error.message } : res.data);
        },
      }),
      delete_category: tool({
        description: "Delete a category and its plans.",
        inputSchema: z.object({ id: z.string() }),
        execute: async ({ id }) => ok(await admin.from("product_categories").delete().eq("id", id)),
      }),
      upsert_plan: tool({
        description: "Create or update a plan inside a category.",
        inputSchema: z.object({
          id: z.string().nullable(), category_id: z.string().nullable(), name: z.string().nullable(),
          icon: z.string().nullable(), ram: z.string().nullable(), cpu: z.string().nullable(),
          storage: z.string().nullable(), bandwidth: z.string().nullable(), price: z.number().nullable(),
          billing_cycle: z.string().nullable(), features: z.array(z.string()).nullable(),
          is_popular: z.boolean().nullable(), sort_order: z.number().nullable(), is_active: z.boolean().nullable(),
        }),
        execute: async (input) => {
          const row: Record<string, unknown> = {};
          Object.entries(input).forEach(([k, v]) => { if (v !== null && k !== "id") row[k] = v; });
          const res = input.id
            ? await admin.from("product_plans").update(row).eq("id", input.id).select().single()
            : await admin.from("product_plans").insert(row).select().single();
          return ok(res.error ? { error: res.error.message } : res.data);
        },
      }),
      delete_plan: tool({
        description: "Delete a plan.",
        inputSchema: z.object({ id: z.string() }),
        execute: async ({ id }) => ok(await admin.from("product_plans").delete().eq("id", id)),
      }),
      upsert_section: tool({
        description: "Create or update a page section (hero, stats, features, categories, plans, cta, text).",
        inputSchema: z.object({
          id: z.string().nullable(), page: z.string().nullable(), type: z.string().nullable(),
          eyebrow: z.string().nullable(), heading: z.string().nullable(), subheading: z.string().nullable(),
          body: z.string().nullable(), image_url: z.string().nullable(), cta_label: z.string().nullable(),
          cta_href: z.string().nullable(), items_json: z.string().nullable(),
          sort_order: z.number().nullable(), is_visible: z.boolean().nullable(),
        }),
        execute: async (input) => {
          const row: Record<string, unknown> = {};
          Object.entries(input).forEach(([k, v]) => { if (v !== null && k !== "id" && k !== "items_json") row[k] = v; });
          if (input.items_json) {
            try { row.items = JSON.parse(input.items_json); } catch { return ok({ error: "items_json is not valid JSON" }); }
          }
          const res = input.id
            ? await admin.from("page_sections").update(row).eq("id", input.id).select().single()
            : await admin.from("page_sections").insert(row).select().single();
          return ok(res.error ? { error: res.error.message } : res.data);
        },
      }),
      delete_section: tool({
        description: "Delete a page section.",
        inputSchema: z.object({ id: z.string() }),
        execute: async ({ id }) => ok(await admin.from("page_sections").delete().eq("id", id)),
      }),
      update_setting: tool({
        description: "Update a site setting: key is theme | brand | appearance. value_json is a JSON object which is merged into the existing value.",
        inputSchema: z.object({ key: z.string(), value_json: z.string() }),
        execute: async ({ key, value_json }) => {
          let value: Record<string, unknown>;
          try { value = JSON.parse(value_json); } catch { return ok({ error: "value_json is not valid JSON" }); }
          const current = (await admin.from("site_settings").select("value").eq("key", key).maybeSingle()).data?.value ?? {};
          const merged = { ...(current as Record<string, unknown>), ...value };
          const res = await admin.from("site_settings").upsert({ key, value: merged, updated_at: new Date().toISOString() }).select().single();
          return ok(res.error ? { error: res.error.message } : res.data);
        },
      }),
    };

    const result = streamText({
      model: gateway("google/gemini-3.6-flash"),
      system: context ? `${SYSTEM}\n\nLive panel snapshot:\n${context}` : SYSTEM,
      messages: (messages ?? []).slice(-16),
      tools,
      stopWhen: stepCountIs(12),
    });

    return result.toTextStreamResponse({ headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
