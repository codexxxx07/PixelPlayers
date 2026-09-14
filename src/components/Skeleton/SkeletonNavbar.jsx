import Skeleton from "./Skeleton.jsx";
import SkeletonButton from "./SkeletonButton.jsx";

export default function SkeletonNavbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full border-b-[3px] border-dashed"
      style={{ backgroundColor: "#FFF8F0" }}
      aria-hidden="true"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <Skeleton width="2.5rem" height="2.5rem" rounding="lg" />
            <Skeleton
              width="9rem"
              height="1.1rem"
              rounding="sm"
              className="hidden sm:block"
            />
          </div>

          <div className="hidden xl:flex items-center gap-1">
            {[70, 80, 68, 78, 100].map((w, i) => (
              <Skeleton key={i} width={`${w / 16}rem`} height="1.5rem" rounding="lg" />
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <SkeletonButton size="md" width="6.5rem" />
            <SkeletonButton size="md" width="7.5rem" />
            <SkeletonButton size="md" width="5.5rem" />
          </div>

          <div className="lg:hidden flex flex-col items-center justify-center gap-1.5">
            <Skeleton width="1.5rem" height="0.25rem" rounding="round" />
            <Skeleton width="1.5rem" height="0.25rem" rounding="round" />
            <Skeleton width="1.5rem" height="0.25rem" rounding="round" />
          </div>
        </div>
      </nav>
    </header>
  );
}