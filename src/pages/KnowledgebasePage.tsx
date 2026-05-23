import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Search, ChevronRight } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const KnowledgebasePage = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    supabase.from("kb_articles").select("*").eq("published", true).order("category")
      .then(({ data }) => setArticles(data ?? []));
  }, []);

  const filtered = articles.filter(a => !q || a.title.toLowerCase().includes(q.toLowerCase()));
  const grouped = filtered.reduce((acc: any, a) => { (acc[a.category] ??= []).push(a); return acc; }, {});

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container max-w-5xl">
          <div className="text-center mb-10">
            <BookOpen className="h-10 w-10 text-primary mx-auto mb-3" />
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Knowledge<span className="text-gradient">base</span></h1>
            <p className="text-muted-foreground mb-6">Setup guides, tutorials, and FAQs</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search articles..." className="pl-10 h-12" />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {Object.entries(grouped).map(([cat, arts]: any) => (
              <div key={cat} className="glass-card rounded-2xl p-5">
                <h3 className="font-display text-lg font-semibold mb-3 text-primary">{cat}</h3>
                <div className="space-y-1">
                  {arts.map((a: any) => (
                    <Link key={a.id} to={`/kb/${a.slug}`} className="flex items-center justify-between p-2 rounded-lg hover:bg-primary/5 group">
                      <div>
                        <div className="text-sm font-medium">{a.title}</div>
                        <div className="text-xs text-muted-foreground">{a.excerpt}</div>
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default KnowledgebasePage;
