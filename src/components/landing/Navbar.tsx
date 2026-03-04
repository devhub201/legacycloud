import { motion } from "framer-motion";
import { Server, Menu, X, Home, ShoppingCart, Rocket, LifeBuoy, ArrowRight, LogIn, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const links = [
    { label: "Home", href: "/", icon: Home },
    { label: "Services", href: "#pricing", icon: ShoppingCart },
    { label: "About Us", href: "/about", icon: Rocket },
    { label: "Support", href: "#faq", icon: LifeBuoy },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong"
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <Server className="h-6 w-6 text-primary" />
          <span className="font-display text-lg font-bold gradient-text">Ultimate Cloud</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href.startsWith("#") ? `/${l.href}` : l.href}
              onClick={(e) => {
                if (l.href.startsWith("#")) {
                  e.preventDefault();
                  document.querySelector(l.href)?.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <a href="https://panel.ultimatecloud.com" target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="bg-primary hover:bg-primary/80 box-glow font-display text-primary-foreground">
                  Dashboard <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
              <Button size="sm" variant="outline" className="neon-border" onClick={signOut}>
                <LogOut className="mr-1 h-4 w-4" /> Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth">
              <Button size="sm" className="bg-primary hover:bg-primary/80 box-glow font-display text-primary-foreground">
                <LogIn className="mr-1 h-4 w-4" /> Sign In
              </Button>
            </Link>
          )}
        </div>

        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden glass-strong border-t border-border/30 px-4 pb-4"
        >
          {links.map((l) => (
            <Link
              key={l.label}
              to={l.href.startsWith("#") ? `/${l.href}` : l.href}
              className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setOpen(false)}
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
          {user ? (
            <>
              <a href="https://panel.ultimatecloud.com" target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                <Button size="sm" className="w-full mt-2 bg-primary box-glow text-primary-foreground">
                  Dashboard <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </a>
              <Button size="sm" variant="outline" className="w-full mt-2 neon-border" onClick={() => { signOut(); setOpen(false); }}>
                <LogOut className="mr-1 h-4 w-4" /> Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)}>
              <Button size="sm" className="w-full mt-2 bg-primary box-glow text-primary-foreground">
                <LogIn className="mr-1 h-4 w-4" /> Sign In
              </Button>
            </Link>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
