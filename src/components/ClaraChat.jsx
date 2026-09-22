/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ClaraAvatar from "./ClaraAvatar";
import { useTranslation } from "react-i18next";
import { speakText } from "../services/chat";

export function useTypewriter(text, active) {
  const words = text.split(" ");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return undefined;
    const step = Math.max(1, Math.round(words.length / 16));
    const id = window.setInterval(() => {
      setCount((current) => Math.min(words.length, current + step));
    }, 38);
    return () => window.clearInterval(id);
  }, [active, words]);

  return {
    shown: active ? words.slice(0, count).join(" ") : text,
    done: active ? count >= words.length : true,
  };
}

function SpeakerIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M11 5 6 9H2v6h4l5 4V5z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 5.5a9 9 0 0 1 0 13" />
    </svg>
  );
}

export function ClaraBadge({ className = "" }) {
  return <ClaraAvatar className={className} />;
}

function ChipButton({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full border-2 border-teal-200 bg-white hover:bg-teal-50 hover:border-teal-300 text-teal-800 px-4 py-2.5 text-sm sm:text-base font-bold transition-all shadow-[0_2px_0_rgba(19,78,74,0.15)] active:translate-y-[2px] active:shadow-none"
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      {label}
    </button>
  );
}

function ActionButton({ action, onClick }) {
  const { t } = useTranslation();
  const primary =
    "inline-flex items-center gap-2 rounded-xl bg-linear-to-b from-teal-500 to-teal-600 text-white px-5 py-3 text-base font-extrabold shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_3px_0_#134e4a] hover:brightness-105 active:translate-y-[2px] active:shadow-[0_1px_0_#134e4a]";
  const ghost =
    "inline-flex items-center gap-2 rounded-xl bg-white text-teal-800 border-2 border-teal-200 hover:bg-teal-50 px-5 py-3 text-base font-extrabold shadow-[0_2px_0_rgba(19,78,74,0.15)] active:translate-y-[2px] active:shadow-none";

  const content = (
    <>
      {action.icon && <span aria-hidden="true">{action.icon}</span>}
      <span>{action.labelKey ? t(action.labelKey, action.labelValues) : action.label}</span>
    </>
  );

  if (action.to) {
    return (
      <Link to={action.to} className={primary}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" onClick={() => onClick(action)} className={ghost}>
      {content}
    </button>
  );
}

export function AiBubble({ message, isStreaming, onDone, onAction, onChip }) {
  const { t } = useTranslation();
  const { shown, done } = useTypewriter(message.text, isStreaming);

  useEffect(() => {
    if (done && isStreaming) onDone(message.id);
  }, [done, isStreaming, message.id, onDone]);

  return (
    <div className="flex items-start gap-3 animate-slide-up">
      <ClaraBadge className="w-12 h-12 shrink-0 mt-1" />

      <div className="max-w-[85%] sm:max-w-[78%] min-w-0">
        <div className="buddy-bubble px-4 py-3.5 sm:px-5 sm:py-4">
          <div className="flex items-center justify-between gap-3 mb-1.5">
            <p className="font-pixel text-[8px] text-teal-700 tracking-wider">{t("assistant.clara")}</p>
            <div className="flex items-center gap-2">
              {message.time && <span className="text-[11px] text-gray-400">{message.time}</span>}
              <button
                type="button"
                onClick={() => speakText(message.text)}
                aria-label={t("chat.readAloud")}
                title={t("chat.readAloud")}
                className="inline-flex items-center gap-1 rounded-full border border-teal-200 bg-white px-2.5 py-1 text-teal-700 text-xs font-bold hover:bg-teal-50 transition-colors"
              >
                <SpeakerIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t("chat.listen")}</span>
              </button>
            </div>
          </div>

          <p className="text-base md:text-lg leading-relaxed text-gray-800 whitespace-pre-wrap">
            {shown}
            {isStreaming && !done && (
              <span className="inline-block w-2 h-5 bg-teal-500 align-middle ml-0.5 animate-caret-blink" aria-hidden="true" />
            )}
          </p>
        </div>

        {done && message.actions.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.actions.map((action, index) => (
              <ActionButton key={`${action.label}-${index}`} action={action} onClick={onAction} />
            ))}
          </div>
        )}

        {done && message.chips.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {message.chips.map((chip, index) => (
              <ChipButton key={`${chip.label}-${index}`} icon={chip.icon} label={chip.labelKey ? t(chip.labelKey) : chip.label} onClick={() => onChip(chip)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function UserBubble({ message }) {
  return (
    <div className="flex justify-end animate-slide-up">
      <div className="max-w-[85%] sm:max-w-[70%]">
        <div className="rounded-2xl rounded-br-md bg-linear-to-b from-teal-500 to-teal-600 text-white px-4 py-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_3px_0_rgba(19,78,74,0.55)]">
          <p className="text-base md:text-lg leading-relaxed whitespace-pre-wrap">{message.text}</p>
        </div>
        <p className="text-[11px] text-gray-400 mt-1 text-right">{message.time}</p>
      </div>
    </div>
  );
}

export function ThinkingBubble() {
  const { t } = useTranslation();
  return (
    <div className="flex items-start gap-3">
      <ClaraBadge className="w-12 h-12 shrink-0 mt-1" />
      <div className="buddy-bubble px-5 py-4">
        <div className="flex items-center gap-3">
          <span className="font-pixel text-[9px] text-teal-700 tracking-wider">{t("assistant.thinking")}</span>
          <span className="flex items-center gap-1" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-2 h-2 rounded-full bg-teal-500 thinking-pixel"
                style={{ animationDelay: `${i * 180}ms` }}
              />
            ))}
          </span>
        </div>
      </div>
    </div>
  );
}
