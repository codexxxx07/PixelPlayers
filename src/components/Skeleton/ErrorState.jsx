import PixelButton from '../PixelButton';

export default function ErrorState({
  title = 'Something went wrong',
  message = 'We couldn’t load this content. Please try again.',
  onRetry,
}) {
  return (
    <div
      role="alert"
      className="flex min-h-[40vh] items-center justify-center px-6 py-12"
    >
      <div className="w-full max-w-md text-center">
        <div
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-red-200 bg-red-50 text-3xl"
          aria-hidden="true"
        >
          ⚠️
        </div>
        <h2 className="font-[family-name:var(--font-pixel)] text-sm text-warm-800 mb-3 leading-relaxed">
          {title}
        </h2>
        <p className="text-warm-600 text-base leading-relaxed mb-8">{message}</p>
        {onRetry && (
          <PixelButton variant="primary" size="md" onClick={onRetry}>
            Try again
          </PixelButton>
        )}
      </div>
    </div>
  );
}