import { formatDate, formatTime, getGreeting } from "./api";

export const SUGGESTIONS = [
  { icon: "📅", label: "What's happening today?" },
  { icon: "⏭️", label: "What comes next?" },
  { icon: "💭", label: "Tell me about a memory" },
  { icon: "🧩", label: "Start a gentle game" },
  { icon: "💊", label: "Do I have reminders?" },
  { icon: "🗺️", label: "I feel a little lost" },
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
  const greeting = getGreeting(currentTime) || "Good day";
  return [
    {
      id: genId("a"),
      role: "ai",
      text: `${greeting}, ${user.name}! I'm your Memory Buddy. I'm always here for you — you're never alone.`,
      time: nowTime(),
      actions: [],
      chips: [],
      stream: false,
      context: "greeting",
    },
    {
      id: genId("a"),
      role: "ai",
      text: "How can I help you today?\n\n• What's happening in my day\n• Tell me about a memory\n• Start a gentle game\n• Or just talk — I always listen.",
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
        { icon: "🎮", label: `Start ${game.name}`, to: game.href },
        { icon: "🕊️", label: "Maybe Later", sendText: "Maybe later" },
      ]
    : [];

  if (/\b(hi|hello|hey|namaste|namaskar|good morning|good afternoon|good evening)\b/.test(lower)) {
    return {
      context: "greeting",
      text: `Hello again, ${name}! It's so good to hear from you. What would brighten your day — a chat about a happy memory, or a gentle game?`,
    };
  }

  if (lower.includes("who are you") || lower.includes("what are you")) {
    return {
      context: "help",
      text: `I'm your Memory Buddy, ${name} — a friendly companion who helps you remember things, keep your day on track, and feel at ease. I'm not a doctor; I'm just a warm helper who is always by your side.`,
    };
  }

  if (lower.includes("how are you")) {
    return {
      context: "greeting",
      text: `I'm feeling wonderful, ${name}, because I got to talk with you. How are you feeling today?`,
    };
  }

  if (lower.includes("my name") && lower.includes("what")) {
    return {
      context: "default",
      text: `Your name is ${name} — a lovely name that I remember well.`,
    };
  }

  if (lower.includes("maybe later") || lower.includes("not now") || lower.includes("no thank")) {
    return {
      context: "default",
      text: `Of course, ${name}. There's no rush at all. I'll be right here whenever you're ready.`,
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
      text: `Wonderful! Let's give ${game.name} a try. It only takes a few minutes, and we can go at your pace. Tap the button below whenever you're ready.`,
    };
  }

  if (lower.includes("game") || lower.includes("play") || lower.includes("puzzle") || lower.includes("activity")) {
    const suggestion = game ? `${game.name} — quick, calm, and good for the mind.` : "We have gentle games that are easy on the mind.";
    return {
      context: "game",
      actions: gameActions,
      text: `How about a gentle game, ${name}? ${suggestion} Shall we try it together?`,
    };
  }

  const remindMatch = lower.match(/remind(?: me)?(?: to| about)? (.+)/);
  if (remindMatch) {
    const thing = remindMatch[1].trim().replace(/[.!?]+$/g, "");
    return {
      context: "reminder",
      actions: [{ icon: "⏰", label: "Show my reminders", to: "/reminders" }],
      text: `Of course! I'll keep that in mind for you: "${thing}". I'll nudge you at the right time. Is there anything else you'd like me to remember?`,
    };
  }

  if (lower.includes("remind") || lower.includes("medicine") || lower.includes("medication") || lower.includes("tablet")) {
    if (meds.length) {
      return {
        context: "reminder",
        actions: [{ icon: "⏰", label: "Show my reminders", to: "/reminders" }],
        text: `Yes, ${name}. There's one to look after: "${meds[0].title}" at ${timeLabel(meds[0].time)}. You're doing really well taking care of yourself.`,
      };
    }
    return {
      context: "routine",
      actions: [{ icon: "📅", label: "My day ahead", to: "/routine" }],
      text: `Let me check... good news — no urgent reminders right now. Enjoy this calm moment, ${name}.`,
    };
  }

  if (lower.includes("memory") || lower.includes("memories") || lower.includes("remember") || lower.includes("story")) {
    if (mem) {
      return {
        context: "memory",
        actions: [{ icon: "💭", label: "Open my Memory Vault", to: "/memory" }],
        text: `You have ${data.memories.length} treasured memories saved. Would you like me to share one? Here's a favourite: ${mem.title}. ${mem.description} It always makes me smile to think of it.`,
      };
    }
    return {
      context: "memory",
      actions: [{ icon: "💭", label: "Add a memory", to: "/memory" }],
      text: `Your Memory Vault is waiting to grow. Whenever you'd like, tell me a moment you cherish, and I'll help you keep it safe.`,
    };
  }

  if (/(what am i doing|doing now|right now|my day|today|happening|going on)/.test(lower)) {
    const upcoming = data.routine.filter((r) => !r.completed).slice(0, 3);
    const list = upcoming.map((r) => `• ${r.title} at ${timeLabel(r.time)}`).join("\n") || "— a peaceful rest of the day";
    return {
      context: "routine",
      actions: [{ icon: "🗺️", label: "See today at a glance", to: "/dashboard" }],
      text: `Here is how your day looks, ${name}:\n\n${list}\n\nAnd remember — the day is yours. We'll go at your pace.`,
    };
  }

  if (/(what comes next|up next|after that|what's next|next up)/.test(lower)) {
    if (nextR) {
      return {
        context: "routine",
        actions: [{ icon: "📅", label: "View my routine", to: "/routine" }],
        text: `Coming up next: "${nextR.title}" at ${timeLabel(nextR.time)}. ${nextR.description ? `${nextR.description}.` : ""} You're doing beautifully, ${name}.`,
      };
    }
    return {
      context: "routine",
      actions: [{ icon: "📅", label: "View my routine", to: "/routine" }],
      text: `There's nothing urgent next on the list, ${name} — a good time to rest or do something you enjoy.`,
    };
  }

  if (/(where am i|lost|confused|scared|afraid|worried|anxious|lonely|alone|help me|i need help)/.test(lower)) {
    return {
      context: "where",
      actions: [{ icon: "🫂", label: "Reach my family", to: "/support" }],
      text: `You're safe, ${name}. Right now you're at home, and today is ${formatDate(data.currentTime)}. You're never alone — your family is close by and always happy to hear your voice.`,
    };
  }

  if (/(tired|sad|upset|not well|unwell|weak|bored|pain)/.test(lower)) {
    return {
      context: "default",
      text: `I'm so sorry you're feeling that way, ${name}. Take a slow breath — it's okay to rest. Would you like to talk about it a little, or should I ask a family member to sit with you?`,
    };
  }

  if (lower.includes("what time") || lower.includes("time is it")) {
    return {
      context: "default",
      text: `Right now it's ${formatTime(data.currentTime)}. Time is on our side, ${name}.`,
    };
  }

  if (lower.includes("thank") || lower.includes("thanks") || lower.includes("dhanyavad")) {
    return {
      context: "default",
      text: `You're most welcome, ${name}. Helping you is my favourite thing to do.`,
    };
  }

  if (/(bye|goodbye|see you|good night)/.test(lower)) {
    return {
      context: "default",
      text: `Goodbye for now, ${name}. I'll be right here when you need me. Wishing you a peaceful rest.`,
    };
  }

  if (lower.includes("help") || lower.includes("what can you do") || lower.includes("what do you do")) {
    return {
      context: "help",
      text: `I can help you with lots of little things, ${name}:\n\n• Keep reminders for you\n• Share your day and what comes next\n• Bring back a happy memory\n• Suggest a gentle game\n\nJust tell me what you'd like.`,
    };
  }

  return {
    context: "default",
    text: `Mm-hmm, I'm listening, ${name}. Take your time and tell me a little more — I'm in no hurry, and you're doing wonderfully.`,
  };
}