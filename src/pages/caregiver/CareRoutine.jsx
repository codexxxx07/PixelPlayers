import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useCare } from "../../context/CareContext";
import { getRoutineProgress, getTodayRoutine } from "../../services/care/routine";
import {
  CarePageHeader,
  CareCard,
  CareSectionTitle,
  StatusBadge,
  EmptyState,
} from "../../caregiver/components";

export default function CareRoutine() {
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

  const progress = getRoutineProgress(app.routine);
  const items = getTodayRoutine(app.routine);

  return (
    <div className="space-y-6">
      <CarePageHeader
        kicker={t("caregiver.routine.kicker")}
        title={t("caregiver.routine.title")}
        subtitle={t("caregiver.routine.subtitle", { name: selectedElder.profile?.name })}
      />

      <CareCard>
        <CareSectionTitle icon="📈">{t("caregiver.routine.overallProgress")}</CareSectionTitle>
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-2xl font-black text-(--cg-text) cg-mono">
            {progress.done}
            <span className="text-(--cg-text-muted) text-base"> / {progress.total}</span>
          </span>
          <div className="cg-progress flex-1 min-w-[160px]">
            <div className="cg-progress__bar" style={{ width: `${progress.percent}%` }} />
          </div>
          <span className="text-sm font-bold text-(--cg-text-soft)">{progress.percent}%</span>
        </div>
      </CareCard>

      <CareCard pixel>
        <CareSectionTitle icon="🗓️">{t("caregiver.routine.todaySchedule")}</CareSectionTitle>
        <div className="cg-table" style={{ "--cg-grid": "90px 2fr 1fr auto" }}>
          {items.map((item) => (
            <div className="cg-table__row" key={item.id}>
              <span className="cg-table__cell" data-label={t("caregiver.routine.time")}>
                <span className="cg-mono text-(--cg-brand-deep)">{item.time}</span>
              </span>
              <span className="cg-table__cell" data-label={t("caregiver.routine.activity")}>
                <strong>{item.title}</strong>
                <span className="block text-[13px] text-(--cg-text-muted)">{item.description}</span>
              </span>
              <span className="cg-table__cell" data-label={t("caregiver.orders.status")}>
                <StatusBadge
                  tone={item.completed ? "ok" : "warn"}
                  label={item.completed ? t("caregiver.status.completed") : t("caregiver.status.pending")}
                />
              </span>
              <span className="cg-table__cell" data-label={t("caregiver.routine.action")}>
                <button
                  type="button"
                  className="cg-btn cg-btn--secondary cg-btn--sm"
                  onClick={() => app.toggleRoutine(item.id)}
                >
                  {item.completed ? t("caregiver.routine.undo") : t("caregiver.routine.markComplete")}
                </button>
              </span>
            </div>
          ))}
        </div>
      </CareCard>

      <div className="cg-note">{t("caregiver.routine.sharedNote")}</div>
    </div>
  );
}