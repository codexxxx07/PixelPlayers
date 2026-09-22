import { useTranslation } from "react-i18next";
import PixelButton from "./PixelButton";

const categoryLabelKeys = {
  hobbies: "memory.shortCatHobbies",
  food: "memory.shortCatFood",
  places: "memory.shortCatPlaces",
  occupation: "memory.shortCatOccupation",
  childhood: "memory.shortCatChildhood",
  people: "memory.shortCatPeople",
  songs: "memory.shortCatSongs",
  memories: "memory.shortCatMemories",
  preferences: "memory.shortCatPreferences",
};

function formatDate(date) {
  if (!date) return "";
  if (date instanceof Date && !isNaN(date)) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  const parsed = new Date(date);
  if (!isNaN(parsed)) {
    return parsed.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }
  return String(date);
}

export default function MemoryCard({ memory, onEdit, onDelete }) {
  const { t } = useTranslation();
  const { id, category, title, description, content, date, icon } = memory;
  const displayTitle = title || (typeof content === "string" ? content.split("\n")[0] : "");
  const bodyText = description || content || "";
  const catLabel =
    categoryLabelsFallback(category) || category || "Memory";
  const displayIcon = icon || "📝";
  const displayDate = formatDate(date);

  return (
    <div
      className="group relative bg-[var(--pp-surface-tint)] border border-amber-200/60 rounded-2xl p-4 sm:p-6 flex flex-col shadow-sm shadow-amber-900/5 transition-all duration-300 hover:shadow-md hover:shadow-amber-900/10 hover:rotate-0 hover:border-amber-300 w-full min-w-0 box-border"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 31px, var(--pp-ruled) 31px, var(--pp-ruled) 32px)",
        backgroundSize: "100% 32px",
      }}
    >
      {/* Top row: icon + category + date */}
      <div className="flex items-start justify-between gap-2 mb-3 min-w-0">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <span className="text-2xl sm:text-3xl leading-none shrink-0">{displayIcon}</span>
          <div className="min-w-0">
            <span className="inline-flex items-center px-2 sm:px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200 break-words">
              {categoryLabelKeys[category]
                ? t(categoryLabelKeys[category])
                : catLabel}
            </span>
          </div>
        </div>
        {displayDate && (
          <span className="text-xs text-gray-400 mt-1 shrink-0 whitespace-nowrap">{displayDate}</span>
        )}
      </div>

      {/* Title */}
      {displayTitle && (
        <p className="font-pixel text-teal-800 text-[11px] leading-relaxed mb-2 break-words overflow-wrap-anywhere min-w-0">
          {t(`memory.data.${id}.title`, { defaultValue: displayTitle })}
        </p>
      )}

      {/* Content / Description — grows to keep actions aligned */}
      {bodyText && (
        <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 sm:mb-6 flex-1 break-words overflow-wrap-anywhere min-w-0">
          {t(`memory.data.${id}.description`, { defaultValue: bodyText })}
        </p>
      )}

      {/* Action buttons — wrap on very small screens */}
      <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-2">
        <PixelButton
          onClick={() => onEdit?.(memory)}
          variant="secondary"
          size="sm"
          icon="✏️"
        >
          {t("memory.edit")}
        </PixelButton>
        <PixelButton
          onClick={() => onDelete?.(memory)}
          variant="danger"
          size="sm"
          icon="🗑️"
        >
          {t("memory.delete")}
        </PixelButton>
      </div>
    </div>
  );
}

function categoryLabelsFallback(category) {
  if (typeof category !== "string") return "";
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}