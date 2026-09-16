import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';

export default function SkeletonGameCard() {
  return (
    <SkeletonCard className="flex min-h-[220px] flex-col">
      <div className="mb-4 flex items-start justify-between gap-3">
        <Skeleton width={56} height={56} rounding="xl" />
        <Skeleton width={80} height={20} rounding="full" />
      </div>
      <SkeletonText size="lg" lines={1} widths={[110]} />
      <SkeletonText size="md" lines={2} widths={['100%', '82%']} className="mt-2 flex-1" />
      <div className="mt-4 flex items-center justify-between border-t border-warm-200 pt-3">
        <Skeleton width={64} height={12} rounding="md" />
        <Skeleton width={48} height={12} rounding="md" />
      </div>
    </SkeletonCard>
  );
}