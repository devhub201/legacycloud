import { Crown, Code2, Server, HeadphonesIcon, ShieldCheck, Users, Rocket, Heart, Sparkles } from "lucide-react";

export type Leader = { name: string; role: string; icon: typeof Crown; bio: string; tags: string[] };
export type Staff = { name: string; role: string; icon: typeof Crown; detail: string };

/** Replace these with the real names — structure stays the same. */
export const LEADERS: Leader[] = [
  {
    name: "Aryan Mehta",
    role: "Founder & CEO",
    icon: Crown,
    bio: "Started Legacy Cloud from one laggy SMP box. Handles hardware sourcing, pricing and long nights.",
    tags: ["Strategy", "Hardware", "Pricing"],
  },
  {
    name: "Ishita Rao",
    role: "Co-Founder & CTO",
    icon: Code2,
    bio: "Builds the panel, provisioning automation and the anti-lag tuning stack that keeps TPS at 20.",
    tags: ["Panel", "Automation", "Performance"],
  },
  {
    name: "Kabir Singh",
    role: "Head of Infrastructure",
    icon: Server,
    bio: "Runs our Ryzen 9 + DDR5 nodes across Mumbai, Singapore, Frankfurt and New York.",
    tags: ["Nodes", "Networking", "DDoS"],
  },
];

export const STAFF: Staff[] = [
  { name: "Riya", role: "Support Lead", icon: HeadphonesIcon, detail: "First reply under 5 min on Discord" },
  { name: "Dev", role: "Security Engineer", icon: ShieldCheck, detail: "Edge filtering & abuse handling" },
  { name: "Nikhil", role: "Community Manager", icon: Users, detail: "Events, giveaways & partner SMPs" },
  { name: "Sana", role: "Billing Specialist", icon: Rocket, detail: "Invoices, upgrades & refunds" },
  { name: "Omkar", role: "Modpack Specialist", icon: Sparkles, detail: "Forge, Fabric & Quilt tuning" },
  { name: "Tanvi", role: "Design & Brand", icon: Heart, detail: "Everything blossom-shaped" },
];
