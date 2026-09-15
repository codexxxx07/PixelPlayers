import Skeleton from "./Skeleton.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

export default function SkeletonNavbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b-[3px] border-dashed border-teal-200 shadow-md shadow-teal-900/5"
      style={{ backgroundColor: "#FFF8F0" }}
      aria-hidden="true"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="relative w-10 h-10 rounded-lg border-2 border-teal-300 bg-gradient-to-b from-teal-100 to-teal-200 sk sk-shimmer">
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-sm bg-amber-300" aria-hidden="true" />
            </div>
            <div className="hidden sm:block">
              <Skeleton width="9.5rem" height="1.1rem" rounding="sm" skipShimmer />
            </div>
          </div>

          <div className="hidden xl:flex items-center gap-1">
            {[68, 80, 72, 82, 100].map((w, i) => (
              <Skeleton key={i} width={`${w / 16}rem`} height="1.5rem" rounding="lg" />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <SkeletonButton size="md" width="6rem" variant="ghost" />
            <SkeletonButton size="md" width="7.5rem" variant="primary" />
            <SkeletonButton size="md" width="5rem" variant="danger" />
          </div>

          <button
            className="lg:hidden flex flex-col items-center justify-center w-14 h-14 rounded-xl shrink-0"
            aria-label="Open menu"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <span className="block h-[3px] w-full rounded-full sk sk-shimmer" />
              <span className="block h-[3px] w-full rounded-full sk sk-shimmer" />
              <span className="block h-[3px] w-full rounded-full sk sk-shimmer" />
            </div>
          </button>
        </div>
      </nav>
    </header>
  );
}