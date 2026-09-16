export default function SkeletonCentered({ children, className = '', minHeight = '33vh' }) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col items-center justify-center gap-5 px-6 text-center ${className}`}
      style={{ minHeight }}
    >
      {children}
    </div>
  );
}