import { useState, useEffect, useRef, useCallback } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth, UserButton } from "@clerk/react";
import logoImg from "../assets/Logo.png";
import SosButton, { SosModal } from "./SosButton";
import ThemeToggle from "./ThemeToggle";
import ThemePullCord from "./ThemePullCord";
import ScrollProgress from "./ScrollProgress";
import { useTheme } from "../context/ThemeContext";
import { useSmoothScroll } from "../context/ScrollContext";
import { useTranslation } from "react-i18next";

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

const lockedExtras = [
  { to: "/memory", key: "nav.memory", icon: "💾" },
  { to: "/routine", key: "nav.routine", icon: "📅" },
  { to: "/reminders", key: "nav.reminders", icon: "⏰" },
  { to: "/assistant", key: "nav.assistant", icon: "🤖" },
];

export default function Navbar() {
  const { t } = useTranslation();
  const { isLoaded, isSignedIn } = useAuth();
  const { isDark } = useTheme();
  const { lenis, stop, start } = useSmoothScroll();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const [sosSession, setSosSession] = useState(0);
  const [loginRequiredOpen, setLoginRequiredOpen] = useState(false);
  const sosTriggerRef = useRef(null);

  const openSos = useCallback(() => {
    if (!isLoaded) return;
    sosTriggerRef.current = document.activeElement;
    if (!isSignedIn) {
      setLoginRequiredOpen(true);
      return;
    }
    setSosSession((count) => count + 1);
    setSosOpen(true);
  }, [isLoaded, isSignedIn]);

  const closeLoginRequired = useCallback(() => {
    setLoginRequiredOpen(false);
    if (
      sosTriggerRef.current &&
      sosTriggerRef.current.isConnected &&
      typeof sosTriggerRef.current.focus === "function"
    ) {
      sosTriggerRef.current.focus();
    }
    sosTriggerRef.current = null;
  }, []);

  // Shadow swap stays exactly as it was — it just reads the smoothed scroll
  // position when Lenis is driving, and falls back to the native event
  // otherwise (reduced motion, or a Lenis instance that failed to start).
  // The equality guard means the Navbar never re-renders mid-scroll.
  useEffect(() => {
    const applyScrollState = (y) => {
      const next = y > 10;
      setScrolled((prev) => (prev === next ? prev : next));
    };

    if (lenis) {
      applyScrollState(lenis.animatedScroll);
      lenis.on("scroll", applyScrollState);
      return () => lenis.off("scroll", applyScrollState);
    }

    const onNativeScroll = () => applyScrollState(window.scrollY);
    window.addEventListener("scroll", onNativeScroll, { passive: true });
    applyScrollState(window.scrollY);
    return () => window.removeEventListener("scroll", onNativeScroll);
  }, [lenis]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      // Lenis would otherwise keep animating the page behind the open menu.
      stop();
    } else {
      document.body.style.overflow = "";
      start();
    }
    return () => {
      document.body.style.overflow = "";
      start();
    };
  }, [mobileOpen, stop, start]);

  const navLinks = isSignedIn
    ? [...baseNavLinks, { to: "/dashboard", key: "nav.dashboard" }]
    : baseNavLinks;

  const mobileNavLinks = isSignedIn
    ? [...baseNavLinks, { to: "/dashboard", key: "nav.dashboard" }]
    : baseNavLinks.filter((link) => link.to !== "/memory");

  const linkClass = ({ isActive }) =>
    `relative inline-flex items-center justify-center px-4 py-2.5 text-base leading-6 font-semibold rounded-xl transition-colors duration-200 ${
      isActive
        ? "bg-teal-600/10 text-teal-800 font-bold ring-1 ring-inset ring-teal-600/25 dark:bg-teal-400/15 after:content-[''] after:absolute after:inset-x-4 after:bottom-1 after:h-[2px] after:rounded-full after:bg-teal-600"
        : "text-warm-800 hover:bg-warm-100/80 hover:text-teal-700 dark:hover:bg-white/5"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `flex w-full items-center min-h-14 px-6 py-4 text-lg font-medium rounded-xl transition-colors duration-200 ${
      isActive
        ? "bg-teal-600/10 text-teal-800 font-semibold border-l-4 border-teal-600 dark:bg-teal-400/15"
        : "text-warm-800 hover:bg-teal-50 hover:text-teal-600 dark:hover:bg-white/5"
    }`;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-(--pp-navbar) transition-shadow duration-300 ${
          scrolled
            ? "shadow-[0_12px_28px_-14px_rgba(63,40,25,0.35)] dark:shadow-[0_14px_30px_-14px_rgba(0,0,0,0.65)]"
            : "shadow-[0_8px_22px_-14px_rgba(63,40,25,0.25)] dark:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.55)]"
        }`}
      >
        <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between gap-2">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Pixel Players — Home">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-b from-teal-500 to-teal-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_2px_0_rgba(13,78,74,0.55),0_4px_10px_rgba(19,78,74,0.2)]">
                <img src={logoImg} alt="" className="w-full h-full object-contain rounded-xl" draggable={false} />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-[3px] border-2 border-(--pp-navbar)" />
              </div>
              <span className="font-pixel text-lg sm:text-xl leading-none text-teal-800 group-hover:text-teal-600 transition-colors hidden sm:inline">
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
            <div className="hidden lg:flex items-center shrink-0" style={{ gap: "var(--nav-btn-gap)" }}>
              {isLoaded && isSignedIn ? (
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 rounded-full",
                    },
                  }}
                />
              ) : isLoaded ? (
                <>
                  <Link to="/login" className="nav-btn nav-btn-login nav-btn-pixel">
                    {t("nav.login")}
                  </Link>
                  <Link to="/signup" className="nav-btn nav-btn-signup nav-btn-pixel">
                    {t("nav.signup")}
                  </Link>
                </>
              ) : null}
              <SosButton variant="navbar" onClick={openSos} />
              <ThemePullCord />
            </div>

            {/* Mobile pull-cord theme lamp (desktop auth row already shows one ≥lg) */}
            <div className="lg:hidden">
              <ThemePullCord />
            </div>

            {/* Mobile Hamburger */}
            <button
              className="xl:hidden flex flex-col items-center justify-center w-12 h-12 rounded-xl hover:bg-teal-50 dark:hover:bg-white/5 transition-colors shrink-0"
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

        <ScrollProgress />
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
          className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-(--pp-navbar) shadow-2xl transition-transform duration-300 ease-out xl:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-teal-100">
            <span className="font-pixel text-lg text-teal-800">
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
          <div
            data-lenis-prevent
            className="flex-1 overflow-y-auto px-4 py-4 space-y-1.5"
          >
            {/* Theme row — stays open while toggling so the change is visible live */}
            <div className="mb-3">
              <ThemeToggle style={{ width: "100%" }}>
                {isDark ? t("theme.darkMode") : t("theme.lightMode")}
              </ThemeToggle>
            </div>
            <div className="mb-3">
              <SosButton
                variant="menu"
                onClick={() => {
                  setMobileOpen(false);
                  openSos();
                }}
              />
            </div>
            {mobileNavLinks.map((link) => (
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
            {isLoaded && isSignedIn && (
              <>
                <div className="pt-3 pb-1 px-6 text-xs font-pixel text-teal-400 tracking-wider">
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
              </>
            )}
            {isLoaded && !isSignedIn && (
              <>
                <div className="pt-3 pb-1 px-6 text-xs font-pixel text-teal-400 tracking-wider">
                  {t("featurePreview.mobileLockLabel")}
                </div>
                {lockedExtras.map((link) => (
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
                    <span className="ml-auto text-sm opacity-60" aria-hidden="true">🔒</span>
                  </NavLink>
                ))}
              </>
            )}
          </div>

            {/* Mobile Auth */}
            <div className="px-6 py-5 border-t border-teal-100 space-y-3">
              {isLoaded && isSignedIn ? (
                <div className="flex justify-center py-2">
                  <UserButton
                    appearance={{
                      elements: {
                        avatarBox: "w-12 h-12 rounded-full",
                      },
                    }}
                  />
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="nav-btn nav-btn-login nav-btn-pixel w-full py-3.5"
                  >
                    {t("nav.login")}
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="nav-btn nav-btn-signup nav-btn-pixel w-full py-3.5"
                  >
                    {t("nav.signup")}
                  </Link>
                </>
              )}
            </div>
        </div>
      </div>

      <SosModal key={sosSession} open={sosOpen} onClose={() => setSosOpen(false)} />
      <LoginRequiredModal
        open={loginRequiredOpen}
        onClose={closeLoginRequired}
      />
    </>
  );
}

function LoginRequiredModal({ open, onClose }) {
  const cancelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open && cancelRef.current) {
      cancelRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-75 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-required-title"
      aria-describedby="login-required-message"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-3xl border-2 border-teal-200 bg-linear-to-b from-white to-teal-50 p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_0_#b8e0d8,0_28px_48px_rgba(15,60,90,0.3)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_8px_0_#173832,0_28px_48px_rgba(0,0,0,0.5)] animate-slide-up"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-b from-teal-500 to-teal-600 border-[3px] border-teal-800/70 shadow-[inset_0_2px_0_rgba(255,255,255,0.35),0_4px_0_#0f4c5c] mb-4">
            <svg
              viewBox="0 0 24 24"
              className="w-9 h-9 text-white"
              aria-hidden="true"
              shapeRendering="crispEdges"
            >
              <rect x="4" y="10" width="16" height="11" rx="2" fill="currentColor" />
              <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2.5" />
            </svg>
          </div>
          <h2
            id="login-required-title"
            className="font-pixel text-teal-800 text-sm sm:text-base leading-relaxed"
          >
            SIGN IN TO USE SOS
          </h2>
          <p id="login-required-message" className="text-gray-600 text-base mt-3 leading-relaxed">
            Please sign in first to use the SOS feature. Once you're logged in,
            you'll have full access to SOS and your trusted support options.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/login"
            onClick={onClose}
            className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block py-4"
          >
            Log In
          </Link>
          <button
            type="button"
            ref={cancelRef}
            onClick={onClose}
            className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-4"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}