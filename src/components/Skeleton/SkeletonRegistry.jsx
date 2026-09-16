import SkeletonAbout from './SkeletonAbout';
import SkeletonAuth from './SkeletonAuth';
import SkeletonAssistant from './SkeletonAssistant';
import SkeletonComingSoon from './SkeletonComingSoon';
import SkeletonDashboard from './SkeletonDashboard';
import SkeletonFeatures from './SkeletonFeatures';
import SkeletonGames from './SkeletonGames';
import SkeletonHome from './SkeletonHome';
import SkeletonMemory from './SkeletonMemory';
import SkeletonProgress from './SkeletonProgress';
import SkeletonReminders from './SkeletonReminders';
import SkeletonRoutine from './SkeletonRoutine';
import SkeletonSettings from './SkeletonSettings';
import SkeletonSupport from './SkeletonSupport';
import DefaultPageSkeleton from './DefaultPageSkeleton';

const FIRST_SEGMENT = {
  '': <SkeletonHome />,
  home: <SkeletonHome />,
  about: <SkeletonAbout />,
  features: <SkeletonFeatures />,
  games: <SkeletonGames />,
  memory: <SkeletonMemory />,
  routine: <SkeletonRoutine />,
  reminders: <SkeletonReminders />,
  assistant: <SkeletonAssistant />,
  dashboard: <SkeletonDashboard />,
  progress: <SkeletonProgress />,
  support: <SkeletonSupport />,
  settings: <SkeletonSettings />,
  login: <SkeletonAuth />,
  signup: <SkeletonAuth />,
};

export function getSkeletonForPath(pathname) {
  const segments = (pathname || '/').split('/').filter(Boolean);
  const first = segments[0] || '';
  if (first === 'games' && segments.length > 1) return <SkeletonComingSoon />;
  return FIRST_SEGMENT[first] || <DefaultPageSkeleton />;
}