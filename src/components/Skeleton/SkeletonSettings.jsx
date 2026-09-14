import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

function ToggleRowSkeleton() {
  return (
    <div
      className="flex items-center justify-between w-full gap-4 rounded-2xl border-2 border-warm-200 bg-white px-5 py-4"
      aria-hidden="true"
    >
      <span className="min-w-0">
        <Skeleton width="55%" height="1.1rem" rounding="sm" />
        <Skeleton width="70%" height="0.85rem" rounding="sm" className="mt-2" />
      </span>
      <Skeleton width="5rem" height="3rem" rounding="round" className="sk-shimmer flex-shrink-0" />
    </div>
  );
}

function SectionHeadingSkeleton() {
  return (
    <div className="mb-5" aria-hidden="true">
      <Skeleton width="7rem" height="0.95rem" rounding="sm" />
      <Skeleton width="60%" height="0.85rem" rounding="sm" className="mt-2" />
    </div>
  );
}

function TextSizeRowSkeleton() {
  return (
    <div className="rounded-xl border-2 border-warm-200 px-4 py-5 text-center" aria-hidden="true">
      <Skeleton width="60%" height="1rem" rounding="sm" className="mx-auto" />
    </div>
  );
}

export default function SkeletonSettings() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/60 via-warm-50 to-white pb-20" aria-busy="true">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <div className="text-center mb-10">
          <div className="max-w-sm mx-auto">
            <SkeletonText lines={1} size="xl" />
          </div>
          <div className="max-w-xs mx-auto mt-3">
            <SkeletonText lines={1} size="md" />
          </div>
        </div>

        <section className="mb-12">
          <SectionHeadingSkeleton />
          <div className="grid sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="relative flex items-center gap-4 rounded-2xl border-[3px] border-warm-200 bg-white px-5 py-6"
                aria-hidden="true"
              >
                <Skeleton width="2.25rem" height="2.25rem" rounding="sm" />
                <div className="flex-1">
                  <Skeleton width="55%" height="1.1rem" rounding="sm" />
                  <Skeleton width="45%" height="0.9rem" rounding="sm" className="mt-1" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionHeadingSkeleton />
          <div className="skeuo-card p-6 md:p-7 mb-5">
            <Skeleton width="5rem" height="0.85rem" rounding="sm" />
            <div className="grid grid-cols-3 gap-3 mt-4">
              {[0, 1, 2].map((i) => (
                <TextSizeRowSkeleton key={i} />
              ))}
            </div>
          </div>

          {[0, 1, 2].map((card) => (
            <div key={card} className="skeuo-card p-6 md:p-7 mb-5">
              <Skeleton width="6rem" height="0.85rem" rounding="sm" />
              <div className="space-y-4 mt-4">
                {[0, 1, 2].map((i) => (
                  <ToggleRowSkeleton key={i} />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="mb-12">
          <SectionHeadingSkeleton />
          <div className="space-y-4">
            {[0, 1, 2, 3, 4].map((i) => (
              <ToggleRowSkeleton key={i} />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <SectionHeadingSkeleton />
          <div className="grid sm:grid-cols-2 gap-4 mb-6 items-stretch">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="skeuo-card p-5 flex items-start gap-4" aria-hidden="true">
                <Skeleton width="1.5rem" height="1.5rem" rounding="sm" />
                <div className="flex-1">
                  <Skeleton width="50%" height="1rem" rounding="sm" />
                  <Skeleton width="75%" height="0.85rem" rounding="sm" className="mt-2" />
                </div>
              </div>
            ))}
          </div>

          <div className="skeuo-card p-6 mb-5">
            <ToggleRowSkeleton />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <SkeletonButton size="lg" width="100%" />
            <SkeletonButton size="lg" width="100%" />
          </div>
        </section>

        <section className="mb-12">
          <SectionHeadingSkeleton />
          <div className="skeuo-card p-6 flex items-center gap-4 mb-5">
            <Skeleton
              width="5rem"
              height="5rem"
              rounding="round"
              className="sk-shimmer flex-shrink-0"
            />
            <div>
              <Skeleton width="8rem" height="1rem" rounding="sm" />
              <Skeleton width="6rem" height="0.9rem" rounding="sm" className="mt-2" />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((i) => (
              <SkeletonButton key={i} size="lg" width="100%" />
            ))}
          </div>
        </section>

        <section className="mb-8">
          <SectionHeadingSkeleton />
          <div className="skeuo-card p-6 text-center">
            <Skeleton width="7rem" height="0.95rem" rounding="sm" className="mx-auto" />
            <Skeleton width="5rem" height="0.85rem" rounding="sm" className="mx-auto mt-2" />
            <div className="max-w-md mx-auto mt-3">
              <SkeletonText lines={2} size="sm" />
            </div>
            <div className="flex flex-wrap justify-center gap-6 border-t border-warm-200 pt-5 mt-5">
              {[0, 1, 2].map((i) => (
                <Skeleton key={i} width="5rem" height="1rem" rounding="sm" />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}