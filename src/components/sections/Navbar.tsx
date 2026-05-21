import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, Cloud, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DISCORD_INVITE } from "@/data/plans";

const links = [
  { label: "HOME", to: "/" },
  { label: "SERVICES", to: "/services" },
  { label: "PLANS", to: "/plans" },
  { label: "STATUS", to: "/status" },
  { label: "SUPPORT", to: "/support" },
  { label: "DISCORD", to: "/discord" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-transparent"
      }`}
    >
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

        <nav className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-xs font-semibold tracking-wider transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`
              }
              end={l.to === "/"}
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link to="/auth">
            <Button size="icon" variant="outline" className="rounded-full h-9 w-9">
              <User className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <button className="lg:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur-xl">
          <div className="container py-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === "/"}
                className={({ isActive }) =>
                  `py-2.5 text-sm font-semibold tracking-wider ${
                    isActive ? "text-primary" : "text-muted-foreground"
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/auth" className="py-2.5 text-sm font-semibold tracking-wider text-muted-foreground">
              ACCOUNT
            </Link>
            <a href={DISCORD_INVITE} target="_blank" rel="noreferrer" className="mt-2">
              <Button className="w-full btn-pink ring-glow">Join Discord</Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
