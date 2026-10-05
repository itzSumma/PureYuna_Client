import Image from "next/image";
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
        "group inline-flex items-center gap-2.5 transition-all duration-300 hover:opacity-95 hover:scale-[1.02] active:scale-95 cursor-pointer",
        className
      )}
    >
      <span className="relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3">
        <Image
          src="/logo.png"
          alt="PureYuna"
          width={36}
          height={43}
          priority
          className={cn(
            "h-9 sm:h-10 w-auto object-contain transition-all duration-300",
            dark
              ? "drop-shadow-[0_2px_8px_rgba(230,195,120,0.35)]"
              : "drop-shadow-[0_2px_6px_rgba(130,90,40,0.22)]"
          )}
        />
      </span>
      <span
        className={cn(
          "font-heading text-2xl sm:text-3xl tracking-tight leading-none transition-colors",
          dark ? "text-white" : "text-caramel"
        )}
      >
        <span className="font-black">Pure</span>
        <span className="italic ml-0.5 font-black">Yuna</span>
      </span>
    </Link>
  );
}