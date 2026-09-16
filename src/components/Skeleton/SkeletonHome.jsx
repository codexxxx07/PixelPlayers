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
      <SkeletonText size="md" lines={2} widths={['100%', '84%']} className="mt-2" />
      <Skeleton width={90} height={14} rounding="md" className="mt-4" />
    </SkeletonCard>
  );
}

export default function SkeletonHome() {
  return (
    <div className="min-h-screen">
      <SkeletonHero variant="home" />
      <div className="mx-auto max-w-7xl space-y-16 px-6 py-16 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCardSkeleton />
          <FeatureCardSkeleton />
          <FeatureCardSkeleton />
        </div>
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <SkeletonText size="xl" lines={1} widths={[200]} />
            <SkeletonText size="md" lines={4} widths={['100%', '92%', '88%', '70%']} />
            <SkeletonButton size="md" width={150} />
          </div>
          <div className="relative overflow-hidden rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-warm-50 p-8">
            <div className="absolute inset-0 pixel-grid opacity-50" />
            <div className="relative grid grid-cols-5 gap-1.5">
              {Array.from({ length: 25 }).map((_, i) => (
                <Skeleton key={i} height={24} rounding="sm" className="w-full" />
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} className="flex flex-col items-center text-center">
              <Skeleton width={56} height={56} rounding="xl" className="mb-4" />
              <SkeletonText size="md" lines={1} widths={[110]} />
              <SkeletonText size="sm" lines={2} widths={['100%', '80%']} className="mt-2" />
            </SkeletonCard>
          ))}
        </div>
        <div className="rounded-2xl border-2 border-teal-200 bg-teal-900 p-10 text-center">
          <SkeletonText size="xl" lines={1} widths={[240]} className="mx-auto" dark={false} />
          <SkeletonText size="md" lines={2} widths={['55%', '42%']} className="mx-auto mt-4" />
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <SkeletonButton size="lg" width={180} />
            <SkeletonButton size="lg" width={180} />
          </div>
        </div>
      </div>
    </div>
  );
}