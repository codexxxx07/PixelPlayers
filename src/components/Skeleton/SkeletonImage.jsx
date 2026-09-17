import Skeleton from './Skeleton';

/**
 * Image-shaped placeholder. Uses aspect-ratio so it never causes layout
 * shift while the real graphic loads. Common ratios: "16/9", "1/1", "3/2".
 */
export default function SkeletonImage({
  aspectRatio = "16/9",
  radius = "lg",
  className = "",
  style,
}) {
  return (
    <Skeleton
      radius={radius}
      className={className}
      style={{ aspectRatio, ...style }}
    />
  );
}