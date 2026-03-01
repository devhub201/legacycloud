import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { q: "How fast can I get my server running?", a: "Your Minecraft server will be ready in under 30 seconds after payment. Just pick your plan, choose your server version, and you're live." },
  { q: "Do you support modpacks?", a: "Yes! We support Forge, Fabric, Paper, Spigot, and hundreds of popular modpacks like RLCraft, All The Mods, and Pixelmon. Install them with one click." },
  { q: "What kind of DDoS protection do you offer?", a: "We provide enterprise-grade DDoS mitigation that filters malicious traffic in real-time, keeping your server online even during attacks." },
  { q: "Can I upgrade my plan later?", a: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect immediately and billing is prorated." },
  { q: "Do you offer refunds?", a: "We offer a 48-hour money-back guarantee. If you're not satisfied, contact support for a full refund." },
  { q: "How do backups work?", a: "Backups are automatic. Starter plans get daily backups, Pro gets hourly, and Ultimate/Enterprise get real-time backups. Restore with one click." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">FAQ</span>
          </h2>
          <p className="text-muted-foreground text-lg">Common questions about our hosting</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass rounded-xl p-6 neon-border"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border/30">
                <AccordionTrigger className="font-display text-sm hover:no-underline hover:text-neon-purple transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
