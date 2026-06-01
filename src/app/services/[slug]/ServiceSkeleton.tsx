"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export function ServiceSkeleton() {
  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section Skeleton */}
      <div className="relative overflow-hidden bg-gradient-to-br from-(--color-accent-light)/10 via-white to-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <Skeleton className="mb-8 h-6 w-32" />
          
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="flex-1">
              <div className="mb-4 flex items-center gap-2">
                <Skeleton className="h-1 w-12" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="mb-4 h-12 w-3/4" />
              <Skeleton className="h-24 w-full" />
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-10 w-24" />
              <Skeleton className="h-10 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Skeleton className="mb-8 h-96 w-full rounded-2xl" />
            <div className="space-y-8">
              <div>
                <Skeleton className="mb-4 h-8 w-32" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="mt-4 h-20 w-full" />
              </div>
              <div>
                <Skeleton className="mb-4 h-8 w-32" />
                <div className="grid gap-4 sm:grid-cols-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-16 w-full rounded-xl" />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="sticky top-24 space-y-6">
              <Skeleton className="h-48 w-full rounded-2xl" />
              <Skeleton className="h-40 w-full rounded-2xl" />
              <Skeleton className="h-56 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}