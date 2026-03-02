import { motion } from "framer-motion";

const commonQuestions = [
  { q: "How long does setup take after purchase?", a: "Your server will be ready in under 30 seconds after payment." },
  { q: "Can I upgrade my plan later?", a: "Yes, you can upgrade or downgrade at any time with prorated billing." },
  { q: "Are there any hidden fees?", a: "No hidden fees. The price you see is the price you pay." },
];

const helpSupport = [
  { q: "My server isn't starting, what do I do?", a: "Check your server logs in the control panel or contact our support team." },
  { q: "How do I access my control panel?", a: "Go to your dashboard and click on your server to access the full control panel." },
  { q: "Can you help me install a plugin or mod?", a: "Yes! Our support team can assist with any plugin or mod installation." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="section-divider mb-12">
          <span className="text-primary text-xl">⚔</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Common Questions
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Common Questions */}
          <div>
            <h3 className="font-display text-lg font-bold text-center mb-6">Common Questions</h3>
            <div className="space-y-3">
              {commonQuestions.map((faq, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass rounded-xl neon-border group"
                >
                  <summary className="cursor-pointer font-display text-sm font-semibold p-4 hover:text-primary transition-colors list-none flex items-center justify-between">
                    {faq.q}
                    <span className="text-primary group-open:rotate-45 transition-transform text-lg">+</span>
                  </summary>
                  <p className="text-sm text-muted-foreground px-4 pb-4">{faq.a}</p>
                </motion.details>
              ))}
            </div>
          </div>

          {/* Help & Support */}
          <div>
            <h3 className="font-display text-lg font-bold text-center mb-6">Help & Support</h3>
            <div className="space-y-3">
              {helpSupport.map((faq, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="glass rounded-xl neon-border group"
                >
                  <summary className="cursor-pointer font-display text-sm font-semibold p-4 hover:text-primary transition-colors list-none flex items-center justify-between">
                    {faq.q}
                    <span className="text-primary group-open:rotate-45 transition-transform text-lg">+</span>
                  </summary>
                  <p className="text-sm text-muted-foreground px-4 pb-4">{faq.a}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-xl p-5 neon-border text-center mt-10 max-w-5xl mx-auto"
        >
          <p className="text-muted-foreground text-sm">
            We have the best support in the game, feel free to contact us for any questions you may have.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
