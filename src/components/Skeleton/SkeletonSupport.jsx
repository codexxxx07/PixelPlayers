import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';
import SkeletonCard from './SkeletonCard';

const RELATIONSHIPS = [
  { icon: 40, label: 64 },
  { icon: 40, label: 56 },
  { icon: 40, label: 84 },
  { icon: 40, label: 76 },
  { icon: 40, label: 104 },
];

export default function SkeletonSupport() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 md:py-12">
        <header className="mb-8 text-center">
          <SkeletonText size="xl" lines={1} widths={[200]} className="mx-auto" />
          <SkeletonText size="md" lines={2} widths={['58%', '42%']} className="mx-auto mt-3" />
        </header>
        <section>
          <SkeletonText size="md" lines={1} widths={[150]} className="mb-5" />
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            {RELATIONSHIPS.map((r, i) => (
              <div key={i} className="flex items-center gap-4 rounded-2xl border-2 border-warm-200 bg-white p-4">
                <Skeleton width={r.icon} height={r.icon} rounding="full" />
                <Skeleton width={r.label} height={16} rounding="md" />
              </div>
            ))}
          </div>
          <SkeletonText size="md" lines={1} widths={[160]} className="mb-5" />
          <div className="mb-8 grid gap-3 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} className="flex flex-col items-center text-center">
                <Skeleton width={48} height={48} rounding="xl" className="mb-3" />
                <SkeletonText size="md" lines={1} widths={[110]} />
                <SkeletonText size="sm" lines={1} widths={[80]} className="mt-2" />
              </SkeletonCard>
            ))}
          </div>
        </section>
        <div className="grid gap-5 md:grid-cols-2">
          {Array.from({ length: 2 }).map((_, i) => (
            <SkeletonCard key={i} className="space-y-4">
              <SkeletonText size="md" lines={1} widths={[140]} />
              <div className="flex items-center gap-4">
                <Skeleton width={52} height={52} rounding="full" />
                <div className="flex-1 space-y-2">
                  <SkeletonText size="md" lines={1} widths={[130]} />
                  <SkeletonText size="sm" lines={1} widths={[150]} />
                </div>
              </div>
              <SkeletonButton size="sm" width={110} />
            </SkeletonCard>
          ))}
        </div>
        <p className="mb-4 mt-10 text-center">
          <span className="sr-only">Loading support page</span>
        </p>
      </div>
    </div>
  );
}