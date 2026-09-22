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

function RecommendedCard() {
  return (
    <SkeletonCard className="p-6 flex flex-col">
      <div className="flex items-start gap-4 mb-4">
        <Skeleton width={40} height={40} radius="xl" className="sk-inner" />
        <div className="min-w-0 flex-1">
          <Skeleton width="70%" height={16} radius="sm" className="sk-inner mb-2" />
          <Skeleton width={96} height={24} radius="full" className="sk-inner" />
        </div>
      </div>
      <SkeletonText lines={2} size="sm" className="mb-4 flex-1" />
      <SkeletonButton width={140} height={40} size="sm" radius="xl" className="self-start mt-auto" />
    </SkeletonCard>
  );
}

function MemoryHighlight() {
  return (
    <SkeletonCard className="p-6 flex flex-col">
      <div className="flex items-start gap-3 mb-3">
        <Skeleton width={32} height={32} radius="xl" className="sk-inner" />
        <div className="min-w-0 flex-1">
          <Skeleton width="75%" height={16} radius="sm" className="sk-inner mb-1" />
          <Skeleton width="40%" height={12} radius="sm" className="sk-inner" />
        </div>
      </div>
      <SkeletonText lines={3} size="sm" className="flex-1" />
    </SkeletonCard>
  );
}

function RoutineSlider() {
  return (
    <SkeletonCard className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Skeleton width={24} height={24} radius="sm" className="sk-inner" />
          <Skeleton width={110} height={14} radius="sm" className="sk-inner" />
        </div>
        <Skeleton width={120} height={28} radius="full" className="sk-inner" />
      </div>
      <SkeletonText lines={3} size="sm" />
    </SkeletonCard>
  );
}

function ActivityRow() {
  return (
    <SkeletonCard className="p-4 md:p-5">
      <div className="flex items-start gap-4">
        <Skeleton width={44} height={44} radius="xl" className="sk-inner" />
        <div className="flex-1 min-w-0">
          <Skeleton width="60%" height={15} radius="sm" className="sk-inner mb-1.5" />
          <Skeleton width="45%" height={13} radius="sm" className="sk-inner" />
        </div>
        <Skeleton width={70} height={12} radius="sm" className="sk-inner" />
      </div>
    </SkeletonCard>
  );
}

export default function SkeletonDashboard() {
  return (
    <div className="page-enter min-h-screen pb-16" aria-busy="true">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10 space-y-12">
        {/* Greeting card */}
        <SkeletonCard className="relative overflow-hidden p-7 md:p-10">
          <div className="absolute top-0 left-0 right-0 h-3 flex opacity-70">
            <div className="flex-1 bg-teal-400" />
            <div className="flex-1 bg-amber-400" />
            <div className="flex-1 bg-teal-300" />
            <div className="flex-1 bg-amber-300" />
          </div>
          <div className="relative flex flex-col sm:flex-row sm:items-center gap-6 pt-4">
            <div className="flex-1">
              <Skeleton width={160} height={12} radius="sm" className="sk-inner mb-3" />
              <Skeleton width={280} height={24} radius="sm" className="sk-inner mb-4" />
              <div className="flex flex-wrap gap-5">
                <Skeleton width={200} height={16} radius="sm" className="sk-inner" />
                <Skeleton width={140} height={16} radius="sm" className="sk-inner" />
              </div>
            </div>
            <div className="shrink-0 self-center sm:self-end">
              <Skeleton width={80} height={80} radius="2xl" className="sk sk-inner" />
            </div>
          </div>
        </SkeletonCard>

        {/* Current status */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={180} titleHeight={16} />
          <SkeletonCard className="p-6 md:p-7">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-emerald-50/70 border border-emerald-200 p-5">
                <Skeleton width={120} height={12} radius="sm" className="sk-inner mb-2" />
                <Skeleton width="85%" height={18} radius="sm" className="sk-inner mb-1" />
                <Skeleton width="45%" height={14} radius="sm" className="sk-inner" />
              </div>
              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-5">
                <Skeleton width={90} height={12} radius="sm" className="sk-inner mb-2" />
                <Skeleton width="80%" height={18} radius="sm" className="sk-inner mb-1" />
                <Skeleton width="40%" height={14} radius="sm" className="sk-inner" />
              </div>
            </div>
          </SkeletonCard>
        </section>

        {/* Recommended */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={200} titleHeight={16} />
          <div className="grid sm:grid-cols-2 gap-5 items-stretch">
            <RecommendedCard />
            <RecommendedCard />
          </div>
        </section>

        {/* Today's progress */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={200} titleHeight={16} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <StatCard />
            <StatCard />
            <StatCard />
            <StatCard />
          </div>
          <SkeletonCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <Skeleton width={180} height={14} radius="sm" className="sk-inner" />
              <Skeleton width={40} height={14} radius="sm" className="sk-inner" />
            </div>
            <Skeleton width="100%" height={10} radius="full" className="sk-inner" />
          </SkeletonCard>
        </section>

        {/* Memory highlights */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={180} titleHeight={16} />
          <SkeletonCard className="p-5 bg-amber-50/40 border-amber-200/60">
            <div className="flex items-center gap-3">
              <Skeleton width={24} height={24} radius="sm" className="sk-inner" />
              <Skeleton width="70%" height={16} radius="sm" className="sk-inner" />
            </div>
          </SkeletonCard>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            <MemoryHighlight />
            <MemoryHighlight />
            <MemoryHighlight />
          </div>
          <div>
            <SkeletonButton width={190} height={44} size="md" radius="xl" />
          </div>
        </section>

        {/* Today's routine */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={180} titleHeight={16} />
          <div className="flex gap-4 overflow-x-auto pb-4 px-1 -mx-1">
            <div className="min-w-[260px] max-w-[300px] w-full shrink-0">
              <RoutineSlider />
            </div>
            <div className="min-w-[260px] max-w-[300px] w-full shrink-0">
              <RoutineSlider />
            </div>
          </div>
        </section>

        {/* Quick actions */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={180} titleHeight={16} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {Array.from({ length: 4 }, (_, i) => (
              <SkeletonCard key={i} className="p-6 md:p-8 flex flex-col items-center justify-center min-h-[180px]">
                <Skeleton width={44} height={44} radius="xl" className="sk-inner mb-4" />
                <Skeleton width={140} height={14} radius="sm" className="sk-inner mb-2" />
                <Skeleton width={90} height={12} radius="sm" className="sk-inner" />
              </SkeletonCard>
            ))}
          </div>
        </section>

        {/* Recent activity */}
        <section className="space-y-5">
          <SkeletonSectionTitle iconSize={24} titleWidth={180} titleHeight={16} />
          <div className="space-y-3">
            {Array.from({ length: 4 }, (_, i) => (
              <ActivityRow key={i} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}