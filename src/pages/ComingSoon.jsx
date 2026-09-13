import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useTranslation } from 'react-i18next';
import { PixelButton, PixelCard } from '../components/';

export default function ComingSoon() {
  const { games } = useApp();
  const { t } = useTranslation();
  const location = useLocation();
  const slug = location.pathname.split('/').filter(Boolean).pop() || '';
  const game = games.find((item) => item.id === slug);

  return (
    <div className="page-enter min-h-screen pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 md:py-12">
        <header className="text-center animate-pixel-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-100 border-2 border-gray-200 text-3xl mb-4">
            <span aria-hidden="true">{game ? game.icon : '🎮'}</span>
          </div>
          <h1 className="font-[family-name:var(--font-pixel)] text-teal-700 text-lg md:text-2xl leading-relaxed tracking-wide">
            {game ? game.name : t('comingSoon.titleFallback')}
          </h1>
          <p className="text-gray-500 text-base md:text-lg mt-3">
            {game ? game.description : t('comingSoon.descFallback')}
          </p>
        </header>

        <section className="animate-slide-up stagger-1 mt-8">
          <PixelCard pixel className="p-6 md:p-8 text-center">
            <div className="text-5xl mb-4 animate-gentle-bounce" aria-hidden="true">
              🛠️
            </div>
            <h2 className="font-[family-name:var(--font-pixel)] text-amber-600 text-sm mb-3 tracking-wide">
              {t('comingSoon.comingSoon')}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
              {game
                ? t('comingSoon.preparing', { name: game.name })
                : t('comingSoon.notGame')}
            </p>
            {game && (
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {game.difficulty && (
                  <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600">
                    {game.difficulty} • {game.duration}
                  </span>
                )}
                {game.category && (
                  <span className="inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                    {game.category}
                  </span>
                )}
              </div>
            )}
          </PixelCard>
        </section>

        <div className="text-center mt-8 animate-slide-up stagger-2">
          <PixelButton to="/games" size="lg">
            {t('comingSoon.backToGames')}
          </PixelButton>
        </div>
      </div>
    </div>
  );
}