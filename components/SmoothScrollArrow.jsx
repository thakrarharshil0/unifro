// components/ScrollToTopArrow.jsx - With Tapka Effect
'use client';

import { useState, useEffect } from 'react';

const ScrollToTopArrow = () => {
  const [showArrow, setShowArrow] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      
      // Scroll direction determine karo
      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      
      setLastScrollY(currentScrollY);
      
      // Top pe hai to hide karo
      if (currentScrollY === 0) {
        setShowArrow(false);
      }
      // Neeche scroll kar rahe ho to show karo
      else if (currentScrollY > 150 && scrollDirection === 'down') {
        setShowArrow(true);
      }
      // Upar aa rahe ho to hide karo
      else if (currentScrollY < 100 && scrollDirection === 'up') {
        setShowArrow(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, scrollDirection]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setShowArrow(false);
  };

  return (
    <div className="fixed right-8 bottom-8 z-[9999]">
      {/* Arrow jo "tapke" (drop in) */}
      <button
        onClick={scrollToTop}
        // Gradient wala version
className={`
    w-14 h-14
    rounded-full
    bg-gradient-to-br from-[#0095AA] to-[#007788]
    text-white
    shadow-2xl
    shadow-[#0095AA]/50
    flex items-center justify-center
    transform
    transition-all duration-500 ease-out
    hover:from-[#008394] hover:to-[#006677]
    hover:shadow-[#0095AA]/70
    hover:scale-110
    active:scale-95
    
    /* Tapka animation - upar se gir ke aaye */
    ${showArrow 
      ? 'animate-dropIn opacity-100 translate-y-0' 
      : 'opacity-0 translate-y-[-100px] pointer-events-none'
    }
  `}
        aria-label="Scroll to top"
      >
        <svg 
          className="w-7 h-7" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2.5" 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>
    </div>
  );
};

export default ScrollToTopArrow;