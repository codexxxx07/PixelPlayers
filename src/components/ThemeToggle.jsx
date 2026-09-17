import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import LampIcon from "./LampIcon";

/**
 * Compact physical lamp-style Light/Dark theme switch.
 * Day = lamp lit (warm sun), Night = lamp off (moon + stars).
 */
export default function ThemeToggle({ className = "", style, children }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const label = isDark ? t("theme.light") : t("theme.dark");

  return (
    <button
      type="button"
      className={`lamp-toggle ${isDark ? "lamp-off" : "lamp-on"} ${
        children ? "lamp-toggle-labeled" : ""
      } ${className}`}
      onClick={toggleTheme}
      aria-label={label}
      aria-pressed={isDark}
      title={label}
      style={style}
    >
      <LampIcon />
      {children ? <span className="lamp-label">{children}</span> : null}
    </button>
  );
}