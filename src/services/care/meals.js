// Meal tracking. Meals live in the shared routine store (AppContext.routine)
// under the items: routine-breakfast / routine-lunch / routine-dinner.
//
// Statuses: completed | pending | missed. Time-based, display-level only:
// a 60-minute grace window after the scheduled time before an un-completed
// meal shows as "missed".

export const MEAL_ITEM_IDS = ["routine-breakfast", "routine-lunch", "routine-dinner"];

export function getMeals(routine) {
  return MEAL_ITEM_IDS.map((id) => routine.find((item) => item.id === id)).filter(Boolean);
}

export function getMealStatus(meal, now = new Date()) {
  if (!meal) return "pending";
  if (meal.completed) return "completed";

  const [h, m] = (meal.time || "00:00").split(":").map(Number);
  const scheduled = new Date(now);
  scheduled.setHours(h || 0, m || 0, 0, 0);
  const diffMinutes = (now - scheduled) / 60000;

  if (diffMinutes < 0) return "pending";
  // Grace window: within 60 min of the scheduled time still counts as pending.
  return diffMinutes > 60 ? "missed" : "pending";
}

export function getMealSummary(routine, now = new Date()) {
  const meals = getMeals(routine);
  const counts = { completed: 0, pending: 0, missed: 0 };
  meals.forEach((meal) => {
    counts[getMealStatus(meal, now)] += 1;
  });
  return { meals, ...counts, total: meals.length };
}