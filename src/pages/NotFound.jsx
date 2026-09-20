import { useTranslation } from 'react-i18next';
import { PixelButton, PixelCard } from '../components/';

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="page-enter min-h-screen pb-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 py-8 md:py-16">
        <header className="text-center animate-pixel-fade-in mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-teal-100 border-2 border-teal-200 text-3xl mb-4">
            <span aria-hidden="true">🗺️</span>
          </div>
          <span className="font-pixel text-[10px] text-teal-400 tracking-widest uppercase mb-4 block">
            {t('notFound.eyebrow')}
          </span>
          <h1 className="font-pixel text-teal-700 text-lg md:text-2xl leading-relaxed tracking-wide">
            {t('notFound.title')}
          </h1>
          <p className="text-gray-500 text-base md:text-lg mt-3">
            {t('notFound.desc')}
          </p>
        </header>

        <section className="animate-slide-up stagger-1">
          <PixelCard pixel className="p-8 md:p-10 text-center">
            <div
              className="font-pixel text-6xl md:text-8xl text-teal-300 leading-none mb-3"
              aria-hidden="true"
            >
              4<span className="text-amber-400">0</span>4
            </div>
            <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
              {t('notFound.hint')}
            </p>
          </PixelCard>
        </section>

        <div className="flex flex-wrap justify-center gap-3 mt-8 animate-slide-up stagger-2">
          <PixelButton to="/" size="lg">
            {t('notFound.backHome')}
          </PixelButton>
          <PixelButton to="/games" variant="secondary" size="lg">
            {t('notFound.browseGames')}
          </PixelButton>
        </div>
      </div>
    </div>
  );
}