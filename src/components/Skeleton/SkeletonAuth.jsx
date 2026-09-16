import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';
import SkeletonCard from './SkeletonCard';

export default function SkeletonAuth() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <SkeletonCard className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center gap-4">
          <Skeleton width={56} height={56} rounding="xl" />
          <Skeleton width={150} height={14} rounding="full" />
          <SkeletonText size="lg" lines={2} widths={[190, 140]} className="mx-auto" />
        </div>
        <div className="space-y-3">
          <Skeleton height={48} rounding="lg" className="w-full" />
          <Skeleton height={48} rounding="lg" className="w-full" />
          <Skeleton height={48} rounding="lg" className="w-full" />
        </div>
        <SkeletonButton size="lg" block />
        <div className="flex items-center gap-3">
          <Skeleton width="25%" height={1} rounding="none" />
          <Skeleton width={80} height={12} rounding="md" />
          <Skeleton width="25%" height={1} rounding="none" />
        </div>
        <div className="flex items-center justify-center gap-4">
          <SkeletonButton size="md" width={140} />
          <SkeletonButton size="md" width={140} />
        </div>
        <div className="flex items-center justify-center gap-2">
          <Skeleton width={110} height={12} rounding="md" />
          <Skeleton width={90} height={12} rounding="md" />
        </div>
      </SkeletonCard>
    </div>
  );
}