import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PixelCard from './PixelCard';

export default function GameCard({ game }) {
  const { t } = useTranslation();
  const detailsUrl = `/games/${game.id}`;

  return (
    <Link
      to={detailsUrl}
      aria-label={`${game.title} — ${game.shortDescription}`}
      className="group block h-full rounded-2xl min-w-0 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2"
    >
      <PixelCard pixel hover className="h-full cursor-pointer min-w-0">
        {/* Visual + title area */}
        <div className="flex items-start gap-4 mb-4 min-w-0">
          <span
            className="flex-shrink-0 w-16 h-16 rounded-2xl bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-3xl mt-0.5 group-hover:scale-110 group-hover:border-teal-300 transition-transform duration-200"
            aria-hidden="true"
          >
            {game.image}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="card-title text-teal-800 mb-2 leading-relaxed">
              {game.title}
            </h3>
            {game.category && (
              <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                {game.category}
              </span>
            )}
          </div>
        </div>

        {/* Description — grows to keep bottom area aligned */}
        <p className="text-gray-600 text-base leading-relaxed mb-5 flex-1 min-w-0">
          {game.shortDescription}
        </p>

        {/* Bottom area — CTA */}
        <div className="mt-auto pt-3 min-w-0">
          <div className="flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
            <span className="inline-flex items-center rounded-xl bg-teal-600 text-white text-sm font-bold px-4 py-2.5 group-hover:bg-teal-700 transition-colors duration-200 shadow-sm shadow-teal-900/20">
              {t('games.viewGame')}
            </span>
            <span className="inline-flex items-center gap-1 text-sm font-bold text-teal-600 opacity-60 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true">
              →
            </span>
          </div>
        </div>
      </PixelCard>
    </Link>
  );
}