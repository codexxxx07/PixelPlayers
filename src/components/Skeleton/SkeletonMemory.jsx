import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';
import SkeletonAvatar from './SkeletonAvatar';
import SkeletonCard from './SkeletonCard';

function MemoryCardSkeleton() {
  return (
    <div className="rounded-2xl border border-amber-200/60 bg-[#FFFDF7] p-6 shadow-sm shadow-amber-900/5">
      <div className="mb-3 flex items-center gap-3">
        <Skeleton width={32} height={32} rounding="lg" />
        <Skeleton width={120} height={12} rounding="md" />
        <Skeleton width={72} height={12} rounding="md" className="ml-auto hidden sm:block" />
      </div>
      <SkeletonText size="lg" lines={1} widths={[140]} />
      <SkeletonText size="md" lines={2} widths={['100%', '76%']} className="mt-3" />
      <div className="mt-4 flex gap-2">
        <SkeletonButton size="sm" width={110} />
        <SkeletonButton size="sm" width={84} />
      </div>
    </div>
  );
}

export default function SkeletonMemory() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 md:py-12">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <Skeleton width={96} height={12} rounding="full" className="mb-3" />
            <SkeletonText size="xl" lines={1} widths={[220]} />
          </div>
          <SkeletonButton size="md" width={150} />
        </header>
        <div className="mb-8 flex flex-wrap gap-2">
          {[80, 110, 96, 68, 120, 90].map((w) => (
            <Skeleton key={w} width={w} height={34} rounding="full" />
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-4">
            <MemoryCardSkeleton />
            <MemoryCardSkeleton />
            <MemoryCardSkeleton />
            <MemoryCardSkeleton />
          </div>
          <div className="lg:order-last">
            <SkeletonCard className="space-y-5">
              <div className="flex items-center gap-3">
                <SkeletonAvatar size="lg" />
                <div className="flex-1 space-y-2">
                  <SkeletonText size="md" lines={1} widths={[120]} />
                  <SkeletonText size="sm" lines={1} widths={[90]} />
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-start">
                  <Skeleton width="72%" height={44} rounding="xl" />
                </div>
                <div className="flex justify-end">
                  <Skeleton width="48%" height={44} rounding="xl" />
                </div>
                <div className="flex justify-start">
                  <Skeleton width="62%" height={44} rounding="xl" />
                </div>
              </div>
              <div className="flex items-center gap-3 border-t border-warm-200 pt-4">
                <Skeleton width={44} height={44} rounding="full" />
                <Skeleton height={44} className="flex-1" rounding="xl" />
                <SkeletonButton size="md" width={72} />
              </div>
            </SkeletonCard>
          </div>
        </div>
      </div>
    </div>
  );
}