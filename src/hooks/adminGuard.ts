"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export function useAdminGuard() {
  const { user, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push("/login");
      } else if (!isAdmin) {
        router.push("/");
      }
    }
  }, [user, loading, isAdmin, router]);

  return { user, loading, isAdmin };
}