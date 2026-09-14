import Skeleton from "./Skeleton.jsx";
import SkeletonText from "./SkeletonText.jsx";
import SkeletonAvatar from "./SkeletonAvatar.jsx";

function ClaraCardSkeleton() {
  return (
    <div className="skeuo-card p-5" aria-hidden="true">
      <div className="flex items-center gap-3 mb-4">
        <SkeletonAvatar size="xl" className="flex-shrink-0" />
        <div className="min-w-0">
          <Skeleton width="4rem" height="0.8rem" rounding="sm" />
          <Skeleton width="10rem" height="0.9rem" rounding="sm" className="mt-2" />
        </div>
      </div>
      <SkeletonText lines={2} size="sm" />
    </div>
  );
}

function SuggestionRowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border-2 border-warm-200 px-4 py-3.5" aria-hidden="true">
      <Skeleton width="1.25rem" height="1.25rem" rounding="sm" />
      <Skeleton width="70%" height="1rem" rounding="sm" />
    </div>
  );
}

function ChatBubbleSkeleton({ align = "start" }) {
  return (
    <div className={`flex ${align === "end" ? "justify-end" : "justify-start"}`} aria-hidden="true">
      <div className="rounded-2xl px-4 py-3">
        <Skeleton width="13rem" height="0.85rem" rounding="sm" />
        <Skeleton width="9rem" height="0.85rem" rounding="sm" className="mt-2" />
      </div>
    </div>
  );
}

export default function SkeletonAssistant() {
  return (
    <div className="min-h-screen pb-16" aria-busy="true">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-8 md:py-10">
        <div className="grid lg:grid-cols-[290px_minmax(0,1fr)_310px] gap-6 items-start">
          <aside className="hidden lg:block space-y-5">
            <ClaraCardSkeleton />
            <div className="skeuo-card p-5">
              <Skeleton width="7rem" height="0.8rem" rounding="sm" />
              <div className="mt-4 space-y-2">
                {[0, 1, 2, 3].map((i) => (
                  <SuggestionRowSkeleton key={i} />
                ))}
              </div>
            </div>
            <div className="skeuo-card p-5">
              <Skeleton width="8rem" height="0.8rem" rounding="sm" />
              <div className="mt-4 space-y-4">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton width="1.5rem" height="1.5rem" rounding="sm" />
                    <div className="flex-1 min-w-0">
                      <Skeleton width="30%" height="0.8rem" rounding="sm" />
                      <Skeleton width="70%" height="1rem" rounding="sm" className="mt-2" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <div className="rounded-3xl bg-white border-2 border-teal-100 overflow-hidden flex flex-col">
            <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-teal-50 to-amber-50 border-b border-teal-100">
              <SkeletonAvatar size="lg" className="flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <Skeleton width="5rem" height="0.8rem" rounding="sm" />
                <Skeleton width="55%" height="1rem" rounding="sm" className="mt-1" />
              </div>
              <Skeleton width="6.5rem" height="2.6rem" rounding="lg" className="flex-shrink-0" />
            </div>

            <div className="flex-1 h-[52vh] min-h-[420px] overflow-y-auto p-5 space-y-5 buddy-chat-bg">
              <div className="text-center">
                <Skeleton width="3.5rem" height="0.8rem" rounding="sm" className="mx-auto" />
              </div>
              <ChatBubbleSkeleton />
              <ChatBubbleSkeleton align="end" />
              <ChatBubbleSkeleton />
              <ChatBubbleSkeleton />
            </div>

            <div className="px-4 pt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {[0, 1, 2, 3].map((i) => (
                <Skeleton
                  key={i}
                  width="7.5rem"
                  height="2.6rem"
                  rounding="round"
                  className="flex-shrink-0"
                />
              ))}
            </div>

            <form className="p-4 border-t border-teal-100 bg-[#FFF8F0]">
              <div className="flex items-end gap-3">
                <Skeleton height="5.5rem" rounding="lg" className="flex-1" />
                <Skeleton width="6rem" height="6rem" rounding="round" className="flex-shrink-0" />
                <Skeleton width="5rem" height="6rem" rounding="lg" className="flex-shrink-0" />
              </div>
            </form>
          </div>

          <aside className="hidden lg:block space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Skeleton width="4rem" height="0.8rem" rounding="sm" />
                <span className="flex-1 h-0.5 rounded-full bg-teal-100" />
              </div>
              <div className="skeuo-card p-5 flex flex-col h-full">
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton width="2.75rem" height="2.75rem" rounding="lg" className="flex-shrink-0" />
                  <Skeleton width="70%" height="0.85rem" rounding="sm" />
                </div>
                <SkeletonText lines={2} size="sm" className="flex-1" />
                <Skeleton width="8rem" height="2.6rem" rounding="lg" className="mt-4" />
              </div>
            </div>

            <div className="skeuo-card p-5">
              <Skeleton width="7rem" height="0.8rem" rounding="sm" />
              <div className="mt-4 space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton width="2.5rem" height="2.5rem" rounding="round" className="flex-shrink-0" />
                    <div className="min-w-0 flex-1">
                      <Skeleton width="60%" height="0.9rem" rounding="sm" />
                      <Skeleton width="45%" height="0.8rem" rounding="sm" className="mt-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}