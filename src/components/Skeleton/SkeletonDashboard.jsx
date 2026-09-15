import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";

function SectionTitleSkeleton() {
  return (
    <div className="flex items-center gap-2.5 mb-5" aria-hidden="true">
      <Skeleton width="1.25rem" height="1.25rem" rounding="sm" />
      <Skeleton width="9rem" height="0.95rem" rounding="sm" />
    </div>
  );
}

function RecommendedCardSkeleton() {
  return (
    <div className="skeuo-card skeuo-card-pad flex flex-col" aria-hidden="true">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton width="2.25rem" height="2.25rem" rounding="sm" className="sk-shimmer" />
        <div className="min-w-0 flex-1">
          <Skeleton width="60%" height="0.9rem" rounding="sm" />
          <Skeleton width="5rem" height="1.5rem" rounding="round" className="mt-2" />
        </div>
      </div>
      <SkeletonText lines={2} size="sm" className="flex-1" />
      <Skeleton width="8rem" height="2.3rem" rounding="lg" className="sk-shimmer mt-4" />
    </div>
  );
}

function MemoryHighlightSkeleton() {
  return (
    <div className="skeuo-card skeuo-card-pad flex flex-col" aria-hidden="true">
      <div className="flex items-start gap-3 mb-3">
        <Skeleton width="1.5rem" height="1.5rem" rounding="sm" />
        <div className="min-w-0 flex-1">
          <Skeleton width="55%" height="1rem" rounding="sm" />
          <Skeleton width="4.5rem" height="0.8rem" rounding="sm" className="mt-2" />
        </div>
      </div>
      <SkeletonText lines={2} size="sm" className="flex-1" />
    </div>
  );
}

function RoutineRowSkeleton() {
  return (
    <div
      className="w-full min-w-[260px] max-w-[300px] p-5 rounded-2xl border-2 border-gray-200 bg-white flex items-center gap-4 min-h-[80px]"
      aria-hidden="true"
    >
      <Skeleton width="2rem" height="2rem" rounding="round" className="sk-shimmer flex-shrink-0" />
      <Skeleton width="2.5rem" height="2rem" rounding="sm" className="flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <Skeleton width="80%" height="1.1rem" rounding="sm" />
        <Skeleton width="40%" height="0.85rem" rounding="sm" className="mt-2" />
      </div>
    </div>
  );
}

function QuickActionSkeleton() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-white border-2 border-teal-100 p-6 md:p-8 text-center flex flex-col items-center justify-center min-h-[180px]"
      aria-hidden="true"
    >
      <Skeleton width="2.5rem" height="2.5rem" rounding="sm" className="sk-shimmer" />
      <Skeleton width="55%" height="0.9rem" rounding="sm" className="mt-4" />
      <Skeleton width="40%" height="0.85rem" rounding="sm" className="mt-2" />
    </div>
  );
}

function ActivityRowSkeleton() {
  return (
    <div className="skeuo-card p-4 md:p-5" aria-hidden="true">
      <div className="flex items-start gap-4">
        <Skeleton width="2.75rem" height="2.75rem" rounding="lg" className="sk-shimmer flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton width="50%" height="1rem" rounding="sm" />
          <Skeleton width="70%" height="0.85rem" rounding="sm" className="mt-2" />
        </div>
        <Skeleton width="3.5rem" height="0.85rem" rounding="sm" className="flex-shrink-0" />
      </div>
    </div>
  );
}

export default function SkeletonDashboard() {
  return (
    <div className="min-h-screen pb-16" aria-busy="true">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10 space-y-12">
        <section className="relative overflow-hidden rounded-3xl p-7 md:p-10 bg-gradient-to-br from-amber-100 via-orange-50 to-teal-50">
          <div className="absolute top-0 left-0 right-0 h-3 flex opacity-70">
            <div className="flex-1 bg-teal-400" />
            <div className="flex-1 bg-amber-400" />
            <div className="flex-1 bg-teal-300" />
            <div className="flex-1 bg-amber-300" />
          </div>

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-6 pt-3">
            <div className="flex-1">
              <Skeleton width="9rem" height="0.65rem" rounding="sm" />
              <Skeleton width="70%" height="1.6rem" rounding="sm" className="mt-4" />
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4">
                <Skeleton width="12rem" height="1rem" rounding="sm" />
                <Skeleton width="8rem" height="1rem" rounding="sm" />
              </div>
            </div>
            <div className="flex-shrink-0 self-center sm:self-end w-20 h-20 rounded-2xl border-2 border-amber-200/70 bg-white/70 shadow-inner flex items-center justify-center sk sk-shimmer" />
          </div>
        </section>

        <section>
          <SectionTitleSkeleton />
          <div className="skeuo-card">
            <div className="grid sm:grid-cols-2 gap-5">
              {[0, 1].map((i) => (
                <div key={i} className="rounded-2xl p-5 flex items-center gap-4">
                  <Skeleton width="1rem" height="1rem" rounding="round" className="flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <Skeleton width="6rem" height="0.75rem" rounding="sm" />
                    <Skeleton width="60%" height="1.1rem" rounding="sm" className="mt-2" />
                    <Skeleton width="40%" height="0.85rem" rounding="sm" className="mt-1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <SectionTitleSkeleton />
          <div className="grid sm:grid-cols-2 gap-5 items-stretch">
            <RecommendedCardSkeleton />
            <RecommendedCardSkeleton />
          </div>
        </section>

        <section>
          <SectionTitleSkeleton />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-5">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="rounded-2xl border-2 border-gray-100 p-6 flex flex-col" aria-hidden="true">
                <div className="flex items-start justify-between mb-4">
                  <Skeleton width="1.5rem" height="1.5rem" rounding="sm" />
                  <Skeleton width="1rem" height="1rem" rounding="sm" />
                </div>
                <Skeleton width="80%" height="0.85rem" rounding="sm" />
                <Skeleton width="50%" height="1.6rem" rounding="sm" className="mt-3" />
              </div>
            ))}
          </div>
          <div className="skeuo-card">
            <div className="flex items-center justify-between mb-3">
              <Skeleton width="45%" height="0.9rem" rounding="sm" />
              <Skeleton width="3rem" height="0.9rem" rounding="sm" />
            </div>
            <Skeleton height="0.8rem" rounding="round" className="sk-shimmer" />
          </div>
        </section>

        <section>
          <SectionTitleSkeleton />
          <div className="skeuo-card mb-5">
            <div className="flex items-center gap-3">
              <Skeleton width="1.5rem" height="1.5rem" rounding="sm" />
              <Skeleton width="60%" height="1.1rem" rounding="sm" />
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {[0, 1, 2].map((i) => (
              <MemoryHighlightSkeleton key={i} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <SectionTitleSkeleton />
            <Skeleton width="9rem" height="2.4rem" rounding="lg" className="hidden sm:block" />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x">
            {[0, 1, 2].map((i) => (
              <div key={i} className="min-w-[260px] max-w-[300px] w-full snap-start flex-shrink-0">
                <RoutineRowSkeleton />
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitleSkeleton />
          <div className="grid grid-cols-2 gap-4 md:gap-5 items-stretch">
            {[0, 1, 2, 3].map((i) => (
              <QuickActionSkeleton key={i} />
            ))}
          </div>
        </section>

        <section>
          <SectionTitleSkeleton />
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <ActivityRowSkeleton key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}