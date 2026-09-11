import { Link } from "react-router-dom";

const platformLinks = [
  { to: "/features", label: "Features" },
  { to: "/games", label: "Games" },
  { to: "/memory", label: "Memory" },
  { to: "/routine", label: "Routine" },
];

const supportLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/progress", label: "Progress" },
  { to: "/support", label: "Support" },
  { to: "/settings", label: "Settings" },
];

const aboutLinks = [
  { to: "/about", label: "About" },
  { to: "/assistant", label: "Assistant" },
  { to: "/reminders", label: "Reminders" },
];

export default function Footer() {
  return (
    <footer className="relative bg-teal-900 text-white">
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
            <p className="text-teal-200 text-lg mb-6 max-w-sm">
              Every memory matters.
            </p>
            <p className="text-teal-300 text-sm leading-relaxed max-w-sm">
              A cognitive gaming and memory assistance platform designed to support elderly patients with dementia through engaging activities and gentle reminders.
            </p>
          </div>

          {/* Platform Column */}
          <div>
            <h3 className="font-[family-name:var(--font-pixel)] text-sm text-teal-300 uppercase tracking-wider mb-4">
              Platform
            </h3>
            <ul className="space-y-3">
              {platformLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-teal-100 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div>
            <h3 className="font-[family-name:var(--font-pixel)] text-sm text-teal-300 uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-teal-100 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h3 className="font-[family-name:var(--font-pixel)] text-sm text-teal-300 uppercase tracking-wider mb-4">
              Explore
            </h3>
            <ul className="space-y-3">
              {aboutLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-teal-100 hover:text-white text-base transition-colors duration-200 hover:translate-x-1 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-teal-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-teal-300 text-sm">
            © 2026 Pixel Players. Built with care for those who matter most.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-300 hover:text-white text-sm transition-colors"
              aria-label="Twitter"
            >
              Twitter
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-teal-300 hover:text-white text-sm transition-colors"
              aria-label="GitHub"
            >
              GitHub
            </a>
            <a
              href="mailto:hello@pixelplayers.com"
              className="text-teal-300 hover:text-white text-sm transition-colors"
              aria-label="Email us"
            >
              Contact
            </a>
          </div>
        </div>

        {/* SIH Credit */}
        <div className="mt-6 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-800 border border-teal-700 px-4 py-1.5 text-xs text-teal-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Made for Smart India Hackathon 2026
          </span>
        </div>
      </div>
    </footer>
  );
}
