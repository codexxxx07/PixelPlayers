import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ClaraLauncher from "./components/ClaraLauncher";
import ClickSpark from "./components/ClickSpark";
import { lazyWithDelay, RouteSkeleton, SkeletonErrorBoundary } from "./components/Skeleton";

const Home = lazyWithDelay(() => import("./pages/Home"));
const About = lazyWithDelay(() => import("./pages/About"));
const Features = lazyWithDelay(() => import("./pages/Features"));
const Games = lazyWithDelay(() => import("./pages/Games"));
const ComingSoon = lazyWithDelay(() => import("./pages/ComingSoon"));
const Memory = lazyWithDelay(() => import("./pages/Memory"));
const Routine = lazyWithDelay(() => import("./pages/Routine"));
const Reminders = lazyWithDelay(() => import("./pages/Reminders"));
const Assistant = lazyWithDelay(() => import("./pages/Assistant"));
const Dashboard = lazyWithDelay(() => import("./pages/Dashboard"));
const Progress = lazyWithDelay(() => import("./pages/Progress"));
const Support = lazyWithDelay(() => import("./pages/Support"));
const Settings = lazyWithDelay(() => import("./pages/Settings"));
const Login = lazyWithDelay(() => import("./pages/Login"));
const Signup = lazyWithDelay(() => import("./pages/Signup"));

const GAME_SLUGS = [
  "picture-recall",
  "sequence-recall",
  "pattern-match",
  "find-the-object",
  "memory-cards",
  "word-association",
  "daily-life-recall",
  "place-recognition",
  "memory-story",
  "name-face-match",
];

function AppRoutes() {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/games" element={<Games />} />
        {GAME_SLUGS.map((slug) => (
          <Route key={slug} path={`/games/${slug}`} element={<ComingSoon />} />
        ))}
        <Route path="/memory" element={<Memory />} />
        <Route path="/routine" element={<Routine />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/progress" element={<Progress />} />
        <Route path="/support" element={<Support />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <SkeletonErrorBoundary>
      <ClickSpark
        sparkColor="#0d9488"
        sparkSize={12}
        sparkRadius={22}
        sparkCount={10}
        duration={500}
      >
        <div className="min-h-screen bg-warm-50 flex flex-col">
          <Navbar />
          <main className="flex-1">
            <AppRoutes />
          </main>
          <Footer />
          <ClaraLauncher />
        </div>
      </ClickSpark>
    </SkeletonErrorBoundary>
  );
}

export default App;