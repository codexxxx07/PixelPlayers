import SkeletonHome from './SkeletonHome';
import SkeletonAbout from './SkeletonAbout';
import SkeletonFeatures from './SkeletonFeatures';
import SkeletonGames from './SkeletonGames';
import SkeletonMemory from './SkeletonMemory';
import SkeletonRoutine from './SkeletonRoutine';
import SkeletonAssistant from './SkeletonAssistant';
import SkeletonDashboard from './SkeletonDashboard';
import SkeletonProgress from './SkeletonProgress';
import SkeletonSupport from './SkeletonSupport';
import SkeletonSettings from './SkeletonSettings';
import SkeletonComingSoon from './SkeletonComingSoon';
import SkeletonReminders from './SkeletonReminders';
import SkeletonAuth from './SkeletonAuth';
import DefaultPageSkeleton from './DefaultPageSkeleton';

const registry = {
  '/': SkeletonHome,
  '/about': SkeletonAbout,
  '/features': SkeletonFeatures,
  '/games': SkeletonGames,
  '/memory': SkeletonMemory,
  '/routine': SkeletonRoutine,
  '/reminders': SkeletonReminders,
  '/assistant': SkeletonAssistant,
  '/dashboard': SkeletonDashboard,
  '/progress': SkeletonProgress,
  '/support': SkeletonSupport,
  '/settings': SkeletonSettings,
  '/login': SkeletonAuth,
  '/signup': SkeletonAuth,
  '/welcome': SkeletonAuth,
};

const prefixRoutes = ['/games'];

export function resolveSkeletonForPath(pathname) {
  const direct = registry[pathname];
  if (direct) return direct;
  if (prefixRoutes.some((prefix) => pathname.startsWith(`${prefix}/`))) {
    return SkeletonComingSoon;
  }
  return DefaultPageSkeleton;
}