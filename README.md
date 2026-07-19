# Legacy Panel

Self-hosted Minecraft control plane. Docker-isolated servers, live console, file manager, backups — one-command install on any Ubuntu VPS.

## Install

```bash
curl -fsSL https://legacycloud.lovable.app/install.sh | sudo bash
```

Or with flags:

```bash
sudo bash install.sh --domain panel.example.com --email you@example.com
```

## Requirements

- Ubuntu 22.04 or 24.04 (Debian 12 also supported)
- 2+ vCPU, 4+ GB RAM
- Root / sudo
- (Optional) A domain pointed to the VPS for SSL

## What the script does

1. Installs Docker Engine, Nginx, Certbot, UFW
2. Generates secrets (JWT, DB, admin password, node token)
3. Writes `/opt/legacy-panel/{.env, docker-compose.yml}`
4. Starts Postgres + API + Daemon containers
5. Configures Nginx reverse proxy (`/api`, `/ws`, static UI)
6. Issues Let's Encrypt SSL if `--domain` and `--email` provided
7. Opens ports 22/80/443 on UFW
8. Installs `legacy-panel` CLI helper

## Managing

```bash
legacy-panel up        # start
legacy-panel down      # stop
legacy-panel logs api  # tail logs
legacy-panel update    # pull latest images
legacy-panel creds     # show admin credentials
```
