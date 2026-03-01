import { motion } from "framer-motion";
import { CreditCard, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const BillingPage = () => {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold mb-6">Billing</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-xl p-6 neon-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-sm font-semibold">Current Plan</h2>
            <Badge className="bg-primary/10 text-primary border-primary/30" variant="outline">Pro</Badge>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Monthly Cost</span><span className="font-semibold">$12.00/mo</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Next Billing</span><span>March 15, 2026</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Payment Method</span><span className="flex items-center gap-1"><CreditCard className="h-3.5 w-3.5" />•••• 4242</span></div>
          </div>
          <Button className="w-full mt-4 neon-border font-display text-sm" variant="outline">
            <ArrowUpRight className="mr-2 h-4 w-4" /> Upgrade Plan
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-xl p-6 neon-border">
          <h2 className="font-display text-sm font-semibold mb-4">Usage This Month</h2>
          <div className="space-y-4">
            {[
              { label: "Servers Used", value: "2 / 3", pct: 66 },
              { label: "Storage", value: "18.2 / 30 GB", pct: 60 },
              { label: "Bandwidth", value: "120 / 500 GB", pct: 24 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{item.label}</span>
                  <span>{item.value}</span>
                </div>
                <Progress value={item.pct} className="h-1.5" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-xl p-6 neon-border mt-6">
        <h2 className="font-display text-sm font-semibold mb-4">Recent Invoices</h2>
        <div className="space-y-3">
          {[
            { date: "Feb 15, 2026", amount: "$12.00", status: "Paid" },
            { date: "Jan 15, 2026", amount: "$12.00", status: "Paid" },
            { date: "Dec 15, 2025", amount: "$12.00", status: "Paid" },
          ].map((inv) => (
            <div key={inv.date} className="flex items-center justify-between text-sm py-2 border-b border-border/20 last:border-0">
              <span className="text-muted-foreground">{inv.date}</span>
              <span>{inv.amount}</span>
              <Badge className="bg-green-500/10 text-green-400 border-green-500/30" variant="outline">{inv.status}</Badge>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BillingPage;
