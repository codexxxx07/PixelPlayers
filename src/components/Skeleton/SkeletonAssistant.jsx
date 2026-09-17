import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';
import SkeletonCard from './SkeletonCard';
import SkeletonButton from './SkeletonButton';

function AsideCard({ rows = 3 }) {
  return (
    <SkeletonCard className="p-5">
      <Skeleton width={140} height={12} radius="sm" className="sk-inner mb-4" />
      <div className="space-y-3">
        {Array.from({ length: rows }, (_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border-2 border-warm-200 bg-warm-50/60 px-4 py-3.5">
            <Skeleton width={22} height={22} radius="sm" className="sk-inner" />
            <Skeleton width="70%" height={13} radius="sm" className="sk-inner" />
          </div>
        ))}
      </div>
    </SkeletonCard>
  );
}

function ClaraBlock() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton width={64} height={64} radius="full" className="sk-inner" />
      <div className="min-w-0 space-y-2">
        <Skeleton width={90} height={13} radius="sm" className="sk-inner" />
        <Skeleton width={140} height={12} radius="sm" className="sk-inner" />
      </div>
    </div>
  );
}

function Bubble({ wide }) {
  return (
    <div className={`flex ${wide ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`rounded-2xl px-4 py-3 ${wide ? 'bg-teal-500/85 rounded-br-sm' : 'bg-teal-100 rounded-bl-sm'}`}
      >
        <div className="space-y-2">
          <Skeleton width={wide ? 150 : 190} height={12} radius="sm" className="sk-inner" />
          <Skeleton width={wide ? 110 : 150} height={12} radius="sm" className="sk-inner" />
        </div>
      </div>
    </div>
  );
}

export default function SkeletonAssistant() {
  return (
    <div className="page-enter min-h-screen pb-16" aria-busy="true">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-8 md:py-10 space-y-6">
        {/* Mobile clara header */}
        <div className="lg:hidden">
          <SkeletonCard className="p-5">
            <ClaraBlock />
          </SkeletonCard>
        </div>

        <div className="grid lg:grid-cols-[290px_minmax(0,1fr)_310px] gap-6 items-start">
          {/* Left aside */}
          <aside className="hidden lg:block lg:sticky lg:top-24 space-y-5">
            <SkeletonCard className="p-5">
              <ClaraBlock />
              <SkeletonText lines={2} size="md" className="mt-4" />
            </SkeletonCard>
            <AsideCard rows={4} />
            <AsideCard rows={3} />
          </aside>

          {/* Chat panel */}
          <div className="rounded-3xl bg-white border-2 border-teal-100 overflow-hidden flex flex-col">
            <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-teal-50 to-amber-50 border-b border-teal-100">
              <ClaraBlock />
              <div className="flex-shrink-0">
                <Skeleton width={100} height={40} radius="xl" className="sk-inner" />
              </div>
            </div>

            <div className="flex-1 h-[52vh] min-h-[420px] overflow-y-auto p-5 space-y-5">
              <div className="flex justify-center">
                <Skeleton width={160} height={12} radius="sm" className="sk-inner" />
              </div>
              <Bubble />
              <Bubble />
              <Bubble wide />
              <Bubble wide />
              <Bubble />
            </div>

            <form className="p-4 border-t border-teal-100 bg-[var(--pp-surface-2)]">
              <div className="flex items-end gap-3">
                <Skeleton width="100%" height={72} radius="2xl" className="sk-inner flex-1 min-w-0" />
                <Skeleton width={56} height={56} radius="full" className="sk-inner flex-shrink-0" />
                <Skeleton width={96} height={80} radius="2xl" className="sk-inner flex-shrink-0" />
              </div>
            </form>
          </div>

          {/* Right aside */}
          <aside className="hidden lg:block lg:sticky lg:top-24 space-y-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Skeleton width={90} height={12} radius="sm" className="sk-inner" />
                <div className="flex-1 h-0.5 rounded-full bg-teal-100" />
              </div>
              <SkeletonCard className="p-5 flex flex-col">
                <div className="flex items-center gap-3 mb-3">
                  <Skeleton width={44} height={44} radius="xl" className="sk-inner" />
                  <Skeleton width={120} height={12} radius="sm" className="sk-inner" />
                </div>
                <SkeletonText lines={3} size="sm" className="mb-4 flex-1" />
                <SkeletonButton width={150} height={44} size="md" radius="xl" />
              </SkeletonCard>
            </div>

            <SkeletonCard className="p-5">
              <Skeleton width={120} height={12} radius="sm" className="sk-inner mb-4" />
              <div className="space-y-3">
                {Array.from({ length: 3 }, (_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton width={40} height={40} radius="full" className="sk-inner" />
                    <div className="min-w-0 space-y-2">
                      <Skeleton width={110} height={13} radius="sm" className="sk-inner" />
                      <Skeleton width={70} height={12} radius="sm" className="sk-inner" />
                    </div>
                  </div>
                ))}
              </div>
            </SkeletonCard>
          </aside>
        </div>
      </div>
    </div>
  );
}