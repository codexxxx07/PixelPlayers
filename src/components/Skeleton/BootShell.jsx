import SkeletonNavbar from './SkeletonNavbar';
import SkeletonHero from './SkeletonHero';
import SkeletonFooter from './SkeletonFooter';

export default function BootShell() {
  return (
    <div className="min-h-screen flex flex-col">
      <SkeletonNavbar />
      <main className="flex-1">
        <SkeletonHero />
      </main>
      <SkeletonFooter />
    </div>
  );
}