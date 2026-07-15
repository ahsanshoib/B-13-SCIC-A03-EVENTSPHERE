import { useAuthContext } from "@/providers/authProvider";
import { isAdmin } from "@/lib/auth";

export function useAuth() {
  const context = useAuthContext();
  return {
    ...context,
    isAdmin: isAdmin(context.user?.email),
  };
}