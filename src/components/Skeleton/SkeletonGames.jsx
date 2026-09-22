import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonGameCard from './SkeletonGameCard';

export default function SkeletonGames() {
  return (
    <div className="page-enter min-h-screen pb-16" aria-busy="true">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10 space-y-10">
        {/* Header */}
        <header className="text-center">
          <div className="flex justify-center mb-4">
            <Skeleton width={64} height={64} radius="2xl" className="sk-inner" />
          </div>
          <Skeleton width={280} height={22} radius="sm" className="sk-inner mx-auto" />
          <Skeleton width="55%" height={16} radius="sm" className="sk-inner mx-auto mt-3 max-w-xl" />
        </header>

        {/* Category filter bar */}
        <section>
          <div className="flex gap-3 overflow-x-auto pb-3 px-1 -mx-1">
            {Array.from({ length: 7 }, (_, i) => (
              <Skeleton
                key={i}
                width={i === 0 ? 72 : 104}
                height={48}
                radius="full"
                className="sk-inner shrink-0"
              />
            ))}
          </div>
        </section>

        {/* Games grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {Array.from({ length: 6 }, (_, i) => (
              <SkeletonGameCard key={i} />
            ))}
          </div>
        </section>

        {/* How games help */}
        <section>
          <SkeletonCard className="p-8 md:p-10">
            <Skeleton width={220} height={16} radius="sm" className="sk-inner mb-2" />
            <Skeleton width="45%" height={14} radius="sm" className="sk-inner mb-8" />
            <div className="grid sm:grid-cols-3 gap-5 items-stretch">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <Skeleton width={56} height={56} radius="2xl" className="sk-inner mb-4" />
                  <Skeleton width="70%" height={14} radius="sm" className="sk-inner mb-2" />
                  <SkeletonText lines={2} size="sm" widths={['100%', '78%']} />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <Skeleton width="55%" height={12} radius="sm" className="sk-inner max-w-md" />
            </div>
          </SkeletonCard>
        </section>
      </div>
    </div>
  );
}