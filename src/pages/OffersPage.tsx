import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tag, Sparkles } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

const OffersPage = () => {
  const [codes, setCodes] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("promo_codes").select("*").eq("active", true).order("discount_percent", { ascending: false })
      .then(({ data }) => setCodes(data ?? []));
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary mb-4">
              <Sparkles className="h-3 w-3" /> Limited Time
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-3"><span className="text-gradient">Exclusive Offers</span></h1>
            <p className="text-lg text-muted-foreground">Grab these discount codes before they're gone</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {codes.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }} className="glass-card rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl" />
                <div className="font-display text-5xl font-bold text-gradient relative">{c.discount_percent}%</div>
                <div className="text-sm text-muted-foreground mb-3 relative">OFF</div>
                <h3 className="font-display text-lg font-semibold mb-2 relative">{c.description}</h3>
                <div className="border-2 border-dashed border-primary/40 rounded-lg p-3 mb-4 bg-primary/5">
                  <div className="text-xs text-muted-foreground">Coupon Code</div>
                  <div className="font-mono font-bold text-lg text-primary flex items-center gap-2">
                    <Tag className="h-4 w-4" />{c.code}
                  </div>
                </div>
                <Link to="/plans"><Button className="w-full btn-pink">Claim Now</Button></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default OffersPage;
