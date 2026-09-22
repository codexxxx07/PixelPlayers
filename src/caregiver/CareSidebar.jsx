import { Link, NavLink } from "react-router-dom";
import { useUser } from "@clerk/react";
import { useTranslation } from "react-i18next";
import { getUserDisplayName } from "../utils/displayName";

const NAV_ITEMS = [
  { to: "/caregiver/dashboard", icon: "🏠", key: "caregiver.nav.dashboard" },
  { to: "/caregiver/elder", icon: "🧓", key: "caregiver.nav.elder" },
  { to: "/caregiver/meals", icon: "🍽️", key: "caregiver.nav.meals" },
  { to: "/caregiver/medicines", icon: "💊", key: "caregiver.nav.medicines" },
  { to: "/caregiver/routine", icon: "📅", key: "caregiver.nav.routine" },
  { to: "/caregiver/reminders", icon: "⏰", key: "caregiver.nav.reminders" },
  { to: "/caregiver/activities", icon: "🎮", key: "caregiver.nav.activities" },
  { to: "/caregiver/messages", icon: "💬", key: "caregiver.nav.messages" },
  { to: "/caregiver/orders", icon: "🛒", key: "caregiver.nav.orders" },
  { to: "/caregiver/settings", icon: "⚙️", key: "caregiver.nav.settings" },
];

export default function CareSidebar({ collapsed, onToggleCollapse, onNavigate }) {
  const { t } = useTranslation();
  const { isLoaded, user } = useUser();
  const name = isLoaded && user ? getUserDisplayName(user) : "";
  const initial = name ? name.charAt(0).toUpperCase() : "?";
  const roleLabel = isLoaded && user ? t("caregiver.roleLabel") : "—";

  return (
    <aside className="cg-sidebar" aria-label={t("caregiver.sidebarLabel")}>
      <div className="cg-sidebar__head">
        <Link to="/caregiver/dashboard" className="cg-sidebar__brand" onClick={onNavigate}>
          <span className="cg-sidebar__logo" aria-hidden="true">🧡</span>
          <span className="cg-sidebar__wordmark">PixelPlay<br />Care</span>
        </Link>
        <button
          type="button"
          className="cg-sidebar__collapse"
          onClick={onToggleCollapse}
          aria-label={collapsed ? t("caregiver.sidebarExpand") : t("caregiver.sidebarCollapse")}
          aria-pressed={collapsed}
        >
          {collapsed ? "»" : "«"}
        </button>
      </div>

      <nav className="cg-sidebar__navwrap">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `cg-side-link ${isActive ? "cg-side-link--active" : ""}`
            }
            onClick={onNavigate}
          >
            <span className="cg-side-link__icon" aria-hidden="true">{item.icon}</span>
            <span className="cg-side-link__label">{t(item.key)}</span>
          </NavLink>
        ))}
      </nav>

      <div className="cg-sidebar__foot">
        <div className="cg-sidebar__user">
          <span className="cg-sidebar__user-avatar" aria-hidden="true">{initial}</span>
          <div className="min-w-0">
            <p className="cg-sidebar__user-name">{name || "Caregiver"}</p>
            <p className="cg-sidebar__user-role">{roleLabel}</p>
          </div>
        </div>
      </div>
    </aside>
  );
}