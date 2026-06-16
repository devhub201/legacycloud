import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';
import { createClient } from 'npm:@supabase/supabase-js@2';
import { panelCfg, ensureUser, pickAllocation, createServer } from '../_shared/ptero.ts';

// Parse "2GB" / "100%" / "20GB SSD"
function toMb(s: string) {
  const m = String(s || '').match(/([\d.]+)\s*(g|m)/i);
  if (!m) return 1024;
  const v = parseFloat(m[1]);
  return Math.round(m[2].toLowerCase() === 'g' ? v * 1024 : v);
}
function toPct(s: string) {
  const m = String(s || '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : 100;
}

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

    const { service_ids } = await req.json().catch(() => ({ service_ids: [] }));
    if (!Array.isArray(service_ids) || !service_ids.length) {
      return new Response(JSON.stringify({ error: 'service_ids required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { data: services } = await admin.from('services').select('*').in('id', service_ids).eq('user_id', user.id);
    if (!services?.length) return new Response(JSON.stringify({ error: 'no services' }), { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    const cfg = panelCfg('paid');
    const { data: profile } = await admin.from('profiles').select('display_name').eq('user_id', user.id).maybeSingle();
    const displayName = profile?.display_name || user.email!.split('@')[0];
    const { user: pUser, password } = await ensureUser(cfg, user.email!, displayName);

    const results: any[] = [];
    for (const svc of services) {
      if (svc.panel_server_id) { results.push({ id: svc.id, skipped: true }); continue; }
      if (svc.plan_type !== 'mc') { results.push({ id: svc.id, skipped: 'non-mc' }); continue; }
      try {
        const allocId = await pickAllocation(cfg, cfg.locId);
        const srv = await createServer(cfg, {
          name: `${svc.plan_name}-${svc.id.slice(0, 6)}`.slice(0, 30),
          userId: pUser.id, eggId: cfg.eggId, allocationId: allocId,
          memoryMb: toMb(svc.ram), diskMb: toMb(svc.storage), cpuPct: toPct(svc.cpu),
        });
        await admin.from('services').update({
          panel_type: 'paid',
          panel_url: cfg.url,
          panel_server_id: srv.id,
          panel_server_identifier: srv.identifier,
          panel_user_id: pUser.id,
          panel_username: pUser.username,
          panel_password: password ?? svc.panel_password,
          provisioned_at: new Date().toISOString(),
          status: 'active',
        }).eq('id', svc.id);
        results.push({ id: svc.id, ok: true });
      } catch (e) {
        console.error('provision fail', svc.id, e);
        results.push({ id: svc.id, error: (e as Error).message });
      }
    }
    return new Response(JSON.stringify({ ok: true, results, panel_url: cfg.url, username: pUser.username, password }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('provision-paid-server error', e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
