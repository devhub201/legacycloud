import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Cloud, User, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCORD_INVITE } from "@/data/plans";
import { useAuth } from "@/contexts/AuthContext";

const links = [
  { label: "HOME", to: "/" },
  { label: "PLANS", to: "/plans" },
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
          {user ? (
            <Link to="/dashboard"><Button size="sm" className="btn-pink ring-glow"><LayoutDashboard className="h-4 w-4 mr-2" />Dashboard</Button></Link>
          ) : (
            <>
              <Link to="/login"><Button size="sm" variant="ghost">Login</Button></Link>
              <Link to="/register"><Button size="sm" className="btn-pink ring-glow">Register</Button></Link>
            </>
          )}
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
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
