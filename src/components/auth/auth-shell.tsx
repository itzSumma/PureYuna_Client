"use client";

import { BrandMark } from "@/components/shared/brand-mark";
import { ImageWithFallback } from "@/components/shared/image-with-fallback";

interface AuthShellProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  overlayText: string;
  children: React.ReactNode;
}

export function AuthShell({ title, subtitle, imageSrc, overlayText, children }: AuthShellProps) {
  return (
    <div className="flex min-h-screen flex-1 bg-cream auth-shell-container">
      {/* Column 1: Image Panel (hidden on mobile) */}
      <div className="relative hidden lg:block lg:w-1/2 h-screen sticky top-0">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            fill
            priority
            sizes="50vw"
            src={imageSrc}
            alt="Editorial still of a person in a calm skincare routine"
            className="absolute inset-0 object-cover"
          />
          {/* Subtle, dark glassmorphic gradient overlay */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-[#3A2820]/90 via-[#3A2820]/45 to-transparent backdrop-blur-[2px]"
          />
        </div>
        <div className="absolute inset-x-12 bottom-16 max-w-lg z-10">
          <p className="text-xs font-semibold tracking-[0.24em] text-[#FFF9EE]/75 uppercase">
            PureYuna Sanctuary
          </p>
          <h2 className="mt-4 font-heading text-4xl leading-tight font-medium text-[#FFF9EE]">
            {overlayText}
          </h2>
        </div>
      </div>
 
      {/* Column 2: Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-12 lg:w-1/2 bg-cream">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <BrandMark />
          </div>
          <p className="flex items-center gap-3 text-deep-brown/75 text-xs uppercase tracking-widest font-medium">
            <span aria-hidden="true" className="h-px w-8 bg-deep-brown/25" />
            PureYuna
          </p>
          <h1 className="mt-5 text-deep-brown font-serif font-normal text-3xl sm:text-4xl leading-tight tracking-tight">
            {title}
          </h1>
          <p className="text-deep-brown/85 text-sm font-light mt-2">{subtitle}</p>
          <div className="mt-9">{children}</div>
        </div>
      </div>
    </div>
  );
}