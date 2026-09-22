import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useApp } from "../../context/AppContext";
import { useCare } from "../../context/CareContext";
import {
  CarePageHeader,
  CareCard,
  CareSectionTitle,
  StatusBadge,
  ConfirmDialog,
  EmptyState,
} from "../../caregiver/components";

const TYPE_FILTERS = ["all", "medication", "hydration", "appointment", "activity"];

export default function CareReminders() {
  const { t } = useTranslation();
  const { selectedElder } = useCare();
  const app = useApp();

  const [filter, setFilter] = useState("all");
  const [toDelete, setToDelete] = useState(null);
  const [form, setForm] = useState({
    title: "",
    description: "",
    time: "09:00",
    type: "medication",
    important: false,
  });

  if (!selectedElder) {
    return (
      <EmptyState
        title={t("caregiver.linked.emptyTitle")}
        text={t("caregiver.linked.emptyText")}
      />
    );
  }

  const reminders = app.reminders
    .filter((reminder) => filter === "all" || reminder.type === filter)
    .slice()
    .sort((a, b) => String(a.time || "").localeCompare(String(b.time || "")));

  const submit = (event) => {
    event.preventDefault();
    if (!form.title.trim()) return;
    app.addReminder({
      title: form.title.trim(),
      description: form.description.trim(),
      time: form.time,
      type: form.type,
      important: form.important,
      icon: form.type === "medication" ? "💊" : form.type === "hydration" ? "💧" : form.type === "appointment" ? "🩺" : "📝",
    });
    setForm((prev) => ({ ...prev, title: "", description: "" }));
  };

  return (
    <div className="space-y-6">
      <CarePageHeader
        kicker={t("caregiver.reminders.kicker")}
        title={t("caregiver.reminders.title")}
        subtitle={t("caregiver.reminders.subtitle", { name: selectedElder.profile?.name })}
      />

      <div className="cg-card">
        <CareSectionTitle icon="➕">{t("caregiver.reminders.addTitle")}</CareSectionTitle>
        <form onSubmit={submit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="cg-label" htmlFor="cg-rem-title">{t("caregiver.reminders.titleField")}</label>
              <input
                id="cg-rem-title"
                className="cg-input"
                value={form.title}
                onChange={(event) => setForm((prev) => ({ ...prev, title: event.target.value }))}
                required
              />
            </div>
            <div>
              <label className="cg-label" htmlFor="cg-rem-time">{t("caregiver.reminders.timeField")}</label>
              <input
                id="cg-rem-time"
                type="time"
                className="cg-input"
                value={form.time}
                onChange={(event) => setForm((prev) => ({ ...prev, time: event.target.value }))}
              />
            </div>
          </div>
          <div>
            <label className="cg-label" htmlFor="cg-rem-desc">{t("caregiver.reminders.descField")}</label>
            <input
              id="cg-rem-desc"
              className="cg-input"
              value={form.description}
              onChange={(event) => setForm((prev) => ({ ...prev, description: event.target.value }))}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="cg-label" htmlFor="cg-rem-type">{t("caregiver.reminders.typeField")}</label>
              <select
                id="cg-rem-type"
                className="cg-select"
                value={form.type}
                onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value }))}
              >
                <option value="medication">{t("caregiver.reminders.medication")}</option>
                <option value="hydration">{t("caregiver.reminders.hydration")}</option>
                <option value="appointment">{t("caregiver.reminders.appointment")}</option>
                <option value="activity">{t("caregiver.reminders.activity")}</option>
              </select>
            </div>
            <label className="flex items-center gap-3 mt-6 text-sm font-bold text-(--cg-text-soft)">
              <input
                type="checkbox"
                className="w-5 h-5 accent-teal-600"
                checked={form.important}
                onChange={(event) => setForm((prev) => ({ ...prev, important: event.target.checked }))}
              />
              {t("caregiver.reminders.importantField")}
            </label>
          </div>
          <div className="flex justify-end">
            <button type="submit" className="cg-btn cg-btn--primary">{t("caregiver.reminders.save")}</button>
          </div>
        </form>
      </div>

      <div className="flex flex-wrap gap-2">
        {TYPE_FILTERS.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setFilter(type)}
            className={`cg-btn cg-btn--sm ${
              filter === type ? "cg-btn--primary" : "cg-btn--secondary"
            }`}
          >
            {t(`caregiver.reminders.${type}`)}
          </button>
        ))}
      </div>

      <CareCard pixel>
        <CareSectionTitle icon="⏰">{t("caregiver.reminders.listTitle")}</CareSectionTitle>
        {reminders.length === 0 ? (
          <p className="text-sm text-(--cg-text-muted)">{t("caregiver.reminders.none")}</p>
        ) : (
          <div className="cg-table" style={{ "--cg-grid": "90px 2.2fr 1.2fr auto auto" }}>
            {reminders.map((reminder) => (
              <div className="cg-table__row" key={reminder.id}>
                <span className="cg-table__cell" data-label={t("caregiver.reminders.timeField")}>
                  <span className="cg-mono text-(--cg-brand-deep)">{reminder.time}</span>
                </span>
                <span className="cg-table__cell" data-label={t("caregiver.reminders.titleField")}>
                  <strong>{reminder.title}</strong>
                  <span className="block text-[13px] text-(--cg-text-muted)">{reminder.description}</span>
                  {reminder.important && (
                    <span className="cg-chip mt-1">★ {t("caregiver.reminders.important")}</span>
                  )}
                </span>
                <span className="cg-table__cell" data-label={t("caregiver.orders.status")}>
                  <StatusBadge
                    tone={reminder.completed ? "ok" : "warn"}
                    label={reminder.completed ? t("caregiver.status.completed") : t("caregiver.status.pending")}
                  />
                </span>
                <span className="cg-table__cell" data-label={t("caregiver.reminders.action")}>
                  <button
                    type="button"
                    className="cg-btn cg-btn--secondary cg-btn--sm"
                    onClick={() => app.toggleReminder(reminder.id)}
                  >
                    {reminder.completed ? t("caregiver.reminders.undo") : t("caregiver.reminders.markDone")}
                  </button>
                </span>
                <span className="cg-table__cell" data-label=" ">
                  <button
                    type="button"
                    className="cg-btn cg-btn--ghost cg-btn--sm text-(--cg-alert)"
                    onClick={() => setToDelete(reminder)}
                    aria-label={t("caregiver.reminders.delete")}
                  >
                    🗑
                  </button>
                </span>
              </div>
            ))}
          </div>
        )}
      </CareCard>

      <ConfirmDialog
        open={Boolean(toDelete)}
        title={t("caregiver.reminders.deleteTitle")}
        message={t("caregiver.reminders.deleteMessage")}
        confirmLabel={t("caregiver.reminders.delete")}
        tone="danger"
        onCancel={() => setToDelete(null)}
        onConfirm={() => {
          if (toDelete) app.deleteReminder(toDelete.id);
          setToDelete(null);
        }}
      />
    </div>
  );
}