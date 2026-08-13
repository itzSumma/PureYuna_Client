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
    <div className="flex min-h-screen flex-1 bg-gradient-to-br from-[#DF8E73] to-[#E89F88] auth-shell-container">
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
          <p className="text-xs font-semibold tracking-[0.24em] text-[#FAF5EF]/75 uppercase">
            PureYuna Sanctuary
          </p>
          <h2 className="mt-4 font-heading text-4xl leading-tight font-medium text-[#FAF5EF]">
            {overlayText}
          </h2>
        </div>
      </div>

      {/* Column 2: Form */}
      <div className="flex flex-1 items-center justify-center px-6 py-16 sm:px-12 lg:w-1/2 bg-gradient-to-br from-[#DF8E73] to-[#E89F88]">
        <div className="w-full max-w-md">
          <div className="mb-10 lg:hidden">
            <BrandMark />
          </div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-[#B86B4B] uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-[#B86B4B]/35" />
            PureYuna
          </p>
          <h1 className="mt-5 font-heading text-3xl leading-tight font-medium tracking-tight text-[#3A2820] sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-[#3A2820]/70">{subtitle}</p>
          <div className="mt-9">{children}</div>
        </div>
      </div>
    </div>
  );
}