import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import ClaraLauncher from "./components/ClaraLauncher";
import ClickSpark from "./components/ClickSpark";
import { RouteSkeleton, SkeletonErrorBoundary } from "./components/Skeleton";
import { CareProvider } from "./context/CareContext";
import CaregiverShell from "./caregiver/CaregiverShell";

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
const Welcome = lazy(() => import("./pages/Welcome"));
const NotFound = lazy(() => import("./pages/NotFound"));

const CareDashboard = lazy(() => import("./pages/caregiver/CareDashboard"));
const ElderStatus = lazy(() => import("./pages/caregiver/ElderStatus"));
const Meals = lazy(() => import("./pages/caregiver/Meals"));
const Medicines = lazy(() => import("./pages/caregiver/Medicines"));
const CareRoutine = lazy(() => import("./pages/caregiver/CareRoutine"));
const CareReminders = lazy(() => import("./pages/caregiver/CareReminders"));
const Activities = lazy(() => import("./pages/caregiver/Activities"));
const Messages = lazy(() => import("./pages/caregiver/Messages"));
const Orders = lazy(() => import("./pages/caregiver/Orders"));
const CareSettings = lazy(() => import("./pages/caregiver/CareSettings"));

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/features" element={<Features />} />
      <Route path="/games" element={<Games />} />
      <Route path="/games/:gameId" element={<GameDetails />} />
      <Route path="/welcome" element={<Welcome />} />

      {/* Elder experience */}
      <Route element={<ProtectedRoute role="elder" />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/support" element={<Support />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
      <Route element={<ProtectedRoute feature="routine" role="elder" />}>
        <Route path="/routine" element={<Routine />} />
      </Route>
      <Route element={<ProtectedRoute feature="memory" role="elder" />}>
        <Route path="/memory" element={<Memory />} />
      </Route>
      <Route element={<ProtectedRoute feature="reminders" role="elder" />}>
        <Route path="/reminders" element={<Reminders />} />
      </Route>
      <Route element={<ProtectedRoute feature="assistant" role="elder" />}>
        <Route path="/assistant" element={<Assistant />} />
      </Route>

      {/* Caregiver experience */}
      <Route path="/caregiver" element={<ProtectedRoute role="caregiver" />}>
        <Route index element={<Navigate to="/caregiver/dashboard" replace />} />
        <Route path="dashboard" element={<CareDashboard />} />
        <Route path="elder" element={<ElderStatus />} />
        <Route path="meals" element={<Meals />} />
        <Route path="medicines" element={<Medicines />} />
        <Route path="routine" element={<CareRoutine />} />
        <Route path="reminders" element={<CareReminders />} />
        <Route path="activities" element={<Activities />} />
        <Route path="messages" element={<Messages />} />
        <Route path="orders" element={<Orders />} />
        <Route path="settings" element={<CareSettings />} />
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function CaregiverExperience() {
  return (
    <CareProvider>
      <CaregiverShell>
        <Suspense fallback={<RouteSkeleton />}>
          <AppRoutes />
        </Suspense>
      </CaregiverShell>
    </CareProvider>
  );
}

function App() {
  const location = useLocation();
  const isCaregiverRoute = location.pathname.startsWith("/caregiver");

  return (
    <SkeletonErrorBoundary>
      <ClickSpark
        sparkColor="#0d9488"
        sparkSize={12}
        sparkRadius={22}
        sparkCount={10}
        duration={500}
      >
        {isCaregiverRoute ? (
          <CaregiverExperience />
        ) : (
          <div className="min-h-screen bg-warm-50 flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Suspense fallback={<RouteSkeleton />}>
                <AppRoutes />
              </Suspense>
            </main>
            <Footer />
            <ClaraLauncher />
          </div>
        )}
      </ClickSpark>
    </SkeletonErrorBoundary>
  );
}

export default App;