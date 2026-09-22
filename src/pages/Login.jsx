import { Navigate, useLocation } from "react-router-dom";
import { SignIn, useAuth } from "@clerk/react";
import { useTranslation } from "react-i18next";
import AuthShell from "../components/AuthShell";
import { SkeletonAuth } from "../components/Skeleton";
import { getHomeForRole } from "../auth/roles";

export default function Login() {
  const { isLoaded, isSignedIn } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();

  const role =
    typeof location.state?.role === "string" ? location.state.role : null;

  const fromRole = role ? getHomeForRole(role) : null;
  const from =
    fromRole ||
    (typeof location.state?.from === "string" && location.state.from.startsWith("/")
      ? location.state.from
      : "/dashboard");

  if (!isLoaded) return <SkeletonAuth />;
  if (isSignedIn) return <Navigate to={from} replace />;

  return (
    <AuthShell
      chromeless
      eyebrow={t("auth.welcomeBack")}
      title={t("auth.loginTitle")}
      subtitle={
        role
          ? t("role.continuingAs", { role: t(`role.name.${role}`) })
          : t("auth.loginSubtitle")
      }
    >
      {role && (
        <div className="mb-4">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold border bg-teal-50 text-teal-700 border-teal-200">
            {t(`role.icon.${role}`)}
            {t("role.chip", { role: t(`role.name.${role}`) })}
          </span>
        </div>
      )}
      <SignIn
        signUpUrl="/signup"
        fallbackRedirectUrl={from}
        appearance={{
          elements: {
            rootBox: "w-full",
            cardBox: "mx-auto w-full max-w-md",
          },
        }}
      />
    </AuthShell>
  );
}