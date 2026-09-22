// Daily update builder. Consumes shared elder stores (routine, meals,
// medicines, activity) and produces a ✓/⚠ list for the caregiver.

import { getMealStatus } from "./meals";
import { getMedicineStatus } from "./medicines";

export function buildDailyUpdate({ routine = [], meals = [], medicines = [], progressData = {}, activityLog = [] }, now = new Date()) {
  const items = [];

  meals.forEach((meal) => {
    const status = getMealStatus(meal, now);
    if (status === "completed") {
      items.push({ id: `update-${meal.id}-ok`, status: "ok", label: meal.title, detail: "Completed", icon: meal.icon || "🍽️" });
    } else if (status === "missed") {
      items.push({ id: `update-${meal.id}-warn`, status: "warn", label: meal.title, detail: "Not completed yet", icon: meal.icon || "🍽️" });
    } else {
      items.push({ id: `update-${meal.id}-next`, status: "warn", label: meal.title, detail: "Coming up", icon: meal.icon || "🍽️" });
    }
  });

  medicines.forEach((medicine) => {
    const status = getMedicineStatus(medicine, now);
    items.push({
      id: `update-${medicine.id}`,
      status: status === "taken" ? "ok" : status === "missed" ? "warn" : "warn",
      label: medicine.title,
      detail: status === "taken" ? "Marked as taken" : status === "missed" ? "Missed / pending" : "Pending",
      icon: medicine.icon || "💊",
    });
  });

  routine.forEach((item) => {
    if (item.completed && !meals.some((meal) => meal.id === item.id)) {
      items.push({ id: `update-${item.id}-ok`, status: "ok", label: item.title, detail: "Completed", icon: item.icon || "✅" });
    }
  });

  if ((progressData.gamesCompleted ?? 0) > 0) {
    items.push({
      id: "update-games",
      status: "ok",
      label: "Cognitive activity",
      detail: `${progressData.gamesCompleted} games completed`,
      icon: "🎮",
    });
  }

  if (activityLog.length > 0) {
    items.push({
      id: "update-activity",
      status: "ok",
      label: "Recent activity",
      detail: activityLog[0].title,
      icon: "🕰️",
    });
  }

  return items;
}