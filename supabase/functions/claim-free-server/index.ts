import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { panelCfg, ensureUser, pickAllocation, createServer } from '../_shared/ptero.ts';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
  try {
    const authHeader = req.headers.get('Authorization') ?? '';
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return new Response(JSON.stringify({ error: 'unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

    // already claimed?
    const { data: existing } = await admin.from('free_panel_claims').select('*').eq('user_id', user.id).maybeSingle();
    if (existing && new Date(existing.expires_at) > new Date()) {
      return new Response(JSON.stringify({ ok: true, claim: existing, alreadyClaimed: true }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

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

    const expiresAt = new Date(Date.now() + 45 * 86400 * 1000).toISOString(); // 1.5 month
    const row = {
      user_id: user.id,
      panel_url: cfg.url,
      panel_user_id: pUser.id,
      panel_username: pUser.username,
      panel_password: password,
      panel_server_id: server.id,
      panel_server_identifier: server.identifier,
      ram_mb: 2048, disk_mb: 4096, cpu_pct: 40,
      expires_at: expiresAt,
    };
    await admin.from('free_panel_claims').upsert(row, { onConflict: 'user_id' });

    return new Response(JSON.stringify({ ok: true, claim: row }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('claim-free-server error', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
