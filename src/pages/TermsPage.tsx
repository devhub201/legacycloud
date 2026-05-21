import { useState } from "react";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";

const sections = [
  { title: "Introduction", body: "By accessing or using Legacy Cloud services, you agree to be bound by these Terms of Service. We reserve the right to update or modify these terms at any time without prior notice. Continued use of our services means you accept the updated terms." },
  { title: "Services", body: "Legacy Cloud provides game server, VPS, and web hosting services. Services are provided as-is and subject to availability." },
  { title: "User Responsibilities", body: "Users are responsible for the content hosted on their servers and for complying with all applicable laws." },
  { title: "Payments & Refunds", body: "All payments are due in advance. We offer a 72-hour money-back guarantee on new plans." },
  { title: "Prohibited Activities", body: "Hosting illegal content, running DDoS attacks, cryptocurrency mining, or any abusive activity is strictly prohibited." },
  { title: "Termination", body: "We reserve the right to suspend or terminate accounts that violate these terms without prior notice." },
  { title: "Limitation of Liability", body: "Legacy Cloud shall not be liable for any indirect, incidental, or consequential damages arising from the use of our services." },
  { title: "Changes to Terms", body: "We may revise these Terms of Service at any time. Continued use after changes constitutes acceptance." },
];

const TermsPage = () => {
  const [active, setActive] = useState(0);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="container max-w-6xl">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 tracking-tight">Terms of Service</h1>
            <p className="text-muted-foreground">Please read our terms carefully before using our services.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
            <aside className="glass-card rounded-2xl p-3 h-fit">
              {sections.map((s, i) => (
                <button
                  key={s.title}
                  onClick={() => setActive(i)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    active === i ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {i + 1}. {s.title}
                </button>
              ))}
            </aside>
            <article className="glass-card rounded-2xl p-8">
              <h2 className="font-display text-2xl font-bold mb-4">{active + 1}. {sections[active].title}</h2>
              <p className="text-muted-foreground leading-relaxed">{sections[active].body}</p>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsPage;
