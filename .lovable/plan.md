

# Ultimate Cloud — Minecraft Hosting Platform

## Design & Vibe
- **Futuristic neon theme**: Dark background (deep navy/black) with glowing blue and purple accents
- **Animated particle/star-field background** across the entire site for a cosmic, high-tech feel
- **Glassmorphism cards** with subtle glow borders and blur effects
- **Smooth scroll animations**: Elements fade and slide in as you scroll down
- **Hover effects**: Cards lift, glow, and scale on interaction

---

## Landing Page Sections

### 1. Hero Section
- Bold "Ultimate Cloud" branding with animated glowing text
- Tagline like "Next-Gen Minecraft Hosting — Blazing Fast, Always Online"
- Animated Minecraft-themed particles or floating blocks in the background
- Prominent "Get Started" and "View Plans" CTA buttons with glow effects

### 2. Features Section
- Grid of feature cards with icons and hover animations
- Features: DDoS Protection, Instant Setup, Modpack Support, 24/7 Uptime, SSD Storage, One-Click Modpacks, Automated Backups, Custom Control Panel

### 3. Pricing Plans
- 3-4 tiers (e.g., Starter, Pro, Ultimate, Enterprise) displayed as glowing cards
- RAM, CPU, storage, player slots for each plan
- "Most Popular" badge on recommended plan with animated glow
- CTA buttons on each card

### 4. Server Locations
- Visual world map or styled grid showing data center locations
- Animated pulsing dots on each location
- Location names with ping/latency indicators

### 5. FAQ Section
- Accordion-style expandable questions with smooth animations
- Common questions about setup, billing, mods, support

### 6. Footer
- Links, social media icons, "Ultimate Cloud" branding
- Contact/support info

---

## Dashboard (User Panel)
- **Sidebar navigation** with neon-styled menu items
- **My Servers page**: List of servers with status indicators (online/offline), quick start/stop/restart buttons
- **Server Details page**: RAM/CPU usage charts (using Recharts), console log viewer, player list, file manager placeholder
- **Billing page**: Current plan, usage stats, upgrade option
- **Support page**: Ticket submission form

> Note: The dashboard will use mock/demo data for now since there's no real backend connected yet. A backend (Supabase) can be added later for real authentication and server management.

---

## Pages & Routing
- `/` — Landing page (hero, features, pricing, locations, FAQ)
- `/dashboard` — Server overview
- `/dashboard/server/:id` — Individual server details
- `/dashboard/billing` — Billing & plan info
- `/dashboard/support` — Support tickets

