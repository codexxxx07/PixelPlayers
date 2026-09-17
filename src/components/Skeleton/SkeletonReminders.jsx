import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonButton from './SkeletonButton';

function ReminderRow() {
  return (
    <SkeletonCard className="p-5">
      <div className="flex items-center gap-4">
        <Skeleton width={48} height={48} radius="xl" className="sk-inner flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <Skeleton width="65%" height={15} radius="sm" className="sk-inner mb-1" />
          <Skeleton width="35%" height={13} radius="sm" className="sk-inner" />
        </div>
        <Skeleton width={56} height={32} radius="full" className="sk-inner flex-shrink-0" />
      </div>
    </SkeletonCard>
  );
}

export default function SkeletonReminders() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white pb-20" aria-busy="true">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        {/* Page header */}
        <div className="text-center mb-10">
          <Skeleton width={260} height={28} radius="sm" className="sk-inner mx-auto mb-3" />
          <Skeleton width={220} height={13} radius="sm" className="sk-inner mx-auto" />
        </div>

        {/* Add button */}
        <div className="mb-8">
          <SkeletonButton width="100%" height={48} size="lg" radius="xl" />
        </div>

        {/* Reminder groups */}
        <div>
          {['Morning', 'Afternoon'].map((group) => (
            <div key={group} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Skeleton width={20} height={20} radius="sm" className="sk-inner" />
                <Skeleton width={110} height={14} radius="sm" className="sk-inner" />
              </div>
              <div className="space-y-3">
                <ReminderRow />
                <ReminderRow />
              </div>
            </div>
          ))}
        </div>

        {/* Categories */}
        <div className="mt-8">
          <Skeleton width={150} height={14} radius="sm" className="sk-inner mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-stretch">
            {Array.from({ length: 6 }, (_, i) => (
              <SkeletonCard key={i} className="p-5 flex items-center gap-3">
                <Skeleton width={44} height={44} radius="xl" className="sk-inner flex-shrink-0" />
                <div className="min-w-0 space-y-2">
                  <Skeleton width="80%" height={13} radius="sm" className="sk-inner" />
                  <Skeleton width="50%" height={11} radius="sm" className="sk-inner" />
                </div>
              </SkeletonCard>
            ))}
          </div>
        </div>

        {/* Privacy note */}
        <div className="mt-12 text-center">
          <SkeletonCard className="px-8 py-6 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Skeleton width={20} height={20} radius="sm" className="sk-inner" />
              <Skeleton width={140} height={12} radius="sm" className="sk-inner" />
            </div>
            <SkeletonText lines={2} size="sm" className="mx-auto max-w-sm" />
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
}