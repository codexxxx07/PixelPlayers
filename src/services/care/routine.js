// Elder routine helpers — pure derivations over the shared AppContext.routine.

export function getRoutineProgress(routine = []) {
  const total = routine.length;
  const done = routine.filter((item) => item.completed).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  return { done, total, percent };
}

export function getTodayRoutine(routine = []) {
  return [...routine].sort((a, b) => String(a.time || "").localeCompare(String(b.time || "")));
}

export function getUpcomingRoutine(routine = [], now = new Date(), limit = 4) {
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  return getTodayRoutine(routine)
    .filter((item) => !item.completed)
    .filter((item) => {
      const [h, m] = (item.time || "23:59").split(":").map(Number);
      return h * 60 + m >= nowMinutes;
    })
    .slice(0, limit);
}