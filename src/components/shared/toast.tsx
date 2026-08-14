"use client";

import { useToastStore } from "@/stores/toastStore";
import { cn } from "@/lib/utils";

export function Toast() {
  const { message, type, hideToast } = useToastStore();

  if (!message) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 rounded-2xl border px-5 py-3.5 shadow-lg backdrop-blur-md transition-all duration-300",
        type === "success"
          ? "border-caramel bg-champagne-highlight/95 text-deep-brown"
          : type === "error"
          ? "border-deep-brown bg-caramel text-warm-white"
          : "border-deep-brown/15 bg-champagne-highlight/90 text-deep-brown"
      )}
      role="status"
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "size-2 rounded-full animate-pulse",
            type === "success"
              ? "bg-caramel"
              : type === "error"
              ? "bg-warm-white"
              : "bg-deep-brown/40"
          )}
        />
        <span className="text-sm font-medium tracking-wide">{message}</span>
        <button 
          onClick={hideToast}
          className={cn(
            "ml-2 text-lg font-light hover:opacity-80 cursor-pointer focus:outline-none leading-none",
            type === "error" ? "text-warm-white/80" : "text-deep-brown/80"
          )}
          aria-label="Close toast"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
