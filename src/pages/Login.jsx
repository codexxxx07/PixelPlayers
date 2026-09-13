import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthShell from "../components/AuthShell";
import AuthField from "../components/AuthField";

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!email.trim()) {
      next.email = t("auth.emailRequired");
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      next.email = t("auth.emailInvalid");
    }
    if (!password) {
      next.password = t("auth.passwordRequired");
    }
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <AuthShell
      eyebrow={t("auth.welcomeBack")}
      title={t("auth.loginTitle")}
      subtitle={t("auth.loginSubtitle")}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <AuthField
          id="email"
          label={t("auth.email")}
          type="email"
          icon="✉️"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder={t("auth.emailPlaceholder")}
          required
          error={errors.email}
        />

        <AuthField
          id="password"
          label={t("auth.password")}
          type="password"
          icon="🔒"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          placeholder={t("auth.passwordPlaceholder")}
          required
          error={errors.password}
        />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <label className="flex items-center gap-3 text-lg font-bold text-warm-800 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.target.checked)}
              className="w-6 h-6 rounded accent-teal-600 shadow-sm"
            />
            {t("auth.rememberMe")}
          </label>
          <Link
            to="/login"
            className="text-lg font-bold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:text-teal-600 transition-colors"
          >
            {t("auth.forgotPassword")}
          </Link>
        </div>

        <button
          type="submit"
          className="skeuo-btn skeuo-btn-primary skeuo-btn-block font-body text-xl font-extrabold py-4"
        >
          {t("auth.loginButton")}
        </button>
      </form>

      <p className="mt-6 text-center text-lg font-medium text-gray-500">
        {t("auth.noAccount")}{" "}
        <Link
          to="/signup"
          className="font-extrabold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:text-teal-600 transition-colors"
        >
          {t("auth.signUpLink")}
        </Link>
      </p>
    </AuthShell>
  );
}