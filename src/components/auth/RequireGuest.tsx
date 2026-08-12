"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuthStore } from "@/stores/authStore";

export function RequireGuest({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const isInitialized = useAuthStore((state) => state.isInitialized);

  const isAuthenticated = Boolean(isInitialized && token && user);

  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      router.replace("/");
    }
  }, [isInitialized, isAuthenticated, router]);

  return <>{children}</>;
}