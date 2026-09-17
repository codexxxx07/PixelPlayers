import Skeleton from './Skeleton';
import SkeletonCard from './SkeletonCard';

export default function SkeletonAuth() {
  return (
    <div
      className="relative min-h-screen bg-gradient-to-b from-teal-50/70 via-warm-50 to-white py-10 md:py-16 overflow-hidden auth-shell"
      aria-busy="true"
    >
      <div className="absolute inset-0 pixel-grid" aria-hidden="true" />

      <div className="relative mx-auto max-w-xl px-4 sm:px-6">
        <div className="animate-slide-up py-6 sm:py-10">
          {/* Heading */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Skeleton width={56} height={56} radius="2xl" className="sk-inner" />
            </div>
            <div className="flex justify-center mb-2">
              <Skeleton width={120} height={12} radius="sm" className="sk-inner" />
            </div>
            <Skeleton width={200} height={22} radius="sm" className="sk-inner mx-auto" />
            <Skeleton width={140} height={14} radius="sm" className="sk-inner mx-auto mt-2" />
          </div>

          {/* Card */}
          <SkeletonCard className="mx-auto w-full max-w-md p-6 sm:p-8 space-y-4">
            <Skeleton width="100%" height={52} radius="lg" className="sk-inner" />
            <Skeleton width="100%" height={52} radius="lg" className="sk-inner" />
            <Skeleton width="100%" height={48} radius="xl" className="sk-inner" />
            <div className="flex items-center gap-3 py-2">
              <Skeleton width="100%" height={2} radius="none" className="sk-inner flex-1" />
              <Skeleton width={40} height={12} radius="sm" className="sk-inner" />
              <Skeleton width="100%" height={2} radius="none" className="sk-inner flex-1" />
            </div>
            <Skeleton width="100%" height={44} radius="xl" className="sk-inner" />
          </SkeletonCard>
        </div>

        <div className="mt-8 flex justify-center">
          <Skeleton width={180} height={14} radius="sm" className="sk-inner" />
        </div>
      </div>
    </div>
  );
}