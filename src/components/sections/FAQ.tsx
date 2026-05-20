import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { q: "How quickly is my server deployed?", a: "Every service provisions in under 60 seconds. You'll receive credentials immediately after checkout." },
  { q: "Do you offer refunds?", a: "Yes — 72-hour money-back guarantee on all new plans, no questions asked." },
  { q: "Can I upgrade my plan later?", a: "Absolutely. Upgrades are instant and prorated. Downgrades take effect on your next billing cycle." },
  { q: "What payment methods do you accept?", a: "We accept all major cards, PayPal, UPI, and cryptocurrency through our Discord checkout flow." },
  { q: "Is DDoS protection really free?", a: "Yes. Enterprise-grade Layer 3/4/7 protection is included on every plan at no extra cost." },
  { q: "How do I get support?", a: "Open a ticket in our Discord — average first response is under 5 minutes, 24/7." },
];

const FAQ = () => (
  <section id="faq" className="py-24">
    <div className="container max-w-3xl">
      <div className="text-center mb-12">
        <div className="text-sm font-medium text-primary mb-3">FAQ</div>
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 tracking-tight">
          Questions, answered.
        </h2>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="text-left font-display font-medium hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
