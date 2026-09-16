import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonSectionTitle from './SkeletonSectionTitle';

function LanguageRowSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border-2 border-warm-200 bg-white p-3">
      <Skeleton width={36} height={36} rounding="lg" />
      <div className="flex-1 space-y-2">
        <SkeletonText size="sm" lines={1} widths={[120]} />
        <SkeletonText size="xs" lines={1} widths={[70]} />
      </div>
      <Skeleton width={24} height={24} rounding="full" />
    </div>
  );
}

function ToggleRowSkeleton() {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border-2 border-warm-200 bg-white p-4">
      <div className="min-w-0 flex-1 space-y-2">
        <SkeletonText size="md" lines={1} widths={[150]} />
        <SkeletonText size="sm" lines={1} widths={[200]} />
      </div>
      <Skeleton width={56} height={32} rounding="full" />
    </div>
  );
}

export default function SkeletonSettings() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl space-y-10 px-4 sm:px-6 py-8 md:py-12">
        <header>
          <SkeletonText size="sm" lines={1} widths={[110]} />
          <SkeletonText size="xl" lines={1} widths={[200]} className="mt-2" />
        </header>
        <section>
          <SkeletonSectionTitle />
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 14 }).map((_, i) => (
              <LanguageRowSkeleton key={i} />
            ))}
          </div>
        </section>
        <section>
          <SkeletonSectionTitle />
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} className="flex items-center justify-center">
                <SkeletonText size="md" lines={1} widths={[90]} />
              </SkeletonCard>
            ))}
          </div>
        </section>
        <section className="space-y-4">
          <SkeletonText size="md" lines={1} widths={[150]} />
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <SkeletonText size="md" lines={1} widths={[140]} />
              <ToggleRowSkeleton />
            </div>
          ))}
        </section>
        <div className="flex justify-end gap-3">
          <Skeleton width={110} height={46} rounding="xl" />
          <Skeleton width={110} height={46} rounding="xl" />
        </div>
      </div>
    </div>
  );
}