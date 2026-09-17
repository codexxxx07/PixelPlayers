import { createElement } from 'react';
import { useLocation } from 'react-router-dom';
import { resolveSkeletonForPath } from './SkeletonRegistry';

export default function RouteSkeleton() {
  const { pathname } = useLocation();
  return (
    <div aria-busy="true">
      {createElement(resolveSkeletonForPath(pathname))}
    </div>
  );
}