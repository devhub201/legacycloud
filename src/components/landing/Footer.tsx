import { Server } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="font-display text-xs font-semibold mb-3 text-foreground">Quick Links</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/" className="block hover:text-foreground transition-colors">Home</Link>
              <a href="#pricing" className="block hover:text-foreground transition-colors">Services</a>
              <Link to="/about" className="block hover:text-foreground transition-colors">About Us</Link>
              <Link to="/dashboard/support" className="block hover:text-foreground transition-colors">Support Ticket</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold mb-3 text-foreground">Extra</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/terms" className="block hover:text-foreground transition-colors">Terms Of Service</Link>
              <a href="#faq" className="block hover:text-foreground transition-colors">Knowledgebase</a>
              <a href="#faq" className="block hover:text-foreground transition-colors">Common Questions</a>
              <a href="#" className="block hover:text-foreground transition-colors">Blog Posts</a>
            </div>
          </div>
          <div>
            <h4 className="font-display text-xs font-semibold mb-3 text-foreground">Community</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="#" className="block hover:text-foreground transition-colors">Instagram</a>
              <a href="#" className="block hover:text-foreground transition-colors">Twitter</a>
              <a href="#" className="block hover:text-foreground transition-colors">Discord</a>
              <a href="#" className="block hover:text-foreground transition-colors">Email</a>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Server className="h-5 w-5 text-primary" />
              <span className="font-display text-sm font-bold gradient-text">Ultimate Cloud</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Power up your Minecraft server with unbeatable performance.
            </p>
          </div>
        </div>
        <div className="border-t border-border/30 pt-6 text-center text-xs text-muted-foreground">
          © 2026 Copyright - Ultimate Cloud - All rights reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
