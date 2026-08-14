import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
  variant?: "light" | "dark";
}

export function BrandMark({ className, variant = "light" }: BrandMarkProps) {
  const dark = variant === "dark";

  return (
    <Link
      href="/"
      aria-label="PureYuna — home"
      className={cn(
        "group inline-flex items-center gap-2 transition-all duration-300 hover:opacity-90 hover:scale-[1.02] active:scale-95 cursor-pointer",
        className
      )}
    >
      <span
        className={cn(
          "grid size-9 shrink-0 place-items-center transition-transform duration-300 group-hover:-rotate-6",
          dark ? "text-white" : "text-caramel"
        )}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="size-7"
        >
          {/* Custom organic leaf-droplet curve */}
          <path d="M12 2C12 2 4.5 10 4.5 15C4.5 19.14 7.86 22.5 12 22.5C16.14 22.5 19.5 19.14 19.5 15C19.5 10 12 2 12 2Z" />
          <path d="M12 6.5C12 6.5 10 10.5 8 13.5" />
          <path d="M12 10.5C12 10.5 14.5 13.5 16 16" />
          <path d="M12 2.5V22" />
        </svg>
      </span>
      <span
        className={cn(
          "font-heading text-3xl tracking-tight leading-none",
          dark ? "text-white" : "text-caramel"
        )}
      >
        <span className="font-black">Pure</span>
        <span className="italic ml-0.5 font-black">Yuna</span>
      </span>
    </Link>
  );
}