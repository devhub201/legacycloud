const SECTIONS = [
  { h: "1. Acceptance", p: "By ordering any Legacy Cloud service you agree to these terms. If you do not agree, do not use our services." },
  { h: "2. Service Usage", p: "You are responsible for all content and activity on your server. Illegal content, botnets, DDoS tooling, crypto mining on Minecraft plans, and spam are prohibited." },
  { h: "3. Billing", p: "Services are billed monthly in advance. Renewal invoices are issued before the due date; unpaid services are suspended after 3 days and deleted after 7 days." },
  { h: "4. Refunds", p: "We offer refunds within 24 hours of a first purchase if the service is unusable due to our fault. Renewals and abuse-related terminations are non-refundable." },
  { h: "5. Resource Fairness", p: "Plans include the listed CPU allocation. Sustained abuse that degrades other customers may be throttled after we contact you." },
  { h: "6. Uptime", p: "We target 99.9% monthly uptime excluding scheduled maintenance, which is announced in Discord in advance." },
  { h: "7. Termination", p: "We may suspend or terminate services that violate these terms. You may cancel anytime; service runs until the end of the paid period." },
  { h: "8. Changes", p: "These terms may be updated. Material changes will be announced in our Discord server." },
];

export default function Tos() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
      <h1 className="font-display text-4xl font-bold mb-3">Terms of <span className="text-gradient-blossom">Service</span></h1>
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
