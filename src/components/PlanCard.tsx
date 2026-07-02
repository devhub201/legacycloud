import { motion } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, Shield } from 'lucide-react';
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
      className={`relative rounded-2xl border ${meta.ring} bg-gray-900/70 backdrop-blur-md overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-lg ${meta.glow}`}
    >
      {/* Themed block header */}
      <div className={`relative h-40 flex items-center justify-center bg-gradient-to-b ${meta.tint}`}>
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),transparent_70%)]" />
        <img
          src={meta.image}
          alt={`${meta.name} block`}
          className="relative w-28 h-28 object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]"
          loading="lazy"
        />
        {accentLabel && (
          <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest font-bold px-2 py-1 rounded-full bg-indigo-500/90 text-white">
            {accentLabel}
          </span>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-white tracking-wide">{meta.name} Plan</h3>
        <ul className="space-y-2 mt-4 text-gray-300 text-sm">
          <li className="flex items-center gap-3"><MemoryStick size={16} className="text-indigo-400" /> {plan.ram} GB RAM</li>
          <li className="flex items-center gap-3"><Cpu size={16} className="text-indigo-400" /> {plan.cpu}% CPU</li>
          <li className="flex items-center gap-3"><HardDrive size={16} className="text-indigo-400" /> {plan.storage} GB SSD</li>
          <li className="flex items-center gap-3"><Shield size={16} className="text-indigo-400" /> DDoS Protection</li>
        </ul>
        <div className="mt-6 flex items-baseline justify-between">
          <p className="text-3xl font-extrabold text-white">
            ₹{plan.price}
            <span className="text-sm font-normal text-gray-400">/mo</span>
          </p>
        </div>
        <a
          href={DISCORD_INVITE}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 block text-center w-full bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-400 hover:to-indigo-500 transition-colors"
        >
          Order Now
        </a>
      </div>
    </motion.div>
  );
};

export default PlanCard;
