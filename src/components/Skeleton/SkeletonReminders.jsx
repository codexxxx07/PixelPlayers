import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

function ReminderRowSkeleton() {
  return (
    <div className="skeuo-card p-5" aria-hidden="true">
      <div className="flex items-center gap-4">
        <Skeleton width="3rem" height="3rem" rounding="lg" className="sk-shimmer flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton width="55%" height="1rem" rounding="sm" />
          <Skeleton width="30%" height="0.85rem" rounding="sm" className="mt-2" />
        </div>
        <Skeleton width="3.5rem" height="2rem" rounding="round" className="sk-shimmer flex-shrink-0" />
        <Skeleton width="2.5rem" height="2.5rem" rounding="lg" className="flex-shrink-0" />
      </div>
    </div>
  );
}

function CategoryCardSkeleton() {
  return (
    <div className="skeuo-card p-5 flex flex-col justify-center" aria-hidden="true">
      <div className="flex items-center gap-3">
        <Skeleton width="2.75rem" height="2.75rem" rounding="lg" className="sk-shimmer flex-shrink-0" />
        <div className="min-w-0">
          <Skeleton width="70%" height="0.9rem" rounding="sm" />
          <Skeleton width="45%" height="0.8rem" rounding="sm" className="mt-1" />
        </div>
      </div>
    </div>
  );
}

export default function SkeletonReminders() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white pb-20" aria-busy="true">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <div className="text-center mb-10">
          <div className="max-w-md mx-auto">
            <SkeletonText lines={1} size="xl" />
          </div>
          <div className="max-w-xs mx-auto mt-3">
            <SkeletonText lines={1} size="md" />
          </div>
        </div>

        <div className="mb-8">
          <SkeletonButton size="lg" width="100%" />
        </div>

        <div>
          {["MORNING", "AFTERNOON", "EVENING"].map((group) => (
            <div key={group} className="mb-8">
              <Skeleton width="7rem" height="0.9rem" rounding="sm" />
              <div className="mt-4 space-y-3">
                {[0, 1].map((i) => (
                  <ReminderRowSkeleton key={i} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <Skeleton width="9rem" height="0.95rem" rounding="sm" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-stretch mt-4">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <CategoryCardSkeleton key={i} />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="skeuo-card-inset px-8 py-6 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Skeleton width="1.5rem" height="1.5rem" rounding="sm" />
              <Skeleton width="8rem" height="0.9rem" rounding="sm" />
            </div>
            <div className="max-w-sm mx-auto">
              <SkeletonText lines={2} size="sm" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}