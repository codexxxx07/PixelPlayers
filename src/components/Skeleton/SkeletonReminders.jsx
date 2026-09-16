import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';

function ReminderRowSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-2 border-warm-200 bg-white p-4">
      <Skeleton width={48} height={48} rounding="lg" />
      <div className="min-w-0 flex-1 space-y-2">
        <SkeletonText size="md" lines={1} widths={[160]} />
        <SkeletonText size="sm" lines={1} widths={[96]} />
      </div>
      <Skeleton width={56} height={32} rounding="full" />
      <Skeleton width={34} height={34} rounding="lg" />
    </div>
  );
}

export default function SkeletonReminders() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 md:py-12">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <SkeletonText size="sm" lines={1} widths={[110]} />
            <SkeletonText size="xl" lines={1} widths={[200]} className="mt-2" />
          </div>
          <SkeletonButton size="md" width={170} />
        </header>
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-2 rounded-xl border-2 border-warm-200 bg-white p-3">
              <Skeleton width={30} height={30} rounding="lg" />
              <Skeleton height={12} width={42} rounding="md" />
            </div>
          ))}
        </div>
        <div className="space-y-10">
          {[0, 1, 2].map((group) => (
            <div key={group}>
              <div className="mb-4 flex items-center gap-2">
                <Skeleton width={24} height={24} rounding="md" />
                <Skeleton width={90} height={12} rounding="md" />
              </div>
              <div className="space-y-3">
                <ReminderRowSkeleton />
                <ReminderRowSkeleton />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}