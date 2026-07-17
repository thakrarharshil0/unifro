"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./WhoWeAre.css";

const features = [
  "REDUCED SELF WEIGHT OF STRUCTURE",
  "FASTER CONSTRUCTION FLOOR CYCLES",
  "ARCHITECTURAL DESIGN FLEXIBILITY",
  "LONG-TERM STRUCTURAL PERFORMANCE",
];

const cards = [
  {
    id: 1,
    image: "assets/Photos/PROJECT VISUALS OF UNBONDED PT SYSTEM/11.png",
    title: "UNBONDED POST-TENSIONING",
    link: "/technology#unbonded-tensioning-systems"
  },
  {
    id: 2,
    image: "assets/Photos/PROJECT VISUALS OF BONDED PT SYSTEM/6.png",
    title: "BONDED POST-TENSIONING",
    link: "/technology#bonded-tensioning-systems"
  },
];

const WhoWeAre = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".pt-panel", {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 80%",
          once: true, // 🔥 important
        },
      });
    }, sectionRef);

    // 🔥 FORCE recalculation after everything is loaded
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);


  return (
    <section className="pt-capabilities-wrapper" ref={triggerRef}>
      {/* Background decorations */}
      <div className="pt-bg-decoration"></div>

      <div className="pt-horizontal-container" ref={sectionRef}>
        <div className="pt-panel">
          <div className="pt-panel-content">
            <h2 className="text-[#1a2a5e] font-anton font-black text-center mb-0 relative z-10 text-[clamp(1.5rem,5vw,3.5rem)] min-[2500px]:text-[70px]">
              POST-TENSIONING ENGINEERING CAPABILITIES
            </h2>
            {/* <h2 className="pt-main-title text-center">
              POST-TENSIONING ENGINEERING{" "}
              <span className="title-break">CAPABILITIES</span>
            </h2> */}
            <div className="absolute inset-0 hidden xl:flex justify-center font-['Impact'] text-[80px] text-black/5 uppercase pointer-events-none min-[2500px]:text-[120px] ">
              POST-TENSIONING ENGINERING CAPABILITIES
            </div>

            <div className="pt-content-grid">
              <div className="pt-text-content">
                <p className="pt-paragraph">
                  Unified specialises in the engineering and execution of
                  post-tensioning systems where structural efficiency, speed of
                  construction, and long-span performance directly influence
                  project feasibility.
                </p>
                <p className="pt-paragraph">
                  Post-tensioning is integrated into the structural system as a
                  design strategy not applied as a standardised solution. Our
                  approach enhances concrete behaviour,
                  reduces unnecessary material consumption, and maximises usable
                  space within the structure.
                </p>
              </div>

              <div className="pt-video-container">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="pt-video"

                >
                  <source
                    src="/assets/freepik__aerial-view-of-a-cityscape-featuring-tall-building__66635.mp4"
                    type="video/mp4"
                  />
                </video>
              </div>
            </div>
          </div>

          {/* OUR SYSTEMS ARE ENGINEERED TO */}
          <div className="systems-panel">
            <h2 className="text-[#1a2a5e] font-anton font-black text-center relative z-10 text-[clamp(1.5rem,5vw,3rem)] pt-12 min-[2500px]:text-[70px]">
              OUR SYSTEMS ARE ENGINEERED TO
            </h2>
            <h2 className="systems-title"></h2>

            <div className="systems-sky-blue-container">
              <div className="systems-features">
                {features.map((feature, index) => (
                  <div key={index} className="feature-pill">
                    <span className="feature-check">✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="systems-teal-container">
                <div className="systems-bg-blueprint"></div>

                <div className="systems-cards">
                  {cards.map((card) => (
                    <div key={card.id} className="system-card">
                      <div className="system-card-image">
                        <img src={card.image} alt={card.title} />
                      </div>
                      <div className="system-card-content">
                        <h3 className="system-card-title">{card.title}</h3>
                        <Link href={card.link} className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-[#0095AA] text-xs font-semibold cursor-pointer transition-all duration-300 hover:gap-2 hover:bg-gray-100 hover:scale-105 mt-2">
                          <span className="flex items-center justify-center w-4 h-4 bg-[#0095AA] text-white rounded-full">
                            <svg
                              className="w-2.5 h-2.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                          <span className="learn-more-text">Learn more</span>
                        </Link>

                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;