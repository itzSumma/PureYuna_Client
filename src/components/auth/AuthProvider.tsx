"use client";

import { useEffect } from "react";

import { useAuthStore } from "@/stores/authStore";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useAuthStore.getState().initialize();
  }, []);

  return <>{children}</>;
}