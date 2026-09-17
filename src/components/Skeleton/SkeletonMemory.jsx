import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonButton from './SkeletonButton';

function MemoryRowCard() {
  return (
    <SkeletonCard className="p-5">
      <div className="flex items-start gap-3">
        <Skeleton width={40} height={40} radius="xl" className="sk-inner" />
        <div className="min-w-0 flex-1">
          <Skeleton width="70%" height={16} radius="sm" className="sk-inner mb-1" />
          <Skeleton width="40%" height={12} radius="sm" className="sk-inner mb-3" />
          <SkeletonText lines={2} size="sm" widths={['100%', '82%']} />
        </div>
      </div>
    </SkeletonCard>
  );
}

function ChatBubble({ align }) {
  return (
    <div className={`flex ${align === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${align === 'user' ? 'bg-teal-500/90 rounded-br-sm' : 'bg-amber-200 rounded-bl-sm'}`}>
        <div className="px-4 py-3">
          <div className="flex items-center gap-2">
            <Skeleton width={14} height={14} radius="sm" className="sk-inner" />
            <Skeleton
              width={align === 'user' ? 150 : 180}
              height={12}
              radius="sm"
              className="sk-inner"
            />
          </div>
          <Skeleton width={140} height={12} radius="sm" className="sk-inner mt-2" />
        </div>
      </div>
    </div>
  );
}

export default function SkeletonMemory() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50/50 to-white pb-20" aria-busy="true">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 pt-8 md:pt-12 box-border">
        {/* Page header */}
        <div className="text-center mb-8">
          <Skeleton width={320} height={32} radius="sm" className="sk-inner mx-auto mb-3" />
          <Skeleton width="55%" height={16} radius="sm" className="sk-inner mx-auto max-w-xl" />
          <Skeleton width="40%" height={13} radius="sm" className="sk-inner mx-auto mt-2 max-w-lg" />
        </div>

        {/* Category tabs */}
        <div className="mb-8 overflow-x-auto" style={{ marginLeft: '-1rem', marginRight: '-1rem', paddingLeft: '1rem', paddingRight: '1rem' }}>
          <div className="flex gap-2 min-w-max pb-2">
            {Array.from({ length: 9 }, (_, i) => (
              <Skeleton
                key={i}
                width={i % 2 === 0 ? 128 : 112}
                height={48}
                radius="lg"
                className="sk-inner flex-shrink-0"
              />
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Left column */}
          <div className="lg:col-span-3 space-y-6 lg:space-y-8 min-w-0">
            <div>
              <Skeleton width={180} height={14} radius="sm" className="sk-inner mb-4" />
              <div className="space-y-4">
                <MemoryRowCard />
                <MemoryRowCard />
                <MemoryRowCard />
              </div>
            </div>

            {/* Add memory form */}
            <SkeletonCard className="p-4 sm:p-6 md:p-8">
              <Skeleton width={200} height={14} radius="sm" className="sk-inner mb-2" />
              <Skeleton width="60%" height={13} radius="sm" className="sk-inner mb-4 max-w-sm" />
              <Skeleton width="100%" height={48} radius="lg" className="sk-inner mb-3" />
              <Skeleton width="100%" height={88} radius="lg" className="sk-inner" />
              <div className="flex flex-wrap items-center gap-3 mt-4">
                <Skeleton width={56} height={56} radius="full" className="sk-inner flex-shrink-0" />
                <SkeletonButton width="100%" height={48} size="lg" radius="lg" className="flex-1 min-w-0" />
              </div>
            </SkeletonCard>
          </div>

          {/* Right column — voice panel */}
          <div className="lg:col-span-2 min-w-0">
            <SkeletonCard className="p-4 sm:p-6 md:p-8">
              <Skeleton width={200} height={14} radius="sm" className="sk-inner mb-4" />
              <div className="space-y-4 mb-6">
                <ChatBubble align="ai" />
                <ChatBubble align="ai" />
                <ChatBubble align="user" />
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Skeleton width={40} height={40} radius="full" className="sk-inner flex-shrink-0" />
                <Skeleton width="100%" height={48} radius="lg" className="sk-inner flex-1 min-w-0" />
              </div>
            </SkeletonCard>
          </div>
        </div>

        {/* Privacy notice */}
        <div className="mt-12 text-center">
          <SkeletonCard className="px-4 sm:px-8 py-6 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Skeleton width={20} height={20} radius="sm" className="sk-inner" />
              <Skeleton width={160} height={12} radius="sm" className="sk-inner" />
            </div>
            <SkeletonText lines={2} size="sm" widths={['100%', '74%']} className="mx-auto max-w-sm" />
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
}