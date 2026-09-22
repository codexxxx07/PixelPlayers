import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./caregiver.css";
import CareSidebar from "./CareSidebar";
import CareTopBar from "./CareTopBar";

export default function CaregiverShell({ children }) {
  const { t } = useTranslation();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const shellClass = [
    "cg-scope",
    "cg-shell",
    collapsed ? "cg-shell--collapsed" : "",
    mobileOpen ? "cg-shell--mobile-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={shellClass}>
      <CareSidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        onNavigate={() => setMobileOpen(false)}
      />
      {mobileOpen && (
        <button
          type="button"
          className="cg-mobile-scrim"
          onClick={() => setMobileOpen(false)}
          aria-label={t("caregiver.closeMenu")}
          tabIndex={-1}
        />
      )}
      <div className="cg-shell__main">
        <CareTopBar
          pathname={location.pathname}
          onOpenMobile={() => setMobileOpen(true)}
        />
        <main className="cg-shell__content">{children}</main>
        <footer className="cg-footer">
          <span>
            © {new Date().getFullYear()} Pixel Players · {t("caregiver.footerLabel")}
          </span>
          <span className="cg-fade">{t("caregiver.footerDisclaimer")}</span>
          <Link to="/welcome" className="cg-btn cg-btn--ghost cg-btn--sm">
            {t("caregiver.switchExperience")}
          </Link>
        </footer>
      </div>
    </div>
  );
}