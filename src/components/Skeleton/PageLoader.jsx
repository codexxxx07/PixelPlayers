import DefaultPageSkeleton from './DefaultPageSkeleton';
import ErrorState from './ErrorState';

export default function PageLoader({
  status = 'loading',
  skeleton,
  error,
  onRetry,
  children,
}) {
  if (status === 'error') {
    return <ErrorState message={error?.message} onRetry={onRetry} />;
  }

  if (children) return children;

  const Loader = skeleton || DefaultPageSkeleton;
  return (
    <div aria-busy="true">
      <Loader />
    </div>
  );
}