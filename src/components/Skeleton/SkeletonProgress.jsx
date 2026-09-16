import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonSectionTitle from './SkeletonSectionTitle';

const BAR_HEIGHTS = [38, 62, 45, 78, 54, 86, 30];
const MIX_WIDTHS = [35, 25, 20, 15, 5];

function MixRowSkeleton({ value }) {
  return (
    <div className="flex items-center gap-4">
      <Skeleton width={96} height={14} rounding="md" />
      <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-teal-100/80">
        <div className="absolute inset-y-0 left-0" style={{ width: `${value}%` }}>
          <Skeleton className="h-full w-full" rounding="none" />
        </div>
      </div>
      <Skeleton width={40} height={14} rounding="md" />
    </div>
  );
}

export default function SkeletonProgress() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-7xl space-y-10 px-4 sm:px-6 py-8 md:py-12">
        <header>
          <SkeletonText size="sm" lines={1} widths={[110]} />
          <SkeletonText size="xl" lines={1} widths={[200]} className="mt-2" />
        </header>
        <section>
          <SkeletonSectionTitle />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} className="flex flex-col">
                <Skeleton width={40} height={40} rounding="xl" className="mb-3" />
                <SkeletonText size="xl" lines={1} widths={[64]} />
                <div className="mt-1 flex items-center gap-2">
                  <Skeleton width={50} height={12} rounding="md" />
                  <Skeleton width={30} height={12} rounding="md" />
                </div>
              </SkeletonCard>
            ))}
          </div>
        </section>
        <section>
          <SkeletonSectionTitle />
          <SkeletonCard className="mt-6">
            <div className="flex h-44 items-end gap-3">
              {BAR_HEIGHTS.map((h, i) => (
                <Skeleton key={i} width="100%" height={`${h}%`} rounding="md" className="flex-1" />
              ))}
            </div>
          </SkeletonCard>
        </section>
        <section>
          <SkeletonSectionTitle />
          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <SkeletonCard className="space-y-5">
              {MIX_WIDTHS.map((v, i) => (
                <MixRowSkeleton key={i} value={v} />
              ))}
            </SkeletonCard>
            <SkeletonCard className="space-y-4">
              <SkeletonText size="md" lines={1} widths={[120]} />
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton width={40} height={40} rounding="xl" />
                  <div className="flex-1 space-y-2">
                    <SkeletonText size="md" lines={1} widths={[140]} />
                    <SkeletonText size="sm" lines={1} widths={[80]} />
                  </div>
                  <Skeleton width={56} height={20} rounding="full" />
                </div>
              ))}
            </SkeletonCard>
          </div>
        </section>
        <section>
          <SkeletonSectionTitle />
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <SkeletonCard key={i} className="flex items-center gap-4">
                <Skeleton width={44} height={44} rounding="xl" />
                <div className="flex-1 space-y-2">
                  <SkeletonText size="md" lines={1} widths={[120]} />
                  <SkeletonText size="sm" lines={1} widths={[90]} />
                </div>
                <Skeleton width={46} height={24} rounding="full" />
              </SkeletonCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}