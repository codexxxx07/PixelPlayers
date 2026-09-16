import usePageLoading from './usePageLoading';
import SkeletonError from './SkeletonError';
import DefaultPageSkeleton from './DefaultPageSkeleton';

export default function PageLoader({
  skeleton = <DefaultPageSkeleton />,
  loading = true,
  error = null,
  onRetry,
  minDisplayMs = 200,
  label = 'Loading…',
  children = null,
}) {
  const { status, retry } = usePageLoading({ loading, error, minDisplayMs });

  if (status === 'error') {
    return <SkeletonError title="Could not load this page" error={error} onRetry={onRetry || retry} />;
  }

  const showSkeleton = children == null || status === 'loading';
  if (showSkeleton) {
    return (
      <div role="status" aria-busy="true" aria-live="polite" className="page-enter">
        <span className="sr-only">{label}</span>
        {skeleton}
      </div>
    );
  }

  if (status === 'idle') return null;

  return children;
}