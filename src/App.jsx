import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ClaraLauncher from "./components/ClaraLauncher";
import ClickSpark from "./components/ClickSpark";
import { RouteSkeleton, SkeletonErrorBoundary } from "./components/Skeleton";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Features = lazy(() => import("./pages/Features"));
const Games = lazy(() => import("./pages/Games"));
const GameDetails = lazy(() => import("./pages/GameDetails"));
const Memory = lazy(() => import("./pages/Memory"));
const Routine = lazy(() => import("./pages/Routine"));
const Reminders = lazy(() => import("./pages/Reminders"));
const Assistant = lazy(() => import("./pages/Assistant"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Progress = lazy(() => import("./pages/Progress"));
const Support = lazy(() => import("./pages/Support"));
const Settings = lazy(() => import("./pages/Settings"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

function AppRoutes() {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/games" element={<Games />} />
        <Route path="/games/:gameId" element={<GameDetails />} />
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