import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Cloud, LayoutDashboard, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCORD_INVITE } from "@/data/plans";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

const links = [
  { label: "HOME", to: "/" },
  { label: "PLANS", to: "/plans" },
  { label: "FREE", to: "/free-panel" },
  { label: "VPS", to: "/vps" },
  { label: "OFFERS", to: "/offers" },
  { label: "DOCS", to: "/knowledgebase" },
  { label: "SUPPORT", to: "/support" },
  { label: "DISCORD", to: "/discord" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { user } = useAuth();
  const { count } = useCart();

  const CartIcon = ({ className = "" }: { className?: string }) => (
    <Link to={user ? "/dashboard/cart" : "/login"} aria-label="Cart" className={`relative inline-flex items-center justify-center h-9 w-9 rounded-lg hover:bg-primary/10 transition-colors ${className}`}>
      <ShoppingCart className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center ring-2 ring-background">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"}`}>
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <Cloud className="h-7 w-7 text-primary" />
            <div className="absolute inset-0 blur-xl bg-primary/50 -z-10 group-hover:bg-primary/70 transition-colors" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight">
            <span className="text-primary">LEGACY</span> CLOUD
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-6">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"}
              className={({ isActive }) => `text-xs font-semibold tracking-wider transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <CartIcon />
          {user ? (
            <Link to="/dashboard"><Button size="sm" className="btn-pink ring-glow"><LayoutDashboard className="h-4 w-4 mr-2" />Dashboard</Button></Link>
          ) : (
            <>
              <Link to="/login"><Button size="sm" variant="ghost">Login</Button></Link>
              <Link to="/register"><Button size="sm" className="btn-pink ring-glow">Register</Button></Link>
            </>
          )}
        </div>

        <div className="flex lg:hidden items-center gap-1">
          <CartIcon />
          <button className="p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === "/"}
                className={({ isActive }) => `py-2.5 text-sm font-semibold tracking-wider ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {l.label}
              </NavLink>
            ))}
            <div className="pt-3 border-t border-border mt-2 flex gap-2">
              {user ? (
                <Link to="/dashboard" className="flex-1"><Button className="w-full btn-pink ring-glow">Dashboard</Button></Link>
              ) : (
                <>
                  <Link to="/login" className="flex-1"><Button variant="outline" className="w-full">Login</Button></Link>
                  <Link to="/register" className="flex-1"><Button className="w-full btn-pink ring-glow">Register</Button></Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
