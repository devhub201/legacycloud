import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";

type Article = { id: string; slug: string; title: string; category: string | null; excerpt: string | null };

const KbPreview = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    supabase.from("kb_articles")
      .select("id, slug, title, category, excerpt")
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(4)
      .then(({ data }) => setArticles((data ?? []) as Article[]));
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-20">
      <div className="container">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold tracking-[0.18em] text-primary mb-2">KNOWLEDGEBASE</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">
              Latest <span className="text-gradient">guides</span>
            </h2>
          </div>
          <Link to="/knowledgebase"><Button variant="outline" className="border-primary/40 hover:bg-primary/10">Browse all <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {articles.map((a) => (
            <Link key={a.id} to={`/knowledgebase/${a.slug}`} className="glass-card rounded-2xl p-5 hover:border-primary/50 transition-colors group">
              <BookOpen className="h-5 w-5 text-primary mb-3" />
              {a.category && <div className="text-[10px] uppercase tracking-wider text-primary mb-2 font-semibold">{a.category}</div>}
              <h3 className="font-display font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">{a.title}</h3>
              {a.excerpt && <p className="text-xs text-muted-foreground line-clamp-3">{a.excerpt}</p>}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KbPreview;
