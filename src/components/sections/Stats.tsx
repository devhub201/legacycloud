const stats = [
  { value: "12,000+", label: "Active Servers" },
  { value: "99.99%", label: "Uptime SLA" },
  { value: "8", label: "Global Regions" },
  { value: "24/7", label: "Support" },
];

const Stats = () => (
  <section className="py-16 border-y border-border bg-card/30">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl md:text-4xl font-bold text-gradient mb-1">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
