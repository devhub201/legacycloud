import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import heroBg from "@/assets/hero-mc.jpg";

const AboutPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <img src={heroBg} alt="Legacy Cloud" loading="lazy" className="rounded-2xl object-cover w-full h-80" />
          <div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
              About <span className="text-gradient">Legacy Cloud</span>
            </h1>
            <p className="text-muted-foreground mb-4">
              Legacy Cloud was created with a simple goal: to provide high-performance hosting at affordable prices for everyone.
            </p>
            <p className="text-muted-foreground mb-4">
              We are a team of passionate developers and gamers who understand what you need.
            </p>
            <p className="text-muted-foreground">
              Our mission is to deliver the best performance, 24/7 support and unbeatable prices.
            </p>
          </div>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default AboutPage;
