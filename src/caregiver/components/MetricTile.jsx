export default function MetricTile({ icon, value, unit, label, sub }) {
  return (
    <div className="cg-metric">
      <div className="cg-metric__top">
        <span className="cg-metric__label">{label}</span>
        {icon && (
          <span className="cg-metric__icon" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>
      <div className="cg-metric__value">
        {value}
        {unit && <span className="cg-metric__unit"> {unit}</span>}
      </div>
      {sub && <span className="cg-fade" style={{ fontSize: 12.5 }}>{sub}</span>}
    </div>
  );
}