"use client";

import { AppSidebar } from "@/components/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthGuard } from "@/hooks/authGuard";
import { Loader2 } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthGuard();

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 min-w-0">
        <div className="flex items-center gap-3 border-b border-border/50 px-4 py-3">
          <SidebarTrigger />
          <span className="text-sm font-medium text-muted-foreground">Dashboard</span>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </SidebarProvider>
  );
}