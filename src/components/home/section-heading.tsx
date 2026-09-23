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
            "flex items-center gap-3 text-xs font-bold tracking-[0.24em] uppercase",
            isDark ? "text-warm-white/90" : "text-caramel",
            align === "center" && "justify-center"
          )}
        >
          <span aria-hidden="true" className={cn("h-px w-8", isDark ? "bg-white/30" : "bg-caramel/40")} />
          {eyebrow}
          {align === "center" && (
            <span aria-hidden="true" className={cn("h-px w-8", isDark ? "bg-white/30" : "bg-caramel/40")} />
          )}
        </p>
      )}
      <h2 className={cn(
        "mt-5 font-heading text-3xl font-medium tracking-tight text-balance sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]",
        isDark ? "text-warm-white" : "text-deep-brown"
      )}>
        {title}
      </h2>
      {description && (
        <p className={cn(
          "mt-4 text-base leading-relaxed sm:text-lg",
          isDark ? "text-warm-white/80" : "text-deep-brown/85 font-normal"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}