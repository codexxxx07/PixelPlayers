import { SignIn } from "@clerk/react";
import AuthShell from "../components/AuthShell";

export default function Login() {
  return (
    <AuthShell
      chromeless
      eyebrow="Welcome back"
      title="Log In"
      subtitle="Jump back in and keep your mind sharp"
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