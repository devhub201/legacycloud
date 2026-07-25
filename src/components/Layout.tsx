import { ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Boxes, MessageCircle } from "lucide-react";
import logoAsset from "@/assets/legacy-cloud-logo.png.asset.json";
import { DISCORD } from "@/data/plans";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/minecraft", label: "Minecraft" },
  { to: "/vps", label: "VPS" },
  { to: "/status", label: "Status" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About" },
];

function Petals() {
  const petals = Array.from({ length: 14 });
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
      {petals.map((_, i) => (
        <span
          key={i}
          className="petal"
          style={{
            left: `${(i * 7.3) % 100}%`,
            animationDuration: `${9 + (i % 5) * 2.5}s`,
            animationDelay: `${i * 1.1}s`,
            opacity: 0.5 + (i % 3) * 0.2,
          }}
        />
      ))}
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-40"
        style={{ backgroundImage: 'url("/background.png")' }}
      />
      <div aria-hidden className="fixed inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      <Petals />

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logoAsset.url} alt="Legacy Cloud logo" className="w-9 h-9 rounded-lg object-cover ring-1 ring-primary/40" />
            <span className="font-display font-bold text-lg tracking-wide">
              Legacy <span className="text-gradient-blossom">Cloud</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-7 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  `transition hover:text-foreground ${isActive ? "text-foreground font-medium" : ""}`
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <a
            href={DISCORD}
            target="_blank"
            rel="noreferrer"
            className="grad-btn text-primary-foreground text-sm font-medium px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <MessageCircle className="w-4 h-4" /> Discord
          </a>
        </div>
        <div className="lg:hidden border-t border-border/50 overflow-x-auto">
          <div className="flex gap-5 px-6 py-2.5 text-sm text-muted-foreground whitespace-nowrap">
            {NAV.map((n) => (
              <NavLink key={n.to} to={n.to} className={({ isActive }) => (isActive ? "text-foreground" : "")}>
                {n.label}
              </NavLink>
            ))}
          </div>
        </div>
      </header>

      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="relative z-10"
      >
        {children}
      </motion.main>

      <footer className="relative z-10 border-t border-border/60 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4 text-sm">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg grad-btn flex items-center justify-center">
                <Boxes className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-display font-bold">Legacy Cloud</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Cherry-blossom powered Minecraft and VPS hosting, made in India for players worldwide.
            </p>
          </div>
          <div>
            <h3 className="font-medium mb-3">Hosting</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/minecraft" className="hover:text-foreground transition">Minecraft Hosting</Link></li>
              <li><Link to="/vps" className="hover:text-foreground transition">VPS Hosting</Link></li>
              <li><Link to="/status" className="hover:text-foreground transition">Network Status</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3">Company</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition">About Us</Link></li>
              <li><Link to="/support" className="hover:text-foreground transition">Support</Link></li>
              <li><a href={DISCORD} target="_blank" rel="noreferrer" className="hover:text-foreground transition">Discord</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/tos" className="hover:text-foreground transition">Terms of Service</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Legacy Cloud. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
