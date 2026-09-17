import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonButton from './SkeletonButton';
import SkeletonHero from './SkeletonHero';

function SectionHeading() {
  return (
    <div className="text-center mb-14">
      <div className="flex justify-center mb-3">
        <Skeleton width={120} height={12} radius="sm" className="sk-inner" />
      </div>
      <Skeleton width={260} height={22} radius="sm" className="sk-inner mx-auto" />
      <Skeleton width="65%" height={14} radius="sm" className="sk-inner mx-auto mt-4 max-w-xl" />
    </div>
  );
}

function FeatureCard() {
  return (
    <SkeletonCard className="p-8 flex flex-col items-center text-center">
      <Skeleton width={52} height={52} radius="xl" className="sk-inner mb-5" />
      <Skeleton width="70%" height={16} radius="sm" className="sk-inner mb-3" />
      <SkeletonText lines={3} size="sm" widths={['100%', '100%', '82%']} className="flex-1" />
      <Skeleton width={90} height={12} radius="sm" className="sk-inner mt-6" />
    </SkeletonCard>
  );
}

function StepCard() {
  return (
    <SkeletonCard className="p-6 flex flex-col items-center text-center">
      <Skeleton width={56} height={56} radius="xl" className="sk-inner mb-4" />
      <Skeleton width={64} height={12} radius="sm" className="sk-inner mb-2" />
      <Skeleton width="80%" height={14} radius="sm" className="sk-inner mb-2" />
      <SkeletonText lines={2} size="sm" widths={['100%', '70%']} />
    </SkeletonCard>
  );
}

export default function SkeletonHome() {
  return (
    <div className="min-h-screen" aria-busy="true">
      <SkeletonHero />

      {/* Quick features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            <FeatureCard />
            <FeatureCard />
            <FeatureCard />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            <StepCard />
            <StepCard />
            <StepCard />
            <StepCard />
          </div>
        </div>
      </section>

      {/* Personalization loop */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <SectionHeading />
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6 max-w-4xl mx-auto">
            {Array.from({ length: 9 }, (_, i) => (
              <Skeleton key={i} width={140} height={44} radius="md" className="sk-inner" />
            ))}
          </div>
          <div className="flex justify-center">
            <Skeleton width={220} height={36} radius="full" className="sk-inner" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <SectionHeading />
          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            <SkeletonCard className="p-8 flex flex-col">
              <Skeleton width={28} height={28} radius="sm" className="sk-inner mb-4" />
              <SkeletonText lines={3} size="md" className="flex-1" />
              <div className="flex items-center gap-2 mt-6">
                <Skeleton width={36} height={36} radius="full" className="sk-inner" />
                <div className="space-y-2">
                  <Skeleton width={110} height={12} radius="sm" className="sk-inner" />
                  <Skeleton width={70} height={12} radius="sm" className="sk-inner" />
                </div>
              </div>
            </SkeletonCard>
            <SkeletonCard className="p-8 flex flex-col">
              <Skeleton width={28} height={28} radius="sm" className="sk-inner mb-4" />
              <SkeletonText lines={3} size="md" className="flex-1" />
              <div className="flex items-center gap-2 mt-6">
                <Skeleton width={36} height={36} radius="full" className="sk-inner" />
                <div className="space-y-2">
                  <Skeleton width={110} height={12} radius="sm" className="sk-inner" />
                  <Skeleton width={70} height={12} radius="sm" className="sk-inner" />
                </div>
              </div>
            </SkeletonCard>
            <SkeletonCard className="p-8 flex flex-col">
              <Skeleton width={28} height={28} radius="sm" className="sk-inner mb-4" />
              <SkeletonText lines={3} size="md" className="flex-1" />
              <div className="flex items-center gap-2 mt-6">
                <Skeleton width={36} height={36} radius="full" className="sk-inner" />
                <div className="space-y-2">
                  <Skeleton width={110} height={12} radius="sm" className="sk-inner" />
                  <Skeleton width={70} height={12} radius="sm" className="sk-inner" />
                </div>
              </div>
            </SkeletonCard>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-3xl mx-auto text-center">
          <Skeleton width={320} height={22} radius="sm" className="sk-inner mx-auto mb-6" />
          <SkeletonText
            lines={2}
            size="lg"
            widths={['100%', '72%']}
            className="mx-auto mb-10 max-w-xl"
          />
          <div className="flex justify-center">
            <SkeletonButton width={220} height={56} size="xl" radius="xl" />
          </div>
        </div>
      </section>
    </div>
  );
}