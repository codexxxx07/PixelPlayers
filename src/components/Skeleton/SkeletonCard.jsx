export default function SkeletonCard({ children, className = '', pad = true, inset = false }) {
  return (
    <div
      aria-hidden="true"
      className={`skeuo-card ${pad ? 'skeuo-card-pad' : ''} ${inset ? 'skeuo-card-inset' : ''} ${className}`}
    >
      {children}
    </div>
  );
}