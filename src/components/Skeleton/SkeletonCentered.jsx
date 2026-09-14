import SkeletonAvatar from "./SkeletonAvatar.jsx";
import SkeletonText from "./SkeletonText.jsx";

export default function SkeletonCentered({
  avatarSize = "xl",
  titleLines = 2,
  bodyLines = 3,
  className = "",
}) {
  return (
    <div
      className={`flex flex-col items-center text-center ${className}`}
      aria-hidden="true"
    >
      <SkeletonAvatar size={avatarSize} />
      <div className="mt-5 w-full max-w-md">
        <SkeletonText lines={titleLines} size="lg" />
      </div>
      <div className="mt-3 w-full max-w-lg">
        <SkeletonText lines={bodyLines} size="sm" />
      </div>
    </div>
  );
}