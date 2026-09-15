import { SignUp } from "@clerk/react";
import { useTranslation } from "react-i18next";
import AuthShell from "../components/AuthShell";

export default function Signup() {
  const { t } = useTranslation();
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