import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth, useUser } from "@clerk/react";
import { PageLoader, SkeletonDashboard } from "./Skeleton";
import FeaturePreview from "./FeaturePreview";
import { getFeatureGate } from "../config/featureGates";
import { getRole, getHomeForRole } from "../auth/roles";

/**
 * Route guard.
 *
 * Backward compatible: with no `role` prop the behaviour is identical to the
 * legacy guard (feature preview for signed-out feature routes, /login for the
 * rest). When `role` is set:
 *   - signed-out → feature preview or /login with `from`
 *   - signed-in, no role  → one-time /welcome role claim, preserves `from`
 *   - signed-in, wrong role → redirected to their own role's home
 *   - match → renders <Outlet/>
 */
export default function ProtectedRoute({ feature = null, role = null }) {
  const { isLoaded, isSignedIn } = useAuth();
  const { isLoaded: userLoaded, user } = useUser();
  const location = useLocation();

  if (!isLoaded || !userLoaded) return <PageLoader skeleton={SkeletonDashboard} />;

  if (!isSignedIn) {
    if (feature && getFeatureGate(feature)) {
      return <FeaturePreview feature={feature} />;
    }
    const from = location.pathname + location.search;
    return <Navigate to="/login" state={{ from }} replace />;
  }

  if (role) {
    const userRole = getRole(user);
    if (!userRole) {
      const from = location.pathname + location.search;
      return <Navigate to="/welcome" state={{ from }} replace />;
    }
    if (userRole !== role) {
      return <Navigate to={getHomeForRole(userRole)} replace />;
    }
  }

  return <Outlet />;
}