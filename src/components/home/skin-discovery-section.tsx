"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { SkinType } from "@/types/product";

const skinTypes: { type: SkinType; displayName: string; description: string; imageUrl: string }[] = [
  { 
    type: "OILY", 
    displayName: "Oily & Shiny", 
    description: "Balanced, shine-free confidence",
    imageUrl: "https://plus.unsplash.com/premium_photo-1708271587084-af26622d8b02?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    type: "DRY", 
    displayName: "Dry & Flaky", 
    description: "Deep, lasting moisture",
    imageUrl: "https://plus.unsplash.com/premium_photo-1671717725128-aa3f2e857c8c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    type: "NORMAL", 
    displayName: "Normal / Balanced", 
    description: "Simply, gracefully in harmony",
    imageUrl: "https://images.unsplash.com/photo-1614817232756-bb1a0781f4b9?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    type: "COMBINATION", 
    displayName: "Combination", 
    description: "Two sides, one thoughtful plan",
    imageUrl: "https://plus.unsplash.com/premium_photo-1683140815244-7441fd002195?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  { 
    type: "SENSITIVE", 
    displayName: "Sensitive", 
    description: "Gentle, calm, protective care",
    imageUrl: "https://images.unsplash.com/photo-1730288951113-9cc087c14b83?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
];

export function SkinDiscoverySection() {
  const [selectedType, setSelectedType] = useState<SkinType | null>(null);

  return (
    <section className="relative overflow-hidden bg-cream py-12 sm:py-16 lg:py-20 border-t border-golden-border/60">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-white/5 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            variant="light"
            eyebrow="Skin Discovery"
            title="What does your skin need today?"
            description="Not just what sells — what suits you. Select your type to reveal your custom routine."
          />
        </Reveal>

        <div className="mt-10 sm:mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {skinTypes.map((item, index) => {
            const isSelected = selectedType === item.type;
            return (
              <Reveal key={item.type} delay={index * 0.06} className="h-full">
                <button
                  type="button"
                  onClick={() => setSelectedType(item.type)}
                  className={cn(
                    "group relative flex h-full w-full flex-col text-left overflow-hidden rounded-2xl border transition-all duration-700 ease-in-out cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-caramel",
                    isSelected
                      ? "bg-caramel border-caramel shadow-[0_12px_28px_rgba(74,30,39,0.2)] -translate-y-1.5"
                      : "bg-white border-golden-border hover:border-caramel/40 hover:-translate-y-1 hover:shadow-md"
                  )}
                >
                  {/* Uniform Aspect Ratio Image Container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-golden-border/30">
                    <img
                      src={item.imageUrl}
                      alt={`Close-up representing ${
                        item.type === "SENSITIVE"
                          ? "sensitive"
                          : item.type.toLowerCase()
                      } skin`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent"
                    />

                    {/* Active Selected checkmark badge */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 z-10 flex size-7 items-center justify-center rounded-full bg-white text-caramel shadow-md animate-in zoom-in-50 duration-200">
                        <Check className="size-4" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  {/* Card Content & Typographic Hierarchy */}
                  <div className="flex flex-1 flex-col p-4 sm:p-4.5">
                    {/* Tier 1: Category Tag */}
                    <span
                      className={cn(
                        "text-[11px] font-bold tracking-[0.22em] uppercase transition-colors duration-500 ease-in-out",
                        isSelected ? "text-warm-white/85" : "text-caramel/90"
                      )}
                    >
                      Skin Type
                    </span>

                    {/* Tier 2: Display Title */}
                    <h3
                      className={cn(
                        "mt-1 font-heading text-xl sm:text-2xl font-semibold tracking-tight transition-colors duration-500 ease-in-out",
                        isSelected ? "text-white" : "text-deep-brown"
                      )}
                    >
                      {item.displayName}
                    </h3>

                    {/* Tier 3: Body Description */}
                    <p
                      className={cn(
                        "mt-1.5 text-xs sm:text-sm leading-relaxed transition-colors duration-500 ease-in-out flex-1 line-clamp-2",
                        isSelected ? "text-white/85" : "text-deep-brown/75"
                      )}
                    >
                      {item.description}
                    </p>

                    {/* Distinct 'SELECT TYPE' Button Pill */}
                    <div className="mt-auto pt-4">
                      <div
                        className={cn(
                          "inline-flex w-full items-center justify-center rounded-full py-2 px-3 text-xs font-semibold tracking-wider uppercase transition-all duration-500 ease-in-out shadow-xs",
                          isSelected
                            ? "border border-white bg-white text-caramel font-bold shadow-md"
                            : "border border-golden-border bg-[#FAF5F0] text-deep-brown group-hover:border-caramel group-hover:bg-caramel group-hover:text-warm-white group-hover:shadow-sm"
                        )}
                      >
                        {isSelected ? (
                          <span className="flex items-center gap-1.5 font-bold">
                            <Check className="size-3.5" strokeWidth={3} />
                            Selected
                          </span>
                        ) : (
                          "Select Type"
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>

        {/* Dynamic CTA Row */}
        {selectedType && (
          <div className="mt-8 sm:mt-10 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-350 ease-out">
            <Button
              size="lg"
              variant="default"
              nativeButton={false}
              render={
                <Link
                  href={`/products?skinType=${selectedType}`}
                  className="inline-flex items-center gap-2 text-base sm:text-lg font-medium h-12 px-8 shadow-md"
                />
              }
            >
              Reveal My {skinTypes.find((t) => t.type === selectedType)?.displayName} Routine
              <ArrowRight className="size-5 transition-transform group-hover/button:translate-x-0.5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}