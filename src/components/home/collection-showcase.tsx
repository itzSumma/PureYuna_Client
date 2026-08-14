import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { SectionHeading } from "@/components/home/section-heading";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { Reveal } from "@/components/shared/reveal";
import { IMAGES } from "@/lib/images";

export function CollectionShowcase() {
  return (
    <section className="bg-cream py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle organic layout glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-48 size-96 rounded-full bg-[#E3C2B0]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -right-48 size-96 rounded-full bg-[#E3C2B0]/10 blur-3xl"
      />

      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <Reveal>
          <SectionHeading
            variant="light"
            eyebrow="The Collection"
            title={
              <>
                Two paths.{" "}
                <span className="italic text-ochre">One</span> honest
                standard.
              </>
            }
            description="Choose the route that speaks to your skin — botanical care or precision formulation."
          />
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <Link
              href="/products?productType=ORGANIC"
              className="group flex flex-col rounded-[2rem] border border-golden-border bg-[#FAF5F0] p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8"
            >
              <div className="relative aspect-[5/6] overflow-hidden rounded-3xl shadow-sm">
                <ImageWithFallback
                  fill
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  src={IMAGES.organic}
                  alt="Organic botanical serum bottle on a warm linen surface with a fresh leaf beside it"
                  className="absolute inset-0 transition-transform duration-[650ms] ease-out group-hover:scale-[1.03] object-cover"
                />
              </div>

              <div className="mt-8 px-1">
                <p className="text-xs font-semibold tracking-[0.24em] text-foreground/60 uppercase">
                  Organic
                </p>
                <h3 className="mt-3 font-heading text-3xl font-medium tracking-tight text-deep-brown sm:text-4xl">
                  Inspired by nature.
                </h3>
                <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-foreground/80">
                  Naturally inspired skincare designed for gentle everyday
                  rituals.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-caramel transition-colors duration-200 hover:text-caramel/85">
                  Explore Organic
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>

          <Reveal delay={0.12}>
            <Link
              href="/products?productType=FORMULATED"
              className="group flex flex-col rounded-[2rem] border border-golden-border bg-[#FAF5F0] p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 sm:mt-10"
            >
              <div className="relative aspect-[5/6] overflow-hidden rounded-3xl shadow-sm">
                <ImageWithFallback
                  fill
                  sizes="(min-width: 1024px) 42vw, 90vw"
                  src={IMAGES.formulated}
                  alt="A precise glass serum dropper in a warm amber golden-hour light"
                  className="absolute inset-0 transition-transform duration-[650ms] ease-out group-hover:scale-[1.03] object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-3 top-3 flex flex-wrap gap-x-2 gap-y-1"
                >
                  <span className="rounded-full bg-[#FAF5F0]/95 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.2em] text-caramel uppercase shadow-sm backdrop-blur-sm">
                    AHA 8%
                  </span>
                  <span className="rounded-full bg-[#FAF5F0]/95 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.2em] text-caramel uppercase shadow-sm backdrop-blur-sm">
                    Niacinamide
                  </span>
                  <span className="rounded-full bg-[#FAF5F0]/95 px-3 py-1 text-[0.62rem] font-semibold tracking-[0.2em] text-caramel uppercase shadow-sm backdrop-blur-sm">
                    Hyaluronic
                  </span>
                </div>
              </div>

              <div className="mt-8 px-1">
                <p className="text-xs font-semibold tracking-[0.24em] text-foreground/60 uppercase">
                  Formulated
                </p>
                <h3 className="mt-3 font-heading text-3xl font-medium tracking-tight text-deep-brown sm:text-4xl">
                  Targeted skincare.
                </h3>
                <p className="mt-3 max-w-sm text-[16px] leading-relaxed text-foreground/80">
                  Thoughtfully formulated care for specific skin needs.
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-caramel transition-colors duration-200 hover:text-caramel/85">
                  Explore Formulated
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}