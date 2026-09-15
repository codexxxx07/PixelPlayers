import { Navigate } from "react-router-dom";
import { SignUp, useAuth } from "@clerk/react";
import { useTranslation } from "react-i18next";
import AuthShell from "../components/AuthShell";
import { SkeletonAuth } from "../components/Skeleton";

export default function Signup() {
  const { isLoaded, isSignedIn } = useAuth();
  const { t } = useTranslation();

  if (!isLoaded) return <SkeletonAuth />;
  if (isSignedIn) return <Navigate to="/dashboard" replace />;

  return (
    <AuthShell
      chromeless
      eyebrow={t("auth.joinUs")}
      title={t("auth.signupTitle")}
      subtitle={t("auth.signupSubtitle")}
    >
      <SignUp
        signInUrl="/login"
        fallbackRedirectUrl="/dashboard"
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