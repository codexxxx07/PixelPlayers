import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';
import SkeletonAvatar from './SkeletonAvatar';
import SkeletonCard from './SkeletonCard';

function ActionItemSkeleton() {
  return (
    <SkeletonCard className="space-y-3">
      <Skeleton width={44} height={44} rounding="xl" />
      <SkeletonText size="md" lines={1} widths={[120]} />
      <SkeletonText size="sm" lines={2} widths={['100%', '78%']} />
      <Skeleton width={96} height={14} rounding="md" />
    </SkeletonCard>
  );
}

export default function SkeletonAssistant() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-8 lg:py-10">
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[290px_minmax(0,1fr)_310px]">
          <div className="space-y-4">
            <ActionItemSkeleton />
            <ActionItemSkeleton />
            <ActionItemSkeleton />
          </div>
          <SkeletonCard className="flex min-h-[58vh] flex-col">
            <div className="mb-5 flex items-center gap-3">
              <SkeletonAvatar size="lg" />
              <div className="flex-1 space-y-2">
                <SkeletonText size="md" lines={1} widths={[120]} />
                <SkeletonText size="sm" lines={1} widths={[160]} />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <div className="flex justify-start">
                <Skeleton width="72%" height={46} rounding="xl" />
              </div>
              <div className="flex justify-end">
                <Skeleton width="46%" height={46} rounding="xl" />
              </div>
              <div className="flex justify-start">
                <Skeleton width="62%" height={46} rounding="xl" />
              </div>
              <div className="flex justify-end">
                <Skeleton width="52%" height={46} rounding="xl" />
              </div>
              <div className="flex justify-start">
                <Skeleton width={120} height={40} rounding="xl" />
              </div>
            </div>
            <div className="mt-5 flex items-center gap-3 border-t border-warm-200 pt-4">
              <SkeletonButton size="md" width={48} />
              <Skeleton height={48} className="flex-1" rounding="xl" />
              <SkeletonButton size="md" width={56} />
            </div>
          </SkeletonCard>
          <div className="hidden space-y-4 lg:block">
            <SkeletonCard className="flex flex-col items-center text-center">
              <SkeletonAvatar size="xl" className="mb-4" />
              <SkeletonText size="md" lines={1} widths={[110]} />
              <SkeletonText size="sm" lines={2} widths={['100%', '76%']} className="mt-2" />
              <SkeletonButton size="sm" width={110} className="mt-4" />
            </SkeletonCard>
            <SkeletonCard className="space-y-4">
              <SkeletonText size="md" lines={1} widths={[130]} />
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton width={36} height={36} rounding="lg" />
                    <div className="flex-1 space-y-2">
                      <SkeletonText size="sm" lines={1} widths={['100%']} />
                      <SkeletonText size="xs" lines={1} widths={['70%']} />
                    </div>
                  </div>
                ))}
              </div>
            </SkeletonCard>
          </div>
        </div>
      </div>
    </div>
  );
}