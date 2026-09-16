import Skeleton from './Skeleton';

const PIXEL_COLORS = [
  'bg-teal-400',
  'bg-teal-500',
  'bg-teal-600',
  'bg-teal-700',
  'bg-amber-400',
  'bg-amber-500',
];

const COLUMN_LINKS = [4, 4, 4, 4, 4];

export default function SkeletonFooter() {
  return (
    <footer aria-hidden="true" className="bg-teal-900">
      <div className="flex h-3 w-full">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={`flex-1 ${PIXEL_COLORS[i % PIXEL_COLORS.length]}`} />
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {COLUMN_LINKS.map((linkCount, col) => (
            <div key={col} className="space-y-4">
              <Skeleton width={col === 0 ? 120 : 88} height={12} rounding="md" dark />
              <div className="space-y-3">
                {Array.from({ length: linkCount }).map((_, row) => (
                  <Skeleton
                    key={row}
                    width={72 - (row % 3) * 10}
                    height={10}
                    rounding="md"
                    dark
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t border-white/10 pt-6">
          <Skeleton width={220} height={10} rounding="md" dark className="mx-auto" />
        </div>
      </div>
    </footer>
  );
}