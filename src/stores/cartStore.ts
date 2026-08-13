import { create } from "zustand";
import type { Product } from "@/types/product";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getSubtotal: () => number;
  getItemCount: () => number;
}

const STORAGE_KEY = "pureyuna_cart";

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function persistCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export const useCartStore = create<CartState>()((set, get) => ({
  items: readCart(),

  addItem: (product, quantity = 1) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      let newItems = [...state.items];

      if (existingIndex > -1) {
        const item = state.items[existingIndex];
        const newQty = Math.min(item.quantity + quantity, product.stock);
        newItems[existingIndex] = { ...item, quantity: newQty };
      } else {
        const initialQty = Math.min(quantity, product.stock);
        newItems.push({ product, quantity: initialQty });
      }

      persistCart(newItems);
      return { items: newItems };
    });
  },

  removeItem: (productId) => {
    set((state) => {
      const newItems = state.items.filter((item) => item.product.id !== productId);
      persistCart(newItems);
      return { items: newItems };
    });
  },

  updateQuantity: (productId, quantity) => {
    set((state) => {
      const newItems = state.items.map((item) => {
        if (item.product.id === productId) {
          const qty = Math.max(1, Math.min(quantity, item.product.stock));
          return { ...item, quantity: qty };
        }
        return item;
      });
      persistCart(newItems);
      return { items: newItems };
    });
  },

  clearCart: () => {
    persistCart([]);
    set({ items: [] });
  },

  getSubtotal: () => {
    return get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },
}));
