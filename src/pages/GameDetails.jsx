import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { GAMES } from '../games/games';
import PixelCard from '../components/PixelCard';

export default function GameDetails() {
  const { gameId } = useParams();
  const { t } = useTranslation();
  const game = GAMES.find((item) => item.id === gameId);

  if (!game) {
    return (
      <main className="page-enter min-h-screen pb-16">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 md:py-12">
          <div className="text-center animate-pixel-fade-in">
            <div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 border-2 border-gray-200 text-3xl mb-4"
              aria-hidden="true"
            >
              🎮
            </div>
            <h1 className="font-[family-name:var(--font-pixel)] text-teal-700 text-lg md:text-2xl leading-relaxed tracking-wide">
              {t('games.gameNotFound')}
            </h1>
            <p className="text-gray-600 text-lg mt-3 leading-relaxed">
              {t('games.gameNotFoundDesc')}
            </p>
          </div>
          <div className="text-center mt-8">
            <Link
              to="/games"
              className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-b from-teal-500 to-teal-600 text-white text-lg font-bold px-8 py-4 border-2 border-teal-700 shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_4px_0_#134e4a] hover:brightness-105 active:translate-y-1 active:shadow-[0_1px_0_#134e4a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/70 focus-visible:ring-offset-2 transition-all"
            >
              {t('games.backToGames')}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page-enter min-h-screen pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 md:py-10 min-w-0">
        <article className="space-y-8">

          {/* Back navigation */}
          <nav aria-label={t('games.backToGames')}>
            <Link
              to="/games"
              className="inline-flex items-center gap-2 rounded-xl bg-white border-2 border-teal-200 text-teal-700 text-base font-bold px-4 py-2.5 hover:bg-teal-50 hover:border-teal-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2 transition-colors"
            >
              <span aria-hidden="true">←</span>
              {t('games.backToGames')}
            </Link>
          </nav>

          {/* Header */}
          <header className="animate-pixel-fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <span
                className="flex-shrink-0 w-20 h-20 rounded-2xl bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-5xl"
                aria-hidden="true"
              >
                {game.image}
              </span>
              <div className="min-w-0">
                <h1 className="font-[family-name:var(--font-pixel)] text-teal-800 text-lg md:text-2xl leading-relaxed tracking-wide mb-3">
                  {game.title}
                </h1>
                {game.category && (
                  <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    {game.category}
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed mt-5 max-w-2xl">
              {game.shortDescription}
            </p>
          </header>

          {/* How This Helps */}
          <section aria-labelledby="how-this-helps-heading" className="animate-slide-up stagger-1">
            <PixelCard className="p-6 md:p-8">
              <h2
                id="how-this-helps-heading"
                className="font-[family-name:var(--font-pixel)] text-teal-700 text-xs md:text-sm mb-4 tracking-wide"
              >
                {t('games.howThisHelps')}
              </h2>
              <ul className="space-y-3">
                {game.dementiaBenefit.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 min-w-0">
                    <span
                      className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 border border-teal-200 text-teal-700 text-sm"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-gray-700 text-base md:text-lg leading-relaxed min-w-0">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </PixelCard>
          </section>

          {/* How to Play */}
          <section aria-labelledby="how-to-play-heading" className="animate-slide-up stagger-2">
            <PixelCard className="p-6 md:p-8">
              <h2
                id="how-to-play-heading"
                className="font-[family-name:var(--font-pixel)] text-teal-700 text-xs md:text-sm mb-4 tracking-wide"
              >
                {t('games.howToPlay')}
              </h2>
              <ol className="space-y-3">
                {game.howToPlay.map((step, index) => (
                  <li key={step} className="flex items-start gap-3 min-w-0">
                    <span
                      className="flex-shrink-0 mt-0.5 inline-flex items-center justify-center w-9 h-9 rounded-xl bg-amber-100 border border-amber-200 text-amber-700 font-black"
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span className="text-gray-700 text-base md:text-lg leading-relaxed min-w-0">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </PixelCard>
          </section>

          {/* Why This Activity? */}
          <section aria-labelledby="why-this-activity-heading" className="animate-slide-up stagger-3">
            <PixelCard className="p-6 md:p-8">
              <h2
                id="why-this-activity-heading"
                className="font-[family-name:var(--font-pixel)] text-teal-700 text-xs md:text-sm mb-4 tracking-wide"
              >
                {t('games.whyThisActivity')}
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed min-w-0">
                {game.whyThisActivity}
              </p>
            </PixelCard>
          </section>

          {/* Play Game */}
          <div className="text-center animate-slide-up stagger-4">
            <a
              href={game.gameUrl}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-b from-teal-500 to-teal-600 text-white text-xl font-bold px-10 py-5 min-h-16 border-2 border-teal-700 shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_4px_0_#134e4a] hover:brightness-105 active:translate-y-1 active:shadow-[0_1px_0_#134e4a] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/70 focus-visible:ring-offset-2 transition-all w-full sm:w-auto"
            >
              <span aria-hidden="true">🎮</span>
              {t('games.playGame')}
            </a>
          </div>

          {/* Gentle note */}
          <p className="text-xs text-gray-400 text-center leading-relaxed animate-slide-up stagger-5">
            {t('games.medicalNote')}
          </p>

        </article>
      </div>
    </main>
  );
}