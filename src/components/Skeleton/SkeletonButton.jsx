import Skeleton from "./Skeleton.jsx";

const SIZES = {
  sm: { height: 38, className: "rounded-xl" },
  md: { height: 46, className: "rounded-xl" },
  lg: { height: 54, className: "rounded-xl" },
};

export default function SkeletonButton({
  size = "md",
  width = "8.5rem",
  className = "",
  skipShimmer = false,
}) {
  const sizeClass = SIZES[size] || SIZES.md;
  return (
    <Skeleton
      height={sizeClass.height}
      width={width}
      rounding="none"
      className={`rounded-xl ${className}`}
      skipShimmer={skipShimmer}
    />
  );
}