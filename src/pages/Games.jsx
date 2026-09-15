import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import GameCard from '../components/GameCard';

const CATEGORIES = [
  { key: 'All', labelKey: 'games.categoryAll', icon: '🎮' },
  { key: 'Memory', labelKey: 'games.categoryMemory', icon: '🧠' },
  { key: 'Attention', labelKey: 'games.categoryAttention', icon: '👁️' },
  { key: 'Reasoning', labelKey: 'games.categoryReasoning', icon: '🧩' },
  { key: 'Language', labelKey: 'games.categoryLanguage', icon: '💬' },
  { key: 'Recognition', labelKey: 'games.categoryRecognition', icon: '🏷️' },
  { key: 'Daily-life', labelKey: 'games.categoryDaily', icon: '📅' },
];

const HOW_HELP_BENEFITS = [
  {
    icon: '🧠',
    titleKey: 'games.howHelpMemory.title',
    textKey: 'games.howHelpMemory.text',
  },
  {
    icon: '🎯',
    titleKey: 'games.howHelpFocus.title',
    textKey: 'games.howHelpFocus.text',
  },
  {
    icon: '🌱',
    titleKey: 'games.howHelpAccomplished.title',
    textKey: 'games.howHelpAccomplished.text',
  },
];

export default function Games() {
  const { games } = useApp();
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredGames =
    activeCategory === 'All'
      ? games
      : games.filter((game) => game.category === activeCategory);

  return (
    <div className="page-enter min-h-screen pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10 space-y-10">
        {/* ========== HEADER ========== */}
        <header className="text-center animate-pixel-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-100 border-2 border-teal-200 text-3xl mb-4 shadow-sm">
            <span aria-hidden="true">🎮</span>
          </div>
          <h1 className="font-[family-name:var(--font-pixel)] text-teal-700 text-lg md:text-2xl leading-relaxed tracking-wide">
            {t('games.title')}
          </h1>
          <p className="text-gray-500 text-base md:text-lg mt-3 max-w-xl mx-auto">
            {t('games.subtitle')}
          </p>
        </header>

        {/* ========== CATEGORY FILTER BAR ========== */}
        <section className="animate-slide-up stagger-1">
          <div className="flex gap-3 overflow-x-auto pb-3 px-1 -mx-1 snap-x">
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  aria-pressed={active}
                  className={`snap-start flex-shrink-0 inline-flex items-center gap-2 min-h-12 px-4 md:px-5 rounded-full border-2 font-[family-name:var(--font-pixel)] text-[9px] md:text-[10px] uppercase tracking-wider transition-all duration-200 ${
                    active
                      ? 'bg-teal-600 border-teal-600 text-white shadow-md shadow-teal-900/20 scale-[1.02]'
                      : 'bg-white border-teal-200 text-teal-700 hover:border-teal-400 hover:bg-teal-50'
                  }`}
                >
                  <span className="text-base leading-none" aria-hidden="true">
                    {cat.icon}
                  </span>
                  {t(cat.labelKey)}
                </button>
              );
            })}
          </div>
        </section>

        {/* ========== GAMES GRID ========== */}
        <section className="animate-slide-up stagger-2">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 animate-pixel-fade-in">
              <div className="text-6xl mb-4" aria-hidden="true">
                🍃
              </div>
              <p className="font-[family-name:var(--font-pixel)] text-teal-700 text-xs mb-3">
                {t('games.noGamesTitle')}
              </p>
              <p className="text-gray-500 text-base mb-6">
                {t('games.noGamesDesc')}
              </p>
              <button
                type="button"
                onClick={() => setActiveCategory('All')}
                className="inline-flex items-center gap-2 min-h-12 px-6 rounded-full border-2 border-teal-300 bg-teal-50 text-teal-700 font-bold text-sm hover:bg-teal-100 hover:border-teal-400 transition-colors"
              >
                🎮 {t('games.showAll')}
              </button>
            </div>
          )}
        </section>

        {/* ========== HOW GAMES HELP ========== */}
        <section className="animate-slide-up stagger-3">
          <div className="skeuo-card bg-gradient-to-br from-teal-50 to-white">
            <h2 className="font-[family-name:var(--font-pixel)] text-teal-700 text-xs mb-2 tracking-wide">
              {t('games.howGamesHelp')}
            </h2>
            <p className="text-gray-500 text-base mb-6">
              {t('games.howGamesHelpDesc')}
            </p>
            <div className="grid sm:grid-cols-3 gap-5 items-stretch">
              {HOW_HELP_BENEFITS.map((benefit) => (
                <div
                  key={benefit.titleKey}
                  className="rounded-2xl bg-white/70 border border-teal-100 p-6 text-center flex flex-col items-center"
                >
                  <div className="w-14 h-14 flex items-center justify-center text-3xl rounded-2xl bg-teal-50 border border-teal-100 mb-4" aria-hidden="true">
                    {benefit.icon}
                  </div>
                  <h3 className="font-bold text-gray-800 text-base mb-2 leading-snug">
                    {t(benefit.titleKey)}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {t(benefit.textKey)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-6 text-center leading-relaxed">
              {t('games.medicalNote')}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}