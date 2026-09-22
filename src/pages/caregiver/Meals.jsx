import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useCare } from "../../context/CareContext";
import { getMeals, getMealSummary } from "../../services/care/meals";
import {
  CarePageHeader,
  CareCard,
  CareSectionTitle,
  MetricTile,
  StatusBadge,
  EmptyState,
} from "../../caregiver/components";

export default function Meals() {
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

  const meals = getMeals(app.routine);
  const summary = getMealSummary(app.routine);

  const STATUS_META = {
    completed: { tone: "ok", label: t("caregiver.status.completed") },
    pending: { tone: "warn", label: t("caregiver.status.pending") },
    missed: { tone: "alert", label: t("caregiver.status.missed") },
  };

  return (
    <div className="space-y-6">
      <CarePageHeader
        kicker={t("caregiver.meals.kicker")}
        title={t("caregiver.meals.title")}
        subtitle={t("caregiver.meals.subtitle", { name: selectedElder.profile?.name })}
      />

      <div className="cg-metric-grid">
        <MetricTile
          icon="✅"
          label={t("caregiver.meals.completed")}
          value={summary.completed}
          unit={`/ ${summary.total}`}
        />
        <MetricTile
          icon="⏳"
          label={t("caregiver.meals.pending")}
          value={summary.pending}
        />
        <MetricTile icon="⚠️" label={t("caregiver.meals.missed")} value={summary.missed} />
      </div>

      <CareCard pixel>
        <CareSectionTitle icon="🍽️">{t("caregiver.meals.todayMeals")}</CareSectionTitle>
        {meals.length === 0 ? (
          <p className="text-sm text-(--cg-text-muted)">{t("caregiver.meals.noMeals")}</p>
        ) : (
          <div className="cg-table" style={{ "--cg-grid": "90px 2fr 1fr auto" }}>
            {meals.map((meal) => {
              const time = String(meal.time || "");
              const [h, m] = time.split(":").map(Number);
              const due = new Date();
              due.setHours(h || 0, m || 0, 0, 0);
              const isMissed = !meal.completed && new Date() - due > 60 * 60 * 1000;
              const status = meal.completed ? "completed" : isMissed ? "missed" : "pending";
              const meta = STATUS_META[status];
              return (
                <div className="cg-table__row" key={meal.id}>
                  <span className="cg-table__cell" data-label={t("caregiver.meals.time")}>
                    <span className="cg-mono text-(--cg-brand-deep)">{meal.time}</span>
                  </span>
                  <span className="cg-table__cell" data-label={t("caregiver.meals.meal")}>
                    <strong>{meal.title}</strong>
                    <span className="block text-[13px] text-(--cg-text-muted)">{meal.description}</span>
                  </span>
                  <span className="cg-table__cell" data-label={t("caregiver.orders.status")}>
                    <StatusBadge tone={meta.tone} label={meta.label} />
                  </span>
                  <span className="cg-table__cell" data-label={t("caregiver.meals.action")}>
                    <button
                      type="button"
                      className="cg-btn cg-btn--secondary cg-btn--sm"
                      onClick={() => app.toggleRoutine(meal.id)}
                    >
                      {meal.completed ? t("caregiver.meals.undo") : t("caregiver.meals.markDone")}
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CareCard>

      <div className="cg-note">{t("caregiver.meals.sharedNote")}</div>
    </div>
  );
}