import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";

const PIXEL_BAR_COLORS = [
  "bg-teal-400/50", "bg-amber-400/40", "bg-teal-500/50", "bg-teal-600/50",
  "bg-amber-500/40", "bg-teal-400/50", "bg-teal-700/50", "bg-amber-400/40",
  "bg-teal-500/50", "bg-teal-600/50", "bg-amber-500/40", "bg-teal-400/50",
  "bg-teal-700/50", "bg-amber-400/40", "bg-teal-500/50", "bg-teal-600/50",
];

export default function SkeletonFooter() {
  return (
    <footer className="relative bg-teal-900" aria-hidden="true">
      <div className="flex w-full h-3">
        {PIXEL_BAR_COLORS.map((color, i) => (
          <div key={i} className={`flex-1 ${color}`} />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg sk sk-shimmer" />
              <Skeleton width="10rem" height="1rem" rounding="sm" skipShimmer />
            </div>
            <Skeleton width="13rem" height="0.9rem" rounding="sm" skipShimmer />
            <div className="mt-4 max-w-sm">
              <SkeletonText lines={3} size="sm" skipShimmer />
            </div>
          </div>

          {[0, 1, 2].map((i) => (
            <div key={i}>
              <Skeleton width="6rem" height="0.85rem" rounding="sm" skipShimmer />
              <div className="mt-4 space-y-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <Skeleton key={j} width={`${6.5 - j * 0.7}rem`} height="0.85rem" rounding="sm" skipShimmer />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-teal-700/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Skeleton width="18rem" height="0.8rem" rounding="sm" skipShimmer />
          <div className="flex items-center gap-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} width="2rem" height="2rem" rounding="round" skipShimmer />
            ))}
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Skeleton width="17rem" height="2rem" rounding="round" skipShimmer />
        </div>
      </div>
    </footer>
  );
}