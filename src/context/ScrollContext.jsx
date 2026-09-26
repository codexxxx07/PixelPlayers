/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { useApp } from './AppContext';

/* ────────────────────────────────────────────────────────────────────────────
   Pixel Players scroll experience
   ────────────────────────────────────────────────────────────────────────────
   One Lenis instance, one rAF-synced scroll bus and one IntersectionObserver
   for the whole app. Pages only declare intent with data attributes:

     <section data-pp-reveal="pixel">            entrance variants:
       ""  · "rise"  translateY                  (default, most sections)
       "drop"      translateY from above
       "left"      translateX from the left       (side-by-side card rows)
       "right"     translateX from the right
       "zoom"      scale in                       (hero-sized panels)
       "pixel"     stepped, sprite-like snap     (headings only)

     <div data-pp-reveal-group>                  staggers its direct
       <div data-pp-reveal>…</div>               [data-pp-reveal] children

      <div data-pp-drift="0.6">                   clamped decorative drift,
                                                   discovered by the same scan
                                                    (pixel glyphs, Y2K confetti)

   Design rules this file enforces:
     · Nothing renders hidden until the observer is live (`pp-reveal-armed`),
       so a JS failure or a blocked script can never hide content.
     · No React state updates per scroll frame — only direct transform writes
       on a handful of registered nodes.
     · Reduced motion (OS setting *or* the in-app "reduce animations" toggle)
       never instantiates Lenis and never arms the reveals.
     · Inner scroll containers (chat panes, carousels, the caregiver sidebar)
       keep native scrolling via Lenis' own nested-scroll detection.
   ──────────────────────────────────────────────────────────────────────────── */

/** Class added to <html> once the reveal observer is live. */
const ARMED_CLASS = 'pp-reveal-armed';
/** Class added to an element the moment it scrolls into view. */
const REVEALED_CLASS = 'pp-reveal-in';

const REVEAL_SELECTOR = '[data-pp-reveal]';
const DRIFT_SELECTOR = '[data-pp-drift]';

/** How far a `data-pp-drift="1"` element may travel, in px, over a full page. */
const DRIFT_TRAVEL = 46;

/**
 * Scroll feel. `lerp` feeds Lenis' frame-rate-independent exponential damping,
 * so 60Hz and 120Hz screens glide identically. Kept low enough that the wheel
 * still feels 1:1 — this is a glide, not a float.
 */
const LENIS_OPTIONS = {
  // A touch more glide than the 0.1 default: cinematic, still responsive.
  lerp: 0.115,
  // 1:1 with the wheel. The user stays in direct control of the page.
  wheelMultiplier: 1,
  // Touch stays 100% native (syncTouch: false) so mobile momentum, rubber-band
  // and nested panes behave exactly like the platform intends. Lenis only
  // takes over wheel input (trackpads, mice, Bluetooth devices).
  syncTouch: false,
  touchMultiplier: 1,
  // Let natively scrollable children (chat panes, carousels, tabs, the
  // caregiver sidebar) scroll themselves, and only hand the gesture back to
  // the page once they hit their own edge.
  allowNestedScroll: true,
  // Lenis drives its own rAF loop instead of us duplicating one.
  autoRaf: true,
  // Keep measuring the document as async content, fonts and images land.
  autoResize: true,
  // Programmatic scrollTo jumps are instant under reduced motion.
  respectReducedMotion: true,
};

const REVEAL_OBSERVER_OPTIONS = {
  // Fire slightly before the element reaches the fold so reveals feel attached
  // to the scroll rather than triggered by it.
  rootMargin: '0px 0px -8% 0px',
  threshold: 0.08,
};

const prefersReducedMotion = () => {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const supportsObserver = () =>
  typeof window !== 'undefined' && 'IntersectionObserver' in window;

const ScrollContext = createContext(null);

/** Used when the provider is absent (tests, isolated stories). Scrolling is a
 *  progressive enhancement, so consumers must never crash without it. */
const NO_SCROLL = Object.freeze({
  lenis: null,
  calm: true,
  progressRef: { current: null },
  rescan: () => {},
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export function SmoothScrollProvider({ children }) {
  const { settings } = useApp();
  const { pathname, hash } = useLocation();

  // The in-app "reduce animations" accessibility toggle damps the new scroll
  // effects only; every pre-existing animation is left untouched.
  const appCalm = settings?.reduceAnimations === true;

  const [systemCalm, setSystemCalm] = useState(prefersReducedMotion);
  const calm = systemCalm || appCalm;

  const [lenis, setLenis] = useState(null);

  // Nodes that want scroll-driven motion. Direct DOM writes only.
  const progressRef = useRef(null);
  const driftNodesRef = useRef(new Set());
  const lastProgressRef = useRef(-1);

  /* ── Track OS-level motion preference changes ─────────────────────────── */
  useEffect(() => {
    if (!window.matchMedia) return undefined;
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (event) => setSystemCalm(event.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  /* ── Lenis lifecycle ──────────────────────────────────────────────────── */
  useEffect(() => {
    // Reduced motion: no instance at all. Native scrolling stays 100% intact
    // and the `lenis` class is never added, so none of the Lenis CSS applies.
    if (calm) return undefined;

    // The instance is published as state on purpose. Child effects run before
    // this provider's effect, so a ref would hand Navbar and the scroll bus a
    // null instance on first mount; the one extra render is what guarantees
    // every subscriber sees a live Lenis. This is the "sync with an external
    // system" case the rule warns about, and it happens exactly once.
    /* eslint-disable react-hooks/set-state-in-effect */
    const instance = new Lenis(LENIS_OPTIONS);
    setLenis(instance);

    return () => {
      setLenis(null);
      instance.destroy();
    };
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [calm]);

  /* ── Route change: land at the top of the new page ─────────────────────── */
  const isFirstRender = useRef(true);
  useEffect(() => {
    // Leave the browser's own scroll restoration alone on first paint, so a
    // refresh mid-page keeps the reader where they were.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (hash) return;

    if (lenis) {
      lenis.scrollTo(0, { immediate: true, force: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash, lenis]);

  /* ── Reveal observer: one observer for the whole app ──────────────────── */
  const scanRef = useRef(() => {});
  useEffect(() => {
    scanRef.current = () => {};

    if (calm || !supportsObserver()) {
      return undefined;
    }

    const root = document.documentElement;
    // The Set identity is created once by useRef and never reassigned; only its
    // contents change. Aliasing it keeps the scroll bus and this effect on the
    // same object without re-reading the ref inside the cleanup.
    const driftNodes = driftNodesRef.current;
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(REVEALED_CLASS);
        observer.unobserve(entry.target);
      }
    }, REVEAL_OBSERVER_OPTIONS);

    const scan = () => {
      for (const node of root.querySelectorAll(REVEAL_SELECTOR)) {
        observer.observe(node);
      }
      // Rebuilt rather than appended, so decorative nodes from the previous
      // route are dropped instead of accumulating detached nodes forever.
      driftNodes.clear();
      for (const node of root.querySelectorAll(DRIFT_SELECTOR)) {
        driftNodes.add(node);
      }
    };
    scanRef.current = scan;

    // Arm only once the observer is live, so unobserved / failed JS can never
    // leave content stuck at opacity 0.
    root.classList.add(ARMED_CLASS);
    scan();

    return () => {
      scanRef.current = () => {};
      observer.disconnect();
      for (const node of driftNodes) {
        node.style.transform = '';
      }
      driftNodes.clear();
      // Drop the revealed flag from anything still mounted so the next route's
      // content starts from the hidden state again. Unmounted nodes are gone
      // from the document, so this is a no-op for them.
      for (const node of root.querySelectorAll(`.${REVEALED_CLASS}`)) {
        node.classList.remove(REVEALED_CLASS);
      }
      root.classList.remove(ARMED_CLASS);
    };
  }, [calm, pathname]);

  /* ── Pick up content that mounts after the initial scan ──────────────── */
  useEffect(() => {
    if (calm || typeof MutationObserver === 'undefined') return undefined;
    // Filtered lists, dialogs and expandable sections mount reveal targets long
    // after the first scan. Without this they would sit at opacity 0 forever,
    // because the `pp-reveal-armed` gate is already on by then.
    const observer = new MutationObserver((records) => {
      // Only insertions can introduce an unobserved target; class flips are
      // attribute changes and never reach this observer.
      if (!records.some((record) => record.addedNodes.length > 0)) return;
      window.requestAnimationFrame(() => scanRef.current());
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [calm]);

  /* ── Pick up late-arriving content (images, async lists) ──────────────── */
  useEffect(() => {
    if (calm) return undefined;
    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => scanRef.current(), 160);
    };
    window.addEventListener('resize', schedule, { passive: true });
    window.addEventListener('load', schedule);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('resize', schedule);
      window.removeEventListener('load', schedule);
    };
  }, [calm]);

  /* ── The scroll bus: one handler, one pass per frame, zero React state ─── */
  useLayoutEffect(() => {
    const reset = () => {
      lastProgressRef.current = -1;
      const bar = progressRef.current;
      if (bar) bar.style.transform = 'scaleX(0)';
      for (const node of driftNodesRef.current) {
        node.style.transform = 'translate3d(0,0,0)';
      }
    };

    if (!lenis) {
      reset();
      return undefined;
    }

    const onScroll = (instance) => {
      const scroll = instance.animatedScroll;

      const bar = progressRef.current;
      if (bar) {
        const limit = instance.limit;
        const progress = limit > 0 ? Math.min(1, Math.max(0, scroll / limit)) : 0;
        // Quantise so we only touch the DOM when the bar would visibly move.
        if (Math.abs(progress - lastProgressRef.current) > 0.002) {
          lastProgressRef.current = progress;
          bar.style.transform = `scaleX(${progress.toFixed(4)})`;
        }
      }

      if (driftNodesRef.current.size > 0) {
        for (const node of driftNodesRef.current) {
          const factor = Number(node.dataset.ppDrift) || 0;
          if (factor === 0) continue;
          const offset = Math.max(
            -DRIFT_TRAVEL,
            Math.min(DRIFT_TRAVEL, -scroll * factor)
          );
          node.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        }
      }
    };

    lenis.on('scroll', onScroll);
    reset();

    return () => {
      lenis.off('scroll', onScroll);
      reset();
    };
  }, [lenis]);

  /* ── Public helpers ───────────────────────────────────────────────────── */
  const rescan = useCallback(() => scanRef.current(), []);

  const scrollTo = useCallback(
    (target, options) => {
      if (lenis) {
        lenis.scrollTo(target, options);
        return;
      }
      if (typeof target === 'number') window.scrollTo({ top: target, behavior: 'auto' });
    },
    [lenis]
  );

  const stop = useCallback(() => lenis?.stop(), [lenis]);
  const start = useCallback(() => lenis?.start(), [lenis]);

  const value = useMemo(
    () => ({
      lenis,
      calm,
      progressRef,
      rescan,
      scrollTo,
      stop,
      start,
    }),
    [lenis, calm, rescan, scrollTo, stop, start]
  );

  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>;
}

export function useSmoothScroll() {
  return useContext(ScrollContext) ?? NO_SCROLL;
}
