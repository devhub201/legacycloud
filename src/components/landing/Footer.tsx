import { Server } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Server className="h-5 w-5 text-neon-purple" />
              <span className="font-display text-sm font-bold gradient-text">Ultimate Cloud</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Next-gen Minecraft hosting for gamers who demand the best.
            </p>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold mb-3 text-foreground">Product</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#features" className="block hover:text-foreground transition-colors">Features</a>
              <a href="#pricing" className="block hover:text-foreground transition-colors">Pricing</a>
              <a href="#locations" className="block hover:text-foreground transition-colors">Locations</a>
            </div>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold mb-3 text-foreground">Support</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#faq" className="block hover:text-foreground transition-colors">FAQ</a>
              <Link to="/dashboard/support" className="block hover:text-foreground transition-colors">Contact</Link>
              <a href="#" className="block hover:text-foreground transition-colors">Docs</a>
            </div>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold mb-3 text-foreground">Legal</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#" className="block hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="block hover:text-foreground transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/30 pt-6 text-center text-xs text-muted-foreground">
          © 2026 Ultimate Cloud. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
