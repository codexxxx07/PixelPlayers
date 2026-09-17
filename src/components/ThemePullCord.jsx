import { useCallback, useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import LampIcon from "./LampIcon";

const ROPE_REST = 84;
const DRAG_INTENT = 8;
const MAX_PULL = 80;
const SUPPRESS_CLICK_MS = 500;

function resolveThreshold() {
  if (typeof window === "undefined") return 56;
  return Math.min(60, Math.max(50, Math.round(window.innerWidth * 0.15)));
}

/**
 * Hanging pull-cord lamp — the Light/Dark switch for the navbar.
 *
 * The rope is anchored to the navbar's top border; the lamp dangles below the
 * navbar. Dragging the lamp downward past the activation threshold flips the
 * theme exactly once for that gesture, then the lamp springs back to rest.
 * A plain click/tap (or Enter/Space) toggles the theme as well, so the
 * interaction stays usable for keyboard, touch and reduced-motion users.
 */
export default function ThemePullCord({ className = "" }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();

  const label = isDark ? t("theme.light") : t("theme.dark");
  const modeLabel = isDark ? t("theme.lightMode") : t("theme.darkMode");

  const boxRef = useRef(null);
  const [anchor, setAnchor] = useState(18);
  const [threshold, setThreshold] = useState(resolveThreshold);
  const [pull, setPull] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [fired, setFired] = useState(false);

  const pullRef = useRef(0);
  const rafRef = useRef(0);
  const draggingRef = useRef(false);
  const dragIntentRef = useRef(false);
  const firedRef = useRef(false);
  const suppressClickRef = useRef(false);
  const startYRef = useRef(0);
  const pointerIdRef = useRef(null);
  const fireTimerRef = useRef(0);
  const suppressTimerRef = useRef(0);

  const cleanupTimers = useCallback(() => {
    if (fireTimerRef.current) {
      clearTimeout(fireTimerRef.current);
      fireTimerRef.current = 0;
    }
    if (suppressTimerRef.current) {
      clearTimeout(suppressTimerRef.current);
      suppressTimerRef.current = 0;
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

  const renderPull = useCallback((v) => {
    pullRef.current = v;
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = 0;
      setPull(pullRef.current);
    });
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

  const clearSuppressTimer = useCallback(() => {
    if (suppressTimerRef.current) {
      clearTimeout(suppressTimerRef.current);
      suppressTimerRef.current = 0;
    }
  }, []);

  const onPointerDown = useCallback(
    (e) => {
      if (e.button != null && e.button !== 0) return;
      if (draggingRef.current) return;

      draggingRef.current = true;
      dragIntentRef.current = false;
      firedRef.current = false;
      suppressClickRef.current = false;
      clearSuppressTimer();
      startYRef.current = e.clientY;
      pointerIdRef.current = e.pointerId;

      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch {
        /* capture unavailable */
      }

      renderPull(0);
      setDragging(true);
    },
    [clearSuppressTimer, renderPull]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      if (pointerIdRef.current != null && e.pointerId !== pointerIdRef.current) return;

      const dy = Math.max(0, e.clientY - startYRef.current);
      if (dy >= DRAG_INTENT && !dragIntentRef.current) dragIntentRef.current = true;

      const next = Math.min(dy, MAX_PULL);
      renderPull(next);

      if (dragIntentRef.current && next >= threshold && !firedRef.current) {
        fire();
      }
    },
    [fire, renderPull, threshold]
  );

  const endDrag = useCallback(() => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    pointerIdRef.current = null;

    if (dragIntentRef.current || firedRef.current) {
      suppressClickRef.current = true;
      clearSuppressTimer();
      suppressTimerRef.current = setTimeout(() => {
        suppressTimerRef.current = 0;
        suppressClickRef.current = false;
      }, SUPPRESS_CLICK_MS);
    }

    renderPull(0);
    setDragging(false);
  }, [clearSuppressTimer, renderPull]);

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

  const onClick = useCallback(
    (e) => {
      if (suppressClickRef.current) {
        suppressClickRef.current = false;
        clearSuppressTimer();
        e.preventDefault();
        return;
      }
      toggleTheme();
    },
    [clearSuppressTimer, toggleTheme]
  );

  const isNear = dragging && pull >= threshold * 0.72;

  const classes = [
    "pp-pullcord",
    isDark ? "lamp-off" : "lamp-on",
    dragging ? "is-dragging" : "",
    isNear ? "is-near" : "",
    fired ? "is-fired" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const style = {
    "--pp-anchor": `${anchor}px`,
    "--pp-rope-rest": `${ROPE_REST}px`,
    "--pp-pull": `${pull}px`,
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
          title={label}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerCancel}
          onLostPointerCapture={endDrag}
          onClick={onClick}
        >
          <span className="pp-pullcord__lamp-cap" aria-hidden="true" />
          <LampIcon />
          <span className="pp-pullcord__lamp-label">{modeLabel}</span>
        </button>
      </div>
    </div>
  );
}
