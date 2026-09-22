import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonButton from './SkeletonButton';
import SkeletonSectionTitle from './SkeletonSectionTitle';

function StatCard() {
  return (
    <SkeletonCard className="p-5">
      <Skeleton width={40} height={40} radius="xl" className="sk-inner mb-3" />
      <Skeleton width="80%" height={13} radius="sm" className="sk-inner mb-1" />
      <Skeleton width="55%" height={18} radius="sm" className="sk-inner mb-3" />
      <Skeleton width="100%" height={8} radius="full" className="sk-inner" />
    </SkeletonCard>
  );
}

function BarChart() {
  return (
    <SkeletonCard variant="elevated" className="p-6">
      <Skeleton width={220} height={14} radius="sm" className="sk-inner mb-6" />
      <div className="h-44 flex items-end gap-3 md:gap-4">
        {Array.from({ length: 7 }, (_, i) => (
          <div key={i} className="flex-1 h-full flex flex-col items-center justify-end gap-1.5 min-w-0">
            <Skeleton width={22} height={12} radius="sm" className="sk-inner" />
            <Skeleton
              width="100%"
              height={i % 2 === 0 ? 96 : 64}
              radius="sm"
              className="sk-inner max-w-[44px]"
            />
            <Skeleton width={30} height={11} radius="sm" className="sk-inner" />
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}

function FavoriteRow() {
  return (
    <SkeletonCard hover className="p-5">
      <div className="flex items-center gap-4">
        <Skeleton width={48} height={48} radius="xl" className="sk-inner" />
        <div className="flex-1 min-w-0">
          <Skeleton width="50%" height={15} radius="sm" className="sk-inner mb-1" />
          <Skeleton width="35%" height={13} radius="sm" className="sk-inner" />
        </div>
        <div className="shrink-0 space-y-2">
          <Skeleton width={44} height={14} radius="sm" className="sk-inner" />
          <Skeleton width={48} height={11} radius="sm" className="sk-inner" />
        </div>
      </div>
    </SkeletonCard>
  );
}

export default function SkeletonProgress() {
  return (
    <div className="page-enter min-h-screen pb-16" aria-busy="true">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10 space-y-12">
        {/* Page header */}
        <header className="text-center">
          <div className="flex justify-center mb-4">
            <Skeleton width={64} height={64} radius="2xl" className="sk-inner" />
          </div>
          <Skeleton width={260} height={22} radius="sm" className="sk-inner mx-auto mb-3" />
          <Skeleton width="55%" height={16} radius="sm" className="sk-inner mx-auto mb-4 max-w-xl" />
          <div className="flex justify-center">
            <Skeleton width={280} height={32} radius="full" className="sk sk-inner" />
          </div>
        </header>

        {/* Overall stats */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={160} titleHeight={16} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <StatCard />
            <StatCard />
            <StatCard />
            <StatCard />
          </div>
        </section>

        {/* Weekly activity chart */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={180} titleHeight={16} />
          <BarChart />
        </section>

        {/* Accuracy trend */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={180} titleHeight={16} />
          <BarChart />
        </section>

        {/* Category breakdown */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={180} titleHeight={16} />
          <SkeletonCard variant="elevated" className="p-6">
            <Skeleton width={200} height={14} radius="sm" className="sk-inner mb-5" />
            <Skeleton width="100%" height={28} radius="full" className="sk-inner mb-6" />
            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton width={12} height={12} radius="xs" className="sk-inner" />
                  <Skeleton width={90} height={13} radius="sm" className="sk-inner" />
                  <Skeleton width={30} height={13} radius="sm" className="sk-inner" />
                </div>
              ))}
            </div>
          </SkeletonCard>
        </section>

        {/* Favorites */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={160} titleHeight={16} />
          <div className="space-y-3">
            <FavoriteRow />
            <FavoriteRow />
            <FavoriteRow />
          </div>
        </section>

        {/* Achievements */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={160} titleHeight={16} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
            {Array.from({ length: 5 }, (_, i) => (
              <SkeletonCard key={i} className="p-5 flex flex-col items-center text-center">
                <Skeleton width={40} height={40} radius="xl" className="sk-inner mb-3" />
                <Skeleton width="75%" height={12} radius="sm" className="sk-inner mb-2" />
                <SkeletonText lines={2} size="xs" widths={['100%', '70%']} className="flex-1" />
                <Skeleton width={90} height={22} radius="full" className="sk-inner mt-3" />
              </SkeletonCard>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <section>
          <SkeletonCard className="p-6 rounded-2xl">
            <div className="flex items-start gap-4">
              <Skeleton width={28} height={28} radius="sm" className="sk-inner" />
              <div className="flex-1">
                <Skeleton width={120} height={12} radius="sm" className="sk-inner mb-2" />
                <SkeletonText lines={2} size="sm" />
              </div>
            </div>
          </SkeletonCard>
          <div className="mt-8 text-center">
            <SkeletonButton width={200} height={48} size="lg" radius="xl" />
          </div>
        </section>
      </div>
    </div>
  );
}