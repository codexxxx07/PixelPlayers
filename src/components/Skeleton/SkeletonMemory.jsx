import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";

function MemoryCardSkeleton() {
  return (
    <div
      className="relative bg-[#FFFDF7] border border-amber-200/60 rounded-2xl p-6 flex flex-col shadow-sm shadow-amber-900/5"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <Skeleton width="2.25rem" height="2.25rem" rounding="lg" />
          <Skeleton width="6rem" height="1.7rem" rounding="round" className="sk-shimmer" />
        </div>
        <Skeleton width="4.5rem" height="0.85rem" rounding="sm" />
      </div>
      <Skeleton width="70%" height="0.95rem" rounding="sm" />
      <div className="mt-3 flex-1">
        <SkeletonText lines={2} size="sm" />
      </div>
      <div className="flex items-center gap-3 pt-4 mt-4">
        <Skeleton width="6rem" height="2.4rem" rounding="lg" className="sk-shimmer" />
        <Skeleton width="6rem" height="2.4rem" rounding="lg" className="sk-shimmer" />
      </div>
    </div>
  );
}

function ChatBubbleSkeleton({ align = "start" }) {
  return (
    <div className={`flex ${align === "end" ? "justify-end" : "justify-start"}`}>
      <div className="rounded-2xl px-4 py-3" aria-hidden="true">
        <Skeleton width="12rem" height="0.85rem" rounding="sm" />
        <Skeleton width="8rem" height="0.85rem" rounding="sm" className="mt-2" />
      </div>
    </div>
  );
}

export default function SkeletonMemory() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white pb-20" aria-busy="true">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <div className="text-center mb-8">
          <div className="max-w-lg mx-auto">
            <SkeletonText lines={1} size="xl" />
          </div>
          <div className="max-w-xl mx-auto mt-3">
            <SkeletonText lines={1} size="md" />
          </div>
          <div className="max-w-lg mx-auto mt-2">
            <SkeletonText lines={1} size="sm" />
          </div>
        </div>

        <div className="mb-8 -mx-4 px-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max pb-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Skeleton
                key={i}
                width={i % 3 === 0 ? "6.5rem" : "7rem"}
                height="3rem"
                rounding="lg"
                className="flex-shrink-0"
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <div>
              <Skeleton width="8rem" height="0.9rem" rounding="sm" />
              <div className="mt-4 space-y-4">
                {[0, 1, 2].map((i) => (
                  <MemoryCardSkeleton key={i} />
                ))}
              </div>
            </div>

            <div className="skeuo-card skeuo-card-pad">
              <Skeleton width="9rem" height="0.95rem" rounding="sm" />
              <div className="mt-2 max-w-md">
                <SkeletonText lines={1} size="sm" />
              </div>
              <Skeleton height="3.25rem" rounding="lg" className="mt-4" />
              <Skeleton height="6.5rem" rounding="lg" className="mt-3" />
              <div className="flex items-center gap-4 mt-4">
                <Skeleton width="3.5rem" height="3.5rem" rounding="round" className="sk-shimmer" />
                <Skeleton width="70%" height="3rem" rounding="lg" className="sk-shimmer flex-1" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="skeuo-card skeuo-card-pad lg:sticky lg:top-8">
              <Skeleton width="11rem" height="0.95rem" rounding="sm" />
              <div className="mt-5 space-y-4 mb-6">
                <ChatBubbleSkeleton />
                <ChatBubbleSkeleton />
                <ChatBubbleSkeleton align="end" />
                <ChatBubbleSkeleton />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton width="2.5rem" height="2.5rem" rounding="round" className="sk-shimmer" />
                <Skeleton height="3rem" rounding="lg" className="flex-1" />
                <Skeleton width="5rem" height="3rem" rounding="lg" className="sk-shimmer" />
              </div>
            </div>
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