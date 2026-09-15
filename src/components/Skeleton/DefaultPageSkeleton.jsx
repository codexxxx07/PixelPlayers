import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonButton from "./SkeletonButton.jsx";
import SkeletonHero from "./SkeletonHero.jsx";

export default function DefaultPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/70 via-warm-50 to-white" aria-busy="true">
      <SkeletonHero variant="page" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        <div>
          <Skeleton width="14rem" height="1.1rem" rounding="sm" className="mx-auto" />
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-2xl border-2 border-warm-200 bg-white p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Skeleton width="2.75rem" height="2.75rem" rounding="lg" />
                  <Skeleton width="7rem" height="0.85rem" rounding="sm" />
                </div>
                <SkeletonText lines={2} size="sm" />
                <div className="flex justify-between items-center pt-2">
                  <Skeleton width="5rem" height="0.75rem" rounding="sm" />
                  <SkeletonButton size="sm" width="5.5rem" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Skeleton width="12rem" height="1.1rem" rounding="sm" className="mx-auto" />
          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-36 rounded-2xl border-2 border-warm-200 bg-white sk sk-shimmer" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
