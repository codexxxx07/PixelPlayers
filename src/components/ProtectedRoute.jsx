import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { PageLoader, SkeletonDashboard } from "./Skeleton";

export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) return <PageLoader skeleton={<SkeletonDashboard />} />;

  if (!isSignedIn) {
    const from = location.pathname + location.search;
    return <Navigate to="/login" state={{ from }} replace />;
  }

  return <Outlet />;
}