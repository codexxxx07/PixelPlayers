import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-warm-50 via-white to-teal-50/40 py-20 md:py-32 px-6">
      <div className="absolute top-8 left-8 opacity-20 pointer-events-none hidden lg:block" aria-hidden="true">
        <Skeleton width="4rem" height="0.75rem" rounding="sm" skipShimmer />
      </div>
      <div className="absolute top-16 right-12 opacity-20 pointer-events-none hidden lg:block" aria-hidden="true">
        <Skeleton width="4rem" height="0.75rem" rounding="sm" skipShimmer />
      </div>
      <div className="absolute bottom-24 left-16 opacity-15 pointer-events-none hidden lg:block" aria-hidden="true">
        <Skeleton width="3rem" height="0.75rem" rounding="sm" skipShimmer />
      </div>
      <div className="absolute bottom-32 right-20 opacity-15 pointer-events-none hidden lg:block" aria-hidden="true">
        <Skeleton width="3rem" height="0.75rem" rounding="sm" skipShimmer />
      </div>

      <div className="absolute inset-0 pixel-grid pointer-events-none opacity-40" aria-hidden="true" />

      <div className="relative max-w-5xl mx-auto text-center">
        <Skeleton
          width="8rem"
          height="2rem"
          rounding="round"
          className="mx-auto border-2 border-teal-200 bg-white"
          skipShimmer
        />

        <div className="flex justify-center gap-1 mt-8">
          {[8, 6, 10, 6, 8].map((s, i) => (
            <Skeleton key={i} width={`${s}px`} height={`${s}px`} rounding="sm" />
          ))}
        </div>

        <div className="mt-8 max-w-3xl mx-auto">
          <SkeletonText lines={2} size="xl" />
        </div>

        <div className="mt-6 max-w-2xl mx-auto">
          <SkeletonText lines={2} size="md" />
        </div>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
          <SkeletonButton size="lg" width="14rem" variant="primary" />
          <SkeletonButton size="lg" width="18rem" variant="ghost" />
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {[7, 8, 7, 8].map((w, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-4">
              <Skeleton width={`${w}rem`} height="2.6rem" rounding="sm" className="border-2 border-teal-100 bg-white" />
              {i < 3 && (
                <Skeleton width="1.5rem" height="0.3rem" rounding="round" className="hidden sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PageHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-warm-50 to-teal-50/30 py-20 md:py-28 px-6">
      <div className="absolute inset-0 pixel-grid pointer-events-none opacity-30" aria-hidden="true" />
      <div className="relative max-w-4xl mx-auto text-center">
        <Skeleton
          width="8rem"
          height="2rem"
          rounding="round"
          className="mx-auto border-2 border-teal-200 bg-white"
          skipShimmer
        />
        <Skeleton
          width="5rem"
          height="0.65rem"
          rounding="sm"
          className="mx-auto mt-4"
        />
        <div className="mt-6 max-w-2xl mx-auto">
          <SkeletonText lines={2} size="xl" />
        </div>
        <div className="mt-4 max-w-xl mx-auto">
          <SkeletonText lines={2} size="md" />
        </div>
      </div>
    </section>
  );
}

const VARIANTS = {
  home: HomeHero,
  page: PageHero,
};

export default function SkeletonHero({ variant = "page" }) {
  const Hero = VARIANTS[variant] || PageHero;
  return <Hero />;
}
