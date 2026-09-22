import { Link } from 'react-router-dom';

const variants = {
  primary:
    'skeuo-btn skeuo-btn-primary skeuo-btn-pixel',
  secondary:
    'skeuo-btn skeuo-btn-ghost skeuo-btn-pixel',
  ghost:
    'skeuo-btn skeuo-btn-ghost font-body font-bold text-sm',
  danger:
    'skeuo-btn skeuo-btn-primary skeuo-btn-pixel bg-linear-to-b from-red-400 to-red-500 border-red-600 shadow-red-700/30',
  default:
    'skeuo-btn skeuo-btn-pixel',
};

const sizes = {
  sm: 'px-4 py-2.5 text-[11px]',
  md: 'px-6 py-3 text-xs',
  lg: 'px-8 py-4 text-[13px]',
};

export default function PixelButton({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  block = false,
  icon,
  ...props
}) {
  const classes = `${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${
    block ? 'skeuo-btn-block' : ''
  } ${className}`;

  const content = (
    <>
      {icon && <span aria-hidden="true">{icon}</span>}
      {children}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}