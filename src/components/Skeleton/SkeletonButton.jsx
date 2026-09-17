import Skeleton from "./Skeleton";

const SIZES = {
  sm: 40,
  md: 44,
  lg: 48,
  xl: 56,
};

/**
 * Button-shaped placeholder. Heights follow the real skeuo-btn / nav-btn
 * system (nav buttons 2.75rem ≈ 44px, hero CTAs are taller).
 */
export default function SkeletonButton({
  width = "100%",
  height,
  size = "md",
  radius = "lg",
  className = "",
  style,
}) {
  return (
    <Skeleton
      width={width}
      height={height ?? SIZES[size] ?? SIZES.md}
      radius={radius}
      block={false}
      className={`sk-inner ${className}`}
      style={{ flexShrink: 0, ...style }}
    />
  );
}