import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useCare } from "../../context/CareContext";
import { getActivitySummary, getRecentActivity } from "../../services/care/activity";
import {
  CarePageHeader,
  CareCard,
  CareSectionTitle,
  MetricTile,
  EmptyState,
} from "../../caregiver/components";

export default function Activities() {
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

  const summary = getActivitySummary(app.progressData);
  const recent = getRecentActivity(app.activityLog, 5);
  const weekly = summary.weeklyData || [];
  const maxGames = Math.max(1, ...weekly.map((day) => day.games || 0));

  return (
    <div className="space-y-6">
      <CarePageHeader
        kicker={t("caregiver.activities.kicker")}
        title={t("caregiver.activities.title")}
        subtitle={t("caregiver.activities.subtitle", { name: selectedElder.profile?.name })}
      />

      <div className="cg-disclaimer">{t("caregiver.activities.disclaimer")}</div>

      <div className="cg-metric-grid">
        <MetricTile icon="🎮" label={t("caregiver.activities.gamesCompleted")} value={summary.gamesCompleted} />
        <MetricTile icon="🎯" label={t("caregiver.activities.accuracy")} value={summary.accuracy} unit="%" />
        <MetricTile icon="⚡" label={t("caregiver.activities.avgResponse")} value={summary.avgResponseTime} />
        <MetricTile icon="🔥" label={t("caregiver.activities.streak")} value={summary.streak} unit={t("caregiver.dashboard.days")} />
        <MetricTile
          icon="🧩"
          label={t("caregiver.activities.activeDays")}
          value={weekly.filter((day) => (day.games || 0) > 0).length}
          unit={`/ ${weekly.length}`}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CareCard pixel>
          <CareSectionTitle icon="📊">{t("caregiver.activities.weeklyGames")}</CareSectionTitle>
          <div className="flex items-end justify-between gap-1 h-36 mt-2">
            {weekly.map((day) => (
              <div key={day.day} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                <span className="text-[11px] font-bold text-(--cg-text-soft) cg-mono">{day.games || 0}</span>
                <div
                  className="w-full rounded-t-lg bg-linear-to-b from-teal-400 to-teal-600"
                  style={{ height: `${Math.max(4, Math.round(((day.games || 0) / maxGames) * 100))}%` }}
                  aria-hidden="true"
                />
                <span className="text-[11px] font-bold text-(--cg-text-muted)">{day.day}</span>
              </div>
            ))}
          </div>
        </CareCard>

        <CareCard>
          <CareSectionTitle icon="🕐">{t("caregiver.activities.recentActivity")}</CareSectionTitle>
          {recent.length === 0 ? (
            <p className="text-sm text-(--cg-text-muted)">{t("caregiver.activities.noRecent")}</p>
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

      <CareCard>
        <CareSectionTitle icon="🎮" right={<Link to="/games" className="cg-btn cg-btn--secondary cg-btn--sm">{t("caregiver.activities.browseGames")} →</Link>}>
          {t("caregiver.activities.suggestGames")}
        </CareSectionTitle>
        <p className="text-sm text-(--cg-text-soft) leading-relaxed max-w-[70ch]">
          {t("caregiver.activities.suggestText")}
        </p>
      </CareCard>
    </div>
  );
}