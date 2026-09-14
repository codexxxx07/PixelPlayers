import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border-2 border-gray-100 p-6 flex flex-col" aria-hidden="true">
      <div className="flex items-start justify-between mb-4">
        <Skeleton width="1.5rem" height="1.5rem" rounding="sm" />
        <Skeleton width="1rem" height="1rem" rounding="sm" />
      </div>
      <Skeleton width="80%" height="0.85rem" rounding="sm" />
      <Skeleton width="50%" height="1.6rem" rounding="sm" className="mt-3" />
    </div>
  );
}

function ChartSkeleton() {
  return (
    <div className="skeuo-card p-6" aria-hidden="true">
      <Skeleton width="45%" height="0.9rem" rounding="sm" />
      <div className="h-44 flex items-end gap-3 md:gap-4 mt-6">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="flex-1 h-full flex flex-col items-center justify-end gap-1.5 min-w-0">
            <Skeleton
              width="100%"
              height={`${[38, 62, 45, 78, 54, 86, 30][i]}%`}
              rounding="sm"
              className="min-h-[6px] sk-shimmer"
            />
            <Skeleton width="1.5rem" height="0.7rem" rounding="sm" />
          </div>
        ))}
      </div>
    </div>
  );
}

function FavoriteRowSkeleton() {
  return (
    <div className="skeuo-card p-5" aria-hidden="true">
      <div className="flex items-center gap-4">
        <Skeleton width="3rem" height="3rem" rounding="lg" className="sk-shimmer flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <Skeleton width="2rem" height="0.9rem" rounding="sm" />
            <Skeleton width="40%" height="1.1rem" rounding="sm" />
            <Skeleton width="5rem" height="1.3rem" rounding="round" />
          </div>
          <Skeleton width="30%" height="0.85rem" rounding="sm" className="mt-2" />
        </div>
        <div className="flex-shrink-0 text-right">
          <Skeleton width="3rem" height="1rem" rounding="sm" />
          <Skeleton width="4rem" height="0.8rem" rounding="sm" className="mt-1" />
        </div>
      </div>
    </div>
  );
}

function AchievementSkeleton() {
  return (
    <div className="rounded-2xl p-5 text-center border-2 border-gray-100 flex flex-col items-center" aria-hidden="true">
      <Skeleton width="2.5rem" height="2.5rem" rounding="sm" />
      <Skeleton width="80%" height="0.85rem" rounding="sm" className="mt-3" />
      <Skeleton width="90%" height="0.8rem" rounding="sm" className="mt-2" />
      <Skeleton width="60%" height="1.5rem" rounding="round" className="mt-3" />
    </div>
  );
}

export default function SkeletonProgress() {
  return (
    <div className="min-h-screen pb-16" aria-busy="true">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10 space-y-12">
        <header className="text-center">
          <Skeleton
            width="4rem"
            height="4rem"
            rounding="lg"
            className="mx-auto mb-4"
          />
          <div className="max-w-md mx-auto">
            <SkeletonText lines={1} size="xl" />
          </div>
          <div className="max-w-md mx-auto mt-2">
            <SkeletonText lines={1} size="md" />
          </div>
          <div className="mt-3 flex justify-center">
            <Skeleton width="26rem" height="2.2rem" rounding="round" />
          </div>
        </header>

        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <Skeleton width="1.25rem" height="1.25rem" rounding="sm" />
            <Skeleton width="8rem" height="0.95rem" rounding="sm" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            {[0, 1, 2, 3].map((i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <Skeleton width="1.25rem" height="1.25rem" rounding="sm" />
            <Skeleton width="9rem" height="0.95rem" rounding="sm" />
          </div>
          <ChartSkeleton />
        </section>

        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <Skeleton width="1.25rem" height="1.25rem" rounding="sm" />
            <Skeleton width="9rem" height="0.95rem" rounding="sm" />
          </div>
          <div className="skeuo-card p-6">
            <Skeleton width="45%" height="0.9rem" rounding="sm" />
            <div className="h-40 flex items-end gap-3 md:gap-4 mt-6">
              {Array.from({ length: 7 }).map((_, i) => (
                <div key={i} className="flex-1 h-full flex flex-col items-center justify-end gap-1.5 min-w-0">
                  <Skeleton
                    width="100%"
                    height={`${[28, 52, 40, 66, 48, 72, 35][i]}%`}
                    rounding="sm"
                    className="min-h-[6px] sk-shimmer"
                  />
                  <Skeleton width="1.5rem" height="0.7rem" rounding="sm" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <Skeleton width="1.25rem" height="1.25rem" rounding="sm" />
            <Skeleton width="10rem" height="0.95rem" rounding="sm" />
          </div>
          <div className="skeuo-card p-6">
            <Skeleton width="50%" height="0.9rem" rounding="sm" />
            <div className="h-7 rounded-full overflow-hidden flex bg-gray-100 border border-gray-200 mt-5 mb-6">
              {[35, 25, 20, 15, 5].map((pct) => (
                <div
                  key={pct}
                  className="h-full"
                  style={{ width: `${pct}%` }}
                />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton width="0.75rem" height="0.75rem" rounding="sm" />
                  <Skeleton width="4.5rem" height="0.9rem" rounding="sm" />
                  <Skeleton width="2rem" height="0.9rem" rounding="sm" />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <Skeleton width="1.25rem" height="1.25rem" rounding="sm" />
            <Skeleton width="9rem" height="0.95rem" rounding="sm" />
          </div>
          <div className="space-y-3">
            {[0, 1, 2].map((i) => (
              <FavoriteRowSkeleton key={i} />
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2.5 mb-5">
            <Skeleton width="1.25rem" height="1.25rem" rounding="sm" />
            <Skeleton width="9rem" height="0.95rem" rounding="sm" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
            {[0, 1, 2, 3, 4].map((i) => (
              <AchievementSkeleton key={i} />
            ))}
          </div>
        </section>

        <section>
          <div className="rounded-2xl border-l-4 border-warm-300 bg-warm-100/60 p-6">
            <div className="flex items-start gap-4">
              <Skeleton width="1.5rem" height="1.5rem" rounding="sm" />
              <div className="flex-1">
                <Skeleton width="6rem" height="0.85rem" rounding="sm" />
                <SkeletonText lines={2} size="sm" className="mt-2" />
              </div>
            </div>
          </div>
          <div className="mt-8 text-center">
            <SkeletonButton size="lg" width="14rem" />
          </div>
        </section>
      </div>
    </div>
  );
}