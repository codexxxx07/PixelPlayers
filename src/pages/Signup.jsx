import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AuthShell from "../components/AuthShell";
import AuthField from "../components/AuthField";

const MIN_PASSWORD_LENGTH = 8;

export default function Signup() {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!name.trim()) {
      next.name = t("auth.nameRequired");
    }
    if (!email.trim()) {
      next.email = t("auth.emailRequired");
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      next.email = t("auth.emailInvalid");
    }
    if (!password) {
      next.password = t("auth.passwordChoose");
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      next.password = t("auth.passwordMin", { count: MIN_PASSWORD_LENGTH });
    }
    if (confirmPassword !== password) {
      next.confirmPassword = t("auth.passwordMismatch");
    }
    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };

  return (
    <AuthShell
      eyebrow={t("auth.joinUs")}
      title={t("auth.signupTitle")}
      subtitle={t("auth.signupSubtitle")}
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <AuthField
          id="name"
          label={t("auth.name")}
          type="text"
          icon="👤"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          placeholder={t("auth.namePlaceholder")}
          required
          error={errors.name}
        />

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
          autoComplete="new-password"
          placeholder={t("auth.passwordMinPlaceholder", { count: MIN_PASSWORD_LENGTH })}
          hint={t("auth.passwordMin", { count: MIN_PASSWORD_LENGTH })}
          minLength={MIN_PASSWORD_LENGTH}
          required
          error={errors.password}
        />

        <AuthField
          id="confirmPassword"
          label={t("auth.confirmPassword")}
          type="password"
          icon="🔒"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          placeholder={t("auth.confirmPlaceholder")}
          required
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="skeuo-btn skeuo-btn-primary skeuo-btn-block font-body text-xl font-extrabold py-4"
        >
          {t("auth.signUpLink")}
        </button>
      </form>

      <p className="mt-6 text-center text-lg font-medium text-gray-500">
        {t("auth.haveAccount")}{" "}
        <Link
          to="/login"
          className="font-extrabold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:text-teal-600 transition-colors"
        >
          {t("auth.loginLink")}
        </Link>
      </p>
    </AuthShell>
  );
}