import SkeletonAbout from "./SkeletonAbout.jsx";
import SkeletonAssistant from "./SkeletonAssistant.jsx";
import SkeletonAuth from "./SkeletonAuth.jsx";
import SkeletonComingSoon from "./SkeletonComingSoon.jsx";
import SkeletonDashboard from "./SkeletonDashboard.jsx";
import SkeletonFeatures from "./SkeletonFeatures.jsx";
import SkeletonGames from "./SkeletonGames.jsx";
import SkeletonHome from "./SkeletonHome.jsx";
import SkeletonMemory from "./SkeletonMemory.jsx";
import SkeletonProgress from "./SkeletonProgress.jsx";
import SkeletonReminders from "./SkeletonReminders.jsx";
import SkeletonRoutine from "./SkeletonRoutine.jsx";
import SkeletonSettings from "./SkeletonSettings.jsx";
import SkeletonSupport from "./SkeletonSupport.jsx";
import DefaultPageSkeleton from "./DefaultPageSkeleton.jsx";

export const SKELETON_REGISTRY = {
  Home: SkeletonHome,
  About: SkeletonAbout,
  Features: SkeletonFeatures,
  Games: SkeletonGames,
  ComingSoon: SkeletonComingSoon,
  Memory: SkeletonMemory,
  Routine: SkeletonRoutine,
  Reminders: SkeletonReminders,
  Assistant: SkeletonAssistant,
  Dashboard: SkeletonDashboard,
  Progress: SkeletonProgress,
  Support: SkeletonSupport,
  Settings: SkeletonSettings,
  Auth: SkeletonAuth,
};

export function getSkeletonForPath(path) {
  const normalized = (path || "/").split("?")[0].split("#")[0];
  const segments = normalized.split("/").filter(Boolean);

  if (segments.length === 0) return "Home";

  const first = segments[0];
  const firstSegmentMap = {
    home: "Home",
    about: "About",
    features: "Features",
    games: segments.length > 1 ? "ComingSoon" : "Games",
    memory: "Memory",
    routine: "Routine",
    reminders: "Reminders",
    assistant: "Assistant",
    dashboard: "Dashboard",
    progress: "Progress",
    support: "Support",
    settings: "Settings",
    login: "Auth",
    signup: "Auth",
  };

  return firstSegmentMap[first] || "Home";
}

export function getSkeletonComponent(path) {
  const name = getSkeletonForPath(path);
  return SKELETON_REGISTRY[name] || DefaultPageSkeleton;
}

export { DefaultPageSkeleton };