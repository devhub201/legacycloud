import {
  Server, Cpu, Globe, Sparkles, Boxes, Mountain, Shield, ShieldCheck, Crown, Gem, Flame, Zap,
  HardDrive, Bot, Gauge, Headphones, Cloud, Database, Rocket, Lock, Activity, Layers,
  MemoryStick, Network, Wrench, Users, LifeBuoy, Terminal, CircleDollarSign, type LucideIcon,
} from "lucide-react";

export const ICONS: Record<string, LucideIcon> = {
  Server, Cpu, Globe, Sparkles, Boxes, Mountain, Shield, ShieldCheck, Crown, Gem, Flame, Zap,
  HardDrive, Bot, Gauge, Headphones, Cloud, Database, Rocket, Lock, Activity, Layers,
  MemoryStick, Network, Wrench, Users, LifeBuoy, Terminal, CircleDollarSign,
};

export const ICON_NAMES = Object.keys(ICONS);

export function iconByName(name?: string | null): LucideIcon {
  return (name && ICONS[name]) || Server;
}

export const TONES = ["", "tone-cyan", "tone-violet", "tone-mint", "tone-amber"];
