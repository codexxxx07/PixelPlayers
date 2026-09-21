import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getFeatureGate } from "../config/featureGates";

export default function FeaturePreview({ feature }) {
  const { t } = useTranslation();
  const location = useLocation();
  const config = getFeatureGate(feature);

  if (!config) return null;

  const from = location.pathname + location.search;
  const featureName = t(config.titleKey);

  return (
    <div className="min-h-screen bg-warm-50 relative overflow-hidden">
      <div className="absolute inset-0 pixel-grid pointer-events-none opacity-30" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-3xl px-4 sm:px-6 py-10 md:py-16">
        <div className="skeuo-card p-6 sm:p-10 md:p-12 text-center animate-slide-up">
          {/* Feature icon */}
          <div
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-linear-to-b from-teal-500 to-teal-600 border-[3px] border-teal-800/70 shadow-[inset_0_2px_0_rgba(255,255,255,0.35),0_4px_0_#0f4c5c]"
            aria-hidden="true"
          >
            <span className="text-4xl leading-none">{config.icon}</span>
          </div>

          <p className="mb-3 font-pixel text-[10px] uppercase tracking-widest text-teal-400">
            {t("featurePreview.eyebrow")}
          </p>
          <h1 className="mb-4 font-pixel text-lg sm:text-2xl leading-relaxed tracking-wide text-teal-800 break-words">
            {featureName}
          </h1>
          <p className="mx-auto max-w-xl text-warm-700 text-lg sm:text-xl leading-relaxed">
            {t(config.descKey)}
          </p>

          {/* Why you'll use it */}
          <div className="mt-9 text-left">
            <h2 className="mb-4 font-pixel text-[10px] uppercase tracking-widest text-teal-700">
              {t("featurePreview.whyUseTitle")}
            </h2>
            <ul className="space-y-3.5">
              {config.benefitKeys.map((key) => (
                <li key={key} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white text-sm font-bold shadow-[0_2px_0_#134e4a]"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-warm-700 text-base sm:text-lg leading-relaxed">{t(key)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Why login is required */}
          <div className="mt-9 skeuo-card-inset p-5 sm:p-6 text-left">
            <h3 className="mb-2 font-pixel text-[9px] uppercase tracking-wider text-teal-800">
              🔒 {t("featurePreview.whyLogin.title")}
            </h3>
            <p className="text-warm-700 text-base leading-relaxed">{t("featurePreview.whyLogin.desc")}</p>
          </div>

          {/* How to continue + CTA */}
          <div className="mt-9">
            <h3 className="mb-2 font-pixel text-[9px] uppercase tracking-wider text-teal-800">
              {t("featurePreview.howContinue.title")}
            </h3>
            <p className="mx-auto max-w-md text-warm-700 text-base leading-relaxed">
              {t("featurePreview.howContinue.desc", { feature: featureName })}
            </p>
            <Link
              to="/login"
              state={{ from }}
              className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block mt-6 py-4"
            >
              {t("featurePreview.loginCta")}
            </Link>
          </div>

          <nav className="mt-7" aria-label="Go back">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-base font-bold text-teal-700 hover:text-teal-600 transition-colors"
            >
              <span aria-hidden="true">←</span>
              {t("notFound.backHome")}
            </Link>
          </nav>

          <p className="mt-8 text-sm leading-relaxed text-warm-500">🔒 {t("featurePreview.privacyNote")}</p>
        </div>
      </div>
    </div>
  );
}