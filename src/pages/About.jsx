import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';

const approaches = [
  {
    icon: '🤖',
    title: 'AI-Powered Personalization',
    description:
      'Every activity is tailored to the individual. Our AI learns from your interactions, adapts difficulty in real time, and recommends activities aligned with your interests and cognitive patterns.',
  },
  {
    icon: '🇮🇳',
    title: 'Culturally Relevant',
    description:
      'Content designed specifically for Indian elderly users — familiar names, regional references, culturally appropriate themes, and support for Indian languages.',
  },
  {
    icon: '🔒',
    title: 'Privacy-First',
    description:
      'Your data belongs to you. We use end-to-end encryption, on-device processing where possible, and give you full control over what is shared and what stays private.',
  },
];

const techStack = [
  { name: 'React', desc: 'Modern responsive UI' },
  { name: 'AI / ML', desc: 'Personalization engine' },
  { name: 'Voice API', desc: 'Natural voice interaction' },
  { name: 'Tailwind CSS', desc: 'Accessible design system' },
];

const languageLabels = {
  en: 'English',
  hi: 'हिन्दी',
  bn: 'বাংলা',
};

const stats = [
  { value: '50M+', label: 'Elderly affected by cognitive decline in India' },
  { value: '70%', label: 'Have limited access to mental wellness tools' },
  { value: '3+', label: 'Indian languages supported' },
];

function PixelPatternBlock() {
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
        PIXEL PATTERN
      </div>
    </div>
  );
}

export default function About() {
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
            About
          </span>
          <h1 className="font-[family-name:var(--font-pixel)] text-xl sm:text-2xl md:text-3xl text-teal-700 leading-relaxed mb-6 tracking-wide">
            About Pixel Players
          </h1>
          <p className="text-warm-700 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Designed with care for elderly users in the North Eastern Region
          </p>
        </div>
      </section>

      {/* ===== MISSION SECTION ===== */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-3 block">
              Mission
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide mb-6">
              Our Mission
            </h2>
            <p className="text-warm-800 text-lg leading-relaxed mb-6">
              We believe every elderly individual deserves access to engaging, personalized
              tools that support cognitive wellness and daily independence. Our mission is to
              bridge the gap between AI technology and compassionate elderly care.
            </p>
            <p className="text-warm-600 text-base leading-relaxed">
              Through AI-powered personalized activities, gentle reminders, and meaningful
              social connections, we aim to help older adults maintain their cognitive abilities,
              stay engaged with life, and continue doing the things they love.
            </p>
            <Link
              to="/features"
              className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-500 hover:text-teal-700 transition-colors inline-flex items-center gap-1 mt-6"
            >
              See All Features <span className="text-[8px]">→</span>
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
              The Problem We're Solving
            </h2>
            <p className="text-warm-600 text-base max-w-2xl mx-auto">
              Cognitive decline affects millions of older adults in India, with limited access
              to engaging, culturally relevant mental wellness tools.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 items-stretch">
            {stats.map((stat) => (
              <PixelCard key={stat.label} hover className="p-8 text-center flex flex-col items-center justify-center">
                <div className="font-[family-name:var(--font-pixel)] text-3xl md:text-4xl text-teal-500 mb-4">
                  {stat.value}
                </div>
                <p className="text-warm-700 text-base leading-relaxed">
                  {stat.label}
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
              Approach
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide">
              Our Approach
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {approaches.map((item) => (
              <PixelCard key={item.title} hover pixel className="p-8 group">
                <div className="text-5xl mb-5 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </div>
                <h3 className="font-[family-name:var(--font-pixel)] text-[11px] text-teal-800 mb-3 leading-relaxed">
                  {item.title}
                </h3>
                <p className="text-warm-700 text-base leading-relaxed">
                  {item.description}
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
              Technology
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide">
              Built with Modern Technology
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
                  <p className="text-warm-500 text-sm">{tech.desc}</p>
                </PixelCard>
              ))}
            </div>

            {/* Architecture flow */}
            <PixelCard className="p-6 md:p-8">
              <h3 className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-700 mb-6 tracking-wider">
                ARCHITECTURE FLOW
              </h3>
              <div className="space-y-3">
                {[
                  { label: 'User Interface (React)', color: 'bg-teal-500' },
                  { label: 'Voice / Touch Input', color: 'bg-teal-400' },
                  { label: 'AI Personalization Engine', color: 'bg-amber-400' },
                  { label: 'Activity Recommendation', color: 'bg-teal-300' },
                  { label: 'Progress Analytics', color: 'bg-teal-600' },
                  { label: 'Secure Data Layer', color: 'bg-teal-700' },
                ].map((item, i) => (
                  <div key={item.label}>
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-sm ${item.color} flex-shrink-0`} />
                      <span className="text-warm-800 text-sm font-medium">{item.label}</span>
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
              Focus Region
            </span>
            <h2 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-teal-700 tracking-wide mb-4">
              Built for the North Eastern Region
            </h2>
            <p className="text-warm-600 text-base max-w-2xl mx-auto leading-relaxed">
              Designed with deep understanding of the diverse cultures, languages, and needs
              of elderly communities across India's North Eastern states.
            </p>
          </div>

          <PixelCard className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="font-[family-name:var(--font-pixel)] text-[11px] text-teal-800 mb-4 leading-relaxed">
                  Indian Language Support
                </h3>
                <div className="space-y-3 mb-6">
                  {[
                    { lang: 'English', native: 'EN' },
                    { lang: 'हिन्दी', native: 'HI' },
                    { lang: 'বাংলা', native: 'BN' },
                  ].map((l) => (
                    <div key={l.native} className="flex items-center gap-3">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-teal-100 border border-teal-200 font-[family-name:var(--font-pixel)] text-[9px] text-teal-700">
                        {l.native}
                      </span>
                      <span className="text-warm-800 text-base">{l.lang}</span>
                    </div>
                  ))}
                </div>
                <p className="text-warm-600 text-sm leading-relaxed">
                  More languages will be added based on community needs. Our voice-first
                  approach ensures accessibility even for users with limited literacy.
                </p>
              </div>
              <div className="bg-gradient-to-br from-teal-50 to-warm-50 rounded-2xl p-8 border border-teal-100 text-center">
                <div className="text-5xl mb-4">🇮🇳</div>
                <p className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-700 leading-relaxed mb-2">
                  DESIGNED FOR INDIA
                </p>
                <p className="text-warm-600 text-sm">
                  Culturally aware, linguistically diverse, and built with empathy for elderly Indian users.
                </p>
              </div>
            </div>
          </PixelCard>

          <div className="text-center mt-12">
            <PixelButton to="/features" variant="primary" size="lg">
              Explore All Features
            </PixelButton>
          </div>
        </div>
      </section>
    </div>
  );
}
