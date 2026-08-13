import { create } from "zustand";

import { TOKEN_STORAGE_KEY } from "@/lib/axios";
import type { AuthUser } from "@/types/user";

const USER_STORAGE_KEY = "pureyuna_user";

function readToken(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_STORAGE_KEY);
}

function readUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(USER_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    window.localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }
}

function persistToken(token: string | null) {
  if (typeof window === "undefined") return;
  if (token) window.localStorage.setItem(TOKEN_STORAGE_KEY, token);
  else window.localStorage.removeItem(TOKEN_STORAGE_KEY);
}

function persistUser(user: AuthUser | null) {
  if (typeof window === "undefined") return;
  if (user) window.localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  else window.localStorage.removeItem(USER_STORAGE_KEY);
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
  initialize: () => void;
  setAuth: (token: string, user: AuthUser) => void;
  setUser: (user: AuthUser) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isInitialized: false,

  initialize: () =>
    set((state) => {
      if (state.isInitialized) return state;

      const token = readToken();
      const user = readUser();

      if (!token || !user) {
        if (token) persistToken(null);
        if (user) persistUser(null);
        return { token: null, user: null, isAuthenticated: false, isInitialized: true };
      }

      return { token, user, isAuthenticated: true, isInitialized: true };
    }),

  setAuth: (token, user) => {
    persistToken(token);
    persistUser(user);
    set({ token, user, isAuthenticated: true });
  },

  setUser: (user) => {
    persistUser(user);
    set({ user, isAuthenticated: true });
  },

  logout: () => {
    persistToken(null);
    persistUser(null);
    set({ token: null, user: null, isAuthenticated: false });
  },
}));

export const selectIsAuthenticated = (state: AuthState) =>
  Boolean(state.token && state.user);

export const selectUser = (state: AuthState) => state.user;