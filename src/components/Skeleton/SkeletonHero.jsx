import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';
import SkeletonBadge from './SkeletonBadge';

export default function SkeletonHero() {
  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-warm-50 via-white to-teal-50/40 py-20 md:py-32 px-6"
      aria-hidden="true"
    >
      <div className="absolute inset-0 pixel-grid pointer-events-none opacity-40" />

      <div className="relative max-w-5xl mx-auto text-center">
        {/* Language badge */}
        <SkeletonBadge width={180} height={30} radius="full" />
        <div className="flex justify-center mb-8 mt-8" />

        {/* Title */}
        <div className="mx-auto max-w-2xl mb-8">
          <SkeletonText lines={2} widths={['55%', '95%']} size="xl" gap={8} />
        </div>

        {/* Sub */}
        <div className="mx-auto max-w-3xl mb-12">
          <SkeletonText
            lines={2}
            widths={['100%', '78%']}
            size="lg"
            className="[&>span]:text-center"
          />
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <SkeletonButton width={190} height={56} size="xl" radius="xl" />
          <SkeletonButton width={190} height={56} size="xl" radius="xl" />
        </div>

        {/* Flow pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} width={150} height={42} radius="md" className="sk-inner" />
          ))}
        </div>
      </div>

      {/* Pixel art border at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-3 flex pointer-events-none">
        <div className="flex-1 bg-teal-200" />
        <div className="flex-1 bg-teal-300" />
        <div className="flex-1 bg-teal-400" />
        <div className="flex-1 bg-teal-300" />
        <div className="flex-1 bg-amber-300" />
        <div className="flex-1 bg-teal-400" />
        <div className="flex-1 bg-teal-200" />
        <div className="flex-1 bg-teal-500" />
        <div className="flex-1 bg-teal-300" />
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-teal-300" />
        <div className="flex-1 bg-teal-400" />
        <div className="flex-1 bg-teal-200" />
        <div className="flex-1 bg-teal-500" />
        <div className="flex-1 bg-amber-300" />
        <div className="flex-1 bg-teal-300" />
      </div>
    </section>
  );
}