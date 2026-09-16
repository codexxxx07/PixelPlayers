import Skeleton from './Skeleton';

const SIZES = { sm: 38, md: 46, lg: 54 };

export default function SkeletonButton({
  size = 'md',
  width = 120,
  dark = false,
  block = false,
  className = '',
}) {
  return (
    <Skeleton
      width={block ? undefined : width}
      height={SIZES[size] || SIZES.md}
      rounding="xl"
      dark={dark}
      className={`flex-shrink-0 ${block ? 'w-full' : ''} ${className}`}
    />
  );
}