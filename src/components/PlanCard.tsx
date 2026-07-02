import { motion } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, Shield, Zap } from 'lucide-react';
import { BLOCK_META, DISCORD_INVITE, type Plan } from '@/data/plans';

interface Props {
  plan: Plan;
  index?: number;
  accentLabel?: string;
}

const PlanCard = ({ plan, index = 0, accentLabel }: Props) => {
  const meta = BLOCK_META[plan.block];
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className={`group relative rounded-2xl border ${meta.ring} bg-slate-950/70 backdrop-blur-md overflow-hidden shadow-lg ${meta.glow} hover:shadow-2xl hover:shadow-indigo-500/40 transition-shadow duration-500`}
    >
      {/* Animated aurora glow ring on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent,rgba(99,102,241,0.35),transparent_60%)] blur-xl" />

      {/* Themed block header */}
      <div className={`relative h-40 flex items-center justify-center bg-gradient-to-b ${meta.tint} overflow-hidden`}>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" />
        <motion.img
          src={meta.image}
          alt={`${meta.name} block`}
          className="relative w-28 h-28 object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.7)]"
          loading="lazy"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3 + index * 0.2, repeat: Infinity, ease: 'easeInOut' }}
          whileHover={{ rotate: [0, -6, 6, 0], scale: 1.1 }}
        />
        {accentLabel && (
          <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full bg-indigo-500/90 text-white shadow-lg shadow-indigo-500/50">
            {accentLabel}
          </span>
        )}
      </div>

      <div className="relative p-6">
        <h3 className="text-2xl font-bold text-white tracking-wide">{meta.name} Plan</h3>
        <ul className="space-y-2 mt-4 text-gray-300 text-sm">
          <li className="flex items-center gap-3"><MemoryStick size={16} className="text-indigo-400" /> {plan.ram} GB RAM</li>
          <li className="flex items-center gap-3"><Cpu size={16} className="text-indigo-400" /> {plan.cpu}% CPU</li>
          <li className="flex items-center gap-3"><HardDrive size={16} className="text-indigo-400" /> {plan.storage} GB SSD</li>
          <li className="flex items-center gap-3"><Shield size={16} className="text-indigo-400" /> DDoS Protection</li>
          <li className="flex items-center gap-3"><Zap size={16} className="text-indigo-400" /> NVMe · 24/7 Uptime</li>
        </ul>
        <div className="mt-6 flex items-baseline justify-between">
          <p className="text-3xl font-extrabold bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            ₹{plan.price}
            <span className="text-sm font-normal text-gray-400">/mo</span>
          </p>
        </div>
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 relative block text-center w-full bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-400 hover:to-violet-500 transition-all shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/60 hover:-translate-y-0.5"
        >
          Order Now
        </a>
      </div>
    </motion.div>
  );
};

export default PlanCard;
