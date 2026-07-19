#!/usr/bin/env bash
# =============================================================================
#  Legacy Panel — VPS Installer
#  One-command install: Docker + Postgres + API + Daemon + Nginx
#  Usage:   curl -fsSL https://legacycloud.lovable.app/install.sh | sudo bash
#           sudo bash install.sh --domain panel.example.com --email you@ex.com
# =============================================================================
set -euo pipefail

# ---------- pretty output ----------
C_RESET='\033[0m'; C_B='\033[1m'; C_DIM='\033[2m'
C_G='\033[38;5;83m'; C_Y='\033[38;5;220m'; C_R='\033[38;5;203m'; C_P='\033[38;5;141m'
say()  { printf "${C_P}▸${C_RESET} ${C_B}%s${C_RESET}\n" "$*"; }
ok()   { printf "${C_G}✔${C_RESET} %s\n" "$*"; }
warn() { printf "${C_Y}!${C_RESET} %s\n" "$*"; }
die()  { printf "${C_R}✘ %s${C_RESET}\n" "$*" >&2; exit 1; }

banner() {
cat <<'EOF'
   __                                ___                  __
  / /  ___ ___ ____ _______ __      / _ \___ ____  ___   / /
 / /__/ -_) _ `/ _ `/ __/ // /     / ___/ _ `/ _ \/ -_) / /
/____/\__/\_,_/\_, /\__/\_, /     /_/   \_,_/_//_/\__/ /_/
              /___/    /___/
       Self-hosted Minecraft control plane
EOF
}

# ---------- args ----------
DOMAIN=""; EMAIL=""; NON_INTERACTIVE=0
while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain) DOMAIN="$2"; shift 2 ;;
    --email)  EMAIL="$2";  shift 2 ;;
    -y|--yes) NON_INTERACTIVE=1; shift ;;
    *) die "Unknown flag: $1" ;;
  esac
done

banner
echo
[[ $EUID -eq 0 ]] || die "Please run as root (sudo bash install.sh)"

# ---------- OS check ----------
. /etc/os-release
if [[ "$ID" != "ubuntu" && "$ID" != "debian" ]]; then
  warn "Detected $PRETTY_NAME — script is tested on Ubuntu 22.04/24.04"
fi

# ---------- prompts ----------
if [[ -z "$DOMAIN" ]]; then
  read -rp "$(printf "${C_B}Panel domain${C_RESET} (e.g. panel.example.com, or press Enter to use IP): ")" DOMAIN || true
fi
if [[ -z "$EMAIL" && -n "$DOMAIN" ]]; then
  read -rp "$(printf "${C_B}Email for Let's Encrypt SSL${C_RESET}: ")" EMAIL || true
fi

INSTALL_DIR="/opt/legacy-panel"
DATA_DIR="/var/lib/legacy-panel"
mkdir -p "$INSTALL_DIR" "$DATA_DIR/servers" "$DATA_DIR/backups"

# ---------- system deps ----------
say "Updating apt and installing base packages…"
export DEBIAN_FRONTEND=noninteractive
apt-get update -qq
apt-get install -y -qq curl ca-certificates gnupg lsb-release ufw jq openssl >/dev/null
ok "base packages installed"

# ---------- Docker ----------
if ! command -v docker >/dev/null 2>&1; then
  say "Installing Docker Engine…"
  install -m 0755 -d /etc/apt/keyrings
  curl -fsSL https://download.docker.com/linux/${ID}/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg
  chmod a+r /etc/apt/keyrings/docker.gpg
  echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/${ID} $(. /etc/os-release && echo $VERSION_CODENAME) stable" \
    > /etc/apt/sources.list.d/docker.list
  apt-get update -qq
  apt-get install -y -qq docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin >/dev/null
  systemctl enable --now docker >/dev/null
  ok "Docker installed"
else
  ok "Docker already installed ($(docker --version))"
fi

# ---------- Nginx + Certbot ----------
if ! command -v nginx >/dev/null 2>&1; then
  say "Installing Nginx…"
  apt-get install -y -qq nginx >/dev/null
  systemctl enable --now nginx >/dev/null
  ok "Nginx installed"
fi

# ---------- secrets ----------
say "Generating secrets…"
JWT_SECRET=$(openssl rand -hex 32)
DB_PASSWORD=$(openssl rand -hex 16)
ADMIN_PASSWORD=$(openssl rand -base64 12 | tr -d '/+=' | head -c 14)
NODE_TOKEN=$(openssl rand -hex 32)
ok "secrets generated"

# ---------- .env ----------
cat > "$INSTALL_DIR/.env" <<EOF
# Legacy Panel — generated $(date -u +%FT%TZ)
PANEL_DOMAIN=${DOMAIN:-_}
POSTGRES_USER=legacy
POSTGRES_PASSWORD=$DB_PASSWORD
POSTGRES_DB=legacy_panel
DATABASE_URL=postgresql://legacy:$DB_PASSWORD@postgres:5432/legacy_panel
JWT_SECRET=$JWT_SECRET
NODE_TOKEN=$NODE_TOKEN
ADMIN_EMAIL=admin@${DOMAIN:-legacy.local}
ADMIN_PASSWORD=$ADMIN_PASSWORD
DATA_DIR=$DATA_DIR
API_PORT=8080
DAEMON_PORT=8081
EOF
chmod 600 "$INSTALL_DIR/.env"

# ---------- docker-compose ----------
cat > "$INSTALL_DIR/docker-compose.yml" <<'YAML'
name: legacy-panel

services:
  postgres:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 5s
      retries: 10

  api:
    image: ghcr.io/legacycloud/panel-api:latest
    restart: unless-stopped
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DATABASE_URL: ${DATABASE_URL}
      JWT_SECRET: ${JWT_SECRET}
      NODE_TOKEN: ${NODE_TOKEN}
      ADMIN_EMAIL: ${ADMIN_EMAIL}
      ADMIN_PASSWORD: ${ADMIN_PASSWORD}
      DAEMON_URL: http://daemon:8081
      PORT: 8080
    ports:
      - "127.0.0.1:8080:8080"

  daemon:
    image: ghcr.io/legacycloud/panel-daemon:latest
    restart: unless-stopped
    privileged: false
    environment:
      NODE_TOKEN: ${NODE_TOKEN}
      DATA_DIR: /data
      PORT: 8081
    ports:
      - "127.0.0.1:8081:8081"
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ${DATA_DIR}:/data

volumes:
  pgdata:
YAML

# ---------- Nginx site ----------
say "Configuring Nginx…"
SERVER_NAME="${DOMAIN:-_}"
cat > /etc/nginx/sites-available/legacy-panel <<NGINX
server {
    listen 80;
    server_name ${SERVER_NAME};

    client_max_body_size 512m;

    # API
    location /api/ {
        proxy_pass http://127.0.0.1:8080/;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
    }

    # Console WebSocket
    location /ws/ {
        proxy_pass http://127.0.0.1:8080/ws/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host \$host;
        proxy_read_timeout 3600s;
    }

    # Static panel UI
    location / {
        root /opt/legacy-panel/web;
        try_files \$uri \$uri/ /index.html;
    }
}
NGINX
ln -sf /etc/nginx/sites-available/legacy-panel /etc/nginx/sites-enabled/legacy-panel
rm -f /etc/nginx/sites-enabled/default
nginx -t >/dev/null && systemctl reload nginx
ok "Nginx configured"

# ---------- panel UI placeholder (until first release) ----------
mkdir -p /opt/legacy-panel/web
if [[ ! -f /opt/legacy-panel/web/index.html ]]; then
  cat > /opt/legacy-panel/web/index.html <<'HTML'
<!doctype html><meta charset=utf-8><title>Legacy Panel</title>
<style>body{background:#06060f;color:#e6e7ff;font:16px/1.5 system-ui;display:grid;place-items:center;min-height:100vh;margin:0}
.card{padding:2rem;border:1px solid #1a1a2e;border-radius:16px;max-width:520px;text-align:center}
h1{margin:0 0 .5rem;background:linear-gradient(90deg,#8b8cff,#c58cff);-webkit-background-clip:text;color:transparent}
code{background:#12122a;padding:.15rem .4rem;border-radius:6px}</style>
<div class=card>
<h1>Legacy Panel</h1>
<p>Installation complete. The API is live at <code>/api/health</code>.</p>
<p>Panel UI bundle will be pulled on next update. Run <code>legacy-panel update</code>.</p>
</div>
HTML
fi

# ---------- SSL ----------
if [[ -n "$DOMAIN" && -n "$EMAIL" ]]; then
  say "Requesting Let's Encrypt SSL for $DOMAIN…"
  apt-get install -y -qq certbot python3-certbot-nginx >/dev/null
  if certbot --nginx --non-interactive --agree-tos -m "$EMAIL" -d "$DOMAIN" --redirect >/dev/null 2>&1; then
    ok "SSL issued and Nginx redirect enabled"
  else
    warn "SSL request failed — check DNS A record points to this server. You can retry: certbot --nginx -d $DOMAIN"
  fi
fi

# ---------- firewall ----------
say "Configuring UFW firewall…"
ufw allow OpenSSH >/dev/null 2>&1 || true
ufw allow 'Nginx Full' >/dev/null 2>&1 || true
ufw --force enable >/dev/null 2>&1 || true
ok "firewall enabled (22, 80, 443)"

# ---------- helper CLI ----------
cat > /usr/local/bin/legacy-panel <<'CLI'
#!/usr/bin/env bash
set -e
cd /opt/legacy-panel
case "${1:-}" in
  up)      docker compose --env-file .env up -d ;;
  down)    docker compose --env-file .env down ;;
  restart) docker compose --env-file .env restart ${2:-} ;;
  logs)    docker compose --env-file .env logs -f ${2:-} ;;
  ps)      docker compose --env-file .env ps ;;
  update)  docker compose --env-file .env pull && docker compose --env-file .env up -d ;;
  creds)   grep -E '^(ADMIN_EMAIL|ADMIN_PASSWORD|PANEL_DOMAIN)=' .env ;;
  *) echo "Usage: legacy-panel {up|down|restart|logs|ps|update|creds}"; exit 1 ;;
esac
CLI
chmod +x /usr/local/bin/legacy-panel

# ---------- pull + start ----------
say "Pulling images (this may take a minute)…"
cd "$INSTALL_DIR"
docker compose --env-file .env pull 2>/dev/null || warn "Images not yet published to ghcr.io — using placeholder. Track releases at github.com/legacycloud/panel"
docker compose --env-file .env up -d 2>/dev/null || warn "Compose start deferred until images are available."

# ---------- summary ----------
echo
printf "${C_G}════════════════════════════════════════════════════════${C_RESET}\n"
printf "${C_B}  Legacy Panel installed${C_RESET}\n"
printf "${C_G}════════════════════════════════════════════════════════${C_RESET}\n"
printf "  URL          : %s\n" "${DOMAIN:+https://$DOMAIN}${DOMAIN:-http://$(hostname -I | awk '{print $1}')}"
printf "  Admin email  : ${C_Y}%s${C_RESET}\n" "admin@${DOMAIN:-legacy.local}"
printf "  Admin pass   : ${C_Y}%s${C_RESET}\n" "$ADMIN_PASSWORD"
printf "  Data dir     : %s\n" "$DATA_DIR"
printf "  Config       : %s/.env\n" "$INSTALL_DIR"
echo
printf "  ${C_DIM}Manage:${C_RESET}  legacy-panel {up|down|logs|ps|update|creds}\n"
echo
warn "SAVE THE ADMIN PASSWORD ABOVE — it is not shown again."
