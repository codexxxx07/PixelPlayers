import SkeletonNavbar from "./SkeletonNavbar.jsx";
import SkeletonFooter from "./SkeletonFooter.jsx";
import PageLoader from "./PageLoader.jsx";
import DefaultPageSkeleton from "./DefaultPageSkeleton.jsx";

export default function BootShell() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-50" aria-busy="true">
      <SkeletonNavbar />
      <main className="flex-1">
        <PageLoader skeleton={DefaultPageSkeleton} />
      </main>
      <SkeletonFooter />
    </div>
  );
}