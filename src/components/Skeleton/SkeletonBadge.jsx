import Skeleton from "./Skeleton";

/**
 * Pill/badge-shaped placeholder — category chips, difficulty tags, status
 * dots seen across game cards, memory cards and routine rows.
 */
export default function SkeletonBadge({
  width = 80,
  height = 26,
  radius = "full",
  className = "",
  style,
}) {
  return (
    <Skeleton
      width={width}
      height={height}
      radius={radius}
      block={false}
      className={`sk-inner ${className}`}
      style={style}
    />
  );
}