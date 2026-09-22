import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useCare } from "../../context/CareContext";
import { getRoutineProgress, getUpcomingRoutine } from "../../services/care/routine";
import { getMealSummary } from "../../services/care/meals";
import { getMedicineSummary } from "../../services/care/medicines";
import { getStreakData } from "../../services/care/streak";
import { buildDailyUpdate } from "../../services/care/dailyUpdate";
import {
  CarePageHeader,
  CareSectionTitle,
  CareCard,
  MetricTile,
  StatusBadge,
  EmptyState,
  ElderProfileCard,
} from "../../caregiver/components";

export default function CareDashboard() {
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
  const streak = getStreakData(app.progressData);
  const meals = (app.routine || []).filter((item) =>
    ["routine-breakfast", "routine-lunch", "routine-dinner"].includes(item.id)
  );

  const updateItems = buildDailyUpdate({
    routine: app.routine,
    meals,
    medicines: medicineSummary.medicines,
    progressData: app.progressData,
    activityLog: app.activityLog,
  });

  const alerts = updateItems.filter((item) => item.status === "warn");
  const upcoming = getUpcomingRoutine(app.routine, new Date(), 3);
  const recent = app.activityLog.slice(0, 4);

  return (
    <div className="space-y-6">
      <CarePageHeader
        kicker={t("caregiver.dashboard.kicker")}
        title={t("caregiver.dashboard.title")}
        subtitle={t("caregiver.dashboard.subtitle", { name: elderName })}
      />

      <ElderProfileCard
        elder={selectedElder}
        statusTone="ok"
        statusLabel={t("caregiver.status.doingWell")}
      />

      <div className="cg-metric-grid">
        <MetricTile
          icon="📅"
          label={t("caregiver.dashboard.routine")}
          value={routineProgress.done}
          unit={`/ ${routineProgress.total}`}
          sub={t("caregiver.dashboard.routineDone")}
        />
        <MetricTile
          icon="🍽️"
          label={t("caregiver.dashboard.meals")}
          value={mealSummary.completed}
          unit={`/ ${mealSummary.total}`}
          sub={t("caregiver.dashboard.mealsDone")}
        />
        <MetricTile
          icon="💊"
          label={t("caregiver.dashboard.medicines")}
          value={medicineSummary.taken}
          unit={`/ ${medicineSummary.total}`}
          sub={t("caregiver.dashboard.medsTaken")}
        />
        <MetricTile
          icon="🔥"
          label={t("caregiver.dashboard.streak")}
          value={streak.streak}
          unit={t("caregiver.dashboard.days")}
          sub={t("caregiver.dashboard.streakSub")}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CareCard pixel>
          <CareSectionTitle icon="🕰️" right={<StatusBadge tone="brand" label={t("caregiver.dashboard.todayChip")} />}>
            {t("caregiver.dashboard.todaysUpdate")}
          </CareSectionTitle>
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

        <div className="space-y-6">
          <CareCard>
            <CareSectionTitle icon="⚠️">{t("caregiver.dashboard.alerts")}</CareSectionTitle>
            {alerts.length === 0 ? (
              <p className="text-sm text-(--cg-text-muted) leading-relaxed">
                {t("caregiver.dashboard.noAlerts")}
              </p>
            ) : (
              <ul className="space-y-2.5">
                {alerts.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <span aria-hidden="true">{item.icon}</span>
                    <span className="min-w-0 flex-1 text-sm font-semibold text-(--cg-text-soft) truncate">
                      {item.label}
                    </span>
                    <StatusBadge tone="warn" label={t("caregiver.status.attention")} />
                  </li>
                ))}
              </ul>
            )}
          </CareCard>

          <CareCard>
            <CareSectionTitle icon="⏰">{t("caregiver.dashboard.upcomingReminders")}</CareSectionTitle>
            {upcoming.length === 0 ? (
              <p className="text-sm text-(--cg-text-muted)">{t("caregiver.dashboard.noUpcoming")}</p>
            ) : (
              <ul className="space-y-2.5">
                {upcoming.map((item) => (
                  <li key={item.id} className="flex items-center gap-3">
                    <span className="cg-mono text-sm text-(--cg-brand-deep) font-bold">{item.time}</span>
                    <span className="min-w-0 flex-1 text-sm text-(--cg-text-soft) truncate">{item.title}</span>
                    <span aria-hidden="true">{item.icon}</span>
                  </li>
                ))}
              </ul>
            )}
          </CareCard>
        </div>
      </div>

      <CareCard>
        <CareSectionTitle icon="🕐" right={<Link to="/caregiver/elder" className="cg-btn cg-btn--ghost cg-btn--sm">{t("caregiver.viewElderStatus")} →</Link>}>
          {t("caregiver.dashboard.recentActivity")}
        </CareSectionTitle>
        {recent.length === 0 ? (
          <p className="text-sm text-(--cg-text-muted)">{t("caregiver.dashboard.noRecent")}</p>
        ) : (
          <ul className="space-y-2.5">
            {recent.map((activity) => (
              <li key={activity.id} className="flex items-center gap-3">
                <span className="text-xl" aria-hidden="true">{activity.icon}</span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-sm text-(--cg-text)">{activity.title}</span>
                  <span className="block text-[13px] text-(--cg-text-muted)">{activity.detail}</span>
                </span>
                <span className="text-[12px] text-(--cg-text-muted) whitespace-nowrap">{activity.timestamp}</span>
              </li>
            ))}
          </ul>
        )}
      </CareCard>
    </div>
  );
}