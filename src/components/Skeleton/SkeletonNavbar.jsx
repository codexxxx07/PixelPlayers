import Skeleton from './Skeleton';

const NAV_LINKS = [64, 80, 72, 60];

export default function SkeletonNavbar() {
  return (
    <div
      aria-hidden="true"
      className="sticky top-0 z-40 border-b-[3px] border-dashed border-teal-200 bg-[#FFF8F0] shadow-md shadow-teal-900/5"
    >
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-2.5">
          <Skeleton width={36} height={36} rounding="md" />
          <Skeleton width={120} height={14} rounding="md" className="hidden sm:block" />
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          {NAV_LINKS.map((w) => (
            <Skeleton key={w} width={w} height={32} rounding="lg" />
          ))}
        </div>
        <div className="flex items-center gap-3">
          <Skeleton width={76} height={40} rounding="xl" className="hidden sm:block" />
          <Skeleton width={40} height={40} rounding="xl" />
          <Skeleton width={28} height={28} rounding="md" className="lg:hidden" />
        </div>
      </nav>
    </div>
  );
}