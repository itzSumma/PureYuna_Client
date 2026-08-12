import Link from "next/link";
import { Leaf } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SITE_TAGLINE } from "@/constants/site";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-10%] h-96 w-96 rounded-full bg-sage/70 blur-3xl" />
        <div className="absolute top-1/2 left-[-12%] h-80 w-80 rounded-full bg-clay/20 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[20%] h-72 w-72 rounded-full bg-sage/40 blur-3xl" />
      </div>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6 lg:px-8 lg:py-32">
        <Badge
          variant="secondary"
          className="gap-1.5 rounded-full px-3 py-1 text-xs font-medium"
        >
          <Leaf className="size-3.5 text-primary" />
          {SITE_TAGLINE}
        </Badge>

        <h1 className="mt-6 max-w-2xl font-heading text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
          Skincare that is{" "}
          <span className="bg-gradient-to-r from-leaf to-clay bg-clip-text text-transparent">
            pure by nature
          </span>
          .
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          Thoughtfully made, honestly priced. Browse organic and formulated
          skincare matched to your skin type, or build a routine that is truly
          yours.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Button size="lg" render={<Link href="/products" />}>
            Explore Products
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/build-package" />}>
            Build Your Package
          </Button>
        </div>

        <div className="mt-16 grid w-full max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { title: "Organic & Formulated", text: "Two clear paths, both clean" },
            { title: "Matched to your skin", text: "Filter by type and need" },
            { title: "Honest pricing", text: "No hidden extras, ever" },
          ].map((point) => (
            <div
              key={point.title}
              className="rounded-2xl border border-border/60 bg-card/70 px-5 py-4 text-left backdrop-blur-sm"
            >
              <p className="font-heading text-sm font-semibold">{point.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{point.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}