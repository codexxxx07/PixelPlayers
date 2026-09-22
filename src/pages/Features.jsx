import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';

const features = [
  {
    icon: '🎮',
    titleKey: 'features.featGames.title',
    descKey: 'features.featGames.desc',
    to: '/games',
  },
  {
    icon: '💾',
    titleKey: 'features.featMemory.title',
    descKey: 'features.featMemory.desc',
    to: '/memory',
  },
  {
    icon: '🤖',
    titleKey: 'features.featAssistant.title',
    descKey: 'features.featAssistant.desc',
    to: '/assistant',
  },
  {
    icon: '🎯',
    titleKey: 'features.featAdaptive.title',
    descKey: 'features.featAdaptive.desc',
    to: '/games',
  },
  {
    icon: '📅',
    titleKey: 'features.featRoutine.title',
    descKey: 'features.featRoutine.desc',
    to: '/routine',
  },
  {
    icon: '⏰',
    titleKey: 'features.featReminders.title',
    descKey: 'features.featReminders.desc',
    to: '/reminders',
  },
  {
    icon: '🧭',
    titleKey: 'features.featOrientation.title',
    descKey: 'features.featOrientation.desc',
    to: '/assistant',
  },
  {
    icon: '👨‍👩‍👧',
    titleKey: 'features.featSupport.title',
    descKey: 'features.featSupport.desc',
    to: '/support',
  },
  {
    icon: '📈',
    titleKey: 'features.featProgress.title',
    descKey: 'features.featProgress.desc',
    to: '/progress',
  },
  {
    icon: '🇮🇳',
    titleKey: 'features.featLanguages.title',
    descKey: 'features.featLanguages.desc',
    to: null,
  },
  {
    icon: '🔒',
    titleKey: 'features.featPrivacy.title',
    descKey: 'features.featPrivacy.desc',
    to: null,
  },
  {
    icon: '🆘',
    titleKey: 'features.featSos.title',
    descKey: 'features.featSos.desc',
    to: null,
  },
];

const languageLabels = {
  en: 'features.langEnglish',
  hi: 'features.langHindi',
  bn: 'features.langBengali',
  hinglish: 'features.langHinglish',
  or: 'features.langOdia',
  as: 'features.langAssamese',
  pa: 'features.langPunjabi',
  ta: 'features.langTamil',
  te: 'features.langTelugu',
  ur: 'features.langUrdu',
  mr: 'features.langMarathi',
  gu: 'features.langGujarati',
  kn: 'features.langKannada',
  ml: 'features.langMalayalam',
};

const comparisonData = [
  {
    aspectKey: 'features.cmpPersonalization.aspect',
    traditionalKey: 'features.cmpPersonalization.traditional',
    pixelKey: 'features.cmpPersonalization.pixel',
  },
  {
    aspectKey: 'features.cmpLanguage.aspect',
    traditionalKey: 'features.cmpLanguage.traditional',
    pixelKey: 'features.cmpLanguage.pixel',
  },
  {
    aspectKey: 'features.cmpEngagement.aspect',
    traditionalKey: 'features.cmpEngagement.traditional',
    pixelKey: 'features.cmpEngagement.pixel',
  },
  {
    aspectKey: 'features.cmpTracking.aspect',
    traditionalKey: 'features.cmpTracking.traditional',
    pixelKey: 'features.cmpTracking.pixel',
  },
  {
    aspectKey: 'features.cmpAccessibility.aspect',
    traditionalKey: 'features.cmpAccessibility.traditional',
    pixelKey: 'features.cmpAccessibility.pixel',
  },
  {
    aspectKey: 'features.cmpCompanionship.aspect',
    traditionalKey: 'features.cmpCompanionship.traditional',
    pixelKey: 'features.cmpCompanionship.pixel',
  },
];

export default function Features() {
  const { language } = useApp();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* ===== PAGE HEADER ===== */}
      <section className="relative overflow-hidden bg-linear-to-b from-warm-50 to-teal-50/30 py-20 md:py-28 px-6">
        <div className="absolute inset-0 pixel-grid pointer-events-none opacity-30" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-teal-200 px-4 py-1.5 text-xs text-teal-700 font-pixel mb-6">
            🌐 {t(languageLabels[language] || 'features.langEnglish')}
          </span>
          <span className="font-pixel text-[10px] text-teal-400 tracking-widest uppercase mb-4 block">
            {t('features.eyebrow')}
          </span>
          <h1 className="font-pixel text-xl sm:text-2xl md:text-3xl text-teal-700 leading-relaxed mb-6 tracking-wide">
            {t('features.title')}
          </h1>
          <p className="text-warm-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('features.headerDesc')}
          </p>
        </div>
      </section>

      {/* ===== FEATURES GRID ===== */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature) => {
              const CardContent = (
                <PixelCard hover pixel className="p-8 h-full group flex flex-col">
                  <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-200">
                    {feature.icon}
                  </div>
                  <h3 className="font-pixel text-[11px] text-teal-800 mb-3 leading-relaxed">
                    {t(feature.titleKey)}
                  </h3>
                  <p className="text-warm-700 text-base leading-relaxed flex-1">
                    {t(feature.descKey)}
                  </p>
                  {feature.to && (
                    <div className="mt-5 pt-4 border-t border-warm-100">
                      <Link
                        to={feature.to}
                        className="font-pixel text-[10px] text-teal-500 hover:text-teal-700 transition-colors inline-flex items-center gap-1"
                      >
                        {t('features.explore')}
                        <span className="text-[8px]">→</span>
                      </Link>
                    </div>
                  )}
                </PixelCard>
              );

              return feature.to ? (
                <Link key={feature.titleKey} to={feature.to} className="block h-full">
                  {CardContent}
                </Link>
              ) : (
                <div key={feature.titleKey} className="h-full">{CardContent}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON SECTION ===== */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-pixel text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              {t('features.whyUsBadge')}
            </span>
            <h2 className="font-pixel text-lg md:text-xl text-teal-700 tracking-wide">
              {t('features.whyUsTitle')}
            </h2>
          </div>

          {/* Desktop comparison table */}
          <div className="hidden md:block">
            <PixelCard className="overflow-hidden">
              {/* Header row */}
              <div className="grid grid-cols-3 border-b-2 border-warm-200">
                <div className="p-5 bg-warm-100">
                  <span className="font-pixel text-[10px] text-warm-600 tracking-wider">
                    {t('features.cmpAspect')}
                  </span>
                </div>
                <div className="p-5 bg-warm-50 border-l border-warm-200">
                  <span className="font-pixel text-[10px] text-warm-500 tracking-wider">
                    {t('features.cmpTraditional')}
                  </span>
                </div>
                <div className="p-5 bg-teal-50 border-l border-warm-200">
                  <span className="font-pixel text-[10px] text-teal-700 tracking-wider">
                    {t('features.cmpPixel')}
                  </span>
                </div>
              </div>

              {/* Data rows */}
              {comparisonData.map((row, i) => (
                <div
                  key={row.aspectKey}
                  className={`grid grid-cols-3 ${
                    i < comparisonData.length - 1 ? 'border-b border-warm-100' : ''
                  }`}
                >
                  <div className="p-5">
                    <span className="font-pixel text-[9px] text-warm-800 leading-relaxed">
                      {t(row.aspectKey).toUpperCase()}
                    </span>
                  </div>
                  <div className="p-5 border-l border-warm-100">
                    <span className="text-warm-500 text-sm line-through decoration-warm-300">
                      {t(row.traditionalKey)}
                    </span>
                  </div>
                  <div className="p-5 border-l border-warm-100 bg-teal-50/50">
                    <span className="text-teal-800 text-sm font-medium">
                      {t(row.pixelKey)}
                    </span>
                  </div>
                </div>
              ))}
            </PixelCard>
          </div>

          {/* Mobile comparison cards */}
          <div className="md:hidden space-y-4">
            {comparisonData.map((row) => (
              <PixelCard key={row.aspectKey} className="p-5">
                <div className="font-pixel text-[9px] text-teal-600 mb-3 tracking-wider">
                  {t(row.aspectKey).toUpperCase()}
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-warm-400 text-sm mt-0.5">✗</span>
                    <span className="text-warm-500 text-sm line-through decoration-warm-300">
                      {t(row.traditionalKey)}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-teal-500 text-sm mt-0.5">✓</span>
                    <span className="text-teal-800 text-sm font-medium">
                      {t(row.pixelKey)}
                    </span>
                  </div>
                </div>
              </PixelCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <PixelButton to="/dashboard" variant="primary" size="lg">
              {t('features.getStarted')}
            </PixelButton>
          </div>
        </div>
      </section>
    </div>
  );
}
