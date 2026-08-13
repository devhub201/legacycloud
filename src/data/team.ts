import { Crown, Code2, Shield, HeadphonesIcon, Terminal, Sparkles } from "lucide-react";

export type Social = { label: "Discord" | "GitHub" | "X" | "Email"; href: string };

export type Member = {
  name: string;
  handle: string;
  role: string;
  icon: typeof Crown;
  tone: string;
  bio: string;
  focus: string;
  since: string;
  tags: string[];
  socials: Social[];
};

const D = "https://discord.gg/vPE7XRqqHJ";

export const LEADERS: Member[] = [
  {
    name: "Cube",
    handle: "@cube",
    role: "Founder & Owner",
    icon: Crown,
    tone: "tone-amber",
    bio: "Started Legacy Cloud in a bedroom with one Ryzen box. Now owns hardware sourcing, node buildouts and the pricing that keeps ₹15/GB honest.",
    focus: "Hardware, pricing, infrastructure",
    since: "Since 2021",
    tags: ["Strategy", "Hardware", "Pricing"],
    socials: [{ label: "Discord", href: D }, { label: "Email", href: "mailto:itscube847@gmail.com" }],
  },
  {
    name: "Lord Daiblo",
    handle: "@lorddaiblo",
    role: "Founder & Owner",
    icon: Sparkles,
    tone: "tone-violet",
    bio: "Co-founder behind the blossom identity. Runs partnerships, creator collabs and every community event on the Discord.",
    focus: "Community, partnerships, brand",
    since: "Since 2021",
    tags: ["Community", "Partners", "Brand"],
    socials: [{ label: "Discord", href: D }],
  },
  {
    name: "Scarl",
    handle: "@scarl",
    role: "CEO & Owner",
    icon: Crown,
    tone: "tone-cyan",
    bio: "Leads day-to-day operations and support standards. If a ticket sits longer than 15 minutes, it lands on Scarl's screen.",
    focus: "Operations, growth, support SLAs",
    since: "Since 2021",
    tags: ["Operations", "Growth", "Support"],
    socials: [{ label: "Discord", href: D }],
  },
  {
    name: "Aryan",
    handle: "@aryan",
    role: "Owner & Developer",
    icon: Code2,
    tone: "tone-mint",
    bio: "Builds the panel, provisioning automation and the anti-lag tuning stack that keeps TPS pinned at 20 on packed servers.",
    focus: "Panel, automation, performance",
    since: "Since 2022",
    tags: ["Panel", "Automation", "Performance"],
    socials: [{ label: "Discord", href: D }, { label: "GitHub", href: "https://github.com" }],
  },
];

export const STAFF: Member[] = [
  {
    name: "Dark Protocol",
    handle: "@darkprotocol",
    role: "Developer & Moderator",
    icon: Terminal,
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
    role: "Staff",
    icon: HeadphonesIcon,
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
    icon: Shield,
    tone: "tone-mint",
    bio: "The rotating crew handling tickets, abuse reports and billing questions around the clock.",
    focus: "Tickets, abuse handling, billing",
    since: "Since 2021",
    tags: ["Tickets", "Abuse", "Billing"],
    socials: [{ label: "Discord", href: D }],
  },
];

export const ALL_TEAM = [...LEADERS, ...STAFF];
