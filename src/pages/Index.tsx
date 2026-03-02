import ParticleBackground from "@/components/landing/ParticleBackground";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import PricingSection from "@/components/landing/PricingSection";
import LocationsSection from "@/components/landing/LocationsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import BlogSection from "@/components/landing/BlogSection";
import FAQSection from "@/components/landing/FAQSection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <FeaturesSection />
        <PricingSection />
        <LocationsSection />
        <TestimonialsSection />
        <BlogSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
