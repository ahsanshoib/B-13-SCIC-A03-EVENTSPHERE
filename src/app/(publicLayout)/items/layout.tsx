"use client";

import { useAdminGuard } from "@/hooks/adminGuard";
import { Loader2 } from "lucide-react";

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, isAdmin } = useAdminGuard();

  if (loading || !user || !isAdmin) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <>{children}</>;
}