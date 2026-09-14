const ROUNDING = {
  none: "",
  sm: "sk-sm",
  md: "sk",
  lg: "rounded-2xl",
  round: "sk-round",
  pixel: "pixel-border",
};

export default function Skeleton({
  className = "",
  width = "100%",
  height = "1rem",
  rounding = "md",
  skipShimmer = false,
  children,
  "aria-hidden": ariaHidden,
}) {
  const roundingClass = ROUNDING[rounding] || ROUNDING.md;
  return (
    <div
      className={`sk ${skipShimmer ? "" : "sk-shimmer"} ${roundingClass} ${className}`}
      style={{ width, height: height ? height : undefined }}
      aria-hidden={ariaHidden === false ? undefined : "true"}
    >
      {children}
    </div>
  );
}