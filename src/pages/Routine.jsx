import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import PixelCard from '../components/PixelCard';
import PixelButton from '../components/PixelButton';
import RoutineCard from '../components/RoutineCard';

function getGreetingKey() {
  const hour = new Date().getHours();
  if (hour < 12) return 'common.goodMorning';
  if (hour < 17) return 'common.goodAfternoon';
  return 'common.goodEvening';
}

function getTodayDate() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getCurrentActivityIndex(routine) {
  let lastCompleted = -1;
  for (let i = 0; i < routine.length; i++) {
    if (routine[i].completed) {
      lastCompleted = i;
    }
  }
  const nextIndex = lastCompleted + 1;
  if (nextIndex < routine.length) return nextIndex;
  return routine.length > 0 ? routine.length - 1 : -1;
}

const tomorrowActivities = [
  { time: '08:30', titleKey: 'routine.tomorrowBreakfast', icon: '🥣' },
  { time: '09:30', titleKey: 'routine.tomorrowCognitive', icon: '🧠' },
  { time: '12:30', titleKey: 'routine.tomorrowLunch', icon: '🍲' },
  { time: '17:00', titleKey: 'routine.tomorrowWalk', icon: '🚶‍♀️' },
];

export default function Routine() {
  const { routine, user } = useApp();
  const { t } = useTranslation();

  const completedCount = routine.filter((a) => a.completed).length;
  const totalCount = routine.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const currentIndex = getCurrentActivityIndex(routine);
  const currentActivity = currentIndex >= 0 ? routine[currentIndex] : null;

  return (
    <div className="min-h-screen bg-linear-to-b from-teal-50/50 to-white pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 md:pt-12">
        {/* Page Header */}
        <div className="text-center mb-10">
          <h1 className="font-pixel text-2xl md:text-4xl text-teal-700 mb-2 tracking-wide">
            {t(getGreetingKey())}{user.name ? `, ${user.name}` : ""}
          </h1>
          <p className="text-gray-500 text-lg font-pixel text-[11px] tracking-wider mb-1">
            {getTodayDate()}
          </p>
          <p className="text-gray-400 text-sm italic">
            {t('routine.todaysPlan')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left: Timeline + Current Activity */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Activity Highlight */}
            {currentActivity && (
              <PixelCard className="p-6 md:p-8 border-2 border-teal-400 bg-linear-to-br from-teal-50 to-white shadow-lg shadow-teal-500/10">
                <div className="text-center">
                  <span className="text-6xl block mb-4">{currentActivity.icon}</span>
                  <h2 className="font-pixel text-teal-700 text-base md:text-lg mb-1">
                    {currentActivity.title}
                  </h2>
                  <p className="text-teal-600 text-sm mb-3">{currentActivity.time}</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="inline-flex h-3 w-3 rounded-full bg-teal-500 animate-pulse" />
                    <span className="font-pixel text-teal-600 text-[10px] tracking-wide">
                      {t('routine.happeningNow')}
                    </span>
                  </div>
                  <p className="text-emerald-600 text-sm mt-4 font-medium italic">
                    {t('routine.doingGreat')}
                  </p>
                </div>
              </PixelCard>
            )}

            {/* Today's Timeline */}
            <div>
              <h2 className="font-pixel text-teal-700 text-sm mb-6 tracking-wide">
                {t('routine.todaysTimeline')}
              </h2>
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-5.75 top-0 bottom-0 w-0.5 bg-teal-200" />

                <div className="space-y-3">
                  {routine.map((activity, index) => (
                    <div key={activity.id} className="relative flex items-start gap-4">
                      {/* Timeline dot */}
                      <div className="relative z-10 mt-5 shrink-0">
                        {activity.completed ? (
                          <div className="flex items-center justify-center w-4.5 h-4.5 rounded-full bg-emerald-500 border-2 border-emerald-400">
                            <span className="text-white text-[10px] font-bold">✓</span>
                          </div>
                        ) : index === currentIndex ? (
                          <div className="relative flex items-center justify-center w-4.5 h-4.5">
                            <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-40 animate-ping" />
                            <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-teal-500 border-2 border-teal-600" />
                          </div>
                        ) : (
                          <div className="w-4.5 h-4.5 rounded-full bg-gray-200 border-2 border-gray-300" />
                        )}
                      </div>

                      {/* Routine Card */}
                      <div className="flex-1">
                        <RoutineCard
                          activity={{
                            ...activity,
                            current: index === currentIndex,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Progress + Quick Actions + Tomorrow */}
          <div className="space-y-6">
            {/* Progress Summary */}
            <PixelCard className="p-6">
              <h3 className="font-pixel text-teal-700 text-xs mb-4 tracking-wide">
                {t('routine.todaysProgress')}
              </h3>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-5 mb-4 overflow-hidden border border-gray-200">
                <div
                  className="h-full rounded-full bg-linear-to-r from-teal-400 to-emerald-500 transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 text-sm font-medium">
                  {t('routine.activitiesCompleted', { done: completedCount, total: totalCount })}
                </span>
                <span className="font-pixel text-teal-600 text-sm">
                  {progressPercent}%
                </span>
              </div>

              {progressPercent === 100 ? (
                <p className="text-emerald-600 text-sm text-center font-medium italic mt-2">
                  {t('routine.allDone', { name: user.name })}
                </p>
              ) : (
                <p className="text-gray-400 text-xs text-center italic mt-2">
                  {t('routine.keepGoing')}
                </p>
              )}
            </PixelCard>

            {/* Quick Actions */}
            <PixelCard className="p-6">
              <h3 className="font-pixel text-teal-700 text-xs mb-4 tracking-wide">
                {t('routine.adjustRoutine')}
              </h3>
              <div className="space-y-3">
                <PixelButton variant="primary" size="lg" block icon="➕">
                  {t('routine.addActivity')}
                </PixelButton>
                <PixelButton variant="secondary" size="lg" block icon="⏭️">
                  {t('routine.skipActivity')}
                </PixelButton>
                <PixelButton variant="secondary" size="lg" block icon="📅">
                  {t('routine.viewWeeklySchedule')}
                </PixelButton>
              </div>
            </PixelCard>

            {/* Tomorrow Preview */}
            <PixelCard className="p-6">
              <h3 className="font-pixel text-teal-700 text-xs mb-4 tracking-wide">
                {t('routine.tomorrowsHighlights')}
              </h3>
              <div className="space-y-3">
                {tomorrowActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-teal-50/50 border border-teal-100"
                  >
                    <span className="text-2xl">{activity.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-700 text-sm font-medium leading-snug">{t(activity.titleKey)}</p>
                      <p className="text-gray-400 text-xs">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <PixelButton variant="secondary" size="sm" block className="mt-4" icon="📋">
                {t('routine.viewFullSchedule')}
              </PixelButton>
            </PixelCard>
          </div>
        </div>
      </div>
    </div>
  );
}
