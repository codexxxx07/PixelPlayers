import usePrefersReducedData from './usePrefersReducedData';
import { ROUNDING } from './rounding';

export default function Skeleton({
  className = 'inline-block',
  width,
  height,
  rounding = 'md',
  shimmer = true,
  dark = false,
}) {
  const reducedData = usePrefersReducedData();
  const radius = ROUNDING[rounding] || ROUNDING.md;
  const showShimmer = shimmer && !reducedData;
  return (
    <span
      aria-hidden="true"
      className={`sk ${showShimmer ? 'sk-shimmer' : ''} ${dark ? 'sk-on-dark' : ''} ${radius} ${className}`}
      style={width != null || height != null ? { width, height } : undefined}
    />
  );
}