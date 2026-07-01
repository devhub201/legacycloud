import { useState } from 'react';
import { motion } from 'framer-motion';
import PlanCard from '@/components/PlanCard';
import { VPS_BUDGET, VPS_PREMIUM } from '@/data/plans';
import ubuntuLogo from '@/assets/ubuntu.png';
import windowsLogo from '@/assets/windows.png';
import fedoraLogo from '@/assets/fedora.png';
import debianLogo from '@/assets/debian.png';
import kaliLogo from '@/assets/kali.png';

const operatingSystems = [
  { name: 'Ubuntu', logo: ubuntuLogo },
  { name: 'Windows', logo: windowsLogo },
  { name: 'Fedora', logo: fedoraLogo },
  { name: 'Debian', logo: debianLogo },
  { name: 'Kali Linux', logo: kaliLogo },
];

type Tier = 'budget' | 'premium';

const VpsPricing = () => {
  const [tier, setTier] = useState<Tier>('budget');
  const plans = tier === 'budget' ? VPS_BUDGET : VPS_PREMIUM;

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
            VPS <span className="text-pink-400">Hosting</span>
          </h1>
          <p className="text-lg text-gray-300">
            High-performance virtual private servers with full root access, NVMe SSD storage, and 24/7 support.
          </p>
        </motion.div>

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
                {t === 'budget' ? 'Budget (₹40/GB)' : 'Premium (₹65/GB)'}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-12">
          {plans.map((plan, i) => (
            <PlanCard
              key={`${tier}-${plan.block}`}
              plan={plan}
              index={i}
              accentLabel={plan.block === 'gold' ? 'Best Value' : undefined}
            />
          ))}
        </div>

        {/* Operating Systems */}
        <div className="mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-4xl font-bold">
              Choose your <span className="text-pink-400">OS</span>
            </h2>
            <p className="text-gray-400 mt-2 max-w-2xl mx-auto">
              Select from a wide range of popular operating systems.
            </p>
          </motion.div>
          <div className="flex justify-center flex-wrap gap-4 md:gap-8 mt-10">
            {operatingSystems.map((os, index) => (
              <motion.div
                key={os.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center gap-3 p-4 bg-gray-900/60 backdrop-blur-sm rounded-lg w-28 h-28 justify-center border border-pink-500/20 hover:border-pink-400 transition-colors"
              >
                <img src={os.logo} alt={os.name} className="w-12 h-12 object-contain" />
                <span className="text-sm font-medium">{os.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VpsPricing;
