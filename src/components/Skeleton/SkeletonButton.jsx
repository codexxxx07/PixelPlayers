import Skeleton from "./Skeleton.jsx";

const SIZES = {
  sm: { height: 38 },
  md: { height: 46 },
  lg: { height: 54 },
};

export default function SkeletonButton({
  size = "md",
  width = "8.5rem",
  variant = "primary",
  className = "",
  skipShimmer = false,
}) {
  const sizeClass = SIZES[size] || SIZES.md;
  const variantClass =
    variant === "danger"
      ? "border-2 border-red-300 bg-gradient-to-b from-red-100 to-red-200 shadow-[inset_0_2px_0_rgba(255,255,255,0.5),0_4px_0_var(--color-warm-400)]"
      : variant === "ghost"
        ? "border-2 border-teal-200 bg-gradient-to-b from-warm-100 to-warm-200 shadow-[inset_0_2px_0_rgba(255,255,255,0.5),0_4px_0_var(--color-warm-400)]"
        : "border-2 border-teal-300 bg-gradient-to-b from-teal-100 to-teal-200 shadow-[inset_0_2px_0_rgba(255,255,255,0.5),0_4px_0_var(--color-warm-400)]";

  return (
    <Skeleton
      height={sizeClass.height}
      width={width}
      rounding="none"
      className={`rounded-xl ${variantClass} ${className}`}
      skipShimmer={skipShimmer}
    />
  );
}