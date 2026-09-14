import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

export default function SkeletonHero() {
  return (
    <section className="relative overflow-hidden px-6 py-20 md:py-32">
      <div className="absolute inset-0 pixel-grid pointer-events-none opacity-40" aria-hidden="true" />
      <div className="relative max-w-5xl mx-auto text-center">
        <Skeleton
          width="9.5rem"
          height="2rem"
          rounding="round"
          className="mx-auto"
        />
        <div className="flex justify-center gap-1 mt-8">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} width={i % 2 ? "0.375rem" : "0.5rem"} height={i % 2 ? "0.375rem" : "0.5rem"} rounding="sm" />
          ))}
        </div>
        <div className="mt-8 max-w-3xl mx-auto">
          <SkeletonText lines={2} size="xl" />
        </div>
        <div className="mt-8 max-w-2xl mx-auto">
          <SkeletonText lines={2} size="md" />
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
          <SkeletonButton size="lg" width="13rem" />
          <SkeletonButton size="lg" width="16rem" />
        </div>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 md:gap-4">
              <Skeleton width={i % 2 ? "8rem" : "7rem"} height="2.6rem" rounding="sm" />
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