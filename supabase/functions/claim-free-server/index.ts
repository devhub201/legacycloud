import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { panelCfg, ensureUser, pickAllocation, createServer } from '../_shared/ptero.ts';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
  const ip = req.headers.get('x-forwarded-for') ?? null;
  const ua = req.headers.get('user-agent') ?? null;

  const log = (user_id: string | null, user_email: string | null, action: string, level: string, details: Record<string, unknown> = {}) =>
    admin.from('activity_logs').insert({ user_id, user_email, action, level, ip, user_agent: ua, details, target: 'free-panel' }).then(() => {});

  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    const sb = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: { user } } = await sb.auth.getUser();
    if (!user) {
      await log(null, null, 'free_claim.unauthorized', 'warn');
      return json({ error: 'Please sign in to claim your free server.' }, 401);
    }

    // 1. Settings & eligibility
    const { data: settings } = await admin.from('free_panel_settings').select('*').eq('id', 1).maybeSingle();
    const s = settings ?? { enabled: true, daily_quota: 50, per_user_limit: 1, min_account_age_hours: 0, expiry_days: 45 };

    if (!s.enabled) {
      await log(user.id, user.email!, 'free_claim.disabled', 'warn');
      return json({ error: 'Free server claims are currently disabled. Please check back later.' }, 403);
    }

    // Account age
    if (s.min_account_age_hours > 0) {
      const createdAt = new Date(user.created_at).getTime();
      const ageHrs = (Date.now() - createdAt) / 3_600_000;
      if (ageHrs < s.min_account_age_hours) {
        await log(user.id, user.email!, 'free_claim.account_too_new', 'warn', { age_hours: ageHrs });
        return json({ error: `Your account must be at least ${s.min_account_age_hours} hours old to claim a free server.` }, 403);
      }
    }

    // Existing active claim?
    const { data: active } = await admin
      .from('free_panel_claims').select('*')
      .eq('user_id', user.id)
      .in('status', ['queued', 'creating', 'active'])
      .maybeSingle();
    if (active) {
      // Treat expired active rows as not blocking
      if (active.status === 'active' && active.expires_at && new Date(active.expires_at) < new Date()) {
        await admin.from('free_panel_claims').update({ status: 'expired' }).eq('id', active.id);
      } else {
        await log(user.id, user.email!, 'free_claim.already_active', 'info', { claim_id: active.id });
        return json({ ok: true, claim: active, alreadyClaimed: true });
      }
    }

    // Per-user lifetime limit
    const { count: userClaimCount } = await admin
      .from('free_panel_claims').select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);
    if ((userClaimCount ?? 0) >= s.per_user_limit) {
      await log(user.id, user.email!, 'free_claim.user_limit', 'warn', { count: userClaimCount });
      return json({ error: `You've reached the limit of ${s.per_user_limit} free server claim(s) per account.` }, 403);
    }

    // Daily global quota
    const since = new Date(Date.now() - 86400_000).toISOString();
    const { count: dayCount } = await admin
      .from('free_panel_claims').select('*', { count: 'exact', head: true })
      .gte('created_at', since);
    if ((dayCount ?? 0) >= s.daily_quota) {
      await log(user.id, user.email!, 'free_claim.daily_quota', 'warn', { count: dayCount, quota: s.daily_quota });
      return json({ error: "Today's free server quota has been claimed. Please try again tomorrow!" }, 429);
    }

    // 2. Insert queued row first so UI can show status if user reloads
    const { data: queued, error: insErr } = await admin
      .from('free_panel_claims')
      .insert({
        user_id: user.id,
        panel_url: Deno.env.get('FREE_PTERO_URL') ?? '',
        ram_mb: 2048, disk_mb: 4096, cpu_pct: 40,
        status: 'creating',
      })
      .select().single();
    if (insErr) throw insErr;

    await log(user.id, user.email!, 'free_claim.started', 'info', { claim_id: queued.id });

    // 3. Provision via Pterodactyl
    try {
      const cfg = panelCfg('free');
      const { data: profile } = await admin.from('profiles').select('display_name').eq('user_id', user.id).maybeSingle();
      const displayName = profile?.display_name || user.email!.split('@')[0];

      const { user: pUser, password } = await ensureUser(cfg, user.email!, displayName);
      const allocId = await pickAllocation(cfg, cfg.locId);
      const server = await createServer(cfg, {
        name: `free-${displayName}`.slice(0, 30),
        userId: pUser.id, eggId: cfg.eggId, allocationId: allocId,
        memoryMb: 2048, diskMb: 4096, cpuPct: 40,
      });

      const expiresAt = new Date(Date.now() + s.expiry_days * 86400 * 1000).toISOString();
      const { data: updated } = await admin.from('free_panel_claims').update({
        panel_url: cfg.url,
        panel_user_id: pUser.id,
        panel_username: pUser.username,
        panel_password: password,
        panel_server_id: server.id,
        panel_server_identifier: server.identifier,
        expires_at: expiresAt,
        status: 'active',
        error_message: null,
      }).eq('id', queued.id).select().single();

      await log(user.id, user.email!, 'free_claim.success', 'info', { claim_id: queued.id, server_id: server.id });
      return json({ ok: true, claim: updated });
    } catch (provErr) {
      const msg = (provErr as Error).message;
      await admin.from('free_panel_claims').update({ status: 'failed', error_message: msg }).eq('id', queued.id);
      await log(user.id, user.email!, 'free_claim.failed', 'error', { claim_id: queued.id, error: msg });
      return json({ error: `Server provisioning failed: ${msg}. Our team has been notified.` }, 500);
    }
  } catch (e) {
    console.error('claim-free-server error', e);
    await log(null, null, 'free_claim.error', 'error', { error: (e as Error).message });
    return json({ error: 'Something went wrong. Please try again or contact support.' }, 500);
  }
});
