import { SignUp } from "@clerk/react";
import AuthShell from "../components/AuthShell";

export default function Signup() {
  return (
    <AuthShell
      chromeless
      eyebrow="Join us"
      title="Create Account"
      subtitle="Start your cognitive journey today"
    >
      <SignUp signInUrl="/login" fallbackRedirectUrl="/dashboard" />
    </AuthShell>
  );
}