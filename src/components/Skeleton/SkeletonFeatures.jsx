import SkeletonHero from "./SkeletonHero.jsx";
import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonCard from "./SkeletonCard.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

export default function SkeletonFeatures() {
  return (
    <div className="min-h-screen" aria-busy="true">
      <SkeletonHero />

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <SkeletonCard
                key={i}
                className="p-8 flex flex-col"
              >
                <Skeleton width="3rem" height="3rem" rounding="sm" />
                <Skeleton width="65%" height="0.9rem" rounding="sm" className="mt-5" />
                <div className="mt-3 flex-1">
                  <SkeletonText lines={3} size="sm" />
                </div>
                <div className="mt-5 pt-4 border-t border-warm-100">
                  <Skeleton width="5rem" height="0.9rem" rounding="sm" />
                </div>
              </SkeletonCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <Skeleton width="4rem" height="0.9rem" rounding="sm" className="mx-auto mb-3" />
            <div className="max-w-sm mx-auto">
              <SkeletonText lines={2} size="xl" />
            </div>
          </div>

          <div className="hidden md:block">
            <SkeletonCard className="overflow-hidden">
              <div className="grid grid-cols-3">
                {["ASPECT", "TRADITIONAL", "PIXEL"].map((_, col) => (
                  <div
                    key={col}
                    className="p-5"
                  >
                    <Skeleton width="70%" height="0.9rem" rounding="sm" />
                  </div>
                ))}
              </div>
              {[0, 1, 2, 3, 4, 5].map((row) => (
                <div key={row} className="grid grid-cols-3 border-t border-warm-100">
                  {[40, 70, 60].map((w, col) => (
                    <div key={col} className="p-5">
                      <Skeleton width={`${w}%`} height="0.9rem" rounding="sm" />
                    </div>
                  ))}
                </div>
              ))}
            </SkeletonCard>
          </div>

          <div className="md:hidden space-y-4">
            {[0, 1, 2].map((i) => (
              <SkeletonCard key={i} className="p-5">
                <Skeleton width="40%" height="0.85rem" rounding="sm" />
                <div className="space-y-2 mt-3">
                  <Skeleton width="85%" height="0.9rem" rounding="sm" />
                  <Skeleton width="75%" height="0.9rem" rounding="sm" />
                </div>
              </SkeletonCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <SkeletonButton size="lg" width="13rem" />
          </div>
        </div>
      </section>
    </div>
  );
}