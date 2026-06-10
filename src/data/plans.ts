import blockDirt from "@/assets/block-dirt.png";
import blockStone from "@/assets/block-stone.png";
import blockIron from "@/assets/block-iron.png";
import blockRedstone from "@/assets/block-redstone.png";
import blockGold from "@/assets/block-gold.png";
import blockEmerald from "@/assets/block-emerald.png";
import blockNetherite from "@/assets/block-netherite.png";

export type Plan = {
  name: string;
  image: string;
  cpu: string;
  ram: string;
  storage: string;
  price: number;
};

export const budgetMcPlans: Plan[] = [
  { name: "Dirt Plan", image: blockDirt, cpu: "100%", ram: "2GB", storage: "10GB SSD", price: 30 },
  { name: "Stone Plan", image: blockStone, cpu: "200%", ram: "4GB", storage: "20GB SSD", price: 60 },
  { name: "Iron Plan", image: blockIron, cpu: "300%", ram: "8GB", storage: "30GB SSD", price: 120 },
  { name: "Redstone Plan", image: blockRedstone, cpu: "400%", ram: "16GB", storage: "40GB SSD", price: 240 },
  { name: "Gold Plan", image: blockGold, cpu: "450%", ram: "32GB", storage: "40GB SSD", price: 480 },
  { name: "Emerald Plan", image: blockEmerald, cpu: "500%", ram: "48GB", storage: "50GB SSD", price: 720 },
  { name: "Netherite Plan", image: blockNetherite, cpu: "700%", ram: "64GB", storage: "60GB SSD", price: 960 },
];

export const powerfulMcPlans: Plan[] = [
  { name: "Dirt Plan", image: blockDirt, cpu: "150%", ram: "2GB", storage: "15GB SSD", price: 40 },
  { name: "Stone Plan", image: blockStone, cpu: "250%", ram: "4GB", storage: "30GB SSD", price: 80 },
  { name: "Iron Plan", image: blockIron, cpu: "350%", ram: "8GB", storage: "45GB SSD", price: 160 },
  { name: "Redstone Plan", image: blockRedstone, cpu: "500%", ram: "16GB", storage: "60GB SSD", price: 320 },
  { name: "Gold Plan", image: blockGold, cpu: "650%", ram: "32GB", storage: "80GB SSD", price: 640 },
  { name: "Emerald Plan", image: blockEmerald, cpu: "800%", ram: "48GB", storage: "100GB SSD", price: 960 },
  { name: "Netherite Plan", image: blockNetherite, cpu: "1000%", ram: "64GB", storage: "120GB SSD", price: 1280 },
];

export const budgetVpsPlans: Plan[] = [
  { name: "Dirt Plan", image: blockDirt, cpu: "100%", ram: "2GB", storage: "20GB SSD", price: 80 },
  { name: "Stone Plan", image: blockStone, cpu: "200%", ram: "4GB", storage: "40GB SSD", price: 160 },
  { name: "Iron Plan", image: blockIron, cpu: "300%", ram: "8GB", storage: "80GB SSD", price: 320 },
  { name: "Redstone Plan", image: blockRedstone, cpu: "400%", ram: "16GB", storage: "160GB SSD", price: 640 },
  { name: "Gold Plan", image: blockGold, cpu: "600%", ram: "32GB", storage: "320GB SSD", price: 1280 },
  { name: "Emerald Plan", image: blockEmerald, cpu: "800%", ram: "48GB", storage: "480GB SSD", price: 1920 },
  { name: "Netherite Plan", image: blockNetherite, cpu: "1000%", ram: "64GB", storage: "640GB SSD", price: 2560 },
];

export const powerfulVpsPlans: Plan[] = [
  { name: "Dirt Plan", image: blockDirt, cpu: "150%", ram: "2GB", storage: "30GB SSD", price: 130 },
  { name: "Stone Plan", image: blockStone, cpu: "250%", ram: "4GB", storage: "60GB SSD", price: 260 },
  { name: "Iron Plan", image: blockIron, cpu: "400%", ram: "8GB", storage: "120GB SSD", price: 520 },
  { name: "Redstone Plan", image: blockRedstone, cpu: "600%", ram: "16GB", storage: "240GB SSD", price: 1040 },
  { name: "Gold Plan", image: blockGold, cpu: "800%", ram: "32GB", storage: "480GB SSD", price: 2080 },
  { name: "Emerald Plan", image: blockEmerald, cpu: "1000%", ram: "48GB", storage: "720GB SSD", price: 3120 },
  { name: "Netherite Plan", image: blockNetherite, cpu: "1200%", ram: "64GB", storage: "960GB SSD", price: 4160 },
];

export const DISCORD_INVITE = "https://discord.gg/guxyBXut2E";
