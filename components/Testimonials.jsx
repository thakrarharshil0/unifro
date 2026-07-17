'use client';

import { useEffect, useRef, useState } from 'react';

const GAP = 24;

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(320);
  const [containerWidth, setContainerWidth] = useState(0);
  const [noTransition, setNoTransition] = useState(false);

  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  const wrapperRef = useRef(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const url = process.env.NODE_ENV === 'development' ? '/api-proxy' : 'https://admin.unifiedpts.com/api';
        const response = await fetch(`${url}/reviews`);
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data = await response.json();
        setTestimonials(data);
        // Start in the middle for infinite effect
        setCurrentIndex(data.length);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Update container width once component is rendered after loading
  useEffect(() => {
    if (!loading && wrapperRef.current) {
      setContainerWidth(wrapperRef.current.offsetWidth);
    }
  }, [loading]);

  /* Responsive sizes */
  useEffect(() => {
    const resize = () => {
      // Align JS state with Tailwind breakpoints (sm:640px, md:768px)
      // CSS: w-[260px] sm:w-[280px] md:w-[320px]
      if (window.innerWidth < 640) setCardWidth(260);
      else if (window.innerWidth < 768) setCardWidth(280);
      else setCardWidth(320);

      if (wrapperRef.current) {
        setContainerWidth(wrapperRef.current.offsetWidth);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  /* Auto slide */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((i) => i + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  /* Infinite reset */
  useEffect(() => {
    if (testimonials.length > 0 && currentIndex >= testimonials.length * 2) {
      setTimeout(() => {
        setNoTransition(true);
        setCurrentIndex(middleIndex);
        requestAnimationFrame(() => setNoTransition(false));
      }, 500);
    }
  }, [currentIndex, testimonials.length]);

  if (loading || !testimonials || testimonials.length === 0) return null;

  const slides = [...testimonials, ...testimonials, ...testimonials];
  const middleIndex = testimonials.length;

  const translateX =
    currentIndex * (cardWidth + GAP) -
    (containerWidth / 2 - cardWidth / 2);

  return (
    <section suppressHydrationWarning className="bg-[#f8f9fa] py-[80px] px-5 sm:px-8 md:px-12 lg:px-[60px]">
      <div className="max-w-[1400px] mx-auto min-[2500px]:max-w-[2200px]">
        {/* Header */}
        <div className="text-center relative mb-12 md:mb-[70px]">
          <h2 className="text-[#1a2a5e] font-anton font-black text-center relative z-10 text-[clamp(2.8rem,8vw,5.5rem)] pt-12">
            GENERAL REVIEWS
          </h2>

          <div className="absolute inset-0 hidden xl:flex items-center justify-center font-['Impact'] text-[120px] mt-[-60px] text-black/5 uppercase tracking-[5px] pointer-events-none">
            GENERAL REVIEWS
          </div>
        </div>

        {/* Carousel */}
        <div className="flex items-center justify-center gap-2 min-[320px]:gap-0 sm:gap-4">
          {/* Prev */}
          <button
            onClick={() =>
              setCurrentIndex((i) =>
                i === 0 ? testimonials.length - 1 : i - 1
              )
            }
            className="
              w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px]
              rounded-full bg-white shadow
              flex items-center justify-center
              text-[22px] sm:text-[26px] md:text-[30px] font-bold leading-none
              hover:bg-[#0095aa] hover:text-white
              transition
            "
            suppressHydrationWarning
          >
            {/* Left Arrow SVG */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Track */}
          <div className="relative w-full max-w-[900px] overflow-hidden">
            <div ref={wrapperRef} className="overflow-hidden">
              <div
                className={`flex gap-[24px] ${noTransition
                  ? 'transition-none'
                  : 'transition-transform duration-500'
                  }`}
                style={{ transform: `translateX(-${translateX}px)` }}
              >
                {slides.map((t, i) => {
                  const active = i === currentIndex;
                  return (
                    <div
                      key={`${t.id}-${i}`}
                      className={`
                          w-[260px] sm:w-[280px] md:w-[320px]
                          min-w-[260px] sm:min-w-[280px] md:min-w-[320px]
                          px-6 sm:px-7 md:px-8
                          py-8 sm:py-9 md:py-10
                          mt-6 mb-20
                          rounded-[16px] bg-white text-center
                          transition-all duration-500
                          ${active
                          ? 'scale-100 opacity-100 shadow-[0_15_50px_rgba(0,0,0,0.15)]'
                          : 'scale-[0.85] opacity-50'
                        }
                        `}
                    >
                      <div className="text-center w-full">
                        <h4 className="font-bold text-[20px] md:text-[22px] text-[#1a2a5e] mb-1">
                          {t.name}
                        </h4>
                        <span className="text-[14px] md:text-[15px] text-gray-500 block">
                          {t.title}
                        </span>

                        <div className="border-t border-gray-100 my-5" />

                        <div className="text-center">
                          <p className="text-[16px] md:text-[18px] font-medium leading-[1.6] text-[#333] italic">
                            <span className="text-[#e2a04f] text-[24px] font-serif leading-none mr-1 inline-block">&ldquo;</span>
                            {t.description}
                            <span className="text-[#e2a04f] text-[24px] font-serif leading-none ml-1 inline-block">&rdquo;</span>
                          </p>
                        </div>

                        <div className="border-t border-gray-100 my-5" />

                        <div className="flex justify-center gap-1 text-[#f4c150] text-[18px]">
                          {Array.from({ length: t.rating || 5 }).map((_, idx) => (
                            <span key={idx}>★</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-[#f8f9fa] to-transparent" />
          </div>

          {/* Next */}
          <button
            onClick={() => setCurrentIndex((i) => i + 1)}
            className="
              w-[40px] h-[40px] sm:w-[45px] sm:h-[45px] md:w-[50px] md:h-[50px]
              rounded-full bg-white shadow
              flex items-center justify-center
              text-[22px] sm:text-[26px] md:text-[30px] font-bold leading-none
              hover:bg-[#0095aa] hover:text-white
              transition
            "
            suppressHydrationWarning
          >
            {/* Right Arrow SVG */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
