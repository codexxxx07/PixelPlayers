import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { PixelButton, PixelCard, ProgressCard, RoutineCard } from "../components/";

function getGreeting(hour) {
  if (hour < 5) return "Good Night";
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  if (hour < 21) return "Good Evening";
  return "Good Night";
}

function formatTime12h(time) {
  if (!time) return "";
  const [h, m] = time.split(":").map(Number);
  const meridiem = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${meridiem}`;
}

const SUN_ART = [
  "..Y..",
  ".YYY.",
  "YYOYY",
  ".YYY.",
  "..Y..",
];

const MOON_ART = [
  "..Y..",
  ".YY..",
  "YY...",
  ".YY..",
  "..Y..",
];

const SUN_COLORS = { Y: "#fbbf24", O: "#f97316" };
const MOON_COLORS = { Y: "#fde68a" };

function PixelSprite({ art, colors, cell = 5 }) {
  const rows = art.length;
  const cols = art[0].length;
  return (
    <svg
      width={cols * cell}
      height={rows * cell}
      viewBox={`0 0 ${cols} ${rows}`}
      shapeRendering="crispEdges"
      aria-hidden="true"
      className="drop-shadow-sm"
    >
      {art.map((row, y) =>
        row.split("").map((ch, x) =>
          ch !== "." ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={colors[ch]} />
          ) : null
        )
      )}
    </svg>
  );
}

function SectionTitle({ icon, children }) {
  return (
    <div className="flex items-center gap-2.5 mb-5">
      <span className="text-xl leading-none" aria-hidden="true">{icon}</span>
      <h2 className="font-[family-name:var(--font-pixel)] text-teal-700 text-xs md:text-sm tracking-wider">
        {children}
      </h2>
    </div>
  );
}

export default function Dashboard() {
  const { user, currentTime, routine, memories, games, activityLog, toggleRoutine, progressData } = useApp();

  const hour = currentTime.getHours();
  const greeting = getGreeting(hour);
  const isDay = hour >= 5 && hour < 18;

  const formattedDate = useMemo(
    () =>
      currentTime.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    [currentTime]
  );

  const formattedTime = useMemo(
    () =>
      currentTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
    [currentTime]
  );

  const activeIndex = routine.findIndex((item) => !item.completed);
  const currentActivity = activeIndex >= 0 ? routine[activeIndex] : null;
  const nextActivity = activeIndex >= 0 ? routine[activeIndex + 1] : routine[0];

  const recommendedIds = ["picture-recall", "word-association"];
  const recommendedReasons = {
    "picture-recall": "Because you enjoy visual memories",
    "word-association": "Keep your language skills sharp",
  };
  const recommendedGames = recommendedIds
    .map((id) => games.find((game) => game.id === id))
    .filter(Boolean);

  const highlightMemories = memories.filter((memory) => memory.favorite).slice(0, 3);

  const routineWithCurrent = routine.map((item, index) => ({
    ...item,
    current: index === activeIndex && !item.completed,
  }));

  const doneCount = routine.filter((item) => item.completed).length;
  const routineProgress =
    routine.length > 0 ? Math.round((doneCount / routine.length) * 100) : 0;

  const quickActions = [
    { to: "/games", icon: "🎮", label: "Play a Game", hint: "Fun brain activities" },
    { to: "/assistant", icon: "🤖", label: "Talk to Assistant", hint: "Chat anytime" },
    { to: "/memory", icon: "💾", label: "Add Memory", hint: "Save a special moment" },
    { to: "/routine", icon: "📋", label: "View Routine", hint: "See today's plan" },
  ];

  return (
    <div className="page-enter min-h-screen pb-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-8 md:py-10 space-y-12">

        {/* ========== GREETING ========== */}
        <section
          className={`relative overflow-hidden rounded-3xl p-7 md:p-10 shadow-lg shadow-teal-900/10 animate-pixel-fade-in ${
            isDay
              ? "bg-gradient-to-br from-amber-100 via-orange-50 to-teal-50"
              : "bg-gradient-to-br from-indigo-200 via-[#FFF8F0] to-teal-50"
          }`}
        >
          <div className="absolute top-0 left-0 right-0 h-3 flex opacity-70">
            <div className="flex-1 bg-teal-400" />
            <div className="flex-1 bg-amber-400" />
            <div className="flex-1 bg-teal-300" />
            <div className="flex-1 bg-amber-300" />
          </div>

          <div className="relative flex flex-col sm:flex-row sm:items-center gap-6">
            <div className="flex-1">
              <p className="font-[family-name:var(--font-pixel)] text-[9px] md:text-[10px] text-teal-500 tracking-widest mb-3">
                {isDay ? "A FRESH NEW DAY" : "A QUIET EVENING"}
              </p>
              <h1 className="font-[family-name:var(--font-pixel)] text-teal-800 text-lg md:text-2xl leading-relaxed mb-4">
                {greeting}, {user.name}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-gray-600 text-base md:text-lg">
                <span className="inline-flex items-center gap-2">
                  <span aria-hidden="true">📅</span>
                  {formattedDate}
                </span>
                <span className="inline-flex items-center gap-2 font-semibold text-teal-700">
                  <span aria-hidden="true">🕒</span>
                  {formattedTime}
                </span>
              </div>
            </div>

            <div className="flex-shrink-0 self-center sm:self-end">
              <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl bg-white/70 border-2 border-amber-200/70 shadow-inner shadow-amber-900/5">
                <div className="animate-gentle-bounce">
                  {isDay ? (
                    <PixelSprite art={SUN_ART} colors={SUN_COLORS} cell={6} />
                  ) : (
                    <PixelSprite art={MOON_ART} colors={MOON_COLORS} cell={6} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========== CURRENT STATUS ========== */}
        <section className="animate-slide-up stagger-1">
          <SectionTitle icon="🗓️">Current Status</SectionTitle>
          <PixelCard variant="elevated" className="p-6 md:p-7">
            <div className="grid sm:grid-cols-2 gap-5">
              <div className="flex items-center gap-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-5">
                <span className="relative flex flex-shrink-0 w-4 h-4">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-40 animate-ping" />
                  <span className="relative inline-flex w-4 h-4 rounded-full bg-emerald-500 border-2 border-emerald-600" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-emerald-600 mb-1">
                    Current Activity
                  </p>
                  <p className="text-gray-800 text-lg font-bold leading-snug truncate">
                    {currentActivity ? currentActivity.title : "Resting time"}
                  </p>
                  <p className="text-sm text-emerald-600">
                    {currentActivity ? formatTime12h(currentActivity.time) : "Enjoy the calm 🪴"}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-gray-50 border border-gray-200 p-5">
                <span className="flex flex-shrink-0 w-4 h-4 rounded-full bg-gray-300 border-2 border-gray-400" />
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-1">
                    Next Up
                  </p>
                  <p className="text-gray-800 text-lg font-bold leading-snug truncate">
                    {nextActivity ? nextActivity.title : "Nothing planned"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {nextActivity ? formatTime12h(nextActivity.time) : "A free afternoon"}
                  </p>
                </div>
              </div>
            </div>
          </PixelCard>
        </section>

        {/* ========== RECOMMENDED FOR YOU ========== */}
        <section className="animate-slide-up stagger-2">
          <SectionTitle icon="✨">Recommended For You</SectionTitle>
          <div className="grid sm:grid-cols-2 gap-5 items-stretch">
            {recommendedGames.map((game) => (
              <PixelCard key={game.id} hover pixel className="p-6 flex flex-col">
                <div className="flex items-start gap-4 mb-4">
                  <span className="text-4xl flex-shrink-0 animate-gentle-bounce" aria-hidden="true">
                    {game.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="card-title mb-2 leading-relaxed">
                      {game.name}
                    </h3>
                    <span className="inline-flex items-center text-[10px] font-bold px-2.5 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
                      {game.category}
                    </span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                  {recommendedReasons[game.id]}
                </p>
                <PixelButton to="/games" size="md" className="self-start mt-auto">
                  Start Activity
                </PixelButton>
              </PixelCard>
            ))}
          </div>
        </section>

        {/* ========== TODAY'S PROGRESS ========== */}
        <section className="animate-slide-up stagger-3">
          <SectionTitle icon="📊">Today's Progress</SectionTitle>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-5">
            <ProgressCard label="Games Completed" value={progressData.gamesCompleted} icon="🎮" trend="up" color="teal" />
            <ProgressCard label="Accuracy" value={progressData.accuracy} unit="%" icon="🎯" trend="up" color="emerald" />
            <ProgressCard label="Avg. Response" value={12.4} unit="s" icon="⏱️" color="blue" />
            <ProgressCard label="Current Streak" value={progressData.streak} unit="days" icon="🔥" trend="stable" color="amber" />
          </div>

          <PixelCard variant="default" className="p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-gray-700">
                {doneCount} of {routine.length} planned activities done today
              </p>
              <p className="text-xs font-bold text-teal-600">{routineProgress}%</p>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${routineProgress}%` }} />
            </div>
          </PixelCard>
        </section>

        {/* ========== MEMORY HIGHLIGHTS ========== */}
        <section className="animate-slide-up stagger-4">
          <SectionTitle icon="💛">Your Memories</SectionTitle>

          <PixelCard variant="default" className="p-5 mb-5 bg-amber-50/40 border-amber-200/60">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">🆕</span>
              <p className="text-gray-700 text-base md:text-lg font-semibold">
                <span className="font-[family-name:var(--font-pixel)] text-[10px] text-amber-600 mr-2">
                  3 NEW
                </span>
                3 new memories this week — keep them coming!
              </p>
            </div>
          </PixelCard>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {highlightMemories.map((memory) => (
              <PixelCard key={memory.id} hover className="p-6 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl flex-shrink-0" aria-hidden="true">{memory.icon}</span>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-800 text-lg leading-snug mb-0.5">
                      {memory.title}
                    </h3>
                    <p className="text-xs text-gray-400">{memory.date}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 flex-1">
                  {memory.description}
                </p>
              </PixelCard>
            ))}
          </div>

          <div className="mt-6">
            <PixelButton to="/memory" variant="secondary" size="md">
              View Memory Profile
            </PixelButton>
          </div>
        </section>

        {/* ========== TODAY'S ROUTINE ========== */}
        <section className="animate-slide-up stagger-5">
          <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div className="flex items-center gap-2.5">
              <span className="text-xl leading-none" aria-hidden="true">⏰</span>
              <h2 className="font-[family-name:var(--font-pixel)] text-teal-700 text-xs md:text-sm tracking-wider">
                Today's Routine
              </h2>
            </div>
            <PixelButton to="/routine" variant="secondary" size="sm" className="hidden sm:inline-flex">
              View Full Routine
            </PixelButton>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4 px-1 snap-x snap-mandatory -mx-1">
            {routineWithCurrent.map((item) => (
              <div key={item.id} className="min-w-[260px] max-w-[300px] w-full snap-start flex-shrink-0">
                <RoutineCard activity={item} onClick={(routineItem) => toggleRoutine(routineItem.id)} />
              </div>
            ))}
          </div>

          <div className="mt-4 sm:hidden">
            <PixelButton to="/routine" variant="secondary" size="md" block>
              View Full Routine
            </PixelButton>
          </div>
        </section>

        {/* ========== QUICK ACTIONS ========== */}
        <section className="animate-slide-up stagger-6">
          <SectionTitle icon="⚡">Quick Actions</SectionTitle>
          <div className="grid grid-cols-2 gap-4 md:gap-5 items-stretch">
            {quickActions.map((action) => (
              <Link
                key={action.to}
                to={action.to}
                className="group relative overflow-hidden rounded-2xl bg-white border-2 border-teal-100 p-6 md:p-8 text-center flex flex-col items-center justify-center min-h-[180px] shadow-sm transition-all duration-200 hover:shadow-lg hover:border-teal-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <div className="absolute top-0 right-0 w-10 h-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute top-0 right-0 w-3 h-3 bg-teal-300" />
                  <div className="absolute top-0 right-3 w-2 h-2 bg-amber-300" />
                  <div className="absolute top-3 right-0 w-2 h-2 bg-teal-300" />
                </div>
                <span
                  className="text-4xl md:text-5xl block mb-4 group-hover:scale-110 transition-transform duration-200"
                  aria-hidden="true"
                >
                  {action.icon}
                </span>
                <span className="font-[family-name:var(--font-pixel)] text-teal-800 text-[10px] md:text-[11px] leading-relaxed block">
                  {action.label}
                </span>
                <span className="text-xs md:text-sm text-gray-500 mt-2 block">{action.hint}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ========== RECENT ACTIVITY ========== */}
        <section className="animate-slide-up">
          <SectionTitle icon="🕰️">Recent Activity</SectionTitle>
          <div className="space-y-3">
            {activityLog.slice(0, 5).map((activity) => (
              <PixelCard key={activity.id} variant="default" className="p-4 md:p-5">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-2xl">
                    <span aria-hidden="true">{activity.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 font-semibold text-base leading-snug">
                      {activity.title}
                    </p>
                    <p className="text-gray-500 text-sm mt-0.5">
                      {activity.detail}
                    </p>
                  </div>
                  <span className="flex-shrink-0 text-xs text-gray-400 whitespace-nowrap">
                    {activity.timestamp}
                  </span>
                </div>
              </PixelCard>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}