import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

function NetworkCardSkeleton() {
  return (
    <div className="skeuo-card skeuo-card-pad flex flex-col" aria-hidden="true">
      <div className="flex items-start gap-4 mb-5">
        <Skeleton
          width="5rem"
          height="5rem"
          rounding="round"
          className="sk-shimmer flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <Skeleton width="55%" height="1rem" rounding="sm" />
          <Skeleton width="35%" height="0.9rem" rounding="sm" className="mt-2" />
          <Skeleton width="45%" height="0.8rem" rounding="sm" className="mt-2" />
        </div>
      </div>
      <div className="space-y-3 mb-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-warm-100 px-4 py-3">
            <Skeleton width="1.25rem" height="1.25rem" rounding="sm" />
            <Skeleton width="55%" height="1rem" rounding="sm" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-auto">
        <SkeletonButton size="md" width="100%" />
        <SkeletonButton size="md" width="100%" />
        <SkeletonButton size="md" width="100%" />
      </div>
    </div>
  );
}

function ToggleRowSkeleton() {
  return (
    <div className="flex items-center justify-between w-full gap-4 rounded-2xl border-2 border-warm-200 bg-white px-5 py-4" aria-hidden="true">
      <Skeleton width="45%" height="1.1rem" rounding="sm" />
      <Skeleton width="5rem" height="3rem" rounding="round" className="sk-shimmer flex-shrink-0" />
    </div>
  );
}

export default function SkeletonSupport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/60 via-warm-50 to-white pb-20" aria-busy="true">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <div className="text-center mb-10">
          <div className="max-w-lg mx-auto">
            <SkeletonText lines={1} size="xl" />
          </div>
          <div className="max-w-md mx-auto mt-3">
            <SkeletonText lines={1} size="md" />
          </div>
          <div className="max-w-md mx-auto mt-2">
            <SkeletonText lines={1} size="sm" />
          </div>
        </div>

        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-5">
            <Skeleton width="9rem" height="0.95rem" rounding="sm" />
            <SkeletonButton size="lg" width="12rem" />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {[0, 1].map((i) => (
              <NetworkCardSkeleton key={i} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <Skeleton width="7rem" height="0.95rem" rounding="sm" />
          <div className="mt-2 max-w-md">
            <SkeletonText lines={1} size="sm" />
          </div>
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            {[0, 1, 2, 3].map((i) => (
              <ToggleRowSkeleton key={i} />
            ))}
          </div>
          <div className="mt-4">
            <SkeletonText lines={1} size="sm" />
          </div>
        </section>

        <section className="mb-12">
          <Skeleton width="8rem" height="0.95rem" rounding="sm" />
          <div className="mt-2 max-w-md">
            <SkeletonText lines={1} size="sm" />
          </div>
          <div className="skeuo-card p-8 text-center">
            <div className="max-w-md mx-auto">
              <SkeletonText lines={1} size="sm" />
            </div>
            <div className="flex justify-center mt-6">
              <Skeleton
                width="14rem"
                height="14rem"
                rounding="round"
                className="sk-shimmer"
              />
            </div>
            <div className="flex justify-center mt-6">
              <Skeleton width="10rem" height="0.9rem" rounding="sm" />
            </div>
          </div>
        </section>

        <section className="mb-12">
          <Skeleton width="6rem" height="0.95rem" rounding="sm" />
          <div className="grid md:grid-cols-3 gap-5 items-stretch mt-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="skeuo-card p-8 text-center flex flex-col items-center justify-center" aria-hidden="true">
                <Skeleton width="2.25rem" height="2.25rem" rounding="lg" className="sk-shimmer" />
                <div className="mt-3 w-full">
                  <SkeletonText lines={2} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}