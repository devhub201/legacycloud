import { motion } from "framer-motion";
import { Server, Play, Square, RotateCw, Users, HardDrive, Cpu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const servers = [
  { id: "1", name: "Survival SMP", version: "1.20.4", status: "online", players: "12/50", ram: "4.2/6 GB", cpu: "35%" },
  { id: "2", name: "Creative Build", version: "1.20.4", status: "online", players: "3/20", ram: "1.8/4 GB", cpu: "12%" },
  { id: "3", name: "Modded RLCraft", version: "1.12.2", status: "offline", players: "0/30", ram: "0/8 GB", cpu: "0%" },
];

const ServersPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-2xl font-bold">My Servers</h1>
        <Button className="bg-primary hover:bg-primary/80 box-glow font-display text-sm">
          <Server className="mr-2 h-4 w-4" /> New Server
        </Button>
      </div>

      <div className="grid gap-4">
        {servers.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={`/dashboard/server/${s.id}`}>
              <div className="glass rounded-xl p-5 neon-border hover:box-glow transition-shadow cursor-pointer">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Server className="h-5 w-5 text-neon-purple" />
                    </div>
                    <div>
                      <h3 className="font-display text-sm font-semibold">{s.name}</h3>
                      <p className="text-xs text-muted-foreground">{s.version}</p>
                    </div>
                    <Badge
                      className={`ml-2 ${
                        s.status === "online"
                          ? "bg-green-500/10 text-green-400 border-green-500/30"
                          : "bg-destructive/10 text-destructive border-destructive/30"
                      }`}
                      variant="outline"
                    >
                      {s.status}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{s.players}</span>
                    <span className="flex items-center gap-1.5"><HardDrive className="h-3.5 w-3.5" />{s.ram}</span>
                    <span className="flex items-center gap-1.5"><Cpu className="h-3.5 w-3.5" />{s.cpu}</span>
                  </div>

                  <div className="flex items-center gap-2" onClick={(e) => e.preventDefault()}>
                    {s.status === "online" ? (
                      <Button size="icon" variant="outline" className="neon-border h-8 w-8 hover:bg-destructive/20">
                        <Square className="h-3.5 w-3.5" />
                      </Button>
                    ) : (
                      <Button size="icon" variant="outline" className="neon-border h-8 w-8 hover:bg-green-500/20">
                        <Play className="h-3.5 w-3.5" />
                      </Button>
                    )}
                    <Button size="icon" variant="outline" className="neon-border h-8 w-8 hover:bg-muted/30">
                      <RotateCw className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServersPage;
