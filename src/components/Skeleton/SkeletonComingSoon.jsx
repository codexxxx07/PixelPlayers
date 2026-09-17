import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonButton from './SkeletonButton';
import SkeletonBadge from './SkeletonBadge';

export default function SkeletonComingSoon() {
  return (
    <div className="page-enter min-h-screen pb-16" aria-busy="true">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 md:py-12">
        <header className="text-center">
          <div className="flex justify-center mb-4">
            <Skeleton width={64} height={64} radius="2xl" className="sk-inner" />
          </div>
          <Skeleton width={240} height={22} radius="sm" className="sk-inner mx-auto" />
          <SkeletonText
            lines={2}
            size="md"
            widths={['90%', '70%']}
            className="mx-auto mt-3 max-w-md"
          />
        </header>

        <section className="mt-8">
          <SkeletonCard className="p-6 md:p-8 flex flex-col items-center text-center">
            <Skeleton width={48} height={48} radius="xl" className="sk-inner mb-4" />
            <Skeleton width={180} height={16} radius="sm" className="sk-inner mb-3" />
            <SkeletonText
              lines={2}
              size="sm"
              widths={['85%', '65%']}
              className="mx-auto max-w-sm"
            />
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <SkeletonBadge width={140} height={26} />
              <SkeletonBadge width={110} height={26} />
            </div>
          </SkeletonCard>
        </section>

        <div className="text-center mt-8">
          <SkeletonButton width={200} height={48} size="lg" radius="xl" />
        </div>
      </div>
    </div>
  );
}