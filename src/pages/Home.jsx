import { Fragment } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';
import RotatingText from '../components/RotatingText';

const features = [
  {
    icon: '🧠',
    titleKey: 'home.featureCognitive.title',
    descKey: 'home.featureCognitive.desc',
    to: '/games',
  },
  {
    icon: '💾',
    titleKey: 'home.featureMemory.title',
    descKey: 'home.featureMemory.desc',
    to: '/memory',
  },
  {
    icon: '🤖',
    titleKey: 'home.featureAssistant.title',
    descKey: 'home.featureAssistant.desc',
    to: '/assistant',
  },
];

const steps = [
  {
    icon: '🎤',
    titleKey: 'home.step1.title',
    descKey: 'home.step1.desc',
  },
  {
    icon: '💾',
    titleKey: 'home.step2.title',
    descKey: 'home.step2.desc',
  },
  {
    icon: '🎮',
    titleKey: 'home.step3.title',
    descKey: 'home.step3.desc',
  },
  {
    icon: '📈',
    titleKey: 'home.step4.title',
    descKey: 'home.step4.desc',
  },
];

const languageLabels = {
  en: 'home.langEnglish',
  hi: 'home.langHindi',
  bn: 'home.langBengali',
  hinglish: 'home.langHinglish',
  or: 'home.langOdia',
  as: 'home.langAssamese',
  pa: 'home.langPunjabi',
  ta: 'home.langTamil',
  te: 'home.langTelugu',
  ur: 'home.langUrdu',
  mr: 'home.langMarathi',
  gu: 'home.langGujarati',
  kn: 'home.langKannada',
  ml: 'home.langMalayalam',
};

const personalizationSteps = [
  { labelKey: 'home.personalizationLabel.user', color: 'bg-teal-600 text-white' },
  { labelKey: 'home.personalizationLabel.voiceTouch', color: 'bg-teal-100 text-teal-800 border border-teal-300' },
  { labelKey: 'home.personalizationLabel.memoryProfile', color: 'bg-teal-200 text-teal-900 border border-teal-400' },
  { labelKey: 'home.personalizationLabel.aiPersonalization', color: 'bg-amber-100 text-amber-800 border border-amber-300' },
  { labelKey: 'home.personalizationLabel.recommendedActivity', color: 'bg-teal-100 text-teal-800 border border-teal-300' },
  { labelKey: 'home.personalizationLabel.cognitiveGame', color: 'bg-teal-500 text-white' },
  { labelKey: 'home.personalizationLabel.performanceData', color: 'bg-teal-100 text-teal-800 border border-teal-300' },
  { labelKey: 'home.personalizationLabel.adaptiveDifficulty', color: 'bg-amber-50 text-amber-800 border border-amber-200' },
  { labelKey: 'home.personalizationLabel.nextActivity', color: 'bg-teal-600 text-white' },
];

const testimonials = [
  {
    quoteKey: 'home.testimonial1.quote',
    name: 'Priya Sharma',
    relationshipKey: 'home.testimonial1.relationship',
  },
  {
    quoteKey: 'home.testimonial2.quote',
    name: 'Ramesh Das',
    relationshipKey: 'home.testimonial2.relationship',
  },
  {
    quoteKey: 'home.testimonial3.quote',
    name: 'Anita Kalita',
    relationshipKey: 'home.testimonial3.relationship',
  },
];

function PixelDecor({ className = '' }) {
  return (
    <div className={`flex gap-1 ${className}`}>
      <div className="w-2 h-2 bg-teal-300 opacity-40" />
      <div className="w-1.5 h-1.5 bg-amber-300 opacity-50 mt-0.5" />
      <div className="w-2 h-2 bg-teal-400 opacity-30" />
      <div className="w-1 h-1 bg-amber-400 opacity-40 mt-1" />
      <div className="w-2 h-2 bg-teal-200 opacity-50" />
    </div>
  );
}

function PixelArrow({ className = '', variant = 'horizontal' }) {
  if (variant === 'vertical') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <div className="flex flex-col items-center">
          <div className="w-1 h-3 bg-teal-300" />
          <div className="border-x-[5px] border-x-transparent border-t-[6px] border-t-teal-400" />
        </div>
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="hidden md:flex items-center gap-0.5">
        <div className="w-3 h-1 bg-teal-300" />
        <div className="w-1 h-1 bg-teal-400" />
        <div className="border-y-[5px] border-y-transparent border-l-[6px] border-l-teal-400" />
      </div>
      <div className="md:hidden flex flex-col items-center py-1">
        <div className="w-1 h-3 bg-teal-300" />
        <div className="border-x-[5px] border-x-transparent border-t-[6px] border-t-teal-400" />
      </div>
    </div>
  );
}

export default function Home() {
  const { language } = useApp();
  const { t } = useTranslation();

  const renderStepCard = (step, i) => (
    <PixelCard className="p-6 text-center flex flex-col items-center h-full w-full min-w-0">
      <div className="w-16 h-16 shrink-0 flex items-center justify-center mb-4">
        <span className="text-4xl leading-none">{step.icon}</span>
      </div>
      <div className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-300 mb-2">
        {t('common.step')} {String(i + 1).padStart(2, '0')}
      </div>
      <h3 className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-800 mb-2 leading-relaxed">
        {t(step.titleKey)}
      </h3>
      <p className="text-warm-700 text-sm leading-relaxed">
        {t(step.descKey)}
      </p>
    </PixelCard>
  );

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-warm-50 via-white to-teal-50/40 py-20 md:py-32 px-6">
        {/* Decorative pixel elements */}
        <div className="absolute top-8 left-8 opacity-20 pointer-events-none hidden lg:block">
          <span className="font-[family-name:var(--font-pixel)] text-teal-400 text-[10px]">♥ ♥ ♥</span>
        </div>
        <div className="absolute top-16 right-12 opacity-20 pointer-events-none hidden lg:block">
          <span className="font-[family-name:var(--font-pixel)] text-amber-400 text-[10px]">★ ★ ★</span>
        </div>
        <div className="absolute bottom-24 left-16 opacity-15 pointer-events-none hidden lg:block">
          <span className="font-[family-name:var(--font-pixel)] text-teal-300 text-[8px]">■ ■ ■</span>
        </div>
        <div className="absolute bottom-32 right-20 opacity-15 pointer-events-none hidden lg:block">
          <span className="font-[family-name:var(--font-pixel)] text-amber-300 text-[8px]">♥ ★ ♥</span>
        </div>

        {/* Pixel grid background */}
        <div className="absolute inset-0 pixel-grid pointer-events-none opacity-40" />

        <div className="relative max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-teal-200 px-4 py-1.5 text-xs text-teal-700 font-[family-name:var(--font-pixel)] mb-6">
            🌐 {t(languageLabels[language] || 'home.langEnglish')}
          </span>

          <PixelDecor className="justify-center mb-8 opacity-60" />

          <h1 className="font-[family-name:var(--font-pixel)] text-xl sm:text-2xl md:text-4xl lg:text-[2.5rem] text-teal-700 leading-relaxed md:leading-relaxed mb-8 tracking-wide">
            {t('home.tagline')}{' '}
            <RotatingText
              texts={['Meaningful', 'Cherished', 'Priceless', 'Forever']}
              mainClassName="justify-center text-teal-500"
              staggerFrom="last"
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: 'spring', damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
          </h1>

          <p className="text-warm-800 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            {t('home.heroDesc')}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <PixelButton to="/games" variant="primary" size="lg">
              {t('home.exploreGames')}
            </PixelButton>
            <PixelButton to="/memory" variant="secondary" size="lg">
              {t('home.buildProfile')}
            </PixelButton>
          </div>

          {/* Flow diagram */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12">
            {['home.flow.voice', 'home.flow.memory', 'home.flow.personalizedActivity', 'home.flow.progress'].map((flowKey, i) => (
              <div key={flowKey} className="flex items-center gap-3 md:gap-4">
                <div className="skeuo-card-inset px-4 py-2.5 md:px-5 md:py-3 text-center">
                  <span className="font-[family-name:var(--font-pixel)] text-[9px] md:text-[10px] text-teal-700">
                    {t(flowKey).toUpperCase()}
                  </span>
                </div>
                {i < 3 && (
                  <div className="hidden sm:flex items-center gap-0.5">
                    <div className="w-4 h-0.5 bg-teal-300" />
                    <div className="border-y-[4px] border-y-transparent border-l-[5px] border-l-teal-400" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <PixelDecor className="justify-center opacity-40" />
        </div>

        {/* Pixel art border at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-3 flex pointer-events-none">
          <div className="flex-1 bg-teal-200" />
          <div className="flex-1 bg-teal-300" />
          <div className="flex-1 bg-teal-400" />
          <div className="flex-1 bg-teal-300" />
          <div className="flex-1 bg-amber-300" />
          <div className="flex-1 bg-teal-400" />
          <div className="flex-1 bg-teal-200" />
          <div className="flex-1 bg-teal-500" />
          <div className="flex-1 bg-teal-300" />
          <div className="flex-1 bg-amber-400" />
          <div className="flex-1 bg-teal-300" />
          <div className="flex-1 bg-teal-400" />
          <div className="flex-1 bg-teal-200" />
          <div className="flex-1 bg-teal-500" />
          <div className="flex-1 bg-amber-300" />
          <div className="flex-1 bg-teal-300" />
        </div>
      </section>

      {/* ===== QUICK FEATURES SECTION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              {t('home.featuresBadge')}
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide">
              {t('home.featuresTitle')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {features.map((feature) => (
              <PixelCard key={feature.titleKey} hover pixel className="p-8 text-center group flex flex-col">
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="card-title text-[11px] mb-3 leading-relaxed">
                  {t(feature.titleKey)}
                </h3>
                <p className="text-warm-700 text-base leading-relaxed mb-5 flex-1">
                  {t(feature.descKey)}
                </p>
                <Link
                  to={feature.to}
                  className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-500 hover:text-teal-700 transition-colors inline-flex items-center justify-center gap-1 mt-auto"
                >
                  {t('common.learnMore')}
                  <span className="text-[8px]">→</span>
                </Link>
              </PixelCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS SECTION ===== */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              {t('home.process')}
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide mb-4">
              {t('home.howItWorks')}
            </h2>
            <p className="text-warm-600 text-base max-w-2xl mx-auto">
              {t('home.howItWorksDesc')}
            </p>
          </div>

          {/* DESKTOP: 4 evenly spaced columns with centered arrows */}
          <div className="hidden lg:flex lg:items-stretch lg:gap-0">
            {steps.map((step, i) => (
              <Fragment key={step.titleKey}>
                <div className="flex-1 min-w-0">{renderStepCard(step, i)}</div>
                {i < steps.length - 1 && (
                  <div className="shrink-0 flex self-center justify-center px-1">
                    <PixelArrow />
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          {/* TABLET: 2×2 grid with centered vertical flow arrow */}
          <div className="hidden md:block lg:hidden">
            <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center mb-3">
              {renderStepCard(steps[0], 0)}
              <div className="flex self-center justify-center">
                <PixelArrow />
              </div>
              {renderStepCard(steps[1], 1)}
            </div>
            <div className="flex justify-center py-2">
              <PixelArrow variant="vertical" />
            </div>
            <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center mt-3">
              {renderStepCard(steps[2], 2)}
              <div className="flex self-center justify-center">
                <PixelArrow />
              </div>
              {renderStepCard(steps[3], 3)}
            </div>
          </div>

          {/* MOBILE: single column with vertical flow */}
          <div className="md:hidden flex flex-col items-center gap-0">
            {steps.map((step, i) => (
              <Fragment key={step.titleKey}>
                <div className="w-full max-w-sm">{renderStepCard(step, i)}</div>
                {i < steps.length - 1 && (
                  <div className="flex justify-center py-2">
                    <PixelArrow variant="vertical" />
                  </div>
                )}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PERSONALIZATION FLOW SECTION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              {t('home.intelligence')}
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide">
              {t('home.poweredByPersonalization')}
            </h2>
            <p className="text-warm-600 text-base mt-3 max-w-2xl mx-auto">
              {t('home.personalizationDesc')}
            </p>
          </div>

          {/* Loop visualization — desktop */}
          <div className="hidden lg:flex flex-wrap items-center justify-center gap-x-3 gap-y-4 mb-8">
            {personalizationSteps.map((step, i) => (
              <div key={step.labelKey} className="flex items-center gap-3">
                <div
                  className={`px-4 py-3 rounded-xl text-center min-w-[140px] transition-transform hover:scale-105 ${step.color}`}
                >
                  <span className="font-[family-name:var(--font-pixel)] text-[9px] leading-relaxed">
                    {t(step.labelKey)}
                  </span>
                </div>
                {i < personalizationSteps.length - 1 && (
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <div className="w-4 h-0.5 bg-teal-300" />
                    <div className="border-y-[4px] border-y-transparent border-l-[5px] border-l-teal-400" />
                  </div>
                )}
              </div>
            ))}
            {/* Loop-back arrow */}
            <div className="w-full flex justify-center mt-2">
              <div className="flex items-center gap-2 px-5 py-2 bg-teal-50 border border-teal-200 rounded-full">
                <span className="font-[family-name:var(--font-pixel)] text-[8px] text-teal-500">↻ {t('home.continuousLoop')}</span>
              </div>
            </div>
          </div>

          {/* Loop visualization — mobile */}
          <div className="lg:hidden flex flex-col items-center gap-2">
            {personalizationSteps.map((step, i) => (
              <div key={step.labelKey} className="contents">
                <div
                  className={`px-4 py-3 rounded-xl text-center w-full max-w-xs ${step.color}`}
                >
                  <span className="font-[family-name:var(--font-pixel)] text-[8px] leading-relaxed">
                    {t(step.labelKey)}
                  </span>
                </div>
                {i < personalizationSteps.length - 1 && (
                  <div className="flex flex-col items-center py-1">
                    <div className="w-1 h-3 bg-teal-300" />
                    <div className="border-x-[5px] border-x-transparent border-t-[6px] border-t-teal-400" />
                  </div>
                )}
              </div>
            ))}
            <div className="mt-2 px-5 py-2 bg-teal-50 border border-teal-200 rounded-full">
              <span className="font-[family-name:var(--font-pixel)] text-[8px] text-teal-500">↻ {t('home.continuousLoop')}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL / TRUST SECTION ===== */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              {t('home.trust')}
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-base md:text-lg text-teal-700 tracking-wide">
              {t('home.trustedByFamilies')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item, i) => (
              <PixelCard key={i} hover className="p-8 flex flex-col">
                <div className="font-[family-name:var(--font-pixel)] text-teal-200 text-3xl mb-4">"</div>
                <p className="text-warm-800 text-base leading-relaxed italic flex-1 mb-6">
                  {t(item.quoteKey)}
                </p>
                <div className="border-t border-warm-200 pt-4">
                  <p className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-700">
                    {item.name}
                  </p>
                  <p className="text-warm-500 text-sm mt-0.5">{t(item.relationshipKey)}</p>
                </div>
              </PixelCard>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Pixel border top */}
        <div className="absolute top-0 left-0 right-0 h-2 flex pointer-events-none">
          <div className="flex-1 bg-teal-200" />
          <div className="flex-1 bg-teal-400" />
          <div className="flex-1 bg-amber-300" />
          <div className="flex-1 bg-teal-300" />
          <div className="flex-1 bg-teal-500" />
          <div className="flex-1 bg-teal-300" />
          <div className="flex-1 bg-amber-400" />
          <div className="flex-1 bg-teal-400" />
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide mb-6">
            {t('home.ctaTitle')}
          </h2>
          <p className="text-warm-600 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            {t('home.ctaDesc')}
          </p>
          <PixelButton to="/dashboard" variant="primary" size="lg">
            {t('home.getStarted')}
          </PixelButton>
        </div>
      </section>
    </div>
  );
}
