import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Review = { id: string; username: string; rating: number; comment: string; created_at: string };

const PAGE_SIZE = 6;
type Sort = "newest" | "oldest" | "rating_high" | "rating_low";

const SORT_MAP: Record<Sort, { col: "created_at" | "rating"; asc: boolean }> = {
  newest: { col: "created_at", asc: false },
  oldest: { col: "created_at", asc: true },
  rating_high: { col: "rating", asc: false },
  rating_low: { col: "rating", asc: true },
};

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [sort, setSort] = useState<Sort>("newest");

  useEffect(() => {
    const { col, asc } = SORT_MAP[sort];
    const from = page * PAGE_SIZE;
    const to = from + PAGE_SIZE - 1;
    supabase
      .from("reviews")
      .select("id, username, rating, comment, created_at", { count: "exact" })
      .eq("is_approved", true)
      .order(col, { ascending: asc })
      .range(from, to)
      .then(({ data, count }) => {
        setReviews((data ?? []) as Review[]);
        setCount(count ?? 0);
      });
  }, [page, sort]);

  if (count === 0 && page === 0) return null;
  const totalPages = Math.max(1, Math.ceil(count / PAGE_SIZE));

  return (
    <section className="py-20 relative">
      <div className="container">
        <div className="text-center mb-10">
          <div className="text-xs font-semibold tracking-[0.18em] text-primary mb-3">CUSTOMER VOUCHES</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
            Loved by <span className="text-gradient">our community.</span>
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="text-sm text-muted-foreground">{count} review{count === 1 ? "" : "s"}</div>
          <Select value={sort} onValueChange={(v) => { setSort(v as Sort); setPage(0); }}>
            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="rating_high">Highest rated</SelectItem>
              <SelectItem value="rating_low">Lowest rated</SelectItem>
            </SelectContent>
          </Select>
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

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-3 mt-8">
            <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage((p) => p - 1)}>
              <ChevronLeft className="h-4 w-4 mr-1" /> Prev
            </Button>
            <div className="text-sm text-muted-foreground">Page {page + 1} of {totalPages}</div>
            <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage((p) => p + 1)}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Reviews;
