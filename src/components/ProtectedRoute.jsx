import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@clerk/react";
import { PageLoader } from "./Skeleton";

export default function ProtectedRoute({ children }) {
  const { isLoaded, isSignedIn } = useAuth();
  const location = useLocation();

  if (!isLoaded) return <PageLoader />;

  if (!isSignedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}