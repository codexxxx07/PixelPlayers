import i18n from "../i18n";
import { formatDate, formatTime, getTimeOfDay } from "./api";

export const SUGGESTIONS = [
  { icon: "☀️", label: "What's happening today?", labelKey: "chat.suggToday" },
  { icon: "🎯", label: "What comes next?", labelKey: "chat.suggNext" },
  { icon: "💭", label: "Tell me about a memory", labelKey: "chat.suggMemory" },
  { icon: "🧩", label: "Start a gentle game", labelKey: "chat.suggGame" },
  { icon: "💊", label: "Do I have reminders?", labelKey: "chat.suggReminders" },
  { icon: "🍂", label: "I feel a little lost", labelKey: "chat.suggLost" },
];

export const SIM_VOICE_POOL = [
  "Could you tell me how my day is going?",
  "Do I have anything coming up next?",
  "Tell me about a happy memory.",
  "I would like to play a memory game.",
  "What time is it right now?",
];

export function genId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

export function nowTime() {
  return formatTime();
}

export function pick(array) {
  return array[Math.floor(Math.random() * array.length)];
}

export function timeLabel(value) {
  if (!value) return "";
  return new Date(`1970-01-01T${value}:00`).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function speakText(text) {
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    const cleaned = (text || "")
      .replace(/•/g, " ")
      .replace(/\s+/g, " ")
      .replace(/[^a-zA-Z0-9 .,'!?%:]/g, " ");
    const utterance = new SpeechSynthesisUtterance(cleaned);
    utterance.lang = "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1.02;
    window.speechSynthesis.speak(utterance);
  } catch {
    /* speech unavailable */
  }
}

export function buildGreeting(user, currentTime) {
  const tod = getTimeOfDay(currentTime) || "day";
  const greetingKey =
    tod === "morning"
      ? "common.goodMorning"
      : tod === "afternoon"
        ? "common.goodAfternoon"
        : tod === "evening"
          ? "common.goodEvening"
          : "common.goodDay";
  const greeting = i18n.t(greetingKey);
  return [
    {
      id: genId("a"),
      role: "ai",
      text: i18n.t("chat.greeting1", { greeting, name: user.name }),
      time: nowTime(),
      actions: [],
      chips: [],
      stream: false,
      context: "greeting",
    },
    {
      id: genId("a"),
      role: "ai",
      text: i18n.t("chat.greeting2"),
      time: nowTime(),
      actions: [],
      chips: SUGGESTIONS,
      stream: false,
      context: "greeting",
    },
  ];
}

export function getResponse(text, data) {
  const lower = text.toLowerCase();
  const name = data.user.name;
  const nextR = data.routine.find((r) => !r.completed) || null;
  const meds = data.reminders.filter((r) => r.important && !r.completed);
  const favMemories = data.memories.filter((m) => m.favorite);
  const mem = favMemories.length ? pick(favMemories) : data.memories[0];
  const game = data.games[0] || null;

  const gameActions = game
    ? [
        { icon: "🎮", label: `Start ${game.name}`, labelKey: "chat.actionStartGame", labelValues: { game: game.name }, to: game.href },
        { icon: "🕊️", label: "Maybe Later", labelKey: "chat.actionMaybeLater", sendText: "Maybe later" },
      ]
    : [];

  if (/\b(hi|hello|hey|namaste|namaskar|good morning|good afternoon|good evening)\b/.test(lower)) {
    return {
      context: "greeting",
      text: i18n.t("chat.respHello", { name }),
    };
  }

  if (lower.includes("who are you") || lower.includes("what are you")) {
    return {
      context: "help",
      text: i18n.t("chat.respWhoAreYou", { name }),
    };
  }

  if (lower.includes("how are you")) {
    return {
      context: "greeting",
      text: i18n.t("chat.respHowAreYou", { name }),
    };
  }

  if (lower.includes("my name") && lower.includes("what")) {
    return {
      context: "default",
      text: i18n.t("chat.respMyName", { name }),
    };
  }

  if (lower.includes("maybe later") || lower.includes("not now") || lower.includes("no thank")) {
    return {
      context: "default",
      text: i18n.t("chat.respMaybeLater", { name }),
    };
  }

  if (
    (lower.includes("yes") || lower.includes("sure") || lower.includes("okay") || lower === "ok") &&
    data.aiContext === "game" &&
    game
  ) {
    return {
      context: "game",
      actions: gameActions,
      text: i18n.t("chat.respYesGame", { game: game.name }),
    };
  }

  if (lower.includes("game") || lower.includes("play") || lower.includes("puzzle") || lower.includes("activity")) {
    const suggestion = game ? i18n.t("chat.suggestionGame", { game: game.name }) : i18n.t("chat.suggestionGameNone");
    return {
      context: "game",
      actions: gameActions,
      text: i18n.t("chat.respGame", { name, suggestion }),
    };
  }

  const remindMatch = lower.match(/remind(?: me)?(?: to| about)? (.+)/);
  if (remindMatch) {
    const thing = remindMatch[1].trim().replace(/[.!?]+$/g, "");
    return {
      context: "reminder",
      actions: [{ icon: "⏰", label: "Show my reminders", labelKey: "chat.actionShowReminders", to: "/reminders" }],
      text: i18n.t("chat.respRemindMe", { thing }),
    };
  }

  if (lower.includes("remind") || lower.includes("medicine") || lower.includes("medication") || lower.includes("tablet")) {
    if (meds.length) {
      return {
        context: "reminder",
        actions: [{ icon: "⏰", label: "Show my reminders", labelKey: "chat.actionShowReminders", to: "/reminders" }],
        text: i18n.t("chat.respHasReminder", { name, title: meds[0].title, time: timeLabel(meds[0].time) }),
      };
    }
    return {
      context: "routine",
      actions: [{ icon: "📅", label: "My day ahead", labelKey: "chat.actionDayAhead", to: "/routine" }],
      text: i18n.t("chat.respNoReminder", { name }),
    };
  }

  if (lower.includes("memory") || lower.includes("memories") || lower.includes("remember") || lower.includes("story")) {
    if (mem) {
      return {
        context: "memory",
        actions: [{ icon: "💭", label: "Open my Memory Vault", labelKey: "chat.actionOpenVault", to: "/memory" }],
        text: i18n.t("chat.respMemory", { count: data.memories.length, title: mem.title, description: mem.description }),
      };
    }
    return {
      context: "memory",
      actions: [{ icon: "💭", label: "Add a memory", labelKey: "chat.actionAddMemory", to: "/memory" }],
      text: i18n.t("chat.respNoMemory"),
    };
  }

  if (/(what am i doing|doing now|right now|my day|today|happening|going on)/.test(lower)) {
    const upcoming = data.routine.filter((r) => !r.completed).slice(0, 3);
    const list =
      upcoming.length > 0
        ? upcoming.map((r) => `• ${r.title} at ${timeLabel(r.time)}`).join("\n")
        : i18n.t("chat.dayRest");
    return {
      context: "routine",
      actions: [{ icon: "🗺️", label: "See today at a glance", labelKey: "chat.actionSeeGlance", to: "/dashboard" }],
      text: i18n.t("chat.respDay", { name, list }),
    };
  }

  if (/(what comes next|up next|after that|what's next|next up)/.test(lower)) {
    if (nextR) {
      return {
        context: "routine",
        actions: [{ icon: "📅", label: "View my routine", labelKey: "chat.actionViewRoutine", to: "/routine" }],
        text: i18n.t("chat.respNextUp", {
          name,
          title: nextR.title,
          time: timeLabel(nextR.time),
          description: nextR.description ? `${nextR.description}.` : "",
        }),
      };
    }
    return {
      context: "routine",
      actions: [{ icon: "📅", label: "View my routine", labelKey: "chat.actionViewRoutine", to: "/routine" }],
      text: i18n.t("chat.respNothingNext", { name }),
    };
  }

  if (/(where am i|lost|confused|scared|afraid|worried|anxious|lonely|alone|help me|i need help)/.test(lower)) {
    return {
      context: "where",
      actions: [{ icon: "🫂", label: "Reach my family", labelKey: "chat.actionReachFamily", to: "/support" }],
      text: i18n.t("chat.respLost", { name, date: formatDate(data.currentTime) }),
    };
  }

  if (/(tired|sad|upset|not well|unwell|weak|bored|pain)/.test(lower)) {
    return {
      context: "default",
      text: i18n.t("chat.respFeelingDown", { name }),
    };
  }

  if (lower.includes("what time") || lower.includes("time is it")) {
    return {
      context: "default",
      text: i18n.t("chat.respTime", { name, time: formatTime(data.currentTime) }),
    };
  }

  if (lower.includes("thank") || lower.includes("thanks") || lower.includes("dhanyavad")) {
    return {
      context: "default",
      text: i18n.t("chat.respThanks", { name }),
    };
  }

  if (/(bye|goodbye|see you|good night)/.test(lower)) {
    return {
      context: "default",
      text: i18n.t("chat.respBye", { name }),
    };
  }

  if (lower.includes("help") || lower.includes("what can you do") || lower.includes("what do you do")) {
    return {
      context: "help",
      text: i18n.t("chat.respHelp", { name }),
    };
  }

  return {
    context: "default",
    text: i18n.t("chat.respDefault", { name }),
  };
}