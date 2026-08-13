import { motion } from "framer-motion";

/**
 * Isometric voxel "Minecraft block" icon rendered in pure CSS.
 * Each block gets a real top/left/right face with pixel-noise texture,
 * so a Stone plan actually looks like a stone block instead of a generic icon.
 */

export type BlockKind =
  | "dirt" | "grass" | "stone" | "cobble" | "iron" | "gold" | "diamond" | "emerald"
  | "netherite" | "obsidian" | "redstone" | "lapis" | "amethyst" | "copper" | "quartz";

type Faces = { top: string; left: string; right: string; glow: string };

const BLOCKS: Record<BlockKind, Faces> = {
  dirt:      { top: "#8b5a2b", left: "#6b4420", right: "#7a4e26", glow: "#b07a45" },
  grass:     { top: "#5cb14a", left: "#6b4420", right: "#7a4e26", glow: "#7fe06a" },
  stone:     { top: "#9aa0a6", left: "#6d7378", right: "#7d8489", glow: "#c3c9cf" },
  cobble:    { top: "#8c9297", left: "#63686c", right: "#73787d", glow: "#b6bcc2" },
  iron:      { top: "#dfe2e6", left: "#a8adb3", right: "#c2c7cd", glow: "#ffffff" },
  gold:      { top: "#ffd24a", left: "#c78f16", right: "#e0a827", glow: "#ffe89a" },
  diamond:   { top: "#5be4e0", left: "#2196a5", right: "#35bcc4", glow: "#a8fbfb" },
  emerald:   { top: "#3ddc84", left: "#159a55", right: "#22bb69", glow: "#96ffc4" },
  netherite: { top: "#514148", left: "#2c2429", right: "#3b3036", glow: "#8d6f7c" },
  obsidian:  { top: "#3b2b57", left: "#1e1530", right: "#2a1f42", glow: "#7a5bb5" },
  redstone:  { top: "#e0483b", left: "#992a20", right: "#bb352a", glow: "#ff8a7a" },
  lapis:     { top: "#3a63d8", left: "#20409b", right: "#2a51bb", glow: "#8aa8ff" },
  amethyst:  { top: "#a06ce0", left: "#6c3ea8", right: "#8450c4", glow: "#d8b4ff" },
  copper:    { top: "#e08a4f", left: "#a35a29", right: "#c26f38", glow: "#ffbd8a" },
  quartz:    { top: "#f2ece4", left: "#c6bdb2", right: "#ded6cb", glow: "#ffffff" },
};

const NAME_MAP: [RegExp, BlockKind][] = [
  [/dirt|starter|basic|nano/i, "dirt"],
  [/grass|lite|hobby/i, "grass"],
  [/cobble/i, "cobble"],
  [/stone|standard/i, "stone"],
  [/iron|plus|pro-4|vps-4/i, "iron"],
  [/gold|premium|pro-8|vps-8/i, "gold"],
  [/diamond|ultra|pro-16|vps-16/i, "diamond"],
  [/emerald|business|growth/i, "emerald"],
  [/netherite|titan|enterprise|pro-32/i, "netherite"],
  [/obsidian|elite/i, "obsidian"],
  [/redstone|bot|automation/i, "redstone"],
  [/lapis|cloud|vps|kvm/i, "lapis"],
  [/amethyst|saas|app/i, "amethyst"],
  [/copper|web|wordpress/i, "copper"],
  [/quartz|light|micro|vps-2/i, "quartz"],
];

export function blockForName(name?: string | null, fallback: BlockKind = "stone"): BlockKind {
  if (!name) return fallback;
  for (const [re, kind] of NAME_MAP) if (re.test(name)) return kind;
  return fallback;
}

export default function BlockIcon({
  kind,
  name,
  size = 46,
  float = true,
  className = "",
}: {
  kind?: BlockKind;
  name?: string | null;
  size?: number;
  float?: boolean;
  className?: string;
}) {
  const k = kind ?? blockForName(name);
  const f = BLOCKS[k];
  const s = size;
  const f2 = s * 0.7; // face size

  return (
    <motion.span
      aria-hidden
      className={`voxel-wrap ${className}`}
      style={{ width: s, height: s * 1.12, ["--vx-glow" as string]: f.glow }}
      animate={float ? { y: [0, -3, 0] } : undefined}
      transition={float ? { duration: 3.4, repeat: Infinity, ease: "easeInOut" } : undefined}
      whileHover={{ scale: 1.12, rotate: -4 }}
    >
      <span className="voxel" style={{ width: f2, height: f2, ["--vx" as string]: `${f2 / 2}px` }}>
        <span className="voxel-face voxel-top" style={{ width: f2, height: f2, background: f.top }} />
        <span className="voxel-face voxel-left" style={{ width: f2, height: f2, background: f.left }} />
        <span className="voxel-face voxel-right" style={{ width: f2, height: f2, background: f.right }} />
      </span>
    </motion.span>
  );
}
