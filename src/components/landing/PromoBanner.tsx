import { useState } from "react";
import { Tag, X, Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const PromoBanner = () => {
  const [open, setOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText("LEGACY25");
    setCopied(true);
    toast.success("Promo code copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-primary/30 via-secondary/30 to-primary/30 backdrop-blur-md border-b border-primary/40"
        >
          <div className="container mx-auto px-4 h-10 flex items-center justify-center gap-3 text-xs sm:text-sm">
            <Tag className="h-4 w-4 text-primary shrink-0" />
            <span className="text-foreground/90 font-medium">
              Limited time: <span className="text-primary font-bold">25% OFF</span> all plans — code
            </span>
            <button
              onClick={copy}
              className="font-display font-bold tracking-wider bg-background/60 px-2 py-0.5 rounded border border-primary/50 hover:bg-primary/20 transition flex items-center gap-1"
            >
              LEGACY25 {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
            </button>
            <button onClick={() => setOpen(false)} className="ml-2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PromoBanner;
