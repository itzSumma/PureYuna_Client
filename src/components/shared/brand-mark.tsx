import Link from "next/link";
import { Leaf } from "lucide-react";

import { cn } from "@/lib/utils";

interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className }: BrandMarkProps) {
  return (
    <Link
      href="/"
      aria-label="PureYuna — home"
      className={cn("group inline-flex items-center gap-2", className)}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-leaf to-emerald-800 text-leaf-foreground shadow-sm transition-transform duration-300 group-hover:-rotate-6">
        <Leaf className="size-4" />
      </span>
      <span className="font-heading text-lg font-semibold tracking-tight">
        Pure<span className="text-primary">Yuna</span>
      </span>
    </Link>
  );
}