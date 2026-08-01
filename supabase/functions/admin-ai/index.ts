import { createLovableAiGatewayProvider } from "../_shared/ai-gateway.ts";
import { streamText, convertToModelMessages, type UIMessage } from "npm:ai@5";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM = `You are "Blossom", the AI operations assistant inside the Legacy Cloud admin panel.
Legacy Cloud is an Indian Minecraft + VPS hosting brand (cherry-blossom theme).
Pricing: Minecraft Budget ₹15/GB, Minecraft Premium ₹20/GB, VPS Budget ₹40/GB, VPS Premium ₹65/GB.
Regions: Mumbai, Singapore, Frankfurt, New York. Support & sales happen on Discord.
Help the admin with: diagnosing lag/TPS issues, node capacity planning, refund & billing policy wording,
ticket reply drafts, plan upgrade advice, incident status messages, and marketing copy.
Be concise and practical. Use short markdown bullets. Amounts in ₹ unless asked otherwise.`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const key = Deno.env.get("LOVABLE_API_KEY");
    if (!key) {
      return new Response(JSON.stringify({ error: "AI is not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages, context } = (await req.json()) as { messages: UIMessage[]; context?: string };
    const gateway = createLovableAiGatewayProvider(key);

    const result = streamText({
      model: gateway("google/gemini-3.6-flash"),
      system: context ? `${SYSTEM}\n\nLive panel snapshot:\n${context}` : SYSTEM,
      messages: convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse({ headers: corsHeaders });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
