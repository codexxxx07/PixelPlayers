export default function SkeletonError({ title = "Unable to load this section.", onRetry, retryLabel = "Try Again", className = "" }) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-center justify-center text-center gap-4 p-8 ${className}`}
    >
      <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-50 border-2 border-amber-200" aria-hidden="true">
        <span className="text-2xl">⚠️</span>
      </div>
      <p className="text-warm-600 text-base leading-relaxed font-medium">{title}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel px-6 py-3"
        >
          {retryLabel}
        </button>
      )}
    </div>
  );
}