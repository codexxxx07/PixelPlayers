import Skeleton from './Skeleton';
import SkeletonText from './SkeletonText';

export default function SkeletonSectionTitle({ center = false, icon = true, className = '' }) {
  return (
    <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''} ${className}`} aria-hidden="true">
      {icon && <Skeleton width={28} height={28} rounding="md" />}
      <SkeletonText size="md" lines={1} widths={[140]} />
    </div>
  );
}