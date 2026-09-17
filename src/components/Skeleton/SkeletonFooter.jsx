import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';

export default function SkeletonFooter() {
  return (
    <footer className="relative bg-[var(--pp-footer-bg)] text-white" aria-hidden="true">
      {/* Pixel art decorative border — same strip as the real footer */}
      <div className="w-full h-3 flex">
        <div className="flex-1 bg-teal-400" />
        <div className="flex-1 bg-teal-500" />
        <div className="flex-1 bg-teal-600" />
        <div className="flex-1 bg-teal-700" />
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-amber-500" />
        <div className="flex-1 bg-teal-400" />
        <div className="flex-1 bg-teal-300" />
        <div className="flex-1 bg-teal-500" />
        <div className="flex-1 bg-teal-600" />
        <div className="flex-1 bg-teal-400" />
        <div className="flex-1 bg-teal-700" />
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-teal-500" />
        <div className="flex-1 bg-teal-300" />
        <div className="flex-1 bg-teal-600" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Branding column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Skeleton width={36} height={36} radius="lg" className="sk-inner" />
              <Skeleton width={160} height={20} radius="sm" className="sk-inner" />
            </div>
            <SkeletonWidth width="60%" size="lg" className="mb-6" />
            <div className="space-y-3">
              <Skeleton width="100%" height={14} radius="sm" className="sk-inner max-w-sm" />
              <Skeleton width="85%" height={14} radius="sm" className="sk-inner max-w-sm" />
            </div>
          </div>

          {/* Link columns */}
          {[0, 1, 2].map((col) => (
            <div key={col}>
              <Skeleton width={92} height={14} radius="sm" className="sk-inner mb-4" />
              <ul className="space-y-3">
                {[0, 1, 2, 3].map((i) => (
                  <li key={i}>
                    <Skeleton
                      width={i === 3 ? '65%' : '80%'}
                      height={16}
                      radius="sm"
                      className="sk-inner"
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-teal-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Skeleton width={180} height={14} radius="sm" className="sk-inner" />
          <div className="flex items-center gap-6">
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} width={i === 2 ? 150 : 84} height={14} radius="sm" className="sk-inner" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function SkeletonWidth({ width, size, className }) {
  return <SkeletonText lines={1} widths={[width]} size={size} className={className} />;
}