import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useTranslation } from "react-i18next";
import { VoiceButton, Waveform } from "../components";
import { AiBubble, ClaraBadge, ThinkingBubble, UserBubble } from "../components/ClaraChat";
import useConversation from "../services/useConversation";
import { SUGGESTIONS, timeLabel } from "../services/chat";
import { formatDate, getTimeOfDay } from "../services/api";

function ActionCard({ icon, titleKey, titleValues, linesKeys = [], to, ctaKey }) {
  const { t } = useTranslation();
  return (
    <div className="skeuo-card p-5 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-3">
        <span className="w-11 h-11 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-b from-teal-50 to-amber-50 border-2 border-teal-100 text-2xl" aria-hidden="true">
          {icon}
        </span>
        <h2 className="font-pixel text-[9px] text-teal-800 leading-relaxed">{t(titleKey, titleValues)}</h2>
      </div>
      <div className="space-y-1.5 mb-4 flex-1">
        {linesKeys.map((line, index) => (
          <p key={index} className="text-gray-600 text-base leading-snug">
            {typeof line === "string" ? t(line) : t(line.key, line.values)}
          </p>
        ))}
      </div>
      {to && (
        <Link
          to={to}
          className="inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-b from-teal-500 to-teal-600 text-white px-5 py-3 text-base font-extrabold shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_3px_0_#134e4a] hover:brightness-105 active:translate-y-[2px] active:shadow-[0_1px_0_#134e4a]"
        >
          {t(ctaKey)}
          <span aria-hidden="true">→</span>
        </Link>
      )}
    </div>
  );
}

const TOD_KEYS = {
  morning: "assistant.todMorning",
  afternoon: "assistant.todAfternoon",
  evening: "assistant.todEvening",
};

function getContextCard(ctx, data, t) {
  const tod = getTimeOfDay(data.currentTime) || "day";
  const nextR = data.routine.find((r) => !r.completed) || null;
  const meds = data.reminders.filter((r) => r.important && !r.completed);

  switch (ctx) {
    case "game": {
      const game = data.games[0];
      if (!game) break;
      return {
        icon: "🧩",
        titleKey: "assistant.gameCardTitle",
        linesKeys: [
          { key: "assistant.gameLine1", values: { name: game.name, duration: game.duration } },
          game.skillTarget,
          "assistant.gameLine3",
        ],
        to: "/games",
        ctaKey: "assistant.browseGames",
      };
    }
    case "memory": {
      const mem = data.memories.find((m) => m.favorite) || data.memories[0];
      return {
        icon: "💭",
        titleKey: "assistant.memoryCardTitle",
        linesKeys: [
          mem ? mem.title : "assistant.memoryVault",
          mem ? mem.description : "assistant.saveMoment",
        ],
        to: "/memory",
        ctaKey: "assistant.openMemoryVault",
      };
    }
    case "routine":
      return {
        icon: "📅",
        titleKey: "assistant.routineCardTitle",
        linesKeys: [
          nextR
            ? { key: "assistant.routineLine1", values: { title: nextR.title, time: timeLabel(nextR.time) } }
            : "assistant.restfulPause",
          nextR ? nextR.description : "assistant.goodMomentRelax",
        ],
        to: "/routine",
        ctaKey: "assistant.viewMyRoutine",
      };
    case "reminder": {
      const m = meds[0];
      return {
        icon: "💊",
        titleKey: "assistant.reminderCardTitle",
        linesKeys: [m ? m.title : "assistant.allClear", m ? m.description : ""],
        to: "/reminders",
        ctaKey: "assistant.openReminders",
      };
    }
    case "where":
      return {
        icon: "🗺️",
        titleKey: "assistant.whereCardTitle",
        linesKeys: [
          { key: "assistant.whereLine1", values: { date: formatDate(data.currentTime) } },
          "assistant.whereLine2",
        ],
        to: "/support",
        ctaKey: "assistant.reachFamily",
      };
    case "help":
      return {
        icon: "✨",
        titleKey: "assistant.helpCardTitle",
        linesKeys: ["assistant.helpLine1", "assistant.helpLine2", "assistant.helpLine3"],
        to: "/assistant",
        ctaKey: "assistant.askAnything",
      };
    default:
      break;
  }

  return {
    icon: "🌅",
    titleKey: "assistant.defaultCardTitle",
    titleValues: { tod: t(TOD_KEYS[tod] || "assistant.todMorning") },
    linesKeys: ["assistant.defaultLine1", "assistant.defaultLine2"],
    to: "/dashboard",
    ctaKey: "assistant.seeMyDay",
  };
}

export default function Assistant() {
  const { t } = useTranslation();
  const { user, memories, routine, reminders, games, supportNetwork, currentTime } = useApp();
  const {
    messages,
    input,
    setInput,
    thinking,
    streamingId,
    voiceState,
    voiceTranscript,
    aiContext,
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

  const handleSubmit = (event) => {
    event.preventDefault();
    submit();
  };

  const nextR = routine.find((r) => !r.completed) || null;
  const pendingMeds = reminders.filter((r) => r.important && !r.completed);
  const contextCard = getContextCard(aiContext, {
    user,
    memories,
    routine,
    reminders,
    games,
    supportNetwork,
    currentTime,
  }, t);

  return (
    <div className="page-enter min-h-screen pb-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 py-8 md:py-10">
        <div className="lg:hidden mb-6 animate-pixel-fade-in">
          <div className="skeuo-card flex items-center gap-4 p-5">
            <ClaraBadge className="w-16 h-16 flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-pixel text-[10px] text-teal-800 mb-1">{t('assistant.clara')}</p>
              <p className="text-sm text-gray-500 truncate">{t('assistant.claraSubtitle')}</p>
              <p className="text-sm text-gray-500 truncate">{formatDate(currentTime)}</p>
              <p className="text-teal-700 font-extrabold text-base mt-1">{statusText}</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[290px_minmax(0,1fr)_310px] gap-6 items-start">
          <aside className="hidden lg:block lg:sticky lg:top-24 space-y-5">
            <div className="skeuo-card p-5 animate-pixel-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <ClaraBadge className="w-16 h-16 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="font-pixel text-[9px] text-teal-800 leading-relaxed">{t('assistant.clara')}</p>
                  <p className="text-sm text-gray-500 mt-1">{t('assistant.claraSubtitle')}</p>
                  <p className="text-sm text-gray-500 mt-1">{formatDate(currentTime)}</p>
                </div>
              </div>
              <p className="text-gray-700 text-lg leading-snug">{statusText}</p>
            </div>

            <div className="skeuo-card p-5">
              <h2 className="font-pixel text-[9px] text-teal-800 tracking-wider mb-4">{t('assistant.thingsYouCanAsk')}</h2>
              <div className="space-y-2">
                {SUGGESTIONS.map((suggestion) => (
                  <button
                    key={suggestion.label}
                    type="button"
                    onClick={() => submit(suggestion.label)}
                    className="w-full text-left flex items-center gap-3 rounded-xl border-2 border-warm-200 bg-warm-50/60 hover:bg-warm-100 hover:border-primary-lighter px-4 py-3.5 text-gray-700 font-bold text-base transition-colors"
                  >
                    <span className="text-xl" aria-hidden="true">
                      {suggestion.icon}
                    </span>
                    {t(suggestion.labelKey)}
                  </button>
                ))}
              </div>
            </div>

            <div className="skeuo-card p-5">
              <h2 className="font-pixel text-[9px] text-teal-800 tracking-wider mb-4">{t('assistant.todayAtAGlance')}</h2>
              <div className="space-y-3 text-gray-700">
                <Link to="/routine" className="flex items-center gap-3 hover:bg-amber-50 rounded-xl p-2 -m-2 transition-colors">
                  <span className="text-2xl" aria-hidden="true">📅</span>
                  <div>
                    <p className="text-sm text-gray-400">{t('assistant.upNext')}</p>
                    <p className="font-bold text-base">{nextR ? t('assistant.upNextValue', { title: nextR.title, time: timeLabel(nextR.time) }) : t('assistant.restfulPause')}</p>
                  </div>
                </Link>
                <Link to="/reminders" className="flex items-center gap-3 hover:bg-amber-50 rounded-xl p-2 -m-2 transition-colors">
                  <span className="text-2xl" aria-hidden="true">💊</span>
                  <div>
                    <p className="text-sm text-gray-400">{t('assistant.toLookAfter')}</p>
                    <p className="font-bold text-base">{pendingMeds.length ? t('assistant.reminderCount', { count: pendingMeds.length }) : t('assistant.allClear')}</p>
                  </div>
                </Link>
                <Link to="/memory" className="flex items-center gap-3 hover:bg-amber-50 rounded-xl p-2 -m-2 transition-colors">
                  <span className="text-2xl" aria-hidden="true">💭</span>
                  <div>
                    <p className="text-sm text-gray-400">{t('assistant.memoriesSaved')}</p>
                    <p className="font-bold text-base">{t('assistant.treasured', { count: memories.length })}</p>
                  </div>
                </Link>
              </div>
            </div>
          </aside>

          <div className="rounded-3xl bg-white border-2 border-teal-100 shadow-[0_8px_30px_rgba(19,78,74,0.08)] overflow-hidden flex flex-col">
            <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-teal-50 to-amber-50 border-b border-teal-100">
              <ClaraBadge className="w-14 h-14 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="font-pixel text-[9px] text-teal-800 tracking-wider">{t('assistant.clara')}</p>
                <p className="text-xs text-gray-500 truncate">{t('assistant.claraSubtitle')}</p>
                <p className="text-teal-700 font-bold text-sm sm:text-base mt-0.5 truncate">{statusText}</p>
              </div>
              <button
                type="button"
                onClick={resetChat}
                className="inline-flex items-center gap-2 rounded-xl bg-white border-2 border-teal-200 hover:bg-teal-50 text-teal-800 px-4 py-2.5 text-sm font-bold transition-colors"
              >
                <span aria-hidden="true">↻</span>
                <span className="hidden sm:inline">{t('assistant.newChat')}</span>
              </button>
            </div>

            <div
              className="flex-1 h-[52vh] min-h-[420px] overflow-y-auto p-5 space-y-5 buddy-chat-bg"
              aria-live="polite"
              aria-label={t('assistant.conversationLabel')}
            >
              <p className="text-center text-xs font-bold uppercase tracking-wider text-gray-400">{t('assistant.conversationToday')}</p>

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
              <div className="border-t border-teal-100 bg-gradient-to-r from-teal-50 via-amber-50 to-teal-50 px-5 py-4" aria-live="polite">
                {voiceState === "listening" ? (
                  <div className="flex items-center gap-4">
                    <ClaraBadge className="w-14 h-14 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-pixel text-[9px] text-red-500 tracking-wider">{t('assistant.listening')}</p>
                      {voiceTranscript ? (
                        <p className="text-teal-800 text-lg mt-1 font-semibold leading-snug">{voiceTranscript}</p>
                      ) : (
                        <Waveform bars={9} color="#0d9488" className="mt-2 text-teal-600" />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={stopVoice}
                      className="flex-shrink-0 inline-flex items-center gap-2 rounded-xl bg-white border-2 border-red-200 hover:bg-red-50 text-red-600 px-4 py-2.5 text-sm font-bold transition-colors"
                    >
                      <span aria-hidden="true">⏹</span>
                      <span className="hidden sm:inline">{t('assistant.stop')}</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <ClaraBadge className="w-14 h-14 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-pixel text-[9px] text-teal-700 tracking-wider">{t('assistant.thinking')}</p>
                      <p className="text-gray-500 text-base mt-1">{t('assistant.justAMoment')}</p>
                    </div>
                    <span className="inline-block w-8 h-8 rounded-full border-4 border-teal-200 border-t-teal-600 animate-spin flex-shrink-0" aria-hidden="true" />
                  </div>
                )}
              </div>
            )}

            <div className="px-4 pt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden scrollbar-hide">
              {SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion.label}
                  type="button"
                  onClick={() => handleChip(suggestion)}
                  className="flex-shrink-0 inline-flex items-center gap-2 whitespace-nowrap rounded-full border-2 border-teal-200 bg-white hover:bg-teal-50 text-teal-800 px-4 py-2.5 text-sm font-bold transition-colors"
                >
                  <span aria-hidden="true">{suggestion.icon}</span>
                  {t(suggestion.labelKey)}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-teal-100 bg-[#FFF8F0]">
              <div className="flex items-end gap-3">
                <div className="flex-1">
                  <label htmlFor="chat-input" className="sr-only">
                    {t('assistant.typeMessage')}
                  </label>
                  <textarea
                    id="chat-input"
                    rows={2}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        submit();
                      }
                    }}
                    placeholder={t('assistant.messagePlaceholder')}
                    className="w-full resize-none rounded-2xl border-2 border-teal-200 bg-white px-5 py-4 text-lg text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-200 shadow-[inset_0_2px_4px_rgba(63,40,25,0.06)]"
                  />
                </div>

                <VoiceButton
                  isListening={voiceState === "listening"}
                  onToggle={toggleVoice}
                  size="xl"
                  className="flex-shrink-0"
                />

                <button
                  type="submit"
                  disabled={!input.trim() || thinking || voiceState !== "idle"}
                  aria-label={t('assistant.sendMessage')}
                  className="flex-shrink-0 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-b from-teal-500 to-teal-600 text-white font-pixel text-[10px] px-4 sm:px-6 h-20 sm:h-24 shadow-[inset_0_2px_0_rgba(255,255,255,0.3),0_4px_0_#134e4a] hover:brightness-105 active:translate-y-1 active:shadow-[0_1px_0_#134e4a] disabled:opacity-40 disabled:pointer-events-none transition-all"
                >
                  <span className="hidden sm:inline">{t('assistant.send')}</span><span aria-hidden="true">➤</span>
                </button>
              </div>
            </form>
          </div>

          <aside className="hidden lg:block lg:sticky lg:top-24 space-y-5">
            <div className="animate-pixel-fade-in">
              <div className="flex items-center gap-2 mb-3">
                <span className="font-pixel text-[9px] text-teal-700 tracking-wider">{t('assistant.forYou')}</span>
                <span className="flex-1 h-0.5 rounded-full bg-teal-100" aria-hidden="true" />
              </div>
              <ActionCard {...contextCard} />
            </div>

            <div className="skeuo-card p-5">
              <h2 className="font-pixel text-[9px] text-teal-800 tracking-wider mb-4">{t('assistant.yourCircle')}</h2>
              <div className="space-y-3">
                {supportNetwork.slice(0, 3).map((person) => (
                  <div key={person.id} className="flex items-center gap-3">
                    <span className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-full bg-amber-100 border-2 border-amber-200 text-xl" aria-hidden="true">
                      {person.icon}
                    </span>
                    <div className="min-w-0">
                      <p className="font-bold text-base text-gray-700">{person.name}</p>
                      <p className="text-sm text-gray-400">{person.relationship}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link
                to="/support"
                className="mt-4 inline-flex items-center gap-2 rounded-xl border-2 border-teal-200 bg-white hover:bg-teal-50 text-teal-800 px-4 py-2.5 text-sm font-bold transition-colors"
              >
                {t('assistant.reachOutToFamily')}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="rounded-3xl bg-teal-50 border-2 border-teal-100 p-5">
              <p className="text-sm text-teal-700 leading-relaxed">
                <span className="font-bold">{t('assistant.tip')}</span> {t('assistant.tipText')}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}