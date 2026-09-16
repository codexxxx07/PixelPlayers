import SkeletonNavbar from './SkeletonNavbar';
import SkeletonFooter from './SkeletonFooter';
import SkeletonCentered from './SkeletonCentered';
import SkeletonAvatar from './SkeletonAvatar';
import SkeletonButton from './SkeletonButton';

export default function BootShell() {
  return (
    <div className="flex min-h-screen flex-col bg-warm-50">
      <SkeletonNavbar />
      <main
        className="flex flex-1 items-center justify-center px-6 py-16"
        role="status"
        aria-busy="true"
        aria-live="polite"
      >
        <span className="sr-only">Pixel Players is loading…</span>
        <SkeletonCentered>
          <SkeletonAvatar size="xl" />
          <SkeletonButton size="lg" width={200} />
          <SkeletonButton size="md" width={120} />
        </SkeletonCentered>
      </main>
      <SkeletonFooter />
    </div>
  );
}