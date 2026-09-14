import SkeletonHero from "./SkeletonHero.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonCard from "./SkeletonCard.jsx";
import Skeleton from "./Skeleton.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

function SectionTitleSkeleton() {
  return (
    <div className="text-center mb-14" aria-hidden="true">
      <Skeleton width="6rem" height="0.9rem" rounding="sm" className="mx-auto mb-3" />
      <div className="max-w-md mx-auto">
        <SkeletonText lines={2} size="xl" />
      </div>
      <div className="max-w-lg mx-auto mt-4">
        <SkeletonText lines={1} size="sm" />
      </div>
    </div>
  );
}

export default function SkeletonAbout() {
  return (
    <div className="min-h-screen" aria-busy="true">
      <SkeletonHero />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Skeleton width="5rem" height="0.9rem" rounding="sm" />
            <div className="mt-3 max-w-sm">
              <SkeletonText lines={2} size="xl" />
            </div>
            <div className="mt-6">
              <SkeletonText lines={3} size="md" />
            </div>
            <div className="mt-4">
              <SkeletonText lines={2} size="md" />
            </div>
            <Skeleton width="7rem" height="1rem" rounding="sm" className="mt-6" />
          </div>
          <Skeleton
            width="100%"
            height="16rem"
            rounding="lg"
            className="sk-shimmer md:h-64"
          />
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitleSkeleton />
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {[0, 1, 2].map((i) => (
              <SkeletonCard key={i} className="p-8 text-center">
                <div className="max-w-[12rem] mx-auto">
                  <SkeletonText lines={2} size="xl" />
                </div>
                <div className="mt-4">
                  <SkeletonText lines={2} size="sm" />
                </div>
              </SkeletonCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitleSkeleton />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {[0, 1, 2].map((i) => (
              <SkeletonCard key={i} className="p-8">
                <Skeleton width="3rem" height="3rem" rounding="sm" />
                <Skeleton width="70%" height="0.9rem" rounding="sm" className="mt-5" />
                <div className="mt-3">
                  <SkeletonText lines={3} size="sm" />
                </div>
              </SkeletonCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionTitleSkeleton />
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="grid grid-cols-2 gap-4">
              {[0, 1, 2, 3].map((i) => (
                <SkeletonCard key={i} className="p-5 text-center">
                  <Skeleton width="60%" height="0.9rem" rounding="sm" className="mx-auto" />
                  <Skeleton width="50%" height="0.85rem" rounding="sm" className="mx-auto mt-2" />
                </SkeletonCard>
              ))}
            </div>
            <SkeletonCard className="p-6 md:p-8">
              <Skeleton width="8rem" height="0.85rem" rounding="sm" />
              <div className="mt-6 space-y-3">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton width="0.75rem" height="0.75rem" rounding="sm" />
                    <Skeleton width="70%" height="0.95rem" rounding="sm" />
                  </div>
                ))}
              </div>
            </SkeletonCard>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionTitleSkeleton />
          <SkeletonCard className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Skeleton width="60%" height="0.95rem" rounding="sm" />
                <div className="mt-5 space-y-3">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton width="2.5rem" height="2.5rem" rounding="lg" className="flex-shrink-0" />
                      <Skeleton width="50%" height="1rem" rounding="sm" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl p-8 border border-warm-100 text-center">
                <Skeleton width="3rem" height="3rem" rounding="sm" className="mx-auto" />
                <Skeleton width="60%" height="0.85rem" rounding="sm" className="mx-auto mt-4" />
                <div className="max-w-xs mx-auto mt-3">
                  <SkeletonText lines={2} size="sm" />
                </div>
              </div>
            </div>
          </SkeletonCard>
          <div className="text-center mt-12">
            <SkeletonButton size="lg" width="13rem" />
          </div>
        </div>
      </section>
    </div>
  );
}