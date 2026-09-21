import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { PageLoader, SkeletonDashboard } from "./Skeleton";
import FeaturePreview from "./FeaturePreview";
import { getFeatureGate } from "../config/featureGates";

export default function ProtectedRoute({ feature = null }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) return <PageLoader skeleton={SkeletonDashboard} />;

  if (!isSignedIn) {
    if (feature && getFeatureGate(feature)) {
      return <FeaturePreview feature={feature} />;
    }
    const from = location.pathname + location.search;
    return <Navigate to="/login" state={{ from }} replace />;
  }

  return <Outlet />;
}