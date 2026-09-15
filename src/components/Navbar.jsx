import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth, useClerk, useUser } from "@clerk/react";
import SosButton, { SosModal } from "./SosButton";
import { useTranslation } from "react-i18next";
import { getUserDisplayName } from "../utils/displayName";

const baseNavLinks = [
  { to: "/", key: "nav.home" },
  { to: "/features", key: "nav.features" },
  { to: "/games", key: "nav.games" },
  { to: "/memory", key: "nav.memory" },
];

const mobileExtras = [
  { to: "/routine", key: "nav.routine", icon: "📅" },
  { to: "/assistant", key: "nav.assistant", icon: "🤖" },
  { to: "/reminders", key: "nav.reminders", icon: "⏰" },
  { to: "/progress", key: "nav.progress", icon: "📈" },
  { to: "/support", key: "nav.support", icon: "👨‍👩‍👧" },
  { to: "/settings", key: "nav.settings", icon: "⚙️" },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { isLoaded, isSignedIn } = useAuth();
  const { user: clerkUser } = useUser();
  const { signOut } = useClerk();
  const displayName = getUserDisplayName(clerkUser);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const [sosSession, setSosSession] = useState(0);

  const handleSignOut = () => signOut();

  const openSos = () => {
    setSosSession((count) => count + 1);
    setSosOpen(true);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navLinks = isSignedIn
    ? [...baseNavLinks, { to: "/dashboard", key: "nav.dashboard" }]
    : baseNavLinks;

  const linkClass = ({ isActive }) =>
    `relative inline-flex items-center justify-center px-4 py-2.5 text-base leading-6 font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-teal-100 text-teal-700 font-semibold after:content-[''] after:absolute after:inset-x-4 after:bottom-1.5 after:h-[3px] after:rounded-sm after:bg-teal-600"
        : "text-warm-800 hover:bg-teal-50 hover:text-teal-600"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex w-full items-center min-h-14 px-6 py-4 text-lg font-medium rounded-xl transition-colors duration-200 ${
      isActive
        ? "bg-teal-100 text-teal-700 font-semibold border-l-4 border-teal-600"
        : "text-warm-800 hover:bg-teal-50 hover:text-teal-600"
    }`;

  const userNamePillClass =
    "inline-flex items-center gap-2 rounded-xl border-2 border-teal-200 bg-white px-4 py-2 shadow-[0_2px_0_rgba(19,78,74,0.15)]";

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-shadow duration-300 border-b-[3px] border-dashed border-teal-200 ${
          scrolled
            ? "shadow-lg shadow-teal-900/5"
            : "shadow-md shadow-teal-900/5"
        }`}
        style={{ backgroundColor: "#FFF8F0" }}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group shrink-0">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-teal-600 shadow-md">
                <span className="text-white text-lg leading-none mt-0.5">♥</span>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-amber-400 rounded-sm" />
              </div>
              <span className="font-[family-name:var(--font-pixel)] text-lg sm:text-xl leading-none text-teal-800 group-hover:text-teal-600 transition-colors hidden sm:inline">
                Pixel&nbsp;Players
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-2">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
                  {t(link.key)}
                </NavLink>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {isLoaded && isSignedIn ? (
                <>
                  <span className={userNamePillClass}>
                    <span
                      className="flex items-center justify-center w-7 h-7 rounded-lg bg-teal-600 text-white text-xs font-bold"
                      aria-hidden="true"
                    >
                      {displayName.charAt(0)}
                    </span>
                    <span className="max-w-[10rem] truncate text-teal-800 font-semibold">
                      {displayName}
                    </span>
                  </span>
                  <button
                    type="button"
                    onClick={handleSignOut}
                    className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel px-5 py-3.5"
                  >
                    {t("settings.signOut")}
                  </button>
                </>
              ) : isLoaded ? (
                <>
                  <Link
                    to="/login"
                    className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel px-5 py-3.5"
                  >
                    {t("nav.login")}
                  </Link>
                  <Link
                    to="/signup"
                    className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel px-6 py-3.5"
                  >
                    {t("nav.signup")}
                  </Link>
                </>
              ) : null}
              <SosButton variant="navbar" onClick={openSos} />
            </div>

            {/* Mobile Hamburger */}
            <button
              className="xl:hidden flex flex-col items-center justify-center w-12 h-12 rounded-xl hover:bg-teal-50 transition-colors shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
              aria-expanded={mobileOpen}
            >
              <div className="flex flex-col gap-1.5 w-6">
                <span
                  className={`block h-0.5 w-full rounded-full bg-teal-700 transition-all duration-300 origin-center ${
                    mobileOpen ? "translate-y-2 rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full rounded-full bg-teal-700 transition-all duration-300 ${
                    mobileOpen ? "opacity-0 scale-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-full rounded-full bg-teal-700 transition-all duration-300 origin-center ${
                    mobileOpen ? "-translate-y-2 -rotate-45" : ""
                  }`}
                />
              </div>
            </button>
          </div>
        </nav>
      </header>

      <SosButton variant="floating" onClick={openSos} />

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out xl:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "#FFF8F0" }}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-teal-100">
            <span className="font-[family-name:var(--font-pixel)] text-lg text-teal-800">
              {t("nav.menu")}
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-12 h-12 rounded-xl hover:bg-teal-50 transition-colors"
              aria-label={t("nav.closeMenu")}
            >
              <span className="text-2xl text-gray-500">×</span>
            </button>
          </div>

          {/* Mobile Nav Links */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5">
            <div className="mb-3">
              <SosButton
                variant="menu"
                onClick={() => {
                  setMobileOpen(false);
                  openSos();
                }}
              />
            </div>
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={mobileLinkClass}
                end={link.to === "/"}
                onClick={() => setMobileOpen(false)}
              >
                {t(link.key)}
              </NavLink>
            ))}
            <div className="pt-3 pb-1 px-6 text-xs font-[family-name:var(--font-pixel)] text-teal-400 tracking-wider">
              {t("nav.yourSpace")}
            </div>
            {mobileExtras.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={mobileLinkClass}
                onClick={() => setMobileOpen(false)}
              >
                <span className="inline-flex items-center gap-3">
                  <span className="text-xl">{link.icon}</span>
                  {t(link.key)}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Auth */}
          <div className="px-6 py-5 border-t border-teal-100 space-y-3">
            {isLoaded && isSignedIn ? (
              <>
                <div className="flex items-center justify-center gap-3 rounded-2xl border-2 border-teal-200 bg-white px-4 py-3 shadow-[0_2px_0_rgba(19,78,74,0.15)]">
                  <span
                    className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal-600 text-white text-sm font-bold"
                    aria-hidden="true"
                  >
                    {displayName.charAt(0)}
                  </span>
                  <span className="text-teal-800 font-bold text-lg truncate">{displayName}</span>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    handleSignOut();
                  }}
                  className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-4"
                >
                  {t("settings.signOut")}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-4"
                >
                  {t("nav.login")}
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileOpen(false)}
                  className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block py-4"
                >
                  {t("nav.signup")}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <SosModal key={sosSession} open={sosOpen} onClose={() => setSosOpen(false)} />
    </>
  );
}