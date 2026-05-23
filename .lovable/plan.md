# Phase 2 — Full Legacy Cloud System

Screenshot ke har page ko real, workable banayenge with Lovable Cloud backend (auth + database). Pink/magenta neon UI consistent rahega.

## Backend Setup (Lovable Cloud)

**Tables:**
- `profiles` — user_id, display_name, avatar_url, balance (already exists, will extend)
- `user_roles` — user_id, role (`admin` | `user`) — separate table, secure
- `services` — id, user_id, plan_name, plan_type (mc/vps), ram, cpu, storage, price, status (active/suspended/expired), expires_at, ip_address, location
- `invoices` — id, user_id, service_id, amount, status (paid/pending/cancelled), due_date, items (jsonb)
- `cart_items` — id, user_id, plan_name, plan_type, price, billing_cycle
- `promo_codes` — code, discount_percent, max_uses, used_count, expires_at, active
- `support_tickets` — id, user_id, subject, category, status, priority, created_at
- `ticket_messages` — ticket_id, user_id, message, created_at
- `kb_articles` — id, title, slug, category, content, published
- `referrals` — id, user_id, code, referred_user_id, reward_credit
- `transactions` — id, user_id, amount, type (deposit/charge), invoice_id

**Auth:** Email/password + Google OAuth. Email auto-confirm ON (demo). Profile auto-created on signup via trigger.

**RLS:** Users access only their own data. Admin role bypasses via `has_role()` security definer function.

## Pages to Build (Public)

1. `/` — Homepage (already done, polish)
2. `/plans` — Already done
3. `/vps` — Already done
4. `/services` — Already done
5. `/status` — Live status with uptime cards (already done, polish)
6. `/support` — Public help center (already done) + ticket form
7. `/discord` — Already done
8. `/about` — Already done
9. `/terms` — Already done
10. `/offers` — Limited time offers / promo codes display (NEW)
11. `/knowledgebase` — Browse articles by category (NEW)
12. `/kb/:slug` — Article detail page (NEW)

## Auth Pages

13. `/login` — Welcome Back card, email+password, Google, forgot link
14. `/register` — Create account card, terms checkbox
15. `/reset-password` — Set new password from recovery link

## Client Area (auth required)

16. `/dashboard` — Welcome back, balance, active services count, recent invoices, quick actions
17. `/dashboard/services` — My services list (MC + VPS) with manage/renew buttons
18. `/dashboard/vps` — My VPS list with IP, location, specs, status
19. `/dashboard/cart` — Cart items, totals, checkout button
20. `/dashboard/checkout` — Order summary + payment method (Discord redirect for now, with note)
21. `/dashboard/invoices` — All invoices list with status badges
22. `/dashboard/invoices/:id` — Invoice detail with download
23. `/dashboard/billing` — Balance overview, recent invoices, top-up via Discord
24. `/dashboard/renew/:serviceId` — Renew service with cycle selector (1/3/6/12 months)
25. `/dashboard/rewards` — Referral code + invite & earn
26. `/dashboard/profile` — Update display name, avatar upload
27. `/dashboard/tickets` — My support tickets list
28. `/dashboard/tickets/:id` — Ticket conversation

## Admin Area (role=admin required)

29. `/admin` — Dashboard with revenue chart, active services, user count
30. `/admin/users` — User management table with role toggle
31. `/admin/services` — VPS/Service management (suspend/activate/extend)
32. `/admin/promo-codes` — Create/edit/disable promo codes
33. `/admin/knowledgebase` — CRUD articles
34. `/admin/tickets` — All tickets, reply as admin
35. `/admin/invoices` — All invoices, mark paid manually

## Shared Components

- `DashboardLayout` — Sidebar nav (Dashboard, Services, VPS, Cart, Invoices, Billing, Tickets, Rewards, Profile) + topbar with balance + user menu
- `AdminLayout` — Separate sidebar (Dashboard, Users, Services, Promos, KB, Tickets, Invoices)
- `ProtectedRoute` — Redirects to /login if not authed
- `AdminRoute` — Requires admin role
- `ServiceCard`, `InvoiceRow`, `TicketCard`, `StatBadge`

## Cart / Checkout Flow (real, workable)

- "Buy Now" on any plan card → adds to cart_items table → redirects to `/dashboard/cart` (login required)
- Checkout creates an `invoice` (status=pending) + `service` (status=pending) → shows invoice with Discord link to complete payment manually
- Admin marks invoice paid → trigger activates service + sets expires_at = now + cycle

## Tech / UI Notes

- Sidebar layouts use shadcn Sidebar primitive
- Keep glass-card, btn-pink, ring-glow tokens
- Tables: shadcn Table
- Forms: react-hook-form + zod
- Charts: recharts for admin dashboard
- All currency in ₹ (INR)
- Discord CTAs remain for payment completion (no real Stripe yet — user said "workable" not "live payments")

## Build Order

Bahut bada scope hai. Single message me sab ek dam fit nahi hoga cleanly. Recommend split:

**Batch A (this message):** Backend schema + auth + dashboard layout + 6 core client pages (dashboard, services, cart, checkout, invoices, profile)

**Batch B (next):** Billing, tickets, rewards, renew, offers, knowledgebase

**Batch C:** Full admin panel (7 pages)

Aap confirm karo: poora Batch A start karu? Ya pehle koi specific page chahiye?
