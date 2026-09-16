import Skeleton from './Skeleton';

const SIZES = {
  xs: 24,
  sm: 32,
  md: 40,
  lg: 56,
  xl: 72,
  xxl: 88,
};

export default function SkeletonAvatar({ size = 'md', rounding = 'full', dark = false, className = '' }) {
  const px = SIZES[size] || SIZES.md;
  return (
    <Skeleton
      width={px}
      height={px}
      rounding={rounding}
      dark={dark}
      className={`flex-shrink-0 ${className}`}
    />
  );
}