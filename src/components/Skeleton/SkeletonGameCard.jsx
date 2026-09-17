import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonBadge from './SkeletonBadge';

export default function SkeletonGameCard() {
  return (
    <SkeletonCard className="p-6 flex flex-col h-full">
      {/* Visual + title area */}
      <div className="flex items-start gap-4 mb-4">
        <Skeleton width={56} height={56} radius="xl" className="sk-inner" />
        <div className="min-w-0 flex-1">
          <Skeleton width="85%" height={16} radius="sm" className="sk-inner mb-2" />
          <SkeletonBadge width={96} height={24} />
        </div>
      </div>

      {/* Description */}
      <SkeletonText lines={3} size="sm" widths={['100%', '100%', '68%']} className="mb-3 flex-1" />

      {/* Skill target */}
      <Skeleton width="60%" height={14} radius="sm" className="sk-inner mb-4" />

      {/* Bottom — metadata + CTA */}
      <div className="pt-3 border-t border-teal-100">
        <SkeletonBadge width={150} height={26} className="mb-3" />
        <div className="flex items-center justify-between gap-2 pt-3">
          <Skeleton width={90} height={22} radius="full" className="sk-inner" />
          <Skeleton width={70} height={12} radius="sm" className="sk-inner" />
        </div>
      </div>
    </SkeletonCard>
  );
}