const SECTIONS = [
  { h: "Information we collect", p: "Account details (name, email, Discord ID), billing records from our payment providers, and technical logs such as IP addresses and panel activity." },
  { h: "How we use it", p: "To provision and support your services, prevent abuse and fraud, send service notices, and comply with legal obligations." },
  { h: "What we never do", p: "We do not sell your data, and we do not read your server files except when you ask us to for support." },
  { h: "Payments", p: "Card and UPI details are processed by PCI-compliant providers. We never store full payment credentials on our systems." },
  { h: "Retention", p: "Account and billing records are kept as long as legally required. Server data is deleted 7 days after service termination." },
  { h: "Your rights", p: "You can request a copy or deletion of your personal data anytime by contacting support@legacycloud.fun." },
];

export default function Privacy() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
      <h1 className="font-display text-4xl font-bold mb-3">Privacy <span className="text-gradient-blossom">Policy</span></h1>
      <p className="text-sm text-muted-foreground mb-10">Last updated: July 2026</p>
      <div className="space-y-6">
        {SECTIONS.map((s) => (
          <section key={s.h}>
            <h2 className="font-display font-semibold text-lg mb-2">{s.h}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.p}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
