import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonAvatar from './SkeletonAvatar';
import SkeletonButton from './SkeletonButton';
import SkeletonCard from './SkeletonCard';
import SkeletonSectionTitle from './SkeletonSectionTitle';
import SkeletonGameCard from './SkeletonGameCard';

function StatCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border-2 border-warm-200 p-6 shadow-sm">
      <Skeleton width={40} height={40} rounding="xl" className="mb-4" />
      <SkeletonText size="xl" lines={1} widths={[72]} />
      <SkeletonText size="sm" lines={1} widths={[110]} className="mt-2" />
    </div>
  );
}

function RoutineMiniRowSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-warm-200 p-4">
      <Skeleton width={36} height={36} rounding="lg" />
      <div className="flex-1 space-y-2">
        <SkeletonText size="md" lines={1} widths={[140]} />
        <SkeletonText size="sm" lines={1} widths={[90]} />
      </div>
      <Skeleton width={56} height={14} rounding="md" className="hidden sm:block" />
    </div>
  );
}

export default function SkeletonDashboard() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 py-8 md:py-12">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <SkeletonAvatar size="lg" />
            <div className="space-y-2">
              <SkeletonText size="sm" lines={1} widths={[120]} />
              <SkeletonText size="xl" lines={1} widths={[200]} />
            </div>
          </div>
          <Skeleton width={88} height={88} rounding="md" className="hidden sm:block" />
        </header>
        <section>
          <SkeletonSectionTitle />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
            <StatCardSkeleton />
          </div>
        </section>
        <section>
          <SkeletonSectionTitle />
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <SkeletonGameCard />
            <SkeletonGameCard />
            <SkeletonGameCard />
          </div>
        </section>
        <section className="grid gap-6 lg:grid-cols-2">
          <SkeletonCard className="space-y-4">
            <SkeletonText size="md" lines={1} widths={[150]} />
            <div className="rounded-2xl border border-amber-200/60 bg-[var(--pp-surface-tint)] p-5">
              <div className="mb-3 flex items-center gap-3">
                <Skeleton width={32} height={32} rounding="lg" />
                <Skeleton width={110} height={12} rounding="md" />
              </div>
              <SkeletonText size="md" lines={2} widths={['100%', '80%']} />
              <div className="mt-4 flex gap-2">
                <SkeletonButton size="sm" width={96} />
                <SkeletonButton size="sm" width={72} />
              </div>
            </div>
          </SkeletonCard>
          <SkeletonCard className="space-y-4">
            <SkeletonText size="md" lines={1} widths={[150]} />
            <div className="space-y-3">
              <RoutineMiniRowSkeleton />
              <RoutineMiniRowSkeleton />
              <RoutineMiniRowSkeleton />
            </div>
          </SkeletonCard>
        </section>
      </div>
    </div>
  );
}