import ParticleBackground from "@/components/landing/ParticleBackground";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";
import { motion } from "framer-motion";

const TermsPage = () => {
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
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-8">Terms Of Service</h1>

            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">1. Introduction</h3>
                <p>Welcome to our Minecraft Hosting Service. By using our services, you agree to be bound by the following Terms of Service, including our Refund Policy and Privacy Policy. Please read them carefully before placing an order or using our platform.</p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">2. Use of Services</h3>
                <p>Our hosting services are intended for Minecraft server hosting only. You agree not to use our services for any illegal activities, to host malicious content, or to abuse system resources. We reserve the right to suspend or terminate your service at any time for violating our terms.</p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">3. Uptime and Performance</h3>
                <p>We strive to maintain high uptime and server performance. However, we do not guarantee 100% uptime and are not responsible for outages caused by third-party providers, DDoS attacks, or scheduled maintenance. We will notify you of any expected downtime in advance whenever possible.</p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">4. Payments and Subscriptions</h3>
                <p>All services are prepaid. You are responsible for renewing your service on time to avoid suspension. If your payment fails or your invoice remains unpaid, your server may be suspended or deleted after a grace period. We accept major payment methods and secure all transactions.</p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">5. Refund Policy</h3>
                <p>We offer a 48-hour refund window from the time of purchase, no questions asked. Refunds requested after 48 hours are not guaranteed. Refunds are only provided for the initial order, not for renewals or upgrades. Abuse of our refund policy may result in a permanent ban from our platform.</p>
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-foreground mb-2">6. Privacy Policy</h3>
                <p>We respect your privacy. Any personal data you provide (such as your email, billing info, and IP address) is used solely for account management and service delivery. We do not sell or share your data with third parties.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
