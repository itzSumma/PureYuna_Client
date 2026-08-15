'use client';

import React, { useEffect } from 'react';
import { useAuthStore } from '@/stores/authStore';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    if (typeof initialize === 'function') {
      initialize();
    }
  }, [initialize]);

  return <>{children}</>;
};