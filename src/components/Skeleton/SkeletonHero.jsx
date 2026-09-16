import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonButton from './SkeletonButton';

export default function SkeletonHero({ variant = 'home' }) {
  return (
    <section
      aria-hidden="true"
      className="relative overflow-hidden bg-gradient-to-b from-warm-50 to-teal-50/30 px-6 py-20 md:py-28"
    >
      <div className="absolute inset-0 pixel-grid pointer-events-none opacity-30" />
      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mb-6 flex justify-center">
          <Skeleton width={variant === 'home' ? 180 : 140} height={20} rounding="full" />
        </div>
        <SkeletonText
          size="xl"
          lines={2}
          widths={variant === 'home' ? ['58%', '42%'] : ['50%', '38%']}
          className="mx-auto max-w-2xl"
        />
        <SkeletonText
          size={variant === 'home' ? 'lg' : 'md'}
          lines={variant === 'home' ? 2 : 1}
          widths={variant === 'home' ? ['72%', '54%'] : ['68%']}
          className="mx-auto mt-6 max-w-xl"
        />
        {variant === 'home' && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <SkeletonButton size="lg" width={172} />
            <SkeletonButton size="lg" width={172} />
          </div>
        )}
      </div>
    </section>
  );
}