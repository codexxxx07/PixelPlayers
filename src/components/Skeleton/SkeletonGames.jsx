import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';
import SkeletonCard from './SkeletonCard';
import SkeletonGameCard from './SkeletonGameCard';

const CATEGORY_WIDTHS = [72, 120, 144, 96, 128, 88, 112];

export default function SkeletonGames() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 md:py-12">
        <header className="mb-10 text-center">
          <div className="mb-5 flex justify-center">
            <Skeleton width={64} height={64} rounding="xl" />
          </div>
          <SkeletonText size="xl" lines={1} widths={[220]} className="mx-auto" />
          <SkeletonText size="md" lines={2} widths={['60%', '44%']} className="mx-auto mt-3" />
        </header>
        <div className="mb-10 flex flex-wrap justify-center gap-2.5">
          {CATEGORY_WIDTHS.map((w) => (
            <Skeleton key={w} width={w} height={32} rounding="full" />
          ))}
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <SkeletonGameCard key={i} />
          ))}
        </div>
        <section className="mt-16">
          <div className="mb-6 text-center">
            <SkeletonText size="lg" lines={1} widths={[180]} className="mx-auto" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} className="flex flex-col items-center text-center">
                <Skeleton width={48} height={48} rounding="xl" className="mb-4" />
                <SkeletonText size="md" lines={1} widths={[120]} />
                <SkeletonText size="sm" lines={2} widths={['100%', '80%']} className="mt-2" />
              </SkeletonCard>
            ))}
          </div>
        </section>
        <div className="mt-16 text-center">
          <SkeletonButton size="lg" width={200} />
        </div>
      </div>
    </div>
  );
}