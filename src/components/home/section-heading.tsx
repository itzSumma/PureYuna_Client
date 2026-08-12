import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
  variant?: "light" | "dark";
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  variant = "light",
}: SectionHeadingProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase",
            isDark ? "text-cream/80" : "text-charcoal",
            align === "center" && "justify-center"
          )}
        >
          <span aria-hidden="true" className={cn("h-px w-8", isDark ? "bg-cream/25" : "bg-charcoal/25")} />
          {eyebrow}
          {align === "center" && (
            <span aria-hidden="true" className={cn("h-px w-8", isDark ? "bg-cream/25" : "bg-charcoal/25")} />
          )}
        </p>
      )}
      <h2 className={cn(
        "mt-5 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
        isDark ? "text-cream" : "text-charcoal"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 text-sm leading-relaxed sm:text-base",
          isDark ? "text-cream/70" : "text-charcoal/70"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}