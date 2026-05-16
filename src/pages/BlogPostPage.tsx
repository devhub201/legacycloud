import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import ParticleBackground from "@/components/landing/ParticleBackground";
import Navbar from "@/components/landing/Navbar";
import Footer from "@/components/landing/Footer";

const posts: Record<string, { tag: string; title: string; desc: string; content: string; date: string; author: string }> = {
  "choosing-the-right-plan": {
    tag: "Minecraft Host",
    title: "Choosing the Right Plan for Your Minecraft Server",
    desc: "Choosing the Right Minecraft Server Plan: What You Need to Know",
    date: "March 1, 2026",
    author: "Legacy Cloud Team",
    content: `When it comes to hosting a Minecraft server, picking the right plan can make or break your experience. Whether you're running a small survival world with friends or a massive modded server with dozens of players, understanding your needs is the first step.

**RAM Matters Most**
RAM is the single most important resource for a Minecraft server. Vanilla servers with 5-10 players can run smoothly on 2-4GB, but modded servers (especially modpacks like RLCraft or All The Mods) need 6-8GB minimum. If you're running a large community server with 50+ players, consider 12GB or more.

**CPU Performance**
Not all CPUs are created equal. Minecraft is heavily single-threaded, so clock speed matters more than core count. Our servers run on Ryzen 9 7900x processors clocked at 5.6GHz, ensuring buttery-smooth tick rates even under heavy load.

**Storage Type**
Always choose SSD storage over HDD. The difference in chunk loading speed and world save times is night and day. All our plans include NVMe SSD storage for the fastest possible performance.

**Network & Location**
Pick a server location closest to your player base. We offer locations in EU, NA, SA, and EUW regions, all with 1000Mbps uplinks and sub-10ms response times.

**Our Recommendation**
- **1-5 players, vanilla**: Dirt or Cobblestone plan
- **5-15 players, light mods**: Iron or Redstone plan
- **15-30 players, heavy mods**: Gold or Diamond plan
- **30+ players, large networks**: Netherite or Beacon plan`,
  },
  "speed-up-your-server": {
    tag: "Minecraft Host",
    title: "Speed Up Your Minecraft Server With Us",
    desc: "How to Boost Your Minecraft Server Performance (Without Breaking the Bank)",
    date: "February 25, 2026",
    author: "Legacy Cloud Team",
    content: `Nobody likes lag. Whether it's rubber-banding, slow chunk loading, or TPS drops, server performance issues can ruin the Minecraft experience. Here's how to keep your server running at peak performance.

**Optimize Your Server Software**
Switch from vanilla to Paper or Purpur for significant performance improvements. These forks include dozens of optimizations that reduce lag without changing gameplay.

**Pre-generate Your World**
One of the biggest causes of lag is generating new chunks on the fly. Use a plugin like Chunky to pre-generate your world before players explore it.

**Manage Your Plugins**
Every plugin adds overhead. Audit your plugin list regularly and remove anything you're not actively using. Some poorly coded plugins can tank your TPS single-handedly.

**Configure Your Server Properly**
Tweak your server.properties and spigot/paper config files. Key settings include:
- Reduce view-distance to 8-10 chunks
- Set simulation-distance to 6-8 chunks
- Enable async chunk loading

**Upgrade When Needed**
If you've optimized everything and still have issues, it might be time to upgrade your plan. More RAM and CPU cores can handle more players and more complex worlds.

**Why Legacy Cloud?**
Our infrastructure is built specifically for Minecraft. With Ryzen 9 7900x processors, NVMe SSDs, and 1000Mbps uplinks, we deliver the raw performance your server needs.`,
  },
  "top-5-plugins": {
    tag: "Minecraft Host",
    title: "Top 5 Must-Have Plugins For Your Server",
    desc: "5 Plugins Every Minecraft Server Should Have in 2026",
    date: "February 18, 2026",
    author: "Legacy Cloud Team",
    content: `Running a Minecraft server without plugins is like driving a car without a dashboard. These five essential plugins will transform your server from basic to brilliant.

**1. EssentialsX**
The Swiss Army knife of Minecraft plugins. EssentialsX provides over 130 commands including teleportation, homes, kits, economy, and player management. It's the foundation every server needs.

**2. LuckPerms**
The gold standard for permissions management. LuckPerms lets you create complex permission hierarchies with an intuitive web editor. Grant specific abilities to different player ranks with ease.

**3. WorldGuard + WorldEdit**
This dynamic duo gives you complete control over your world. WorldEdit lets you make massive terrain changes in seconds, while WorldGuard protects regions from griefing and sets custom flags.

**4. Vault**
Vault is a permissions and economy API that bridges the gap between plugins. It allows different plugins to share economy data and permissions systems seamlessly.

**5. CoreProtect**
The ultimate anti-grief tool. CoreProtect logs every block placement, break, and interaction. If someone griefs your server, you can roll back their changes with a single command.

**Bonus: Performance Plugins**
- **Spark** — Real-time profiling to identify lag sources
- **ClearLag** — Automatically removes ground items and entities

All of these plugins work flawlessly on our hosting plans. One-click install available on most plans!`,
  },
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const post = slug ? posts[slug] : null;

  if (!post) {
    return (
      <div className="min-h-screen bg-background relative">
        <ParticleBackground />
        <Navbar />
        <main className="relative z-10 pt-24 pb-16 container mx-auto px-4 text-center">
          <h1 className="font-display text-3xl font-bold mb-4">Post Not Found</h1>
          <Link to="/">
            <Button className="bg-primary hover:bg-primary/80 box-glow font-display text-primary-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/#blog" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
              <ArrowLeft className="h-4 w-4" /> Back to blog
            </Link>

            <div className="glass rounded-xl p-8 neon-border">
              <div className="flex flex-wrap items-center gap-4 mb-6 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Tag className="h-3 w-3 text-primary" />{post.tag}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{post.date}</span>
                <span className="flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
              </div>

              <h1 className="font-display text-2xl md:text-4xl font-bold mb-4">{post.title}</h1>
              <p className="text-muted-foreground mb-8">{post.desc}</p>

              <div className="prose prose-invert max-w-none">
                {post.content.split("\n\n").map((paragraph, i) => {
                  if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
                    return <h3 key={i} className="font-display text-lg font-bold text-foreground mt-6 mb-2">{paragraph.replace(/\*\*/g, "")}</h3>;
                  }
                  if (paragraph.startsWith("- ")) {
                    return (
                      <ul key={i} className="space-y-1 mb-4">
                        {paragraph.split("\n").map((line, j) => (
                          <li key={j} className="text-muted-foreground text-sm flex items-start gap-2">
                            <span className="text-primary mt-1">•</span>
                            <span>{line.replace(/^- /, "").replace(/\*\*/g, "")}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  // Handle inline bold
                  const parts = paragraph.split(/\*\*(.*?)\*\*/g);
                  return (
                    <p key={i} className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-foreground font-semibold">{part}</strong> : part)}
                    </p>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPostPage;
