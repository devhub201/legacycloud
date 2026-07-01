import dirtImg from '@/assets/block-dirt.png';
import stoneImg from '@/assets/block-stone.png';
import ironImg from '@/assets/block-iron.png';
import redstoneImg from '@/assets/block-redstone.png';
import goldImg from '@/assets/block-gold.png';
import emeraldImg from '@/assets/block-emerald.png';
import netheriteImg from '@/assets/block-netherite.png';

export type BlockKey = 'dirt' | 'stone' | 'iron' | 'redstone' | 'gold' | 'emerald' | 'netherite';

export const BLOCK_META: Record<BlockKey, { name: string; image: string; tint: string; ring: string; glow: string }> = {
  dirt:      { name: 'Dirt',      image: dirtImg,      tint: 'from-amber-900/40 via-amber-800/20 to-transparent',    ring: 'border-amber-700/40 hover:border-amber-500',   glow: 'shadow-amber-500/20' },
  stone:     { name: 'Stone',     image: stoneImg,     tint: 'from-slate-700/50 via-slate-600/20 to-transparent',    ring: 'border-slate-500/40 hover:border-slate-300',   glow: 'shadow-slate-400/20' },
  iron:      { name: 'Iron',      image: ironImg,      tint: 'from-zinc-500/40 via-zinc-400/15 to-transparent',      ring: 'border-zinc-400/40 hover:border-zinc-200',     glow: 'shadow-zinc-300/20' },
  redstone:  { name: 'Redstone',  image: redstoneImg,  tint: 'from-red-800/50 via-red-600/20 to-transparent',        ring: 'border-red-600/40 hover:border-red-400',       glow: 'shadow-red-500/30' },
  gold:      { name: 'Gold',      image: goldImg,      tint: 'from-yellow-700/50 via-yellow-500/20 to-transparent',  ring: 'border-yellow-500/40 hover:border-yellow-300', glow: 'shadow-yellow-400/30' },
  emerald:   { name: 'Emerald',   image: emeraldImg,   tint: 'from-emerald-800/50 via-emerald-500/20 to-transparent',ring: 'border-emerald-500/40 hover:border-emerald-300',glow: 'shadow-emerald-400/30' },
  netherite: { name: 'Netherite', image: netheriteImg, tint: 'from-neutral-900/70 via-neutral-800/30 to-transparent',ring: 'border-neutral-700/60 hover:border-purple-400', glow: 'shadow-purple-500/30' },
};

export interface Plan {
  block: BlockKey;
  ram: number;      // GB
  cpu: number;      // %
  storage: number;  // GB
  price: number;    // ₹/month
}

// MC Budget Plans (₹15/GB)
export const MC_BUDGET: Plan[] = [
  { block: 'dirt',      ram: 2,  cpu: 100, storage: 10, price: 30 },
  { block: 'stone',     ram: 4,  cpu: 200, storage: 20, price: 60 },
  { block: 'iron',      ram: 8,  cpu: 300, storage: 30, price: 120 },
  { block: 'redstone',  ram: 16, cpu: 400, storage: 40, price: 240 },
  { block: 'gold',      ram: 32, cpu: 450, storage: 40, price: 480 },
  { block: 'emerald',   ram: 48, cpu: 500, storage: 50, price: 720 },
  { block: 'netherite', ram: 64, cpu: 700, storage: 60, price: 960 },
];

// MC Premium Plans (₹20/GB)
export const MC_PREMIUM: Plan[] = [
  { block: 'dirt',      ram: 2,  cpu: 150,  storage: 15,  price: 40 },
  { block: 'stone',     ram: 4,  cpu: 250,  storage: 30,  price: 80 },
  { block: 'iron',      ram: 8,  cpu: 350,  storage: 45,  price: 160 },
  { block: 'redstone',  ram: 16, cpu: 500,  storage: 60,  price: 320 },
  { block: 'gold',      ram: 32, cpu: 650,  storage: 80,  price: 640 },
  { block: 'emerald',   ram: 48, cpu: 800,  storage: 100, price: 960 },
  { block: 'netherite', ram: 64, cpu: 1000, storage: 120, price: 1280 },
];

// VPS Budget Plans (₹40/GB)
export const VPS_BUDGET: Plan[] = [
  { block: 'dirt',      ram: 2,  cpu: 100,  storage: 20,  price: 80 },
  { block: 'stone',     ram: 4,  cpu: 200,  storage: 40,  price: 160 },
  { block: 'iron',      ram: 8,  cpu: 300,  storage: 80,  price: 320 },
  { block: 'redstone',  ram: 16, cpu: 400,  storage: 160, price: 640 },
  { block: 'gold',      ram: 32, cpu: 600,  storage: 320, price: 1280 },
  { block: 'emerald',   ram: 48, cpu: 800,  storage: 480, price: 1920 },
  { block: 'netherite', ram: 64, cpu: 1000, storage: 640, price: 2560 },
];

// VPS Premium Plans (₹65/GB)
export const VPS_PREMIUM: Plan[] = [
  { block: 'dirt',      ram: 2,  cpu: 150,  storage: 30,  price: 130 },
  { block: 'stone',     ram: 4,  cpu: 250,  storage: 60,  price: 260 },
  { block: 'iron',      ram: 8,  cpu: 400,  storage: 120, price: 520 },
  { block: 'redstone',  ram: 16, cpu: 600,  storage: 240, price: 1040 },
  { block: 'gold',      ram: 32, cpu: 800,  storage: 480, price: 2080 },
  { block: 'emerald',   ram: 48, cpu: 1000, storage: 720, price: 3120 },
  { block: 'netherite', ram: 64, cpu: 1200, storage: 960, price: 4160 },
];

export const DISCORD_INVITE = 'https://discord.gg/guxyBXut2E';
