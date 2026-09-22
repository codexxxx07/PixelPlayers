import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useCare } from "../../context/CareContext";
import { getMedicines, getMedicineSummary } from "../../services/care/medicines";
import {
  CarePageHeader,
  CareCard,
  CareSectionTitle,
  MetricTile,
  StatusBadge,
  EmptyState,
} from "../../caregiver/components";

export default function Medicines() {
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

  const medicines = getMedicines(app.reminders);
  const summary = getMedicineSummary(app.reminders);

  const STATUS_META = {
    taken: { tone: "ok", label: t("caregiver.status.taken") },
    pending: { tone: "warn", label: t("caregiver.status.pending") },
    missed: { tone: "alert", label: t("caregiver.status.missed") },
  };

  return (
    <div className="space-y-6">
      <CarePageHeader
        kicker={t("caregiver.medicines.kicker")}
        title={t("caregiver.medicines.title")}
        subtitle={t("caregiver.medicines.subtitle", { name: selectedElder.profile?.name })}
      />

      <div className="cg-metric-grid">
        <MetricTile icon="✅" label={t("caregiver.medicines.taken")} value={summary.taken} unit={`/ ${summary.total}`} />
        <MetricTile icon="⏳" label={t("caregiver.medicines.pending")} value={summary.pending} />
        <MetricTile icon="⚠️" label={t("caregiver.medicines.missed")} value={summary.missed} />
      </div>

      <div className="cg-disclaimer">{t("caregiver.medicines.disclaimer")}</div>

      <CareCard pixel>
        <CareSectionTitle icon="💊">{t("caregiver.medicines.schedule")}</CareSectionTitle>
        {medicines.length === 0 ? (
          <p className="text-sm text-(--cg-text-muted)">{t("caregiver.medicines.none")}</p>
        ) : (
          <div className="cg-table" style={{ "--cg-grid": "90px 2fr 1fr auto" }}>
            {medicines.map((medicine) => {
              const status = medicine.completed ? "taken" : "pending";
              const meta = STATUS_META[status];
              return (
                <div className="cg-table__row" key={medicine.id}>
                  <span className="cg-table__cell" data-label={t("caregiver.medicines.time")}>
                    <span className="cg-mono text-(--cg-brand-deep)">{medicine.time}</span>
                  </span>
                  <span className="cg-table__cell" data-label={t("caregiver.medicines.medicine")}>
                    <strong>{medicine.title}</strong>
                    <span className="block text-[13px] text-(--cg-text-muted)">{medicine.description}</span>
                  </span>
                  <span className="cg-table__cell" data-label={t("caregiver.orders.status")}>
                    <StatusBadge tone={meta.tone} label={meta.label} />
                  </span>
                  <span className="cg-table__cell" data-label={t("caregiver.medicines.action")}>
                    <button
                      type="button"
                      className="cg-btn cg-btn--secondary cg-btn--sm"
                      onClick={() => app.toggleReminder(medicine.id)}
                    >
                      {medicine.completed ? t("caregiver.medicines.undo") : t("caregiver.medicines.markTaken")}
                    </button>
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </CareCard>

      <div className="cg-note">{t("caregiver.medicines.sharedNote")}</div>
    </div>
  );
}