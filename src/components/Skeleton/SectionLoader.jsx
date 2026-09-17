import ErrorState from './ErrorState';

export default function SectionLoader({
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

  const Loader = skeleton;
  return Loader ? (
    <div aria-busy="true">
      <Loader />
    </div>
  ) : null;
}