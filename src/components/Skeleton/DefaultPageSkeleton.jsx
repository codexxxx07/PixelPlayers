import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonPageHeader from './SkeletonPageHeader';

export default function DefaultPageSkeleton() {
  return (
    <div className="page-enter min-h-screen pb-16" aria-busy="true">
      <SkeletonPageHeader />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10 space-y-6">
        <SkeletonCard className="p-6 md:p-8">
          <Skeleton width={220} height={16} radius="sm" className="sk-inner mb-4" />
          <SkeletonText lines={3} size="md" />
        </SkeletonCard>
        <div className="grid md:grid-cols-2 gap-6">
          <SkeletonCard className="p-6">
            <Skeleton width="70%" height={14} radius="sm" className="sk-inner mb-3" />
            <SkeletonText lines={2} size="sm" />
          </SkeletonCard>
          <SkeletonCard className="p-6">
            <Skeleton width="70%" height={14} radius="sm" className="sk-inner mb-3" />
            <SkeletonText lines={2} size="sm" />
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
}