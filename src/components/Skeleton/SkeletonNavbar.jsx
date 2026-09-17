import Skeleton from './Skeleton';
import SkeletonButton from './SkeletonButton';

const navLinkWidths = [88, 104, 80, 96];

export default function SkeletonNavbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-(--pp-navbar) shadow-[0_8px_22px_-14px_rgba(63,40,25,0.25)] dark:shadow-[0_10px_24px_-14px_rgba(0,0,0,0.55)]"
      aria-hidden="true"
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <Skeleton width={40} height={40} radius="xl" className="sk-inner" />
            <Skeleton
              width={150}
              height={20}
              radius="sm"
              className="sk-inner hidden sm:block"
            />
          </div>

          {/* Desktop nav */}
          <div className="hidden xl:flex items-center gap-2">
            {navLinkWidths.map((w, i) => (
              <SkeletonButton key={i} width={w} size="md" radius="lg" />
            ))}
          </div>

          {/* Desktop auth */}
          <div
            className="hidden lg:flex items-center shrink-0"
            style={{ gap: 'var(--nav-btn-gap)' }}
          >
            <SkeletonButton width={112} height={44} size="md" radius="xl" />
            <SkeletonButton width={112} height={44} size="md" radius="xl" />
            <Skeleton width={40} height={40} radius="full" className="sk-inner" />
            <Skeleton width={44} height={44} radius="md" className="sk-inner" />
          </div>

          {/* Mobile pull-cord lamp */}
          <div className="lg:hidden">
            <Skeleton width={44} height={44} radius="md" className="sk-inner" />
          </div>

          {/* Mobile hamburger */}
          <div className="xl:hidden">
            <Skeleton width={48} height={48} radius="md" className="sk-inner" />
          </div>
        </div>
      </nav>
    </header>
  );
}