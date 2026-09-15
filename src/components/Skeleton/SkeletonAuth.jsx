import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";

export default function SkeletonAuth() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-teal-50/70 via-warm-50 to-white py-10 md:py-16 overflow-hidden" aria-busy="true">
      <div className="absolute inset-0 pixel-grid" aria-hidden="true" />
      <div className="relative mx-auto max-w-xl px-4 sm:px-6">
        <div className="py-6 sm:py-10">
          <div className="text-center mb-8" aria-hidden="true">
            <Skeleton
              width="3.5rem"
              height="3.5rem"
              rounding="lg"
              className="mx-auto sk-shimmer"
            />
            <Skeleton width="8rem" height="0.9rem" rounding="sm" className="mx-auto mt-5" />
            <div className="max-w-xs mx-auto mt-3">
              <SkeletonText lines={1} size="xl" />
            </div>
            <div className="max-w-xs mx-auto mt-2">
              <SkeletonText lines={1} size="sm" />
            </div>
          </div>

          <div className="skeuo-card skeuo-card-pad mx-auto px-6 sm:px-10 py-8 sm:py-10" aria-hidden="true">
            <Skeleton height="3.25rem" rounding="lg" />
            <Skeleton height="3.25rem" rounding="lg" className="mt-4" />
            <Skeleton height="3.25rem" rounding="lg" className="mt-4" />
            <Skeleton height="3rem" rounding="lg" className="mt-6 sk-shimmer" />
            <div className="flex items-center gap-3 my-6">
              <span className="flex-1 h-0.5 rounded-full bg-warm-200" />
              <Skeleton width="6rem" height="0.85rem" rounding="sm" />
              <span className="flex-1 h-0.5 rounded-full bg-warm-200" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Skeleton height="3rem" rounding="lg" />
              <Skeleton height="3rem" rounding="lg" />
            </div>
          </div>

          <p className="mt-8 text-center">
            <Skeleton width="14rem" height="0.85rem" rounding="sm" className="mx-auto" />
          </p>
        </div>
      </div>
    </div>
  );
}