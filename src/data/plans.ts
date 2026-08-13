export type Plan = {
  name: string;
  ram: string;
  cpu: string;
  storage: string;
  price: number;
  extras: string[];
  popular?: boolean;
};

export type PlanGroup = {
  id: string;
  title: string;
  blurb: string;
  rate: string;
  plans: Plan[];
};

export const MC_BUDGET: PlanGroup = {
  id: "mc-budget",
  title: "Minecraft Budget",
  blurb: "Perfect for SMPs with friends. Shared Ryzen power at ₹15/GB.",
  rate: "₹15 / GB",
  plans: [
    { name: "Dirt", ram: "2 GB", cpu: "100% CPU", storage: "10 GB NVMe", price: 30, extras: ["1 Database", "Unlimited Slots"] },
    { name: "Stone", ram: "4 GB", cpu: "150% CPU", storage: "20 GB NVMe", price: 60, extras: ["2 Databases", "Full FTP Access"] },
    { name: "Iron", ram: "6 GB", cpu: "200% CPU", storage: "30 GB NVMe", price: 90, extras: ["3 Databases", "DDoS Protection"], popular: true },
    { name: "Gold", ram: "8 GB", cpu: "250% CPU", storage: "40 GB NVMe", price: 120, extras: ["4 Databases", "Daily Backups"] },
    { name: "Diamond", ram: "12 GB", cpu: "300% CPU", storage: "60 GB NVMe", price: 180, extras: ["6 Databases", "Priority Support"] },
    { name: "Netherite", ram: "16 GB", cpu: "400% CPU", storage: "80 GB NVMe", price: 240, extras: ["Unlimited DBs", "Priority Support"] },
  ],
};

export const MC_PREMIUM: PlanGroup = {
  id: "mc-premium",
  title: "Minecraft Premium",
  blurb: "Ryzen 9 + DDR5 for big modpacks and public networks. ₹20/GB.",
  rate: "₹20 / GB",
  plans: [
    { name: "Dirt", ram: "4 GB", cpu: "200% CPU", storage: "25 GB NVMe", price: 80, extras: ["Ryzen 9 5950X", "2 Databases"] },
    { name: "Stone", ram: "6 GB", cpu: "250% CPU", storage: "40 GB NVMe", price: 120, extras: ["Ryzen 9 5950X", "Daily Backups"] },
    { name: "Iron", ram: "8 GB", cpu: "300% CPU", storage: "60 GB NVMe", price: 160, extras: ["DDR5 Memory", "Daily Backups"], popular: true },
    { name: "Gold", ram: "12 GB", cpu: "400% CPU", storage: "80 GB NVMe", price: 240, extras: ["DDR5 Memory", "Free Subdomain"] },
    { name: "Diamond", ram: "16 GB", cpu: "500% CPU", storage: "120 GB NVMe", price: 320, extras: ["Dedicated IP option", "Priority Support"] },
    { name: "Netherite", ram: "24 GB", cpu: "600% CPU", storage: "160 GB NVMe", price: 480, extras: ["Dedicated IP option", "24/7 Priority"] },
  ],
};

export const VPS_BUDGET: PlanGroup = {
  id: "vps-budget",
  title: "VPS Budget",
  blurb: "Full root KVM VPS for bots, panels and dev work. ₹40/GB.",
  rate: "₹40 / GB",
  plans: [
    { name: "VPS-2", ram: "2 GB", cpu: "1 vCore", storage: "25 GB NVMe", price: 80, extras: ["Full Root", "1 Gbps Port"] },
    { name: "VPS-4", ram: "4 GB", cpu: "2 vCore", storage: "50 GB NVMe", price: 160, extras: ["Full Root", "Free OS Reinstall"], popular: true },
    { name: "VPS-8", ram: "8 GB", cpu: "4 vCore", storage: "100 GB NVMe", price: 320, extras: ["Full Root", "DDoS Protection"] },
    { name: "VPS-16", ram: "16 GB", cpu: "6 vCore", storage: "200 GB NVMe", price: 640, extras: ["Full Root", "Snapshot Support"] },
  ],
};

export const VPS_PREMIUM: PlanGroup = {
  id: "vps-premium",
  title: "VPS Premium",
  blurb: "Dedicated cores, DDR5 and enterprise NVMe. ₹65/GB.",
  rate: "₹65 / GB",
  plans: [
    { name: "Pro-4", ram: "4 GB", cpu: "2 dedicated vCore", storage: "80 GB NVMe", price: 260, extras: ["Ryzen 9 Dedicated", "DDR5"] },
    { name: "Pro-8", ram: "8 GB", cpu: "4 dedicated vCore", storage: "160 GB NVMe", price: 520, extras: ["Ryzen 9 Dedicated", "DDR5"], popular: true },
    { name: "Pro-16", ram: "16 GB", cpu: "6 dedicated vCore", storage: "300 GB NVMe", price: 1040, extras: ["Dedicated IP", "Daily Snapshots"] },
    { name: "Pro-32", ram: "32 GB", cpu: "8 dedicated vCore", storage: "500 GB NVMe", price: 2080, extras: ["Dedicated IP", "24/7 Priority"] },
  ],
};

export const MC_GROUPS = [MC_BUDGET, MC_PREMIUM];
export const VPS_GROUPS = [VPS_BUDGET, VPS_PREMIUM];

export const LOCATIONS = [
  { city: "Mumbai", country: "India", flag: "🇮🇳", ping: "12 ms" },
  { city: "Singapore", country: "Singapore", flag: "🇸🇬", ping: "48 ms" },
  { city: "Frankfurt", country: "Germany", flag: "🇩🇪", ping: "132 ms" },
  { city: "New York", country: "USA", flag: "🇺🇸", ping: "186 ms" },
];

export const DISCORD = "https://discord.gg/vPE7XRqqHJ";
