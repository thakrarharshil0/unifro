"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

export default function ClientsPage() {
  const [isClient, setIsClient] = useState(false);
  const [currentHash, setCurrentHash] = useState("");
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
        const fetchUrl = process.env.NODE_ENV === 'development' ? '/api-proxy' : apiUrl;
        const res = await fetch(`${fetchUrl}/client-images`);
        const result = await res.json();
        if (result.success) {
          setClients(result.data);
        }
      } catch (err) {
        console.error("Failed to fetch clients", err);
      }
    };
    fetchClients();
  }, []);

  const matrixRef = useRef(null);
  const [startCount, setStartCount] = useState(false);

  const [counts, setCounts] = useState({
    first: 0,
    second: 0,
    third: 0,
  });

  useEffect(() => {
    setIsClient(true);
    setCurrentHash(window.location.hash.substring(1));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStartCount(true);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );

    if (matrixRef.current) {
      observer.observe(matrixRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startCount) return;

    const targets = {
      first: 8,
      second: 600,
      third: 84,
    };

    const duration = 1200; // ms
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);

      setCounts({
        first: Math.floor(progress * targets.first),
        second: Math.floor(progress * targets.second),
        third: Math.floor(progress * targets.third),
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [startCount]);

  const tickerItems = [
    "★ Quality Matters Over Quantity ★",
    "★ Post-Tensioning Company You Can Trust ★",
    "★ Delivering Structural Efficiency Every Time ★"
  ];

  return (
    <div style={{ cursor: 'default' }}>
      <main className="bg-[#f5f7fb] text-black min-h-screen">
        <section className="relative min-h-[50vh] max-h-[50vh] flex flex-col justify-center items-center overflow-hidden">

          {/* Background Video */}
          <video
            key="clients-video"
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover z-0"
          >
            <source
              src="/assets/client-bg.mp4"
              type="video/mp4"
            />
          </video>

          {/* Overlay Layer */}
          <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,149,170,0.6)] z-[0.5]"></div>

          {/* Content */}
          <div className="relative z-10 text-center px-6">
            {/* Main Heading */}
            <h1 className="text-white text-shadow-lg tracking-wider font-anton font-normal text-[clamp(3rem,8vw,6rem)] font-black">
              CLIENTELE
            </h1>

          </div>

        </section>
        {/* News Ticker */}
        <div className="relative w-full bg-[#0095AA] overflow-hidden z-30">
          <div className="w-full overflow-hidden">
            <div className="flex animate-tickerScroll">
              {[...tickerItems, ...tickerItems].map((item, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-14 lg:px-16 py-4 text-xl lg:text-2xl font-semibold text-white tracking-wider whitespace-nowrap"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <section className="w-full min-h-screen">
          <div className="grid grid-cols-1 xl:grid-cols-12">

            {/* LEFT STICKY INFO */}
            <div className="
  xl:col-span-4
  text-white
  xl:sticky
  xl:top-0
  xl:h-screen
  block
  xl:flex
  xl:flex-col
  xl:justify-center
  pt-8
  md:pt-12
  xl:pt-16
  pb-8
  xl:pb-12
  bg-[radial-gradient(circle_at_30%_30%,#1E6FBF_0%,#0B4A8B_40%,#083E75_75%)]
  relative
  overflow-hidden
">
              {/* Light Effect Background Image */}
              <div className="absolute inset-0 opacity-80 mix-blend-screen pointer-events-none">
                <Image
                  src="/assets/light-effect.png"
                  alt="light effect"
                  fill
                  className="object-cover"
                  quality={100}
                />
                <div className="absolute inset-0 bg-[#0095aa]/40 z-[1]" />

              </div>


              <div className="px-6 sm:px-8 md:px-10 xl:px-10 w-full flex flex-col items-center">


                <p className="text-sm 3xl:text-3xl font-semibold tracking-widest opacity-90 mb-6 text-center">
                  PARTNERS & CLIENTS
                </p>

                <h2 className="text-5xl sm:text-6xl md:text-[72px] 3xl:text-[120px] leading-none font-extrabold mb-4 md:mb-6 text-center">
                  150<span className="text-2xl sm:text-3xl align-top">+</span>
                </h2>

                <h3 className="text-xl sm:text-2xl 3xl:text-4xl font-semibold mb-6 md:mb-8 text-center">
                  Enterprises trust Unified
                </h3>

                <p className="text-sm sm:text-base 3xl:text-3xl text-white/90 leading-relaxed mb-8 md:mb-10 text-center px-2">
                  Unified Post Tensioning Systems LLP collaborates with India’s most trusted and forward-thinking enterprises to deliver engineered certainty and long-term structural performance across some of the country’s most iconic and demanding projects. By combining advanced post-tensioning technology, expert engineering solutions, and rigorous quality standards, we ensure durability, efficiency, and excellence at every stage of construction.
                </p>


                {/* MATRIX BELT */}
                <div ref={matrixRef} className="relative w-full p-3 sm:p-4 lg:p-6 mt-12 lg:mt-16">
                  <div
                    className="
      bg-white/80
      backdrop-blur-lg
      text-[#1E6FBF]
      rounded-xl
      sm:rounded-2xl
      p-4
      sm:p-6
      relative
      border border-white/40
      shadow-2xl
      overflow-hidden
    "
                  >
                    {/* Glossy effect */}
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/30 to-transparent pointer-events-none"></div>

                    {/* Inner shadow */}
                    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] pointer-events-none"></div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/50 gap-4 sm:gap-0 w-full text-center relative z-10">

                      <div className="py-3 sm:py-0 px-2 sm:px-2 flex flex-col items-center justify-center">
                        <p className="text-xs 3xl:text-xl font-bold text-gray-700/90 mb-1 tracking-widest uppercase">EXPERIENCE</p>
                        <span className="text-4xl sm:text-5xl 3xl:text-7xl font-black tracking-tighter text-[#1E6FBF]">
                          {counts.first}<span className="text-xl sm:text-2xl align-top">+</span>
                        </span>
                      </div>

                      <div className="py-3 sm:py-0 px-2 sm:px-2 flex flex-col items-center justify-center">
                        <p className="text-xs 3xl:text-xl font-bold text-gray-700/90 mb-1 tracking-widest uppercase">PROJECTS</p>
                        <span className="text-4xl sm:text-5xl 3xl:text-7xl font-black tracking-tighter text-[#1E6FBF]">
                          {counts.second}<span className="text-xl sm:text-2xl align-top">+</span>
                        </span>
                      </div>

                      <div className="py-3 sm:py-0 px-2 sm:px-2 flex flex-col items-center justify-center">
                        <p className="text-xs 3xl:text-xl font-bold text-gray-700/90 mb-1 tracking-widest uppercase">CITIES</p>
                        <span className="text-4xl sm:text-5xl 3xl:text-7xl font-black tracking-tighter text-[#1E6FBF]">
                          {counts.third}<span className="text-xl sm:text-2xl align-top">+</span>
                        </span>
                      </div>

                    </div>
                  </div>
                </div>


              </div>
            </div>

            {/* RIGHT LOGO GRID */}
            <div className="xl:col-span-8 bg-[#f5f7fb] px-6 md:px-12 py-24">
              <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-10 gap-y-14">
                  {clients.map((client) => (
                    <div
                      key={client.id}
                      className="
                group
                relative
                bg-white
                border
                border-black/10
                rounded-xl
                p-8
                flex
                items-center
                justify-center
                transition
                hover:shadow-xl
              "
                    >
                      <span className="absolute inset-0 rounded-xl border border-transparent group-hover:border-black/20 transition pointer-events-none" />

                      <Image
                        src={client.image_url}
                        alt={`Client ${client.id}`}
                        width={140}
                        height={60}
                        className="object-contain transition group-hover:opacity-100"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}
