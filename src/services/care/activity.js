// Cognitive / game activity helpers. Framed strictly as "Cognitive Activity"
// and "Game Activity" — never a "dementia score" or any clinical measurement.

export function getActivitySummary(progressData = {}) {
  return {
    gamesCompleted: progressData.gamesCompleted ?? 0,
    accuracy: progressData.accuracy ?? 0,
    avgResponseTime: progressData.avgResponseTime ?? "—",
    streak: progressData.streak ?? 0,
    weeklyData: progressData.weeklyData ?? [],
  };
}

export function getRecentActivity(activityLog = [], limit = 6) {
  return activityLog.slice(0, limit);
}

export function getActivityTotals(activityLog = []) {
  const typeCounts = activityLog.reduce((acc, activity) => {
    const type = activity.type || "other";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  return { typeCounts, total: activityLog.length };
}