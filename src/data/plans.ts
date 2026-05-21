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
  { name: "Dirt Plan", image: blockDirt, cpu: "100%", ram: "2GB", storage: "10GB SSD", price: 40 },
  { name: "Stone Plan", image: blockStone, cpu: "200%", ram: "4GB", storage: "20GB SSD", price: 80 },
  { name: "Iron Plan", image: blockIron, cpu: "300%", ram: "8GB", storage: "30GB SSD", price: 160 },
  { name: "Redstone Plan", image: blockRedstone, cpu: "400%", ram: "16GB", storage: "40GB SSD", price: 320 },
  { name: "Gold Plan", image: blockGold, cpu: "450%", ram: "32GB", storage: "40GB SSD", price: 640 },
  { name: "Emerald Plan", image: blockEmerald, cpu: "500%", ram: "48GB", storage: "50GB SSD", price: 960 },
  { name: "Netherite Plan", image: blockNetherite, cpu: "700%", ram: "64GB", storage: "60GB SSD", price: 1280 },
];

export const powerfulMcPlans: Plan[] = [
  { name: "Dirt Plan", image: blockDirt, cpu: "150%", ram: "2GB", storage: "15GB NVMe SSD", price: 50 },
  { name: "Stone Plan", image: blockStone, cpu: "250%", ram: "4GB", storage: "25GB NVMe SSD", price: 100 },
  { name: "Iron Plan", image: blockIron, cpu: "350%", ram: "8GB", storage: "35GB NVMe SSD", price: 200 },
  { name: "Redstone Plan", image: blockRedstone, cpu: "500%", ram: "16GB", storage: "50GB NVMe SSD", price: 400 },
  { name: "Gold Plan", image: blockGold, cpu: "700%", ram: "32GB", storage: "80GB NVMe SSD", price: 800 },
  { name: "Emerald Plan", image: blockEmerald, cpu: "900%", ram: "48GB", storage: "120GB NVMe SSD", price: 1200 },
  { name: "Netherite Plan", image: blockNetherite, cpu: "1200%", ram: "64GB", storage: "160GB NVMe SSD", price: 1600 },
];

export const budgetVpsPlans: Plan[] = [
  { name: "Dirt Plan", image: blockDirt, cpu: "100%", ram: "4GB", storage: "40GB NVMe SSD", price: 80 },
  { name: "Stone Plan", image: blockStone, cpu: "200%", ram: "8GB", storage: "70GB NVMe SSD", price: 100 },
  { name: "Iron Plan", image: blockIron, cpu: "300%", ram: "16GB", storage: "100GB NVMe SSD", price: 200 },
  { name: "Redstone Plan", image: blockRedstone, cpu: "400%", ram: "24GB", storage: "120GB NVMe SSD", price: 250 },
  { name: "Gold Plan", image: blockGold, cpu: "500%", ram: "32GB", storage: "150GB NVMe SSD", price: 350 },
  { name: "Emerald Plan", image: blockEmerald, cpu: "600%", ram: "48GB", storage: "200GB NVMe SSD", price: 450 },
  { name: "Netherite Plan", image: blockNetherite, cpu: "800%", ram: "64GB", storage: "250GB NVMe SSD", price: 650 },
];

export const powerfulVpsPlans: Plan[] = [
  { name: "Redstone Power Plan", image: blockRedstone, cpu: "600%", ram: "32GB", storage: "200GB NVMe SSD", price: 699 },
  { name: "Gold Power Plan", image: blockGold, cpu: "800%", ram: "48GB", storage: "300GB NVMe SSD", price: 999 },
  { name: "Emerald Power Plan", image: blockEmerald, cpu: "1000%", ram: "64GB", storage: "400GB NVMe SSD", price: 1499 },
  { name: "Netherite Ultra Plan", image: blockNetherite, cpu: "1400%", ram: "96GB", storage: "600GB NVMe SSD", price: 2199 },
  { name: "Legacy Beast Plan", image: blockNetherite, cpu: "1800%", ram: "128GB", storage: "1TB NVMe SSD", price: 3499 },
];

export const DISCORD_INVITE = "https://discord.gg/guxyBXut2E";
