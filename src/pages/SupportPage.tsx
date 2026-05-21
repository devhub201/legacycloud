import { TicketCheck, MessageCircle, HelpCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import FAQ from "@/components/sections/FAQ";
import { DISCORD_INVITE } from "@/data/plans";

const cards = [
  { icon: TicketCheck, title: "Create Ticket", desc: "Open a support ticket and get help", href: DISCORD_INVITE },
  { icon: MessageCircle, title: "Join Discord", desc: "Join our Discord server for faster support", href: DISCORD_INVITE },
  { icon: HelpCircle, title: "FAQ", desc: "Find answers to common questions", href: "#faq" },
];

const SupportPage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-28 pb-20">
      <div className="container max-w-5xl">
        <div className="text-center mb-10">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 tracking-tight">
            We're Here <span className="text-gradient">To Help</span>
          </h1>
          <p className="text-muted-foreground">Get support for any issues you face</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {cards.map((c) => (
            <a
              key={c.title}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="glass-card rounded-2xl p-6 hover:border-primary/60 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-1">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{c.desc}</p>
              <div className="text-xs text-primary flex items-center gap-1 group-hover:gap-2 transition-all">
                Open <ArrowRight className="h-3 w-3" />
              </div>
            </a>
          ))}
        </div>

        <FAQ />
      </div>
    </main>
    <Footer />
  </div>
);

export default SupportPage;
