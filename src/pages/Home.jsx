import { Fragment } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';

const features = [
  {
    icon: '🧠',
    title: 'Cognitive Games',
    description: 'Engaging activities designed to keep your mind active and sharp.',
    to: '/games',
  },
  {
    icon: '💾',
    title: 'Memory Profile',
    description: 'Your personal memory vault that learns and grows with you.',
    to: '/memory',
  },
  {
    icon: '🤖',
    title: 'AI Assistant',
    description: "A friendly voice that's always ready to help and guide you.",
    to: '/assistant',
  },
];

const steps = [
  {
    icon: '🎤',
    title: 'Talk to Your Companion',
    description: 'Share your thoughts, memories, and preferences through voice or text.',
  },
  {
    icon: '💾',
    title: 'Build Your Profile',
    description: 'Your companion learns about you — your hobbies, favorite things, and important memories.',
  },
  {
    icon: '🎮',
    title: 'Play & Engage',
    description: 'Enjoy personalized cognitive games and activities based on what you love.',
  },
  {
    icon: '📈',
    title: 'Track Your Progress',
    description: 'See your activity patterns and celebrate your achievements.',
  },
];

const languageLabels = {
  en: 'English',
  hi: 'हिन्दी',
  bn: 'বাংলা',
};

const personalizationSteps = [
  { label: 'USER', color: 'bg-teal-600 text-white' },
  { label: 'VOICE / TOUCH', color: 'bg-teal-100 text-teal-800 border border-teal-300' },
  { label: 'MEMORY PROFILE', color: 'bg-teal-200 text-teal-900 border border-teal-400' },
  { label: 'AI PERSONALIZATION', color: 'bg-amber-100 text-amber-800 border border-amber-300' },
  { label: 'RECOMMENDED ACTIVITY', color: 'bg-teal-100 text-teal-800 border border-teal-300' },
  { label: 'COGNITIVE GAME', color: 'bg-teal-500 text-white' },
  { label: 'PERFORMANCE DATA', color: 'bg-teal-100 text-teal-800 border border-teal-300' },
  { label: 'ADAPTIVE DIFFICULTY', color: 'bg-amber-50 text-amber-800 border border-amber-200' },
  { label: 'NEXT ACTIVITY', color: 'bg-teal-600 text-white' },
];

const testimonials = [
  {
    quote: "My mother looks forward to her daily games now. It's become a part of her routine and she genuinely enjoys it.",
    name: 'Priya Sharma',
    relationship: 'Daughter of user',
  },
  {
    quote: "The memory profile feature helps me remember names and stories I thought I'd lost. It feels like talking to a caring friend.",
    name: 'Ramesh Das',
    relationship: 'Platform user, age 72',
  },
  {
    quote: "As a caregiver, the progress tracking gives me peace of mind. I can see that my father is staying engaged every day.",
    name: 'Anita Kalita',
    relationship: 'Caregiver, Guwahati',
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

  const renderStepCard = (step, i) => (
    <PixelCard className="p-6 text-center flex flex-col items-center h-full w-full min-w-0">
      <div className="w-16 h-16 shrink-0 flex items-center justify-center mb-4">
        <span className="text-4xl leading-none">{step.icon}</span>
      </div>
      <div className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-300 mb-2">
        STEP {String(i + 1).padStart(2, '0')}
      </div>
      <h3 className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-800 mb-2 leading-relaxed">
        {step.title}
      </h3>
      <p className="text-warm-700 text-sm leading-relaxed">
        {step.description}
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
            🌐 {languageLabels[language] || 'English'}
          </span>

          <PixelDecor className="justify-center mb-8 opacity-60" />

          <h1 className="font-[family-name:var(--font-pixel)] text-xl sm:text-2xl md:text-4xl lg:text-[2.5rem] text-teal-700 leading-relaxed md:leading-relaxed mb-8 tracking-wide">
            Helping Memories Stay{' '}
            <span className="text-teal-500">Meaningful</span>
          </h1>

          <p className="text-warm-800 text-lg md:text-xl max-w-3xl mx-auto mb-12 leading-relaxed">
            An AI-powered cognitive and daily-life companion that helps elderly users stay
            engaged, remember meaningful moments, follow routines, and maintain independence.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
            <PixelButton to="/games" variant="primary" size="lg">
              Explore Games
            </PixelButton>
            <PixelButton to="/memory" variant="secondary" size="lg">
              Build My Memory Profile
            </PixelButton>
          </div>

          {/* Flow diagram */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-12">
            {['Voice', 'Memory', 'Personalized Activity', 'Progress'].map((step, i) => (
              <div key={step} className="flex items-center gap-3 md:gap-4">
                <div className="skeuo-card-inset px-4 py-2.5 md:px-5 md:py-3 text-center">
                  <span className="font-[family-name:var(--font-pixel)] text-[9px] md:text-[10px] text-teal-700">
                    {step.toUpperCase()}
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
              Features
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide">
              Your Personal Cognitive Companion
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {features.map((feature) => (
              <PixelCard key={feature.title} hover pixel className="p-8 text-center group flex flex-col">
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-200">
                  {feature.icon}
                </div>
                <h3 className="card-title text-[11px] mb-3 leading-relaxed">
                  {feature.title}
                </h3>
                <p className="text-warm-700 text-base leading-relaxed mb-5 flex-1">
                  {feature.description}
                </p>
                <Link
                  to={feature.to}
                  className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-500 hover:text-teal-700 transition-colors inline-flex items-center justify-center gap-1 mt-auto"
                >
                  Learn More
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
              Process
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide mb-4">
              How It Works
            </h2>
            <p className="text-warm-600 text-base max-w-2xl mx-auto">
              Four simple steps to a more engaged, personalized experience.
            </p>
          </div>

          {/* DESKTOP: 4 evenly spaced columns with centered arrows */}
          <div className="hidden lg:flex lg:items-stretch lg:gap-0">
            {steps.map((step, i) => (
              <Fragment key={step.title}>
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
              <Fragment key={step.title}>
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
              Intelligence
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide">
              Powered by Personalization
            </h2>
            <p className="text-warm-600 text-base mt-3 max-w-2xl mx-auto">
              Our AI loop continuously learns from you, adapting every activity to your unique cognitive patterns and interests.
            </p>
          </div>

          {/* Loop visualization — desktop */}
          <div className="hidden lg:flex flex-wrap items-center justify-center gap-x-3 gap-y-4 mb-8">
            {personalizationSteps.map((step, i) => (
              <div key={step.label} className="flex items-center gap-3">
                <div
                  className={`px-4 py-3 rounded-xl text-center min-w-[140px] transition-transform hover:scale-105 ${step.color}`}
                >
                  <span className="font-[family-name:var(--font-pixel)] text-[9px] leading-relaxed">
                    {step.label}
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
                <span className="font-[family-name:var(--font-pixel)] text-[8px] text-teal-500">↻ CONTINUOUS LOOP</span>
              </div>
            </div>
          </div>

          {/* Loop visualization — mobile */}
          <div className="lg:hidden flex flex-col items-center gap-2">
            {personalizationSteps.map((step, i) => (
              <div key={step.label} className="contents">
                <div
                  className={`px-4 py-3 rounded-xl text-center w-full max-w-xs ${step.color}`}
                >
                  <span className="font-[family-name:var(--font-pixel)] text-[8px] leading-relaxed">
                    {step.label}
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
              <span className="font-[family-name:var(--font-pixel)] text-[8px] text-teal-500">↻ CONTINUOUS LOOP</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIAL / TRUST SECTION ===== */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              Trust
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-base md:text-lg text-teal-700 tracking-wide">
              Trusted by families across the North Eastern Region
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <PixelCard key={i} hover className="p-8 flex flex-col">
                <div className="font-[family-name:var(--font-pixel)] text-teal-200 text-3xl mb-4">"</div>
                <p className="text-warm-800 text-base leading-relaxed italic flex-1 mb-6">
                  {t.quote}
                </p>
                <div className="border-t border-warm-200 pt-4">
                  <p className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-700">
                    {t.name}
                  </p>
                  <p className="text-warm-500 text-sm mt-0.5">{t.relationship}</p>
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
            Ready to Start Your Journey?
          </h2>
          <p className="text-warm-600 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Join thousands of families who are using Pixel Players to support cognitive wellness and daily independence.
          </p>
          <PixelButton to="/dashboard" variant="primary" size="lg">
            Get Started
          </PixelButton>
        </div>
      </section>
    </div>
  );
}
