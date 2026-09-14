import { useLocation } from "react-router-dom";
import PageLoader from "./PageLoader.jsx";
import { getSkeletonComponent } from "./SkeletonRegistry.js";

export default function RouteSkeleton() {
  const location = useLocation();
  const SkeletonView = getSkeletonComponent(location.pathname);

  return <PageLoader skeleton={SkeletonView} />;
}