import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  Rocket, Zap, Shield, Clock, Cpu, HardDrive, MemoryStick, Globe,
  Server, Sparkles, CheckCircle2, ExternalLink, Loader2, Copy, Gift,
  Users, Headphones, Database, Lock, BarChart3, RefreshCw,
} from "lucide-react";

const features = [
  { icon: Zap, title: "Instant Setup", desc: "Server live in under 60 seconds. No queue." },
  { icon: Cpu, title: "Ryzen 9 CPUs", desc: "High clock-speed cores for buttery TPS." },
  { icon: HardDrive, title: "NVMe SSD", desc: "Lightning fast world loading & chunk gen." },
  { icon: Globe, title: "Global Anycast", desc: "DDoS-protected network, low ping worldwide." },
  { icon: Shield, title: "Free DDoS Protection", desc: "L3/L4/L7 mitigation on every server." },
  { icon: Database, title: "Free MySQL DB", desc: "1 database included for plugins & data." },
  { icon: Server, title: "Pterodactyl Panel", desc: "Industry-standard control panel UI." },
  { icon: RefreshCw, title: "1-Click Modpack Install", desc: "Paper, Forge, Fabric, Vanilla, Bedrock." },
  { icon: BarChart3, title: "Live Resource Graphs", desc: "Real-time RAM/CPU/Network monitoring." },
  { icon: Lock, title: "SFTP Access", desc: "Full file access with secure credentials." },
  { icon: Headphones, title: "24/7 Discord Support", desc: "Active community + staff on standby." },
  { icon: Clock, title: "1.5 Month Free", desc: "No credit card. No catch. Just play." },
];

const benefits = [
  "2GB DDR4 RAM",
  "4GB NVMe SSD Storage",
  "40% Ryzen CPU thread",
  "1 MySQL Database",
  "2 Daily Backup Slots",
  "Unlimited Player Slots",
  "Plugin & Mod Support",
  "Subdomain included",
  "Full Pterodactyl Access",
];

const STATUS: Record<string, { label: string; cls: string }> = {
  queued:   { label: "Queued",       cls: "bg-blue-500/20 text-blue-300 border-blue-500/40" },
  creating: { label: "Provisioning…", cls: "bg-amber-500/20 text-amber-300 border-amber-500/40 animate-pulse" },
  active:   { label: "Active",        cls: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40" },
  failed:   { label: "Failed",        cls: "bg-rose-500/20 text-rose-300 border-rose-500/40" },
  expired:  { label: "Expired",       cls: "bg-zinc-500/20 text-zinc-300 border-zinc-500/40" },
};

export default function FreePanelPage() {
  const { user } = useAuth();
  const nav = useNavigate();
  const [claim, setClaim] = useState<any>(null);
  const [settings, setSettings] = useState<any>(null);
  const [todayCount, setTodayCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  const refresh = async () => {
    const [{ data: s }, { count }] = await Promise.all([
      supabase.from("free_panel_settings").select("*").eq("id", 1).maybeSingle(),
      supabase.from("free_panel_claims").select("*", { count: "exact", head: true })
        .gte("created_at", new Date(Date.now() - 86400000).toISOString()),
    ]);
    setSettings(s);
    setTodayCount(count ?? 0);
    if (user) {
      const { data } = await supabase.from("free_panel_claims").select("*")
        .eq("user_id", user.id)
        .in("status", ["queued", "creating", "active", "failed"])
        .order("created_at", { ascending: false }).limit(1).maybeSingle();
      setClaim(data);
    }
    setChecking(false);
  };

  useEffect(() => { refresh(); /* eslint-disable-next-line */ }, [user]);

  useEffect(() => {
    if (claim?.status !== "creating" && claim?.status !== "queued") return;
    const t = setInterval(refresh, 3000);
    return () => clearInterval(t);
    // eslint-disable-next-line
  }, [claim?.status]);

  const handleClaim = async () => {
    if (!user) {
      toast.info("Please sign in to claim your free server.");
      return nav("/login?next=/free-panel");
    }
    if (claim?.status === "active") {
      toast.success("You already have an active free server below ↓");
      document.getElementById("claim-status")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    if (settings && !settings.enabled) return toast.error("Free server claims are currently paused.");
    if (settings && todayCount >= settings.daily_quota) return toast.error("Today's free server quota is full. Try again tomorrow!");

    setLoading(true);
    const { data, error } = await supabase.functions.invoke("claim-free-server");
    setLoading(false);
    const errMsg = data?.error || error?.message;
    if (errMsg) { toast.error(errMsg); refresh(); return; }
    setClaim(data.claim);
    if (data.alreadyClaimed) toast.info("You already have a free server!");
    else if (data.claim?.status === "active") toast.success("🎉 Server created! Login details are below.");
    else toast.success("Provisioning started — your server will be ready shortly.");
  };

  const copy = (t: string) => { navigator.clipboard.writeText(t); toast.success("Copied"); };

  const claimsLeft = settings ? Math.max(0, settings.daily_quota - todayCount) : null;
  const quotaFull = settings && todayCount >= settings.daily_quota;
  const claimsDisabled = settings && !settings.enabled;
  const buttonDisabled = loading || checking || (!claim?.status && (claimsDisabled || quotaFull));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_30%_20%,rgba(233,30,99,0.18),transparent_60%)]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_80%_70%,rgba(168,85,247,0.12),transparent_55%)]" />
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Badge className="mb-5 bg-primary/15 text-primary border-primary/30 px-3 py-1">
            <Gift className="h-3 w-3 mr-1.5" /> 100% Free Forever Plan
          </Badge>
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Launch Your Minecraft Server <span className="text-gradient">For Free</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Free 2GB RAM Pterodactyl Minecraft server — instant setup, full panel access, no credit card. Built for creators, friends, and small communities.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" onClick={handleClaim} disabled={buttonDisabled} className="btn-pink ring-glow h-12 px-8">
              {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Rocket className="h-4 w-4 mr-2" />}
              {claimsDisabled ? "Claims Paused"
                : quotaFull && !claim ? "Quota Full — Try Tomorrow"
                : claim?.status === "active" ? "View My Free Server"
                : claim?.status === "creating" ? "Provisioning…"
                : "Claim Free Server"}
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8">
              <Link to="/plans">Upgrade to Paid <Sparkles className="h-4 w-4 ml-2" /></Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> No credit card</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Instant activation</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-emerald-400" /> Full Pterodactyl</span>
          </div>
          {claimsLeft !== null && !claim && (
            <div className="mt-6 text-xs text-muted-foreground">
              {claimsDisabled ? "Free claims are paused — check back soon."
                : quotaFull ? "Today's quota is full — try again tomorrow."
                : `${claimsLeft} free server${claimsLeft === 1 ? "" : "s"} left today`}
            </div>
          )}
        </div>
      </section>

      {/* Claim status */}
      {claim && (
        <section id="claim-status" className="container mx-auto px-4 pb-12">
          <div className="glass-card rounded-2xl p-6 max-w-3xl mx-auto ring-glow">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                {claim.status === "active" ? <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                  : claim.status === "failed" ? <Shield className="h-5 w-5 text-rose-400" />
                  : <Loader2 className="h-5 w-5 text-amber-400 animate-spin" />}
                <h3 className="font-display text-xl font-semibold">
                  {claim.status === "active" ? "Your Free Server is Live"
                   : claim.status === "failed" ? "Provisioning Failed"
                   : "Provisioning Your Server"}
                </h3>
              </div>
              <Badge variant="outline" className={STATUS[claim.status]?.cls}>
                {STATUS[claim.status]?.label ?? claim.status}
              </Badge>
            </div>

            {(claim.status === "creating" || claim.status === "queued") && (
              <p className="text-sm text-muted-foreground mb-4">
                Sit tight — your server is being built. This usually takes under 60 seconds. Status updates automatically.
              </p>
            )}
            {claim.status === "failed" && (
              <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-sm text-rose-200">
                {claim.error_message || "Something went wrong creating your server."} Please try again or contact support on Discord.
                <Button onClick={handleClaim} size="sm" className="btn-pink mt-3 w-full sm:w-auto">Retry</Button>
              </div>
            )}

            {claim.status === "active" && (
              <>
                <div className="grid sm:grid-cols-2 gap-4 text-sm">
                  <Row label="Panel URL" value={claim.panel_url} action={() => window.open(claim.panel_url, "_blank")} icon={ExternalLink} />
                  <Row label="Username" value={claim.panel_username} action={() => copy(claim.panel_username)} icon={Copy} />
                  <Row label="Password" value={claim.panel_password ?? "(set previously)"} action={() => claim.panel_password && copy(claim.panel_password)} icon={Copy} mono />
                  <Row label="Expires" value={new Date(claim.expires_at).toLocaleDateString()} icon={Clock} />
                </div>
                <Button asChild className="btn-pink mt-5 w-full sm:w-auto">
                  <a href={claim.panel_url} target="_blank" rel="noopener noreferrer">
                    Open Panel <ExternalLink className="h-4 w-4 ml-2" />
                  </a>
                </Button>
              </>
            )}

            <div className="mt-4 text-xs text-muted-foreground">
              <Link to="/dashboard/free-claims" className="hover:text-primary underline-offset-4 hover:underline">View claim history →</Link>
            </div>
          </div>
        </section>
      )}

      {/* Specs */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">What You Get, Free</h2>
            <p className="text-muted-foreground">Real specs. Real hardware. No demo.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            <SpecCard icon={MemoryStick} label="Memory" value="2 GB" sub="DDR4 ECC" />
            <SpecCard icon={Cpu} label="CPU" value="40%" sub="Ryzen 9 thread" />
            <SpecCard icon={HardDrive} label="Storage" value="4 GB" sub="NVMe SSD" />
          </div>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-10 max-w-4xl mx-auto">
            {benefits.map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" /> {b}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">Built Like Our Premium</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Same hardware, same panel, same network. Just a smaller slice — yours free.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {features.map((f) => (
              <div key={f.title} className="glass-card rounded-xl p-5 hover:border-primary/40 transition-colors">
                <div className="h-10 w-10 rounded-lg bg-primary/15 text-primary flex items-center justify-center mb-3">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How */}
      <section className="py-16 bg-card/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center mb-12">3 Steps. Done.</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { n: "01", t: "Create an account", d: "Free signup — email or Google." },
              { n: "02", t: "Click Claim", d: "We auto-provision your panel + server in seconds." },
              { n: "03", t: "Login & play", d: "Add your IP to Minecraft and invite friends." },
            ].map((s) => (
              <div key={s.n} className="glass-card rounded-xl p-5 relative">
                <div className="text-4xl font-display font-bold text-primary/40 mb-2">{s.n}</div>
                <h3 className="font-display font-semibold mb-1">{s.t}</h3>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upgrade nudge */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card rounded-2xl p-8 md:p-12 text-center max-w-3xl mx-auto bg-gradient-to-br from-primary/10 to-purple-500/5">
            <Users className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="font-display text-3xl font-bold mb-3">Need More Power?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Outgrew the free tier? Upgrade to Dirt, Stone, Iron or beyond — starting at just ₹30/month with full priority CPU, more RAM and dedicated IP support.
            </p>
            <Button asChild size="lg" className="btn-pink ring-glow">
              <Link to="/plans">View Paid Plans</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Row({ label, value, action, icon: Icon, mono }: any) {
  return (
    <div className="flex items-center justify-between gap-3 p-3 rounded-lg bg-background/50 border border-border/40">
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className={`truncate ${mono ? "font-mono" : "font-medium"}`}>{value}</div>
      </div>
      {action && Icon && (
        <Button size="icon" variant="ghost" onClick={action} className="shrink-0"><Icon className="h-4 w-4" /></Button>
      )}
    </div>
  );
}

function SpecCard({ icon: Icon, label, value, sub }: any) {
  return (
    <div className="glass-card rounded-xl p-6 text-center">
      <Icon className="h-8 w-8 text-primary mx-auto mb-3" />
      <div className="text-3xl font-display font-bold mb-1">{value}</div>
      <div className="text-sm font-medium">{label}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>
    </div>
  );
}
