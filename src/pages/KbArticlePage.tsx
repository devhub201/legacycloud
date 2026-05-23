import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { supabase } from "@/integrations/supabase/client";

const KbArticlePage = () => {
  const { slug } = useParams();
  const [a, setA] = useState<any>(null);
  useEffect(() => {
    if (!slug) return;
    supabase.from("kb_articles").select("*").eq("slug", slug).maybeSingle().then(({ data }) => setA(data));
  }, [slug]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container max-w-3xl">
          <Link to="/knowledgebase" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to Knowledgebase
          </Link>
          {a ? (
            <article className="glass-card rounded-2xl p-6 md:p-10">
              <div className="text-xs text-primary font-medium mb-2">{a.category}</div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{a.title}</h1>
              <div className="text-muted-foreground mb-6">{a.excerpt}</div>
              <div className="prose prose-invert max-w-none whitespace-pre-wrap text-sm leading-relaxed">{a.content}</div>
            </article>
          ) : (
            <div className="text-center py-20"><BookOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" /><p className="text-muted-foreground">Loading...</p></div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default KbArticlePage;
