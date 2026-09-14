import SkeletonText from "./SkeletonText.jsx";
import Skeleton from "./Skeleton.jsx";

export default function SkeletonSectionTitle({
  title = false,
  className = "",
  align = "left",
}) {
  const alignClass = align === "center" ? "mx-auto text-center" : "";
  return (
    <div className={`${alignClass} ${className}`} aria-hidden="true">
      <Skeleton height="0.65rem" width="7.5rem" className="mb-2.5" />
      <SkeletonText
        lines={title ? 2 : 1}
        size="xl"
        className="mx-auto"
      />
    </div>
  );
}