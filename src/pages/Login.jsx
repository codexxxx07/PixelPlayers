import { SignIn } from "@clerk/react";
import { useTranslation } from "react-i18next";
import AuthShell from "../components/AuthShell";

export default function Login() {
  const { t } = useTranslation();
  return (
    <AuthShell
      chromeless
      eyebrow={t("auth.welcomeBack")}
      title={t("auth.loginTitle")}
      subtitle={t("auth.loginSubtitle")}
    >
      <SignIn
        signUpUrl="/signup"
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