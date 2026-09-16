import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';
import SkeletonCard from './SkeletonCard';
import SkeletonHero from './SkeletonHero';

function FeatureCardSkeleton() {
  return (
    <SkeletonCard className="flex flex-col">
      <Skeleton width={52} height={52} rounding="xl" className="mb-4" />
      <SkeletonText size="lg" lines={1} widths={[130]} />
      <SkeletonText size="md" lines={2} widths={['100%', '84%']} className="mt-2 flex-1" />
      <Skeleton width={90} height={14} rounding="md" className="mt-4" />
    </SkeletonCard>
  );
}

export default function SkeletonFeatures() {
  return (
    <div className="min-h-screen">
      <SkeletonHero variant="page" />
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <FeatureCardSkeleton key={i} />
          ))}
        </div>
        <div className="mt-16 grid gap-6 md:grid-cols-[minmax(0,1fr)_340px]">
          <SkeletonCard className="space-y-5">
            <SkeletonText size="lg" lines={1} widths={[160]} />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="grid grid-cols-3 items-center gap-4">
                <Skeleton width="100%" height={16} rounding="md" />
                <Skeleton width="100%" height={16} rounding="md" />
                <Skeleton width="100%" height={16} rounding="md" />
              </div>
            ))}
          </SkeletonCard>
          <SkeletonCard className="flex flex-col items-center justify-center text-center">
            <Skeleton width={72} height={72} rounding="xl" className="mb-4" />
            <SkeletonText size="lg" lines={1} widths={[140]} />
            <SkeletonText size="md" lines={2} widths={['100%', '78%']} className="mt-2" />
            <SkeletonButton size="md" width={150} className="mt-5" />
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
}