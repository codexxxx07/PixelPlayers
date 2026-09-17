/**
 * Card-surface placeholder wrapping skeleton content. Mirrors the real
 * skeuo-card: rounded-2xl, hairline border, soft inset highlight. It fills
 * its parent width and grows with the placeholder content placed inside.
 */
export default function SkeletonCard({ className = "", style, children }) {
  return (
    <span
      aria-hidden="true"
      className={`sk sk-card ${className}`}
      style={{ borderRadius: "1.25rem", ...style }}
    >
      {children}
    </span>
  );
}