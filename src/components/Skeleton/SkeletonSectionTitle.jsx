import Skeleton from "./Skeleton";

/**
 * Mirrors the recurring section headings (icon + pixel title) used across
 * pages, e.g. Progress.jsx's SectionTitle row.
 */
export default function SkeletonSectionTitle({
  iconSize = 36,
  titleWidth = 200,
  titleHeight = 16,
  className = "",
  style,
}) {
  return (
    <span
      aria-hidden="true"
      className={`flex items-center gap-2.5 ${className}`}
      style={style}
    >
      <Skeleton
        width={iconSize}
        height={iconSize}
        radius="md"
        block={false}
        className="sk-inner"
      />
      <Skeleton
        width={titleWidth}
        height={titleHeight}
        radius="sm"
        block={false}
        className="sk-inner"
      />
    </span>
  );
}