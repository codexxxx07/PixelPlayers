import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";
import { VoiceButton, Waveform } from "../components";
import ClaraAvatar from "./ClaraAvatar";
import { AiBubble, ClaraBadge, ThinkingBubble, UserBubble } from "./ClaraChat";
import useConversation from "../services/useConversation";
import { SUGGESTIONS } from "../services/chat";

export default function ClaraLauncher() {
  const { user, memories, routine, reminders, games, supportNetwork, currentTime } = useApp();
  const { t } = useTranslation();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const {
    messages,
    input,
    setInput,
    thinking,
    streamingId,
    voiceState,
    voiceTranscript,
    statusText,
    endRef,
    submit,
    toggleVoice,
    stopVoice,
    handleStreamDone,
    resetChat,
    handleAction,
    handleChip,
  } = useConversation({ user, memories, routine, reminders, games, supportNetwork, currentTime });

  useEffect(() => {
    if (!open && "speechSynthesis" in window) window.speechSynthesis.cancel();
  }, [open]);

  const toggleOpen = () => setOpen((prev) => !prev);

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  if (location.pathname === "/assistant") return null;

  return (
    <div className="fixed z-50 right-3 bottom-3 sm:right-6 sm:bottom-6">
      {open && (
        <div className="absolute right-0 bottom-[76px] w-[min(92vw,400px)] max-h-[76vh] flex flex-col rounded-3xl bg-white border-2 border-teal-100 shadow-2xl shadow-teal-900/25 overflow-hidden animate-slide-up">
          <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-teal-50 to-amber-50 border-b border-teal-100">
            <ClaraBadge className="w-11 h-11 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-pixel text-[8px] text-teal-800 tracking-wider">{t("assistant.clara")}</p>
              <p className="text-[11px] text-gray-500 truncate">{t("assistant.claraSubtitle")}</p>
              <p className="text-teal-700 font-bold text-sm truncate">{statusText}</p>
            </div>
            <button
              type="button"
              onClick={resetChat}
              aria-label={t("chat.startNewChat")}
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-white border-2 border-teal-200 hover:bg-teal-50 text-teal-800 text-sm transition-colors"
            >
              <span aria-hidden="true">↻</span>
            </button>
            <Link
              to="/assistant"
              className="flex-shrink-0 inline-flex items-center gap-1 rounded-xl bg-white border-2 border-teal-200 hover:bg-teal-50 text-teal-800 px-3 py-1.5 text-xs font-bold transition-colors"
            >
              {t("chat.fullChat")}
              <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={toggleOpen}
              aria-label={t("chat.closeChat")}
              className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl bg-white border-2 border-teal-200 hover:bg-teal-50 text-teal-800 text-sm transition-colors"
            >
              <span aria-hidden="true">✕</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 buddy-chat-bg min-h-[300px] max-h-[46vh]" aria-live="polite" aria-label={t("chat.chatAriaLabel")}>
            {messages.map((message) =>
              message.role === "user" ? (
                <UserBubble key={message.id} message={message} />
              ) : (
                <AiBubble
                  key={message.id}
                  message={message}
                  isStreaming={message.id === streamingId && message.stream}
                  onDone={handleStreamDone}
                  onAction={handleAction}
                  onChip={handleChip}
                />
              )
            )}
            {thinking && <ThinkingBubble />}
            <div ref={endRef} />
          </div>

          {voiceState !== "idle" && (
            <div className="border-t border-teal-100 bg-white px-4 py-3" aria-live="polite">
              {voiceState === "listening" ? (
                <div className="flex items-center gap-3">
                  <ClaraBadge className="w-10 h-10 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-pixel text-[8px] text-red-500 tracking-wider">{t("assistant.listening")}</p>
                    {voiceTranscript ? (
                      <p className="text-teal-800 text-sm mt-0.5 font-semibold truncate">{voiceTranscript}</p>
                    ) : (
                      <Waveform bars={7} color="#0d9488" className="mt-1 text-teal-600" />
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={stopVoice}
                    className="flex-shrink-0 inline-flex items-center gap-1.5 rounded-xl bg-white border-2 border-red-200 hover:bg-red-50 text-red-600 px-3 py-2 text-xs font-bold transition-colors"
                  >
                    <span aria-hidden="true">⏹</span>
                    {t("assistant.stop")}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <ClaraBadge className="w-10 h-10 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-pixel text-[8px] text-teal-700 tracking-wider">{t("assistant.thinking")}</p>
                    <p className="text-gray-500 text-sm mt-0.5">{t("assistant.justAMoment")}</p>
                  </div>
                  <span className="inline-block w-6 h-6 rounded-full border-4 border-teal-200 border-t-teal-600 animate-spin flex-shrink-0" aria-hidden="true" />
                </div>
              )}
            </div>
          )}

          <div className="px-4 pt-3 flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion.label}
                type="button"
                onClick={() => handleChip(suggestion)}
                className="flex-shrink-0 inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-teal-200 bg-white hover:bg-teal-50 text-teal-800 px-3 py-2 text-xs font-bold transition-colors"
              >
                <span aria-hidden="true">{suggestion.icon}</span>
                {t(suggestion.labelKey)}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="p-3 border-t border-teal-100 bg-[#FFF8F0]">
            <div className="flex items-end gap-2">
              <div className="flex-1">
                <label htmlFor="clara-floater-input" className="sr-only">
                  {t("assistant.typeMessage")}
                </label>
                <textarea
                  id="clara-floater-input"
                  rows={1}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault();
                      submit();
                    }
                  }}
                  placeholder={t("assistant.askAnything")}
                  className="w-full resize-none rounded-xl border-2 border-teal-200 bg-white px-4 py-3 text-base text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200"
                />
              </div>
              <VoiceButton
                isListening={voiceState === "listening"}
                onToggle={toggleVoice}
                size="md"
                className="flex-shrink-0"
              />
              <button
                type="submit"
                disabled={!input.trim() || thinking || voiceState !== "idle"}
                aria-label={t("assistant.sendMessage")}
                className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-teal-500 to-teal-600 text-white text-xl shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_3px_0_#134e4a] hover:brightness-105 active:translate-y-[2px] active:shadow-[0_1px_0_#134e4a] disabled:opacity-40 disabled:pointer-events-none transition-all"
              >
                <span aria-hidden="true">➤</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {!open && (
        <span className="absolute right-[calc(100%+14px)] bottom-4 hidden sm:inline-flex items-center whitespace-nowrap rounded-2xl bg-white border-2 border-teal-100 shadow-lg px-4 py-3 text-teal-800 font-bold text-sm">
          {t("assistant.askAnything")}
        </span>
      )}

      <button
        type="button"
        onClick={toggleOpen}
        aria-label={open ? t("chat.closeChatDetails") : t("chat.openChat")}
        aria-expanded={open}
        className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-b from-teal-400 to-teal-600 border-2 border-teal-700/40 shadow-[inset_0_2px_0_rgba(255,255,255,0.35),0_6px_16px_rgba(19,78,74,0.35)] hover:brightness-105 active:scale-95 transition-all overflow-hidden"
      >
        <ClaraAvatar size="lg" className="w-12 h-12" />
      </button>
    </div>
  );
}
