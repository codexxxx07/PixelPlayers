import SkeletonError from "./SkeletonError.jsx";
import usePageLoading from "./usePageLoading.js";

export default function SectionLoader({
  loading = false,
  skeleton,
  onContentReady,
  className = "",
}) {
  const { status, retry } = usePageLoading({
    loading,
    onContentReady,
  });

  if (status === "success") {
    return null;
  }

  if (status === "error") {
    return <SkeletonError onRetry={retry} className={className} />;
  }

  return (
    <div aria-busy="true" className={className}>
      {skeleton}
    </div>
  );
}