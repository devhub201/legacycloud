import { Link } from "react-router-dom";
import { Cloud, MessageCircle } from "lucide-react";
import { DISCORD_INVITE } from "@/data/plans";

const cols: { title: string; links: [string, string][] }[] = [
  { title: "Products", links: [["Minecraft Hosting", "/plans"], ["VPS Hosting", "/vps"], ["Domains", "/services"]] },
  { title: "Company", links: [["About", "/about"], ["Terms", "/terms"], ["Status", "/status"], ["Support", "/support"]] },
  { title: "Client Area", links: [["Login", "/login"], ["Register", "/register"], ["Dashboard", "/dashboard"]] },
  { title: "Social", links: [["Discord", "/discord"], ["Knowledgebase", "/knowledgebase"], ["Offers", "/offers"]] },
];

const Footer = () => (
  <footer className="border-t border-border py-14 mt-10">
    <div className="container">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-10">
        <div className="col-span-2 md:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-3">
            <Cloud className="h-6 w-6 text-primary" />
            <span className="font-display font-bold">
              <span className="text-primary">LEGACY</span> CLOUD
            </span>
          </Link>
          <p className="text-sm text-muted-foreground mb-4">
            Ultra-fast Minecraft & VPS hosting for gamers, creators, and developers.
          </p>
          <a href={DISCORD_INVITE} target="_blank" rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs text-primary hover:underline">
            <MessageCircle className="h-4 w-4" /> Join Discord
          </a>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="font-display font-semibold mb-3 text-sm">{c.title}</h4>
            <ul className="space-y-2">
              {c.links.map(([label, href]) => (
                <li key={href + label}>
                  <Link to={href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} Legacy Cloud. All rights reserved.</span>
        <span>Made with 💖 for gamers in India</span>
      </div>
    </div>
  </footer>
);

export default Footer;
