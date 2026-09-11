import { useState } from "react";

export default function AuthField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  autoComplete,
  hint,
  error,
  required = false,
  icon,
  maxLength,
  minLength,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;

  const baseClasses =
    "w-full rounded-2xl border-2 bg-white px-5 py-4 text-xl font-medium text-warm-900 placeholder:text-gray-400 placeholder:font-normal shadow-[inset_0_3px_8px_rgba(63,40,25,0.09)] transition-all duration-200 outline-none";

  const colorClasses = error
    ? "border-red-400 focus:border-red-500 focus:ring-4 focus:ring-red-200/60"
    : "border-warm-300 hover:border-warm-400 focus:border-teal-500 focus:ring-4 focus:ring-teal-200/70";

  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-lg font-extrabold text-warm-800">
        {label}
        {required && (
          <span className="ml-1 text-teal-600" aria-hidden="true">*</span>
        )}
      </label>
      <div className="relative">
        {icon && (
          <span
            className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-2xl leading-none"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          name={id}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          className={`${baseClasses} ${icon ? "pl-14" : ""} ${
            isPassword ? "pr-16" : ""
          } ${colorClasses}`}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 rounded-xl text-xl transition-colors hover:bg-teal-50 focus-visible:outline focus-visible:outline-3 focus-visible:outline-teal-500"
            aria-label={showPassword ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            tabIndex="0"
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="text-sm text-gray-500 font-medium">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-base font-bold text-red-600 flex items-center gap-1.5">
          <span aria-hidden="true">⚠️</span>
          {error}
        </p>
      )}
    </div>
  );
}