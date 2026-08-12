"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { useAuthStore } from "@/stores/authStore";
import type { Role } from "@/types/user";

interface RequireAuthProps {
  children: React.ReactNode;
  roles?: Role[];
}

export function RequireAuth({ children, roles }: RequireAuthProps) {
  const router = useRouter();
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const isAuthenticated = Boolean(isInitialized && token && user);
  const hasRole = !roles || (user != null && roles.includes(user.role));

  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    if (!isAuthenticated) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!hasRole) {
      router.replace("/");
    }
  }, [isInitialized, isAuthenticated, hasRole, pathname, router]);

  if (!isInitialized || !isAuthenticated || !hasRole) {
    return (
      <div className="flex flex-1 items-center justify-center p-16">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return <>{children}</>;
}