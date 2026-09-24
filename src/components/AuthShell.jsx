import { useTranslation } from "react-i18next";
import logoImg from "../assets/Logo.png";

function AuthShell({ eyebrow, title, subtitle, children, chromeless = false }) {
  const { t } = useTranslation();
  const heading = (
    <div className="text-center mb-8">
      <div
        className="mx-auto mb-4 flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-600 shadow-pixel"
        aria-hidden="true"
      >
        <img src={logoImg} alt="" className="w-full h-full object-contain rounded-2xl" draggable={false} />
      </div>
      {eyebrow && (
        <p className="mb-2 font-pixel text-[10px] tracking-[0.2em] text-teal-500 uppercase">
          {eyebrow}
        </p>
      )}
      <h1 className="font-pixel text-xl sm:text-2xl text-teal-700 leading-relaxed">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-2 text-lg text-gray-500 font-medium">{subtitle}</p>
      )}
    </div>
  );

  return (
    <div className="relative min-h-screen bg-linear-to-b from-teal-50/70 via-warm-50 to-white py-10 md:py-16 overflow-hidden auth-shell">
      <div className="absolute inset-0 pixel-grid" aria-hidden="true" />
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-teal-200/40 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-amber-200/40 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-xl px-4 sm:px-6">
        {chromeless ? (
          <div className="animate-slide-up py-6 sm:py-10">{heading}{children}</div>
        ) : (
          <div className="animate-slide-up skeuo-card skeuo-card-pad mx-auto px-6 sm:px-10 py-8 sm:py-10">
            {heading}
            {children}
          </div>
        )}

        <p className="mt-8 text-center text-sm text-gray-400 font-medium">
          Pixel Players · {t('auth.tagline')}
        </p>
      </div>
    </div>
  );
}

export default AuthShell;
