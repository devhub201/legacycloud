import { motion } from "framer-motion";
import { Zap, Headphones, Tag, Shield } from "lucide-react";

const features = [
  { icon: Zap, title: "Ultra Fast", desc: "Blazing fast NVMe storage for the best performance." },
  { icon: Headphones, title: "24/7 Support", desc: "Our support team is always here to help you anytime." },
  { icon: Tag, title: "Cheap Pricing", desc: "Best performance at the most affordable prices." },
  { icon: Shield, title: "DDoS Protection", desc: "Enterprise level DDoS protection for your peace of mind." },
];

const Features = () => (
  <section id="features" className="py-20">
    <div className="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-colors text-center"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-4">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="font-display text-lg font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
