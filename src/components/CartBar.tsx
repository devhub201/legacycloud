import { Link, useLocation } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";

const HIDE_ON = ["/dashboard/cart", "/dashboard/checkout", "/dashboard/billing", "/login", "/register"];

const CartBar = () => {
  const { count, total } = useCart();
  const location = useLocation();
  if (count < 1) return null;
  if (HIDE_ON.some((p) => location.pathname.startsWith(p))) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-4 inset-x-4 md:inset-x-auto md:right-6 md:bottom-6 z-40"
      >
        <div className="glass-card rounded-2xl border border-primary/40 ring-glow px-4 py-3 flex items-center gap-3 shadow-2xl md:min-w-[340px]">
          <div className="h-10 w-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary">
            <ShoppingCart className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold">{count} item{count > 1 ? "s" : ""} in cart</div>
            <div className="text-xs text-muted-foreground">Total ₹{total.toFixed(0)}</div>
          </div>
          <Link to="/dashboard/cart">
            <Button size="sm" className="btn-pink ring-glow">Pay Now</Button>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CartBar;
