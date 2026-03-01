import { Server, CreditCard, LifeBuoy, Home, LayoutDashboard } from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation, Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "My Servers", url: "/dashboard", icon: Server },
  { title: "Billing", url: "/dashboard/billing", icon: CreditCard },
  { title: "Support", url: "/dashboard/support", icon: LifeBuoy },
];

const DashboardSidebar = () => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar collapsible="icon" className="border-r border-border/30">
      <SidebarContent className="bg-sidebar">
        <div className="p-4 border-b border-border/30">
          <Link to="/" className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-neon-purple shrink-0" />
            {!collapsed && <span className="font-display text-xs font-bold gradient-text">Ultimate Cloud</span>}
          </Link>
        </div>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground">Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/dashboard"}
                      className="hover:bg-sidebar-accent/50"
                      activeClassName="bg-sidebar-accent text-sidebar-primary font-medium"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="mt-auto p-4 border-t border-border/30">
          <NavLink to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Home className="h-4 w-4" />
            {!collapsed && <span>Back to Home</span>}
          </NavLink>
        </div>
      </SidebarContent>
    </Sidebar>
  );
};

export default DashboardSidebar;
