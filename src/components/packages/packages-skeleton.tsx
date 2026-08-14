import React from "react";

export function PackagesListSkeleton() {
  return (
    <div className="grid gap-12 lg:grid-cols-3 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-3xl border border-[#EBDCD2] bg-[#FAF5F0] overflow-hidden flex flex-col h-[500px]"
        >
          {/* Image Skeleton */}
          <div className="aspect-[4/3] w-full bg-taupe/20" />
          
          {/* Card Body Skeleton */}
          <div className="p-6 flex-1 flex flex-col space-y-6">
            <div className="space-y-3">
              <div className="h-2 w-16 bg-taupe/20 rounded-full" />
              <div className="h-6 w-3/4 bg-taupe/20 rounded-lg" />
              <div className="h-3 w-full bg-taupe/20 rounded-md" />
              <div className="h-3 w-5/6 bg-taupe/20 rounded-md" />
            </div>

            <div className="space-y-2 pt-4 border-t border-[#EBDCD2]/50">
              <div className="h-2.5 w-12 bg-taupe/20 rounded-full" />
              <div className="h-3 w-full bg-taupe/20 rounded-md" />
              <div className="h-3 w-2/3 bg-taupe/20 rounded-md" />
            </div>

            <div className="mt-auto pt-4 flex items-center justify-between border-t border-[#EBDCD2]/50">
              <div className="space-y-1">
                <div className="h-2 w-12 bg-taupe/20 rounded-full" />
                <div className="h-5 w-16 bg-taupe/20 rounded-md" />
              </div>
              <div className="h-8 w-24 bg-taupe/20 rounded-lg" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function PackageDetailSkeleton() {
  return (
    <div className="space-y-16 animate-pulse">
      {/* Hero Skeleton */}
      <section className="grid gap-12 lg:grid-cols-2 items-center">
        <div className="aspect-[4/3] w-full bg-taupe/20 rounded-3xl" />
        <div className="space-y-6">
          <div className="h-2 w-16 bg-taupe/20 rounded-full" />
          <div className="h-10 w-2/3 bg-taupe/20 rounded-lg" />
          <div className="space-y-2">
            <div className="h-3.5 w-full bg-taupe/20 rounded-md" />
            <div className="h-3.5 w-5/6 bg-taupe/20 rounded-md" />
            <div className="h-3.5 w-4/5 bg-taupe/20 rounded-md" />
          </div>
          <div className="h-16 w-60 bg-taupe/20 rounded-2xl" />
          <div className="h-12 w-44 bg-taupe/20 rounded-xl" />
        </div>
      </section>

      {/* Routine Steps Skeleton */}
      <section className="space-y-8 border-t border-[#EBDCD2] pt-16">
        <div className="h-8 w-48 bg-taupe/20 rounded-lg mx-auto" />
        <div className="grid gap-8 md:grid-cols-2">
          <div className="h-60 bg-taupe/20 rounded-3xl" />
          <div className="h-60 bg-taupe/20 rounded-3xl" />
        </div>
      </section>
    </div>
  );
}
