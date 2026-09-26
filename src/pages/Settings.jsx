import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { PixelCard, PixelButton } from '../components/';
import { useRole } from '../auth/useRole';

const LANG_STORAGE_KEY = 'pixelplayers-language';

const languages = [
  { code: 'en', flag: '🇬🇧', name: 'English', native: 'English' },
  { code: 'hi', flag: '🇮🇳', name: 'Hindi', native: 'हिन्दी' },
  { code: 'bn', flag: '🇧🇩', name: 'Bengali', native: 'বাংলা' },
  { code: 'hinglish', flag: '🇮🇳', name: 'Hinglish', native: 'Hinglish' },
  { code: 'or', flag: '🇮🇳', name: 'Odia', native: 'ଓଡ଼ିଆ' },
  { code: 'as', flag: '🇮🇳', name: 'Assamese', native: 'অসমীয়া' },
  { code: 'pa', flag: '🇮🇳', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'ta', flag: '🇮🇳', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', flag: '🇮🇳', name: 'Telugu', native: 'తెలుగు' },
  { code: 'ur', flag: '🇵🇰', name: 'Urdu', native: 'اردو' },
  { code: 'mr', flag: '🇮🇳', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', flag: '🇮🇳', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', flag: '🇮🇳', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', flag: '🇮🇳', name: 'Malayalam', native: 'മലയാളം' },
];

const textSizes = [
  { id: 'normal', labelKey: 'settings.textSizeNormal' },
  { id: 'large', labelKey: 'settings.textSizeLarge' },
  { id: 'extraLarge', labelKey: 'settings.textSizeExtraLarge' },
];

const privacyCards = [
  {
    icon: '💾',
    titleKey: 'settings.dataStorage',
    descKey: 'settings.dataStorageDesc',
  },
  {
    icon: '🖼️',
    titleKey: 'settings.memorySharing',
    descKey: 'settings.memorySharingDesc',
  },
  {
    icon: '📍',
    titleKey: 'settings.location',
    descKey: 'settings.locationDesc',
  },
  {
    icon: '📊',
    titleKey: 'settings.analytics',
    descKey: 'settings.analyticsDesc',
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
        className={`relative inline-flex h-12 w-20 shrink-0 items-center rounded-full p-1 transition-colors duration-200 ${
          checked ? 'bg-teal-500' : 'bg-gray-300'
        }`}
      >
        <span
          className={`inline-block h-9 w-9 rounded-full bg-white dark:bg-[#ffffff] shadow-md transition-transform duration-200 ${
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
      <h2 className="font-pixel text-teal-700 text-sm mb-1 tracking-wide">
        {title}
      </h2>
      {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
    </div>
  );
}

export default function Settings() {
  const { user, settings, updateSettings } = useApp();
  const { t, i18n: activeI18n } = useTranslation();
  const { role } = useRole();
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const changeLanguage = (code) => {
    activeI18n.changeLanguage(code);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, code);
    } catch {
      /* storage unavailable */
    }
    updateSettings({ language: code });
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50/60 via-warm-50 to-white pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        <div data-pp-reveal="pixel" className="text-center mb-10">
          <h1 className="font-pixel text-2xl md:text-4xl text-teal-700 mb-3 tracking-wide">
            {t('settings.title')}
          </h1>
          <p className="text-gray-600 text-lg">{t('settings.subtitle')}</p>
        </div>

        <section data-pp-reveal="rise" className="mb-12">
          <SectionHeading title={t('settings.language')} subtitle={t('settings.languageDesc')} />
          <div className="grid sm:grid-cols-3 gap-4">
            {languages.map((language) => {
              const isActive = activeI18n.language === language.code;
              return (
                <button
                  key={language.code}
                  type="button"
                  onClick={() => changeLanguage(language.code)}
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

        <section data-pp-reveal="rise" className="mb-12">
          <SectionHeading title={t('settings.accessibility')} subtitle={t('settings.accessibilityDesc')} />

          <PixelCard className="p-6 md:p-7 mb-5">
            <h3 className="font-pixel text-gray-600 text-xs mb-4 tracking-wide">
              {t('settings.textSize')}
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
                    <span className="block font-bold text-base leading-snug">{t(size.labelKey)}</span>
                  </button>
                );
              })}
            </div>
          </PixelCard>

          <PixelCard className="p-6 md:p-7 mb-5">
            <h3 className="font-pixel text-gray-600 text-xs mb-4 tracking-wide">
              {t('settings.voice')}
            </h3>
            <div className="space-y-4">
              <Toggle
                checked={settings.voiceEnabled ?? true}
                onChange={(value) => updateSettings({ voiceEnabled: value })}
                label={t('settings.voiceGuidance')}
                description={t('settings.voiceGuidanceDesc')}
              />
              <Toggle
                checked={settings.voiceInput ?? true}
                onChange={(value) => updateSettings({ voiceInput: value })}
                label={t('settings.voiceInput')}
                description={t('settings.voiceInputDesc')}
              />
              <Toggle
                checked={settings.readAloud ?? false}
                onChange={(value) => updateSettings({ readAloud: value })}
                label={t('settings.readResponsesAloud')}
                description={t('settings.readResponsesAloudDesc')}
              />
            </div>
          </PixelCard>

          <PixelCard className="p-6 md:p-7">
            <h3 className="font-pixel text-gray-600 text-xs mb-4 tracking-wide">
              {t('settings.display')}
            </h3>
            <div className="space-y-4">
              <Toggle
                checked={settings.highContrast ?? false}
                onChange={(value) => updateSettings({ highContrast: value })}
                label={t('settings.highContrastMode')}
                description={t('settings.highContrastModeDesc')}
              />
              <Toggle
                checked={settings.reduceAnimations ?? false}
                onChange={(value) => updateSettings({ reduceAnimations: value })}
                label={t('settings.reduceAnimations')}
                description={t('settings.reduceAnimationsDesc')}
              />
              <Toggle
                checked={settings.largeIcons ?? true}
                onChange={(value) => updateSettings({ largeIcons: value })}
                label={t('settings.largeIcons')}
                description={t('settings.largeIconsDesc')}
              />
            </div>
          </PixelCard>
        </section>

        <section data-pp-reveal="rise" className="mb-12">
          <SectionHeading title={t('settings.notifications')} subtitle={t('settings.notificationsDesc')} />
          <div className="space-y-4">
            <Toggle
              checked={settings.activityReminders ?? true}
              onChange={(value) => updateSettings({ activityReminders: value })}
              label={t('settings.activityReminders')}
              description={t('settings.activityRemindersDesc')}
            />
            <Toggle
              checked={settings.medicationReminders ?? true}
              onChange={(value) => updateSettings({ medicationReminders: value })}
              label={t('settings.medicationReminders')}
              description={t('settings.medicationRemindersDesc')}
            />
            <Toggle
              checked={settings.routineNotifications ?? true}
              onChange={(value) => updateSettings({ routineNotifications: value })}
              label={t('settings.routineNotifications')}
              description={t('settings.routineNotificationsDesc')}
            />
            <Toggle
              checked={settings.progressUpdates ?? true}
              onChange={(value) => updateSettings({ progressUpdates: value })}
              label={t('settings.progressUpdates')}
              description={t('settings.progressUpdatesDesc')}
            />
            <Toggle
              checked={settings.supportNetworkUpdates ?? true}
              onChange={(value) => updateSettings({ supportNetworkUpdates: value })}
              label={t('settings.supportNetworkUpdates')}
              description={t('settings.supportNetworkUpdatesDesc')}
            />
          </div>
        </section>

        <section data-pp-reveal="rise" className="mb-12">
          <SectionHeading title={t('settings.privacy')} subtitle={t('settings.privacyDesc')} />
          <div className="grid sm:grid-cols-2 gap-4 mb-6 items-stretch">
            {privacyCards.map((card) => (
              <PixelCard key={card.titleKey} className="p-5 flex-row items-start gap-4">
                <span className="text-3xl shrink-0">{card.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block text-warm-800 text-base font-bold">{t(card.titleKey)}</span>
                  <span className="block text-gray-500 text-sm mt-1 leading-relaxed">
                    {t(card.descKey)}
                  </span>
                </span>
              </PixelCard>
            ))}
          </div>

          <PixelCard className="p-6 mb-5">
            <Toggle
              checked={settings.shareAnonymousData ?? false}
              onChange={(value) => updateSettings({ shareAnonymousData: value })}
              label={t('settings.shareAnonymous')}
              description={t('settings.shareAnonymousDesc')}
            />
          </PixelCard>

          <div className="flex flex-col sm:flex-row gap-4">
            <PixelButton variant="primary" size="lg" block>
              {t('settings.downloadMyData')}
            </PixelButton>

            {deleteConfirm ? (
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                <PixelButton
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                  onClick={() => setDeleteConfirm(false)}
                >
                  {t('settings.cancel')}
                </PixelButton>
                <button
                  type="button"
                  onClick={() => {
                    setDeleteConfirm(false);
                  }}
                  className="font-pixel uppercase rounded-xl bg-red-600 text-white text-xs tracking-wide px-6 py-3 border-2 border-red-800 shadow-[0_4px_0_#7f1d1d] transition-transform duration-100 hover:bg-red-700 active:translate-y-1 active:shadow-none"
                >
                  {t('settings.deleteEverything')}
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setDeleteConfirm(true)}
                className="font-pixel uppercase rounded-xl bg-red-500 text-white text-xs tracking-wide px-6 py-3 border-2 border-red-700 shadow-[0_4px_0_#991b1b] transition-transform duration-100 hover:bg-red-600 active:translate-y-1 active:shadow-none"
              >
                {t('settings.deleteAllMyData')}
              </button>
            )}
          </div>
          {deleteConfirm && (
            <p className="text-red-600 text-sm mt-3 font-semibold">
              {t('settings.deleteConfirmText')}
            </p>
          )}
        </section>

        <section data-pp-reveal="rise" className="mb-12">
          <SectionHeading title={t('settings.account')} subtitle={t('settings.signedInAs', { name: user.name })} />
          <PixelCard className="p-6 flex-row items-center gap-4 mb-5">
            <div className="shrink-0 flex items-center justify-center w-20 h-20 rounded-full bg-linear-to-br from-teal-400 to-teal-600 text-3xl font-extrabold text-white">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-pixel text-[11px] text-teal-800 leading-relaxed">
                {user.name}
              </p>
              <p className="text-gray-500 text-base mt-1">{t('settings.ageYears', { age: user.age })}</p>
            </div>
          </PixelCard>
          <div className="grid sm:grid-cols-3 gap-4">
            <PixelButton variant="secondary" size="lg" block>
              {t('settings.editProfile')}
            </PixelButton>
            <PixelButton variant="secondary" size="lg" block>
              {t('settings.changePassword')}
            </PixelButton>
            <PixelButton variant="secondary" size="lg" block>
              {t('settings.signOut')}
            </PixelButton>
          </div>
        </section>

        <section data-pp-reveal="rise" className="mb-12">
          <SectionHeading title={t('settings.experience')} subtitle={t('settings.experienceDesc')} />
          <PixelCard className="p-6 flex-row flex-wrap items-center justify-between gap-4">
            <span className="min-w-0">
              <span className="block text-warm-800 text-base font-bold">{t('settings.currentExperience')}</span>
              <span className="block text-gray-500 text-sm mt-1">
                {role === 'caregiver' ? t('settings.experienceCaregiverValue') : t('settings.experienceValue')}
              </span>
            </span>
            <PixelButton
              variant="secondary"
              size="lg"
              to="/welcome"
              block
              className="sm:w-auto"
              aria-label={t('settings.switchExperience')}
            >
              {t('settings.switchExperience')}
            </PixelButton>
          </PixelCard>
        </section>

        <section data-pp-reveal="rise" className="mb-8">
          <SectionHeading title={t('settings.about')} />
          <PixelCard className="p-6 text-center">
            <p className="font-pixel text-teal-700 text-sm mb-2 tracking-wide">
              Pixel Players
            </p>
            <p className="text-gray-500 text-sm mb-1">{t('settings.version')}</p>
            <p className="text-warm-700 text-base leading-relaxed mb-3">
              {t('settings.builtWithCare')}
            </p>
            <span className="inline-flex items-center gap-2 rounded-full bg-teal-50 border border-teal-200 px-4 py-1.5 text-xs text-teal-700 mb-5">
              {t('settings.sihBadge')}
            </span>
            <div className="flex flex-wrap justify-center gap-6 border-t border-warm-200 pt-5">
              <Link to="/settings" className="text-teal-600 text-base hover:text-teal-800 underline underline-offset-4">
                {t('settings.privacyPolicy')}
              </Link>
              <Link to="/about" className="text-teal-600 text-base hover:text-teal-800 underline underline-offset-4">
                {t('settings.termsOfService')}
              </Link>
              <Link to="/support" className="text-teal-600 text-base hover:text-teal-800 underline underline-offset-4">
                {t('settings.contactUs')}
              </Link>
            </div>
          </PixelCard>
        </section>
      </div>
    </div>
  );
}
