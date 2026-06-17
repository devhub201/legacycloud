import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Server, HardDrive, ShoppingCart, FileText,
  CreditCard, LifeBuoy, Gift, UserCircle, Cloud, Shield,
} from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";

const mainItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "My Services", url: "/dashboard/services", icon: Server },
  { title: "My VPS", url: "/dashboard/vps", icon: HardDrive },
  { title: "Free Server", url: "/dashboard/free-claims", icon: Gift },
  { title: "Cart", url: "/dashboard/cart", icon: ShoppingCart },
];

const billingItems = [
  { title: "Invoices", url: "/dashboard/invoices", icon: FileText },
  { title: "Billing", url: "/dashboard/billing", icon: CreditCard },
];

const supportItems = [
  { title: "Tickets", url: "/dashboard/tickets", icon: LifeBuoy },
  { title: "Rewards", url: "/dashboard/rewards", icon: Gift },
  { title: "Profile", url: "/dashboard/profile", icon: UserCircle },
];

export function DashboardSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();
  const { isAdmin } = useAuth();

  const renderGroup = (label: string, items: typeof mainItems) => (
    <SidebarGroup>
      {!collapsed && <SidebarGroupLabel>{label}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((it) => (
            <SidebarMenuItem key={it.url}>
              <SidebarMenuButton asChild isActive={pathname === it.url}>
                <NavLink to={it.url} end className="flex items-center gap-3">
                  <it.icon className="h-4 w-4 shrink-0" />
                  {!collapsed && <span>{it.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border">
        <NavLink to="/" className="flex items-center gap-2 px-2 py-2">
          <div className="relative">
            <Cloud className="h-6 w-6 text-primary" />
            <div className="absolute inset-0 blur-lg bg-primary/50 -z-10" />
          </div>
          {!collapsed && <span className="font-display font-bold tracking-tight"><span className="text-primary">LEGACY</span> CLOUD</span>}
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        {renderGroup("Main", mainItems)}
        {renderGroup("Billing", billingItems)}
        {renderGroup("Account", supportItems)}
        {isAdmin && (
          <SidebarGroup>
            {!collapsed && <SidebarGroupLabel>Admin</SidebarGroupLabel>}
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild isActive={pathname.startsWith("/admin")}>
                    <NavLink to="/admin" className="flex items-center gap-3">
                      <Shield className="h-4 w-4 shrink-0 text-primary" />
                      {!collapsed && <span>Admin Panel</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
