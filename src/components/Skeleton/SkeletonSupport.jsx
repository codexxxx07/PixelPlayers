import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonButton from './SkeletonButton';

function PersonCard() {
  return (
    <SkeletonCard className="p-6 flex flex-col">
      <div className="flex items-start gap-4 mb-5">
        <Skeleton width={80} height={80} radius="full" className="sk-inner" />
        <div className="min-w-0 flex-1 pt-1 space-y-2">
          <Skeleton width="60%" height={14} radius="sm" className="sk-inner" />
          <Skeleton width="45%" height={12} radius="sm" className="sk-inner" />
        </div>
      </div>
      <div className="space-y-3 mb-5">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl bg-warm-100 px-4 py-3">
            <Skeleton width={20} height={20} radius="sm" className="sk-inner" />
            <Skeleton width={i === 2 ? '60%' : '75%'} height={13} radius="sm" className="sk-inner" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 mt-auto">
        <SkeletonButton width="100%" height={44} size="md" radius="xl" />
        <SkeletonButton width="100%" height={44} size="md" radius="xl" />
        <SkeletonButton width="100%" height={44} size="md" radius="xl" />
      </div>
    </SkeletonCard>
  );
}

function ToggleRow() {
  return (
    <SkeletonCard className="p-5 flex items-center justify-between gap-4">
      <Skeleton width="60%" height={16} radius="sm" className="sk-inner" />
      <Skeleton width={80} height={48} radius="full" className="sk-inner" />
    </SkeletonCard>
  );
}

export default function SkeletonSupport() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/60 via-warm-50 to-white pb-20" aria-busy="true">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        {/* Page header */}
        <div className="text-center mb-10">
          <Skeleton width={260} height={28} radius="sm" className="sk-inner mx-auto mb-3" />
          <Skeleton width="55%" height={15} radius="sm" className="sk-inner mx-auto max-w-xl" />
          <Skeleton width="40%" height={13} radius="sm" className="sk-inner mx-auto mt-2 max-w-lg" />
        </div>

        {/* Network */}
        <section className="mb-12">
          <div className="flex items-center justify-between gap-4 mb-5">
            <Skeleton width={180} height={14} radius="sm" className="sk-inner" />
            <SkeletonButton width={160} height={48} size="lg" radius="xl" />
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <PersonCard />
            <PersonCard />
          </div>
        </section>

        {/* Privacy settings */}
        <section className="mb-12">
          <Skeleton width={160} height={14} radius="sm" className="sk-inner mb-2" />
          <Skeleton width="50%" height={12} radius="sm" className="sk-inner mb-5" />
          <div className="grid md:grid-cols-2 gap-4">
            <ToggleRow />
            <ToggleRow />
            <ToggleRow />
            <ToggleRow />
          </div>
        </section>

        {/* Emergency SOS */}
        <section className="mb-12">
          <Skeleton width={160} height={14} radius="sm" className="sk-inner mb-2" />
          <Skeleton width="45%" height={12} radius="sm" className="sk-inner mb-5" />
          <SkeletonCard className="p-8 flex flex-col items-center text-center">
            <Skeleton width="40%" height={16} radius="sm" className="sk-inner mb-6" />
            <Skeleton width={224} height={224} radius="full" className="sk-inner mb-6" />
            <Skeleton width={200} height={14} radius="sm" className="sk-inner" />
          </SkeletonCard>
        </section>

        {/* How it works */}
        <section>
          <Skeleton width={160} height={14} radius="sm" className="sk-inner mb-5" />
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {Array.from({ length: 3 }, (_, i) => (
              <SkeletonCard key={i} className="p-8 flex flex-col items-center text-center">
                <Skeleton width={40} height={40} radius="xl" className="sk-inner mb-3" />
                <SkeletonText lines={2} size="sm" widths={['90%', '70%']} />
              </SkeletonCard>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}