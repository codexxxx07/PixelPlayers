// Caregiver -> elder messaging via the shared announcements store.
//
// Honesty: announcements live in the shared AppContext store and appear on the
// elder's dashboard on their next visit. There is no real-time push yet — the
// UI must never claim instant delivery.

export const MESSAGING_NOTE = "caregiver.messages.syncNote";

export function listAnnouncements(announcements = []) {
  return [...announcements].sort((a, b) => String(b.sentAt || "").localeCompare(String(a.sentAt || "")));
}

export function unreadCount(announcements = []) {
  return announcements.filter((a) => !a.read).length;
}

export function markAnnouncementRead(announcement) {
  if (!announcement) return null;
  return { ...announcement, read: true };
}

/**
 * Adapter that writes a new announcement through the shared AppContext action.
 * `send` is deliberately a function of an adapter so the page never mutates
 * global store shape directly.
 */
export function makeMessenger({ addAnnouncement }) {
  return {
    send: (payload) =>
      addAnnouncement({
        from: payload.from || "",
        title: payload.title || "",
        message: payload.message || "",
      }),
  };
}