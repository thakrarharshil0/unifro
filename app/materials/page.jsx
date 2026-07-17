"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MaterialsPage() {
  const router = useRouter();

  const [activeSystem, setActiveSystem] = useState("bonded");
  const [activeSection, setActiveSection] = useState("bonded-prestressing-steel-strands");
  const [currentHash, setCurrentHash] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  // Handle hash-based routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      console.log("Hash changed to:", hash);
      setCurrentHash(hash);

      if (hash) {
        // Map legacy hashes to new section IDs
        const hashMapping = {
          // Legacy bonded hashes (from navbar)
          'prestressing-steel-strands': 'bonded-prestressing-steel-strands',
          'wedges': 'bonded-wedges',
          'ducts': 'bonded-ducts',
          'anchor-block': 'bonded-anchor-block',

          // Legacy unbonded hashes (from navbar)
          'prestressing-steel-mono-strands': 'unbonded-prestressing-steel-mono-strands',
          'wedges-unbonded': 'unbonded-wedges',
          'anchor-plate': 'unbonded-anchor-plate',

          // New hashes (with system prefix)
          'bonded-prestressing-steel-strands': 'bonded-prestressing-steel-strands',
          'bonded-wedges': 'bonded-wedges',
          'bonded-ducts': 'bonded-ducts',
          'bonded-anchor-block': 'bonded-anchor-block',

          'unbonded-prestressing-steel-mono-strands': 'unbonded-prestressing-steel-mono-strands',
          'unbonded-wedges': 'unbonded-wedges',
          'unbonded-anchor-plate': 'unbonded-anchor-plate',
        };

        const mappedSection = hashMapping[hash] || hash;

        // Set active system based on section
        if (mappedSection.includes('unbonded')) {
          setActiveSystem('unbonded');
        } else {
          setActiveSystem('bonded');
        }

        setActiveSection(mappedSection);

        // Scroll to section
        setTimeout(() => {
          const element = document.getElementById(mappedSection);
          if (element) {
            console.log("Scrolling to:", mappedSection);
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        // No hash - default to bonded system
        console.log("No hash, defaulting to bonded");
        setActiveSystem('bonded');
        setActiveSection("bonded-prestressing-steel-strands");
      }

      setIsInitialLoad(false);
    };

    // Check initial hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToSection = (system, sectionId) => {
    console.log("Scrolling to section:", system, sectionId);

    // Update URL hash with the sectionId (which already has system prefix)
    window.location.hash = sectionId;
    setActiveSystem(system);
    setActiveSection(sectionId);

    // Scroll to element
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  // Function to check if section should be visible - SIMPLIFIED
  const isSectionVisible = (sectionId) => {
    // On initial load with no hash, show bonded sections only
    if (isInitialLoad && !currentHash) {
      return sectionId.includes('bonded');
    }

    // If there's a current hash, only show matching section
    if (currentHash) {
      // Map current hash to section ID
      const hashMapping = {
        // Legacy bonded hashes
        'prestressing-steel-strands': 'bonded-prestressing-steel-strands',
        'wedges': 'bonded-wedges',
        'ducts': 'bonded-ducts',
        'anchor-block': 'bonded-anchor-block',

        // Legacy unbonded hashes
        'prestressing-steel-mono-strands': 'unbonded-prestressing-steel-mono-strands',
        'wedges-unbonded': 'unbonded-wedges',
        'anchor-plate': 'unbonded-anchor-plate',

        // New hashes
        'bonded-prestressing-steel-strands': 'bonded-prestressing-steel-strands',
        'bonded-wedges': 'bonded-wedges',
        'bonded-ducts': 'bonded-ducts',
        'bonded-anchor-block': 'bonded-anchor-block',

        'unbonded-prestressing-steel-mono-strands': 'unbonded-prestressing-steel-mono-strands',
        'unbonded-wedges': 'unbonded-wedges',
        'unbonded-anchor-plate': 'unbonded-anchor-plate',
      };

      const mappedHash = hashMapping[currentHash] || currentHash;
      return sectionId === mappedHash;
    }

    // If no hash, show sections from active system
    return sectionId.includes(activeSystem);
  };

  const tickerItems = [
    "★ Quality Matters Over Quantity ★",
    "★ Post-Tensioning Company You Can Trust ★",
    "★ Delivering Structural Efficiency Every Time ★"
  ];

  // Function to check if hero section should be visible
  const isHeroSectionVisible = (systemType) => {
    // On initial load with no hash, show bonded only
    if (isInitialLoad && !currentHash) {
      return systemType === 'bonded';
    }

    if (currentHash) {
      // Map hash to system
      const hashToSystem = {
        // Legacy bonded hashes
        'prestressing-steel-strands': 'bonded',
        'wedges': 'bonded',
        'ducts': 'bonded',
        'anchor-block': 'bonded',

        // Legacy unbonded hashes
        'prestressing-steel-mono-strands': 'unbonded',
        'wedges-unbonded': 'unbonded',
        'anchor-plate': 'unbonded',

        // New hashes
        'bonded-prestressing-steel-strands': 'bonded',
        'bonded-wedges': 'bonded',
        'bonded-ducts': 'bonded',
        'bonded-anchor-block': 'bonded',

        'unbonded-prestressing-steel-mono-strands': 'unbonded',
        'unbonded-wedges': 'unbonded',
        'unbonded-anchor-plate': 'unbonded',
      };

      const systemFromHash = hashToSystem[currentHash] ||
        (currentHash.includes('unbonded') ? 'unbonded' : 'bonded');
      return systemType === systemFromHash;
    }

    // If no hash, show based on active system
    return systemType === activeSystem;
  };


  return (
    <div className="materials-page" style={{ overflowX: 'hidden', width: '100%' }}>
      {/* Bonded System Hero Section */}
      {isHeroSectionVisible('bonded') && (
        <section id="bonded-hero" style={{
          position: 'relative',
          minHeight: '50vh',
          maxHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0
            }}
          >
            <source src="/assets/bonded-1-video.mp4" type="video/mp4" />
          </video>

          {/* Overlay Layer */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 149, 170, 0.6)',
            zIndex: 0.5
          }}></div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: '900',
            color: '#ffffff',
            textAlign: 'center',
            margin: '0 auto',
            zIndex: 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            letterSpacing: '2px',
            fontFamily: 'Anton, sans-serif',
            fontStyle: 'normal',
            width: '100%'
          }}>
            BONDED - COMPONENTS
          </h1>

          {/* Bonded Sub-Navigation */}
          <div className="mt-auto mb-0 z-10 relative bg-white/95 rounded-t-[15px] px-8 py-4 hidden lg:flex gap-5 flex-wrap justify-center items-center">            <button
            onClick={() => scrollToSection('bonded', 'bonded-prestressing-steel-strands')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'bonded-prestressing-steel-strands' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'bonded-prestressing-steel-strands' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            PRESTRESSING STEEL
          </button>
            <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
            <button
              onClick={() => scrollToSection('bonded', 'bonded-anchor-block')}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === 'bonded-anchor-block' ? '#0095AA' : '#000000',
                fontSize: '1.2rem',
                fontWeight: activeSection === 'bonded-anchor-block' ? '700' : '600',
                cursor: 'pointer',
                padding: '5px 10px',
                fontFamily: 'sans-serif',
                transition: 'all 0.3s ease'
              }}
            >
              ANCHOR BLOCKS
            </button>
            <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
            <button
              onClick={() => scrollToSection('bonded', 'bonded-wedges')}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === 'bonded-wedges' ? '#0095AA' : '#000000',
                fontSize: '1.2rem',
                fontWeight: activeSection === 'bonded-wedges' ? '700' : '600',
                cursor: 'pointer',
                padding: '5px 10px',
                fontFamily: 'sans-serif',
                transition: 'all 0.3s ease'
              }}
            >
              WEDGES
            </button>
            <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
            <button
              onClick={() => scrollToSection('bonded', 'bonded-ducts')}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === 'bonded-ducts' ? '#0095AA' : '#000000',
                fontSize: '1.2rem',
                fontWeight: activeSection === 'bonded-ducts' ? '700' : '600',
                cursor: 'pointer',
                padding: '5px 10px',
                fontFamily: 'sans-serif',
                transition: 'all 0.3s ease'
              }}
            >
              DUCTS
            </button>
          </div>
        </section>
      )}

      {/* Unbonded System Hero Section */}
      {isHeroSectionVisible('unbonded') && (
        <section id="unbonded-hero" style={{
          position: 'relative',
          minHeight: '50vh',
          maxHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden'
        }}>
          {/* Background Video */}
          <video
            autoPlay
            loop
            muted
            playsInline
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0
            }}
          >
            <source src="/assets/unbonded-1.mp4" type="video/mp4" />
          </video>

          {/* Overlay Layer */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 149, 170, 0.6)',
            zIndex: 0.5
          }}></div>

          {/* Main Heading */}
          <h1 style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: '900',
            color: '#ffffff',
            textAlign: 'center',
            margin: '0 auto',
            zIndex: 1,
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            letterSpacing: '2px',
            fontFamily: 'Anton, sans-serif',
            fontStyle: 'normal',
            width: '100%'
          }}>
            UNBONDED - COMPONENTS
          </h1>

          {/* Unbonded Sub-Navigation */}
          <div className="mt-auto mb-0 z-10 relative bg-white/95 rounded-t-[15px] px-8 py-4 hidden lg:flex gap-5 flex-wrap justify-center items-center">            <button
            onClick={() => scrollToSection('unbonded', 'unbonded-prestressing-steel-mono-strands')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'unbonded-prestressing-steel-mono-strands' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'unbonded-prestressing-steel-mono-strands' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            PRESTRESSING STEEL
          </button>
            <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
            <button
              onClick={() => scrollToSection('unbonded', 'unbonded-wedges')}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === 'unbonded-wedges' ? '#0095AA' : '#000000',
                fontSize: '1.2rem',
                fontWeight: activeSection === 'unbonded-wedges' ? '700' : '600',
                cursor: 'pointer',
                padding: '5px 10px',
                fontFamily: 'sans-serif',
                transition: 'all 0.3s ease'
              }}
            >
              WEDGES
            </button>
            <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
            <button
              onClick={() => scrollToSection('unbonded', 'unbonded-anchor-plate')}
              style={{
                background: 'none',
                border: 'none',
                color: activeSection === 'unbonded-anchor-plate' ? '#0095AA' : '#000000',
                fontSize: '1.2rem',
                fontWeight: activeSection === 'unbonded-anchor-plate' ? '700' : '600',
                cursor: 'pointer',
                padding: '5px 10px',
                fontFamily: 'sans-serif',
                transition: 'all 0.3s ease'
              }}
            >
              ANCHOR PLATE
            </button>
          </div>
        </section>
      )}

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

      <style jsx>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-tickerScroll {
          animation: tickerScroll 25s linear infinite;
        }
      `}</style>

      {/* ===== BONDED SYSTEM SECTIONS ===== */}

      {/* Bonded Prestressing Steel Strands Section */}
      {/* Bonded Prestressing Steel Strands Section */}
      <section
        id="bonded-prestressing-steel-strands"
        className={`relative px-10 lg:px-16 py-16 lg:py-12 min-[2000px]:py-32 min-h-[60vh] overflow-hidden ${isSectionVisible('bonded-prestressing-steel-strands') ? 'block' : 'hidden'
          }`}
      >
        {/* ================= BACKGROUND VIDEO ================= */}
        {/* <video
    className="absolute inset-0 w-full h-full object-cover opacity-40 z-0"
    src="/assets/WhatsApp Video 2025-12-16 at 3.41.26 PM.mp4"   // 🔁 yahan apna video path
    autoPlay
    muted
    loop
    playsInline
  /> */}


        {/* ================= CONTENT ================= */}

        <h2 className="text-[clamp(2.5rem,7vw,5rem)] min-[2000px]:text-[8rem] font-black text-[#1a2a5e] font-anton mx-auto mb-8 min-[2000px]:mb-24 text-center relative z-10">
          PRESTRESSING STEEL (STRANDS)
        </h2>

        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto flex-col lg:flex-row items-center mb-14 min-[2000px]:mb-20">
          <p className="text-lg text-justify md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            Prestressing steel strands are high-strength tensile elements used to apply controlled forces in bonded post-tensioning systems.
          </p>

          <p className="text-lg text-justify md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium mb-4 indent-4 md:indent-12">
            They ensure efficient load transfer, structural stability, and long-term performance within concrete.
          </p>
        </div>

        {/* ================= CONTENT + IMAGE ================= */}
        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto flex flex-col-reverse lg:flex-row items-center">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 lg:pr-16 mb-10 lg:mb-0">
            <h3 className="text-[clamp(1.6rem,4vw,3rem)] min-[2000px]:text-[5rem] font-black text-[#1a2a5e] font-anton text-center sm:text-left mx-auto mb-6 mt-14 min-[2000px]:mt-24 relative z-10">
              Technical Properties
            </h3>
            {/* <ul className="space-y-4 text-justify min-[2000px]:space-y-8 text-gray-700 text-lg md:text-2xl min-[2000px]:text-3xl leading-relaxed font-medium list-disc pl-5">

              <li>
                Low-Relaxation 7 wire Strand of Class II (Grade 1860 as per ASTM A416-2010) with 12.9/15.2 mm nominal diameter used in Bonded post tensioning tendons shall conform to the requirements of IS 14268:2022
              </li>

              <li>
                <strong>Sectional Steel Area of Strand:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1 min-[2000px]:space-y-4">
                  <li>100 mm² (12.9 mm strand)</li>
                  <li>140 mm² (15.2 mm strand)</li>
                </ul>
              </li>

              <li>
                <strong>Yield Load:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1 min-[2000px]:space-y-4">
                  <li>Not less than 164 kN (12.9 mm)</li>
                  <li>Not less than 228 kN (15.2 mm)</li>
                </ul>
              </li>

              <li>
                <strong>Ultimate Strength:</strong> Not less than 1860 N/mm²
              </li>

              <li>
                <strong>Minimum Breaking Strength:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1 min-[2000px]:space-y-4">
                  <li>Not less than 186 kN (12.9 mm)</li>
                  <li>Not less than 259 kN (15.2 mm)</li>
                </ul>
              </li>

              <li>
                <strong>Modulus of Elasticity:</strong> At least 195,000 N/mm²
              </li>

              <li>
                <strong>Relaxation at 1000 Hours:</strong> Less than 2.5% at 70% Minimum Ultimate Tensile Strength
              </li>

              <li>
                <strong>Weight of Bare Strand:</strong>
                <ul className="list-disc pl-5 mt-2 space-y-1 min-[2000px]:space-y-4">
                  <li>More than 0.781 kg/m (12.9 mm)</li>
                  <li>More than 1.1 kg/m (15.2 mm)</li>
                </ul>
              </li>

            </ul> */}
            <ul className="space-y-4 text-justify min-[2000px]:space-y-8 text-gray-700 text-lg md:text-2xl min-[2000px]:text-3xl leading-relaxed font-medium list-disc pl-5">

              <li>
                Low-Relaxation 7 wire Strand of Class II (Grade 1860 as per ASTM A416–2010) with 12.9/15.2 mm nominal diameter used in Bonded post tensioning tendons shall conform to the requirements of IS 14268:2022
              </li>

              <li>
                Sectional steel area of Strand: 100/140 mm²
              </li>

              <li>
                Yield Load: Not less than 164/228 kN
              </li>

              <li>
                Ultimate Strength: Not less than 1860 N/mm²
              </li>

              <li>
                Minimum Breaking Strength: Not less than 186/259 kN
              </li>

              <li>
                Modulus of Elasticity: At least 195,000 N/mm²
              </li>

              <li>
                Relaxation at 1000 hours: Less than 2.5% at 70% Minimum Ultimate Tensile Strength
              </li>

              <li>
                Weight of Bare Strand: More than 0.78/1.1 kg/m
              </li>

            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="lg:w-1/2 flex justify-center items-center self-center mb-10 lg:mb-0">
            <img
              src="/assets/bonded-prestressing.png"
              alt="Prestressing Strand Technical Properties"
              className="max-w-[80%] h-auto object-contain block rounded-lg shadow-xl -scale-x-100"
            />
          </div>
        </div>
      </section>




      {/* Bonded Wedges Section */}
      <section
        id="bonded-wedges"
        className={`relative px-10 lg:px-16 py-16 lg:py-12 min-[2000px]:py-32 min-h-[60vh] overflow-hidden ${isSectionVisible('bonded-wedges') ? 'block' : 'hidden'
          }`}
      >
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] min-[2000px]:text-[8rem] font-black text-[#1a2a5e] font-anton mx-auto mb-8 min-[2000px]:mb-24 text-center relative z-10">
          WEDGES
        </h2>

        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto flex-col lg:flex-row items-center mb-14 min-[2000px]:mb-20">
          <p className="text-lg md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            Wedges are precision-engineered mechanical components used within the anchorage system to grip and lock the prestressing strand securely.
          </p>

          <p className="text-lg md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            They are manufactured with dual hardness characteristics a hardened outer surface for strong strand grip and a tougher, ductile core to absorb stresses ensuring reliable performance under high prestressing forces.
          </p>

          <p className="text-lg md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            This controlled hardness profile prevents strand slippage while maintaining durability during stressing and throughout the service life.
          </p>
        </div>

        {/* ================= CONTENT + IMAGE ================= */}
        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto flex flex-col-reverse lg:flex-row items-center">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0">
            <h3 className="text-[clamp(1.6rem,_4vw,_3rem)] min-[2000px]:text-[5rem] font-black text-[#1a2a5e] font-anton mx-auto mb-8 min-[2000px]:mb-12 text-center sm:text-left relative z-10">
              Hardness Requirements
            </h3>
            <ul className="space-y-4 text-justify min-[2000px]:space-y-8 list-disc pl-6 text-gray-900 font-medium">
              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                <strong>At Surface:</strong> 56-65 HRC
              </li>
            </ul>

            <h3 className="text-[clamp(1.6rem,_4vw,_3rem)] min-[2000px]:text-[5rem] font-black text-[#1a2a5e] font-anton mx-auto mt-14 min-[2000px]:mt-24 mb-8 min-[2000px]:mb-12 text-center sm:text-left relative z-10">
              Material Grades
            </h3>

            <ul className="space-y-4 text-justify min-[2000px]:space-y-8 list-disc pl-6 text-gray-900 font-medium">

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                <strong>Material:</strong> 20MnCr5
              </li>
              {/* 
              <li className="text-lg md:text-2xl min-[2000px]:text-3xl pl-6 list-none">
                <ul className="list-disc pl-6 space-y-2 min-[2000px]:space-y-4 list-none">
                  <li>✔12L14</li>
                  <li>✔EN1A</li>
                  <li>✔56-65 HRC - Surface</li>
                  <li>✔20CrMnTiH</li>
                  <li>✔IS 9175 (Part 20) – 1986, Grade 20MnCr5</li>
                </ul>
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                After heat treatment, these alloys provide a wear-resistant surface
                combined with a tough, load-tolerant core
              </li> */}

            </ul>


            {/* <h3 className="text-[clamp(1.6rem,_4vw,_3rem)] min-[2000px]:text-[5rem] font-black text-[#1a2a5e] font-anton mx-auto mt-14 min-[2000px]:mt-24 mb-8 min-[2000px]:mb-12 text-center sm:text-left relative z-10">
              Metallurgical Requirements
            </h3>

            <ul className="space-y-4 min-[2000px]:space-y-8 list-disc pl-6 text-gray-900 font-medium">

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                <strong>Pearlite Content:</strong> 35 – 40%
                <ul className="mt-2 min-[2000px]:mt-4 list-disc pl-6">
                  <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                    Provides adequate hardness without brittleness
                  </li>
                </ul>
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                <strong>Carbides:</strong> &lt; 3%
                <ul className="mt-2 min-[2000px]:mt-4 list-disc pl-6">
                  <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                    Limits brittleness and prevents crack initiation
                  </li>
                </ul>
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                <strong>Nodularity:</strong> 90 – 95%
                <ul className="mt-2 min-[2000px]:mt-4 list-disc pl-6">
                  <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                    Enables the wedge body to withstand repeated load cycles
                  </li>
                </ul>
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                <strong>Hardness Number (Core Matrix Zones):</strong> 170 – 260 BHN
                <ul className="mt-2 min-[2000px]:mt-4 list-disc pl-6">
                  <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                    Measured after machining
                  </li>
                </ul>
              </li>

            </ul> */}


          </div>


          {/* RIGHT IMAGE */}
          <div className="lg:w-1/2 flex justify-center items-center self-center mb-10 lg:mb-0">
            <img
              src="/assets/bonded-wedges.png"
              alt="Prestressing Strand Technical Properties"
              className="w-full h-full object-cover block rounded-lg shadow-xl"
            />
          </div>
        </div>


      </section>

      {/* Bonded Ducts Section */}
      <section
        id="bonded-ducts"
        className={`relative px-10 lg:px-16 py-16 lg:py-12 min-[2000px]:py-32 min-h-[60vh] overflow-hidden ${isSectionVisible('bonded-ducts') ? 'block' : 'hidden'
          }`}
      >
        {/* ================= HEADING ================= */}
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] min-[2000px]:text-[8rem] font-black text-[#1a2a5e] font-anton mx-auto mb-8 min-[2000px]:mb-24 text-center relative z-10">
          DUCTS
        </h2>

        {/* ================= INTRO TEXT ================= */}
        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto mb-14 min-[2000px]:mb-20">
          <p className="text-lg md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            Ducts form the protective pathway for prestressing strands in bonded post-tensioning systems.
          </p>

          <p className="text-lg md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            They are manufactured from corrugated galvanized steel strips, allowing flexibility for
            profiled tendon layouts while ensuring effective interaction between strand, grout, and
            surrounding concrete.
          </p>

          <p className="text-lg md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify indent-4 md:indent-12">
            The corrugated profile enhances bond performance, prevents grout segregation, and stabilizes
            the tendon during stressing operations, ensuring consistent structural behavior.
          </p>
        </div>

        {/* ================= CONTENT + IMAGE ================= */}
        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto flex flex-col-reverse lg:flex-row items-center">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0">
            <h3 className="text-[clamp(1.6rem,_4vw,_3rem)] min-[2000px]:text-[5rem] font-black text-[#1a2a5e] font-anton mx-auto mb-8 min-[2000px]:mb-12 mt-14 min-[2000px]:mt-24 text-center md:text-left relative z-10">
              Technical Properties
            </h3>
            <ul className="space-y-4 min-[2000px]:space-y-8 text-gray-700 text-lg md:text-2xl min-[2000px]:text-3xl leading-relaxed font-medium list-disc pl-5">
              <li>
                <strong>Appearance:</strong> Corrugated
              </li>
              <li>
                <strong>Shape:</strong> Flat
              </li>
              <li>
                <strong>Width (Flat Ducts):</strong> 30 mm – 80 mm
              </li>
              <li>
                <strong>Thickness:</strong> 0.25 mm – 0.40 mm
              </li>
              <li>
                <strong>Material:</strong> Galvanized strip of steel
              </li>
            </ul>

            {/* ================= FUNCTIONAL REQUIREMENTS ================= */}

          </div>

          {/* RIGHT IMAGE (TOP-ALIGNED, NO CROP) */}
          <div className="lg:w-1/2 flex justify-center lg:justify-start self-center mb-10 lg:mb-0">
            <img
              src="/assets/bonded-ducts-1.png"
              alt="Bonded Ducts"
              className="max-w-[65%] h-auto object-contain rounded-lg shadow-xl"
            />
          </div>

        </div>
      </section>


      {/* Bonded Anchor Block Section */}
      <section
        id="bonded-anchor-block"
        className={`relative px-10 lg:px-16 py-16 lg:py-12 min-h-[60vh] overflow-hidden ${isSectionVisible('bonded-anchor-block') ? 'block' : 'hidden'
          }`}
      >
        {/* ================= HEADING ================= */}
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-8 text-center relative z-10">
          ANCHOR BLOCKS
        </h2>

        {/* ================= INTRO TEXT ================= */}
        <div className="relative z-10 max-w-7xl mx-auto mb-14">
          <p className="text-lg md:text-2xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            Anchor blocks, also referred to as anchorage heads, are critical load-transfer components that convey prestressing forces from the strands into the concrete member.
          </p>

          <p className="text-lg md:text-2xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            Their material quality, metallurgical consistency, and dimensional accuracy directly govern the safety, durability, and long-term performance of the post-tensioning system.

          </p>

          <p className="text-lg md:text-2xl leading-relaxed text-gray-700 font-medium text-justify indent-4 md:indent-12">
            Manufactured from high-nodularity spheroidal graphite iron, anchor blocks provide excellent load resistance, crack tolerance, and stability under concentrated prestressing forces.
          </p>
        </div>

        {/* ================= TECHNICAL PROPERTIES ================= */}
        {/* ================= CONTENT + IMAGE ================= */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col-reverse lg:flex-row items-center">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0">
            <h3 className="text-[clamp(1.6rem,_4vw,_3rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-8 text-center sm:text-left relative z-10">
              Technical Properties
            </h3>
            <ul className="space-y-4 min-[2000px]:space-y-8 text-gray-700 text-lg md:text-2xl min-[2000px]:text-3xl leading-relaxed font-medium list-disc pl-5">

              <li>
                <strong>Tensile Strength:</strong> &gt; 550 N/mm²
              </li>

              <li>
                <strong>Yield Strength:</strong> 340–350 N/mm²
              </li>

              <li>
                <strong>Nodularity:</strong> &gt; 90%
              </li>

              <li>
                <strong>Hardness:</strong> 197–219 BHN
              </li>

            </ul>
          </div>

          {/* RIGHT IMAGE (TOP-ALIGNED, NO CROP) */}
          <div className="lg:w-1/2 flex justify-center lg:justify-start self-center mb-10 lg:mb-0">
            <img
              src="/assets/anchor-block.png"
              alt="Bonded Ducts"
              className="max-w-[90%] h-auto object-contain rounded-lg shadow-xl"
            />
          </div>

        </div>
      </section>

      {/* ===== UNBONDED SYSTEM SECTIONS ===== */}

      {/* Unbonded Prestressing Steel Mono Strands Section */}
      <section
        id="unbonded-prestressing-steel-mono-strands"
        className={`relative px-10 lg:px-16 py-16 lg:py-12 min-h-[60vh] overflow-hidden min-[2000px]:py-32 ${isSectionVisible('unbonded-prestressing-steel-mono-strands') ? 'block' : 'hidden'
          }`}
      >
        {/* ================= HEADING ================= */}
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] min-[2000px]:text-[8rem] font-black text-[#1a2a5e] font-anton mx-auto mb-8 min-[2000px]:mb-24 text-center relative z-10">
          PRESTRESSING STEEL (MONO STRANDS)
        </h2>

        {/* ================= INTRO TEXT ================= */}
        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto mb-14 min-[2000px]:mb-20">
          <p className="text-lg md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            Low Relaxation 7 wire Strand of Class II (Grade 1860) with 12.9 mm nominal diameter used in mono-strand unbonded post tensioning tendons shall conform to the requirements of IS 14268:2022.
          </p>

          {/* <p className="text-lg md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            These strands are engineered to perform reliably under long-term service loads, accommodate slab movements, and retain prestressing force with minimal relaxation losses.
          </p> */}
        </div>

        {/* ================= TECHNICAL PROPERTIES ================= */}
        {/* ================= CONTENT + IMAGE ================= */}
        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto flex flex-col-reverse lg:flex-row items-center">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0 md:p-8">
            <h3 className="text-[clamp(1.6rem,_4vw,_3rem)] min-[2000px]:text-[5rem] font-black text-[#1a2a5e] font-anton mx-auto mb-8 min-[2000px]:mb-12 text-center sm:text-left relative z-10">
              Technical Properties
            </h3>
            <ul className="space-y-4 min-[2000px]:space-y-8 text-gray-700 text-lg md:text-2xl min-[2000px]:text-3xl leading-relaxed font-medium list-disc pl-5">

              <li>
                <strong>Net Sectional Area of Strand:</strong> 100 mm²
              </li>

              <li>
                <strong>Yield Load:</strong> Not less than 180 kN
              </li>

              <li>
                <strong>Ultimate Strength:</strong> Not less than 1860 N/mm²
              </li>

              <li>
                <strong>Minimum Breaking Load:</strong> Not less than 186 kN
              </li>

              <li>
                <strong>Modulus of Elasticity:</strong> At least 195,000 N/mm²
              </li>

              <li>
                <strong>Minimum Elongation:</strong> 3.5% for a gauge length of 600 mm
              </li>

              <li>
                <strong>Relaxation at 1000 Hours:</strong> Less than 2.5% at 70% Minimum Ultimate Tensile Strength
              </li>

              <li>
                <strong>Weight of PE Coated Strand:</strong> 0.887 kg/m
              </li>

            </ul>

          </div>

          {/* RIGHT IMAGE (TOP-ALIGNED, NO CROP) */}
          <div className="lg:w-1/2 flex justify-center lg:justify-end self-center mb-10 lg:mb-0">
            <img
              src="/assets/unbonded-mono.png"
              alt="Bonded Ducts"
              className="max-w-[90%] h-auto object-contain rounded-lg shadow-xl scale-x-[-1]"
            />
          </div>

        </div>

        <div className="max-w-7xl min-[2000px]:max-w-[2000px] mx-auto px-6 my-20 min-[2000px]:my-32 max-[800px]:px-2">

          {/* ===== TITLE STRIP ===== */}
          <div className="bg-[#2d3476] text-white text-center py-4 px-6 min-[2000px]:py-10">
            <h2 className="text-2xl md:text-5xl min-[2000px]:text-7xl font-extrabold tracking-wide">
              Grease Coating (Corrosion Protection Layer)
            </h2>
          </div>

          {/* ===== DESCRIPTION ===== */}
          <div className="mt-8 text-justify space-y-6 min-[2000px]:space-y-12 text-lg md:text-2xl min-[2000px]:text-4xl text-gray-900 leading-relaxed font-medium indent-4 md:indent-12">
            <p>
              The prestressing strand is coated with a specially formulated corrosion-inhibiting grease
              that fully occupies the annular space between the steel strand and the plastic sheathing.
            </p>

            <p>
              This grease acts as the primary corrosion protection mechanism and enables smooth, controlled
              tendon movement during stressing and long-term service.
            </p>
          </div>

          {/* ===== SPECIFICATION BOX ===== */}
          <div className="mt-10 min-[2000px]:mt-20 p-0 md:p-8 min-[2000px]:p-16">
            <ul className="space-y-4 text-justify min-[2000px]:space-y-8 text-gray-700 text-lg md:text-2xl min-[2000px]:text-3xl leading-relaxed font-medium list-disc pl-5">

              <li>
                Grease coating shall provide protection against corrosion to the prestressing steel.
              </li>

              <li>
                It shall provide lubrication between the prestressing steel & sheathing.
              </li>

              <li>
                It should resist flow within anticipated temperature range of exposure.
              </li>

              <li>
                It should provide continuous non-brittle coating at lowest anticipated temperature of exposure.
              </li>

              <li>
                It should be chemically stable and non-reactive with prestressing steel, reinforcing steel, sheathing material and concrete.
              </li>

              <li>
                It shall possess appropriate moisture displacing and corrosion inhibiting properties.
              </li>

              <li>
                <strong>Minimum weight of the grease coating</strong> on the prestressing strand shall not be less than <strong>1.14 kg per 30.5 m</strong> for <strong>12.9 mm diameter PT cable</strong>.
              </li>

              <li>
                The coating material shall completely fill the annular space between the strand and sheathing & shall extend over the entire length of the PT cable.
              </li>

            </ul>
          </div>
        </div>

        <div className="max-w-7xl min-[2000px]:max-w-[2000px] mx-auto px-6 my-20 min-[2000px]:my-32 max-[800px]:px-2">

          {/* ===== TITLE STRIP ===== */}
          <div className="bg-[#2d3476] text-white text-center py-4 px-6 min-[2000px]:py-10">
            <h2 className="text-2xl md:text-5xl min-[2000px]:text-7xl font-extrabold tracking-wide">
              Sheathing (External Plastic Jacket)
            </h2>
          </div>

          {/* ===== DESCRIPTION ===== */}
          <div className="mt-8 text-justify space-y-6 min-[2000px]:space-y-12 text-lg md:text-2xl min-[2000px]:text-4xl text-gray-900 leading-relaxed font-medium indent-4 md:indent-12">
            <p>
              The strand and grease are enclosed within a seamless, high-density plastic sheathing that fully isolates the tendon from the surrounding concrete.
            </p>

            <p>
              This sheathing prevents grease loss, blocks cement paste intrusion, and ensures durability under aggressive site and environmental conditions.
            </p>
          </div>


          {/* ================= TECHNICAL PROPERTIES ================= */}
          <h3 className="text-[clamp(1.6rem,_4vw,_3rem)] min-[2000px]:text-[5rem] font-black text-[#1a2a5e] font-anton mx-auto mt-14 min-[2000px]:mt-24 text-center md:text-left md:pl-12 relative z-10">
            Technical Properties
          </h3>

          {/* ===== SPECIFICATION BOX ===== */}
          <div className="mt-10 md:mt-0 min-[2000px]:mt-20 p-0 md:p-8 md:pt-8 min-[2000px]:p-16">
            <ul className="space-y-4 text-justify min-[2000px]:space-y-8 text-gray-700 text-lg md:text-2xl min-[2000px]:text-3xl leading-relaxed font-medium list-disc pl-5">

              <li>
                <strong>Sheathing Material:</strong> Polypropylene
              </li>

              <li>
                <strong>Minimum Density:</strong> 0.941 grams/cm³
              </li>

              <li>
                <strong>Thickness:</strong> More than 1.25 mm
              </li>

              <li>
                <strong>Appearance:</strong> Sheathing shall provide a smooth circular outside surface and shall not visibly reveal lay of the strand.
              </li>

              <li>
                <strong>Coverage:</strong> Sheathing shall be continuous over the entire length to be unbonded and shall prevent intrusion of cement paste or loss of grease.
              </li>

            </ul>
          </div>


        </div>

      </section>

      {/* Unbonded Wedges Section */}
      <section
        id="unbonded-wedges"
        className={`relative px-10 lg:px-16 py-16 lg:py-12 min-h-[60vh] overflow-hidden min-[2000px]:py-32 ${isSectionVisible('unbonded-wedges') ? 'block' : 'hidden'
          }`}
      >
        {/* ================= HEADING ================= */}
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] min-[2000px]:text-[8rem] font-black text-[#1a2a5e] font-anton mx-auto mb-8 min-[2000px]:mb-24 text-center relative z-10">
          WEDGES
        </h2>

        {/* ================= INTRO TEXT ================= */}
        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto mb-14 min-[2000px]:mb-20">
          <p className="text-lg text-justify md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            Wedges are precision-engineered mechanical components that grip the prestressing strand and transfer stressing force into the anchor plate.
          </p>

          <p className="text-lg text-justify md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            Their hardness profile, metallurgy, and dimensional control are critical to achieving consistent anchorage performance under high prestressing loads and repeated stress cycles.
          </p>

        </div>

        {/* ================= TECHNICAL PROPERTIES ================= */}
        {/* ================= CONTENT + IMAGE ================= */}
        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto flex flex-col-reverse lg:flex-row items-center">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0 md:p-8">
            <h3 className="text-[clamp(1.6rem,_4vw,_3rem)] min-[2000px]:text-[5rem] font-black text-[#1a2a5e] font-anton mx-auto mb-8 min-[2000px]:mb-12 text-center md:text-left md:pl-12 relative z-10">
              Hardness Requirements
            </h3>
            <ul className="space-y-4 text-justify min-[2000px]:space-y-8 list-disc pl-6 text-gray-900 font-medium">

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                <strong>At Surface:</strong> 50 – 65 HRC
              </li>

              {/* <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                Provides sufficient toughness to prevent cracking under load
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                <strong>Surface Hardness:</strong> 50 – 65 HRC
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                Ensures reliable gripping action on the strand wires
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                This controlled hardness gradient allows strong strand locking
                without inducing brittle failure
              </li> */}

            </ul>

            <h3 className="text-[clamp(1.6rem,_4vw,_3rem)] min-[2000px]:text-[5rem] font-black text-[#1a2a5e] font-anton mx-auto mt-14 min-[2000px]:mt-24 mb-8 min-[2000px]:mb-12 text-center md:text-left md:pl-12 relative z-10">
              Material Grades
            </h3>

            <ul className="space-y-4 text-justify min-[2000px]:space-y-8 list-disc pl-6 text-gray-900 font-medium">

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                {/* <strong>Material Grades:</strong>*/} IS: 9175 (Part 20)–1986 Grade 20MnCr5 or 20CrMnTiH or EN1A or 12L14
              </li>
              {/* 
              <li className="text-lg md:text-2xl min-[2000px]:text-3xl pl-6 list-none">
                <ul className="list-disc pl-6 space-y-2 min-[2000px]:space-y-4 list-none">
                  <li>✔12L14</li>
                  <li>✔EN1A</li>
                  <li>✔20CrMnTiH</li>
                  <li>✔IS 9175 (Part 20) – 1986, Grade 20MnCr5</li>
                </ul>
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                After heat treatment, these alloys provide a wear-resistant surface
                combined with a tough, load-tolerant core
              </li> */}

            </ul>




          </div>


          {/* RIGHT IMAGE (TOP-ALIGNED, NO CROP) */}
          <div className="lg:w-1/2 flex justify-center lg:justify-center self-center mb-10 lg:mb-0">
            <img
              src="/assets/unbonded-wedges.png"
              alt="Bonded Ducts"
              className="max-w-[60%] h-auto object-contain rounded-lg shadow-xl"
            />
          </div>



        </div>

      </section>

      {/* Unbonded Anchor Plate Section */}
      <section
        id="unbonded-anchor-plate"
        className={`relative py-16 lg:py-12 min-[2000px]:py-32 min-h-[60vh] overflow-hidden ${isSectionVisible('unbonded-anchor-plate') ? 'block' : 'hidden'
          }`}
      >
        {/* ================= HEADING ================= */}
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] min-[2000px]:text-[8rem] font-black text-[#1a2a5e] font-anton mx-auto mb-8 min-[2000px]:mb-24 text-center relative z-10">
          ANCHOR PLATE
        </h2>

        {/* ================= INTRO TEXT ================= */}
        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto mb-14 min-[2000px]:mb-20">
          <p className="text-lg text-justify md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            <strong>Material Grade:</strong> ASTM A536 Grade 80-55-06 or IS 1865 Grade SG 500/7 or 550/6
          </p>

          <p className="text-lg text-justify md:text-2xl min-[2000px]:text-4xl leading-relaxed text-gray-700 font-medium text-justify mb-4 indent-4 md:indent-12">
            Casting shall be non-porous and free of sand, blow holes, voids, and other defects.
          </p>
        </div>

        {/* ================= TECHNICAL PROPERTIES ================= */}
        {/* ================= CONTENT + IMAGE ================= */}
        <div className="relative z-10 max-w-7xl min-[2000px]:max-w-[1800px] mx-auto flex flex-col-reverse lg:flex-row items-center">

          {/* LEFT CONTENT */}
          <div className="lg:w-1/2 lg:pr-16 mb-12 lg:mb-0 mt-14">
            <h3 className="text-[clamp(1.6rem,_4vw,_3rem)] min-[2000px]:text-[5rem] font-black text-[#1a2a5e] font-anton mx-auto mb-8 text-center sm:text-left relative z-10">
              MICROSTRUCTURE
            </h3>
            <ul className="space-y-4 text-justify min-[2000px]:space-y-8 list-disc pl-6 text-gray-900 font-medium">

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                <strong>Graphite Type (AS PER ASTM A247 PLATE I & II)</strong>
                <br />I. Form I & II (Spheroid or Nodular type)
                <br />II. Distribution A (Uniform Distribution)
                <br />III. Size: 6–8
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                <strong>OR</strong>
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                <strong>Graphite Type (ISO/R 945)</strong>
                <br />I. Form VI (Spheroid or Nodular type)
                <br />II. Distribution A (Uniform Distribution)
                <br />III. Size: 6–8
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                Nodularity: 90–95%
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                Carbide: Less than 3%
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                Pearlite: 35–40%
              </li>

              <li className="text-lg md:text-2xl min-[2000px]:text-3xl">
                Hardness Number Range (BHN): 170–260
              </li>

            </ul>
          </div>


          {/* RIGHT IMAGE (TOP-ALIGNED, NO CROP) */}
          {/* ================= IMAGES WRAPPER ================= */}
          <div className="relative z-10 max-w-7xl mx-auto mt-16 mb-10 lg:mb-0">
            <div className="flex flex-col md:flex-row items-center justify-center gap-10 mb-10">

              {/* IMAGE 1 */}
              <div className="flex flex-col items-center text-center">
                <img
                  src="/assets/unbonded-anchor-plate.jpeg"
                  alt="Standard Anchor Plate"
                  className="w-full md:w-[85%] max-w-[420px] h-auto object-contain rounded-lg shadow-xl mb-4 md:mb-4"
                />
                <p className="px-4 py-2 text-lg md:text-xl bg-gray-300 font-bold text-[#1a2a5e] tracking-wide">
                  Standard Anchor Plate
                </p>
              </div>

              {/* IMAGE 2 */}
              <div className="flex flex-col items-center text-center mt-10 md:mt-0">
                <img
                  src="/assets/unbonded-anchor-plate-2.jpeg"
                  alt="Encapsulated Anchor Plate"
                  className="w-full md:w-[85%] max-w-[420px] h-auto object-contain rounded-lg shadow-xl mb-4"
                />
                <p className="px-4 py-2 text-lg md:text-xl bg-gray-300 font-bold text-[#1a2a5e] tracking-wide">
                  Encapsulated Anchor Plate
                </p>
              </div>

            </div>
          </div>


        </div>



      </section>



      <style>{`
        @keyframes tickerScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .materials-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        @media (max-width: 768px) {
          .materials-page section {
            padding: 40px 20px !important;
          }
          
          .materials-page h1 {
            font-size: 2.5rem !important;
            padding-top: 40px !important;
          }
          
          .materials-page .sub-navigation {
            padding: 10px 15px !important;
            gap: 10px !important;
          }
          
          .materials-page .sub-navigation button {
            font-size: 1rem !important;
            padding: 3px 8px !important;
          }
          
          .materials-page .sub-navigation span {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}