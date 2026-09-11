import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/features", label: "Features" },
  { to: "/games", label: "Games" },
  { to: "/memory", label: "Memory" },
  { to: "/dashboard", label: "Dashboard" },
];

const mobileExtras = [
  { to: "/routine", label: "Routine", icon: "📅" },
  { to: "/assistant", label: "Assistant", icon: "🤖" },
  { to: "/reminders", label: "Reminders", icon: "⏰" },
  { to: "/progress", label: "Progress", icon: "📈" },
  { to: "/support", label: "Support", icon: "👨‍👩‍👧" },
  { to: "/settings", label: "Settings", icon: "⚙️" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const linkClass = ({ isActive }) =>
    `relative px-4 py-3 text-lg font-medium rounded-lg transition-colors duration-200 ${
      isActive
        ? "bg-teal-100 text-teal-700"
        : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block w-full px-6 py-4 text-xl font-medium rounded-xl transition-colors duration-200 ${
      isActive
        ? "bg-teal-100 text-teal-700 border-l-4 border-teal-600"
        : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
    }`;

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
              <span className="font-[family-name:var(--font-pixel)] text-lg sm:text-xl text-teal-800 group-hover:text-teal-600 transition-colors hidden sm:inline">
                Pixel&nbsp;Players
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === "/"}>
                  {link.label}
                </NavLink>
              ))}
            </div>

            {/* Desktop Auth */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <Link
                to="/login"
                className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel px-5 py-3"
              >
                Log In
              </Link>
              <Link
                to="/signup"
                className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel px-6 py-3"
              >
                Sign Up
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button
              className="lg:hidden flex flex-col items-center justify-center w-14 h-14 rounded-xl hover:bg-teal-50 transition-colors shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
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

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ backgroundColor: "#FFF8F0" }}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-teal-100">
            <span className="font-[family-name:var(--font-pixel)] text-lg text-teal-800">
              Menu
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center w-12 h-12 rounded-xl hover:bg-teal-50 transition-colors"
              aria-label="Close menu"
            >
              <span className="text-2xl text-gray-500">×</span>
            </button>
          </div>

          {/* Mobile Nav Links */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={mobileLinkClass}
                end={link.to === "/"}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="pt-3 pb-1 px-6 text-xs font-[family-name:var(--font-pixel)] text-teal-400 tracking-wider">
              YOUR SPACE
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
                  {link.label}
                </span>
              </NavLink>
            ))}
          </div>

          {/* Mobile Auth */}
          <div className="px-6 py-5 border-t border-teal-100 space-y-3">
            <Link
              to="/login"
              onClick={() => setMobileOpen(false)}
              className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-4"
            >
              Log In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileOpen(false)}
              className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block py-4"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}