'use client';

import { useEffect, useRef, useState } from 'react';
import './WhyUnified.css';

/* ---------------- Animated Number ---------------- */
const AnimatedNumber = ({ target, isVisible, delay }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timeout = setTimeout(() => {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, target, delay]);

  return <span>{count}%</span>;
};

/* ---------------- Main Component ---------------- */
const WhyUnified = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const metrics = [
    {
      percentage: 92,
      gradientId: 'gradient1',
      gradientColors: ['#4DD0E1', '#0095AA', '#26A69A'],
      label: 'On-schedule stressing and handover across major sites.',
    },
    {
      percentage: 88,
      gradientId: 'gradient2',
      gradientColors: ['#5ED5E8', '#0095AA', '#2DB5A8'],
      label:
        'Design-execution accuracy across slab layouts, tendon profiles, and detailing.',
    },
    {
      percentage: 95,
      gradientId: 'gradient3',
      gradientColors: ['#6EDEF0', '#0095AA', '#34C4B6'],
      label:
        'Client approval and repeat-engagement rate in the last 5 years.',
    },
  ];

  /* Intersection Observer */
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // animate once
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="why-unified-section" ref={sectionRef}>
      <div className="why-unified-container">
        {/* Header */}
        <div className="why-unified-header">
          <h2 className="text-[#1a2a5e] font-anton font-black text-center relative z-10 text-[clamp(2.5rem,7vw,5rem)] pt-12 min-[2500px]:text-[8rem] min-[2500px]:mt-20">
            WHY UNIFIED
          </h2>
          <div className="absolute inset-0 hidden xl:flex justify-center font-['Impact'] text-[120px] text-black/5 uppercase pointer-events-none min-[2500px]:text-[200px]">
            WHY UNIFIED
          </div>
        </div>

        {/* Description */}
        <div className="why-unified-description">
          <p className="why-unified-text">
            Post-Tensioning systems deliver results only when{' '}
            <strong>Engineering Intent and Site Execution are Perfectly Aligned.</strong>
          </p>
          <p className="why-unified-text">
            Unified is chosen not just for the system we provide, but for the{' '}
            <strong>Discipline, Accuracy, and Reliability with which we deliver it.</strong>
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUnified;
