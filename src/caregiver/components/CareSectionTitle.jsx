export default function CareSectionTitle({ icon, children, right }) {
  return (
    <div className="cg-section-title">
      <span className="cg-section-title__icon" aria-hidden="true">
        {icon}
      </span>
      <h2 className="text-base font-black text-(--cg-text) tracking-tight">{children}</h2>
      {right && <span className="ml-auto">{right}</span>}
    </div>
  );
}