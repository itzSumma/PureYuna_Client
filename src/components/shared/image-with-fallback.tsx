"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "alt"> {
  src: string;
  alt: string;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        role="presentation"
        className={cn(
          "bg-gradient-to-br from-sand/60 via-ivory to-sage/50",
          className
        )}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={cn("object-cover", className)}
      onError={() => setFailed(true)}
      {...props}
    />
  );
}