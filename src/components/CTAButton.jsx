import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const baseClass =
  'inline-flex items-center justify-center px-7 py-3.5 text-sm tracking-wide rounded-2xl transition-colors duration-300 ease-out-soft';

const variants = {
  primary: 'bg-copper-500 text-cream hover:bg-copperDeep-500',
  secondary: 'bg-transparent text-ink border border-ink hover:bg-ink hover:text-cream',
  ghost: 'bg-transparent text-ink hover:text-copper-600',
};

export default function CTAButton({
  to,
  href,
  onClick,
  type = 'button',
  variant = 'primary',
  children,
  className = '',
  ...rest
}) {
  const classes = `${baseClass} ${variants[variant] || variants.primary} ${className}`;

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  };

  if (to) {
    return (
      <motion.span {...motionProps} className="inline-block">
        <Link to={to} className={classes} {...rest}>
          {children}
        </Link>
      </motion.span>
    );
  }

  if (href) {
    return (
      <motion.a href={href} className={classes} {...motionProps} {...rest}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={classes}
      {...motionProps}
      {...rest}
    >
      {children}
    </motion.button>
  );
}
