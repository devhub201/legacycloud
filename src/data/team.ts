import { Crown, Code2, Shield, HeadphonesIcon, Terminal, Sparkles } from "lucide-react";

export type Leader = { name: string; role: string; icon: typeof Crown; bio: string; tags: string[] };
export type Staff = { name: string; role: string; icon: typeof Crown; detail: string };

export const LEADERS: Leader[] = [
  {
    name: "Cube",
    role: "Founder & Owner",
    icon: Crown,
    bio: "Started Legacy Cloud and runs hardware sourcing, pricing and the long nights behind every node.",
    tags: ["Strategy", "Hardware", "Pricing"],
  },
  {
    name: "Lord Daiblo",
    role: "Founder & Owner",
    icon: Sparkles,
    bio: "Co-founded Legacy Cloud — community, partnerships and keeping the blossom vibe alive.",
    tags: ["Community", "Partners", "Brand"],
  },
  {
    name: "Scarl",
    role: "CEO & Owner",
    icon: Crown,
    bio: "Leads operations, growth and support standards across Minecraft and VPS hosting.",
    tags: ["Operations", "Growth", "Support"],
  },
  {
    name: "Aryan",
    role: "Owner & Developer",
    icon: Code2,
    bio: "Builds the panel, provisioning automation and the anti-lag tuning stack that keeps TPS at 20.",
    tags: ["Panel", "Automation", "Performance"],
  },
];

export const STAFF: Staff[] = [
  { name: "Dark Protocol", role: "Developer & Moderator", icon: Terminal, detail: "Panel features, bots and moderation" },
  { name: "NotLegoMc", role: "Staff", icon: HeadphonesIcon, detail: "Player support on Discord" },
  { name: "Legacy Crew", role: "Support & Security", icon: Shield, detail: "Tickets, abuse handling and billing help" },
];
