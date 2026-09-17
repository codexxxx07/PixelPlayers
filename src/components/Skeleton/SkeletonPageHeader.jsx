import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonBadge from './SkeletonBadge';

export default function SkeletonPageHeader({
  badge = true,
  titleLines = 1,
  showBlueStrip = false,
}) {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-warm-50 to-teal-50/30 py-20 md:py-28 px-6"
      aria-hidden="true"
    >
      <div className="absolute inset-0 pixel-grid pointer-events-none opacity-30" />

      {showBlueStrip && (
        <div className="absolute top-0 left-0 right-0 h-2 flex pointer-events-none">
          <div className="flex-1 bg-teal-200" />
          <div className="flex-1 bg-teal-400" />
          <div className="flex-1 bg-amber-300" />
          <div className="flex-1 bg-teal-300" />
        </div>
      )}

      <div className="relative max-w-4xl mx-auto text-center">
        {badge && (
          <div className="flex justify-center mb-8">
            <SkeletonBadge width={160} height={30} radius="full" />
          </div>
        )}

        <div className="mx-auto max-w-xl">
          <SkeletonText lines={1} widths={['100%']} size="lg" />
          {titleLines > 1 && (
            <Skeleton
              width="68%"
              height={20}
              radius="sm"
              className="sk-inner mx-auto mt-2"
            />
          )}
        </div>

        <div className="mx-auto max-w-2xl mt-6">
          <Skeleton
            width="100%"
            height={16}
            radius="sm"
            className="sk-inner mx-auto"
          />
        </div>
      </div>
    </section>
  );
}