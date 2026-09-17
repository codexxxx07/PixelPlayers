import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';

const categoryConfig = {
  medication: { icon: '💊', label: 'Medication', labelKey: 'reminders.catMedication', color: 'bg-red-100 text-red-700 border-red-200' },
  appointment: { icon: '📋', label: 'Appointment', labelKey: 'reminders.catAppointment', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  meal: { icon: '🍽️', label: 'Meal', labelKey: 'reminders.catMeal', color: 'bg-orange-100 text-orange-700 border-orange-200' },
  hydration: { icon: '💧', label: 'Water', labelKey: 'reminders.catWater', color: 'bg-cyan-100 text-cyan-700 border-cyan-200' },
  activity: { icon: '🏃', label: 'Activity', labelKey: 'reminders.catActivity', color: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
  other: { icon: '📌', label: 'Other', labelKey: 'reminders.catOther', color: 'bg-purple-100 text-purple-700 border-purple-200' },
};

const hours = [
  '01:00', '02:00', '03:00', '04:00', '05:00', '06:00',
  '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
];

const periods = ['AM', 'PM'];
const repeats = ['Once', 'Daily', 'Weekly'];

function Toggle({ enabled, onToggle }) {
  const { t } = useTranslation();
  return (
    <button
      onClick={onToggle}
      className={`relative inline-flex h-8 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
        enabled ? 'bg-teal-500' : 'bg-gray-300'
      }`}
      aria-label={enabled ? t('reminders.disable') : t('reminders.enable')}
    >
      <span
        className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white dark:bg-[#ffffff] shadow-lg ring-0 transition duration-300 ease-in-out ${
          enabled ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
}

function getPeriodFromTime(time) {
  if (!time) return 'Morning';
  const hour = parseInt(time.split(':')[0], 10);
  const isPM = time.includes('PM');
  const hour24 = isPM ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);
  if (hour24 < 12) return 'Morning';
  if (hour24 < 17) return 'Afternoon';
  return 'Evening';
}

function formatTimeDisplay(time) {
  if (!time) return '';
  const [h, m] = time.split(':');
  const hour = parseInt(h, 10);
  const suffix = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${displayHour}:${m} ${suffix}`;
}

export default function Reminders() {
  const { reminders, toggleReminder, addReminder, deleteReminder } = useApp();
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('medication');
  const [formHour, setFormHour] = useState('08:00');
  const [formPeriod, setFormPeriod] = useState('AM');
  const [formRepeat, setFormRepeat] = useState('Daily');

  const resetForm = () => {
    setFormTitle('');
    setFormCategory('medication');
    setFormHour('08:00');
    setFormPeriod('AM');
    setFormRepeat('Daily');
  };

  const handleSave = () => {
    if (!formTitle.trim()) return;
    const time24 = (() => {
      const [h] = formHour.split(':');
      const hour = parseInt(h, 10);
      if (formPeriod === 'AM') {
        return hour === 12 ? `00:${formHour.split(':')[1]}` : formHour;
      }
      return hour === 12 ? `12:${formHour.split(':')[1]}` : `${hour + 12}:${formHour.split(':')[1]}`;
    })();
    addReminder({
      title: formTitle.trim(),
      description: formTitle.trim(),
      type: formCategory,
      icon: categoryConfig[formCategory]?.icon || '📌',
      time: time24,
      recurring: formRepeat !== 'Once',
      important: formCategory === 'medication',
    });
    resetForm();
    setShowForm(false);
  };

  const getPeriod = (reminder) => getPeriodFromTime(reminder.time);
  const morningReminders = reminders.filter((r) => getPeriod(r) === 'Morning');
  const afternoonReminders = reminders.filter((r) => getPeriod(r) === 'Afternoon');
  const eveningReminders = reminders.filter((r) => getPeriod(r) === 'Evening');

  const categoryCounts = Object.keys(categoryConfig).reduce((acc, key) => {
    acc[key] = reminders.filter((r) => r.type === key).length;
    return acc;
  }, {});

  const renderReminderGroup = (title, icon, items) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-8">
        <h3 className="font-[family-name:var(--font-pixel)] text-gray-600 text-xs mb-4 flex items-center gap-2 tracking-wide">
          <span className="text-lg">{icon}</span> {title}
        </h3>
        <div className="space-y-3">
          {items.map((reminder) => {
            const cat = categoryConfig[reminder.type] || categoryConfig.other;
            return (
              <PixelCard
                key={reminder.id}
                className={`p-5 transition-all duration-200 ${
                  !reminder.completed ? '' : 'opacity-50'
                }`}
              >
                <div className="flex items-center gap-4">
                  {/* Category icon */}
                  <div className={`flex items-center justify-center w-12 h-12 rounded-xl border text-2xl flex-shrink-0 ${cat.color}`}>
                    {cat.icon}
                  </div>

                  {/* Title + Time */}
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-medium text-base truncate">{reminder.title}</p>
                    <p className="text-gray-400 text-sm">{formatTimeDisplay(reminder.time)}</p>
                  </div>

                  {/* Toggle + Delete */}
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <Toggle
                      enabled={!reminder.completed}
                      onToggle={() => toggleReminder(reminder.id)}
                    />
                    <button
                      onClick={() => deleteReminder(reminder.id)}
                      className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 transition-colors"
                      aria-label={t('reminders.delete')}
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </PixelCard>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/30 to-white pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-[family-name:var(--font-pixel)] text-2xl md:text-4xl text-teal-700 mb-3 tracking-wide">
            {t('reminders.pageTitle')}
          </h1>
          <p className="text-gray-500 text-lg italic">
            {t('reminders.pageSubtitle')}
          </p>
        </div>

        {/* Add Reminder Button / Form */}
        {!showForm ? (
          <div className="mb-8">
            <PixelButton
              onClick={() => setShowForm(true)}
              variant="primary"
              size="lg"
              block
              icon="🔔"
            >
              {t('reminders.addNew')}
            </PixelButton>
          </div>
        ) : (
          <PixelCard className="p-6 md:p-8 mb-8 border-2 border-teal-300 shadow-lg shadow-teal-500/10">
            <h3 className="font-[family-name:var(--font-pixel)] text-teal-700 text-sm mb-6 tracking-wide">
              {t('reminders.addNew')}
            </h3>

            {/* Title */}
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-medium mb-2">{t('reminders.titleLabel')}</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder={t('reminders.titlePlaceholder')}
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700 focus:border-teal-400 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all placeholder:text-gray-300 min-h-[52px]"
              />
            </div>

            {/* Category Selector */}
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-medium mb-2">{t('reminders.categoryLabel')}</label>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {Object.entries(categoryConfig).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => setFormCategory(key)}
                    className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 text-center transition-all duration-200 min-h-[72px] ${
                      formCategory === key
                        ? 'border-teal-500 bg-teal-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <span className="text-2xl">{cat.icon}</span>
                    <span className="text-[10px] text-gray-600 font-medium">{t(cat.labelKey)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Picker */}
            <div className="mb-5">
              <label className="block text-gray-600 text-sm font-medium mb-2">{t('reminders.timeLabel')}</label>
              <div className="flex gap-3">
                <select
                  value={formHour}
                  onChange={(e) => setFormHour(e.target.value)}
                  className="flex-1 border-2 border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700 bg-white focus:border-teal-400 focus:ring-2 focus:ring-teal-200 focus:outline-none transition-all min-h-[52px]"
                >
                  {hours.map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
                <div className="flex gap-2">
                  {periods.map((p) => (
                    <button
                      key={p}
                      onClick={() => setFormPeriod(p)}
                      className={`px-5 py-3 rounded-xl border-2 text-sm font-bold transition-all duration-200 min-h-[52px] ${
                        formPeriod === p
                          ? 'border-teal-500 bg-teal-500 text-white'
                          : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Repeat Selector */}
            <div className="mb-6">
              <label className="block text-gray-600 text-sm font-medium mb-2">{t('reminders.repeatLabel')}</label>
              <div className="flex gap-2">
                {repeats.map((r) => (
                  <button
                    key={r}
                    onClick={() => setFormRepeat(r)}
                    className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 min-h-[52px] ${
                      formRepeat === r
                        ? 'border-teal-500 bg-teal-500 text-white'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <PixelButton onClick={handleSave} variant="primary" size="lg" className="flex-1" icon="💾">
                {t('reminders.save')}
              </PixelButton>
              <PixelButton
                onClick={() => { setShowForm(false); resetForm(); }}
                variant="secondary"
                size="lg"
                icon="✕"
              >
                {t('reminders.cancel')}
              </PixelButton>
            </div>
          </PixelCard>
        )}

        {/* Reminders List */}
        <div>
          {reminders.length === 0 && !showForm ? (
            <PixelCard className="p-10 text-center">
              <span className="text-5xl block mb-4">🔔</span>
              <p className="text-gray-500 text-lg">{t('reminders.empty')}</p>
            </PixelCard>
          ) : (
            <>
              {renderReminderGroup(t('reminders.groupMorning'), '🌅', morningReminders)}
              {renderReminderGroup(t('reminders.groupAfternoon'), '☀️', afternoonReminders)}
              {renderReminderGroup(t('reminders.groupEvening'), '🌙', eveningReminders)}
            </>
          )}
        </div>

        {/* Reminder Categories Overview */}
        <div className="mt-8">
          <h2 className="font-[family-name:var(--font-pixel)] text-teal-700 text-sm mb-4 tracking-wide">
            {t('reminders.reminderCategories')}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-stretch">
            {Object.entries(categoryConfig).map(([key, cat]) => (
              <PixelCard key={key} hover className="p-5 flex flex-col justify-center">
                <div className="flex items-center gap-3">
                  <span className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-xl border text-xl ${cat.color}`}>
                    {cat.icon}
                  </span>
                  <div className="min-w-0">
                    <p className="text-gray-700 text-sm font-medium leading-snug truncate">{t(cat.labelKey)}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {t('reminders.count', { count: categoryCounts[key] })}
                    </p>
                  </div>
                </div>
              </PixelCard>
            ))}
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-12 text-center">
          <PixelCard variant="inset" className="px-8 py-6 max-w-lg mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xl">🔒</span>
              <h3 className="font-[family-name:var(--font-pixel)] text-gray-600 text-xs tracking-wide">
                {t('reminders.privacyNote')}
              </h3>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed">
              {t('reminders.privacyLine1')}
            </p>
            <p className="text-gray-400 text-xs mt-2 italic">
              {t('reminders.privacyLine2')}
            </p>
          </PixelCard>
        </div>
      </div>
    </div>
  );
}
