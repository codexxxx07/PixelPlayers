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

     <div data-pp-fade>                         continuous scroll-linked fade
                                                (major blocks only — see below)

   Two independent layers, deliberately kept apart:

     data-pp-reveal  is a ONE-SHOT entrance. It plays once, then hands the
                     element back to its own cascade.
     data-pp-fade    is a CONTINUOUS scroll-linked opacity. It is a pure
                     function of the block's position relative to the viewport,
                     so it reverses by itself when the reader scrolls back and
                     can be replayed as many times as they like.

   The fade layer, in detail:
     · Opacity is derived from how much of a block has crossed the bottom edge
       (fading in) and how much is still hanging off the top edge (fading out),
       each eased with smoothstep. It is monotonic in scroll, so there is no
       hysteresis and no "once" flag to get stuck.
     · The fade travel is the block's own height, capped at `--pp-fade-span`
       viewport-heights. A card therefore fades across its own height, while a
       full-height panel spreads the same fade over a comfortable stretch of
       screen — tall content is never dimmed while it is being read.
     · Because the travel is measured from the block's own edges, a block at
       the very top of the document is fully opaque at scroll 0, and so is the
       last block at the bottom of the document. Nothing is ever stranded dim.
     · Geometry is measured once (route change, late mount, resize, and each
       entry into the watch band) and cached in document space. The per-frame
       pass is therefore pure arithmetic: zero layout reads, zero React state,
       and it rides the existing Lenis 'scroll' bus — no second rAF loop.
     · Opacity is quantised, so a frame that would not visibly move the block
       never touches the DOM.

   Design rules this file enforces:
     · Nothing renders hidden until the observer is live (`pp-reveal-armed`),
       so a JS failure or a blocked script can never hide content.
     · No React state updates per scroll frame — only direct transform and
       opacity writes on a handful of registered nodes.
     · Reduced motion (OS setting *or* the in-app "reduce animations" toggle)
       never instantiates Lenis and never arms the reveals or the fade.
     · Inner scroll containers (chat panes, carousels, the caregiver sidebar)
       keep native scrolling via Lenis' own nested-scroll detection.
   ──────────────────────────────────────────────────────────────────────────── */

/** Class added to <html> once the reveal observer is live. */
const ARMED_CLASS = 'pp-reveal-armed';
/** Class added to an element the moment it scrolls into view. */
const REVEALED_CLASS = 'pp-reveal-in';
/** Class added to <html> while the scroll-linked fade engine is live. */
const FADE_ARMED_CLASS = 'pp-fade-armed';
/** Marks a block the fade engine has already written an opacity to. */
const FADE_SETTLED_CLASS = 'pp-fade-on';

const REVEAL_SELECTOR = '[data-pp-reveal]';
const DRIFT_SELECTOR = '[data-pp-drift]';
const FADE_SELECTOR = '[data-pp-fade]';

/** How far a `data-pp-drift="1"` element may travel, in px, over a full page. */
const DRIFT_TRAVEL = 46;

/**
 * Fade travel, in viewport-heights, used when the `--pp-fade-span` token is
 * missing or unparseable. The token is the real knob — the stylesheet ships a
 * smaller value on small screens so the effect stays light on a phone.
 */
const FADE_SPAN_FALLBACK = 0.45;

/**
 * How far beyond the viewport the fade engine keeps a block "live". Only live
 * blocks are visited per frame, and only live blocks get re-measured, so the
 * pass stays a short loop no matter how long the page is.
 */
const FADE_WATCH_MARGIN = '60% 0px 60% 0px';

/**
 * Hard ceiling on the fade travel, in viewport-heights. The watch band has to
 * be wider than the deepest possible travel, otherwise the engine would park a
 * still-visible block at 0 the moment it left the band. Clamping the span here
 * makes that an enforced invariant rather than a convention someone can break
 * by editing the token — 0.5 sits safely inside the 0.6 band.
 */
const FADE_SPAN_CEILING = 0.5;

/** Cubic ease-in-out on a clamped 0..1 input. The whole cinematic feel. */
const smoothstep = (t) => {
  const x = t < 0 ? 0 : t > 1 ? 1 : t;
  return x * x * (3 - 2 * x);
};

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
  // Block -> cached { top, height, travel, last }. `top` is a document-space
  // offset, which is what lets the per-frame pass skip layout entirely.
  const fadeNodesRef = useRef(new Map());
  // The fade pass, published so the single scroll bus can call it. A ref, not
  // state: the bus must stay free of re-renders.
  const fadePassRef = useRef(null);
  const fadeScanRef = useRef(() => {});

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
      window.requestAnimationFrame(() => {
        scanRef.current();
        fadeScanRef.current();
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [calm]);

  /* ── Scroll-linked fade ───────────────────────────────────────────────────
     Continuous opacity, locked to the existing Lenis scroll bus. Laid out as a
     layout effect so the very first paint of a new route already carries the
     right opacity — a useEffect here would let the page flash in fully opaque
     for one frame and then dim. */
  useLayoutEffect(() => {
    const registry = fadeNodesRef.current;
    const root = document.documentElement;

    const release = () => {
      fadePassRef.current = null;
      for (const [node, entry] of registry) {
        node.style.opacity = '';
        node.classList.remove(FADE_SETTLED_CLASS);
        entry.last = -1;
      }
      registry.clear();
      root.classList.remove(FADE_ARMED_CLASS);
    };

    // Also covers a calm-mode flip, which must hand the page back untouched.
    release();
    fadeScanRef.current = () => {};

    if (calm || !supportsObserver()) return undefined;

    /** Fade travel for this viewport, in px, capped at the block's own height. */
    let span = FADE_SPAN_FALLBACK;
    const readSpan = () => {
      const raw = Number.parseFloat(
        window.getComputedStyle(root).getPropertyValue('--pp-fade-span')
      );
      span = Number.isFinite(raw) && raw > 0 ? Math.min(raw, FADE_SPAN_CEILING) : FADE_SPAN_FALLBACK;
    };

    /**
     * The one place a block's box is read. Everything downstream is arithmetic
     * on the cached numbers, so scrolling never triggers a layout.
     */
    const measure = (node) => {
      const rect = node.getBoundingClientRect();
      let entry = registry.get(node);
      if (!entry) {
        entry = { top: 0, height: 0, travel: 0, last: -1 };
        registry.set(node, entry);
      }
      entry.top = window.scrollY + rect.top;
      entry.height = rect.height;
      // Zero travel means "not a fade target right now" (collapsed, or
      // display:none) — the writer then forces it fully visible rather than
      // leaving a stale dim behind.
      entry.travel = rect.height > 0 ? Math.min(rect.height, span * (window.innerHeight || 1)) : 0;
      return entry;
    };

    const write = (node, entry, scroll, vh) => {
      let value;
      if (entry.travel > 0) {
        const top = entry.top - scroll;
        const bottom = top + entry.height;
        // Fading in: how much of the block has crossed the bottom edge.
        const enter = smoothstep((vh - top) / entry.travel);
        // Fading out: how much of the block is still hanging off the top edge.
        const exit = smoothstep(bottom / entry.travel);
        value = enter < exit ? enter : exit;
      } else {
        value = 1;
      }

      // Quantise to whole percent and skip the write when nothing moved, so a
      // settled page costs zero DOM mutations per frame.
      const quantised = value > 0.995 ? 1 : value < 0.005 ? 0 : Math.round(value * 100) / 100;
      if (quantised === entry.last) return;
      entry.last = quantised;
      node.style.opacity = quantised >= 1 ? '1' : quantised <= 0 ? '0' : `${quantised}`;
    };

    // Only blocks inside the watch band are visited per frame. Typically a
    // handful, whatever the page length.
    const live = new Set();

    const observer = new IntersectionObserver(
      (entries) => {
        const scroll = window.scrollY;
        const vh = window.innerHeight || 1;
        for (const entry of entries) {
          const node = entry.target;
          if (entry.isIntersecting) {
            // Crossing into the watch band is the cheapest reliable prompt that
            // a block may have been re-laid-out, so refresh the cached box
            // before it is needed. This is the only geometry read while
            // scrolling, and it happens once per block, not once per frame.
            const record = measure(node);
            live.add(node);
            record.last = -1;
            write(node, record, scroll, vh);
          } else {
            // Far outside the band, so certainly past both edges: park it at 0
            // and stop touching it until it comes back.
            const record = registry.get(node);
            if (!record) continue;
            live.delete(node);
            record.last = 0;
            node.style.opacity = '0';
          }
        }
      },
      { rootMargin: FADE_WATCH_MARGIN, threshold: 0 }
    );

    // Late-loading images, web fonts, accordions and collapsed panels all move
    // a block after it was measured. Opacity cannot change a box, so this can
    // never feed back into a loop.
    const resizer =
      typeof ResizeObserver === 'undefined'
        ? null
        : new ResizeObserver((entries) => {
            const scroll = window.scrollY;
            const vh = window.innerHeight || 1;
            for (const entry of entries) {
              const record = measure(entry.target);
              record.last = -1;
              write(entry.target, record, scroll, vh);
            }
          });

    const scan = () => {
      readSpan();
      const scroll = window.scrollY;
      const vh = window.innerHeight || 1;
      const found = root.querySelectorAll(FADE_SELECTOR);
      // All reads first, then all writes. Interleaving them would flush layout
      // once per block instead of once per pass.
      for (const node of found) measure(node);
      for (const node of found) {
        const record = registry.get(node);
        if (!record) continue;
        live.add(node);
        record.last = -1;
        write(node, record, scroll, vh);
        // `pp-fade-on` is what lifts the stylesheet's pre-measurement hiding
        // rule, so it is only set once a real opacity is on the element.
        node.classList.add(FADE_SETTLED_CLASS);
        observer.observe(node);
        resizer?.observe(node);
      }      // Drop anything a previous route left behind, so the map never holds a
      // detached node (or a detached node's listeners) for longer than a scan.
      for (const node of registry.keys()) {
        if (node.isConnected) continue;
        observer.unobserve(node);
        resizer?.unobserve(node);
        live.delete(node);
        registry.delete(node);
      }
    };

    fadeScanRef.current = scan;

    // Publish the per-frame pass. It runs from the existing scroll bus, so it
    // inherits Lenis' rAF cadence exactly and adds no second loop, no second
    // scroll listener and no React render.
    fadePassRef.current = (scroll) => {
      if (live.size === 0) return;
      const vh = window.innerHeight || 1;
      for (const node of live) {
        const record = registry.get(node);
        if (record) write(node, record, scroll, vh);
      }
    };

    // Arm only after the first full measure+write, so the class can never
    // arrive before the opacities that are supposed to replace it.
    scan();
    root.classList.add(FADE_ARMED_CLASS);

    return () => {
      fadeScanRef.current = () => {};
      observer.disconnect();
      resizer?.disconnect();
      live.clear();
      release();
    };
  }, [calm, pathname]);

  /* ── Pick up late-arriving content (images, async lists) ──────────────── */
  useEffect(() => {
    if (calm) return undefined;
    let timer = 0;
    const schedule = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        scanRef.current();
        fadeScanRef.current();
      }, 160);
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

      // The scroll-linked fade rides this same handler, so it is frame-locked to
      // Lenis' own rAF and reads the exact same smoothed scroll value. No second
      // loop, no second listener, no React state.
      fadePassRef.current?.(scroll);
    };

    lenis.on('scroll', onScroll);
    reset();

    return () => {
      lenis.off('scroll', onScroll);
      reset();
    };
  }, [lenis]);

  /* ── Public helpers ───────────────────────────────────────────────────── */
  const rescan = useCallback(() => {
    scanRef.current();
    fadeScanRef.current();
  }, []);

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
