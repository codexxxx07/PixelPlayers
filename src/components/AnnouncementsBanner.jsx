import { useTranslation } from "react-i18next";
import { useApp } from "../context/AppContext";

export default function AnnouncementsBanner() {
  const { t } = useTranslation();
  const { announcements, dismissAnnouncement } = useApp();

  const unread = announcements.filter((announcement) => !announcement.read);
  if (unread.length === 0) return null;

  const latest = unread[0];

  return (
    <section
      role="status"
      aria-live="polite"
      className="relative overflow-hidden rounded-3xl border-2 border-teal-200 bg-white p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_6px_0_#b8e0d8,0_14px_28px_rgba(13,94,88,0.1)] dark:border-teal-500/30 dark:bg-[#1c242b] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_6px_0_#173832,0_14px_28px_rgba(0,0,0,0.35)]"
    >
      <div className="absolute top-0 left-0 right-0 h-2 flex opacity-80">
        <div className="flex-1 bg-teal-400" />
        <div className="flex-1 bg-amber-400" />
        <div className="flex-1 bg-teal-300" />
        <div className="flex-1 bg-amber-300" />
      </div>
      <div className="relative flex items-start gap-4">
        <span
          className="flex items-center justify-center w-11 h-11 shrink-0 rounded-2xl bg-linear-to-b from-teal-400 to-teal-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.35),0_3px_0_rgba(13,78,74,0.4)] text-xl"
          aria-hidden="true"
        >
          💌
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-pixel text-[9px] text-teal-500 tracking-widest uppercase mb-1.5">
            {t("announcements.newMessage", { from: latest.from || "" })}
          </p>
          <h2 className="font-pixel text-teal-800 dark:text-teal-200 text-xs md:text-sm leading-relaxed mb-1.5 break-words">
            {latest.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed break-words">
            {latest.message}
          </p>
        </div>
        <button
          type="button"
          onClick={() => dismissAnnouncement(latest.id)}
          className="flex items-center justify-center w-10 h-10 shrink-0 rounded-xl border-2 border-teal-100 bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors text-lg leading-none"
          aria-label={t("announcements.dismiss")}
        >
          ×
        </button>
      </div>
    </section>
  );
}