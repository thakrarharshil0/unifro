'use client';

import { motion } from 'framer-motion';

/**
 * Button component with hover glow and scale animations
 * @param {Object} props
 * @param {React.ReactNode} props.children
 * @param {'primary' | 'secondary' | 'outline'} props.variant
 * @param {Function} props.onClick
 * @param {string} props.className
 * @param {'button' | 'submit' | 'reset'} props.type
 */
const Button = ({
  children,
  variant = 'primary',
  onClick,
  className = '',
  type = 'button',
  ...props
}) => {
  const baseClasses =
    'px-8 py-4 rounded-lg font-heading font-semibold uppercase tracking-wider transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2';

    const variants = {
      primary: 'bg-[#0095aa] text-white hover:bg-[#007f91]',
      secondary:
        'bg-accent text-[#0095aa] border-2 border-[#0095aa] hover:bg-[#0095aa] hover:text-white',
      outline:
        'bg-transparent text-[#0095aa] border-2 border-[#0095aa] hover:bg-[#0095aa] hover:text-white',
    };
    

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
