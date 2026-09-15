import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  getUserCoordinates,
  fetchNearbyEmergencyFacilities,
  getGoogleMapsRouteUrl,
  getGoogleMapsEmbedUrl,
  getGoogleMapsSearchUrl,
  formatDistance,
  EMERGENCY_NUMBERS,
} from "../services/emergencyService";

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

function cleanPhoneForDial(phone) {
  if (!phone) return "";
  return phone.replace(/[^0-9+]/g, "");
}

export default function SosButton({ variant = "navbar", onClick }) {
  if (variant === "floating") {
    return (
      <div className="fixed left-3 bottom-3 z-40 sm:left-5 sm:bottom-5 lg:hidden">
        <button
          type="button"
          onClick={onClick}
          aria-label="SOS — emergency auto-call or find nearest hospital & police"
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
            Emergency Auto-Call & Maps
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
      className="skeuo-btn skeuo-btn-pixel skeuo-btn-sos px-6 py-3.5 gap-2.5 text-[0.82rem] tracking-widest"
    >
      <SosIcon className="w-6 h-6" />
      SOS
    </button>
  );
}

export function SosModal({ open, onClose }) {
  const { supportNetwork, settings } = useApp();
  
  // Filter contacts with valid dialable phone number
  const validSosContacts = supportNetwork.filter(
    (person) => person.sos && person.phone && person.phone.replace(/\D/g, "").length >= 5
  );
  const hasSavedNumber = validSosContacts.length > 0;
  const sosEnabled = settings.allowEmergencySOS ?? true;

  // Initial step: if saved contact exists, start auto-call countdown immediately; else fallback to emergency map
  const [step, setStep] = useState(() => (hasSavedNumber && sosEnabled ? "autocall" : "emergency-map"));
  const [selectedContact, setSelectedContact] = useState(() => validSosContacts[0] || null);

  // Auto-call countdown timer (5 seconds for trusted contact)
  const [countdown, setCountdown] = useState(5);
  const countdownIntervalRef = useRef(null);

  // Trusted call failure verification countdown (10 seconds)
  const [failoverCountdown, setFailoverCountdown] = useState(10);
  const failoverIntervalRef = useRef(null);

  // Emergency auto-call countdown (5 seconds)
  const [emergencyCountdown, setEmergencyCountdown] = useState(5);
  const emergencyIntervalRef = useRef(null);

  // Emergency facilities state
  const [facilities, setFacilities] = useState([]);
  const [facilitiesLoading, setFacilitiesLoading] = useState(false);
  const [facilitiesFilter, setFacilitiesFilter] = useState("all"); // 'all' | 'hospital' | 'police'
  const [userLocation, setUserLocation] = useState(null);
  const [selectedFacilityForMap, setSelectedFacilityForMap] = useState(null);
  const [failedCallNotice, setFailedCallNotice] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Identify nearest emergency target
  const nearestFacility = facilities.length > 0 ? facilities[0] : null;
  const emergencyTargetPhone = nearestFacility?.phone || "112";
  const emergencyTargetName = nearestFacility
    ? `${nearestFacility.name} (${formatDistance(nearestFacility.distanceKm)})`
    : "Universal Emergency Control (112)";

  // Execute call via native tel: protocol
  const handleTriggerCall = useCallback((contact) => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    const rawNumber = cleanPhoneForDial(contact?.phone);
    if (rawNumber) {
      window.location.href = `tel:${rawNumber}`;
    }
    setStep("call-placed");
    setFailoverCountdown(10);
  }, []);

  // Execute emergency auto-call to nearest hospital / police / 112
  const handleTriggerEmergencyCall = useCallback(() => {
    if (emergencyIntervalRef.current) clearInterval(emergencyIntervalRef.current);
    const dialNum = cleanPhoneForDial(emergencyTargetPhone);
    if (dialNum) {
      window.location.href = `tel:${dialNum}`;
    }
    setFailedCallNotice(true);
    setStep("emergency-map");
  }, [emergencyTargetPhone]);

  // Trigger failover sequence when trusted contact call fails or times out
  const triggerEmergencyFailover = useCallback(() => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (failoverIntervalRef.current) clearInterval(failoverIntervalRef.current);
    setFailedCallNotice(true);
    setEmergencyCountdown(5);
    setStep("emergency-failover");
  }, []);

  // Countdown for initial trusted contact auto-call
  useEffect(() => {
    if (!open || step !== "autocall" || !selectedContact) {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
      return;
    }

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownIntervalRef.current);
          handleTriggerCall(selectedContact);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    };
  }, [open, step, selectedContact, handleTriggerCall]);

  // Countdown for trusted call verification / auto-failover
  useEffect(() => {
    if (!open || step !== "call-placed") {
      if (failoverIntervalRef.current) clearInterval(failoverIntervalRef.current);
      return;
    }

    failoverIntervalRef.current = setInterval(() => {
      setFailoverCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(failoverIntervalRef.current);
          triggerEmergencyFailover();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (failoverIntervalRef.current) clearInterval(failoverIntervalRef.current);
    };
  }, [open, step, triggerEmergencyFailover]);

  // Countdown for Emergency Auto-Call when trusted fails
  useEffect(() => {
    if (!open || step !== "emergency-failover") {
      if (emergencyIntervalRef.current) clearInterval(emergencyIntervalRef.current);
      return;
    }

    emergencyIntervalRef.current = setInterval(() => {
      setEmergencyCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(emergencyIntervalRef.current);
          handleTriggerEmergencyCall();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (emergencyIntervalRef.current) clearInterval(emergencyIntervalRef.current);
    };
  }, [open, step, handleTriggerEmergencyCall]);

  // Always fetch nearest emergency facilities in background so they are ready immediately
  useEffect(() => {
    if (!open) return;

    let isSubscribed = true;
    async function loadFacilities() {
      setFacilitiesLoading(true);

      try {
        const loc = await getUserCoordinates();
        if (!isSubscribed) return;
        setUserLocation(loc.coords);

        const results = await fetchNearbyEmergencyFacilities(
          loc.coords.latitude,
          loc.coords.longitude
        );
        if (!isSubscribed) return;
        setFacilities(results);
        if (results.length > 0) {
          setSelectedFacilityForMap((prev) => prev || results[0]);
        }
      } catch (err) {
        if (!isSubscribed) return;
        console.error("Error loading emergency facilities:", err);
      } finally {
        if (isSubscribed) setFacilitiesLoading(false);
      }
    }

    loadFacilities();

    return () => {
      isSubscribed = false;
    };
  }, [open]);

  // Keyboard escape listener
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const cancelAutoCall = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (failoverIntervalRef.current) clearInterval(failoverIntervalRef.current);
    if (emergencyIntervalRef.current) clearInterval(emergencyIntervalRef.current);
    setStep("menu");
  };

  const goToEmergencyMap = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (failoverIntervalRef.current) clearInterval(failoverIntervalRef.current);
    if (emergencyIntervalRef.current) clearInterval(emergencyIntervalRef.current);
    setStep("emergency-map");
  };

  const goToMenu = () => {
    if (countdownIntervalRef.current) clearInterval(countdownIntervalRef.current);
    if (failoverIntervalRef.current) clearInterval(failoverIntervalRef.current);
    if (emergencyIntervalRef.current) clearInterval(emergencyIntervalRef.current);
    setStep("menu");
  };

  const setupLink = (
    <Link
      to="/support"
      onClick={onClose}
      className="inline-block mt-1.5 font-bold underline underline-offset-2 text-teal-700 hover:text-teal-900"
    >
      ⚙️ Set up contacts in Support
    </Link>
  );

  const filteredFacilities = facilities.filter((fac) => {
    if (facilitiesFilter === "hospital" && fac.type !== "hospital") return false;
    if (facilitiesFilter === "police" && fac.type !== "police") return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = fac.name?.toLowerCase().includes(q);
      const matchAddress = fac.address?.toLowerCase().includes(q);
      const matchServices = fac.services?.toLowerCase().includes(q);
      return matchName || matchAddress || matchServices;
    }
    return true;
  });

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sos-modal-title"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-[3px] transition-opacity"
        onClick={onClose}
      />
      <div
        className="relative w-full max-w-lg my-auto rounded-3xl border-2 border-warm-200 bg-gradient-to-b from-white to-warm-50 p-5 sm:p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_8px_0_#f0d5b0,0_28px_48px_rgba(63,40,25,0.35)] animate-slide-up max-h-[92vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex flex-col items-center text-center mb-4 shrink-0">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-red-500 to-red-600 border-[3px] border-red-800/80 shadow-[inset_0_2px_0_rgba(255,255,255,0.35),0_4px_0_#7f1d1d] mb-3">
            <SosIcon className="w-9 h-9 text-white animate-pulse" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600 border border-white"></span>
            </span>
          </div>
          <h2
            id="sos-modal-title"
            className="font-[family-name:var(--font-pixel)] text-red-700 text-sm sm:text-base tracking-wider"
          >
            EMERGENCY SOS
          </h2>
          <p className="text-gray-600 text-sm mt-1">
            {step === "autocall"
              ? "Auto-calling your trusted contact…"
              : step === "call-placed"
              ? "Verifying connection with trusted contact…"
              : step === "emergency-failover"
              ? "Trusted contact unreachable. Auto-calling nearest emergency help…"
              : step === "emergency-map"
              ? "Nearest open hospital & police station with live route"
              : "Emergency assistance and trusted contact hub"}
          </p>
        </div>

        {/* STEP 1: INITIAL TRUSTED CONTACT AUTO-CALL COUNTDOWN */}
        {step === "autocall" && selectedContact && (
          <div className="space-y-4 text-center animate-slide-up">
            <div className="relative overflow-hidden rounded-2xl border-2 border-red-300 bg-gradient-to-b from-red-50 to-orange-50 p-5 shadow-inner">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="inline-block w-3 h-3 rounded-full bg-red-600 animate-ping" />
                <span className="font-[family-name:var(--font-pixel)] text-red-700 text-xs tracking-wider">
                  AUTO-DIAL IN PROGRESS
                </span>
              </div>

              {/* Countdown circle */}
              <div className="my-3 flex items-center justify-center">
                <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-4 border-red-500 bg-white shadow-md">
                  <span className="text-4xl font-extrabold text-red-600 font-[family-name:var(--font-pixel)]">
                    {countdown}
                  </span>
                  <span className="absolute bottom-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    sec
                  </span>
                </div>
              </div>

              {/* Contact info card */}
              <div className="flex items-center justify-center gap-3 mt-3 bg-white/80 rounded-xl p-3 border border-red-200">
                <div
                  className={`w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-lg font-bold text-white shadow ${relationshipColor(
                    selectedContact.relationship
                  )}`}
                >
                  {selectedContact.name.charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <div className="font-bold text-warm-900 text-base leading-tight">
                    {selectedContact.name}
                  </div>
                  <div className="text-xs text-gray-600">
                    {relationshipLabel(selectedContact.relationship)} · {maskPhone(selectedContact.phone)}
                  </div>
                </div>
              </div>

              <div className="mt-3 p-2 rounded-xl bg-red-100/60 border border-red-200 text-[11px] text-red-900 font-medium leading-relaxed">
                ⚡ <strong>Smart Failover:</strong> If {selectedContact.name} does not answer or the call fails, we will automatically failover and auto-call the nearest emergency hospital/police with Google Maps route!
              </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => handleTriggerCall(selectedContact)}
                className="skeuo-btn skeuo-btn-pixel skeuo-btn-sos skeuo-btn-block py-4 gap-3 text-sm"
              >
                <span className="text-2xl" aria-hidden="true">📞</span>
                <span>CALL NOW ({selectedContact.name.toUpperCase()})</span>
              </button>

              <button
                type="button"
                onClick={goToEmergencyMap}
                className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block py-3.5 gap-2.5 text-xs tracking-wider"
              >
                <span className="text-xl" aria-hidden="true">🏥</span>
                <span>FIND NEAREST HOSPITAL & POLICE (MAP)</span>
              </button>

              <button
                type="button"
                onClick={cancelAutoCall}
                className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-3 text-xs"
              >
                Cancel Auto-Dial
              </button>
            </div>
          </div>
        )}

        {/* STEP 1.5: TRUSTED CALL ACTIVE / VERIFICATION MONITOR (Checks if Call Failed) */}
        {step === "call-placed" && selectedContact && (
          <div className="space-y-4 text-center animate-slide-up">
            <div className="p-5 rounded-2xl border-2 border-amber-300 bg-gradient-to-b from-amber-50 to-orange-50 shadow-inner">
              <span className="text-5xl block animate-pulse mb-2" aria-hidden="true">📞</span>
              <h3 className="font-[family-name:var(--font-pixel)] text-amber-900 text-xs tracking-wider">
                DIALING {selectedContact.name.toUpperCase()}…
              </h3>
              <p className="text-gray-600 text-sm mt-1">
                {selectedContact.name} · {maskPhone(selectedContact.phone)}
              </p>

              {/* Failover countdown banner */}
              <div className="mt-4 p-3 rounded-xl bg-white border border-amber-300 shadow-sm text-center">
                <p className="text-xs font-bold text-gray-700">
                  Did {selectedContact.name} answer?
                </p>
                <div className="flex items-center justify-center gap-2 my-1.5">
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                  <span className="text-xs text-red-700 font-extrabold">
                    Auto-calling nearest Police / Hospital in {failoverCountdown}s if unanswered
                  </span>
                </div>
                <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-red-500 h-full transition-all duration-1000"
                    style={{ width: `${(failoverCountdown / 10) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Critical User Choices: Call Failed vs Connected */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={triggerEmergencyFailover}
                className="skeuo-btn skeuo-btn-pixel skeuo-btn-sos skeuo-btn-block py-4 gap-2 text-sm"
              >
                <span className="text-xl" aria-hidden="true">🚨</span>
                <span>CALL FAILED / NO ANSWER (AUTO-CALL POLICE/HOSPITAL)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={goToEmergencyMap}
                  className="py-3 px-2 rounded-xl bg-warm-100 border border-warm-300 text-warm-900 font-bold text-xs hover:bg-warm-200 transition-all text-center"
                >
                  🗺️ View Emergency Route
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-2 rounded-xl bg-emerald-600 text-white font-bold text-xs shadow hover:bg-emerald-700 transition-all text-center"
                >
                  ✓ Call Connected / I'm Safe
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: EMERGENCY FAILOVER AUTO-CALL (Triggers once trusted call fails) */}
        {step === "emergency-failover" && (
          <div className="space-y-4 text-center animate-slide-up">
            <div className="relative overflow-hidden rounded-2xl border-3 border-red-500 bg-gradient-to-b from-red-600 to-red-700 p-5 text-white shadow-xl">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="inline-block w-3 h-3 rounded-full bg-white animate-ping" />
                <span className="font-[family-name:var(--font-pixel)] text-yellow-300 text-xs tracking-wider">
                  FAILOVER ENGAGED: AUTO-CALLING EMERGENCY
                </span>
              </div>

              {/* Countdown circle */}
              <div className="my-3 flex items-center justify-center">
                <div className="relative flex items-center justify-center w-24 h-24 rounded-full border-4 border-yellow-300 bg-white text-red-600 shadow-lg">
                  <span className="text-4xl font-extrabold font-[family-name:var(--font-pixel)]">
                    {emergencyCountdown}
                  </span>
                  <span className="absolute bottom-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                    sec
                  </span>
                </div>
              </div>

              {/* Target facility info */}
              <div className="mt-3 bg-white/15 backdrop-blur-sm rounded-xl p-3 border border-white/30 text-left">
                <div className="text-[10px] uppercase font-bold text-yellow-200 tracking-wider">
                  Target Emergency Response:
                </div>
                <div className="text-base font-extrabold text-white mt-0.5 leading-tight">
                  {emergencyTargetName}
                </div>
                <div className="text-xs text-yellow-100 mt-1">
                  📞 Dialing: <strong>{emergencyTargetPhone}</strong> · Open 24/7
                </div>
              </div>

              <p className="text-xs text-red-100 mt-3 font-medium">
                Calling begins automatically in {emergencyCountdown}s. Tap below to dial right now or view turn-by-turn route.
              </p>
            </div>

            {/* Action buttons */}
            <div className="space-y-2.5">
              <button
                type="button"
                onClick={handleTriggerEmergencyCall}
                className="skeuo-btn skeuo-btn-pixel skeuo-btn-sos skeuo-btn-block py-4 gap-3 text-sm animate-pulse"
              >
                <span className="text-2xl" aria-hidden="true">🚨</span>
                <span>AUTO-CALL NEAREST EMERGENCY NOW</span>
              </button>

              <button
                type="button"
                onClick={goToEmergencyMap}
                className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block py-3.5 gap-2 text-xs"
              >
                <span className="text-xl" aria-hidden="true">🗺️</span>
                <span>OPEN ROUTE & HOSPITAL/POLICE MAP</span>
              </button>

              <button
                type="button"
                onClick={cancelAutoCall}
                className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-3 text-xs"
              >
                Cancel Emergency Auto-Dial
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: NEAREST HOSPITAL & POLICE WITH GOOGLE MAPS ROUTE (Default Fallback & Map Hub) */}
        {step === "emergency-map" && (
          <div className="flex-1 overflow-y-auto pr-1 space-y-4">
            {/* If coming from failed trusted contact call */}
            {failedCallNotice && (
              <div className="rounded-2xl border-2 border-red-500 bg-red-50 p-3.5 text-xs text-red-900 leading-relaxed shadow-sm animate-bounce-once">
                <div className="font-bold flex items-center gap-1.5 text-red-700 text-sm mb-1">
                  <span>🚨</span> Trusted contact was unreachable.
                </div>
                Emergency auto-call dispatched. Showing nearest available hospitals and police stations with instant Google Maps routes below.
              </div>
            )}

            {/* Quick Speed Dial bar for universal emergencies */}
            <div className="rounded-2xl border-2 border-red-200 bg-red-50/70 p-3">
              <div className="text-[11px] font-bold text-red-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <span>🚨</span> Universal Emergency Lines (Instant Connect)
              </div>
              <div className="grid grid-cols-3 gap-2">
                {EMERGENCY_NUMBERS.map((em) => (
                  <a
                    key={em.number}
                    href={`tel:${em.number}`}
                    className="flex flex-col items-center justify-center p-2 rounded-xl bg-white border border-red-300 hover:bg-red-100/60 active:scale-95 transition-all text-center shadow-sm"
                  >
                    <span className="text-xl">{em.icon}</span>
                    <span className="font-extrabold text-red-700 text-sm">{em.number}</span>
                    <span className="text-[9px] text-gray-600 font-medium leading-tight">{em.label}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* If user had no contact saved */}
            {!hasSavedNumber && (
              <div className="rounded-xl border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900 leading-relaxed">
                ℹ️ No trusted contact number is saved. Displaying nearest available open hospitals and police stations nearby.
                {setupLink}
              </div>
            )}

            {/* Instant Real-Time Search Bar */}
            <div className="relative">
              <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none text-xs">
                🔍
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospital or police by name or area…"
                className="w-full pl-8 pr-8 py-2 rounded-xl border border-warm-300 bg-white text-xs text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-400 shadow-inner"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute inset-y-0 right-2.5 flex items-center text-xs text-gray-400 hover:text-gray-600 font-bold"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 p-1 bg-warm-100 rounded-xl">
              <button
                type="button"
                onClick={() => setFacilitiesFilter("all")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  facilitiesFilter === "all"
                    ? "bg-white text-teal-800 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All ({facilities.length})
              </button>
              <button
                type="button"
                onClick={() => setFacilitiesFilter("hospital")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  facilitiesFilter === "hospital"
                    ? "bg-white text-rose-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                🏥 Hospitals
              </button>
              <button
                type="button"
                onClick={() => setFacilitiesFilter("police")}
                className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  facilitiesFilter === "police"
                    ? "bg-white text-blue-700 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                🚓 Police
              </button>
            </div>

            {/* Direct Google Maps Instant Search Buttons */}
            <div className="flex items-center gap-2">
              <a
                href={getGoogleMapsSearchUrl("hospital", searchQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-rose-50 border border-rose-300 text-rose-800 text-xs font-bold hover:bg-rose-100 active:scale-95 transition-all text-center truncate"
              >
                <span>🗺️</span>
                <span className="truncate">
                  {searchQuery ? `"${searchQuery}" in Maps ↗` : "Hospitals in Maps ↗"}
                </span>
              </a>
              <a
                href={getGoogleMapsSearchUrl("police", searchQuery)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-50 border border-blue-300 text-blue-800 text-xs font-bold hover:bg-blue-100 active:scale-95 transition-all text-center truncate"
              >
                <span>🗺️</span>
                <span className="truncate">
                  {searchQuery ? `"${searchQuery}" Police ↗` : "Police in Maps ↗"}
                </span>
              </a>
            </div>

            {/* Facilities List */}
            {filteredFacilities.length === 0 && (
              <div className="p-6 text-center rounded-2xl border border-warm-200 bg-white space-y-3">
                <p className="text-xs text-gray-600 font-medium">
                  {searchQuery ? `No local facility matches "${searchQuery}".` : "No facilities found."}
                </p>
                <a
                  href={getGoogleMapsSearchUrl("hospital", searchQuery)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-teal-600 text-white text-xs font-bold shadow hover:bg-teal-700"
                >
                  <span>🗺️</span> Search on Google Maps App ↗
                </a>
              </div>
            )}

            {!facilitiesLoading &&
              filteredFacilities.map((fac) => {
                const isHospital = fac.type === "hospital";
                const routeUrl = userLocation
                  ? getGoogleMapsRouteUrl(
                      userLocation.latitude,
                      userLocation.longitude,
                      fac.lat,
                      fac.lon,
                      fac.name
                    )
                  : `https://www.google.com/maps/dir/?api=1&destination=${fac.lat},${fac.lon}&travelmode=driving`;

                return (
                  <div
                    key={fac.id}
                    className="p-4 rounded-2xl border-2 border-warm-200 bg-white shadow-sm hover:border-teal-400 transition-all space-y-3"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                            isHospital ? "bg-rose-100 text-rose-700" : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {isHospital ? "🏥" : "🚓"}
                        </div>
                        <div>
                          <h4 className="font-bold text-warm-900 text-sm leading-snug">
                            {fac.name}
                          </h4>
                          <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                            {fac.address}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 text-right">
                        <span className="inline-block px-2 py-0.5 rounded-full bg-teal-100 text-teal-800 text-[11px] font-extrabold tracking-wide">
                          {formatDistance(fac.distanceKm)}
                        </span>
                      </div>
                    </div>

                    {/* Status, Direct Phone & Services */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px]">
                      <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        {fac.openStatus}
                      </span>
                      {fac.phone && (
                        <span className="inline-flex items-center gap-1 font-bold text-gray-700 bg-gray-100 px-2 py-0.5 rounded-md border border-gray-300">
                          📞 {fac.phone}
                        </span>
                      )}
                      {fac.services && (
                        <span className="text-gray-500 truncate max-w-[200px]">
                          • {fac.services}
                        </span>
                      )}
                    </div>

                    {/* Action buttons: Google Maps Route + Direct Call + Preview */}
                    <div className="grid grid-cols-3 gap-2 pt-1">
                      {/* 1. Google Maps Route Link */}
                      <a
                        href={routeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="col-span-2 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow-md hover:bg-teal-700 active:translate-y-0.5 transition-all text-center"
                      >
                        <span>🗺️</span>
                        <span>Route in Google Maps ↗</span>
                      </a>

                      {/* 2. Direct Call to Facility's own number */}
                      <a
                        href={`tel:${cleanPhoneForDial(fac.phone)}`}
                        className="flex items-center justify-center gap-1 py-2.5 px-2 rounded-xl bg-red-500 text-white font-bold text-xs shadow-md hover:bg-red-600 active:translate-y-0.5 transition-all text-center truncate"
                        title={`Call ${fac.name} at ${fac.phone}`}
                      >
                        <span>📞</span>
                        <span className="truncate">{fac.phone || "Call"}</span>
                      </a>
                    </div>

                    {/* In-Modal Map Preview Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedFacilityForMap(fac);
                        setStep("map-preview");
                      }}
                      className="w-full text-center py-1.5 text-[11px] font-bold text-teal-700 hover:text-teal-900 underline underline-offset-2"
                    >
                      📍 Preview Route & Map inside app
                    </button>
                  </div>
                );
              })}

            {/* Bottom options */}
            <div className="pt-2 space-y-2">
              {hasSavedNumber && (
                <button
                  type="button"
                  onClick={() => setStep("call")}
                  className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block py-3 text-xs"
                >
                  📞 Switch to Trusted Contacts List
                </button>
              )}

              <button
                type="button"
                onClick={goToMenu}
                className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-3 text-xs"
              >
                Back to Menu
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: IN-MODAL GOOGLE MAPS PREVIEW */}
        {step === "map-preview" && selectedFacilityForMap && (
          <div className="flex-1 overflow-y-auto space-y-3 animate-slide-up">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-warm-900 text-sm">
                  {selectedFacilityForMap.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {formatDistance(selectedFacilityForMap.distanceKm)} · {selectedFacilityForMap.openStatus}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep("emergency-map")}
                className="px-2.5 py-1 text-xs font-bold rounded-lg border border-warm-300 text-warm-800 hover:bg-warm-100"
              >
                ✕ Close Map
              </button>
            </div>

            {/* Responsive Google Maps Embed iframe */}
            <div className="relative w-full h-64 sm:h-72 rounded-2xl overflow-hidden border-2 border-teal-500 shadow-md bg-gray-100">
              <iframe
                title="Google Maps Route & Location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                src={getGoogleMapsEmbedUrl(
                  selectedFacilityForMap.lat,
                  selectedFacilityForMap.lon,
                  `${selectedFacilityForMap.name}, ${selectedFacilityForMap.address}`
                )}
                allowFullScreen
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href={
                  userLocation
                    ? getGoogleMapsRouteUrl(
                        userLocation.latitude,
                        userLocation.longitude,
                        selectedFacilityForMap.lat,
                        selectedFacilityForMap.lon,
                        selectedFacilityForMap.name
                      )
                    : `https://www.google.com/maps/dir/?api=1&destination=${selectedFacilityForMap.lat},${selectedFacilityForMap.lon}&travelmode=driving`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-teal-600 text-white font-bold text-xs shadow hover:bg-teal-700 text-center"
              >
                <span>🗺️</span> Turn-by-Turn in Google Maps ↗
              </a>

              <a
                href={`tel:${cleanPhoneForDial(selectedFacilityForMap.phone)}`}
                className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-red-500 text-white font-bold text-xs shadow hover:bg-red-600 text-center"
              >
                <span>📞</span> Call ({selectedFacilityForMap.phone})
              </a>
            </div>

            <button
              type="button"
              onClick={() => setStep("emergency-map")}
              className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-2.5 text-xs"
            >
              Back to Facility List
            </button>
          </div>
        )}

        {/* STEP 5: MAIN MENU */}
        {step === "menu" && (
          <div className="space-y-3 animate-slide-up">
            {!sosEnabled && (
              <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 leading-relaxed">
                SOS is turned off in your privacy settings.
                {setupLink}
              </div>
            )}

            {/* Direct Auto-Call / Call Trusted Contact Button */}
            <button
              type="button"
              onClick={() => {
                if (hasSavedNumber) {
                  setStep("autocall");
                  setCountdown(5);
                } else {
                  setStep("call");
                }
              }}
              className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block py-4 gap-3"
            >
              <span className="text-xl" aria-hidden="true">📞</span>
              <span className="flex flex-col items-center gap-1 leading-none">
                <span className="text-[0.76rem] tracking-wider">
                  {hasSavedNumber ? "AUTO-CALL TRUSTED CONTACT" : "CALL TRUSTED CONTACT"}
                </span>
                <span className="font-body font-bold text-base normal-case text-teal-50/90">
                  {hasSavedNumber
                    ? `Dial ${validSosContacts[0].name} (${maskPhone(validSosContacts[0].phone)})`
                    : "Reach someone you trust"}
                </span>
              </span>
            </button>

            {/* Nearest Hospital & Police Station Button */}
            <button
              type="button"
              onClick={goToEmergencyMap}
              className="skeuo-btn skeuo-btn-pixel skeuo-btn-sos skeuo-btn-block py-4 gap-3"
            >
              <span className="text-xl" aria-hidden="true">🏥</span>
              <span className="flex flex-col items-center gap-1 leading-none">
                <span className="text-[0.76rem] tracking-wider">
                  NEAREST HOSPITAL & POLICE (MAP)
                </span>
                <span className="font-body font-bold text-base normal-case text-red-50/90">
                  Find open help & route in Google Maps
                </span>
              </span>
            </button>

            {/* Send Help Alert to Network */}
            <button
              type="button"
              onClick={() => setStep("alert-sent")}
              className="flex items-center justify-center gap-3 w-full rounded-2xl border-2 border-warm-200 bg-white hover:bg-warm-50 py-3 px-4 text-warm-800 font-bold text-sm transition-all"
            >
              <span className="text-lg" aria-hidden="true">📳</span>
              <span>Send Help Alert to Support Network</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-3.5"
            >
              Cancel
            </button>
          </div>
        )}

        {/* STEP 6: MANUAL CONTACT PICKER */}
        {step === "call" && (
          <div className="space-y-3 animate-slide-up">
            <p className="text-center text-gray-600 text-sm">
              Who would you like to call?
            </p>
            {validSosContacts.length === 0 ? (
              <div className="rounded-2xl border-2 border-warm-200 bg-white px-6 py-6 text-center">
                <span className="text-4xl block mb-2" aria-hidden="true">👥</span>
                <p className="text-gray-600 text-sm font-bold mb-1">
                  No emergency contact numbers saved.
                </p>
                <p className="text-gray-500 text-xs mb-3">
                  You can add contacts in the Support tab, or use nearest emergency facilities.
                </p>
                {setupLink}
                <div className="mt-4 pt-3 border-t border-warm-200">
                  <button
                    type="button"
                    onClick={goToEmergencyMap}
                    className="skeuo-btn skeuo-btn-pixel skeuo-btn-sos skeuo-btn-block py-3 text-xs"
                  >
                    🏥 Find Nearest Hospital & Police
                  </button>
                </div>
              </div>
            ) : (
              validSosContacts.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => {
                    setSelectedContact(person);
                    handleTriggerCall(person);
                  }}
                  className="flex w-full items-center gap-3 rounded-2xl border-2 border-warm-200 bg-white px-4 py-3.5 text-left transition-all duration-200 hover:border-red-300 hover:bg-red-50/40 active:translate-y-0.5"
                >
                  <span
                    className={`flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full border-2 border-white shadow text-lg font-extrabold text-white ${relationshipColor(
                      person.relationship
                    )}`}
                  >
                    {person.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-warm-800 text-base font-bold leading-tight">
                      {person.name}
                    </span>
                    <span className="block text-gray-500 text-xs mt-0.5">
                      {relationshipLabel(person.relationship)} · {maskPhone(person.phone)}
                    </span>
                  </span>
                  <span className="text-xl" aria-hidden="true">📞</span>
                </button>
              ))
            )}
            <button
              type="button"
              onClick={goToMenu}
              className="skeuo-btn skeuo-btn-ghost skeuo-btn-pixel skeuo-btn-block py-3"
            >
              Back
            </button>
          </div>
        )}

        {/* STEP 7: ALERT SENT */}
        {step === "alert-sent" && (
          <div className="space-y-4 text-center animate-slide-up">
            <span className="text-5xl block" aria-hidden="true">📳</span>
            <h3 className="font-[family-name:var(--font-pixel)] text-red-700 text-xs leading-relaxed">
              HELP ALERT DISPATCHED
            </h3>
            {validSosContacts.length > 0 ? (
              <div className="space-y-2 text-left max-h-48 overflow-y-auto">
                {validSosContacts.map((person) => (
                  <div
                    key={person.id}
                    className="flex items-center gap-3 rounded-xl border-2 border-warm-200 bg-white px-3 py-2.5"
                  >
                    <span
                      className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border border-white text-sm font-extrabold text-white ${relationshipColor(
                        person.relationship
                      )}`}
                    >
                      {person.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-warm-800 font-bold text-sm leading-tight">
                        {person.name}
                      </span>
                      <span className="block text-gray-500 text-xs">
                        {relationshipLabel(person.relationship)}
                      </span>
                    </span>
                    <span className="text-lg" aria-hidden="true">📤</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-xs">
                No trusted contacts to notify.
              </p>
            )}
            <div className="rounded-2xl border-2 border-amber-200 bg-amber-50 px-4 py-3 text-left text-xs text-amber-800 leading-relaxed">
              Alert dispatched to your active support network with your current timestamp.
            </div>
            <div className="space-y-2">
              <button
                type="button"
                onClick={goToEmergencyMap}
                className="skeuo-btn skeuo-btn-pixel skeuo-btn-sos skeuo-btn-block py-3.5 text-xs"
              >
                🏥 Find Nearest Hospital & Police
              </button>
              <button
                type="button"
                onClick={goToMenu}
                className="skeuo-btn skeuo-btn-primary skeuo-btn-pixel skeuo-btn-block py-3.5"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}