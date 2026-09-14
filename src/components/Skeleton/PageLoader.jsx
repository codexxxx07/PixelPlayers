import SkeletonError from "./SkeletonError.jsx";
import DefaultPageSkeleton from "./DefaultPageSkeleton.jsx";

export default function PageLoader({
  status = "loading",
  onRetry,
  skeleton: SkeletonView = DefaultPageSkeleton,
}) {
  if (status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50">
        <SkeletonError title="Unable to load this page." onRetry={onRetry} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-50" role="status" aria-live="polite">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SkeletonView />
      </div>
    </div>
  );
}