import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "@clerk/react";
import { useApp } from "../../context/AppContext";
import { useCare } from "../../context/CareContext";
import {
  listAnnouncements,
  unreadCount,
  makeMessenger,
  MESSAGING_NOTE,
} from "../../services/care/messaging";
import { getUserDisplayName } from "../../utils/displayName";
import {
  CarePageHeader,
  CareCard,
  CareSectionTitle,
  StatusBadge,
  EmptyState,
} from "../../caregiver/components";

export default function Messages() {
  const { t } = useTranslation();
  const { selectedElder } = useCare();
  const app = useApp();
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  if (!selectedElder) {
    return (
      <EmptyState
        title={t("caregiver.linked.emptyTitle")}
        text={t("caregiver.linked.emptyText")}
      />
    );
  }

  const threads = listAnnouncements(app.announcements);
  const totalUnread = unreadCount(app.announcements);
  const messenger = makeMessenger({ addAnnouncement: app.addAnnouncement });

  const send = (event) => {
    event.preventDefault();
    if (!message.trim()) return;
    messenger.send({
      from: user ? getUserDisplayName(user) : t("caregiver.messages.fromFallback"),
      title: title.trim() || t("caregiver.messages.defaultSubject"),
      message: message.trim(),
    });
    setTitle("");
    setMessage("");
    setSent(true);
    window.setTimeout(() => setSent(false), 2500);
  };

  return (
    <div className="space-y-6">
      <CarePageHeader
        kicker={t("caregiver.messages.kicker")}
        title={t("caregiver.messages.title")}
        subtitle={t("caregiver.messages.subtitle", { name: selectedElder.profile?.name })}
      />

      <div className="cg-disclaimer">{t(MESSAGING_NOTE)}</div>

      <CareCard>
        <CareSectionTitle icon="✍️">{t("caregiver.messages.composerTitle")}</CareSectionTitle>
        <form onSubmit={send} className="space-y-4">
          <div>
            <label className="cg-label" htmlFor="cg-msg-title">{t("caregiver.messages.subject")}</label>
            <input
              id="cg-msg-title"
              className="cg-input"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder={t("caregiver.messages.subjectPlaceholder")}
            />
          </div>
          <div>
            <label className="cg-label" htmlFor="cg-msg-body">{t("caregiver.messages.messageLabel")}</label>
            <textarea
              id="cg-msg-body"
              className="cg-textarea min-h-28"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder={t("caregiver.messages.messagePlaceholder")}
              required
            />
          </div>
          <div className="flex items-center justify-end gap-3">
            {sent && <span className="text-sm font-bold text-(--cg-ok)">{t("caregiver.messages.sent")} ✓</span>}
            <button type="submit" className="cg-btn cg-btn--primary">{t("caregiver.messages.send")}</button>
          </div>
        </form>
      </CareCard>

      <CareCard pixel>
        <CareSectionTitle
          icon="💬"
          right={<StatusBadge tone={totalUnread > 0 ? "brand" : "neutral"} label={t("caregiver.messages.unread", { count: totalUnread })} />}
        >
          {t("caregiver.messages.history")}
        </CareSectionTitle>
        {threads.length === 0 ? (
          <p className="text-sm text-(--cg-text-muted)">{t("caregiver.messages.none")}</p>
        ) : (
          <ul className="space-y-3">
            {threads.map((thread) => (
              <li key={thread.id} className="cg-card cg-card--panel">
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  <span className="font-bold text-sm text-(--cg-text)">{thread.from}</span>
                  <span className="text-[12px] text-(--cg-text-muted)">{thread.sentAt}</span>
                  <span className="ml-auto">
                    {thread.read ? (
                      <StatusBadge tone="neutral" label={t("caregiver.messages.read")} dot={false} />
                    ) : (
                      <button
                        type="button"
                        className="cg-btn cg-btn--ghost cg-btn--sm"
                        onClick={() => app.dismissAnnouncement(thread.id)}
                      >
                        {t("caregiver.messages.markRead")}
                      </button>
                    )}
                  </span>
                </div>
                <p className="font-bold text-sm text-(--cg-text-soft) mb-1">{thread.title}</p>
                <p className="text-sm text-(--cg-text-soft) leading-relaxed">{thread.message}</p>
              </li>
            ))}
          </ul>
        )}
      </CareCard>
    </div>
  );
}