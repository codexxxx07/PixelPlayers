import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

function TimelineRowSkeleton() {
  return (
    <div className="relative flex items-start gap-4" aria-hidden="true">
      <div className="relative z-10 mt-5 flex-shrink-0">
        <Skeleton width="1.125rem" height="1.125rem" rounding="round" className="sk-shimmer" />
      </div>
      <div className="flex-1">
        <div className="p-5 rounded-2xl border-2 border-gray-200 bg-white flex items-center gap-4 min-h-[80px]">
          <Skeleton width="2rem" height="2rem" rounding="round" className="sk-shimmer flex-shrink-0" />
          <Skeleton width="2.5rem" height="2rem" rounding="sm" className="flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <Skeleton width="60%" height="1.1rem" rounding="sm" />
            <Skeleton width="35%" height="0.85rem" rounding="sm" className="mt-2" />
          </div>
        </div>
      </div>
    </div>
  );
}

function TomorrowRowSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-teal-50/50 border border-teal-100" aria-hidden="true">
      <Skeleton width="1.5rem" height="1.5rem" rounding="sm" />
      <div className="flex-1 min-w-0">
        <Skeleton width="55%" height="0.9rem" rounding="sm" />
        <Skeleton width="30%" height="0.8rem" rounding="sm" className="mt-1" />
      </div>
    </div>
  );
}

export default function SkeletonRoutine() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/50 to-white pb-20" aria-busy="true">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <div className="text-center mb-10">
          <div className="max-w-md mx-auto">
            <SkeletonText lines={1} size="xl" />
          </div>
          <div className="max-w-sm mx-auto mt-3">
            <SkeletonText lines={1} size="sm" />
          </div>
          <div className="max-w-xs mx-auto mt-2">
            <SkeletonText lines={1} size="sm" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="skeuo-card p-6 md:p-8">
              <div className="text-center">
                <Skeleton
                  width="3.5rem"
                  height="3.5rem"
                  rounding="sm"
                  className="mx-auto sk-shimmer"
                />
                <div className="max-w-xs mx-auto mt-4">
                  <SkeletonText lines={2} size="md" />
                </div>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <Skeleton width="0.75rem" height="0.75rem" rounding="round" />
                  <Skeleton width="6rem" height="0.8rem" rounding="sm" />
                </div>
              </div>
            </div>

            <div>
              <Skeleton width="9rem" height="0.95rem" rounding="sm" />
              <div className="relative mt-6">
                <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-teal-200/60" />
                <div className="space-y-3">
                  {[0, 1, 2, 3].map((i) => (
                    <TimelineRowSkeleton key={i} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="skeuo-card">
              <Skeleton width="7rem" height="0.9rem" rounding="sm" />
              <Skeleton height="1.25rem" rounding="round" className="mt-4 sk-shimmer" />
              <div className="flex items-center justify-between mt-2">
                <Skeleton width="45%" height="0.9rem" rounding="sm" />
                <Skeleton width="3rem" height="0.9rem" rounding="sm" />
              </div>
              <div className="mt-2 flex justify-center">
                <Skeleton width="70%" height="0.85rem" rounding="sm" />
              </div>
            </div>

            <div className="skeuo-card">
              <Skeleton width="9rem" height="0.9rem" rounding="sm" />
              <div className="mt-4 space-y-3">
                <SkeletonButton size="lg" width="100%" />
                <SkeletonButton size="lg" width="100%" />
                <SkeletonButton size="lg" width="100%" />
              </div>
            </div>

            <div className="skeuo-card">
              <Skeleton width="8rem" height="0.9rem" rounding="sm" />
              <div className="mt-4 space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <TomorrowRowSkeleton key={i} />
                ))}
              </div>
              <div className="mt-4">
                <SkeletonButton size="sm" width="100%" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}