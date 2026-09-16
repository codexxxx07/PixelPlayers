import { useLocation } from 'react-router-dom';
import useDelayedRender from './useDelayedRender';
import { getSkeletonForPath } from './SkeletonRegistry';

const SHOW_DELAY_MS = 80;

export default function RouteSkeleton() {
  const location = useLocation();
  const shown = useDelayedRender(SHOW_DELAY_MS);
  const pageSkeleton = getSkeletonForPath(location.pathname);

  return (
    <div role="status" aria-busy="true" aria-live="polite" className="page-enter">
      <span className="sr-only">Loading page…</span>
      {shown && pageSkeleton}
    </div>
  );
}