export default function SkeletonError({
  title = 'Something went wrong',
  message = 'We could not load this. Please try again.',
  error,
  retryable = true,
  onRetry,
  compact = false,
}) {
  const detail = error instanceof Error ? error.message : null;
  return (
    <div
      role="alert"
      className={
        compact
          ? 'flex flex-col items-center gap-4 px-6 py-10 text-center'
          : 'flex min-h-[60vh] flex-col items-center justify-center gap-5 px-6 text-center'
      }
    >
      <div
        aria-hidden="true"
        className="flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-warm-300 bg-white text-3xl font-black text-warm-400 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_3px_0_#f0d5b0]"
      >
        !
      </div>
      <h2 className="font-[family-name:var(--font-pixel)] text-base tracking-wide text-teal-700 sm:text-lg">
        {title}
      </h2>
      <p className="max-w-md text-warm-700 leading-relaxed">
        {message}
        {detail ? ` (${detail})` : ''}
      </p>
      {retryable && onRetry && (
        <button type="button" onClick={onRetry} className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel">
          Try again
        </button>
      )}
    </div>
  );
}

export const PageError = SkeletonError;