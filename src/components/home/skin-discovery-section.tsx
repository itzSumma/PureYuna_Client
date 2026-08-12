"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Button } from "@/components/ui/button";
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
    <section className="relative overflow-hidden bg-[#E4967C] py-20 lg:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-24 size-96 rounded-full bg-white/5 blur-3xl"
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeading
            variant="dark"
            eyebrow="Skin Discovery"
            title="What does your skin need today?"
            description="Not just what sells — what suits you. Select your type to reveal your custom routine."
          />
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {skinTypes.map((item, index) => {
            const isSelected = selectedType === item.type;
            return (
              <Reveal key={item.type} delay={index * 0.06} className="h-full">
                <button
                  type="button"
                  onClick={() => setSelectedType(item.type)}
                  className={`group relative flex h-full w-full flex-col text-left overflow-hidden rounded-2xl border transition-all duration-300 bg-[#B86B4B] cursor-pointer ${
                    isSelected
                      ? "border-2 border-white shadow-[0_0_0_4px_rgba(255,255,255,0.2)] -translate-y-1"
                      : "border-white/10 hover:-translate-y-1 hover:shadow-md"
                  }`}
                >
                  <div className="relative h-56 w-full overflow-hidden">
                    <img
                      src={item.imageUrl}
                      alt={`Close-up of ${
                        item.type === "SENSITIVE"
                          ? "sensitive"
                          : item.type.toLowerCase()
                      } skin`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
                    />

                    {/* Active Selected checkmark overlay */}
                    {isSelected && (
                      <div className="absolute top-2.5 right-2.5 z-10 flex size-7 items-center justify-center rounded-full bg-white text-terracotta shadow-sm animate-in zoom-in-50 duration-200">
                        <Check className="size-4" strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col px-4 pt-3.5 pb-3">
                    <span className="text-[0.62rem] font-semibold tracking-[0.22em] text-brand-cream/60 uppercase">
                      Skin Type
                    </span>
                    <span className="mt-0.5 font-heading text-2xl font-medium tracking-tight text-white">
                      {item.displayName}
                    </span>
                    <p className="mt-1 text-base leading-snug text-brand-cream/80">
                      {item.description}
                    </p>

                    {/* Soft Option Selection Pill Bar */}
                    <div className="mt-3">
                      <div
                        className={`inline-flex items-center justify-center rounded-full px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-200 ${
                          isSelected
                            ? "bg-white text-terracotta"
                            : "bg-white/15 text-brand-cream hover:bg-white/25 hover:text-white"
                        }`}
                      >
                        {isSelected ? "Selected" : "Select Type"}
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
          <div className="mt-14 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-350 ease-out">
            <Button
              size="lg"
              variant="default"
              render={
                <Link
                  href={`/products?skinType=${selectedType}`}
                  className="inline-flex items-center gap-2 text-lg font-medium h-12 px-8"
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