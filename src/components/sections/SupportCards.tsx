import { Link } from "react-router-dom";
import { LifeBuoy, MessageCircle, HelpCircle, ArrowRight } from "lucide-react";
import { DISCORD_INVITE } from "@/data/plans";

const cards = [
  { icon: LifeBuoy, title: "Create a Ticket", desc: "Open a support ticket and get help from our team within 10 minutes.", href: "/dashboard/tickets", cta: "Open Ticket", external: false },
  { icon: MessageCircle, title: "Join Discord", desc: "Get real-time help from our community and staff on Discord.", href: DISCORD_INVITE, cta: "Join Server", external: true },
  { icon: HelpCircle, title: "Browse FAQ", desc: "Find quick answers in our knowledgebase — billing, setup, and more.", href: "/knowledgebase", cta: "Read FAQ", external: false },
];

const SupportCards = () => (
  <section className="py-20">
    <div className="container">
      <div className="text-center mb-12">
        <div className="text-xs font-semibold tracking-[0.18em] text-primary mb-3">SUPPORT</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight">
          Need <span className="text-gradient">help?</span>
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {cards.map((c) => {
          const Inner = (
            <div className="glass-card rounded-2xl p-6 hover:border-primary/50 transition-colors h-full group">
              <div className="w-12 h-12 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <c.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{c.title}</h3>
              <p className="text-sm text-muted-foreground mb-5">{c.desc}</p>
              <div className="text-sm font-semibold text-primary inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                {c.cta} <ArrowRight className="h-3.5 w-3.5" />
              </div>
            </div>
          );
          return c.external ? (
            <a key={c.title} href={c.href} target="_blank" rel="noreferrer">{Inner}</a>
          ) : (
            <Link key={c.title} to={c.href}>{Inner}</Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default SupportCards;
