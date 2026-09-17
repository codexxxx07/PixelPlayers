import Skeleton from "./Skeleton";

const LINE_HEIGHTS = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 26,
};

const GAPS = {
  xs: 6,
  sm: 8,
  md: 10,
  lg: 12,
  xl: 16,
};

/**
 * Text-shaped placeholder lines. Mirrors real copy hierarchy: multiple
 * lines, with the final line optionally shortened for a natural text look.
 */
export default function SkeletonText({
  lines = 3,
  widths,
  size = "md",
  gap,
  className = "",
  lastLineShort = true,
}) {
  const height = LINE_HEIGHTS[size] ?? LINE_HEIGHTS.md;
  const resolved = Array.isArray(widths)
    ? widths
    : Array.from({ length: lines }, (_, i) =>
        lastLineShort && i === lines - 1 ? "72%" : "100%"
      );

  return (
    <span
      aria-hidden="true"
      className={`flex flex-col ${className}`}
      style={{ gap: gap ?? GAPS[size] ?? GAPS.md }}
    >
      {Array.from({ length: lines }, (_, i) => (
        <Skeleton
          key={i}
          className="sk-inner"
          width={resolved[i] ?? "100%"}
          height={height}
          radius="sm"
          block={false}
        />
      ))}
    </span>
  );
}