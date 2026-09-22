import { Link } from "react-router-dom";

export default function ElderProfileCard({ elder, statusTone = "ok", statusLabel }) {
  if (!elder) return null;
  const profile = elder.profile || {};
  return (
    <div className="cg-card flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="flex items-center gap-4 min-w-0 flex-1">
        <span className="cg-elder-avatar" aria-hidden="true">
          {profile.avatarText || (profile.name || "?").charAt(0).toUpperCase()}
        </span>
        <div className="min-w-0">
          <p className="text-lg font-black text-(--cg-text) leading-tight">
            {profile.name || "Elder"}
          </p>
          <p className="text-sm text-(--cg-text-muted) leading-relaxed">
            {[profile.age && `Age ${profile.age}`, profile.relationship]
              .filter(Boolean)
              .join(" · ")}
          </p>
          {profile.blurb && (
            <p className="text-[13px] text-(--cg-text-soft) leading-relaxed mt-1">
              {profile.blurb}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        {statusLabel && (
          <span className={`cg-badge cg-badge--${statusTone}`}>
            <span className="cg-status-dot" aria-hidden="true" />
            {statusLabel}
          </span>
        )}
        <Link
          to="/caregiver/elder"
          className="cg-btn cg-btn--primary cg-btn--sm"
        >
          View status →
        </Link>
      </div>
    </div>
  );
}