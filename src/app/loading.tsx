export default function Loading() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-6xl items-center justify-center px-6">
      <div className="flex items-center gap-3 rounded-full border border-[var(--color-line)] bg-white px-6 py-3 text-sm text-[var(--color-muted)] shadow-sm">
        
        {/* Spinner */}
        <div className="relative h-4 w-4">
          <span className="absolute inset-0 animate-ping rounded-full bg-[var(--color-accent)] opacity-30" />
          <span className="absolute inset-0 rounded-full border-2 border-[var(--color-accent)] border-t-transparent animate-spin" />
        </div>

        {/* Text */}
        <span className="tracking-wide">
          Loading Softech Financials...
        </span>
      </div>
    </div>
  );
}