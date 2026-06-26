"use client";

import { Skeleton } from "@/components/ui/Skeleton";

export function ServiceSkeleton() {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
      <article className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-[0_18px_60px_rgba(17,33,31,0.08)] sm:p-8">
        <Skeleton className="mb-8 h-56 w-full rounded-[1.5rem]" />
        <Skeleton className="h-6 w-44" />
        <Skeleton className="mt-6 h-12 w-3/4" />
        <Skeleton className="mt-4 h-24 w-full" />
        <div className="mt-6 space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-4/5" />
        </div>
        <div className="mt-10 flex flex-wrap gap-3 border-t border-[var(--color-line)] pt-6">
          <Skeleton className="h-11 w-40 rounded-xl" />
          <Skeleton className="h-11 w-32 rounded-xl" />
        </div>
      </article>

      <aside className="space-y-6">
        <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
          <Skeleton className="h-6 w-24" />
          <div className="mt-4 flex gap-3">
            <Skeleton className="h-11 flex-1 rounded-xl" />
            <Skeleton className="h-11 flex-1 rounded-xl" />
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
          <Skeleton className="h-6 w-32" />
          <div className="mt-4 space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        </div>

        <Skeleton className="h-48 w-full rounded-[1.75rem]" />
      </aside>
    </div>
  );
}
