import PixelButton from "./PixelButton";

const categoryLabels = {
  hobbies: "Hobbies",
  food: "Favourite Food",
  places: "Places",
  occupation: "Occupation",
  childhood: "Childhood",
  people: "People",
  songs: "Songs",
  memories: "Memories",
  preferences: "Daily Preferences",
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
  const { category, title, description, content, date, icon } = memory;
  const displayTitle = title || (typeof content === "string" ? content.split("\n")[0] : "");
  const bodyText = description || content || "";
  const catLabel =
    categoryLabels[category] || categoryFileName(category) || category || "Memory";
  const displayIcon = icon || "📝";
  const displayDate = formatDate(date);

  return (
    <div
      className="group relative bg-[#FFFDF7] border border-amber-200/60 rounded-2xl p-6 flex flex-col shadow-sm shadow-amber-900/5 transition-all duration-300 hover:shadow-md hover:shadow-amber-900/10 hover:rotate-0 hover:border-amber-300"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, transparent, transparent 31px, #f5f0e0 31px, #f5f0e0 32px)",
        backgroundSize: "100% 32px",
      }}
    >
      {/* Top row: icon + category + date */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl leading-none flex-shrink-0">{displayIcon}</span>
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 border border-amber-200">
              {catLabel}
            </span>
          </div>
        </div>
        {displayDate && (
          <span className="text-xs text-gray-400 mt-1 flex-shrink-0">{displayDate}</span>
        )}
      </div>

      {/* Title */}
      {displayTitle && (
        <p className="font-[family-name:var(--font-pixel)] text-teal-800 text-[11px] leading-relaxed mb-2">
          {displayTitle}
        </p>
      )}

      {/* Content / Description — grows to keep actions aligned */}
      {bodyText && (
        <p className="text-gray-600 text-base leading-relaxed mb-6 flex-1">{bodyText}</p>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-3 pt-2">
        <PixelButton
          onClick={() => onEdit?.(memory)}
          variant="secondary"
          size="sm"
          icon="✏️"
        >
          Edit
        </PixelButton>
        <PixelButton
          onClick={() => onDelete?.(memory)}
          variant="danger"
          size="sm"
          icon="🗑️"
        >
          Delete
        </PixelButton>
      </div>
    </div>
  );
}

function categoryFileName(category) {
  if (typeof category !== "string") return "";
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}