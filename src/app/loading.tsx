import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-6">
        <Skeleton className="h-6 w-44 rounded-full" />
        <Skeleton className="h-12 w-full max-w-3xl rounded-2xl" />
        <Skeleton className="h-20 w-full max-w-4xl rounded-3xl" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[2rem] border border-[var(--color-line)] bg-white p-6 shadow-sm"
            >
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="mt-4 h-8 w-3/4 rounded-xl" />
              <Skeleton className="mt-3 h-24 w-full rounded-2xl" />
              <Skeleton className="mt-6 h-10 w-32 rounded-xl" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
