import { create } from "zustand";

export type ToastType = "success" | "info" | "error";

interface ToastState {
  message: string | null;
  type: ToastType;
  showToast: (message: string, type?: ToastType) => void;
  hideToast: () => void;
}

let toastTimeout: NodeJS.Timeout | null = null;

export const useToastStore = create<ToastState>()((set) => ({
  message: null,
  type: "success",
  showToast: (message, type = "success") => {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    set({ message, type });
    toastTimeout = setTimeout(() => {
      set({ message: null });
    }, 3000);
  },
  hideToast: () => {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    set({ message: null });
  },
}));
