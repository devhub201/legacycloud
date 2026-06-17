// Pterodactyl helper shared by claim-free-server and provision-paid-server
export type Tier = "free" | "paid";

export function panelCfg(tier: Tier) {
  const url = (Deno.env.get(tier === "free" ? "FREE_PTERO_URL" : "PAID_PTERO_URL") || "").replace(/\/$/, "");
  const key = Deno.env.get(tier === "free" ? "FREE_PTERO_API_KEY" : "PAID_PTERO_API_KEY") || "";
  const nestId = Number(Deno.env.get(tier === "free" ? "PTERO_FREE_NEST_ID" : "PTERO_PAID_NEST_ID") || "1");
  const eggId = Number(Deno.env.get(tier === "free" ? "PTERO_FREE_EGG_ID" : "PTERO_PAID_EGG_ID") || "3");
  const locId = Number(Deno.env.get(tier === "free" ? "PTERO_FREE_LOCATION_ID" : "PTERO_PAID_LOCATION_ID") || "1");
  if (!url || !key) throw new Error(`Missing panel config for ${tier}`);
  return { url, key, nestId, eggId, locId };
}

async function api(cfg: { url: string; key: string }, path: string, init: RequestInit = {}) {
  const res = await fetch(`${cfg.url}/api/application${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${cfg.key}`,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* not json */ }
  if (!res.ok) {
    const msg = json?.errors?.[0]?.detail || json?.errors?.[0]?.code || text || res.statusText;
    throw new Error(`Ptero ${res.status}: ${msg}`);
  }
  return json;
}

export async function findUserByEmail(cfg: any, email: string) {
  const j = await api(cfg, `/users?filter[email]=${encodeURIComponent(email)}`);
  return j?.data?.[0]?.attributes ?? null;
}

export async function createUser(cfg: any, opts: { email: string; username: string; first: string; last: string; password: string }) {
  const j = await api(cfg, "/users", {
    method: "POST",
    body: JSON.stringify({
      email: opts.email,
      username: opts.username,
      first_name: opts.first,
      last_name: opts.last,
      password: opts.password,
    }),
  });
  return j.attributes;
}

export async function ensureUser(cfg: any, email: string, displayName: string) {
  const existing = await findUserByEmail(cfg, email);
  if (existing) return { user: existing, password: null as string | null };
  const username = (displayName || email.split("@")[0])
    .toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 16) || `u${Date.now().toString(36)}`;
  const password = crypto.randomUUID().replace(/-/g, "").slice(0, 14) + "A1!";
  const [first, ...rest] = (displayName || "User").split(" ");
  const user = await createUser(cfg, { email, username, first, last: rest.join(" ") || "Cloud", password });
  return { user, password };
}

// Pick first allocation in location, fallback to any unassigned
export async function pickAllocation(cfg: any, locationId: number) {
  // Fetch all nodes (Ptero doesn't allow location_id filter) and filter client-side.
  const nodes = await api(cfg, `/nodes?per_page=100`);
  const nodeList = (nodes.data ?? []).filter(
    (n: any) => !locationId || n.attributes.location_id === locationId,
  );
  if (nodeList.length === 0) throw new Error(`No nodes found in location ${locationId}`);
  for (const n of nodeList) {
    const nid = n.attributes.id;
    const allocs = await api(cfg, `/nodes/${nid}/allocations?per_page=200`);
    const free = (allocs.data ?? []).find((a: any) => !a.attributes.assigned);
    if (free) return free.attributes.id as number;
  }
  throw new Error("No free allocations in location " + locationId);
}

export async function createServer(cfg: any, opts: {
  name: string; userId: number; eggId: number; allocationId: number;
  memoryMb: number; diskMb: number; cpuPct: number;
}) {
  // pull egg defaults
  const egg = await api(cfg, `/nests/${cfg.nestId}/eggs/${opts.eggId}?include=variables`);
  const startup = egg.attributes.startup;
  const docker = egg.attributes.docker_image || Object.values(egg.attributes.docker_images || {})[0];
  const env: Record<string, string> = {};
  for (const v of egg.attributes.relationships?.variables?.data ?? []) {
    env[v.attributes.env_variable] = v.attributes.default_value ?? "";
  }
  const j = await api(cfg, "/servers", {
    method: "POST",
    body: JSON.stringify({
      name: opts.name,
      user: opts.userId,
      egg: opts.eggId,
      docker_image: docker,
      startup,
      environment: env,
      limits: { memory: opts.memoryMb, swap: 0, disk: opts.diskMb, io: 500, cpu: opts.cpuPct },
      feature_limits: { databases: 1, allocations: 1, backups: 2 },
      allocation: { default: opts.allocationId },
      start_on_completion: true,
    }),
  });
  return j.attributes;
}
