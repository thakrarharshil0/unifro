'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function PremiumJobCard({ job, onToggle, isOpen }) {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['12deg', '-12deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-12deg', '12deg']);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale: 1.03 }}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      className="relative rounded-3xl bg-white/70 backdrop-blur-xl
      border border-white/40 shadow-[0_30px_80px_rgba(0,0,0,0.15)]
      overflow-hidden group cursor-pointer"
    >
      {/* GLOW AURA */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500"
        style={{
          background:
            'radial-gradient(600px circle at var(--x) var(--y), rgba(255,180,80,0.25), transparent 40%)',
        }}
      />

      {/* ANIMATED GRADIENT BORDER */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-orange-400 to-primary opacity-0 group-hover:opacity-100 blur-xl transition duration-700" />

      {/* CONTENT */}
      <div
        className="relative z-10 p-8"
        style={{ transform: 'translateZ(50px)' }}
      >
        <h3 className="text-2xl font-heading font-bold uppercase">
          {job.title}
        </h3>

        <div className="mt-3 flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>📍 {job.location}</span>
          <span>💼 {job.type}</span>
          <span>🏢 {job.department}</span>
        </div>

        <p className="mt-6 text-muted-foreground">
          {job.description}
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          className="mt-8 inline-flex items-center justify-center rounded-xl
          bg-primary px-8 py-4 text-white font-semibold
          shadow-[0_20px_40px_rgba(0,0,0,0.25)]"
        >
          {isOpen ? 'Hide Details' : 'View Details'}
        </motion.button>
      </div>
    </motion.div>
  );
}
