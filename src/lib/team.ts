import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type SocialLabel = "Discord" | "GitHub" | "X" | "Email";
export type Social = { label: SocialLabel; href: string };

export type TeamMember = {
  name: string;
  handle: string;
  role: string;
  icon: string; // lucide icon name, resolved via @/lib/icons
  tone: string;
  bio: string;
  focus: string;
  since: string;
  tags: string[];
  socials: Social[];
};

export type TeamData = { leaders: TeamMember[]; staff: TeamMember[] };

const D = "https://discord.gg/vPE7XRqqHJ";

export const DEFAULT_TEAM: TeamData = {
  leaders: [
    {
      name: "Cube",
      handle: "@cube",
      role: "Founder & Owner",
      icon: "Crown",
      tone: "tone-amber",
      bio: "Started Legacy Cloud on a single Ryzen box. Owns hardware sourcing, node buildouts and the pricing that keeps every plan honest.",
      focus: "Hardware, pricing, infrastructure",
      since: "Since 2021",
      tags: ["Strategy", "Hardware", "Pricing"],
      socials: [{ label: "Discord", href: D }, { label: "Email", href: "mailto:itscube847@gmail.com" }],
    },
    {
      name: "Lord Daiblo",
      handle: "@lorddaiblo",
      role: "Founder & Owner",
      icon: "Sparkles",
      tone: "tone-violet",
      bio: "Co-founder behind the Legacy identity. Runs partnerships, creator collabs and every community event on Discord.",
      focus: "Community, partnerships, brand",
      since: "Since 2021",
      tags: ["Community", "Partners", "Brand"],
      socials: [{ label: "Discord", href: D }],
    },
    {
      name: "Scarl",
      handle: "@scarl",
      role: "CEO & Owner",
      icon: "Crown",
      tone: "tone-cyan",
      bio: "Leads day-to-day operations and support standards. If a ticket sits longer than 15 minutes it lands on Scarl's screen.",
      focus: "Operations, growth, support SLAs",
      since: "Since 2021",
      tags: ["Operations", "Growth", "Support"],
      socials: [{ label: "Discord", href: D }],
    },
    {
      name: "Aryan",
      handle: "@aryan",
      role: "Owner & Developer",
      icon: "Terminal",
      tone: "tone-mint",
      bio: "Builds the panel, provisioning automation and the tuning stack that keeps TPS pinned at 20 on packed servers.",
      focus: "Panel, automation, performance",
      since: "Since 2022",
      tags: ["Panel", "Automation", "Performance"],
      socials: [{ label: "Discord", href: D }, { label: "GitHub", href: "https://github.com" }],
    },
  ],
  staff: [
    {
      name: "Dark Protocol",
      handle: "@darkprotocol",
      role: "Developer & Moderator",
      icon: "Bot",
      tone: "tone-violet",
      bio: "Ships panel features and Discord bots, and keeps the community clean with fast moderation.",
      focus: "Panel features, bots, moderation",
      since: "Since 2022",
      tags: ["Bots", "Moderation", "Tooling"],
      socials: [{ label: "Discord", href: D }],
    },
    {
      name: "NotLegoMc",
      handle: "@notlegomc",
      role: "Support Lead",
      icon: "Headphones",
      tone: "tone-cyan",
      bio: "First responder in the support channels — plugin help, server setup and player questions.",
      focus: "Player support on Discord",
      since: "Since 2023",
      tags: ["Support", "Onboarding"],
      socials: [{ label: "Discord", href: D }],
    },
    {
      name: "Legacy Crew",
      handle: "@legacycrew",
      role: "Support & Security",
      icon: "Shield",
      tone: "tone-mint",
      bio: "The rotating crew handling tickets, abuse reports and billing questions around the clock.",
      focus: "Tickets, abuse handling, billing",
      since: "Since 2021",
      tags: ["Tickets", "Abuse", "Billing"],
      socials: [{ label: "Discord", href: D }],
    },
  ],
};

function normalizeMember(m: any): TeamMember {
  return {
    name: String(m?.name ?? "Unnamed"),
    handle: String(m?.handle ?? ""),
    role: String(m?.role ?? ""),
    icon: String(m?.icon ?? "Users"),
    tone: String(m?.tone ?? ""),
    bio: String(m?.bio ?? ""),
    focus: String(m?.focus ?? ""),
    since: String(m?.since ?? ""),
    tags: Array.isArray(m?.tags) ? m.tags.map(String) : [],
    socials: Array.isArray(m?.socials)
      ? m.socials
          .filter((s: any) => s?.href)
          .map((s: any) => ({ label: (s.label ?? "Discord") as SocialLabel, href: String(s.href) }))
      : [],
  };
}

export function normalizeTeam(value: any): TeamData {
  const leaders = Array.isArray(value?.leaders) ? value.leaders.map(normalizeMember) : [];
  const staff = Array.isArray(value?.staff) ? value.staff.map(normalizeMember) : [];
  if (!leaders.length && !staff.length) return DEFAULT_TEAM;
  return { leaders, staff };
}

/** Team content is stored in site_settings (key: "team") so admins can edit it live. */
export function useTeam() {
  return useQuery({
    queryKey: ["site-team"],
    queryFn: async (): Promise<TeamData> => {
      const { data, error } = await supabase
        .from("site_settings")
        .select("value")
        .eq("key", "team")
        .maybeSingle();
      if (error) throw error;
      return normalizeTeam(data?.value);
    },
  });
}
