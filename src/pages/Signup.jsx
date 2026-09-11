import { useState } from "react";
import { Link } from "react-router-dom";
import AuthShell from "../components/AuthShell";
import AuthField from "../components/AuthField";

const MIN_PASSWORD_LENGTH = 8;

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const next = {};
    if (!name.trim()) {
      next.name = "Please tell us your name.";
    }
    if (!email.trim()) {
      next.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      next.email = "That email address does not look right.";
    }
    if (!password) {
      next.password = "Please choose a password.";
    } else if (password.length < MIN_PASSWORD_LENGTH) {
      next.password = `Use at least ${MIN_PASSWORD_LENGTH} characters.`;
    }
    if (confirmPassword !== password) {
      next.confirmPassword = "The passwords do not match.";
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
      eyebrow="Join us"
      title="Create Account"
      subtitle="Start your cognitive journey today"
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <AuthField
          id="name"
          label="Name"
          type="text"
          icon="👤"
          value={name}
          onChange={(event) => setName(event.target.value)}
          autoComplete="name"
          placeholder="Your full name"
          required
          error={errors.name}
        />

        <AuthField
          id="email"
          label="Email"
          type="email"
          icon="✉️"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          placeholder="you@example.com"
          required
          error={errors.email}
        />

        <AuthField
          id="password"
          label="Password"
          type="password"
          icon="🔒"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
          placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
          hint={`Use at least ${MIN_PASSWORD_LENGTH} characters.`}
          minLength={MIN_PASSWORD_LENGTH}
          required
          error={errors.password}
        />

        <AuthField
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          icon="🔒"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          autoComplete="new-password"
          placeholder="Type your password again"
          required
          error={errors.confirmPassword}
        />

        <button
          type="submit"
          className="skeuo-btn skeuo-btn-primary skeuo-btn-block font-body text-xl font-extrabold py-4"
        >
          Sign Up
        </button>
      </form>

      <p className="mt-6 text-center text-lg font-medium text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-extrabold text-teal-700 underline decoration-teal-300 underline-offset-4 hover:text-teal-600 transition-colors"
        >
          Log In
        </Link>
      </p>
    </AuthShell>
  );
}