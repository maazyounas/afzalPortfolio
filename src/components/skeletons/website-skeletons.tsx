import { Skeleton } from "@/components/ui/Skeleton";

function CardBlock() {
  return (
    <div className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-sm">
      <Skeleton className="h-5 w-24 rounded-full" />
      <Skeleton className="mt-4 h-8 w-3/4 rounded-xl" />
      <Skeleton className="mt-3 h-24 w-full rounded-2xl" />
      <Skeleton className="mt-6 h-10 w-36 rounded-xl" />
    </div>
  );
}

export function WebsiteHomeSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
      <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
        <div className="space-y-5">
          <Skeleton className="h-4 w-64 rounded-full" />
          <Skeleton className="h-14 w-full max-w-4xl rounded-3xl" />
          <Skeleton className="h-8 w-full max-w-2xl rounded-2xl" />
          <Skeleton className="h-8 w-11/12 max-w-2xl rounded-2xl" />
          <div className="flex flex-col gap-3 sm:flex-row">
            <Skeleton className="h-12 w-full rounded-2xl sm:w-52" />
            <Skeleton className="h-12 w-full rounded-2xl sm:w-44" />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <CardBlock key={index} />
          ))}
        </div>
      </div>

      <div className="mt-16 space-y-6">
        <div className="flex items-end justify-between gap-4">
          <div className="space-y-3">
            <Skeleton className="h-5 w-28 rounded-full" />
            <Skeleton className="h-8 w-72 rounded-xl" />
          </div>
          <Skeleton className="hidden h-4 w-28 rounded-full sm:block" />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardBlock key={index} />
          ))}
        </div>
      </div>

      <div className="mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]">
        <CardBlock />
        <CardBlock />
      </div>

      <div className="mt-16 space-y-6">
        <Skeleton className="h-8 w-60 rounded-xl" />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <CardBlock key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BlogListSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
      <Skeleton className="h-5 w-28 rounded-full" />
      <Skeleton className="mt-4 h-12 w-full max-w-3xl rounded-2xl" />
      <Skeleton className="mt-4 h-8 w-full max-w-2xl rounded-2xl" />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardBlock key={index} />
        ))}
      </div>
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
      <Skeleton className="h-4 w-28 rounded-full" />
      <Skeleton className="mt-4 h-12 w-full max-w-4xl rounded-2xl" />
      <Skeleton className="mt-4 h-6 w-full max-w-2xl rounded-2xl" />
      <div className="mt-8 rounded-[2rem] border border-[var(--color-line)] bg-white p-8 shadow-sm">
        <Skeleton className="h-64 w-full rounded-[1.75rem]" />
        <Skeleton className="mt-6 h-4 w-44 rounded-full" />
        <div className="mt-6 space-y-4">
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-full rounded-full" />
          <Skeleton className="h-4 w-11/12 rounded-full" />
          <Skeleton className="h-4 w-10/12 rounded-full" />
          <Skeleton className="h-4 w-9/12 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function ServicesListSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
      <Skeleton className="h-5 w-32 rounded-full" />
      <Skeleton className="mt-4 h-12 w-full max-w-4xl rounded-2xl" />
      <Skeleton className="mt-4 h-8 w-full max-w-2xl rounded-2xl" />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <CardBlock key={index} />
        ))}
      </div>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <CardBlock key={index} />
        ))}
      </div>
    </div>
  );
}

export function TeamListSkeleton() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-16">
      <Skeleton className="h-5 w-28 rounded-full" />
      <Skeleton className="mt-4 h-12 w-full max-w-3xl rounded-2xl" />
      <Skeleton className="mt-4 h-8 w-full max-w-2xl rounded-2xl" />
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-sm"
          >
            <Skeleton className="h-48 w-full rounded-[1.5rem]" />
            <Skeleton className="mt-5 h-4 w-24 rounded-full" />
            <Skeleton className="mt-3 h-7 w-3/4 rounded-xl" />
            <Skeleton className="mt-3 h-16 w-full rounded-2xl" />
            <Skeleton className="mt-6 h-10 w-28 rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
