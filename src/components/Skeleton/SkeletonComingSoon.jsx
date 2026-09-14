import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

export default function SkeletonComingSoon() {
  return (
    <div className="min-h-screen pb-16" aria-busy="true">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 md:py-12">
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
          <div className="max-w-lg mx-auto mt-3">
            <SkeletonText lines={1} size="md" />
          </div>
        </header>

        <section className="mt-8">
          <div className="skeuo-card skeuo-card-pad text-center">
            <Skeleton
              width="2.5rem"
              height="2.5rem"
              rounding="sm"
              className="mx-auto sk-shimmer"
            />
            <Skeleton width="7rem" height="0.95rem" rounding="sm" className="mx-auto mt-4" />
            <div className="max-w-md mx-auto mt-3">
              <SkeletonText lines={3} size="sm" />
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Skeleton width="9rem" height="1.6rem" rounding="round" />
              <Skeleton width="7rem" height="1.6rem" rounding="round" />
            </div>
          </div>
        </section>

        <div className="text-center mt-8">
          <SkeletonButton size="lg" width="11rem" />
        </div>
      </div>
    </div>
  );
}