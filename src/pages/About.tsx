import { DISCORD } from "@/data/plans";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-6 pt-16 pb-24">
      <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">About <span className="text-gradient-blossom">Legacy Cloud</span></h1>
      <div className="space-y-5 text-muted-foreground leading-relaxed">
        <p>
          Legacy Cloud started the way most good things in Minecraft do — a few friends, one laggy server,
          and a stubborn refusal to accept 5 TPS. We rented better hardware, tuned it obsessively, and other
          players started asking if they could host with us too.
        </p>
        <p>
          Today we run Ryzen 9 nodes with DDR5 memory and enterprise NVMe across four regions, hosting
          thousands of Minecraft servers and VPS instances. The pricing stays honest (₹15/GB is not a
          promo trick), and the support stays human.
        </p>
        <p>
          Our promise is simple: fast hardware, no hidden fees, no oversold nodes, and a real person on
          Discord whenever something breaks.
        </p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 my-12">
        {[
          { n: "2021", l: "Founded" },
          { n: "2,800+", l: "Servers hosted" },
          { n: "30+", l: "Countries served" },
        ].map((s) => (
          <div key={s.l} className="glass rounded-2xl p-5 text-center">
            <div className="text-2xl font-bold text-gradient-blossom">{s.n}</div>
            <div className="text-xs text-muted-foreground mt-1">{s.l}</div>
          </div>
        ))}
      </div>

      <a href={DISCORD} target="_blank" rel="noreferrer"
        className="inline-block grad-btn text-primary-foreground font-medium px-6 py-3 rounded-xl">
        Join our community
      </a>
    </div>
  );
}
