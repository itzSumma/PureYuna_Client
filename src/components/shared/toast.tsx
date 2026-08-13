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
          ? "border-[#B86B4B] bg-[#FAF5EF]/95 text-[#3A2820]"
          : type === "error"
          ? "border-[#3A2820] bg-[#B86B4B] text-[#FAF5EF]"
          : "border-[#3A2820]/15 bg-[#FAF5EF]/90 text-[#3A2820]"
      )}
      role="status"
    >
      <div className="flex items-center gap-3">
        <span
          className={cn(
            "size-2 rounded-full animate-pulse",
            type === "success"
              ? "bg-[#B86B4B]"
              : type === "error"
              ? "bg-[#FAF5EF]"
              : "bg-[#3A2820]/40"
          )}
        />
        <span className="text-sm font-medium tracking-wide">{message}</span>
        <button 
          onClick={hideToast}
          className={cn(
            "ml-2 text-lg font-light hover:opacity-80 cursor-pointer focus:outline-none leading-none",
            type === "error" ? "text-[#FAF5EF]/80" : "text-[#3A2820]/80"
          )}
          aria-label="Close toast"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
