import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';
import SkeletonCard from './SkeletonCard';

function RoutineRowSkeleton() {
  return (
    <div className="flex min-h-[80px] items-center gap-4 rounded-2xl border-2 border-warm-200 p-5">
      <Skeleton width={32} height={32} rounding="md" />
      <Skeleton width={40} height={40} rounding="lg" />
      <div className="min-w-0 flex-1 space-y-2">
        <SkeletonText size="md" lines={1} widths={[140]} />
        <SkeletonText size="sm" lines={1} widths={[90]} />
      </div>
      <Skeleton width={64} height={14} rounding="md" className="hidden sm:block" />
    </div>
  );
}

export default function SkeletonRoutine() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 md:py-12">
        <header className="mb-8">
          <SkeletonText size="sm" lines={1} widths={[110]} />
          <SkeletonText size="xl" lines={1} widths={[200]} className="mt-2" />
        </header>
        <SkeletonCard className="space-y-4">
          <div className="flex items-center justify-between">
            <SkeletonText size="md" lines={1} widths={[140]} />
            <Skeleton width={90} height={16} rounding="md" />
          </div>
          <div className="relative h-6 overflow-hidden rounded-full bg-teal-100/80">
            <div className="absolute inset-y-0 left-0 w-2/3">
              <Skeleton className="h-full w-full" rounding="none" />
            </div>
          </div>
        </SkeletonCard>
        <div className="mt-10 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <RoutineRowSkeleton key={i} />
          ))}
        </div>
        <section className="mt-14">
          <SkeletonText size="lg" lines={1} widths={[180]} className="mb-6" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} className="flex flex-col">
                <Skeleton width={44} height={44} rounding="lg" className="mb-3" />
                <SkeletonText size="md" lines={1} widths={[120]} />
                <SkeletonText size="sm" lines={1} widths={[80]} className="mt-2" />
              </SkeletonCard>
            ))}
          </div>
        </section>
        <div className="mt-12 text-center">
          <SkeletonButton size="lg" width={190} />
        </div>
      </div>
    </div>
  );
}