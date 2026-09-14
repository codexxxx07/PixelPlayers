import Skeleton from "./Skeleton.jsx";

const SIZES = {
  xs: "w-8 h-8",
  sm: "w-10 h-10",
  md: "w-12 h-12",
  lg: "w-14 h-14",
  xl: "w-16 h-16",
};

export default function SkeletonAvatar({
  size = "md",
  rounded = false,
  className = "",
  skipShimmer = false,
}) {
  const sizeClass = SIZES[size] || SIZES.md;
  return (
    <Skeleton
      width={undefined}
      height={undefined}
      rounding={rounded ? "md" : "round"}
      className={`${sizeClass} ${rounded ? "rounded-xl" : "sk-avatar"} ${className}`}
      skipShimmer={skipShimmer}
    />
  );
}