import { useState } from 'react';
import { motion } from 'framer-motion';
import PlanCard from '@/components/PlanCard';
import { MC_BUDGET, MC_PREMIUM } from '@/data/plans';

type Tier = 'budget' | 'premium';

const MinecraftPricing = () => {
  const [tier, setTier] = useState<Tier>('budget');
  const plans = tier === 'budget' ? MC_BUDGET : MC_PREMIUM;

  return (
    <div className="min-h-screen text-white">
      <section className="container mx-auto px-4 py-20 pt-32">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-3">
            Minecraft <span className="text-pink-400">Hosting</span>
          </h1>
          <p className="text-lg text-gray-300">
            Cherry-blossom powered Minecraft servers. Instant deploy, DDoS protection, and full mod support.
          </p>
        </motion.div>

        {/* Tier switch */}
        <div className="flex justify-center mt-10">
          <div className="inline-flex bg-gray-900/70 backdrop-blur-md border border-pink-500/30 rounded-full p-1">
            {(['budget', 'premium'] as Tier[]).map((t) => (
              <button
                key={t}
                onClick={() => setTier(t)}
                className={`px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wider transition-all ${
                  tier === t
                    ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/40'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {t === 'budget' ? 'Budget (₹15/GB)' : 'Premium (₹20/GB)'}
              </button>
            ))}
          </div>
        </div>

        {/* Plan grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {plans.map((plan, i) => (
            <PlanCard
              key={`${tier}-${plan.block}`}
              plan={plan}
              index={i}
              accentLabel={plan.block === 'redstone' ? 'Popular' : undefined}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MinecraftPricing;
