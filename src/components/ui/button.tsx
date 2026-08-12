import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-terracotta to-ochre text-brand-cream border-t border-white/15 shadow-[0_2px_4px_rgba(184,107,75,0.15),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_4px_8px_rgba(184,107,75,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:scale-[0.97]",
        "primary-organic":
          "bg-gradient-to-br from-terracotta to-ochre text-brand-cream border-t border-white/15 shadow-[0_2px_4px_rgba(184,107,75,0.15),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_4px_8px_rgba(184,107,75,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:scale-[0.97]",
        "primary-formulated":
          "bg-gradient-to-br from-terracotta to-ochre text-brand-cream border-t border-white/20 shadow-[0_2px_4px_rgba(184,107,75,0.15),inset_0_1px_0_rgba(255,255,255,0.15)] hover:shadow-[0_4px_8px_rgba(184,107,75,0.25),inset_0_1px_0_rgba(255,255,255,0.15)] hover:-translate-y-0.5 active:scale-[0.97]",
        outline:
          "border-1.5 border-charcoal bg-transparent text-charcoal hover:bg-charcoal/5 active:scale-[0.97]",
        "secondary-organic":
          "border-1.5 border-organic-primary bg-transparent text-organic-primary hover:bg-organic-primary/8 active:scale-[0.97]",
        "secondary-formulated":
          "border-1.5 border-formulated-primary bg-transparent text-formulated-primary hover:bg-formulated-primary/8 active:scale-[0.97]",
        "secondary-terracotta":
          "border-1.5 border-terracotta bg-transparent text-terracotta hover:bg-terracotta/8 active:scale-[0.97]",
        ghost:
          "hover:bg-charcoal/5 text-charcoal active:scale-[0.97]",
        ghostLight:
          "hover:bg-white/10 text-white/90 hover:text-white active:scale-[0.97]",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 active:scale-[0.97]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default:
          "h-10 gap-2 px-5",
        xs: "h-6 gap-1 rounded-md px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 rounded-md px-3 text-xs [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-12 gap-2.5 px-8 text-base",
        icon: "size-10",
        "icon-xs":
          "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-8 rounded-md",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
