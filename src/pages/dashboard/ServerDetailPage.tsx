import { motion } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Users, Terminal, FileText, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const chartData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  ram: Math.floor(Math.random() * 40 + 40),
  cpu: Math.floor(Math.random() * 30 + 10),
}));

const players = ["Steve", "Alex", "Notch", "Herobrine", "Dream", "Technoblade"];

const consoleLogs = [
  "[12:00:01] Server started on port 25565",
  "[12:00:03] Loading world 'world'...",
  "[12:00:05] Done (2.4s)! For help, type 'help'",
  "[12:01:22] Steve joined the game",
  "[12:02:15] Alex joined the game",
  "[12:05:44] Herobrine joined the game",
  "[12:10:33] [Server] Saving world...",
];

const ServerDetailPage = () => {
  const { id } = useParams();
  const serverName = id === "1" ? "Survival SMP" : id === "2" ? "Creative Build" : "Modded RLCraft";

  return (
    <div>
      <Link to="/dashboard" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Back to Servers
      </Link>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <h1 className="font-display text-2xl font-bold">{serverName}</h1>
          <Badge className="bg-green-500/10 text-green-400 border-green-500/30" variant="outline">Online</Badge>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { label: "RAM Usage", value: 68, text: "4.2 / 6 GB" },
            { label: "CPU Usage", value: 35, text: "35%" },
            { label: "Storage", value: 45, text: "13.5 / 30 GB" },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-xl p-4 neon-border">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="font-display text-lg font-bold mb-2">{stat.text}</p>
              <Progress value={stat.value} className="h-1.5" />
            </div>
          ))}
        </div>

        <Tabs defaultValue="console" className="w-full">
          <TabsList className="glass neon-border mb-4">
            <TabsTrigger value="console" className="font-display text-xs"><Terminal className="mr-1.5 h-3.5 w-3.5" />Console</TabsTrigger>
            <TabsTrigger value="players" className="font-display text-xs"><Users className="mr-1.5 h-3.5 w-3.5" />Players</TabsTrigger>
            <TabsTrigger value="performance" className="font-display text-xs"><Settings className="mr-1.5 h-3.5 w-3.5" />Performance</TabsTrigger>
            <TabsTrigger value="files" className="font-display text-xs"><FileText className="mr-1.5 h-3.5 w-3.5" />Files</TabsTrigger>
          </TabsList>

          <TabsContent value="console">
            <div className="glass rounded-xl p-4 neon-border font-mono text-xs space-y-1 max-h-80 overflow-auto">
              {consoleLogs.map((log, i) => (
                <p key={i} className="text-muted-foreground">{log}</p>
              ))}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/30">
                <span className="text-neon-purple">&gt;</span>
                <input className="bg-transparent outline-none flex-1 text-foreground" placeholder="Type a command..." />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="players">
            <div className="glass rounded-xl p-4 neon-border">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {players.map((p) => (
                  <div key={p} className="flex items-center gap-2 p-2 rounded-lg bg-muted/20">
                    <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center font-display text-xs font-bold text-neon-purple">
                      {p[0]}
                    </div>
                    <span className="text-sm">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="glass rounded-xl p-4 neon-border">
              <p className="text-xs text-muted-foreground mb-3 font-display">24h Performance</p>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="ramGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(250, 85%, 65%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(250, 85%, 65%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="cpuGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="hsl(200, 90%, 55%)" stopOpacity={0.3} />
                      <stop offset="100%" stopColor="hsl(200, 90%, 55%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="hsl(220, 15%, 30%)" tick={{ fontSize: 10 }} />
                  <YAxis stroke="hsl(220, 15%, 30%)" tick={{ fontSize: 10 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(230, 25%, 10%)",
                      border: "1px solid hsl(250, 30%, 20%)",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="ram" stroke="hsl(250, 85%, 65%)" fill="url(#ramGrad)" name="RAM %" />
                  <Area type="monotone" dataKey="cpu" stroke="hsl(200, 90%, 55%)" fill="url(#cpuGrad)" name="CPU %" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="files">
            <div className="glass rounded-xl p-6 neon-border text-center">
              <FileText className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">File manager coming soon</p>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
};

export default ServerDetailPage;
