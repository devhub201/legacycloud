import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, Server, Tag, BookOpen, LifeBuoy, FileText, Cloud, ArrowLeft, Star, Gift, ScrollText } from "lucide-react";
import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel,
  SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader, useSidebar,
} from "@/components/ui/sidebar";

const items = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Users", url: "/admin/users", icon: Users },
  { title: "Services", url: "/admin/services", icon: Server },
  { title: "Free Panel", url: "/admin/free-panel", icon: Gift },
  { title: "Promo Codes", url: "/admin/promo-codes", icon: Tag },
  { title: "Reviews", url: "/admin/reviews", icon: Star },
  { title: "Knowledgebase", url: "/admin/knowledgebase", icon: BookOpen },
  { title: "Tickets", url: "/admin/tickets", icon: LifeBuoy },
  { title: "Invoices", url: "/admin/invoices", icon: FileText },
  { title: "Activity Logs", url: "/admin/logs", icon: ScrollText },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const { pathname } = useLocation();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-border">
        <NavLink to="/admin" className="flex items-center gap-2 px-2 py-2">
          <Cloud className="h-6 w-6 text-primary" />
          {!collapsed && <span className="font-display font-bold"><span className="text-primary">ADMIN</span> PANEL</span>}
        </NavLink>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {!collapsed && <SidebarGroupLabel>Management</SidebarGroupLabel>}
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
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink to="/dashboard" className="flex items-center gap-3">
                    <ArrowLeft className="h-4 w-4 shrink-0" />
                    {!collapsed && <span>Back to Client</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
