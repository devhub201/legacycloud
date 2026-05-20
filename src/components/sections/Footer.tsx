import { Cloud } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Cloud className="h-5 w-5 text-primary" />
          <span className="font-display font-semibold">Legacy Cloud</span>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <a href="#services" className="hover:text-foreground transition-colors">Services</a>
          <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
          <a href="#features" className="hover:text-foreground transition-colors">Features</a>
          <a href="#faq" className="hover:text-foreground transition-colors">FAQ</a>
          <a href="https://discord.gg/guxyBXut2E" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors">Discord</a>
        </nav>

        <div className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Legacy Cloud
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
