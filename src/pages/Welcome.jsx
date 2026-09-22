import { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { useTranslation } from "react-i18next";
import { useRole, claimRole } from "../auth/useRole";
import { ROLES, getHomeForRole } from "../auth/roles";
import { getUserDisplayName } from "../utils/displayName";

const CARDS = [
  {
    value: ROLES.ELDER,
    icon: "🌸",
    title: "welcome.elderTitle",
    desc: "welcome.elderDesc",
    chip: "welcome.elderChip",
    accent: "elder",
  },
  {
    value: ROLES.CAREGIVER,
    icon: "🧡",
    title: "welcome.caregiverTitle",
    desc: "welcome.caregiverDesc",
    chip: "welcome.caregiverChip",
    accent: "caregiver",
  },
];

export default function Welcome() {
  const { t } = useTranslation();
  const { isLoaded, isSignedIn } = useAuth();
  const { user, role } = useRole();
  const navigate = useNavigate();
  const location = useLocation();
  const [busy, setBusy] = useState(null);

  const pick = (target) => {
    if (target === role) {
      navigate(getHomeForRole(role));
      return;
    }
    if (!isSignedIn) {
      const from = location.state?.from;
      navigate("/login", {
        state: { from: typeof from === "string" && from ? from : undefined, role: target },
      });
      return;
    }
    setBusy(target);
    claimRole(user, target)
      .then(() => navigate(getHomeForRole(target)))
      .catch(() => setBusy(null));
  };

  const displayName = isLoaded && isSignedIn && user ? getUserDisplayName(user) : "";

  return (
    <div className="relative min-h-[80vh] overflow-hidden bg-warm-50 dark:bg-[#141a1f]">
      {/* soft brand backdrop */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -top-24 -left-16 w-80 h-80 rounded-full bg-teal-200/40 blur-3xl dark:bg-teal-900/20" />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-amber-200/40 blur-3xl dark:bg-amber-900/15" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center mb-10">
          <p className="font-[family-name:var(--font-pixel)] text-[10px] text-teal-400 tracking-widest uppercase mb-4">
            {t("welcome.kicker")}
          </p>
          <h1 className="font-[family-name:var(--font-pixel)] text-xl sm:text-2xl md:text-3xl text-teal-700 dark:text-teal-300 leading-relaxed mb-4 tracking-wide">
            {t("welcome.title")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg leading-relaxed max-w-[52ch] mx-auto">
            {t("welcome.subtitle")}
          </p>
          {isSignedIn && user && (
            <p className="mt-3 text-sm text-teal-700 dark:text-teal-300 font-bold">
              {t("welcome.signedInAs", { name: displayName })}
            </p>
          )}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {CARDS.map((card) => {
            const isActive = role === card.value;
            return (
              <button
                key={card.value}
                type="button"
                onClick={() => pick(card.value)}
                disabled={busy === card.value}
                className={`relative flex flex-col items-start gap-4 rounded-3xl border-2 p-6 sm:p-7 text-left transition-all duration-200 group ${
                  isActive
                    ? "border-teal-600 bg-white shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_6px_0_#b8e0d8,0_18px_36px_rgba(13,94,88,0.14)] dark:bg-[#1c242b] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_6px_0_#173832,0_18px_36px_rgba(0,0,0,0.35)]"
                    : card.accent === "caregiver"
                      ? "border-amber-300 bg-white hover:border-amber-400 hover:shadow-[0_10px_24px_rgba(180,83,9,0.12)] dark:bg-[#1c242b] dark:border-amber-500/40 dark:hover:border-amber-400"
                      : "border-teal-200 bg-white hover:border-teal-400 hover:shadow-[0_10px_24px_rgba(13,148,136,0.12)] dark:bg-[#1c242b] dark:border-teal-500/30 dark:hover:border-teal-400"
                } ${busy ? "opacity-70" : ""}`}
              >
                <span
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl text-2xl border-2 shadow-[inset_0_2px_0_rgba(255,255,255,0.35),0_3px_0_rgba(0,0,0,0.15)] ${
                    card.accent === "caregiver"
                      ? "bg-gradient-to-b from-amber-300 to-amber-400 border-amber-500"
                      : "bg-gradient-to-b from-teal-400 to-teal-500 border-teal-600"
                  }`}
                  aria-hidden="true"
                >
                  {card.icon}
                </span>

                <span className="min-w-0">
                  <span className="flex items-center gap-2 flex-wrap">
                    <span className="font-[family-name:var(--font-pixel)] text-sm text-gray-800 dark:text-gray-100 leading-relaxed">
                      {t(card.title)}
                    </span>
                    {isActive && (
                      <span className="rounded-full bg-teal-600 text-white text-[10px] font-bold px-2.5 py-1">
                        {t("welcome.currentRole")}
                      </span>
                    )}
                  </span>
                  <span className="block text-gray-600 dark:text-gray-300 text-base leading-relaxed mt-2">
                    {t(card.desc)}
                  </span>
                  <span className={`inline-flex items-center gap-1.5 mt-4 rounded-full border-2 border-current px-3 py-1.5 text-sm font-bold group-hover:translate-x-0.5 transition-transform ${
                    card.accent === "caregiver"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-teal-700 dark:text-teal-300"
                  }`}>
                    {t(isActive ? "welcome.continue" : busy === card.value ? "welcome.working" : isSignedIn ? "welcome.switch" : "welcome.choose")} →
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 text-center space-y-3">
          {!isSignedIn && (
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t("welcome.newUser")}{" "}
              <Link
                to="/signup"
                className="font-bold text-teal-700 dark:text-teal-300 underline decoration-2 underline-offset-2 hover:text-teal-600"
              >
                {t("welcome.createAccount")}
              </Link>
            </p>
          )}
          <Link
            to="/"
            className="inline-block text-sm text-gray-500 dark:text-gray-400 hover:text-teal-700 dark:hover:text-teal-300 transition-colors"
          >
            ← {t("welcome.backHome")}
          </Link>
        </div>
      </div>
    </div>
  );
}