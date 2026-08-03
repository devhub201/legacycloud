import { ReactNode, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Boxes, MessageCircle, Menu, X, ShoppingCart, LayoutDashboard, Receipt, Rocket, ShieldCheck, LogIn, LogOut, User, Sparkles, HelpCircle } from "lucide-react";
import logoAsset from "@/assets/legacy-cloud-logo.png.asset.json";
import { DISCORD } from "@/data/plans";
import { useCart } from "@/lib/cart";
import { useCurrency } from "@/lib/currency";
import { useAuth } from "@/lib/auth";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/minecraft", label: "Minecraft" },
  { to: "/vps", label: "VPS" },
  { to: "/features", label: "Features" },
  { to: "/dashboard", label: "Dashboard" },
  { to: "/status", label: "Status" },
  { to: "/support", label: "Support" },
  { to: "/about", label: "About" },
  { to: "/faq", label: "FAQ" },
];

const SIDEBAR_EXTRA = [
  { to: "/cart", label: "Cart", icon: ShoppingCart, tone: "" },
  { to: "/billing", label: "Billing", icon: Receipt, tone: "tone-cyan" },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard, tone: "tone-violet" },
  { to: "/careers", label: "Careers", icon: Sparkles, tone: "tone-mint" },
  { to: "/faq", label: "Help & FAQ", icon: HelpCircle, tone: "tone-amber" },
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

function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();
  return (
    <div className="glass rounded-full p-0.5 flex text-xs font-medium">
      {(["INR", "USD"] as const).map((c) => (
        <button
          key={c}
          onClick={() => setCurrency(c)}
          className={`px-2.5 py-1 rounded-full transition ${
            currency === c ? "grad-btn text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {c === "INR" ? "₹ INR" : "$ USD"}
        </button>
      ))}
    </div>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { count } = useCart();
  const { user, isAdmin, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative min-h-screen">
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat opacity-60"
        style={{ backgroundImage: 'url("/background.png")' }}
      />
      <div aria-hidden className="fixed inset-0 -z-10 bg-gradient-to-b from-background/55 via-background/80 to-background" />
      <Petals />

      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img src={logoAsset.url} alt="Legacy Cloud logo" className="w-9 h-9 rounded-lg object-cover ring-1 ring-primary/40" />
            <span className="font-display font-bold text-lg tracking-wide">
              Legacy <span className="text-gradient-blossom">Cloud</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 text-sm text-muted-foreground">
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

          <div className="flex items-center gap-2">
            <div className="hidden sm:block"><CurrencyToggle /></div>
            <Link
              to="/minecraft"
              className="hidden md:flex grad-btn text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl items-center gap-2 hover:brightness-110 transition"
            >
              <Rocket className="w-4 h-4" /> Get Started
            </Link>
            <Link
              to={user ? "/dashboard" : "/auth"}
              aria-label={user ? "Account" : "Log in"}
              className="glass w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary transition"
            >
              {user ? <User className="w-4 h-4 text-info" /> : <LogIn className="w-4 h-4" />}
            </Link>
            <Link to="/cart" className="relative glass w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary transition" aria-label="Cart">
              <ShoppingCart className="w-4 h-4" />
              {count > 0 && (
                <span className="absolute -top-1.5 -right-1.5 grad-btn text-primary-foreground text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="glass w-10 h-10 rounded-xl flex items-center justify-center hover:bg-secondary transition"
            >
              <Menu className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Right sidebar drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-50 bg-background/70 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed right-0 top-0 z-50 h-full w-[86%] max-w-sm glass border-l border-border p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-display font-bold text-lg">Menu</span>
                <button onClick={() => setOpen(false)} aria-label="Close menu" className="glass w-9 h-9 rounded-lg flex items-center justify-center">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-1.5">
                {NAV.map((n) => (
                  <NavLink
                    key={n.to}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl transition ${
                        isActive ? "grad-btn text-primary-foreground font-medium" : "hover:bg-secondary text-muted-foreground"
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                ))}
              </nav>

              <div className="mt-6 pt-6 border-t border-border/60 space-y-1.5">
                {SIDEBAR_EXTRA.map((n) => (
                  <Link
                    key={n.label}
                    to={n.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition"
                  >
                    <span className={`icon-tile ${n.tone} w-8 h-8 shrink-0 icon-hover`}><n.icon className="w-4 h-4" /></span> {n.label}
                  </Link>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-border/60 space-y-1.5">
                {isAdmin && (
                  <Link
                    to="/admin"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition"
                  >
                    <span className="icon-tile tone-amber w-8 h-8 shrink-0 icon-hover"><ShieldCheck className="w-4 h-4" /></span> Admin Panel
                  </Link>
                )}
                {user ? (
                  <button
                    onClick={() => { signOut(); setOpen(false); }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition"
                  >
                    <span className="icon-tile tone-violet w-8 h-8 shrink-0 icon-hover"><LogOut className="w-4 h-4" /></span> Log out
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-secondary transition"
                  >
                    <span className="icon-tile tone-cyan w-8 h-8 shrink-0 icon-hover"><LogIn className="w-4 h-4" /></span> Log in / Sign up
                  </Link>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-border/60 space-y-4">
                <CurrencyToggle />
                <a
                  href={DISCORD}
                  target="_blank"
                  rel="noreferrer"
                  className="grad-btn text-primary-foreground text-sm font-medium px-4 py-3 rounded-xl flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" /> Join Discord
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

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
              <li><Link to="/features" className="hover:text-foreground transition">Why Legacy Cloud</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3">Account</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/dashboard" className="hover:text-foreground transition">Dashboard</Link></li>
              <li><Link to="/cart" className="hover:text-foreground transition">Cart</Link></li>
              <li><Link to="/billing" className="hover:text-foreground transition">Billing</Link></li>
              <li><Link to="/auth" className="hover:text-foreground transition">Log in / Sign up</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-3">Legal</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition">About Us</Link></li>
              <li><Link to="/careers" className="hover:text-foreground transition">Careers</Link></li>
              <li><Link to="/faq" className="hover:text-foreground transition">FAQ</Link></li>
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
