import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';

type Node = { name: string; region: string; latency: number; status: 'operational' | 'degraded' };

const initialNodes: Node[] = [
  { name: 'Mumbai · IN', region: 'Asia', latency: 12, status: 'operational' },
  { name: 'Singapore · SG', region: 'Asia', latency: 42, status: 'operational' },
  { name: 'Frankfurt · DE', region: 'EU', latency: 118, status: 'operational' },
  { name: 'Ashburn · US', region: 'NA', latency: 214, status: 'operational' },
  { name: 'London · UK', region: 'EU', latency: 132, status: 'operational' },
  { name: 'Tokyo · JP', region: 'Asia', latency: 88, status: 'operational' },
];

const LiveStatus = () => {
  const [nodes, setNodes] = useState(initialNodes);

  useEffect(() => {
    const id = setInterval(() => {
      setNodes((prev) =>
        prev.map((n) => ({
          ...n,
          latency: Math.max(8, n.latency + Math.round((Math.random() - 0.5) * 8)),
        }))
      );
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Live <span className="text-gradient-indigo">Network Status</span>
            </h2>
            <p className="mt-2 text-gray-400">Real-time latency across all global nodes</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-emerald-400">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
            </span>
            All systems operational
          </div>
        </div>

        <div className="rounded-2xl border border-indigo-500/20 bg-slate-950/60 backdrop-blur-md overflow-hidden">
          <div className="grid grid-cols-12 px-6 py-3 text-xs uppercase tracking-widest text-gray-500 border-b border-white/5">
            <div className="col-span-5">Node</div>
            <div className="col-span-3">Region</div>
            <div className="col-span-2">Latency</div>
            <div className="col-span-2 text-right">Status</div>
          </div>
          {nodes.map((n, i) => (
            <motion.div
              key={n.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-12 px-6 py-4 items-center border-b border-white/5 hover:bg-indigo-500/5 transition-colors"
            >
              <div className="col-span-5 text-white font-medium">{n.name}</div>
              <div className="col-span-3 text-gray-400 text-sm">{n.region}</div>
              <div className="col-span-2 tabular-nums">
                <span className={n.latency < 100 ? 'text-emerald-400' : n.latency < 180 ? 'text-yellow-400' : 'text-orange-400'}>
                  {n.latency}ms
                </span>
              </div>
              <div className="col-span-2 flex items-center gap-2 justify-end text-sm text-emerald-400">
                <Circle size={8} className="fill-emerald-400" /> Online
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveStatus;
