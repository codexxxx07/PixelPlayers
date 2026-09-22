// Game streak helpers — pure derivations over the shared progress store.

export function getStreakData(progressData = {}) {
  return {
    streak: progressData.streak ?? 0,
    gamesCompleted: progressData.gamesCompleted ?? 0,
    weeklyData: progressData.weeklyData ?? [],
  };
}

export function getWeeklyGames(weeklyData = []) {
  return weeklyData.reduce((sum, day) => sum + (day.games || 0), 0);
}

export function getStreakEngagement(weeklyData = []) {
  if (!weeklyData.length) return { activeDays: 0, totalDays: 0 };
  const activeDays = weeklyData.filter((day) => (day.games || 0) > 0).length;
  return { activeDays, totalDays: weeklyData.length };
}