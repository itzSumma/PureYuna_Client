"use client";

import { BrandMark } from "@/components/shared/brand-mark";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";
import { IMAGES } from "@/lib/images";

interface AuthShellProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export function AuthShell({ title, subtitle, children }: AuthShellProps) {
  return (
    <div className="flex min-h-full flex-1">
      <div className="relative hidden lg:block lg:w-[42%]">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            fill
            priority
            sizes="42vw"
            src={IMAGES.auth}
            alt="Editorial still of a person in a calm skincare routine"
            className="absolute inset-0"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/15 to-transparent"
          />
        </div>
        <div className="absolute inset-x-10 bottom-10 max-w-sm">
          <p className="text-xs font-semibold tracking-[0.24em] text-ivory/80 uppercase">
            PureYuna
          </p>
          <p className="mt-4 font-heading text-3xl leading-tight font-medium text-ivory">
            Skincare shouldn&apos;t be complicated.
            <br />
            It should be <span className="italic">personal.</span>
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-4 py-16 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <BrandMark />
          </div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-organic-primary uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-organic-primary/35" />
            PureYuna
          </p>
          <h1 className="mt-5 font-heading text-3xl leading-tight font-medium tracking-tight text-balance sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>
          <div className="mt-9">{children}</div>
        </div>
      </div>
    </div>
  );
}