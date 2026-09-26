import { useSmoothScroll } from '../context/ScrollContext';

/**
 * A 3px segmented HUD rail pinned to the bottom edge of the sticky navbar that
 * fills as the page is scrolled — the retro-arcade "loading bar" reading of
 * scroll progress.
 *
 * Absolutely positioned, so it adds no layout height, and it is driven straight
 * from the provider's rAF-synced scroll bus via a transform write. No React
 * state is involved, and nothing renders when reduced motion is on beyond a
 * permanently empty bar.
 */
export default function ScrollProgress() {
  const { progressRef } = useSmoothScroll();

  return (
    <div className="pp-scroll-progress" aria-hidden="true">
      <div className="pp-scroll-progress__fill" ref={progressRef} />
    </div>
  );
}
