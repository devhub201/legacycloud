import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const posts = [
  {
    tag: "Minecraft Host",
    title: "Choosing the Right Plan for Your Minecraft Server",
    desc: "Choosing the Right Minecraft Server Plan: What You Need to Know",
    slug: "choosing-the-right-plan",
  },
  {
    tag: "Minecraft Host",
    title: "Speed Up Your Minecraft Server With Us",
    desc: "How to Boost Your Minecraft Server Performance (Without Breaking the Bank)",
    slug: "speed-up-your-server",
  },
  {
    tag: "Minecraft Host",
    title: "Top 5 Must-Have Plugins For Your Server",
    desc: "5 Plugins Every Minecraft Server Should Have in 2026",
    slug: "top-5-plugins",
  },
];

const BlogSection = () => {
  return (
    <section id="blog" className="relative py-24">
      <div className="container mx-auto px-4">
        <div className="section-divider mb-12">
          <span className="text-primary text-xl">⚔</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div
              key={post.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-xl overflow-hidden neon-border transition-shadow hover:box-glow"
            >
              {/* Placeholder image area */}
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/10 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-primary/5" />
                <Badge className="bg-background text-foreground border-border">{post.tag}</Badge>
              </div>
              <div className="p-5">
                <p className="text-primary text-xs font-semibold mb-1">Blog post</p>
                <h3 className="font-display text-sm font-bold mb-2">{post.title}</h3>
                <p className="text-xs text-muted-foreground mb-4">{post.desc}</p>
                <Link to={`/blog/${post.slug}`}>
                  <Button size="sm" className="bg-primary hover:bg-primary/80 box-glow font-display text-primary-foreground">
                    Learn More <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
