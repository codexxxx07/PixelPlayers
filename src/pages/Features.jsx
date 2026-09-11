import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';

const features = [
  {
    icon: '🎮',
    title: 'Cognitive Games',
    description:
      'Engaging activities across Memory, Attention, Reasoning, Language, Recognition, and Daily-life categories. Personalized to your interests and difficulty level.',
    to: '/games',
  },
  {
    icon: '💾',
    title: 'Personal Memory Profile',
    description:
      'Build a rich profile of your memories, preferences, hobbies, and important people through simple conversations.',
    to: '/memory',
  },
  {
    icon: '🤖',
    title: 'Voice-First AI Companion',
    description:
      'Talk naturally to your companion. Ask questions, get guidance, or just have a friendly conversation.',
    to: '/assistant',
  },
  {
    icon: '🎯',
    title: 'Adaptive Activities',
    description:
      'Games and activities that adapt to your performance, keeping them challenging but never frustrating.',
    to: '/games',
  },
  {
    icon: '📅',
    title: 'Daily Routine Companion',
    description:
      'A gentle guide through your daily activities, helping you stay on track with your routine.',
    to: '/routine',
  },
  {
    icon: '⏰',
    title: 'Smart Reminders',
    description:
      'Timely reminders for medications, meals, activities, and appointments.',
    to: '/reminders',
  },
  {
    icon: '🧭',
    title: 'Orientation Assistance',
    description:
      "Help with knowing what time it is, what day it is, and what's happening around you.",
    to: '/assistant',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Trusted Support Network',
    description:
      'Connect with family, friends, or caregivers who can check in on your progress.',
    to: '/support',
  },
  {
    icon: '📈',
    title: 'Progress Awareness',
    description:
      'See your activity patterns and celebrate your consistency and achievements.',
    to: '/progress',
  },
  {
    icon: '🇮🇳',
    title: 'Indian Language Support',
    description:
      'Available in English, Hindi, and Bengali. Designed for Indian elderly users.',
    to: null,
  },
  {
    icon: '🔒',
    title: 'Privacy & Security',
    description:
      'Your memories and data are protected. You control what\'s shared and what stays private.',
    to: null,
  },
  {
    icon: '🆘',
    title: 'SOS / Help Support',
    description:
      'Quick access to emergency contacts and help when you need it most.',
    to: null,
  },
];

const languageLabels = {
  en: 'English',
  hi: 'हिन्दी',
  bn: 'বাংলা',
};

const comparisonData = [
  {
    aspect: 'Personalization',
    traditional: 'One-size-fits-all activities',
    pixelCompanion: 'AI adapts to your unique cognitive patterns',
  },
  {
    aspect: 'Language',
    traditional: 'English only',
    pixelCompanion: 'English, Hindi, Bengali and more',
  },
  {
    aspect: 'Engagement',
    traditional: 'Generic paper-based exercises',
    pixelCompanion: 'Interactive games with familiar themes',
  },
  {
    aspect: 'Tracking',
    traditional: 'Manual notes by caregiver',
    pixelCompanion: 'Automatic progress insights and alerts',
  },
  {
    aspect: 'Accessibility',
    traditional: 'Requires fine motor skills / reading',
    pixelCompanion: 'Voice-first, large touch targets',
  },
  {
    aspect: 'Companionship',
    traditional: 'No daily interaction support',
    pixelCompanion: 'Friendly AI companion available 24/7',
  },
];

export default function Features() {
  const { language } = useApp();

  return (
    <div className="min-h-screen">
      {/* ===== PAGE HEADER ===== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-warm-50 to-teal-50/30 py-20 md:py-28 px-6">
        <div className="absolute inset-0 pixel-grid pointer-events-none opacity-30" />
        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white border-2 border-teal-200 px-4 py-1.5 text-xs text-teal-700 font-[family-name:var(--font-pixel)] mb-6">
            🌐 {languageLabels[language] || 'English'}
          </span>
          <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-4 block">
            Features
          </span>
          <h1 className="font-[family-name:var(--font-pixel)] text-xl sm:text-2xl md:text-3xl text-teal-700 leading-relaxed mb-6 tracking-wide">
            Everything You Need
          </h1>
          <p className="text-warm-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            A complete cognitive wellness companion
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
                  <h3 className="font-[family-name:var(--font-pixel)] text-[11px] text-teal-800 mb-3 leading-relaxed">
                    {feature.title}
                  </h3>
                  <p className="text-warm-700 text-base leading-relaxed flex-1">
                    {feature.description}
                  </p>
                  {feature.to && (
                    <div className="mt-5 pt-4 border-t border-warm-100">
                      <Link
                        to={feature.to}
                        className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-500 hover:text-teal-700 transition-colors inline-flex items-center gap-1"
                      >
                        Explore
                        <span className="text-[8px]">→</span>
                      </Link>
                    </div>
                  )}
                </PixelCard>
              );

              return feature.to ? (
                <Link key={feature.title} to={feature.to} className="block h-full">
                  {CardContent}
                </Link>
              ) : (
                <div key={feature.title} className="h-full">{CardContent}</div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== COMPARISON SECTION ===== */}
      <section className="py-20 px-6 bg-warm-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              Why Us
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide">
              Why Pixel Players?
            </h2>
          </div>

          {/* Desktop comparison table */}
          <div className="hidden md:block">
            <PixelCard className="overflow-hidden">
              {/* Header row */}
              <div className="grid grid-cols-3 border-b-2 border-warm-200">
                <div className="p-5 bg-warm-100">
                  <span className="font-[family-name:var(--font-pixel)] text-[10px] text-warm-600 tracking-wider">
                    ASPECT
                  </span>
                </div>
                <div className="p-5 bg-warm-50 border-l border-warm-200">
                  <span className="font-[family-name:var(--font-pixel)] text-[10px] text-warm-500 tracking-wider">
                    TRADITIONAL TOOLS
                  </span>
                </div>
                <div className="p-5 bg-teal-50 border-l border-warm-200">
                  <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-700 tracking-wider">
                    PIXEL COMPANION
                  </span>
                </div>
              </div>

              {/* Data rows */}
              {comparisonData.map((row, i) => (
                <div
                  key={row.aspect}
                  className={`grid grid-cols-3 ${
                    i < comparisonData.length - 1 ? 'border-b border-warm-100' : ''
                  }`}
                >
                  <div className="p-5">
                    <span className="font-[family-name:var(--font-pixel)] text-[9px] text-warm-800 leading-relaxed">
                      {row.aspect.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-5 border-l border-warm-100">
                    <span className="text-warm-500 text-sm line-through decoration-warm-300">
                      {row.traditional}
                    </span>
                  </div>
                  <div className="p-5 border-l border-warm-100 bg-teal-50/50">
                    <span className="text-teal-800 text-sm font-medium">
                      {row.pixelCompanion}
                    </span>
                  </div>
                </div>
              ))}
            </PixelCard>
          </div>

          {/* Mobile comparison cards */}
          <div className="md:hidden space-y-4">
            {comparisonData.map((row) => (
              <PixelCard key={row.aspect} className="p-5">
                <div className="font-[family-name:var(--font-pixel)] text-[9px] text-teal-600 mb-3 tracking-wider">
                  {row.aspect.toUpperCase()}
                </div>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-warm-400 text-sm mt-0.5">✗</span>
                    <span className="text-warm-500 text-sm line-through decoration-warm-300">
                      {row.traditional}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-teal-500 text-sm mt-0.5">✓</span>
                    <span className="text-teal-800 text-sm font-medium">
                      {row.pixelCompanion}
                    </span>
                  </div>
                </div>
              </PixelCard>
            ))}
          </div>

          <div className="text-center mt-12">
            <PixelButton to="/dashboard" variant="primary" size="lg">
              Get Started Today
            </PixelButton>
          </div>
        </div>
      </section>
    </div>
  );
}
