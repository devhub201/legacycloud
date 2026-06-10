import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Features from "@/components/sections/Features";
import PopularPlans from "@/components/sections/PopularPlans";
import LiveStats from "@/components/sections/LiveStats";
import WhyChoose from "@/components/sections/WhyChoose";
import Locations from "@/components/sections/Locations";
import Reviews from "@/components/sections/Reviews";
import StatusPreview from "@/components/sections/StatusPreview";
import ActiveOffers from "@/components/sections/ActiveOffers";
import DiscordCommunity from "@/components/sections/DiscordCommunity";
import KbPreview from "@/components/sections/KbPreview";
import SupportCards from "@/components/sections/SupportCards";
import Footer from "@/components/sections/Footer";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <main>
      <Hero />
      <Features />
      <PopularPlans />
      <LiveStats />
      <WhyChoose />
      <Locations />
      <Reviews />
      <StatusPreview />
      <ActiveOffers />
      <DiscordCommunity />
      <KbPreview />
      <SupportCards />
    </main>
    <Footer />
  </div>
);

export default Index;
