import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";

export default function SkeletonGameCard() {
  return (
    <div className="skeuo-card skeuo-card-pad h-full flex flex-col" aria-hidden="true">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton width="3.5rem" height="3.5rem" rounding="lg" className="sk-shimmer mt-0.5" />
        <div className="min-w-0 flex-1">
          <Skeleton width="80%" height="0.9rem" rounding="sm" />
          <Skeleton width="5.5rem" height="1.5rem" rounding="round" className="mt-2" />
        </div>
      </div>

      <SkeletonText lines={2} size="sm" className="flex-1" />

      <Skeleton width="55%" height="0.8rem" rounding="sm" className="mt-4" />

      <div className="mt-auto pt-3">
        <Skeleton width="7rem" height="1.5rem" rounding="round" />
        <div className="flex items-center justify-between gap-2 border-t border-warm-200/60 pt-3 mt-3">
          <Skeleton width="6.5rem" height="1.6rem" rounding="sm" />
          <Skeleton width="5.5rem" height="1rem" rounding="sm" />
        </div>
      </div>
    </div>
  );
}