import { create } from "zustand";
import { apiDelete, apiGet, apiPost } from "@/lib/axios";
import { useAuthStore } from "./authStore";
import type { WishlistItem } from "@/types/wishlist";
import type { Product } from "@/types/product";
import type { ApiSuccessResponse } from "@/types/api";

interface WishlistState {
  items: WishlistItem[];
  productIds: string[];
  fetchWishlist: () => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
  clearWishlist: () => void;
}

const STORAGE_KEY = "pureyuna_wishlist";

function readLocalWishlist(): WishlistItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as WishlistItem[]) : [];
  } catch {
    return [];
  }
}

function persistLocalWishlist(items: WishlistItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const useWishlistStore = create<WishlistState>()((set, get) => ({
  items: [],
  productIds: [],

  fetchWishlist: async () => {
    const { isAuthenticated } = useAuthStore.getState();

    if (isAuthenticated) {
      try {
        const response = await apiGet<ApiSuccessResponse<WishlistItem[]>>("/wishlists");
        const items = response.data || [];
        set({
          items,
          productIds: items.map((item) => item.productId),
        });
      } catch (err) {
        console.error("Failed to fetch wishlist from backend:", err);
      }
    } else {
      const items = readLocalWishlist();
      set({
        items,
        productIds: items.map((item) => item.productId),
      });
    }
  },

  toggleWishlist: async (product: Product) => {
    const { isAuthenticated } = useAuthStore.getState();
    const { items } = get();
    const existingItem = items.find((item) => item.productId === product.id);

    if (existingItem) {
      // Remove from wishlist
      if (isAuthenticated) {
        try {
          await apiDelete(`/wishlists/${existingItem.id}`);
          const newItems = items.filter((item) => item.id !== existingItem.id);
          set({
            items: newItems,
            productIds: newItems.map((item) => item.productId),
          });
        } catch (err) {
          console.error("Failed to remove item from backend wishlist:", err);
        }
      } else {
        const newItems = items.filter((item) => item.productId !== product.id);
        persistLocalWishlist(newItems);
        set({
          items: newItems,
          productIds: newItems.map((item) => item.productId),
        });
      }
    } else {
      // Add to wishlist
      if (isAuthenticated) {
        try {
          const response = await apiPost<ApiSuccessResponse<WishlistItem>>("/wishlists", {
            productId: product.id,
          });
          const newItem = response.data;
          const newItems = [...items, newItem];
          set({
            items: newItems,
            productIds: newItems.map((item) => item.productId),
          });
        } catch (err) {
          console.error("Failed to add item to backend wishlist:", err);
        }
      } else {
        const newItem: WishlistItem = {
          id: `local-${Math.random().toString(36).slice(2, 11)}`,
          userId: "guest",
          productId: product.id,
          createdAt: new Date().toISOString(),
          product,
        };
        const newItems = [...items, newItem];
        persistLocalWishlist(newItems);
        set({
          items: newItems,
          productIds: newItems.map((item) => item.productId),
        });
      }
    }
  },

  clearWishlist: () => {
    persistLocalWishlist([]);
    set({ items: [], productIds: [] });
  },
}));
