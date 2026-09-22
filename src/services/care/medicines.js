// Medicine tracking. Medicines live in the shared reminders store
// (AppContext.reminders) where type === 'medication'.
//
// Statuses: taken | pending | missed. Track-and-remind only — this service
// never diagnoses, prescribes or makes medical decisions.

export function getMedicines(reminders) {
  return reminders.filter((reminder) => reminder.type === "medication");
}

export function getMedicineStatus(medicine, now = new Date()) {
  if (!medicine) return "pending";
  if (medicine.completed) return "taken";

  const [h, m] = (medicine.time || "00:00").split(":").map(Number);
  const scheduled = new Date(now);
  scheduled.setHours(h || 0, m || 0, 0, 0);
  const diffMinutes = (now - scheduled) / 60000;

  if (diffMinutes < 0) return "pending";
  // Grace window: within 60 min of the scheduled time still counts as pending.
  return diffMinutes > 60 ? "missed" : "pending";
}

export function getMedicineSummary(reminders, now = new Date()) {
  const medicines = getMedicines(reminders);
  const counts = { taken: 0, pending: 0, missed: 0 };
  medicines.forEach((medicine) => {
    counts[getMedicineStatus(medicine, now)] += 1;
  });
  return { medicines, ...counts, total: medicines.length };
}