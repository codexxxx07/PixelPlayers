import Skeleton from './Skeleton';
import SkeletonCard from './SkeletonCard';
import SkeletonButton from './SkeletonButton';

function RoutineRowCard() {
  return (
    <SkeletonCard className="p-4">
      <div className="flex items-center gap-4">
        <Skeleton width={40} height={40} radius="2xl" className="sk-inner" />
        <div className="min-w-0 flex-1">
          <Skeleton width="70%" height={15} radius="sm" className="sk-inner mb-1" />
          <Skeleton width="35%" height={12} radius="sm" className="sk-inner" />
        </div>
        <Skeleton width={28} height={28} radius="full" className="sk-inner" />
      </div>
    </SkeletonCard>
  );
}

export default function SkeletonRoutine() {
  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50/50 to-white pb-20" aria-busy="true">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        {/* Page header */}
        <div className="text-center mb-10">
          <Skeleton width={300} height={28} radius="sm" className="sk-inner mx-auto mb-2" />
          <Skeleton width={180} height={12} radius="sm" className="sk-inner mx-auto mb-1" />
          <Skeleton width={120} height={13} radius="sm" className="sk-inner mx-auto" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current activity highlight */}
            <SkeletonCard className="p-6 md:p-8 flex flex-col items-center text-center">
              <Skeleton width={60} height={60} radius="xl" className="sk-inner mb-4" />
              <Skeleton width={200} height={18} radius="sm" className="sk-inner mb-1" />
              <Skeleton width={90} height={14} radius="sm" className="sk-inner mb-3" />
              <Skeleton width={150} height={24} radius="full" className="sk-inner" />
            </SkeletonCard>

            {/* Timeline */}
            <div>
              <Skeleton width={170} height={14} radius="sm" className="sk-inner mb-6" />
              <div className="space-y-3">
                {Array.from({ length: 5 }, (_, i) => (
                  <div key={i} className="relative flex items-start gap-4">
                    <div className="mt-4">
                      <Skeleton width={18} height={18} radius="full" className="sk-inner" />
                    </div>
                    <div className="flex-1">
                      <RoutineRowCard />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Progress summary */}
            <SkeletonCard className="p-6">
              <Skeleton width={140} height={14} radius="sm" className="sk-inner mb-4" />
              <Skeleton width="100%" height={20} radius="full" className="sk-inner mb-4" />
              <div className="flex items-center justify-between mb-2">
                <Skeleton width={150} height={14} radius="sm" className="sk-inner" />
                <Skeleton width={44} height={14} radius="sm" className="sk-inner" />
              </div>
            </SkeletonCard>

            {/* Quick actions */}
            <SkeletonCard className="p-6">
              <Skeleton width={150} height={14} radius="sm" className="sk-inner mb-4" />
              <div className="space-y-3">
                <SkeletonButton width="100%" height={48} size="lg" radius="xl" />
                <SkeletonButton width="100%" height={48} size="lg" radius="xl" />
                <SkeletonButton width="100%" height={48} size="lg" radius="xl" />
              </div>
            </SkeletonCard>

            {/* Tomorrow preview */}
            <SkeletonCard className="p-6">
              <Skeleton width={170} height={14} radius="sm" className="sk-inner mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-teal-50/50 border border-teal-100">
                    <Skeleton width={28} height={28} radius="sm" className="sk-inner" />
                    <div className="flex-1 min-w-0">
                      <Skeleton width="70%" height={13} radius="sm" className="sk-inner mb-1" />
                      <Skeleton width="35%" height={11} radius="sm" className="sk-inner" />
                    </div>
                  </div>
                ))}
              </div>
              <SkeletonButton width="100%" height={44} size="md" radius="xl" className="mt-4" />
            </SkeletonCard>
          </div>
        </div>
      </div>
    </div>
  );
}