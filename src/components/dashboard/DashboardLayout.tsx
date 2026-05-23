import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./DashboardSidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Wallet } from "lucide-react";

export const DashboardLayout = ({ children, title }: { children: ReactNode; title?: string }) => {
  const { profile, signOut, user } = useAuth();
  const name = profile?.display_name || user?.email?.split("@")[0] || "User";

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <DashboardSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b border-border bg-card/40 backdrop-blur flex items-center px-4 gap-3 sticky top-0 z-30">
            <SidebarTrigger />
            <div className="flex-1">
              {title && <h1 className="font-display font-semibold text-lg">{title}</h1>}
            </div>
            <Link to="/dashboard/billing" className="hidden sm:flex items-center gap-2 glass-card px-3 py-1.5 rounded-full text-sm">
              <Wallet className="h-4 w-4 text-primary" />
              ₹{Number(profile?.balance ?? 0).toFixed(2)}
            </Link>
            <div className="hidden md:flex items-center gap-2 text-sm">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center font-semibold text-primary">
                {name[0]?.toUpperCase()}
              </div>
              <span className="font-medium">{name}</span>
            </div>
            <Button size="icon" variant="ghost" onClick={signOut} aria-label="Sign out">
              <LogOut className="h-4 w-4" />
            </Button>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-x-hidden">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
