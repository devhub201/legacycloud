import { Link } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { DISCORD_INVITE } from "@/data/plans";

const AuthPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container max-w-md">
        <div className="glass-card rounded-2xl p-8 text-center">
          <h1 className="font-display text-3xl font-bold mb-3 tracking-tight">
            Client <span className="text-gradient">Area</span>
          </h1>
          <p className="text-muted-foreground mb-6 text-sm">
            Login, dashboard, billing aur server management abhi setup ho raha hai.
            Jab tak, apna order place karne ke liye Discord pe contact karein.
          </p>
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer">
            <Button className="btn-pink ring-glow w-full">Join Discord to Order</Button>
          </a>
          <Link to="/" className="block mt-4 text-xs text-muted-foreground hover:text-primary">
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default AuthPage;
