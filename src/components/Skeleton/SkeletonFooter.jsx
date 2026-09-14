import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";

export default function SkeletonFooter() {
  return (
    <footer className="relative bg-teal-900" aria-hidden="true">
      <div className="flex w-full h-3">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className="flex-1 bg-warm-150 opacity-30" />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton width="2.25rem" height="2.25rem" rounding="lg" />
              <Skeleton width="10rem" height="1.1rem" rounding="sm" />
            </div>
            <Skeleton width="13rem" height="1rem" rounding="sm" />
            <div className="mt-4 max-w-sm">
              <SkeletonText lines={3} size="sm" />
            </div>
          </div>

          {[0, 1, 2].map((i) => (
            <div key={i}>
              <Skeleton width="6rem" height="0.9rem" rounding="sm" />
              <div className="mt-4 space-y-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} width={`${6.5 - j * 0.7}rem`} height="0.9rem" rounding="sm" />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-teal-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Skeleton width="18rem" height="0.85rem" rounding="sm" />
          <div className="flex items-center gap-6">
            {["TWITTER", "GITHUB", "CONTACT"].map((w) => (
              <Skeleton key={w} width="4.5rem" height="0.85rem" rounding="sm" />
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Skeleton width="16rem" height="1.9rem" rounding="round" />
        </div>
      </div>
    </footer>
  );
}