export default function CarePageHeader({ kicker, title, subtitle, children }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
      <div className="min-w-0">
        {kicker && <p className="cg-kicker mb-2">{kicker}</p>}
        <h1 className="cg-hero-title">{title}</h1>
        {subtitle && <p className="cg-sub mt-2 max-w-[58ch]">{subtitle}</p>}
      </div>
      {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
    </div>
  );
}