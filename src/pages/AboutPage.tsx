import ParticleBackground from "@/components/landing/ParticleBackground";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="section-divider mb-12">
            <span className="text-primary text-xl">⚔</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass rounded-xl p-8 md:p-12 neon-border max-w-4xl mx-auto"
          >
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">About Legacy Cloud</h1>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">🚀 Who We Are</h3>
                <p>We're a passionate squad of Minecraft fans, developers, and server pros who believe hosting should be a breeze! Our mission? To provide players and creators with powerful tools to build mind-blowing worlds — no lag, no limits, and definitely no headaches.</p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">💡 Why We Started</h3>
                <p>We've been there — running our own Minecraft communities and facing overpriced, underwhelming hosts. So we decided to change the game by offering reliable, high-performance servers, real-time support, and prices that won't break the bank.</p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">🎮 What We Offer</h3>
                <p>Whether you're a newbie or a seasoned pro, we have hosting plans to fit your needs. From easy-to-use panels to full mod and plugin support, instant setup, and global server locations — every plan comes with DDoS protection, automated backups, and top-tier support.</p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">❤️ Our Commitment</h3>
                <p>We're more than just another hosting company — we're part of the Minecraft community. Whether you're running your first survival server or launching the next big network, we've got your back. Our team is always working to improve your experience, keeping performance and uptime top-notch.</p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">✨ Let's Build Together</h3>
                <p>Join thousands of players who trust our platform to bring their Minecraft worlds to life. Ready to start? Choose your perfect plan and join a community that's all about building better — block by block!</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
