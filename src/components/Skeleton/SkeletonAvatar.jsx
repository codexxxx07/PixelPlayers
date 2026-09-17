import Skeleton from "./Skeleton";

const SIZES = {
  xs: 32,
  sm: 40,
  md: 48,
  lg: 64,
  xl: 80,
  "2xl": 112,
};

/**
 * Avatar-shaped placeholder. Matches real avatar boxes: UserButton, game
 * icons, memory prompts and the Clara avatar frame.
 */
export default function SkeletonAvatar({
  size = "md",
  shape = "rounded",
  className = "",
  style,
}) {
  const px = SIZES[size] ?? SIZES.md;
  return (
    <Skeleton
      width={px}
      height={px}
      radius={shape === "circle" ? "full" : "xl"}
      block={false}
      className={`sk-inner ${className}`}
      style={{ flexShrink: 0, ...style }}
    />
  );
}