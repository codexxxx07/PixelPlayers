import Skeleton from './Skeleton';

const SIZES = {
  xs: 10,
  sm: 14,
  md: 18,
  lg: 22,
  xl: 28,
};

const LINE_WIDTHS = ['100%', '88%', '96%', '72%', '84%', '55%'];

export default function SkeletonText({
  size = 'md',
  lines = 1,
  widths,
  lastLineShort = false,
  dark = false,
  className = '',
}) {
  const height = SIZES[size] || SIZES.md;
  const rowWidths =
    widths ||
    Array.from({ length: lines }, (_, i) => {
      if (i === lines - 1 && lastLineShort) return LINE_WIDTHS[5];
      return LINE_WIDTHS[i % (LINE_WIDTHS.length - 1)];
    });
  return (
    <span aria-hidden="true" className={`block ${className}`}>
      {rowWidths.map((rowWidth, i) => (
        <Skeleton
          key={i}
          height={height}
          width={rowWidth}
          rounding="md"
          dark={dark}
          className={i < rowWidths.length - 1 ? 'mb-2' : ''}
        />
      ))}
    </span>
  );
}

export function SkeletonParagraph({ lines = 3, ...props }) {
  return <SkeletonText lines={lines} {...props} />;
}