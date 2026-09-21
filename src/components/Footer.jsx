import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const platformLinks = [
  { to: "/features", key: "nav.features" },
  { to: "/games", key: "nav.games" },
  { to: "/memory", key: "nav.memory" },
  { to: "/routine", key: "nav.routine" },
];

const supportLinks = [
  { to: "/dashboard", key: "nav.dashboard" },
  { to: "/progress", key: "nav.progress" },
  { to: "/support", key: "nav.support" },
  { to: "/settings", key: "nav.settings" },
];

const aboutLinks = [
  { to: "/about", key: "nav.about" },
  { to: "/assistant", key: "nav.assistant" },
  { to: "/reminders", key: "nav.reminders" },
];

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="relative bg-[var(--pp-footer-bg)] text-white">
      {/* Pixel art decorative border */}
      <div className="w-full h-3 flex">
        <div className="flex-1 bg-teal-400" />
        <div className="flex-1 bg-teal-500" />
        <div className="flex-1 bg-teal-600" />
        <div className="flex-1 bg-teal-700" />
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-amber-500" />
        <div className="flex-1 bg-teal-400" />
        <div className="flex-1 bg-teal-300" />
        <div className="flex-1 bg-teal-500" />
        <div className="flex-1 bg-teal-600" />
        <div className="flex-1 bg-teal-400" />
        <div className="flex-1 bg-teal-700" />
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-teal-500" />
        <div className="flex-1 bg-teal-300" />
        <div className="flex-1 bg-teal-600" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Branding Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-teal-600 border border-teal-500">
                <span className="text-white text-base leading-none mt-0.5">♥</span>
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-amber-400 rounded-sm" />
              </div>
              <span className="font-[family-name:var(--font-pixel)] text-xl text-white">
                Pixel Players
              </span>
            </div>
            <p className="text-[#99f6e4] text-lg mb-6 max-w-sm">
              {t("footer.tagline")}
            </p>
            <p className="text-[#5eead4] text-sm leading-relaxed max-w-sm">
              {t("footer.description")}
            </p>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="font-[family-name:var(--font-pixel)] text-sm text-[#5eead4] uppercase tracking-wider mb-4">
              {t("footer.platform")}
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#ccfbf1] hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-[family-name:var(--font-pixel)] text-sm text-[#5eead4] uppercase tracking-wider mb-4">
              {t("footer.support")}
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#ccfbf1] hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-[family-name:var(--font-pixel)] text-sm text-[#5eead4] uppercase tracking-wider mb-4">
              {t("footer.explore")}
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-[#ccfbf1] hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {t(link.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-teal-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#5eead4] text-sm">
            {t("footer.copyright")}
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5eead4] hover:text-white text-sm transition-colors"
              aria-label={t("footer.twitter")}
            >
              {t("footer.twitter")}
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#5eead4] hover:text-white text-sm transition-colors"
              aria-label={t("footer.github")}
            >
              {t("footer.github")}
            </a>
            <a
              href="mailto:hello@pixelplayers.com"
              className="text-[#5eead4] hover:text-white text-sm transition-colors"
              aria-label={t("footer.emailLabel")}
            >
              {t("footer.contact")}
            </a>
          </div>
        </div>

        {/* SIH Credit */}
        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-800 border border-teal-700 px-4 py-1.5 text-xs text-[#5eead4] dark:bg-teal-100 dark:border-teal-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            {t("footer.sihCredit")}
          </span>
        </div>
      </div>
    </footer>
  );
}
