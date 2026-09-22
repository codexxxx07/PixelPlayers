import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/react";
import { useCare } from "../../context/CareContext";
import { getUserDisplayName } from "../../utils/displayName";
import { CarePageHeader, CareCard, CareSectionTitle } from "../../caregiver/components";

const PREF_TOGGLES = [
  { key: "digest", def: true },
  { key: "weekly", def: false },
  { key: "reminders", def: true },
];

export default function CareSettings() {
  const { t } = useTranslation();
  const { user } = useUser();
  const { authorizedElders, selectedElderId, selectElder } = useCare();

  const [prefs, setPrefs] = useState(() =>
    Object.fromEntries(PREF_TOGGLES.map((entry) => [entry.key, entry.def]))
  );

  const name = user ? getUserDisplayName(user) : "";

  const INTEGRATIONS = [
    "caregiver.settings.intPersist",
    "caregiver.settings.intLinks",
    "caregiver.settings.intOrders",
    "caregiver.settings.intMessaging",
  ];

  return (
    <div className="space-y-6">
      <CarePageHeader
        kicker={t("caregiver.settings.kicker")}
        title={t("caregiver.settings.title")}
        subtitle={t("caregiver.settings.subtitle")}
      />

      <CareCard>
        <CareSectionTitle icon="👤">{t("caregiver.settings.accountTitle")}</CareSectionTitle>
        <div className="flex items-center gap-4">
          <span className="cg-elder-avatar" aria-hidden="true">
            {name ? name.charAt(0).toUpperCase() : "?"}
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-base font-black text-(--cg-text)">{name || t("caregiver.settings.unknownUser")}</p>
            <p className="text-sm text-(--cg-text-muted)">{t("caregiver.settings.roleValue")}</p>
          </div>
          <Link to="/welcome" className="cg-btn cg-btn--secondary cg-btn--sm">
            {t("caregiver.switchExperience")}
          </Link>
        </div>
        <div className="mt-4 cg-note">{t("caregiver.settings.accountNote")}</div>
      </CareCard>

      {authorizedElders.length > 0 && (
        <CareCard>
          <CareSectionTitle icon="🧓">{t("caregiver.settings.linkTitle")}</CareSectionTitle>
          <div className="space-y-3">
            {authorizedElders.map((elder) => (
              <label key={elder.elderId} className="flex items-center gap-3 rounded-xl border-2 border-(--cg-line) p-3.5 cursor-pointer bg-(--cg-surface)">
                <input
                  type="radio"
                  name="default-elder"
                  className="w-5 h-5 accent-teal-600"
                  checked={selectedElderId === elder.elderId}
                  onChange={() => selectElder(elder.elderId)}
                />
                <span className="text-xl" aria-hidden="true">{elder.profile?.avatarText || "🧓"}</span>
                <span className="min-w-0 flex-1 font-semibold text-sm text-(--cg-text)">
                  {elder.profile?.name}
                </span>
                <span className="text-[12px] text-(--cg-text-muted)">{elder.profile?.relationship}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 cg-note">{t("caregiver.settings.linkNote")}</div>
        </CareCard>
      )}

      <CareCard>
        <CareSectionTitle icon="⚙️">{t("caregiver.settings.prefTitle")}</CareSectionTitle>
        <div className="space-y-2.5">
          {PREF_TOGGLES.map((entry) => (
            <label key={entry.key} className="flex items-center justify-between gap-3 rounded-xl border-2 border-(--cg-line) p-3.5 cursor-pointer bg-(--cg-surface)">
              <span className="text-sm font-semibold text-(--cg-text-soft)">{t(`caregiver.settings.pref.${entry.key}`)}</span>
              <input
                type="checkbox"
                className="w-5 h-5 accent-teal-600"
                checked={prefs[entry.key]}
                onChange={(event) => setPrefs((prev) => ({ ...prev, [entry.key]: event.target.checked }))}
              />
            </label>
          ))}
        </div>
        <div className="mt-4 cg-note">{t("caregiver.settings.prefNote")}</div>
      </CareCard>

      <CareCard pixel>
        <CareSectionTitle icon="🔌">{t("caregiver.settings.dataTitle")}</CareSectionTitle>
        <p className="text-sm text-(--cg-text-soft) leading-relaxed mb-3">
          {t("caregiver.settings.dataText")}
        </p>
        <ul className="space-y-2">
          {INTEGRATIONS.map((key) => (
            <li key={key} className="flex items-start gap-2.5 text-sm text-(--cg-text-soft)">
              <span className="mt-0.5 text-(--cg-brand-deep)" aria-hidden="true">▸</span>
              {t(key)}
            </li>
          ))}
        </ul>
      </CareCard>
    </div>
  );
}