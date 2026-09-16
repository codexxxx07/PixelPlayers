import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';
import SkeletonCard from './SkeletonCard';
import SkeletonHero from './SkeletonHero';

function ApproachCardSkeleton() {
  return (
    <SkeletonCard className="flex flex-col">
      <Skeleton width={52} height={52} rounding="xl" className="mb-4" />
      <SkeletonText size="lg" lines={1} widths={[130]} />
      <SkeletonText size="md" lines={3} widths={['100%', '90%', '76%']} className="mt-2" />
    </SkeletonCard>
  );
}

export default function SkeletonAbout() {
  return (
    <div className="min-h-screen">
      <SkeletonHero variant="page" />
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
          <div className="space-y-6">
            <SkeletonText size="xl" lines={1} widths={[180]} />
            <SkeletonText size="md" lines={4} widths={['100%', '92%', '88%', '64%']} />
            <Skeleton width={120} height={16} rounding="md" />
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
      </section>
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SkeletonText size="xl" lines={1} widths={[180]} className="mb-8" />
          <div className="grid gap-6 md:grid-cols-3">
            <ApproachCardSkeleton />
            <ApproachCardSkeleton />
            <ApproachCardSkeleton />
          </div>
        </div>
      </section>
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-2xl border-2 border-teal-200 bg-teal-50 p-6 text-center">
              <SkeletonText size="xl" lines={1} widths={[90]} className="mx-auto" />
              <SkeletonText size="sm" lines={1} widths={[130]} className="mx-auto mt-3" />
            </div>
          ))}
        </div>
      </section>
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            {[110, 130, 150, 120].map((w) => (
              <Skeleton key={w} width={w} height={46} rounding="xl" />
            ))}
          </div>
          <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-3">
            {[90, 110, 100, 120, 105, 95].map((w) => (
              <Skeleton key={w} width={w} height={30} rounding="full" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <SkeletonButton size="lg" width={190} />
          </div>
        </div>
      </section>
    </div>
  );
}