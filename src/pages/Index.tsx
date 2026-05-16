import ParticleBackground from "@/components/landing/ParticleBackground";
import PromoBanner from "@/components/landing/PromoBanner";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import ServerStatusWidget from "@/components/landing/ServerStatusWidget";
import FeaturesSection from "@/components/landing/FeaturesSection";
import ServicesSection from "@/components/landing/ServicesSection";
import PricingSection from "@/components/landing/PricingSection";
import ComparisonSection from "@/components/landing/ComparisonSection";
import DiscordCTA from "@/components/landing/DiscordCTA";
import LocationsSection from "@/components/landing/LocationsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import KnowledgeBaseSection from "@/components/landing/KnowledgeBaseSection";
import BlogSection from "@/components/landing/BlogSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <PromoBanner />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <ServerStatusWidget />
        <FeaturesSection />
        <ServicesSection />
        <PricingSection />
        <ComparisonSection />
        <DiscordCTA />
        <LocationsSection />
        <TestimonialsSection />
        <KnowledgeBaseSection />
        <BlogSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
