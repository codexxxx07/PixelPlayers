import { memo } from "react";

const RADII = {
  none: 0,
  xs: 4,
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
  "2xl": 20,
  "3xl": 24,
  full: "50%",
};

function resolveRadius(radius) {
  if (typeof radius === "number") return `${radius}px`;
  const mapped = RADII[radius] ?? RADII.md;
  return typeof mapped === "number" ? `${mapped}px` : mapped;
}

/**
 * Base skeleton block. Decorative only — every instance is hidden from
 * assistive tech via aria-hidden. Surfaces + sheen come from the --sk-* theme
 * tokens in src/index.css.
 */
function Skeleton({
  width,
  height,
  radius = "md",
  className = "",
  style,
  block = true,
}) {
  return (
    <span
      aria-hidden="true"
      className={`sk ${className}`}
      style={{
        width,
        height,
        borderRadius: resolveRadius(radius),
        display: block ? "block" : undefined,
        ...style,
      }}
    />
  );
}

export default memo(Skeleton);