import { useTranslation } from "react-i18next";

const colorTints = {
  teal: "bg-teal-50 border-teal-200 text-teal-700",
  blue: "bg-blue-50 border-blue-200 text-blue-700",
  amber: "bg-amber-50 border-amber-200 text-amber-700",
  emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
  rose: "bg-rose-50 border-rose-200 text-rose-700",
  purple: "bg-purple-50 border-purple-200 text-purple-700",
  orange: "bg-orange-50 border-orange-200 text-orange-700",
};

const trendConfig = {
  up: { icon: "↑", color: "text-emerald-600", labelKey: "common.trendingUp" },
  down: { icon: "↓", color: "text-red-500", labelKey: "common.trendingDown" },
  stable: { icon: "→", color: "text-gray-400", labelKey: "common.stable" },
};

export default function ProgressCard({
  label,
  value,
  unit,
  icon,
  trend,
  color = "teal",
}) {
  const { t } = useTranslation();
  const tint = colorTints[color] || colorTints.teal;
  const trendInfo = trend ? trendConfig[trend] : null;

  return (
    <div
      className={`relative rounded-2xl border-2 p-6 flex flex-col shadow-sm transition-all duration-200 hover:shadow-md ${tint}`}
    >
      {/* Pixel corner decoration */}
      <div className="absolute top-0 right-0 w-2 h-2 bg-white/60 rounded-bl-sm" />

      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl leading-none">{icon}</span>
        {trendInfo && (
          <span
            className={`inline-flex items-center gap-1 text-sm font-medium ${trendInfo.color}`}
            aria-label={t(trendInfo.labelKey)}
          >
            <span className="text-lg leading-none">{trendInfo.icon}</span>
          </span>
        )}
      </div>

      <p className="text-sm font-semibold opacity-75 leading-snug line-clamp-2 min-h-[2.25rem] mb-2">
        {label}
      </p>

      <div className="flex items-baseline gap-1.5 mt-auto">
        <span className="font-pixel text-4xl leading-none">
          {value}
        </span>
        {unit && <span className="text-sm opacity-60">{unit}</span>}
      </div>
    </div>
  );
}
