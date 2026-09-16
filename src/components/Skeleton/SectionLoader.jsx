import usePageLoading from './usePageLoading';
import SkeletonError from './SkeletonError';

export default function SectionLoader({
  skeleton,
  children,
  loading = false,
  error = null,
  onRetry,
  minDisplayMs = 150,
  label = 'Loading content…',
}) {
  const { status, retry } = usePageLoading({ loading, error, minDisplayMs });

  if (status === 'error') {
    return (
      <SkeletonError
        compact
        title="Could not load this section"
        message="Something went wrong. You can try again below."
        error={error}
        onRetry={onRetry || retry}
      />
    );
  }

  if (status === 'loading') {
    return (
      <div role="status" aria-busy="true" aria-live="polite">
        <span className="sr-only">{label}</span>
        {skeleton}
      </div>
    );
  }

  if (status === 'idle') return null;

  return children;
}