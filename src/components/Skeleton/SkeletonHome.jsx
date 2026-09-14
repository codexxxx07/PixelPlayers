import SkeletonHero from "./SkeletonHero.jsx";
import SkeletonCard from "./SkeletonCard.jsx";
import SkeletonText from "./SkeletonText.jsx";
import Skeleton from "./Skeleton.jsx";
import SkeletonButton from "./SkeletonButton.jsx";
import SkeletonSectionTitle from "./SkeletonSectionTitle.jsx";

function SectionHeader() {
  return (
    <div className="text-center mb-14">
      <Skeleton
        width="6rem"
        height="0.9rem"
        rounding="sm"
        className="mx-auto mb-3"
      />
      <div className="max-w-md mx-auto">
        <SkeletonText lines={2} size="xl" />
      </div>
      <div className="max-w-lg mx-auto mt-4">
        <SkeletonText lines={1} size="sm" />
      </div>
    </div>
  );
}

function StepCardSkeleton() {
  return (
    <div className="skeuo-card skeuo-card-pad text-center flex flex-col items-center h-full w-full min-w-0">
      <Skeleton width="4rem" height="4rem" rounding="lg" />
      <Skeleton width="5rem" height="0.7rem" rounding="sm" className="mt-4" />
      <div className="mt-3 max-w-[13rem] w-full">
        <SkeletonText lines={2} size="sm" />
      </div>
    </div>
  );
}

export default function SkeletonHome() {
  return (
    <div className="min-h-screen" aria-busy="true">
      <SkeletonHero />

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {[0, 1, 2].map((i) => (
              <SkeletonCard key={i} className="p-8 text-center">
                <div className="flex justify-center">
                  <Skeleton width="3rem" height="3rem" rounding="lg" />
                </div>
                <div className="mt-5">
                  <SkeletonText lines={2} size="sm" className="max-w-[14rem] mx-auto" />
                </div>
              </SkeletonCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader />

          <div className="hidden lg:grid lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <StepCardSkeleton key={i} />
            ))}
          </div>

          <div className="hidden md:grid md:grid-cols-2 lg:hidden gap-4">
            {[0, 1, 2, 3].map((i) => (
              <StepCardSkeleton key={i} />
            ))}
          </div>

          <div className="md:hidden flex flex-col gap-4">
            {[0, 1, 2, 3].map((i) => (
              <StepCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeader />
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center gap-3">
                <Skeleton width="8.75rem" height="2.9rem" rounding="lg" />
                <Skeleton width="1rem" height="0.5rem" rounding="round" />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-center mt-6">
            <Skeleton width="12rem" height="2rem" rounding="round" />
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SkeletonSectionTitle align="center" />
          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[0, 1, 2].map((i) => (
              <SkeletonCard key={i} className="p-8 flex flex-col">
                <Skeleton width="2.5rem" height="2.5rem" rounding="sm" />
                <div className="mt-4">
                  <SkeletonText lines={4} size="sm" />
                </div>
                <div className="mt-6 pt-4 border-t border-warm-200/60">
                  <Skeleton width="7rem" height="0.8rem" rounding="sm" />
                  <Skeleton width="5rem" height="0.7rem" rounding="sm" className="mt-2" />
                </div>
              </SkeletonCard>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <SkeletonText lines={2} size="xl" />
          <div className="max-w-xl mx-auto mt-6">
            <SkeletonText lines={2} size="md" />
          </div>
          <div className="mt-10 flex justify-center">
            <SkeletonButton size="lg" width="12rem" />
          </div>
        </div>
      </section>
    </div>
  );
}