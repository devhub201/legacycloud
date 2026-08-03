import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ShieldAlert, LogIn } from "lucide-react";
import { useAuth, OWNER_EMAIL } from "@/lib/auth";

export default function RequireAdmin({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto px-6 py-24 text-center text-muted-foreground text-sm">
        Checking access…
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-lg mx-auto px-6 py-24 text-center"
      >
        <span className="icon-tile tone-amber w-14 h-14 mx-auto mb-5"><ShieldAlert className="w-6 h-6" /></span>
        <h1 className="font-display text-2xl font-bold mb-3">Admin only</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Yeh panel sirf owner account (<span className="text-foreground">{OWNER_EMAIL}</span>) ke liye hai.
          {!user && " Pehle apne account se login karo."}
        </p>
        <Link to="/auth" className="inline-flex items-center gap-2 grad-btn text-primary-foreground font-medium px-6 py-3 rounded-xl">
          <LogIn className="w-4 h-4" /> {user ? "Switch account" : "Log in"}
        </Link>
      </motion.section>
    );
  }

  return <>{children}</>;
}
