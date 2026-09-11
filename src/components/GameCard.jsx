import { Link } from 'react-router-dom';
import PixelCard from './PixelCard';

export default function GameCard({ game }) {
  return (
    <Link
      to={game.href}
      className="group block h-full rounded-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-400/60 focus-visible:ring-offset-2"
    >
      <PixelCard hover pixel className="h-full cursor-pointer">
        {/* Visual + title area */}
        <div className="flex items-start gap-4 mb-4">
          <span
            className="flex-shrink-0 w-14 h-14 rounded-xl bg-teal-50 border-2 border-teal-200 flex items-center justify-center text-3xl mt-0.5 group-hover:scale-110 group-hover:border-teal-300 transition-transform duration-200"
            aria-hidden="true"
          >
            {game.icon}
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="card-title mb-2 leading-relaxed">
              {game.name}
            </h3>
            {game.category && (
              <span className="inline-flex items-center text-[10px] font-semibold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                {game.category}
              </span>
            )}
          </div>
        </div>

        {/* Description — grows to keep bottom area aligned */}
        <p className="text-gray-600 text-sm leading-relaxed mb-3 flex-1">
          {game.description}
        </p>
        {game.skillTarget && (
          <p className="text-xs text-teal-600 font-semibold mb-4">
            <span aria-hidden="true">🧠 </span>
            {game.skillTarget}
          </p>
        )}

        {/* Bottom area — metadata + CTA */}
        <div className="mt-auto pt-3">
          {game.difficulty && game.duration && (
            <span className="inline-block text-[10px] font-bold px-2.5 py-1 rounded-full bg-white border border-gray-200 text-gray-600 mb-3">
              {game.difficulty} • {game.duration}
            </span>
          )}
          <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-3">
            <span className="inline-flex items-center bg-amber-100 text-amber-700 text-[10px] font-[family-name:var(--font-pixel)] px-3 py-1.5 rounded border border-amber-200">
              {game.status === 'coming-soon' ? 'COMING SOON' : game.status}
            </span>
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-600 opacity-60 group-hover:opacity-100 transition-opacity duration-200" aria-hidden="true">
              Learn more →
            </span>
          </div>
        </div>
      </PixelCard>
    </Link>
  );
}