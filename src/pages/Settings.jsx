import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { PixelCard, PixelButton } from '../components/';

const languages = [
  { code: 'en', flag: '🇬🇧', name: 'English', native: 'English' },
  { code: 'hi', flag: '🇮🇳', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', flag: '🇧🇩', name: 'Bengali', native: 'বাংলা' },
];

const textSizes = [
  { id: 'normal', label: 'Normal' },
  { id: 'large', label: 'Large' },
  { id: 'extraLarge', label: 'Extra Large' },
];

const privacyCards = [
  {
    icon: '💾',
    title: 'Data Storage',
    description: 'All your data is stored locally on your device.',
  },
  {
    icon: '🖼️',
    title: 'Memory Sharing',
    description: 'You control who can see your memories.',
  },
  {
    icon: '📍',
    title: 'Location',
    description: 'Location services are disabled by default.',
  },
  {
    icon: '📊',
    title: 'Analytics',
    description: 'Anonymous usage data helps us improve.',
  },
];

function Toggle({ checked, onChange, label, description }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between w-full gap-4 rounded-2xl border-2 border-warm-200 bg-white px-5 py-4 text-left transition-all duration-200 hover:border-teal-300"
    >
      <span className="min-w-0">
        <span className="block text-lg text-warm-800 font-semibold leading-snug">{label}</span>
        {description && (
          <span className="block text-sm text-gray-500 mt-1 leading-relaxed">{description}</span>
        )}
      </span>
      <span
        className={`relative inline-flex h-12 w-20 flex-shrink-0 items-center rounded-full p-1 transition-colors duration-200 ${
          checked ? 'bg-teal-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-9 w-9 rounded-full bg-white shadow-md transition-transform duration-200 ${
            checked ? 'translate-x-9' : 'translate-x-0'
          }`}
        />
      </span>
    </button>
  );
}

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-5">
      <h2 className="font-[family-name:var(--font-pixel)] text-teal-700 text-sm mb-1 tracking-wide">
        {title}
      </h2>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
    </div>
  );
}

export default function Settings() {
  const { user, settings, updateSettings } = useApp();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50/60 via-warm-50 to-white pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-pixel)] text-2xl md:text-4xl text-teal-700 mb-3 tracking-wide">
            Settings
          </h1>
          <p className="text-gray-600 text-lg">Customize your experience</p>
        </div>

        <section className="mb-12">
          <SectionHeading title="Language" subtitle="Choose the language you feel most comfortable with" />
          <div className="grid sm:grid-cols-3 gap-4">
            {languages.map((language) => {
              const isActive = settings.language === language.code;
              return (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => updateSettings({ language: language.code })}
                  aria-pressed={isActive}
                  className={`relative flex items-center gap-4 rounded-2xl border-[3px] px-5 py-6 text-left transition-all duration-200 ${
                    isActive
                      ? 'border-teal-500 bg-teal-50 shadow-lg shadow-teal-900/10'
                      : 'border-warm-200 bg-white hover:border-teal-300'
                  }`}
                >
                  <span className="text-4xl">{language.flag}</span>
                  <span>
                    <span className={`block text-xl font-bold ${isActive ? 'text-teal-800' : 'text-warm-800'}`}>
                      {language.name}
                    </span>
                    <span className={`block text-base mt-0.5 ${isActive ? 'text-teal-600' : 'text-gray-500'}`}>
                      {language.native}
                    </span>
                  </span>
                  {isActive && (
                    <span className="absolute top-3 right-3 flex items-center justify-center w-8 h-8 rounded-full bg-teal-500 text-white text-lg">
                      ✓
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        <section className="mb-12">
          <SectionHeading title="Accessibility" subtitle="Large, easy-to-use controls designed for comfort" />

          <PixelCard className="p-6 md:p-7 mb-5">
            <h3 className="font-[family-name:var(--font-pixel)] text-gray-600 text-xs mb-4 tracking-wide">
              Text Size
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {textSizes.map((size) => {
                const isActive = (settings.textSize || 'large') === size.id;
                return (
                  <button
                    key={size.id}
                    type="button"
                    onClick={() => updateSettings({ textSize: size.id })}
                    aria-pressed={isActive}
                    className={`rounded-xl border-2 px-4 py-5 text-center transition-all duration-200 ${
                      isActive
                        ? 'border-teal-500 bg-teal-500 text-white shadow-md shadow-teal-500/25'
                        : 'border-warm-200 bg-white text-warm-700 hover:border-teal-300'
                    }`}
                  >
                    <span className="block font-bold text-base leading-snug">{size.label}</span>
                  </button>
                );
              })}
            </div>
          </PixelCard>

          <PixelCard className="p-6 md:p-7 mb-5">
            <h3 className="font-[family-name:var(--font-pixel)] text-gray-600 text-xs mb-4 tracking-wide">
              Voice Settings
            </h3>
            <div className="space-y-4">
              <Toggle
                checked={settings.voiceEnabled ?? true}
                onChange={(value) => updateSettings({ voiceEnabled: value })}
                label="Voice Guidance"
                description="Guided reading and spoken instructions"
              />
              <Toggle
                checked={settings.voiceInput ?? true}
                onChange={(value) => updateSettings({ voiceInput: value })}
                label="Voice Input"
                description="Speak instead of typing"
              />
              <Toggle
                checked={settings.readAloud ?? false}
                onChange={(value) => updateSettings({ readAloud: value })}
                label="Read Responses Aloud"
                description="Hear your answers read back to you"
              />
            </div>
          </PixelCard>

          <PixelCard className="p-6 md:p-7">
            <h3 className="font-[family-name:var(--font-pixel)] text-gray-600 text-xs mb-4 tracking-wide">
              Display
            </h3>
            <div className="space-y-4">
              <Toggle
                checked={settings.highContrast ?? false}
                onChange={(value) => updateSettings({ highContrast: value })}
                label="High Contrast Mode"
                description="Stronger colours for easier reading"
              />
              <Toggle
                checked={settings.reduceAnimations ?? false}
                onChange={(value) => updateSettings({ reduceAnimations: value })}
                label="Reduce Animations"
                description="Calmer, steadier screen movement"
              />
              <Toggle
                checked={settings.largeIcons ?? true}
                onChange={(value) => updateSettings({ largeIcons: value })}
                label="Large Icons"
                description="Bigger buttons and symbols everywhere"
              />
            </div>
          </PixelCard>
        </section>

        <section className="mb-12">
          <SectionHeading title="Notifications" subtitle="Choose which gentle reminders you would like to receive" />
          <div className="space-y-4">
            <Toggle
              checked={settings.activityReminders ?? true}
              onChange={(value) => updateSettings({ activityReminders: value })}
              label="Activity Reminders"
              description="Nudges to play today's games"
            />
            <Toggle
              checked={settings.medicationReminders ?? true}
              onChange={(value) => updateSettings({ medicationReminders: value })}
              label="Medication Reminders"
              description="Time to take your tablets"
            />
            <Toggle
              checked={settings.routineNotifications ?? true}
              onChange={(value) => updateSettings({ routineNotifications: value })}
              label="Routine Notifications"
              description="Updates for your daily routine"
            />
            <Toggle
              checked={settings.progressUpdates ?? true}
              onChange={(value) => updateSettings({ progressUpdates: value })}
              label="Progress Updates"
              description="Weekly summaries of your achievements"
            />
            <Toggle
              checked={settings.supportNetworkUpdates ?? true}
              onChange={(value) => updateSettings({ supportNetworkUpdates: value })}
              label="Support Network Updates"
              description="Activity from your trusted people"
            />
          </div>
        </section>

        <section className="mb-12">
          <SectionHeading title="Privacy & Data" subtitle="Your data belongs to you, always" />
          <div className="grid sm:grid-cols-2 gap-4 mb-6 items-stretch">
            {privacyCards.map((card) => (
              <PixelCard key={card.title} className="p-5 flex-row items-start gap-4">
                <span className="text-3xl flex-shrink-0">{card.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-warm-800 text-base font-bold">{card.title}</span>
                  <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                    {card.description}
                  </span>
                </span>
              </PixelCard>
            ))}
          </div>

          <PixelCard className="p-6 mb-5">
            <Toggle
              checked={settings.shareAnonymousData ?? false}
              onChange={(value) => updateSettings({ shareAnonymousData: value })}
              label="Share anonymous usage data"
              description="Helps us improve without ever identifying you"
            />
          </PixelCard>

          <div className="flex flex-col sm:flex-row gap-4">
            <PixelButton variant="primary" size="lg" block>
              Download My Data
            </PixelButton>

            {deleteConfirm ? (
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <PixelButton
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                  onClick={() => setDeleteConfirm(false)}
                >
                  Cancel
                </PixelButton>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteConfirm(false);
                  }}
                  className="font-[family-name:var(--font-pixel)] uppercase rounded-xl bg-red-600 text-white text-xs tracking-wide px-6 py-3 border-2 border-red-800 shadow-[0_4px_0_#7f1d1d] transition-transform duration-100 hover:bg-red-700 active:translate-y-1 active:shadow-none"
                >
                  Yes, Delete Everything
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setDeleteConfirm(true)}
                className="font-[family-name:var(--font-pixel)] uppercase rounded-xl bg-red-500 text-white text-xs tracking-wide px-6 py-3 border-2 border-red-700 shadow-[0_4px_0_#991b1b] transition-transform duration-100 hover:bg-red-600 active:translate-y-1 active:shadow-none"
              >
                Delete All My Data
              </button>
            )}
          </div>
          {deleteConfirm && (
            <p className="text-red-600 text-sm mt-3 font-semibold">
              This removes all memories, progress, and personal information from this device.
              Please confirm below to continue.
            </p>
          )}
        </section>

        <section className="mb-12">
          <SectionHeading title="Account" subtitle={`Signed in as ${user.name}`} />
          <PixelCard className="p-6 flex-row items-center gap-4 mb-5">
            <div className="flex-shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 text-3xl font-extrabold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-[family-name:var(--font-pixel)] text-[11px] text-teal-800 leading-relaxed">
                {user.name}
              </p>
              <p className="text-gray-500 text-base mt-1">Age: {user.age} years</p>
            </div>
          </PixelCard>
          <div className="grid sm:grid-cols-3 gap-4">
            <PixelButton variant="secondary" size="lg" block>
              Edit Profile
            </PixelButton>
            <PixelButton variant="secondary" size="lg" block>
              Change Password
            </PixelButton>
            <PixelButton variant="secondary" size="lg" block>
              Sign Out
            </PixelButton>
          </div>
        </section>

        <section className="mb-8">
          <SectionHeading title="About Pixel Players" />
          <PixelCard className="p-6 text-center">
            <p className="font-[family-name:var(--font-pixel)] text-teal-700 text-sm mb-2 tracking-wide">
              Pixel Players
            </p>
            <p className="text-gray-500 text-sm mb-1">Version: 1.0.0</p>
            <p className="text-warm-700 text-base leading-relaxed mb-3">
              Built with care for the North Eastern Region
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200 px-4 py-1.5 text-xs text-teal-700 mb-5">
              🏆 Smart India Hackathon 2026
            </span>
            <div className="flex flex-wrap justify-center gap-6 border-t border-warm-200 pt-5">
              <Link to="/settings" className="text-teal-600 text-base hover:text-teal-800 underline underline-offset-4">
                Privacy Policy
              </Link>
              <Link to="/about" className="text-teal-600 text-base hover:text-teal-800 underline underline-offset-4">
                Terms of Service
              </Link>
              <Link to="/support" className="text-teal-600 text-base hover:text-teal-800 underline underline-offset-4">
                Contact Us
              </Link>
            </div>
          </PixelCard>
        </section>
      </div>
    </div>
  );
}