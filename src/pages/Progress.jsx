import { useMemo } from "react";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { PixelButton, PixelCard, ProgressCard } from "../components/";

const CATEGORY_MIX = [
  { labelKey: "progress.catMemory", pct: 35, color: "bg-blue-400", dot: "bg-blue-400" },
  { labelKey: "progress.catAttention", pct: 25, color: "bg-amber-400", dot: "bg-amber-400" },
  { labelKey: "progress.catReasoning", pct: 20, color: "bg-purple-400", dot: "bg-purple-400" },
  { labelKey: "progress.catLanguage", pct: 15, color: "bg-emerald-400", dot: "bg-emerald-400" },
  { labelKey: "progress.catOther", pct: 5, color: "bg-gray-300", dot: "bg-gray-300" },
];

const FAVORITE_PLAYS = [
  { id: "picture-recall", plays: 18, accuracy: 91 },
  { id: "memory-cards", plays: 12, accuracy: 88 },
  { id: "word-association", plays: 10, accuracy: 84 },
];

const ACHIEVEMENTS = [
  { icon: "🏆", titleKey: "progress.achFirst", descKey: "progress.achFirstDesc", completed: true },
  { icon: "🔥", titleKey: "progress.achStreak", descKey: "progress.achStreakDesc", completed: true },
  { icon: "🧠", titleKey: "progress.achMemory", descKey: "progress.achMemoryDesc", completed: false },
  { icon: "📅", titleKey: "progress.achWeek", descKey: "progress.achWeekDesc", completed: false },
  { icon: "🎯", titleKey: "progress.achPerfect", descKey: "progress.achPerfectDesc", completed: false },
];

function SectionTitle({ icon, children }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="text-xl leading-none" aria-hidden="true">{icon}</span>
      <h2 className="font-[family-name:var(--font-pixel)] text-teal-700 text-xs md:text-sm tracking-wider">
        {children}
      </h2>
    </div>
  );
}

export default function Progress() {
  const { progressData, games } = useApp();
  const { t } = useTranslation();

  const weeklyData = progressData.weeklyData ?? [];
  const maxGames = Math.max(1, ...weeklyData.map((day) => day.games));

  const favoriteGames = useMemo(
    () =>
      FAVORITE_PLAYS.map((favorite) => {
        const game = games.find((item) => item.id === favorite.id);
        return {
          id: favorite.id,
          name: game?.name ?? t("progress.unknownActivity"),
          category: game?.category ?? t("progress.general"),
          icon: game?.icon ?? "🎮",
          ...favorite,
        };
      }),
    [games, t]
  );

  return (
    <div className="page-enter min-h-screen pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10 space-y-12">

        {/* ========== PAGE HEADER ========== */}
        <header className="text-center animate-pixel-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-600 shadow-lg shadow-teal-600/25 mb-4 animate-gentle-bounce">
            <span className="text-3xl" aria-hidden="true">📈</span>
          </div>
          <h1 className="font-[family-name:var(--font-pixel)] text-teal-800 text-lg md:text-2xl mb-3">
            {t('progress.pageTitle')}
          </h1>
          <p className="text-gray-500 text-base md:text-lg mb-4">
            {t('progress.pageSubtitle')}
          </p>
          <p className="inline-block text-xs md:text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-4 py-2">
            {t('progress.disclaimer')}
          </p>
        </header>

        {/* ========== OVERALL STATS ========== */}
        <section className="animate-slide-up stagger-1">
          <SectionTitle icon="🧮">{t('progress.overallStats')}</SectionTitle>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
            <ProgressCard label={t('progress.totalGames')} value={progressData.gamesCompleted} icon="🎮" trend="up" color="teal" />
            <ProgressCard label={t('progress.avgAccuracy')} value={progressData.accuracy} unit="%" icon="🎯" trend="up" color="emerald" />
            <ProgressCard label={t('progress.avgResponse')} value={progressData.avgResponseTime} icon="⏱️" color="blue" />
            <ProgressCard label={t('progress.currentStreak')} value={progressData.streak} unit={t('common.days')} icon="🔥" trend="stable" color="amber" />
          </div>
        </section>

        {/* ========== WEEKLY ACTIVITY CHART ========== */}
        <section className="animate-slide-up stagger-2">
          <SectionTitle icon="📊">{t('progress.weeklyActivity')}</SectionTitle>
          <PixelCard variant="elevated" className="p-6">
            <p className="text-sm font-bold text-gray-700 mb-6">
              {t('progress.weeklySubtitle')}
            </p>
            <div className="h-44 flex items-end gap-3 md:gap-4">
              {weeklyData.map((day) => (
                <div
                  key={day.day}
                  className="flex-1 h-full flex flex-col items-center justify-end gap-1.5 min-w-0"
                >
                  <span className="text-xs font-bold text-teal-800">{day.games}</span>
                  <div
                    className="w-full max-w-[44px] min-h-[6px] rounded-t-md bg-gradient-to-t from-teal-600 via-teal-400 to-teal-300 shadow-inner transition-all duration-500"
                    style={{ height: `${(day.games / maxGames) * 100}%` }}
                    title={t('progress.chartGamesTitle', { day: day.day, games: day.games })}
                  />
                  <span className="text-[11px] font-semibold text-gray-500">{day.day}</span>
                </div>
              ))}
            </div>
          </PixelCard>
        </section>

        {/* ========== ACCURACY TREND ========== */}
        <section className="animate-slide-up stagger-3">
          <SectionTitle icon="🎯">{t('progress.accuracyTrend')}</SectionTitle>
          <PixelCard variant="elevated" className="p-6">
            <p className="text-sm font-bold text-gray-700 mb-6">
              {t('progress.accuracySubtitle')}
            </p>
            <div className="h-40 flex items-end gap-3 md:gap-4">
              {weeklyData.map((day) => (
                <div
                  key={day.day}
                  className="flex-1 h-full flex flex-col items-center justify-end gap-1.5 min-w-0"
                >
                  <span className="text-[11px] font-bold text-emerald-600">{day.accuracy}%</span>
                  <div
                    className="w-full max-w-[44px] min-h-[6px] rounded-t-md bg-gradient-to-t from-emerald-600 via-emerald-400 to-emerald-300 shadow-inner transition-all duration-500"
                    style={{ height: `${day.accuracy}%` }}
                    title={t('progress.chartAccuracyTitle', { day: day.day, accuracy: day.accuracy })}
                  />
                  <span className="text-[11px] font-semibold text-gray-500">{day.day}</span>
                </div>
              ))}
            </div>
          </PixelCard>
        </section>

        {/* ========== CATEGORY BREAKDOWN ========== */}
        <section className="animate-slide-up stagger-4">
          <SectionTitle icon="🧩">{t('progress.activityMix')}</SectionTitle>
          <PixelCard variant="elevated" className="p-6">
            <p className="text-sm font-bold text-gray-700 mb-5">
              {t('progress.activityMixSubtitle')}
            </p>

            <div className="h-7 rounded-full overflow-hidden flex bg-gray-100 border border-gray-200 mb-6">
              {CATEGORY_MIX.map((category) => (
                <div
                  key={category.labelKey}
                  className={category.color}
                  style={{ width: `${category.pct}%` }}
                  title={t('progress.mixLabel', { label: t(category.labelKey), pct: category.pct })}
                />
              ))}
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-3">
              {CATEGORY_MIX.map((category) => (
                <div key={category.labelKey} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-sm ${category.dot}`} aria-hidden="true" />
                  <span className="text-sm font-semibold text-gray-700">{t(category.labelKey)}</span>
                  <span className="text-sm text-gray-500">{category.pct}%</span>
                </div>
              ))}
            </div>
          </PixelCard>
        </section>

        {/* ========== FAVORITE ACTIVITIES ========== */}
        <section className="animate-slide-up stagger-5">
          <SectionTitle icon="⭐">{t('progress.favorites')}</SectionTitle>
          <div className="space-y-3">
            {favoriteGames.map((favorite, index) => (
              <PixelCard key={favorite.id} hover className="p-5">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-2xl">
                    <span aria-hidden="true">{favorite.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-[family-name:var(--font-pixel)] text-[9px] text-amber-600">
                        #{index + 1}
                      </span>
                      <h3 className="font-semibold text-gray-800 text-lg leading-snug">
                        {favorite.name}
                      </h3>
                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                        {favorite.category}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {t('progress.playedTimes', { count: favorite.plays })}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <p className="font-[family-name:var(--font-pixel)] text-emerald-600 text-sm">
                      {favorite.accuracy}%
                    </p>
                    <p className="text-[11px] text-gray-400">{t('progress.avgAccuracyLabel')}</p>
                  </div>
                </div>
              </PixelCard>
            ))}
          </div>
        </section>

        {/* ========== ACHIEVEMENTS ========== */}
        <section className="animate-slide-up stagger-6">
          <SectionTitle icon="🏅">{t('progress.achievements')}</SectionTitle>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 items-stretch">
            {ACHIEVEMENTS.map((achievement) => (
              <div
                key={achievement.titleKey}
                className={`relative rounded-2xl p-5 text-center border-2 flex flex-col items-center transition-all duration-200 ${
                  achievement.completed
                    ? "bg-gradient-to-b from-amber-50 to-amber-100 border-amber-300 shadow-md shadow-amber-900/5"
                    : "bg-gray-50 border-gray-200 opacity-80"
                }`}
              >
                <span
                  className={`text-4xl block mb-3 ${achievement.completed ? "animate-gentle-bounce" : "grayscale opacity-50"}`}
                  aria-hidden="true"
                >
                  {achievement.icon}
                </span>
                <p
                  className={`font-[family-name:var(--font-pixel)] text-[9px] mb-2 ${
                    achievement.completed ? "text-amber-700" : "text-gray-400"
                  }`}
                >
                  {t(achievement.titleKey)}
                </p>
                <p className={`text-xs leading-relaxed flex-1 ${achievement.completed ? "text-amber-800/80" : "text-gray-400"}`}>
                  {t(achievement.descKey)}
                </p>

                <span
                  className={`inline-flex items-center gap-1 mt-3 rounded-full px-3 py-1 text-[11px] font-bold border ${
                    achievement.completed
                      ? "bg-emerald-100 text-emerald-700 border-emerald-300"
                      : "bg-gray-200 text-gray-500 border-gray-300"
                  }`}
                >
                  {achievement.completed ? t('progress.completedLabel') : t('progress.lockedLabel')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ========== MEDICAL DISCLAIMER ========== */}
        <section className="animate-slide-up">
          <div className="rounded-2xl border-l-4 border-amber-400 bg-amber-50/60 border border-amber-200 p-6">
            <div className="flex items-start gap-4">
              <span className="text-2xl flex-shrink-0" aria-hidden="true">⚠️</span>
              <div>
                <h3 className="font-[family-name:var(--font-pixel)] text-[10px] text-amber-700 mb-2">
                  {t('progress.important')}
                </h3>
                <p className="text-amber-800 text-base leading-relaxed">
                  {t('progress.disclaimerText')}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <PixelButton to="/games" size="lg">
              {t('progress.continue')}
            </PixelButton>
          </div>
        </section>

      </div>
    </div>
  );
}