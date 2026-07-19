
# Legacy Panel — Custom Minecraft Hosting Panel

Pterodactyl-jaisa (but modern) panel. Sab kuch tere VPS pe chalega. Lovable Cloud use **nahi** karenge — poora stack tera hai.

## Architecture

```text
┌─────────────────────────────────────────────────────────┐
│  Tera VPS (Ubuntu 24 · 64GB RAM · 12 vCPU)              │
│                                                         │
│  ┌──────────────┐   ┌──────────────┐   ┌────────────┐   │
│  │  Panel (UI)  │──▶│  API + DB    │──▶│  Daemon    │   │
│  │  React+Vite  │   │ Node+Postgres│   │  Node+Dckr │   │
│  │  :80/:443    │   │  :3000       │   │  :8080/wss │   │
│  └──────────────┘   └──────────────┘   └─────┬──────┘   │
│                                              │          │
│                                    ┌─────────▼────────┐ │
│                                    │  Docker engine   │ │
│                                    │  MC containers   │ │
│                                    │  (Paper/Forge/…) │ │
│                                    └──────────────────┘ │
│                                                         │
│  Nginx reverse-proxy → Cloudflare DNS → panel.tld       │
└─────────────────────────────────────────────────────────┘
```

**Tech stack**
- Frontend: React 18 + Vite + Tailwind + shadcn (Midnight Indigo theme reuse)
- API: Node 20 + Express + Prisma + PostgreSQL 16 + JWT auth
- Daemon: Node 20 + Dockerode + `node-pty` for console + `ws` for WebSocket
- Deployment: single `docker-compose.yml` — panel, api, daemon, postgres, nginx, certbot

## Repo layout (monorepo in this project)

```text
/
├── src/                    # Panel frontend (React) — runs in Lovable preview
├── server/
│   ├── api/                # Express API + Prisma
│   │   ├── src/
│   │   ├── prisma/schema.prisma
│   │   └── Dockerfile
│   └── daemon/             # Docker/console manager
│       ├── src/
│       └── Dockerfile
├── docker-compose.yml      # One-command deploy
├── nginx/legacy.conf
├── deploy.sh               # SSH + install script for VPS
└── DEPLOY.md               # Step-by-step guide
```

## Phase 1 — Foundation (this turn)

1. **Cleanup** — `public/site/` (old template) delete, old React homepage strip
2. **Panel scaffold** — login, register, dashboard (server list), server detail shell with tabs (Console / Files / Settings / Users)
3. **API scaffold** — Express + Prisma schema (users, nodes, servers, allocations, sessions), JWT auth (`/auth/register`, `/auth/login`, `/me`), CRUD `/servers`
4. **Daemon scaffold** — Dockerode wrapper: `create/start/stop/restart/kill`, WebSocket console stream, resource stats
5. **Docker Compose** — 4 services + persistent volumes
6. **`DEPLOY.md`** — exact commands: git clone → docker compose up -d → nginx → certbot → Cloudflare A record

## Phase 2 — Server management (next turn)

- Egg system (Paper, Purpur, Fabric, Forge, Vanilla, BungeeCord)
- Server create wizard (RAM/CPU/disk sliders, auto allocation)
- Live console with xterm.js + command input
- Start/stop/restart/kill buttons with real state polling
- Real-time stats (CPU %, RAM MB, network I/O, players online)
- Auto-install Minecraft jar from egg on first boot

## Phase 3 — Files + users

- File manager (browse, edit, upload, download, rename, chmod)
- Monaco editor for configs (server.properties, ops.json)
- SFTP subusers with per-server permissions
- Backup/restore (tar.gz snapshots)

## Phase 4 — Admin + nodes + billing

- Admin dashboard: users, servers, nodes overview
- Multi-node support (add more VPS as daemons)
- Location + allocation manager
- Plans + subscriptions (Razorpay/PhonePe)
- Suspension/unsuspend logic on payment status

## Phase 5 — Next-level features

- Modpack installer (CurseForge/Modrinth API)
- Automated backups (cron + S3/R2 offsite)
- Player analytics (join/leave/playtime graphs)
- Discord bot integration (server status commands)
- Two-factor auth (TOTP)
- Audit log for every action
- Scheduled tasks (restart daily at X, run command Y)

## Technical details (for reference)

**Database schema (Phase 1)**

```text
users(id, email, username, password_hash, role, created_at)
nodes(id, name, fqdn, daemon_secret, memory_mb, disk_mb, created_at)
allocations(id, node_id, ip, port, assigned_server_id)
servers(id, owner_id, node_id, name, egg, memory_mb, cpu_pct, disk_mb,
        container_id, status, allocation_id, created_at)
sessions(id, user_id, jwt_id, expires_at)
audit_logs(id, user_id, action, target, metadata, created_at)
```

**Daemon security**
- Daemon ↔ API auth: shared HMAC secret
- Daemon binds to `127.0.0.1` only; nginx proxies WSS from panel
- Each MC server runs as non-root user inside container with read-only rootfs

**Deploy flow (what tu VPS pe chalayega)**

```bash
ssh root@tera-vps
git clone <this-repo> /opt/legacy-panel
cd /opt/legacy-panel
cp .env.example .env         # edit domain, JWT_SECRET, DB pass
docker compose up -d
docker compose exec api npx prisma migrate deploy
docker compose exec api node scripts/create-admin.js
# Cloudflare: A record panel.tld → VPS IP (proxy off for certbot)
docker compose run --rm certbot
```

## What I'll do right now

- Delete `public/site/*` (~200 files) and old assets
- Reset `src/` to panel-only routes: `/login`, `/register`, `/dashboard`, `/server/:id`, `/admin`
- Create `server/api/` with Express + Prisma schema + auth routes
- Create `server/daemon/` with Dockerode skeleton + WebSocket
- Write `docker-compose.yml`, `nginx/legacy.conf`, `DEPLOY.md`
- Panel UI: login screen + empty dashboard (rest fills in Phase 2)

**Important:** Lovable preview me sirf frontend chalega (API/daemon local nahi chal sakte). Real testing tere VPS pe hi hoga after Phase 1 deploy.

Approve karega toh Phase 1 shuru karta hu.
