import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Services from "@/components/sections/Services";
import Pricing from "@/components/sections/Pricing";
import Features from "@/components/sections/Features";
import DiscordCTA from "@/components/sections/DiscordCTA";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Services />
        <Pricing />
        <Features />
        <DiscordCTA />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
