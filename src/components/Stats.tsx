import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Users, Server, Cpu, Activity } from 'lucide-react';

const stats = [
  { icon: Users, label: 'Happy Customers', value: 12500, suffix: '+' },
  { icon: Server, label: 'Servers Deployed', value: 4200, suffix: '+' },
  { icon: Activity, label: 'Uptime', value: 99.9, suffix: '%' },
  { icon: Cpu, label: 'Global Nodes', value: 18, suffix: '' },
];

function Counter({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 2, ease: 'easeOut' });
    return controls.stop;
  }, [inView, to, mv]);

  useEffect(() => {
    return rounded.on('change', (v) => {
      if (ref.current) ref.current.textContent = v;
    });
  }, [rounded]);

  return <span ref={ref}>0</span>;
}

const Stats = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Trusted by <span className="text-gradient-indigo">gamers & developers</span>
          </h2>
          <p className="mt-3 text-gray-400">Real numbers from the Legacy Cloud network</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="relative rounded-2xl border border-indigo-500/20 bg-slate-950/60 backdrop-blur-md p-6 overflow-hidden group"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-indigo-500/10 to-violet-500/10" />
              <s.icon className="text-indigo-400 mb-3" size={28} />
              <div className="text-3xl md:text-4xl font-extrabold text-white tabular-nums">
                <Counter to={s.value} decimals={s.value % 1 !== 0 ? 1 : 0} />
                <span className="text-indigo-400">{s.suffix}</span>
              </div>
              <div className="mt-2 text-sm text-gray-400">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
