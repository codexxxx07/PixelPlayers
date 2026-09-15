import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

function SosIcon({ className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      <rect x="8" y="2" width="8" height="20" fill="currentColor" />
      <rect x="2" y="8" width="20" height="8" fill="currentColor" />
    </svg>
  );
}

function relationshipLabel(relationship) {
  const text = (relationship || "").toLowerCase();
  if (/family|son|daughter|husband|wife|grand|father|mother/.test(text)) return "Family";
  if (/friend/.test(text)) return "Friend";
  if (/care|nurse|doctor/.test(text)) return "Caregiver";
  if (/neighbou?r/.test(text)) return "Neighbour";
  if (/commun/.test(text)) return "Community Worker";
  return "Family";
}

function relationshipColor(relationship) {
  const text = (relationship || "").toLowerCase();
  if (/friend/.test(text)) return "bg-sky-400";
  if (/care|nurse|doctor/.test(text)) return "bg-rose-400";
  if (/neighbou?r/.test(text)) return "bg-emerald-400";
  if (/commun/.test(text)) return "bg-violet-400";
  return "bg-amber-400";
}

function maskPhone(phone) {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return phone;
  if (digits.length <= 10) return `${digits.slice(0, 2)}••••• ${digits.slice(-4)}`;
  const first = digits.slice(0, 2);
  const last = digits.slice(-4);
  return `${first}••••• ${last}`;
}

export default function SosButton({ variant = "navbar", onClick }) {
  if (variant === "floating") {
    return (
      <div className="fixed left-3 bottom-3 z-40 sm:left-5 sm:bottom-5 lg:hidden">
        <button
          type="button"
          onClick={onClick}
          aria-label="SOS — call a trusted contact or send a help alert"
          className="relative flex w-20 h-20 flex-col items-center justify-center gap-1 rounded-full border-[3px] border-red-900/70 text-white shadow-[inset_0_2px_0_rgba(255,255,255,0.4),0_6px_0_#7f1d1d,0_12px_22px_rgba(127,29,29,0.45)] transition-all duration-100 hover:brightness-105 active:translate-y-[3px] active:shadow-[inset_0_2px_0_rgba(255,255,255,0.25),0_3px_0_#7f1d1d]"
          style={{ background: "linear-gradient(180deg, #f87171, #dc2626)" }}
        >
          <SosIcon className="w-9 h-9" />
          <span className="font-[family-name:var(--font-pixel)] text-[0.68rem] tracking-widest leading-none">
            SOS
          </span>
        </button>
      </div>
    );
  }

  if (variant === "menu") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label="SOS — emergency help"
        className="skeuo-btn skeuo-btn-pixel skeuo-btn-sos skeuo-btn-block px-5 py-4 gap-3"
      >
        <SosIcon className="w-8 h-8" />
        <span className="flex flex-col items-start gap-1.5 leading-none">
          <span className="text-[0.8rem] tracking-widest">SOS</span>
          <span className="font-body font-bold text-base normal-case text-red-50/90">
            Emergency help
          </span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="SOS — emergency help"
      className="skeuo-btn skeuo-btn-pixel skeuo-btn-sos px-5 py-3.5 gap-2 text-[0.8rem] tracking-widest"
    >
      <SosIcon className="w-6 h-6" />
      SOS
    </button>
  );
}

export function SosModal({ open, onClose }) {
  const { supportNetwork, settings } = useApp();
  const [step, setStep] = useState("menu");
  const [selected, setSelected] = useState(null);

  const sosContacts = supportNetwork.filter((person) => person.sos);
  const sosEnabled = settings.allowEmergencySOS ?? true;

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const goToMenu = () => setStep("menu");
  const setupLink = (
    <Link
      to="/support"
      onClick={onClose}
      className="block mt-1 font-bold underline underline-offset-2"
    >
      Set up in Support
    </Link>
  );

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-modal-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-md rounded-3xl border-2 border-warm-200 bg-gradient-to-b from-white to-warm-50 p-6 sm:p-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_0_#f0d5b0,0_28px_48px_rgba(63,40,25,0.3)] animate-slide-up"
      >
        <div className="flex flex-col items-center text-center mb-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-red-400 to-red-600 border-[3px] border-red-800/70 shadow-[inset_0_2px_0_rgba(255,255,255,0.35),0_4px_0_#7f1d1d] mb-4">
            <SosIcon className="w-9 h-9 text-white" />
          </div>
          <h2
            id="sos-modal-title"
            className="font-[family-name:var(--font-pixel)] text-teal-800 text-sm sm:text-base leading-relaxed"
          >
            DO YOU NEED HELP?
          </h2>
          <p className="text-gray-600 text-base mt-2">
            Choose what you want to do.
          </p>
        </div>

        {step === "menu" && (
          <div className="space-y-3">
            {!sosEnabled && (
              <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 leading-relaxed">
                SOS is turned off in your privacy settings.
                {setupLink}
              </div>
            )}
            {sosEnabled && sosContacts.length === 0 && (
              <div className="rounded-2xl border-2 border-warm-200 bg-warm-100 px-4 py-3 text-sm text-warm-800 leading-relaxed">
                You don't have emergency contacts yet, so nobody could be
                reached.
                {setupLink}
              </div>
            )}
            <button
              type="button"
              onClick={() => setStep("call")}
              className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block py-4 gap-3"
            >
              <span className="text-xl" aria-hidden="true">📞</span>
              <span className="flex flex-col items-center gap-1 leading-none">
                <span className="text-[0.76rem] tracking-wider">
                  CALL TRUSTED CONTACT
                </span>
                <span className="font-body font-bold text-base normal-case text-teal-50/90">
                  Reach someone you trust
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={() => setStep("alert-sent")}
              className="skeuo-btn skeuo-btn-pixel skeuo-btn-sos skeuo-btn-block py-4 gap-3"
            >
              <span className="text-xl" aria-hidden="true">📳</span>
              <span className="flex flex-col items-center gap-1 leading-none">
                <span className="text-[0.76rem] tracking-wider">
                  SEND HELP ALERT
                </span>
                <span className="font-body font-bold text-base normal-case text-red-50/90">
                  Notify your support network
                </span>
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-4"
            >
              Cancel
            </button>
          </div>
        )}

        {step === "call" && (
          <div className="space-y-3">
            <p className="text-center text-gray-600 text-base">
              Who would you like to call?
            </p>
            {sosContacts.length === 0 ? (
              <div className="rounded-2xl border-2 border-warm-200 bg-white px-6 py-8 text-center">
                <span className="text-4xl block mb-3" aria-hidden="true">👥</span>
                <p className="text-gray-500 text-base mb-4">
                  No emergency contacts yet.
                </p>
                {setupLink}
              </div>
            ) : (
              sosContacts.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => {
                    setSelected(person);
                    setStep("call-placed");
                  }}
                  className="flex w-full items-center gap-4 rounded-2xl border-2 border-warm-200 bg-white px-5 py-4 text-left transition-all duration-200 hover:border-red-300 hover:bg-red-50/40 active:translate-y-0.5"
                >
                  <span
                    className={`flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-full border-4 border-white shadow-inner text-xl font-extrabold text-white ${relationshipColor(
                      person.relationship
                    )}`}
                  >
                    {person.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-warm-800 text-lg font-bold leading-tight">
                      {person.name}
                    </span>
                    <span className="block text-gray-500 text-sm mt-0.5">
                      {relationshipLabel(person.relationship)} ·{" "}
                      {maskPhone(person.phone)}
                    </span>
                  </span>
                  <span className="text-2xl" aria-hidden="true">📞</span>
                </button>
              ))
            )}
            <button
              type="button"
              onClick={goToMenu}
              className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-3.5"
            >
              Back
            </button>
          </div>
        )}

        {step === "call-placed" && selected && (
          <div className="space-y-4 text-center">
            <span className="text-5xl block" aria-hidden="true">📞</span>
            <h3 className="font-[family-name:var(--font-pixel)] text-teal-800 text-xs leading-relaxed">
              CALLING {selected.name.toUpperCase()}…
            </h3>
            <p className="text-gray-500 text-sm">
              {selected.name} · {maskPhone(selected.phone)}
            </p>
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-800 leading-relaxed">
              This is a demonstration. In the finished app this will place a
              real call on your device to {selected.name}.
            </div>
            <button
              type="button"
              onClick={goToMenu}
              className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block py-4"
            >
              Done
            </button>
          </div>
        )}

        {step === "alert-sent" && (
          <div className="space-y-4 text-center">
            <span className="text-5xl block" aria-hidden="true">📳</span>
            <h3 className="font-[family-name:var(--font-pixel)] text-red-700 text-xs leading-relaxed">
              HELP ALERT SENT
            </h3>
            {sosContacts.length > 0 ? (
              <div className="space-y-2 text-left">
                {sosContacts.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center gap-3 rounded-xl border-2 border-warm-200 bg-white px-4 py-3"
                  >
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-11 h-11 rounded-full border-2 border-white text-base font-extrabold text-white ${relationshipColor(
                        person.relationship
                      )}`}
                    >
                      {person.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-warm-800 font-bold leading-tight">
                        {person.name}
                      </span>
                      <span className="block text-gray-500 text-sm">
                        {relationshipLabel(person.relationship)}
                      </span>
                    </span>
                    <span className="text-xl" aria-hidden="true">📤</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">
                No trusted contacts to notify yet.
              </p>
            )}
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-left text-sm text-amber-800 leading-relaxed">
              This is a demonstration only — no message was actually sent.
            </div>
            <button
              type="button"
              onClick={goToMenu}
              className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block py-4"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}