import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonButton from './SkeletonButton';
import SkeletonPageHeader from './SkeletonPageHeader';

function FeatureCard() {
  return (
    <SkeletonCard className="p-8 flex flex-col h-full">
      <Skeleton width={52} height={52} radius="xl" className="sk-inner mb-5" />
      <Skeleton width="70%" height={14} radius="sm" className="sk-inner mb-3" />
      <SkeletonText lines={3} size="sm" widths={['100%', '100%', '76%']} className="flex-1" />
      <Skeleton width={90} height={12} radius="sm" className="sk-inner mt-6" />
    </SkeletonCard>
  );
}

function ComparisonCard() {
  return (
    <SkeletonCard className="p-5 space-y-4">
      <Skeleton width="50%" height={12} radius="sm" className="sk-inner" />
      <div className="space-y-2 pl-1">
        <Skeleton width="100%" height={14} radius="sm" className="sk-inner" />
        <Skeleton width="90%" height={14} radius="sm" className="sk-inner" />
        <Skeleton width="95%" height={14} radius="sm" className="sk-inner" />
      </div>
      <div className="space-y-2 pl-1">
        <Skeleton width="100%" height={14} radius="sm" className="sk-inner" />
        <Skeleton width="92%" height={14} radius="sm" className="sk-inner" />
        <Skeleton width="85%" height={14} radius="sm" className="sk-inner" />
      </div>
    </SkeletonCard>
  );
}

export default function SkeletonFeatures() {
  return (
    <div className="min-h-screen" aria-busy="true">
      <SkeletonPageHeader />

      {/* Features grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {Array.from({ length: 6 }, (_, i) => (
              <FeatureCard key={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Comparison section */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="flex justify-center mb-3">
              <Skeleton width={140} height={12} radius="sm" className="sk-inner" />
            </div>
            <Skeleton width={280} height={22} radius="sm" className="sk-inner mx-auto" />
          </div>

          <div className="hidden md:block">
            <SkeletonCard className="overflow-hidden">
              <div className="grid grid-cols-3 gap-0 p-5 border-b-2 border-warm-200">
                <Skeleton width="70%" height={14} radius="sm" className="sk-inner" />
                <Skeleton width="70%" height={14} radius="sm" className="sk-inner mx-auto" />
                <Skeleton width="70%" height={14} radius="sm" className="sk-inner mx-auto" />
              </div>
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className="grid grid-cols-3 gap-0 p-5 border-b border-warm-100">
                  <Skeleton width={120} height={14} radius="sm" className="sk-inner" />
                  <Skeleton width="80%" height={14} radius="sm" className="sk-inner mx-auto" />
                  <Skeleton width="80%" height={14} radius="sm" className="sk-inner mx-auto" />
                </div>
              ))}
            </SkeletonCard>
          </div>

          <div className="md:hidden space-y-4">
            <ComparisonCard />
            <ComparisonCard />
            <ComparisonCard />
          </div>

          <div className="text-center mt-12">
            <SkeletonButton width={200} height={48} size="lg" radius="xl" />
          </div>
        </div>
      </section>
    </div>
  );
}