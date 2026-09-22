export default function RoutineCard({ activity, onClick }) {
  const { time, title, icon, completed, current } = activity;

  const statusDot = completed ? (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 border-2 border-emerald-400">
      <span className="text-emerald-600 text-sm font-bold">✓</span>
    </div>
  ) : current ? (
    <div className="relative flex items-center justify-center w-8 h-8">
      <span className="absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-30 animate-ping" />
      <span className="relative inline-flex w-4 h-4 rounded-full bg-teal-500 border-2 border-teal-600" />
    </div>
  ) : (
    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 border-2 border-gray-300">
      <div className="w-2.5 h-2.5 rounded-full bg-gray-300" />
    </div>
  );

  return (
    <button
      onClick={() => onClick?.(activity)}
      className={`group w-full text-left rounded-2xl border-2 p-5 transition-all duration-300 min-h-[80px] flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${
        current
          ? "bg-white border-teal-400 shadow-lg shadow-teal-500/15 ring-2 ring-teal-200/50"
          : completed
          ? "bg-emerald-50/50 border-emerald-200 shadow-sm hover:bg-emerald-50"
          : "bg-white border-gray-200 shadow-sm hover:border-gray-300 hover:shadow-md"
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Status indicator */}
        {statusDot}

        {/* Icon */}
        <span className="text-3xl shrink-0">{icon}</span>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <span
            className={`font-pixel text-xl block ${
              current
                ? "text-teal-700"
                : completed
                ? "text-gray-500 line-through"
                : "text-gray-800"
            }`}
          >
            {title}
          </span>
          <span
            className={`text-sm mt-0.5 block ${
              current ? "text-teal-600" : completed ? "text-gray-400" : "text-gray-500"
            }`}
          >
            {time}
          </span>
        </div>

        {/* Arrow for non-completed */}
        {!completed && (
          <div
            className={`shrink-0 transition-transform duration-200 ${
              current ? "text-teal-400" : "text-gray-300 group-hover:text-gray-400"
            } group-hover:translate-x-1`}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7 4l6 6-6 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
}
