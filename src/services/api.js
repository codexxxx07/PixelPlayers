export function formatDate(date = new Date(), options = {}) {
  const instance = date instanceof Date ? date : new Date(date);
  const defaults = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return instance.toLocaleDateString("en-IN", { ...defaults, ...options });
}

export function formatTime(date = new Date(), options = {}) {
  const instance = date instanceof Date ? date : new Date(date);
  const defaults = {
    hour: "2-digit",
    minute: "2-digit",
  };
  return instance.toLocaleTimeString("en-IN", { ...defaults, ...options });
}

export function getGreeting(date = new Date()) {
  const instance = date instanceof Date ? date : new Date(date);
  const hour = instance.getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  }
  if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  }
  return "Good Evening";
}

export function getTimeOfDay(date = new Date()) {
  const instance = date instanceof Date ? date : new Date(date);
  const hour = instance.getHours();

  if (hour >= 5 && hour < 12) {
    return "morning";
  }
  if (hour >= 12 && hour < 17) {
    return "afternoon";
  }
  return "evening";
}

export function generateId(prefix = "id") {
  const randomPart = Math.random().toString(36).slice(2, 10);
  const timePart = Date.now().toString(36);
  return `${prefix}-${timePart}-${randomPart}`;
}

export function shuffleArray(array) {
  const result = Array.isArray(array) ? [...array] : [];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function delay(ms = 500) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}