// Daily cron: process auto-renewals and send 7/3/1-day expiry reminders.
import { createClient } from "npm:@supabase/supabase-js@2.45.0";
import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const DAY = 86_400_000;

async function sendEmail(templateName: string, recipientEmail: string, idempotencyKey: string, templateData: Record<string, unknown>) {
  try {
    const { error } = await supabase.functions.invoke("send-transactional-email", {
      body: { templateName, recipientEmail, idempotencyKey, templateData },
    });
    if (error) console.warn(`email ${templateName} -> ${recipientEmail} failed:`, error.message);
  } catch (e) {
    console.warn(`email ${templateName} skipped (infra not ready):`, (e as Error).message);
  }
}

async function getEmail(userId: string): Promise<string | null> {
  const { data } = await supabase.auth.admin.getUserById(userId);
  return data.user?.email ?? null;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const now = new Date();
  const results = { reminders: 0, renewed: 0, failed: 0, expired: 0 };

  // 1) Auto-renew services expiring within 24h
  const renewBefore = new Date(now.getTime() + DAY).toISOString();
  const { data: autoSvcs } = await supabase
    .from("services").select("*")
    .eq("status", "active").eq("auto_renew", true)
    .lte("expires_at", renewBefore);

  for (const svc of autoSvcs ?? []) {
    const months = svc.auto_renew_cycle_months || 1;
    const total = Number(svc.price) * months;
    const { data: profile } = await supabase.from("profiles").select("balance").eq("user_id", svc.user_id).single();
    const balance = Number(profile?.balance ?? 0);
    const email = await getEmail(svc.user_id);

    if (balance >= total) {
      const baseExp = new Date(svc.expires_at ?? now);
      const newExp = new Date(Math.max(baseExp.getTime(), now.getTime()));
      newExp.setMonth(newExp.getMonth() + months);

      await supabase.from("profiles").update({ balance: balance - total }).eq("user_id", svc.user_id);
      const { data: inv } = await supabase.from("invoices").insert({
        user_id: svc.user_id, service_id: svc.id,
        amount: total, discount: 0, total, status: "paid",
        items: [{ name: `Auto-renew ${svc.plan_name}`, type: svc.plan_type, price: svc.price, qty: months }],
        due_date: now.toISOString(), paid_at: now.toISOString(),
      }).select().single();
      await supabase.from("transactions").insert({
        user_id: svc.user_id, amount: -total, type: "charge", invoice_id: inv?.id,
        description: `Auto-renew ${svc.plan_name} (${months}mo)`,
      });
      await supabase.from("services").update({
        expires_at: newExp.toISOString(),
        last_auto_renew_at: now.toISOString(),
        last_auto_renew_status: "success",
        reminder_7d_sent_at: null, reminder_3d_sent_at: null, reminder_1d_sent_at: null,
      }).eq("id", svc.id);
      results.renewed++;
      if (email) await sendEmail("renewal-success", email, `renew-ok-${svc.id}-${newExp.toISOString().slice(0,10)}`, {
        planName: svc.plan_name, months, total, newExpiresAt: newExp.toISOString(),
      });
    } else {
      await supabase.from("services").update({
        last_auto_renew_at: now.toISOString(),
        last_auto_renew_status: `insufficient_balance:${balance}/${total}`,
      }).eq("id", svc.id);
      results.failed++;
      if (email) await sendEmail("renewal-failed", email, `renew-fail-${svc.id}-${now.toISOString().slice(0,10)}`, {
        planName: svc.plan_name, total, balance,
      });
    }
  }

  // 2) Reminders for non-auto-renew (or auto-renew that failed) at 7/3/1 days
  const stages = [
    { days: 7, col: "reminder_7d_sent_at" },
    { days: 3, col: "reminder_3d_sent_at" },
    { days: 1, col: "reminder_1d_sent_at" },
  ] as const;

  for (const stage of stages) {
    const winStart = new Date(now.getTime() + (stage.days - 1) * DAY).toISOString();
    const winEnd = new Date(now.getTime() + stage.days * DAY).toISOString();
    const { data: svcs } = await supabase
      .from("services").select("*")
      .eq("status", "active")
      .gte("expires_at", winStart).lte("expires_at", winEnd)
      .is(stage.col, null);

    for (const svc of svcs ?? []) {
      const email = await getEmail(svc.user_id);
      if (email) {
        await sendEmail("expiry-reminder", email, `remind-${stage.days}d-${svc.id}`, {
          planName: svc.plan_name, daysLeft: stage.days, expiresAt: svc.expires_at,
          autoRenew: svc.auto_renew, price: svc.price,
        });
      }
      await supabase.from("services").update({ [stage.col]: now.toISOString() }).eq("id", svc.id);
      results.reminders++;
    }
  }

  // 3) Mark expired
  const { data: expired } = await supabase
    .from("services").update({ status: "expired" })
    .eq("status", "active").lt("expires_at", now.toISOString()).select("id");
  results.expired = expired?.length ?? 0;

  return new Response(JSON.stringify({ ok: true, ranAt: now.toISOString(), ...results }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
