"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import './Hero.css';


const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedNumbers, setAnimatedNumbers] = useState({
    years: 0,
    projects: 0,
    cities: 0,
    engineers: 0,
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const statsRef = useRef(null);
  const heroRef = useRef(null);

  const slides = [
    {
      image: "assets/Photos/PROJECT VISUALS OF BONDED PT SYSTEM/2.png",
      title: " India’s Trusted Company in Post-Tensioning",
      highlight: "",
      description:
        "Stronger structures, faster construction, and smarter use of materials.",
    },
    {
      image: "assets/Photos/PROJECT VISUALS OF UNBONDED PT SYSTEM/8.png",
      title: " Precision You Can Rely On",
      highlight: "",
      description:
        "Every system is designed and delivered with strict quality standards.",
    },
    {
      image: "assets/Photos/PROJECT VISUALS OF BONDED PT SYSTEM/5.png",
      title: "Engineering That Supports Modern Architecture",
      highlight: "",
      description:
        "Smart PT solutions built for today’s complex structures.",
    },
    {
      image: "assets/Photos/PROJECT VISUALS OF UNBONDED PT SYSTEM/7.png",
      title: "Innovating the Future of Construction",
      highlight: "",
      description:
        "Advanced post-tensioning systems make buildings stronger and more efficient.",
    },
    {
      image:
        "assets/Photos/PROJECT VISUALS OF BONDED PT SYSTEM/7.png",
      title: "Stronger Slabs. Longer Spans. Less Concrete.",
      highlight: "",
      description:
        "Post-Tensioning holds significant power in modern construction.",
    },
    {
      image:
        "assets/Photos/PROJECT VISUALS OF UNBONDED PT SYSTEM/10.png",
      title: "Efficient Structures Start with Smart PT design.",
      highlight: "",
      description:
        "Optimized systems that reduce cost, weight, and construction time.",
    },
  ];

  /* Slider autoplay */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [slides.length]);

  /* Stats animation */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateNumbers();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => statsRef.current && observer.unobserve(statsRef.current);
  }, [hasAnimated]);

  const animateNumbers = () => {
    const targets = { years: 8, projects: 600, cities: 84, engineers: 75 };
    const duration = 2500;
    let start = null;

    const animate = (time) => {
      if (!start) start = time;
      const progress = Math.min((time - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setAnimatedNumbers({
        years: Math.floor(targets.years * ease),
        projects: Math.floor(targets.projects * ease),
        cities: Math.floor(targets.cities * ease),
        engineers: Math.floor(targets.engineers * ease),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  };

  /* Scroll parallax */
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const progress = Math.min(Math.abs(rect.top) / rect.height, 1);
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      // Height increase kari hain aur padding adjust kari hain
      className="relative min-h-[50vh] min-[320px]:pt-4 min-[768px]:pt-8 max-[576px]:min-h-[75vh] lg:min-h-[85vh] min-[1700px]:min-h-[88vh] sm:min-w-[300px] px-3 sm:px-8 lg:px-16 pb-16 flex items-center min-[2500px]:min-h-[92vh] min-[2500px]:px-40"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40 -z-20"
      >
        <source src="/assets/Hero-bg-video.mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-cyan-200/40 to-cyan-100/30 -z-10" />

      {/* Yeh main container ka width adjust kiya hain */}
      <div className="relative z-10 w-full max-w-[1200px] sm:max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[60%_40%] 2xl:grid-cols-[65%_35%] gap-4 sm:gap-8 min-[2500px]:ml-[25%] min-[2500px]:w-[125%]  ">
        {/* LEFT - Width increase kari hain flex-[3] se flex-[4] tak */}
        <div
          className="w-full"
          style={{
            transform: typeof window !== 'undefined' && window.innerWidth >= 1024
              ? `translateY(${scrollProgress * 40}px)`
              : 'none',
          }}
        >

          <div className="relative bg-white rounded-2xl p-2 sm:p-3 shadow-xl min-h-[280px] sm:min-h-[340px] lg:min-h-[480px] min-[1800px]:min-h-[580px] overflow-hidden min-[2500px]:min-h-[900px] min-[2500px]:w-[165%] min-[2500px]:ml-[-45%]"> {/* Height badhaya hain */}
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-3 rounded-xl overflow-hidden transition-opacity duration-1000 ${i === currentSlide
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
                  }`}
              >
                <img
                  src={slide.image}
                  alt={slide.highlight}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 h-full flex items-end">
                  <div className="w-full bg-black/80 p-6">
                    <h1
                      className={`text-white text-xl sm:text-2xl lg:text-3xl font-bold mb-2 animate-[slideUp_0.6s_ease_forwards]`} // Font size increase kiya
                    >
                      {slide.title}{" "}
                      <span className="text-white">
                        {slide.highlight}
                      </span>
                    </h1>
                    <p className="text-white/90 text-sm lg:text-base leading-relaxed hidden sm:block"> {/* Hide on mobile, show on sm+ */}
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* RIGHT - Width kam kari hain flex-1 se flex-[0.8] tak */}
        <div
          className="w-full flex flex-col gap-4 sm:gap-6 min-[1800px]:width-[125%] min-[2500px]:w-[135%] min-[2500px]:ml-[35%]" // Width increase kari hain aur margin adjust kari hain
          style={{
            transform: typeof window !== 'undefined' && window.innerWidth >= 1024
              ? `translateY(${scrollProgress * 60}px)`
              : 'none'
          }}
        >

          {/* Stats - Moderate height increase */}
          <div
            ref={statsRef}
            className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl w-full max-w-[580px] min-[768px]:h-auto sm:h-auto md:h-[260px] lg:h-[300px] min-[1800px]:h-[380px] mx-auto min-[2500px]:h-[650px] min-[2500px]:max-w-[900px]"
          >

            <h2 className="text-lg min-[1024px]:text-xl 2xl:text-2xl font-extrabold sm:font-bold mb-4 sm:mb-5 min-[1800px]:mb-8 text-center text-[#24366F] min-[2500px]:text-5xl">
              Transforming Landscapes With <br />Expert Engineering
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 min-[1800px]:gap-8"> {/* Gap moderate */}
              {[
                [animatedNumbers.years, "Years of Experience"],
                [animatedNumbers.projects, "Projects Completed"],
                [animatedNumbers.cities, "Cities Covered"],
                [animatedNumbers.engineers, "Engineers & Experts"],
              ].map(([num, label], i) => (
                <div
                  key={i}
                  className="bg-gray-100 rounded-xl p-3 sm:p-5 text-center h-auto py-3 sm:h-[80px] min-[1800px]:h-[105px] flex flex-col justify-center  min-[2500px]:h-[190px]" // Fixed height set ki
                >
                  <div className="text-xl sm:text-2xl font-bold text-[#24366f] min-[1800px]:text-3xl min-[2500px]:text-4xl">
                    {num}+
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#4B5563] mt-0.5 sm:mt-1 min-[2500px]:text-xl">
                    {label}
                  </div>

                </div>
              ))}
            </div>
          </div>

          {/* CTA - Moderate height increase */}
          <div className="bg-white rounded-2xl px-3 sm:px-4 md:px-5 py-4 sm:py-6 md:py-7 shadow-xl 
                h-auto sm:h-[110px] md:h-[120px] lg:h-[140px] 
                min-[1800px]:h-[170px] 
                w-full max-w-[480px] flex items-center mx-auto 
                min-[2500px]:h-[220px] min-[2500px]:max-w-[900px] 
                min-[2500px]:items-center min-[2500px]:justify-center">

            <div className="flex flex-row items-center gap-3 sm:gap-4 md:gap-6 lg:gap-3 2xl:gap-6 w-full min-[2500px]:justify-center">

              {/* IMAGES */}
              <div className="flex gap-2 sm:gap-4 max-[1100px]:gap-2 justify-center">

                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-16 lg:h-16 2xl:w-24 2xl:h-24 min-[1800px]:w-24 min-[1800px]:h-24 rounded-xl overflow-hidden shrink-0 min-[2500px]:w-32 min-[2500px]:h-32 min-[2500px]:rounded-2xl">
                  <img
                    src="assets/Photos/PROJECT VISUALS OF UNBONDED PT SYSTEM/11.png"
                    alt="PT System 2"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-16 lg:h-16 2xl:w-24 2xl:h-24 min-[1800px]:w-24 min-[1800px]:h-24 rounded-xl overflow-hidden shrink-0 min-[2500px]:w-32 min-[2500px]:h-32 min-[2500px]:rounded-2xl">
                  <img
                    src="assets/Photos/PROJECT VISUALS OF BONDED PT SYSTEM/6.png"
                    alt="PT System 1"
                    className="w-full h-full object-cover"
                  />
                </div>

              </div>

              {/* TEXT + BUTTON */}
              <div className="flex-1 max-[1100px]:w-full flex flex-col justify-center 
                    items-center sm:items-start 
                    text-center sm:text-left 
                    min-[2500px]:items-center 
                    min-[2500px]:text-center">

                <h3 className="text-[10px] min-[360px]:text-xs sm:text-sm md:text-base 
                     font-bold text-[#24366F] 
                     mb-1.5 sm:mb-4 uppercase tracking-wide 
                     whitespace-normal 2xl:whitespace-nowrap min-[2500px]:text-2xl min-[2500px]:mb-4">
                  Explore Our PT Systems
                </h3>

                <Link
                  href="/technology"
                  className="inline-flex items-center gap-2 sm:gap-3
                   bg-[#0095AA] text-white
                   px-2.5 sm:px-4 md:px-6
                   py-1.5 sm:py-2
                   rounded-full font-semibold
                   hover:bg-[#007a8c] transition
                   whitespace-normal 2xl:whitespace-nowrap
                   text-xs sm:text-sm min-[2500px]:text-xl min-[2500px]:px-8 min-[2500px]:py-3 min-[2500px]:gap-4">
                  Visit Technology

                  <span className="flex items-center justify-center
                         w-5 h-5 sm:w-9 sm:h-9
                         bg-white rounded-full shrink-0 min-[2500px]:w-10 min-[2500px]:h-10">
                    <svg
                      className="w-3 h-3 sm:w-5 sm:h-5 text-[#0095AA] min-[2500px]:w-6 min-[2500px]:h-6"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </Link>

              </div>

            </div>
          </div>
        </div>
      </div>

      {/* News Ticker */}
      <div className="absolute bottom-0 left-0 w-full bg-[#0095AA] overflow-hidden z-20">
        <div className="flex w-full overflow-hidden">
          <div
            className="flex whitespace-nowrap animate-[tickerScroll_25s_linear_infinite]"
          >
            {[
              "★ Quality Matters Over Quantity ★",
              "★ Post-Tensioning Company You Can Trust ★",
              "★ Delivering Structural Efficiency Every Time ★",
            ]
              .concat([
                "★ Quality Matters Over Quantity ★",
                "★ Post-Tensioning Company You Can Trust ★",
                "★ Delivering Structural Efficiency Every Time ★",
              ])
              .map((text, i) => (
                <span
                  key={i}
                  className="inline-flex items-center px-10 py-4 text-lg md:text-xl min-[1800px]:text-2xl min-[1800px]:py-6 font-semibold text-white tracking-wide"
                >
                  {text}
                </span>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;