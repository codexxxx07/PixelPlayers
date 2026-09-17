import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import LampIcon from "./LampIcon";

const ROPE_REST = 84;
const DRAG_INTENT = 8;
const MAX_PULL = 80;
const SOFT_POINT = 0.7;
const SPRING_STIFFNESS = 240;
const SPRING_DAMPING = 2 * Math.sqrt(SPRING_STIFFNESS);
const SETTLE_EPSILON = 0.6;
const SETTLE_VELOCITY = 6;

function resolveThreshold() {
  if (typeof window === "undefined") return 56;
  return Math.min(60, Math.max(50, Math.round(window.innerWidth * 0.15)));
}

/* Map raw pointer pull to a lamp pull with gentle end-of-travel resistance:
   1:1 movement early on, easing off softly as the maximum is approached. */
function softenedPull(raw) {
  const clamped = Math.max(0, Math.min(MAX_PULL, raw));
  const t = clamped / MAX_PULL;
  if (t <= SOFT_POINT) return clamped;
  const tail = (t - SOFT_POINT) / (1 - SOFT_POINT);
  const easedTail = 1 - Math.pow(1 - tail, 3);
  return (SOFT_POINT + (1 - SOFT_POINT) * easedTail) * MAX_PULL;
}

/**
 * Hanging pull-cord lamp — the Light/Dark switch for the navbar.
 *
 * The rope is anchored to the navbar's top border; the lamp dangles below the
 * navbar. Dragging the lamp downward past the activation threshold flips the
 * theme exactly once for that gesture, then the lamp springs back to rest.
 * Clicking/tapping the lamp (or pressing Enter/Space) does NOT change the
 * theme — only a downward drag past the threshold does.
 *
 * High-frequency movement is applied straight to the DOM custom property
 * (`--pp-pull`) inside a single requestAnimationFrame loop, so the rope and
 * lamp track the pointer smoothly without re-rendering React on every move.
 * React state is kept for meaningful transitions only (dragging / near / fired).
 */
export default function ThemePullCord({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const label = isDark ? t("theme.light") : t("theme.dark");

  const boxRef = useRef(null);
  const [anchor, setAnchor] = useState(18);
  const [threshold, setThreshold] = useState(resolveThreshold);
  const [dragging, setDragging] = useState(false);
  const [near, setNear] = useState(false);
  const [fired, setFired] = useState(false);

  const pullXRef = useRef(0);
  const targetRef = useRef(0);
  const velRef = useRef(0);
  const rafRef = useRef(0);
  const lastTimeRef = useRef(0);
  const draggingRef = useRef(false);
  const dragIntentRef = useRef(false);
  const firedRef = useRef(false);
  const nearRef = useRef(false);
  const startYRef = useRef(0);
  const pointerIdRef = useRef(null);
  const fireTimerRef = useRef(0);
  const reducedRef = useRef(false);
  const thresholdRef = useRef(threshold);
  const tickRef = useRef(null);

  useEffect(() => {
    thresholdRef.current = threshold;
  }, [threshold]);

  useEffect(() => {
    let mq = null;
    if (typeof window !== "undefined" && window.matchMedia) {
      mq = window.matchMedia("(prefers-reduced-motion: reduce)");
      reducedRef.current = mq.matches;
      if (typeof mq.addEventListener === "function") {
        const onChange = (e) => {
          reducedRef.current = e.matches;
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
      }
    }
    return undefined;
  }, []);

  const cleanupTimers = useCallback(() => {
    if (fireTimerRef.current) {
      clearTimeout(fireTimerRef.current);
      fireTimerRef.current = 0;
    }
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
    }
  }, []);

  /* The rope attaches at the top of the `<header>`. Measure how far the
     container sits below that edge so the rope always reaches the border,
     independent of navbar height/layout. */
  useEffect(() => {
    const measure = () => {
      const box = boxRef.current;
      if (!box) return;
      const header = box.closest("header");
      if (!header) return;
      const h = header.getBoundingClientRect();
      const b = box.getBoundingClientRect();
      setAnchor(Math.round(b.top - h.top));
      setThreshold(resolveThreshold());
    };

    measure();

    let observer = null;
    const header = boxRef.current && boxRef.current.closest("header");
    if (header && typeof ResizeObserver !== "undefined") {
      observer = new ResizeObserver(measure);
      observer.observe(header);
    }
    window.addEventListener("resize", measure);
    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener("resize", measure);
      cleanupTimers();
    };
  }, [cleanupTimers]);

  const applyPull = useCallback((v) => {
    const el = boxRef.current;
    if (el) el.style.setProperty("--pp-pull", `${v}px`);
  }, []);

  /* One rAF loop drives all movement: a critically-damped spring pulls the
     lamp toward its target, giving jitter-free pointer tracking and a smooth
     physical-feeling return without over-elastic bounce. */
  const tick = useCallback(() => {
    rafRef.current = 0;
    const now = performance.now();
    const dt = Math.min(0.05, Math.max(0.001, (now - lastTimeRef.current) / 1000));
    lastTimeRef.current = now;

    if (reducedRef.current) {
      pullXRef.current = targetRef.current;
      velRef.current = 0;
    } else {
      const acc =
        SPRING_STIFFNESS * (targetRef.current - pullXRef.current) -
        SPRING_DAMPING * velRef.current;
      velRef.current += acc * dt;
      pullXRef.current += velRef.current * dt;
    }

    if (pullXRef.current < 0) {
      pullXRef.current = 0;
      velRef.current = 0;
    }

    applyPull(pullXRef.current);

    const settled =
      !draggingRef.current &&
      pullXRef.current <= SETTLE_EPSILON &&
      Math.abs(velRef.current) < SETTLE_VELOCITY &&
      targetRef.current <= SETTLE_EPSILON;

    if (settled) {
      targetRef.current = 0;
      pullXRef.current = 0;
      velRef.current = 0;
      applyPull(0);
      return;
    }

    const nextNear =
      draggingRef.current && pullXRef.current >= thresholdRef.current * 0.72;
    if (nextNear !== nearRef.current) {
      nearRef.current = nextNear;
      setNear(nextNear);
    }

    rafRef.current = requestAnimationFrame(() => tickRef.current && tickRef.current());
  }, [applyPull]);

  useEffect(() => {
    tickRef.current = tick;
  }, [tick]);

  const startLoop = useCallback(() => {
    if (rafRef.current) return;
    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(() => tickRef.current && tickRef.current());
  }, []);

  const fire = useCallback(() => {
    if (firedRef.current) return;
    firedRef.current = true;
    setFired(true);
    if (fireTimerRef.current) clearTimeout(fireTimerRef.current);
    fireTimerRef.current = setTimeout(() => {
      fireTimerRef.current = 0;
      setFired(false);
    }, 300);
    toggleTheme();
  }, [toggleTheme]);

  const onPointerDown = useCallback(
    (e) => {
      if (e.button != null && e.button !== 0) return;
      if (draggingRef.current) return;

      draggingRef.current = true;
      dragIntentRef.current = false;
      firedRef.current = false;
      startYRef.current = e.clientY;
      pointerIdRef.current = e.pointerId;

      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* capture unavailable */
      }

      if (nearRef.current) {
        nearRef.current = false;
        setNear(false);
      }

      pullXRef.current = 0;
      velRef.current = 0;
      targetRef.current = 0;
      applyPull(0);
      setDragging(true);
      startLoop();
    },
    [applyPull, startLoop]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      if (pointerIdRef.current != null && e.pointerId !== pointerIdRef.current) return;

      const raw = Math.max(0, e.clientY - startYRef.current);
      if (raw >= DRAG_INTENT && !dragIntentRef.current) dragIntentRef.current = true;

      targetRef.current = softenedPull(raw);
      startLoop();

      /* Fire only once the lamp has physically reached the threshold. */
      if (
        dragIntentRef.current &&
        pullXRef.current >= thresholdRef.current &&
        !firedRef.current
      ) {
        fire();
      }
    },
    [fire, startLoop]
  );

  const endDrag = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    pointerIdRef.current = null;

    if (nearRef.current) {
      nearRef.current = false;
      setNear(false);
    }

    targetRef.current = 0;
    setDragging(false);
    startLoop();
  }, [startLoop]);

  const onPointerUp = useCallback(
    (e) => {
      try {
        if (
          e.currentTarget.hasPointerCapture &&
          e.currentTarget.hasPointerCapture(e.pointerId)
        ) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        /* capture unavailable */
      }
      endDrag();
    },
    [endDrag]
  );

  const onPointerCancel = useCallback(
    (e) => {
      try {
        if (
          e.currentTarget.hasPointerCapture &&
          e.currentTarget.hasPointerCapture(e.pointerId)
        ) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch {
        /* capture unavailable */
      }
      endDrag();
    },
    [endDrag]
  );

  const classes = [
    "pp-pullcord",
    isDark ? "lamp-off" : "lamp-on",
    dragging ? "is-dragging" : "",
    near ? "is-near" : "",
    fired ? "is-fired" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    "--pp-anchor": `${anchor}px`,
    "--pp-rope-rest": `${ROPE_REST}px`,
  };

  return (
    <div ref={boxRef} className={classes} style={style}>
      <span className="pp-pullcord__knot" aria-hidden="true" />
      <span className="pp-pullcord__rope" aria-hidden="true" />
      <div className="pp-pullcord__lamp">
        <button
          type="button"
          className="pp-pullcord__lamp-btn"
          aria-label={label}
          aria-pressed={isDark}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onLostPointerCapture={endDrag}
        >
          <span className="pp-pullcord__lamp-cap" aria-hidden="true" />
          <LampIcon />
        </button>
      </div>
    </div>
  );
}