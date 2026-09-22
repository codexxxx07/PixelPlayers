import { useEffect, useRef } from "react";

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  tone = "primary",
  onConfirm,
  onCancel,
}) {
  const confirmRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onCancel();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onCancel]);

  useEffect(() => {
    if (open && confirmRef.current) {
      confirmRef.current.focus();
    }
  }, [open]);

  if (!open) return null;

  const confirmClass =
    tone === "danger" ? "cg-btn--danger" : "cg-btn--primary";

  return (
    <div className="cg-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="cg-dialog">
        <h2 className="text-lg font-black text-(--cg-text) mb-2">{title}</h2>
        {message && (
          <p className="text-sm text-(--cg-text-soft) leading-relaxed mb-6">{message}</p>
        )}
        <div className="flex flex-wrap justify-end gap-3">
          <button type="button" className="cg-btn cg-btn--secondary" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            ref={confirmRef}
            className={`cg-btn ${confirmClass}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}