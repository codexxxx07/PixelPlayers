import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonButton from './SkeletonButton';
import SkeletonPageHeader from './SkeletonPageHeader';

function SectionHeading() {
  return (
    <div className="text-center mb-14">
      <div className="flex justify-center mb-3">
        <Skeleton width={140} height={12} radius="sm" className="sk-inner" />
      </div>
      <Skeleton width={260} height={22} radius="sm" className="sk-inner mx-auto" />
    </div>
  );
}

function ApproachCard() {
  return (
    <SkeletonCard className="p-8">
      <Skeleton width={48} height={48} radius="xl" className="sk-inner mb-5" />
      <Skeleton width="70%" height={16} radius="sm" className="sk-inner mb-3" />
      <SkeletonText lines={3} size="sm" />
    </SkeletonCard>
  );
}

export default function SkeletonAbout() {
  return (
    <div className="min-h-screen" aria-busy="true">
      <SkeletonPageHeader />

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Skeleton width={140} height={12} radius="sm" className="sk-inner mb-3" />
            <Skeleton width={240} height={22} radius="sm" className="sk-inner mb-6" />
            <SkeletonText lines={2} size="lg" className="mb-6" />
            <SkeletonText lines={2} size="md" className="mb-6" />
            <Skeleton width={120} height={12} radius="sm" className="sk-inner" />
          </div>
          <Skeleton width="100%" height={192} radius="2xl" className="sk" />
        </div>
      </section>

      {/* Problem statement / stats */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading />
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {Array.from({ length: 3 }, (_, i) => (
              <SkeletonCard key={i} className="p-8 flex flex-col items-center justify-center text-center">
                <Skeleton width={120} height={32} radius="sm" className="sk-inner mb-4" />
                <SkeletonText lines={2} size="sm" widths={['80%', '60%']} />
              </SkeletonCard>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            <ApproachCard />
            <ApproachCard />
            <ApproachCard />
          </div>
        </div>
      </section>

      {/* Technology */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading />
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 4 }, (_, i) => (
                <SkeletonCard key={i} className="p-5 text-center">
                  <Skeleton width="70%" height={14} radius="sm" className="sk-inner mx-auto mb-2" />
                  <Skeleton width="90%" height={12} radius="sm" className="sk-inner mx-auto" />
                </SkeletonCard>
              ))}
            </div>
            <SkeletonCard className="p-6 md:p-8">
              <Skeleton width={160} height={12} radius="sm" className="sk-inner mb-6" />
              <div className="space-y-3">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton width={12} height={12} radius="xs" className="sk-inner" />
                    <Skeleton width="60%" height={14} radius="sm" className="sk-inner" />
                  </div>
                ))}
              </div>
            </SkeletonCard>
          </div>
        </div>
      </section>

      {/* Focus / languages */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading />
          <SkeletonCard className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Skeleton width={200} height={14} radius="sm" className="sk-inner mb-4" />
                <div className="space-y-3 mb-6">
                  {Array.from({ length: 3 }, (_, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <Skeleton width={40} height={40} radius="lg" className="sk-inner" />
                      <Skeleton width="55%" height={14} radius="sm" className="sk-inner" />
                    </div>
                  ))}
                </div>
                <SkeletonText lines={2} size="sm" />
              </div>
              <div className="flex flex-col items-center text-center">
                <Skeleton width={48} height={48} radius="xl" className="sk-inner mb-4" />
                <Skeleton width={160} height={12} radius="sm" className="sk-inner mb-2" />
                <SkeletonText lines={2} size="sm" widths={['90%', '70%']} />
              </div>
            </div>
          </SkeletonCard>
          <div className="text-center mt-12">
            <SkeletonButton width={220} height={48} size="lg" radius="xl" />
          </div>
        </div>
      </section>
    </div>
  );
}