import { useTranslation } from "react-i18next";

const SIZES = {
  sm: "w-12 h-12",
  md: "w-14 h-14",
  lg: "w-16 h-16",
  xl: "w-20 h-20 lg:w-24 lg:h-24",
};

const MIC_SIZES = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-7 h-7",
  xl: "w-8 h-8 lg:w-10 lg:h-10",
};

function MicIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="17" x2="12" y2="22" />
    </svg>
  );
}

export default function VoiceButton({ isListening = false, onToggle, size = "md", className = "" }) {
  const { t } = useTranslation();
  const base =
    "relative z-10 flex items-center justify-center rounded-full transition-all duration-300 select-none touch-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500";

  const idle =
    "bg-gradient-to-b from-teal-400 to-teal-600 text-white border-2 border-teal-700/40 shadow-[inset_0_2px_0_rgba(255,255,255,0.35),0_4px_0_#134e4a,0_10px_16px_rgba(19,78,74,0.28)] hover:brightness-105 active:translate-y-1 active:shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_1px_0_#134e4a]";

  const active =
    "bg-gradient-to-b from-red-400 to-red-600 text-white border-2 border-red-700/50 shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_4px_0_#7f1d1d,0_10px_18px_rgba(190,18,60,0.35)] active:translate-y-1 active:shadow-[inset_0_2px_0_rgba(255,255,255,0.2),0_1px_0_#7f1d1d]";

  return (
    <div className={`relative inline-flex items-center justify-center ${SIZES[size]} ${className}`}>
      {isListening && (
        <>
          <span className="voice-ring text-red-400/70" style={{ animationDelay: "0ms" }} />
          <span className="voice-ring text-red-400/50" style={{ animationDelay: "550ms" }} />
          <span className="voice-ring text-red-400/30" style={{ animationDelay: "1100ms" }} />
        </>
      )}

      <button
        type="button"
        onClick={onToggle}
        aria-label={isListening ? t('chat.stopVoice') : t('chat.startVoice')}
        aria-pressed={isListening}
        className={`${base} ${isListening ? active : idle} ${SIZES[size]}`}
      >
        <MicIcon className={MIC_SIZES[size]} />
      </button>
    </div>
  );
}