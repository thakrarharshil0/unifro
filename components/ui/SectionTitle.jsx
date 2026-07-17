import { motion } from 'framer-motion';

/**
 * Section title component with animated text reveal
 * @param {Object} props - Component props
 * @param {string} props.title - Main title text
 * @param {string} props.subtitle - Optional subtitle text
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.titleColor - Optional title text color class
 */
const SectionTitle = ({ title, subtitle, className = '', titleColor = 'text', titleClassName = '', subtitleClassName = '' }) => {
  return (
    <div className={`text-center mb-16 ${className}`}>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-primary font-heading font-semibold uppercase tracking-wider text-sm mb-4 ${subtitleClassName}`}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className={`text-4xl md:text-5xl lg:text-6xl font-heading font-bold ${titleColor} uppercase tracking-tight ${titleClassName}`}
      >
        {title}
      </motion.h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: '100px' }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="h-1 bg-primary mx-auto mt-4"
      />
    </div>
  );
};

export default SectionTitle;
