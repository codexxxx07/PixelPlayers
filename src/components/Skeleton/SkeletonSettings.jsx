import Skeleton from './Skeleton';
import SkeletonCard from './SkeletonCard';
import SkeletonButton from './SkeletonButton';

function ToggleRow() {
  return (
    <SkeletonCard className="p-5 flex items-center justify-between gap-4">
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton width="55%" height={16} radius="sm" className="sk-inner" />
        <Skeleton width="80%" height={12} radius="sm" className="sk-inner" />
      </div>
      <Skeleton width={80} height={48} radius="full" className="sk-inner" />
    </SkeletonCard>
  );
}

function SectionHeading() {
  return (
    <div className="mb-5">
      <Skeleton width={150} height={14} radius="sm" className="sk-inner mb-1" />
      <Skeleton width="45%" height={12} radius="sm" className="sk-inner" />
    </div>
  );
}

function LanguageTile() {
  return (
    <div className="flex items-center gap-4 rounded-2xl border-[3px] border-warm-200 bg-white px-5 py-6">
      <Skeleton width={36} height={36} radius="md" className="sk-inner" />
      <div className="min-w-0 space-y-2">
        <Skeleton width={90} height={15} radius="sm" className="sk-inner" />
        <Skeleton width={60} height={12} radius="sm" className="sk-inner" />
      </div>
    </div>
  );
}

export default function SkeletonSettings() {
  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50/60 via-warm-50 to-white pb-20" aria-busy="true">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        {/* Page header */}
        <div className="text-center mb-10">
          <Skeleton width={240} height={28} radius="sm" className="sk-inner mx-auto mb-3" />
          <Skeleton width={200} height={14} radius="sm" className="sk-inner mx-auto" />
        </div>

        {/* Language */}
        <section className="mb-12">
          <SectionHeading />
          <div className="grid sm:grid-cols-3 gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <LanguageTile key={i} />
            ))}
          </div>
        </section>

        {/* Accessibility */}
        <section className="mb-12">
          <SectionHeading />
          <SkeletonCard className="p-6 md:p-7 mb-5">
            <Skeleton width={120} height={12} radius="sm" className="sk-inner mb-4" />
            <div className="grid grid-cols-3 gap-3">
              {Array.from({ length: 3 }, (_, i) => (
                <Skeleton key={i} width="100%" height={52} radius="lg" className="sk-inner" />
              ))}
            </div>
          </SkeletonCard>
          <SkeletonCard className="p-6 md:p-7 mb-5">
            <Skeleton width={100} height={12} radius="sm" className="sk-inner mb-4" />
            <div className="space-y-4">
              <ToggleRow />
              <ToggleRow />
              <ToggleRow />
            </div>
          </SkeletonCard>
          <SkeletonCard className="p-6 md:p-7">
            <Skeleton width={100} height={12} radius="sm" className="sk-inner mb-4" />
            <div className="space-y-4">
              <ToggleRow />
              <ToggleRow />
              <ToggleRow />
            </div>
          </SkeletonCard>
        </section>

        {/* Notifications */}
        <section className="mb-12">
          <SectionHeading />
          <div className="space-y-4">
            <ToggleRow />
            <ToggleRow />
            <ToggleRow />
          </div>
        </section>

        {/* Privacy */}
        <section className="mb-12">
          <SectionHeading />
          <div className="grid sm:grid-cols-2 gap-4 mb-6 items-stretch">
            {Array.from({ length: 4 }, (_, i) => (
              <SkeletonCard key={i} className="p-5 flex items-start gap-4">
                <Skeleton width={32} height={32} radius="md" className="sk-inner" />
                <div className="min-w-0 flex-1 space-y-2">
                  <Skeleton width="70%" height={14} radius="sm" className="sk-inner" />
                  <Skeleton width="90%" height={12} radius="sm" className="sk-inner" />
                </div>
              </SkeletonCard>
            ))}
          </div>
          <SkeletonButton width="100%" height={48} size="lg" radius="xl" className="mb-4" />
          <div className="flex flex-col sm:flex-row gap-4">
            <SkeletonButton width="100%" height={48} size="lg" radius="xl" className="flex-1" />
            <SkeletonButton width="100%" height={48} size="lg" radius="xl" className="flex-1" />
          </div>
        </section>

        {/* Account */}
        <section className="mb-12">
          <SectionHeading />
          <SkeletonCard className="p-6 flex items-center gap-4 mb-5">
            <Skeleton width={80} height={80} radius="full" className="sk-inner" />
            <div className="space-y-2">
              <Skeleton width={160} height={14} radius="sm" className="sk-inner" />
              <Skeleton width={100} height={13} radius="sm" className="sk-inner" />
            </div>
          </SkeletonCard>
          <div className="grid sm:grid-cols-3 gap-4">
            <SkeletonButton width="100%" height={48} size="lg" radius="xl" />
            <SkeletonButton width="100%" height={48} size="lg" radius="xl" />
            <SkeletonButton width="100%" height={48} size="lg" radius="xl" />
          </div>
        </section>
      </div>
    </div>
  );
}