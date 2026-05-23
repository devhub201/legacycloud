import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "./AdminSidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Shield } from "lucide-react";

export const AdminLayout = ({ children, title }: { children: ReactNode; title?: string }) => {
  const { signOut, profile } = useAuth();
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <header className="h-14 border-b border-border bg-card/40 backdrop-blur flex items-center px-4 gap-3 sticky top-0 z-30">
            <SidebarTrigger />
            <Shield className="h-4 w-4 text-primary" />
            <h1 className="font-display font-semibold flex-1">{title}</h1>
            <span className="text-sm text-muted-foreground">{profile?.display_name}</span>
            <Button size="icon" variant="ghost" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
          </header>
          <main className="flex-1 p-4 md:p-6 overflow-x-hidden">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
};
