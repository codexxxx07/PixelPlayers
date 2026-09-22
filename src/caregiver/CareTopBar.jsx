import { useTranslation } from "react-i18next";
import { UserButton } from "@clerk/react";
import ThemePullCord from "../components/ThemePullCord";
import ElderSwitcher from "./components/ElderSwitcher";

const PAGE_TITLES = {
  "/caregiver/dashboard": "caregiver.nav.dashboard",
  "/caregiver/elder": "caregiver.nav.elder",
  "/caregiver/meals": "caregiver.nav.meals",
  "/caregiver/medicines": "caregiver.nav.medicines",
  "/caregiver/routine": "caregiver.nav.routine",
  "/caregiver/reminders": "caregiver.nav.reminders",
  "/caregiver/activities": "caregiver.nav.activities",
  "/caregiver/messages": "caregiver.nav.messages",
  "/caregiver/orders": "caregiver.nav.orders",
  "/caregiver/settings": "caregiver.nav.settings",
};

export default function CareTopBar({ pathname, onOpenMobile }) {
  const { t } = useTranslation();
  const title = PAGE_TITLES[pathname] ? t(PAGE_TITLES[pathname]) : t("caregiver.topbarFallback");

  return (
    <header className="cg-topbar">
      <button
        type="button"
        className="cg-topbar__burger"
        onClick={onOpenMobile}
        aria-label={t("caregiver.openMenu")}
        aria-expanded="false"
      >
        ☰
      </button>
      <div className="cg-topbar__title">
        <strong>{title}</strong>
        <span className="cg-topbar__sub">{t("caregiver.topbarSub")}</span>
      </div>
      <ElderSwitcher />
      <ThemePullCord />
      <UserButton
        appearance={{
          elements: {
            avatarBox: "w-9 h-9 rounded-full",
          },
        }}
      />
    </header>
  );
}