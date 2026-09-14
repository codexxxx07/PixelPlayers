import Skeleton from "./Skeleton.jsx";

export default function SkeletonCard({
  className = "",
  children,
  skipShimmer = false,
}) {
  return (
    <div className="skeuo-card skeuo-card-pad" aria-hidden="true">
      {children ? (
        <div className={`sk sk-shimmer rounded-2xl ${className}`}>{children}</div>
      ) : (
        <Skeleton
          rounding="lg"
          className={className}
          skipShimmer={skipShimmer}
        />
      )}
    </div>
  );
}