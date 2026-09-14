import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonGameCard from "./SkeletonGameCard.jsx";

const CATEGORY_COUNT = 7;

export default function SkeletonGames() {
  return (
    <div className="min-h-screen pb-16" aria-busy="true">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10 space-y-10">
        <header className="text-center">
          <Skeleton
            width="4rem"
            height="4rem"
            rounding="lg"
            className="mx-auto mb-4"
          />
          <div className="max-w-md mx-auto">
            <SkeletonText lines={2} size="xl" />
          </div>
          <div className="max-w-lg mx-auto mt-3">
            <SkeletonText lines={1} size="md" />
          </div>
        </header>

        <section>
          <div className="flex gap-3 overflow-x-auto pb-3 px-1 -mx-1">
            {Array.from({ length: CATEGORY_COUNT }).map((_, i) => (
              <Skeleton
                key={i}
                width={i === 0 ? "4.5rem" : i % 2 ? "7.5rem" : "9rem"}
                height="3rem"
                rounding="round"
                className="flex-shrink-0"
              />
            ))}
          </div>
        </section>

        <section>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <SkeletonGameCard key={i} />
            ))}
          </div>
        </section>

        <section>
          <div className="skeuo-card">
            <Skeleton width="7rem" height="0.9rem" rounding="sm" />
            <div className="mt-2 max-w-md">
              <SkeletonText lines={1} size="sm" />
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-5 items-stretch">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white/70 border border-teal-100 p-6 text-center flex flex-col items-center"
                >
                  <Skeleton width="3.5rem" height="3.5rem" rounding="lg" />
                  <Skeleton width="70%" height="0.9rem" rounding="sm" className="mt-4" />
                  <div className="mt-3 w-full">
                    <SkeletonText lines={2} size="sm" />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-center">
              <Skeleton width="60%" height="0.8rem" rounding="sm" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}