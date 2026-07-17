'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook for mouse parallax effect (Next.js safe)
 * @param {Object} options
 * @param {number} options.intensity
 */
const useMouseParallax = (options = {}) => {
  const { intensity = 0.1 } = options;
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // 🛑 SSR guard (very important)
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;

      setPosition({
        x: x * intensity,
        y: y * intensity,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [intensity]);

  return position;
};

export default useMouseParallax;
