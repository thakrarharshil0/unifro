"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const OurJourney = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("our-journey");
  const bgRef = useRef(null);



  // Handle hash routing - scroll to section when hash is present
  useEffect(() => {
    if (typeof window === "undefined") return;

    const scrollToHash = () => {
      const hash = window.location.hash;

      if (!hash) {
        setActiveSection("our-journey");
        return;
      }

      const sectionId = hash.replace("#", "");
      const element = document.getElementById(sectionId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
        setActiveSection(sectionId);
      }
    };

    // Initial scroll
    requestAnimationFrame(scrollToHash);

    // Listen for hash changes
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [pathname]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {

      /* ===============================
         1️⃣ EXISTING ACTIVE SECTION LOGIC
      =============================== */
      const sections = [
        "who-we-are",
        "our-journey",
        "project-reach-portfolio",
        // "leadership",
        "certification",
        // "events",
      ];

      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }

      /* ===============================
         2️⃣ BACKGROUND PARALLAX LOGIC
      =============================== */
      // Removed global window scroll parallax to fix mobile view "starting from last" issue
      /*
      if (bgRef.current) {
        const speed = 0.3; // adjust for faster/slower
        bgRef.current.style.transform = `translateX(-${
          window.scrollY * speed
        }px)`;
      }
      */
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const scrollToSection = (sectionId) => {
    if (sectionId !== "our-journey") {
      router.push(`/about-us#${sectionId}`);
      return;
    }

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      window.history.replaceState(null, "", `#${sectionId}`);
    }
  };

  const sectionButtons = [
    { id: "who-we-are", label: "WHO WE ARE" },
    { id: "our-journey", label: "OUR JOURNEY" },
    { id: "project-reach-portfolio", label: "PROJECT REACH" },
    // { id: "leadership", label: "LEADERSHIP" },
    { id: "certification", label: "CERTIFICATION" },
    // { id: "testimonials", label: "TESTIMONIALS" },
    // { id: "events", label: "EVENTS" },
  ];

  const tickerItems = [
    "★ Quality Matters Over Quantity ★",
    "★ Post-Tensioning Company You Can Trust ★",
    "★ Delivering Structural Efficiency Every Time ★",
    "★ Engineering Excellence, Project After Project ★",
    "★ Built on Engineering, Delivered with Certainty ★",
  ];

  const timelineData = [
    {
      year: 2018,
      title: "FOUNDATION OF PRAMUKH PT EXECUTION",
      desc: "Pramukh began operations with a focused approach to post-tensioning execution, establishing on-site discipline, reliable manpower deployment, and consistent delivery standards across early projects."
    },
    {
      year: 2019,
      title: "EXPANSION INTO MULTI-PROJECT PT EXECUTION",
      desc: "Operational strength improved through increased manpower and exposure to larger projects. Processes for site coordination and material management began taking shape."
    },
    {
      year: 2020,
      title: "STANDARDIZATION OF PT PROCEDURES & TRAINING",
      desc: "Core execution procedures were standardized, including material traceability. A structured training approach for supervisors and labour teams was introduced to ensure uniform execution quality."
    },
    {
      year: 2021,
      title: "UNIFIED LAUNCHED WITH ENGINEERING SUPPORT",
      desc: "Unified Post Tensioning Systems LLP entered the industry, adding engineering review, layout verification, and planned sequencing to bring technical clarity and stability to PT execution."
    },
    {
      year: 2022,
      title: "INTEGRATION OF MODELLING & QA FRAMEWORK",
      desc: "Engineering modelling practices and a formal QA system were incorporated. This improved accuracy, documentation, and compliance, strengthening the PT workflow from design coordination to final stressing records."
    },
    {
      year: 2023,
      title: "STRENGTHENING & SCALING EXECUTION TEAMS",
      desc: "Multiple trained site teams were added and deployed across new regions. This increased execution capacity and enabled simultaneous unbonded and bonded PT projects with stronger technical oversight."
    },
    {
      year: 2024,
      title: "JOINT OPERATIONS & CONSOLIDATED CAPABILITY",
      desc: "Unified and Pramukh aligned operations to merge field expertise with engineering governance, enhancing agility, speed, and overall system reliability across project categories."
    },
    {
      year: 2025,
      title: "EXPANSION INTO LARGER & COMPLEX PT PROJECTS",
      desc: "Achieving ISO certification strengthened quality systems and execution discipline. With skilled manpower and strong consultant partnerships, the organization expanded into larger and more complex PT projects across residential, commercial, and infrastructure sectors."
    }
  ];


  const extendedTimeline = [
    ...timelineData,
    ...timelineData,
    ...timelineData,
  ];

  const BASE_LENGTH = timelineData.length;
  const START_INDEX = BASE_LENGTH; // Start from 2018 (first item of middle copy)


  const [activeIndex, setActiveIndex] = useState(START_INDEX);
  const trackRef = useRef(null);
  const [isTimelineActive, setIsTimelineActive] = useState(false);
  const timelineSectionRef = useRef(null);
  // Refs for background parallax math
  const lastScrollLeft = useRef(0);
  const bgTranslate = useRef(0);
  useEffect(() => {
    // Removed wheel-to-scroll logic as requested.
    // Using explicit arrow buttons for navigation instead.
  }, [isTimelineActive]);


  const handleScroll = () => {
    const track = trackRef.current;
    if (!track) return;

    const trackCenter =
      track.scrollLeft + track.offsetWidth / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    Array.from(track.children).forEach((child, index) => {
      const childCenter =
        child.offsetLeft + child.offsetWidth / 2;

      const distance = Math.abs(trackCenter - childCenter);

      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);

    /* ===============================
       ✅ MOVE BG WITH DELTA TRACKING (INFINITE LOOP FIX)
    =============================== */
    if (bgRef.current) {
      const currentScroll = track.scrollLeft;
      let delta = currentScroll - lastScrollLeft.current;

      // If jump is detected (large backward or forward jump due to infinite scroll reset)
      // We ignore this jump for the background to maintain smoothness
      if (Math.abs(delta) > 200) {
        delta = 0;
      }

      const speed = 0.4;
      bgTranslate.current += delta * speed;

      // Width of one image segment (half of the 200% width container)
      const bgWidth = bgRef.current.offsetWidth / 2;

      // Apply modulo to loop smoothly
      // We use a safe modulo that handles negative numbers correctly if needed
      // though bgTranslate should mostly be positive.
      const modTranslate = ((bgTranslate.current % bgWidth) + bgWidth) % bgWidth;

      bgRef.current.style.transform = `translateX(-${modTranslate}px)`;

      lastScrollLeft.current = currentScroll;
    }
  };

  // Infinite scroll logic
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleInfiniteScroll = () => {
      const itemWidth = track.children[0]?.offsetWidth || 160;
      const style = window.getComputedStyle(track);
      const gap = parseFloat(style.gap) || 140;
      const itemWithGap = itemWidth + gap;
      const oneLoopWidth = timelineData.length * itemWithGap;

      // When scrolled past 2/3, jump back to 1/3
      if (track.scrollLeft > oneLoopWidth * 1.3) {
        track.scrollLeft = oneLoopWidth * 0.3;
      }
      // When scrolled back too far, jump to 2/3
      else if (track.scrollLeft < oneLoopWidth * 0.2) {
        track.scrollLeft = oneLoopWidth * 1.2;
      }
    };

    track.addEventListener('scroll', handleInfiniteScroll);
    return () => track.removeEventListener('scroll', handleInfiniteScroll);
  }, [timelineData.length]);



  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const item = track.children[activeIndex];
        if (!item) return;

        const center =
          item.offsetLeft -
          track.offsetWidth / 2 +
          item.offsetWidth / 2;

        track.scrollLeft = center;
        // Initialize lastScrollLeft to avoid initial jump calculation
        lastScrollLeft.current = center;
      });
    });
  }, []);

  const handlePrev = () => {
    const track = trackRef.current;
    if (!track) return;
    const itemWidth = track.children[0]?.offsetWidth || 160;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 140;
    track.scrollBy({ left: -(itemWidth + gap), behavior: 'smooth' });
  };

  const handleNext = () => {
    const track = trackRef.current;
    if (!track) return;
    const itemWidth = track.children[0]?.offsetWidth || 160;
    const style = window.getComputedStyle(track);
    const gap = parseFloat(style.gap) || 140;
    track.scrollBy({ left: itemWidth + gap, behavior: 'smooth' });
  };

  const normalizedIndex = activeIndex % timelineData.length;


  return (
    <div className="overflow-x-hidden w-full">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] max-h-[50vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src="/assets/Our Journey.mp4" type="video/mp4" />
        </video>

        {/* Overlay Layer */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,149,170,0.6)] z-[0.5]" />

        {/* Main Heading */}
        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black text-white text-center mx-auto z-10 relative font-anton tracking-wider pt-[60px] min-[2500px]:absolute min-[2500px]:top-1/2 min-[2500px]:left-1/2 min-[2500px]:-translate-x-1/2 min-[2500px]:-translate-y-1/2 min-[2500px]:m-0 min-[2500px]:text-[10rem] min-[2500px]:pt-0">
          OUR JOURNEY
        </h1>

        {/* Sub-Navigation */}
        <div className="hidden lg:flex mt-auto mb-0 z-10 relative bg-white/95 rounded-t-2xl px-8 py-4 gap-5 flex-wrap justify-center items-center min-[2500px]:absolute min-[2500px]:bottom-0 min-[2500px]:mb-0">
          {[
            { id: 'who-we-are', label: 'WHO WE ARE' },
            { id: 'our-journey', label: 'OUR JOURNEY' },
            { id: 'project-reach-portfolio', label: 'PROJECT REACH' },
            // { id: 'leadership', label: 'LEADERSHIP' },
            { id: 'certification', label: 'CERTIFICATION' },
            // { id: 'testimonials', label: 'TESTIMONIALS' },
            // { id: 'events', label: 'EVENTS' }
          ].map((item) => (
            <div key={item.id} className="flex items-center">
              <button
                onClick={() => scrollToSection(item.id)}
                className={`bg-transparent border-none ${activeSection === item.id ? 'text-[#0095AA] font-bold' : 'text-black font-semibold'} text-lg cursor-pointer px-2.5 py-1.5 font-sans transition-all duration-300 hover:text-[#0095AA]`}
              >
                {item.label}
              </button>
              {item.id !== 'certification' && (
                <span className="text-[#0095AA] text-lg mx-1">-</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* News Ticker */}
      <div className="relative w-full bg-[#0095AA] overflow-hidden z-10">
        <div className="ticker flex w-full overflow-hidden">
          <div className="ticker-content flex whitespace-nowrap animate-tickerScroll">
            {tickerItems.map((item, index) => (
              <span
                key={index}
                className="inline-flex items-center py-[18px] px-[60px] text-[25px] font-semibold text-white tracking-wider min-[2500px]:text-[40px] min-[2500px]:py-[30px]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* OUR JOURNEY Section */}
      <section
        id="our-journey"
        className="relative pt-20 pb-2 min-h-[60vh] overflow-hidden bg-white"
      >
        {/* Background Image with Opacity */}
        <div
          className="absolute top-[100px] left-0 w-full h-full opacity-[0.05] z-0 pointer-events-none min-[2500px]:top-[150px]"
          style={{
            backgroundImage: "url('/assets/structural-geometry/pt_beam_with_pt_slab.png')",
            backgroundPosition: "left top",
            backgroundRepeat: "no-repeat",
            backgroundSize: "100% auto",
          }}
        />

        {/* OUR JOURNEY Heading */}
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton tracking-wider uppercase relative z-10 text-center max-w-[1400px] mx-auto px-10 mb-16 min-[2500px]:max-w-[2200px] min-[2500px]:text-[8rem]">
          OUR JOURNEY
        </h2>

        {/* Company Establishment Block */}
        <div className="relative z-10 max-w-[1400px] mx-auto mb-16 text-center px-10 min-[2500px]:max-w-[2200px]">
          <p className=" text-[1.8rem] leading-relaxed text-[#1a2a5e] mb-1 font-black tracking-wide min-[2500px]:text-6xl">
            Established in 2018,
          </p>
          <p className="text-[1.3rem] leading-relaxed text-[#1a2a5e] mb-1 font-semibold tracking-wide lg:w-[800px] text-center mx-auto min-[2500px]:text-5xl min-[2500px]:w-[1200px]">
            The journey began with <span className="text-[1.5rem] text-[#1a2a5e] mb-1 font-black tracking-widest lg:tracking-wider lg:w-[700px] text-center mx-auto min-[2500px]:text-6xl">Pramukh Post-Tensioning System PVT. LTD.</span> Execution, focused on disciplined post-tensioning execution and reliable site practices.
          </p>
          <p className="text-[1.5rem] text-[#0095AA] mb-6 font-semibold tracking-widest lg:tracking-wider lg:w-[800px] text-center mx-auto min-[2500px]:text-5xl min-[2500px]:w-[1400px]">
            Later, <span className="text-[1.8rem] text-[#0095AA] mb-1 font-black tracking-widest lg:tracking-wider lg:w-[700px] text-center mx-auto min-[2500px]:text-6xl">Unified Post-Tensioning Systems LLP</span> was formed to bring structured planning and system-driven PT solutions.
          </p>
          <p className="text-[1.5rem] text-[#1a2a5e] font-semibold tracking-wide lg:w-[800px] text-center mx-auto min-[2500px]:text-5xl min-[2500px]:w-[1200px]">
            The foundation was built on a simple principle
          </p>
          <p className="text-[1.6rem] text-[#1a2a5e] font-black italic tracking-wider inline-block rounded-lg min-[2500px]:text-6xl">
            &quot;Quality Matters Over Quantity&quot;
          </p>
        </div>

        {/* Image-Text Layout */}
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col-reverse lg:flex-row gap-10 md:gap-16 items-start px-5 sm:px-10 min-[2500px]:max-w-[2200px] min-[2500px]:items-center">          {/* Left Side - Text Content */}
          <div className="flex-1 flex flex-col">
            {/* Paragraph 1 */}
            <p className="text-[1.1rem] leading-relaxed text-gray-700 text-justify font-medium indent-12 min-[2500px]:text-4xl">
              As India&apos;s construction sector rapidly expanded, projects demanded longer spans,
              Thinner section, faster cycles, and tighter cost control. Post-tensioning was becoming
              essential but execution standards across the industry were inconsistent, often driven
              by shortcuts rather than engineering discipline.
            </p>

            {/* Highlight Bar 1 */}
            <div className="bg-[#1a2a5e] text-white py-4 px-6 text-center font-black text-[1.5rem] tracking-widest uppercase my-5 min-[2500px]:text-5xl min-[2500px]:py-10">
              UNIFIED WAS CREATED TO CLOSE THIS GAP
            </div>

            {/* Paragraph 2 */}
            <p className="text-[1.1rem] leading-relaxed text-gray-700 text-justify font-medium indent-12 min-[2500px]:text-4xl">
              From the beginning, the company focused on premium unbonded and bonded post-tensioning
              systems, supported by structured planning, material traceability, trained execution
              teams, and strict compliance with engineering intent.
            </p>

            {/* Paragraph 3 */}
            <p className="text-[1.1rem] leading-relaxed text-gray-700 text-justify font-medium indent-12 mt-5 min-[2500px]:text-4xl">
              Rather than treating PT as an isolated site task, Unified embedded a process-led
              methodology understanding structural intent, controlling tendon layouts and
              sequencing, executing with precision, and documenting every stressing operation
              as per defined standards.
            </p>
          </div>

          {/* Right Side - Video */}
          <div className="flex-1 w-[90%] md:w-full mx-auto rounded-xl overflow-hidden shadow-2xl max-h-[600px] min-[2500px]:max-h-[1200px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover block"
            >
              <source src="/assets/Our Journey Video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>




        {/* ================= TIMELINE SCROLL WRAPPER ================= */}
        <section className="relative bg-white py-20">
          {/* MOVING BACKGROUND */}
          <div className="absolute top-[-15px] md:top-0 left-0 w-full h-[350px] overflow-hidden pointer-events-none min-[2500px]:h-[500px] min-[2500px]:top-[80px]">
            <div
              ref={bgRef}
              className="flex h-full"
              style={{ width: "200%" }}
            >
              <img
                src="/assets/png.png"
                alt="background"
                className="w-1/2 h-[76%] object-cover opacity-30"
              />
              <img
                src="/assets/png.png"
                alt="background"
                className="w-1/2 h-[76%] object-cover opacity-30"
              />
            </div>
          </div>

          {/* STICKY TIMELINE CONTAINER */}
          <div
            ref={timelineSectionRef}
            className="sticky top-[100px] flex items-center min-[2500px]:top-[300px]"
          >
            <div className="max-w-[2000px] mx-auto px-4 md:px-20 w-full min-[2500px]:max-w-[2200px] relative">
              {/* Navigation Arrows - Using fixed viewport units for better spacing */}
              <button
                onClick={handlePrev}
                className="absolute left-[-5px] md:left-[20px] top-[100px] md:top-[60px] z-50 bg-white/90 hover:bg-[#0095AA] border-2 border-[#0095AA] text-[#0095AA] hover:text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl group pointer-events-auto"
                aria-label="Previous Year"
              >
                <svg
                  className="w-6 h-6 group-hover:scale-125 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                onClick={handleNext}
                className="absolute right-[-5px] md:right-[20px] top-[100px] md:top-[60px] z-50 bg-white/90 hover:bg-[#0095AA] border-2 border-[#0095AA] text-[#0095AA] hover:text-white w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-xl group pointer-events-auto"
                aria-label="Next Year"
              >
                <svg
                  className="w-6 h-6 group-hover:scale-125 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* SCROLL TRACK - HIDDEN BUT FUNCTIONAL */}
              <div
                ref={trackRef}
                onScroll={handleScroll}
                className="flex gap-[40px] md:gap-[140px] overflow-x-scroll pb-12 mt-[50px] min-[2500px]:gap-[200px]"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {extendedTimeline.map((item, index) => (
                  <div key={index} className="min-w-[100px] md:min-w-[160px] text-center">
                    <div className="text-[28px] md:text-[42px] font-bold text-transparent">
                      {item.year}
                    </div>
                  </div>
                ))}
              </div>

              {/* STATIC YEAR DISPLAY OVERLAY */}
              <div className="absolute top-[50px] w-full left-0 flex justify-center items-center gap-[40px] md:gap-[140px] pointer-events-none min-[2500px]:gap-[200px] min-[2500px]:top-[60px]">
                {/* This creates a centered window of 5 years */}
                {[-2, -1, 0, 1, 2].map((offset) => {
                  const normalizedActiveIndex = activeIndex % timelineData.length;
                  const displayIndex = (normalizedActiveIndex + offset + timelineData.length) % timelineData.length;
                  const yearItem = timelineData[displayIndex];

                  const isCenter = offset === 0;

                  return (
                    <div
                      key={offset}
                      className={`min-w-[100px] md:min-w-[160px] text-center transition-all duration-200 ${Math.abs(offset) > 1 ? 'hidden md:block' : ''}`}
                      style={{
                        transform: `scale(${isCenter ? 1.1 : 0.9})`,
                        opacity: isCenter ? 1 : 0.4,
                      }}
                    >
                      <div
                        className={`text-[28px] md:text-[42px] ${isCenter
                          ? 'font-black text-black'
                          : 'font-bold text-gray-400'
                          } min-[2500px]:text-[6rem]`}
                      >
                        {yearItem.year}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CENTERED LINE */}
              <div className="absolute top-[102px] left-1/2 -translate-x-1/2 w-[2px] h-[150px] bg-black pointer-events-none min-[2500px]:h-[250px] min-[2500px]:top-[250px]" />

              {/* RULER */}
              <div className="relative border-t-2 border-black mt-6 min-[2500px]:mt-52">
                <div className="flex justify-between max-w-full min-[2500px]:max-w-[2450px] mx-auto">
                  {Array.from({ length: 180 }).map((_, i) => (
                    <span
                      key={i}
                      className={`w-[1px] bg-black ${i % 5 === 0 ? 'h-[22px] min-[2500px]:h-[40px]' : 'h-[12px] min-[2500px]:h-[20px]'
                        }`}
                    />
                  ))}
                </div>
              </div>

              {/* CONTENT */}
              <div className="text-center mt-20 max-w-[700px] mx-auto min-h-[180px] min-[2500px]:max-w-[1200px] min-[2500px]:mt-40">
                <h3 className="text-[20px] md:text-[26px] font-black text-[#1a2a5e] mt-2 min-[2500px]:text-6xl">
                  {timelineData[normalizedIndex].title}
                </h3>

                <p className="text-[15px] leading-relaxed text-black/75 mt-4 min-[2500px]:text-4xl">
                  {timelineData[normalizedIndex].desc}
                </p>
              </div>

            </div>
          </div>
        </section>


      </section>

      <style jsx global>{`
        @keyframes tickerScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-tickerScroll {
          animation: tickerScroll 25s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default OurJourney;