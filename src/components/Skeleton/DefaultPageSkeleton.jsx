import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonHero from './SkeletonHero';

function DefaultCardSkeleton() {
  return (
    <SkeletonCard className="flex flex-col">
      <Skeleton width={48} height={48} rounding="xl" className="mb-4" />
      <SkeletonText size="lg" lines={1} widths={[120]} />
      <SkeletonText size="md" lines={2} widths={['100%', '80%']} className="mt-2 flex-1" />
    </SkeletonCard>
  );
}

export default function DefaultPageSkeleton() {
  return (
    <div className="min-h-screen">
      <SkeletonHero variant="page" />
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <DefaultCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}