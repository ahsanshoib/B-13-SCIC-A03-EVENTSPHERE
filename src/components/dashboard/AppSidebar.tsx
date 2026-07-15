"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CalendarPlus, ListChecks, CalendarDays, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const items = [
  { title: "Overview", url: "/dashboard/overview", icon: LayoutDashboard },
  { title: "All Events", url: "/dashboard/all-events", icon: ListChecks },
  { title: "Create Event", url: "/dashboard/create-event", icon: CalendarPlus },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    toast.success("Logged out successfully");
    router.push("/");
  };

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <CalendarDays className="h-6 w-6 text-primary" />
          <span>EventSphere</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (

                <SidebarMenuItem key={item.url}>
                  <SidebarMenuButton
                    render={<Link href={item.url} />}
                    isActive={pathname === item.url}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                  
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground mb-2 truncate">
          {user?.email}
        </div>
        <SidebarMenuButton onClick={handleLogout} className="text-destructive">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}