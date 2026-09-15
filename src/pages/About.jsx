import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';

const approaches = [
  {
    icon: '🤖',
    titleKey: 'about.approachAi.title',
    descKey: 'about.approachAi.desc',
  },
  {
    icon: '🇮🇳',
    titleKey: 'about.approachCulture.title',
    descKey: 'about.approachCulture.desc',
  },
  {
    icon: '🔒',
    titleKey: 'about.approachPrivacy.title',
    descKey: 'about.approachPrivacy.desc',
  },
];

const techStack = [
  { name: 'React', descKey: 'about.tech.react' },
  { name: 'AI / ML', descKey: 'about.tech.ai' },
  { name: 'Voice API', descKey: 'about.tech.voice' },
  { name: 'Tailwind CSS', descKey: 'about.tech.tailwind' },
];

const languageLabels = {
  en: 'about.langEnglish',
  hi: 'about.langHindi',
  bn: 'about.langBengali',
  hinglish: 'about.langHinglish',
  or: 'about.langOdia',
  as: 'about.langAssamese',
  pa: 'about.langPunjabi',
  ta: 'about.langTamil',
  te: 'about.langTelugu',
  ur: 'about.langUrdu',
  mr: 'about.langMarathi',
  gu: 'about.langGujarati',
  kn: 'about.langKannada',
  ml: 'about.langMalayalam',
};

const stats = [
  { value: '50M+', labelKey: 'about.statCognitive' },
  { value: '70%', labelKey: 'about.statAccess' },
  { value: '3+', labelKey: 'about.statLanguages' },
];

const architectureFlow = [
  { labelKey: 'about.arch.ui', color: 'bg-teal-500' },
  { labelKey: 'about.arch.input', color: 'bg-teal-400' },
  { labelKey: 'about.arch.ai', color: 'bg-amber-400' },
  { labelKey: 'about.arch.recommendation', color: 'bg-teal-300' },
  { labelKey: 'about.arch.analytics', color: 'bg-teal-600' },
  { labelKey: 'about.arch.data', color: 'bg-teal-700' },
];

const supportedLanguages = [
  { langKey: 'about.langNameEnglish', native: 'EN' },
  { langKey: 'about.langNameHindi', native: 'HI' },
  { langKey: 'about.langNameBengali', native: 'BN' },
];

function PixelPatternBlock() {
  const { t } = useTranslation();
  return (
    <div className="w-full h-48 md:h-64 rounded-2xl border-2 border-teal-200 bg-gradient-to-br from-teal-50 to-warm-50 flex items-center justify-center overflow-hidden relative">
      <div className="absolute inset-0 pixel-grid opacity-50" />
      <div className="relative grid grid-cols-5 gap-1.5 p-6">
        {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={i}
            className={`w-6 h-6 md:w-8 md:h-8 rounded-sm ${
              [0, 2, 4, 5, 9, 10, 12, 14, 15, 19, 20, 22, 24].includes(i)
                ? 'bg-teal-300 opacity-60'
                : [1, 3, 6, 8, 11, 13, 16, 18, 21, 23].includes(i)
                ? 'bg-amber-200 opacity-50'
                : 'bg-teal-100 opacity-40'
            }`}
          />
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-[family-name:var(--font-pixel)] text-[9px] text-teal-400 tracking-wider">
        {t('about.pixelPattern')}
      </div>
    </div>
  );
}

export default function About() {
  const { language } = useApp();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* ===== PAGE HEADER ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-warm-50 to-teal-50/30 py-20 md:py-28 px-6">
        <div className="absolute inset-0 pixel-grid pointer-events-none opacity-30" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-teal-200 px-4 py-1.5 text-xs text-teal-700 font-[family-name:var(--font-pixel)] mb-6">
            🌐 {t(languageLabels[language] || 'about.langEnglish')}
          </span>
          <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-4 block">
            {t('about.eyebrow')}
          </span>
          <h1 className="font-[family-name:var(--font-pixel)] text-xl sm:text-2xl md:text-3xl text-teal-700 leading-relaxed mb-6 tracking-wide">
            {t('about.title')}
          </h1>
          <p className="text-warm-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            {t('about.headerDesc')}
          </p>
        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              {t('about.missionBadge')}
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide mb-6">
              {t('about.missionTitle')}
            </h2>
            <p className="text-warm-800 text-lg leading-relaxed mb-6">
              {t('about.missionP1')}
            </p>
            <p className="text-warm-600 text-base leading-relaxed">
              {t('about.missionP2')}
            </p>
            <Link
              to="/features"
              className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-500 hover:text-teal-700 transition-colors inline-flex items-center gap-1 mt-6"
            >
              {t('about.seeAllFeatures')} <span className="text-[8px]">→</span>
            </Link>
          </div>
          <PixelPatternBlock />
        </div>
      </section>

      {/* ===== PROBLEM STATEMENT SECTION ===== */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 border border-teal-200 px-4 py-1.5 text-xs text-teal-700 font-[family-name:var(--font-pixel)] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
              SIH26003
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide mb-4">
              {t('about.problemTitle')}
            </h2>
            <p className="text-warm-600 text-base max-w-2xl mx-auto">
              {t('about.problemDesc')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {stats.map((stat) => (
              <PixelCard key={stat.labelKey} hover className="p-8 text-center flex flex-col items-center justify-center">
                <div className="font-[family-name:var(--font-pixel)] text-3xl md:text-4xl text-teal-500 mb-4">
                  {stat.value}
                </div>
                <p className="text-warm-700 text-base leading-relaxed">
                  {t(stat.labelKey)}
                </p>
              </PixelCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== OUR APPROACH SECTION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              {t('about.approachBadge')}
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide">
              {t('about.approachTitle')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {approaches.map((item) => (
              <PixelCard key={item.titleKey} hover pixel className="p-8 group">
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="font-[family-name:var(--font-pixel)] text-[11px] text-teal-800 mb-3 leading-relaxed">
                  {t(item.titleKey)}
                </h3>
                <p className="text-warm-700 text-base leading-relaxed">
                  {t(item.descKey)}
                </p>
              </PixelCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TECHNOLOGY SECTION ===== */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              {t('about.techBadge')}
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide">
              {t('about.techTitle')}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Tech cards */}
            <div className="grid grid-cols-2 gap-4">
              {techStack.map((tech) => (
                <PixelCard key={tech.name} className="p-5 text-center">
                  <div className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-700 mb-1">
                    {tech.name}
                  </div>
                  <p className="text-warm-500 text-sm">{t(tech.descKey)}</p>
                </PixelCard>
              ))}
            </div>

            {/* Architecture flow */}
            <PixelCard className="p-6 md:p-8">
              <h3 className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-700 mb-6 tracking-wider">
                {t('about.architectureFlow')}
              </h3>
              <div className="space-y-3">
                {architectureFlow.map((item, i) => (
                  <div key={item.labelKey}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-sm ${item.color} flex-shrink-0`} />
                      <span className="text-warm-800 text-sm font-medium">{t(item.labelKey)}</span>
                    </div>
                    {i < 5 && (
                      <div className="ml-1.5 mt-1 mb-1 w-0.5 h-3 bg-warm-200" />
                    )}
                  </div>
                ))}
              </div>
            </PixelCard>
          </div>
        </div>
      </section>

      {/* ===== TEAM / NER FOCUS SECTION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              {t('about.focusBadge')}
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide mb-4">
              {t('about.focusTitle')}
            </h2>
            <p className="text-warm-600 text-base max-w-2xl mx-auto leading-relaxed">
              {t('about.focusDesc')}
            </p>
          </div>

          <PixelCard className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-[family-name:var(--font-pixel)] text-[11px] text-teal-800 mb-4 leading-relaxed">
                  {t('about.languageSupportTitle')}
                </h3>
                <div className="space-y-3 mb-6">
                  {supportedLanguages.map((l) => (
                    <div key={l.native} className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-teal-100 border border-teal-200 font-[family-name:var(--font-pixel)] text-[9px] text-teal-700">
                        {l.native}
                      </span>
                      <span className="text-warm-800 text-base">{t(l.langKey)}</span>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 text-sm leading-relaxed">
                  {t('about.languageSupportDesc')}
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-warm-50 rounded-2xl p-8 border border-teal-100 text-center">
                <div className="text-5xl mb-4">🇮🇳</div>
                <p className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-700 leading-relaxed mb-2">
                  {t('about.designedForIndia')}
                </p>
                <p className="text-warm-600 text-sm">
                  {t('about.designedForIndiaDesc')}
                </p>
              </div>
            </div>
          </PixelCard>

          <div className="text-center mt-12">
            <PixelButton to="/features" variant="primary" size="lg">
              {t('about.exploreAllFeatures')}
            </PixelButton>
          </div>
        </div>
      </section>
    </div>
  );
}
