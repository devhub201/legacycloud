import { motion } from 'framer-motion';
import DiscordLogo from '../icons/DiscordLogo'; // Impor ikon yang baru kita buat

const Cta = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl p-8 md:p-12 overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 shadow-2xl shadow-indigo-900/50 border border-indigo-400/30"
        >
          {/* === Ikon-ikon dekoratif di background === */}
          <DiscordLogo className="absolute -top-4 -left-4 w-24 h-24 text-indigo-500/30 opacity-50 transform rotate-12" />
          <DiscordLogo className="absolute -bottom-6 right-1/3 w-16 h-16 text-indigo-500/30 opacity-50 transform -rotate-12" />
          <DiscordLogo className="absolute top-1/2 -translate-y-1/2 left-1/3 w-12 h-12 text-indigo-500/30 opacity-50" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* === Kolom Kiri: Teks Ajakan === */}
            <div>
              <div className="flex items-center gap-4 mb-4">
                <DiscordLogo className="w-12 h-12 text-white" />
                <h2 className="text-3xl md:text-4xl font-bold text-white">
                  Join Our <span className="font-extrabold">Discord</span>
                </h2>
              </div>
              <p className="text-indigo-200 text-lg">
                Connect with our community of gamers and developers.
              </p>
              <p className="text-indigo-200 mt-2">
                Get instant support, share experiences, and stay updated with the latest news.
              </p>
            </div>

            {/* === Kolom Kanan: Gambar/Tombol === */}
            <div className="flex justify-center md:justify-end">
                {/* Kita gunakan <a> tag agar bisa diklik dan mengarah ke link Discord */}
              <a href="https://discord.gg/YFNWrZ68Dv" target="_blank" rel="noopener noreferrer">
                <motion.img
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  src="/joinus.png"
                  alt="Join us on Discord"
                  className="w-64 h-auto cursor-pointer"
                />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Cta;
