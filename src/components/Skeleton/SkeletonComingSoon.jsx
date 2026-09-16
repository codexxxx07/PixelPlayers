import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';
import SkeletonCard from './SkeletonCard';

export default function SkeletonComingSoon() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 md:py-12">
        <header className="space-y-4 text-center">
          <div className="flex justify-center">
            <Skeleton width={64} height={64} rounding="xl" />
          </div>
          <SkeletonText size="xl" lines={1} widths={[200]} className="mx-auto" />
          <SkeletonText size="md" lines={2} widths={['78%', '56%']} className="mx-auto" />
        </header>
        <section className="mt-8">
          <SkeletonCard className="mx-auto max-w-md space-y-4 text-center">
            <div className="flex justify-center">
              <Skeleton width={88} height={88} rounding="xl" />
            </div>
            <SkeletonText size="md" lines={2} widths={[160, 120]} className="mx-auto" />
            <div className="flex justify-center gap-2">
              <Skeleton width={110} height={22} rounding="full" />
              <Skeleton width={96} height={22} rounding="full" />
            </div>
          </SkeletonCard>
        </section>
        <div className="mt-10 flex justify-center">
          <SkeletonButton size="lg" width={180} />
        </div>
      </div>
    </div>
  );
}