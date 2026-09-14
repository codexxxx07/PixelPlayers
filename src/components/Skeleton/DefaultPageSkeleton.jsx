export default function DefaultPageSkeleton() {
  return (
    <div className="py-8 md:py-10" aria-busy="true">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 space-y-10">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-warm-150" />
          <div className="flex-1">
            <div className="h-4 w-2/3 bg-warm-150 rounded-md" />
            <div className="h-3 w-1/3 bg-warm-150 rounded-md mt-2" />
          </div>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-36 rounded-2xl bg-warm-150" />
          ))}
        </div>
      </div>
    </div>
  );
}