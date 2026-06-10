import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type Review = { id: string; username: string; rating: number; comment: string; created_at: string };

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    supabase
      .from("reviews")
      .select("id, username, rating, comment, created_at")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => setReviews((data ?? []) as Review[]));
  }, []);

  if (reviews.length === 0) return null;

  return (
    <section className="py-20 relative">
      <div className="container">
        <div className="text-center mb-12">
          <div className="text-xs font-semibold tracking-[0.18em] text-primary mb-3">CUSTOMER VOUCHES</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Loved by <span className="text-gradient">our community.</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass-card rounded-2xl p-6 relative"
            >
              <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className={`h-4 w-4 ${idx < r.rating ? "fill-primary text-primary" : "text-muted-foreground/40"}`} />
                ))}
              </div>
              <p className="text-sm text-foreground/90 mb-5 leading-relaxed">"{r.comment}"</p>
              <div className="flex items-center justify-between text-xs">
                <div className="font-semibold text-foreground">@{r.username}</div>
                <div className="text-muted-foreground">{new Date(r.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
