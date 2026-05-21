import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import Stats from "@/components/sections/Stats";
import PlanCard from "@/components/PlanCard";
import DiscordCTA from "@/components/sections/DiscordCTA";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import { budgetMcPlans } from "@/data/plans";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main>
      <Hero />
      <Features />
      <Stats />

      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-3 tracking-tight">
              Popular <span className="text-gradient">Minecraft Plans</span>
            </h2>
            <p className="text-muted-foreground">Budget MC tier — best value, instant deploy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {budgetMcPlans.slice(0, 4).map((p, i) => <PlanCard key={p.name} plan={p} index={i} />)}
          </div>
          <div className="text-center mt-10">
            <Link to="/plans">
              <Button size="lg" className="btn-pink ring-glow group">
                View All Plans
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <DiscordCTA />
      <FAQ />
    </main>
    <Footer />
  </div>
);

export default Index;
