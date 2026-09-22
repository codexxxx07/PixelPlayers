export function CareCard({ as: Tag = "div", className = "", pixel = false, children, ...rest }) {
  return (
    <Tag
      className={`cg-card ${pixel ? "cg-card--pixel" : ""} ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}