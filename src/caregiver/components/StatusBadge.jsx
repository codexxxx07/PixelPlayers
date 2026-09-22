const toneClass = {
  ok: "cg-badge--ok",
  warn: "cg-badge--warn",
  alert: "cg-badge--alert",
  neutral: "cg-badge--neutral",
  brand: "cg-badge--brand",
};

export default function StatusBadge({ tone = "neutral", label, dot = true }) {
  if (!label) return null;
  return (
    <span className={`cg-badge ${toneClass[tone] || toneClass.neutral}`}>
      {dot && <span className="cg-status-dot" aria-hidden="true" />}
      {label}
    </span>
  );
}