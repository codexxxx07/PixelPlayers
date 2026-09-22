import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useCare } from "../../context/CareContext";
import { getRoutineProgress } from "../../services/care/routine";
import { getMeals, getMealSummary } from "../../services/care/meals";
import { getMedicineSummary } from "../../services/care/medicines";
import { getStreakData } from "../../services/care/streak";
import { buildDailyUpdate } from "../../services/care/dailyUpdate";
import {
  CarePageHeader,
  CareCard,
  CareSectionTitle,
  MetricTile,
  StatusBadge,
  EmptyState,
  ElderProfileCard,
} from "../../caregiver/components";

export default function ElderStatus() {
  const { t } = useTranslation();
  const { selectedElder } = useCare();
  const app = useApp();

  if (!selectedElder) {
    return (
      <EmptyState
        title={t("caregiver.linked.emptyTitle")}
        text={t("caregiver.linked.emptyText")}
      />
    );
  }

  const elderName = selectedElder.profile?.name || "Elder";
  const routineProgress = getRoutineProgress(app.routine);
  const mealSummary = getMealSummary(app.routine);
  const medicineSummary = getMedicineSummary(app.reminders);
  const meals = getMeals(app.routine);
  const streak = getStreakData(app.progressData);

  const updateItems = buildDailyUpdate({
    routine: app.routine,
    meals,
    medicines: medicineSummary.medicines,
    progressData: app.progressData,
    activityLog: app.activityLog,
  });

  const STATUS_META = {
    completed: { tone: "ok", label: t("caregiver.status.completed") },
    taken: { tone: "ok", label: t("caregiver.status.taken") },
    pending: { tone: "warn", label: t("caregiver.status.pending") },
    missed: { tone: "alert", label: t("caregiver.status.missed") },
  };

  return (
    <div className="space-y-6">
      <CarePageHeader
        kicker={t("caregiver.elder.kicker")}
        title={t("caregiver.elder.title", { name: elderName })}
        subtitle={t("caregiver.elder.subtitle")}
      />

      <ElderProfileCard
        elder={selectedElder}
        statusTone="ok"
        statusLabel={t("caregiver.status.doingWell")}
      />

      <div className="cg-metric-grid">
        <MetricTile
          icon="📅"
          label={t("caregiver.elder.routineProgress")}
          value={routineProgress.done}
          unit={`/ ${routineProgress.total}`}
        />
        <MetricTile
          icon="🍽️"
          label={t("caregiver.elder.meals")}
          value={mealSummary.completed}
          unit={`/ ${mealSummary.total}`}
        />
        <MetricTile
          icon="💊"
          label={t("caregiver.elder.medicines")}
          value={medicineSummary.taken}
          unit={`/ ${medicineSummary.total}`}
        />
        <MetricTile
          icon="🎯"
          label={t("caregiver.elder.accuracy")}
          value={app.progressData.accuracy}
          unit="%"
        />
        <MetricTile
          icon="🔥"
          label={t("caregiver.elder.streak")}
          value={streak.streak}
          unit={t("caregiver.dashboard.days")}
        />
      </div>

      <CareCard pixel>
        <CareSectionTitle icon="🕰️">{t("caregiver.elder.updateHeader")}</CareSectionTitle>
        <ul className="space-y-3">
          {updateItems.map((item) => (
            <li key={item.id} className="flex items-center gap-3">
              <span className="text-xl" aria-hidden="true">{item.icon}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold text-sm text-(--cg-text) truncate">{item.label}</span>
                <span className="block text-[13px] text-(--cg-text-muted)">{item.detail}</span>
              </span>
              <StatusBadge
                tone={item.status === "ok" ? "ok" : "warn"}
                label={item.status === "ok" ? t("caregiver.status.ok") : t("caregiver.status.attention")}
                dot={false}
              />
            </li>
          ))}
        </ul>
      </CareCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <CareCard>
          <CareSectionTitle icon="🍽️">{t("caregiver.meals.title")}</CareSectionTitle>
          <ul className="space-y-2.5">
            {meals.map((meal) => {
              const meta = STATUS_META[meal.completed ? "completed" : "pending"];
              return (
                <li key={meal.id} className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden="true">{meal.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-sm text-(--cg-text)">{meal.title}</span>
                    <span className="block text-[13px] text-(--cg-text-muted)">{meal.time}</span>
                  </span>
                  <StatusBadge tone={meta.tone} label={meta.label} />
                </li>
              );
            })}
          </ul>
        </CareCard>

        <CareCard>
          <CareSectionTitle icon="💊">{t("caregiver.medicines.title")}</CareSectionTitle>
          <ul className="space-y-2.5">
            {medicineSummary.medicines.map((medicine) => {
              const meta = STATUS_META[medicine.completed ? "taken" : "pending"];
              return (
                <li key={medicine.id} className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden="true">{medicine.icon}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-sm text-(--cg-text)">{medicine.title}</span>
                    <span className="block text-[13px] text-(--cg-text-muted)">{medicine.time}</span>
                  </span>
                  <StatusBadge tone={meta.tone} label={meta.label} />
                </li>
              );
            })}
          </ul>
        </CareCard>
      </div>
    </div>
  );
}