export default function EmptyState({ icon = "🫧", title, text, children }) {
  return (
    <div className="cg-empty">
      {icon && <span className="cg-empty__icon" aria-hidden="true">{icon}</span>}
      <p className="cg-empty__title">{title}</p>
      {text && <p className="cg-empty__text">{text}</p>}
      {children && <div className="mt-3">{children}</div>}
    </div>
  );
}