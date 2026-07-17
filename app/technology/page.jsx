"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import ImageGrid from './imagegrid';


const geometryFilters = [
  'FLAT PLATE',
  'FLAT SLAB WITH DROP PANELS (DROP CAP)',
  'PT BEAM WITH PT SLAB',
  'PT BEAM WITH RCC SLAB'
];

const geometryImages = {
  'FLAT PLATE': [],
  'FLAT SLAB WITH DROP PANELS (DROP CAP)': [],
  'PT BEAM WITH PT SLAB': [],
  'PT BEAM WITH RCC SLAB': [],
};

const geometryContent = {
  'FLAT PLATE': {
    image: '/assets/structural-geometry/Flat-plate.png',
    description: 'A flat plate is a reinforced concrete slab directly supported by columns without beams. It provides a clean structural layout and allows flexible architectural planning & MEP services.',
    appearance: [
      'Slab rests directly on columns',
      'Ceiling surface appears flat and smooth',
      'No beams are visible',
      'More clear heights'
    ],
    usage: 'Associat Podiums, Offices, Hotels, Parking structures'
  },
  'FLAT SLAB WITH DROP PANELS (DROP CAP)': {
    image: '/assets/structural-geometry/flat_slab_with_drop_cap.png',
    description: 'A flat slab with drop panels includes thickened slab portions around column heads to increase shear strength and improve load distribution. It provides a clean structural layout and allows flexible architectural planning & MEP services.',
    appearance: [
      'Slab is mostly flat across the floor',
      'Thickened slab areas are provided around columns',
      'Square or rectangular drop panels are visible near columns'
    ],
    usage: 'Commercial buildings, malls, offices, and structures with higher load requirements'
  },
  'PT BEAM WITH PT SLAB': {
    image: '/assets/structural-geometry/pt_beam_with_pt_slab.png',
    description: 'This system uses post-tensioning in both beams and slabs to improve structural efficiency, control cracking, and allow longer spans & high loading.',
    appearance: [
      'Beams and slabs form a structural grid system',
      'PT slab is supported by post-tensioned beams',
      'Beam lines are visible in the ceiling structure'
    ],
    usage: 'Industrial buildings, hospitals, schools, large span and high loading caring floors.'
  },
  'PT BEAM WITH RCC SLAB': {
    image: '/assets/structural-geometry/pt_beam_with_rcc_slab.png',
    description: 'In this system, post-tensioned beams support the conventional RCC slab, combining span efficiency with standard slab construction.',
    appearance: [
      'Post-tensioned beams act as the main structural members',
      'RCC slab is supported to the beams',
      'Beam grid pattern is visible in the structure'
    ],
    usage: 'Function halls, showrooms, Bunglows and mixed structural systems.'
  }
};

const Technology = () => {
  const [activeSection, setActiveSection] = useState('intro');
  const [currentHash, setCurrentHash] = useState('');
  const [activeBondedAccordion, setActiveBondedAccordion] = useState(1);
  const [activeUnbondedAccordion, setActiveUnbondedAccordion] = useState(1);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [unbondedOpen, setUnbondedOpen] = useState(false);
  const [unbondedCurrentIndex, setUnbondedCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedGeometry, setSelectedGeometry] = useState('FLAT PLATE');
  const [geometryOpen, setGeometryOpen] = useState(false);
  const [geometryCurrentIndex, setGeometryCurrentIndex] = useState(0);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setIsClient(true);
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') || 'post-tensioning-systems';

      setCurrentHash(hash);
      setActiveSection(hash);

      setTimeout(() => {
        const el = document.getElementById(hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };

    // initial load
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);


  const scrollToSection = (id) => {
    window.location.hash = id;
    setActiveSection(id);

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bondedGalleryImages = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    imgSrc: `/assets/Photos/PROJECT VISUALS OF BONDED PT SYSTEM/${i + 1}.png`,
    title: `Bonded PT System Image ${i + 1}`
  }));

  const unbondedGalleryImages = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    imgSrc: `/assets/Photos/PROJECT VISUALS OF UNBONDED PT SYSTEM/${i + 1}.png`,
    title: `Unbonded PT System Image ${i + 1}`
  }));

  const isSectionVisible = (id) => {
    if (!currentHash) return true;
    return currentHash === id;
  };

  const bondedInstallationSteps = [
    {
      id: 1,
      title: "MATERIAL CUTTING & DISPATCH",
      description: [
        "All PT materials—including strands, ducts, anchorages, wedges, and accessories—are inspected, measured, and cut according to approved shop drawings.",
        "Each component is labeled, bundled, and dispatched to site with proper identification to avoid installation errors and ensure smooth workflow at the slab level."
      ],
      imgSrc: "/assets/bonded-methodology/Material_Dispatch.png",
    },
    {
      id: 2,
      title: "SHUTTERING & BOTTOM BAR BINDING",
      description: [
        "Formwork preparation and reinforcement binding are completed as per the structural drawings.",
        "The anchorage zone reinforcement, bottom steel, and cover blocks are checked to ensure they meet PT requirements for bursting, spalling, and bearing stresses.",
        "A final pre-PT inspection ensures that the slab is ready for tendon installation."
      ],
      imgSrc: "/assets/bonded-methodology/Shuttering_Bar_binding.png",
    },
    {
      id: 3,
      title: "INSTALLATION OF PT CABLES",
      description: [
        "Once the formwork and bottom reinforcement are finalized, PT ducts and anchorages are positioned according to the tendon profile.",
        "All ducts are securely supported on chairs, tied to reinforcement, and aligned to maintain the designed curvature and geometry."
      ],
      imgSrc: "/assets/bonded-methodology/Installation.png",
    },
    {
      id: 4,
      title: "TOP STEEL PLACEMENT",
      description: [
        "High-tensile steel strands are carefully pushed or pulled through the installed ducts. We ensure that tendons are not twisted or damaged during this critical phase.",
        "Shear reinforcement, trimming bars, temperature steel, and anchorage confinement reinforcement are placed to ensure proper load distribution and structural safety."
      ],
      imgSrc: "/assets/bonded-methodology/Top_Steel.png",
    },
    {
      id: 5,
      title: "CONCRETING POURING",
      description: [
        "Concrete is poured carefully to avoid displacement or deformation of ducts and anchorages.",
        "Vibrators are used with controlled intensity to eliminate voids without damaging ducts.",
        "Post-concreting checks confirm that the tendon profile is intact and the anchorage areas are properly compacted."
      ],
      imgSrc: "/assets/bonded-methodology/Concreting_process.png",
    },
    {
      id: 6,
      title: "STRESSING ACTIVITY",
      description: [
        "Stressing is carried out after the concrete reaches the specified minimum strength (usually 25 MPa).",
        "A calibrated stressing jack applies the required load as per the stressing chart.",
        "The elongations are measured, matched with theoretical values, and recorded for quality verification.",
        "Any deviations beyond permissible limits are investigated and corrected immediately."
      ],
      imgSrc: "/assets/bonded-methodology/Stressing_activity.png",
    },
    {
      id: 7,
      title: "CUTTING OF GRIPPING LENGTH",
      description: [
        "Once stressing is completed and verified, the protruding strand length beyond the anchor head is cut using an approved cutting method.",
        "The cut length is documented to maintain stressing records and ensure proper sealing before grouting."
      ],
      imgSrc: "/assets/bonded-methodology/cutting_of_gripping_length.png",
    },
    {
      id: 8,
      title: "GROUTING IN DUCTS",
      description: [
        "Cementitious grout is injected under pressure through the ducts to fully encapsulate the strands and eliminate air gaps.",
        "Proper grouting forms a permanent bond between steel and concrete, ensuring durability, corrosion protection, and long-term structural performance."
      ],
      imgSrc: "/assets/bonded-methodology/Grouting.png",
    },
  ];

  const unbondedInstallationSteps = [
    {
      id: 1,
      title: "MATERIAL CUTTING & DISPATCH",
      description: [
        "All monostrand tendons, anchor assemblies, wedges, plates and accessories are inspected against shop drawings and delivery documents.",
        "Strands (factory-greased and sheathed) are measured, cut to specified lengths, labelled and dispatched to site with clear identification to prevent mix-ups. Ensure grease quantity and sheathing integrity are checked before shipping."
      ],
      imgSrc: "/assets/unbonded-methodology/Material_cutting_Dispatch.png",
    },
    {
      id: 2,
      title: "SHUTTERING & BOTTOM BAR BINDING",
      description: [
        "Formwork is set and reinforced as per drawings. Bottom reinforcement, anchorage confinement cages and bursting bars are placed and tied.",
        "Verify anchorage reinforcement and plate positions to resist bearing and splitting stresses from the unbonded anchor block.",],
      imgSrc: "/assets/unbonded-methodology/Shuttering_Bar_binding.png",
    },
    {
      id: 3,
      title: "INSTALLATION OF PT CABLES",
      description: [
        "After placing of bottom steel, PT cables are profiled on chair support and fixed at both ends.",
      ],
      imgSrc: "/assets/unbonded-methodology/Installation.png",
    },
    {
      id: 4,
      title: "TOP STEEL PLACEMENT",
      description: [
        "Place and tie top reinforcement, ensuring tendon geometry remains intact.",
        "Avoid movement of tendons during bar placement; use temporary restraining ties if necessary to hold tendons on chairs and preserve eccentricity."
      ],
      imgSrc: "/assets/unbonded-methodology/Top_Steel.png",
    },
    {
      id: 5,
      title: "CONCRETING POURING",
      description: [
        "Cast concrete with controlled placement and vibration. Take precautions to prevent sheathing abrasion or damage during consolidation.",
        "Confirm tendon positions after concreting (pre-pour checks) and protect exposed anchorage zones as required."
      ],
      imgSrc: "/assets/unbonded-methodology/Concreting_process.png",
    },
    {
      id: 6,
      title: "STRESSING ACTIVITY",
      description: [
        "Stress tendons when concrete reaches the specified strength (as per design/cube tests).",
        "Use calibrated hydraulic jacks to tension each monostrand to the specified force. Record elongations and jack pressure, check against theoretical values and lock off the anchor wedges per manufacturer procedure."
      ],
      imgSrc: "/assets/unbonded-methodology/Stressing.png",
    },
    {
      id: 7,
      title: "CUTTING OF GRIPPING LENGTH",
      description: [
        "After stressing and verification, cut excess strand at anchorage to the required gripping length.",
        "Fit protective caps, plates, or grout pockets around exposed anchors (as per project specification) to protect against mechanical damage and ingress. Do not grout the tendon (unbonded system). Seal anchor heads and provide corrosion-resistant protection for exposed zones."
      ],
      imgSrc: "/assets/unbonded-methodology/cutting.png",
    }
  ];




  // Navigation items
  const navItems = [
    // { id: 'overview', label: 'OVERVIEW' },
    // { id: 'prestressed-systems', label: 'PRESTRESSED SYSTEMS' },
    { id: 'post-tensioning-systems', label: 'POST-TENSIONING SYSTEMS' },
    { id: 'unbonded-tensioning-systems', label: 'UNBONDED-PTS' },
    { id: 'bonded-tensioning-systems', label: 'BONDED-PTS' },
    { id: 'structural-geometry', label: 'STRUCTURAL GEOMETRY' },
  ];

  // Get video source based on current hash
  const getVideoSrc = () => {
    switch (currentHash) {
      // case 'overview': return "/assets/Overview-bg-video.mp4";
      // case 'prestressed-systems': return "/assets/PRESTRESSED-SYSTEMS.mp4";
      case 'post-tensioning-systems': return "/assets/post-tensioning-bg.mp4";
      case 'unbonded-tensioning-systems': return "/assets/unbonded-1.mp4";
      case 'bonded-tensioning-systems': return "/assets/bonded-1-video.mp4";
      case 'structural-geometry': return "/assets/Structural-Geometry-bg-video.mp4";
      default: return "/assets/post-tensioning-bg.mp4";
    }
  };

  // Get heading text based on current hash
  const getHeadingText = () => {
    switch (currentHash) {
      // case 'overview': return 'OVERVIEW';
      // case 'prestressed-systems': return 'PRESTRESSED SYSTEMS';
      case 'post-tensioning-systems': return 'POST-TENSIONING SYSTEMS';
      case 'unbonded-tensioning-systems': return 'UNBONDED POST-TENSIONING SYSTEMS';
      case 'bonded-tensioning-systems': return 'BONDED POST-TENSIONING SYSTEMS';
      case 'structural-geometry': return 'STRUCTURAL GEOMETRY';
      default: return 'POST-TENSIONING SYSTEMS';
    }
  };

  // Ticker items
  const tickerItems = [
    "★ Quality Matters Over Quantity ★",
    "★ Post-Tensioning Company You Can Trust ★",
    "★ Delivering Structural Efficiency Every Time ★"
  ];

  return (
    <div className="overflow-x-hidden w-full">

      {/* Hero Section */}
      <section className="relative min-h-[50vh] max-h-[50vh] flex flex-col justify-center items-center overflow-hidden min-[2500px]:min-h-[60vh] min-[2500px]:max-h-[60vh]">
        {/* Background Video */}
        <video
          key={getVideoSrc()}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={getVideoSrc()} type="video/mp4" />
        </video>

        {/* Overlay Layer */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,149,170,0.6)] z-[0.5]"></div>

        {/* Main Heading */}
        <h1 className="text-white text-center m-auto z-10 relative text-shadow-lg tracking-wider font-anton font-normal pt-16 text-[clamp(3rem,8vw,6rem)] font-black min-[2500px]:pt-0 min-[2500px]:absolute min-[2500px]:top-1/2 min-[2500px]:left-1/2 min-[2500px]:-translate-x-1/2 min-[2500px]:-translate-y-1/2 min-[1024px]:max-[1324px]:max-w-[80vw] min-[1024px]:max-[1324px]:truncate">
          {getHeadingText()}
        </h1>

        {/* Sub-Navigation */}
        <div className="hidden lg:flex mt-auto mb-0 z-10 relative bg-white/95 rounded-t-2xl px-8 py-4 gap-5 flex-wrap justify-center items-center">          {navItems.map((item, index) => (
          <div key={item.id} className="flex items-center">
            <button
              onClick={() => scrollToSection(item.id)}
              className={`bg-transparent border-none ${activeSection === item.id ? 'text-[#0095AA] font-bold' : 'text-black font-semibold'} text-lg cursor-pointer px-2.5 py-1.5 font-sans transition-all duration-300 hover:text-[#0095AA]`}
            >
              {item.label}
            </button>
            {index < navItems.length - 1 && (
              <span className="text-[#0095AA] text-lg mx-1">-</span>
            )}
          </div>
        ))}
        </div>
      </section>

      {/* News Ticker */}
      <div className="relative w-full bg-[#0095AA] overflow-hidden z-10">
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-[tickerScroll_25s_linear_infinite] whitespace-nowrap">
            {[
              '★ Quality Matters, Over Quantity ★',
              '★ Post-tensioning Company You Can Trust ★',
              '★ Delivering Structural Efficiency Every Time ★'
            ].map((text, index) => (
              <span key={index} className="inline-flex items-center px-[60px] py-[18px] text-2xl font-semibold text-white tracking-[0.5px]">
                {text}
              </span>
            ))}
            {[
              '★ Quality Matters, Over Quantity ★',
              '★ Post-tensioning Company You Can Trust ★',
              '★ Delivering Structural Efficiency Every Time ★'
            ].map((text, index) => (
              <span key={index + 3} className="inline-flex items-center px-[60px] py-[18px] text-2xl font-semibold text-white tracking-[0.5px]">
                {text}
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
        .text-shadow-lg {
          text-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }
      `}</style>

      {/* Overview Section */}
      {/* <section
        id="overview"
        className={`relative px-10 lg:px-16 py-16 lg:py-24 min-h-[60vh] overflow-hidden ${isSectionVisible('overview') ? 'block' : 'hidden'
          }`}
      >

        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-16 text-center relative z-10">
          OVERVIEW
        </h2>

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-16 order-2 lg:order-1 indent-8">
            <p className="text-lg leading-relaxed text-gray-700 font-medium text-justify tracking-tight mb-4">
              Unified Post-Tensioning Systems LLP is a specialised engineering firm delivering bonded and unbonded post-tensioning solutions for modern construction across India.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-medium text-justify tracking-tight mb-4">
              We operate with a disciplined, process-driven approach that integrates design, detailing, material control, and site execution into a single, accountable system. Our focus is on engineering clarity, execution accuracy, and long-term structural performance not shortcuts or site-level improvisation.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-medium text-justify tracking-tight mb-4">
              Unified is built on dependability, consistency, and cost efficiency. Our systems enable longer spans, optimised slab behaviour, reduced structural weight, and predictable construction outcomes without compromising safety or quality.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-medium text-justify tracking-tight">
              We do not treat post-tensioning as a routine site activity. We treat it as a critical structural system that demands planning, traceability, and technical accountability at every stage of the project lifecycle.
            </p>
          </div>

          <div className="lg:w-1/2 order-1 lg:order-2 mb-10 lg:mb-0">
            <img
              src="/assets/overview-img.jpeg"
              alt="Overview"
              className="w-full h-[300px] lg:h-[520px] object-cover block rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section> */}

      {/* Prestressed Systems Section */}
      {/* <section
        id="prestressed-systems"
        className={`relative px-10 lg:px-16 py-16 lg:py-24 min-h-[60vh] overflow-hidden ${isSectionVisible('prestressed-systems') ? 'block' : 'hidden'
          }`}
      >
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-16 text-center relative z-10">
          OUR CORE EXPERTISE
        </h2> */}

      {/* SVG Diagram */}
      {/* <div className="max-w-6xl mx-auto mb-16">
          <img
            src="/assets/prestressing.png"
            alt="Prestressing Systems Diagram"
            className="w-full h-auto"
            data-cursor="default"
          />
        </div> */}

      {/* PRESTRESSING Section Header */}
      {/* <div className="flex items-center justify-center gap-5 my-16">
          <span className="flex-1 h-1 bg-[#2b387a]"></span>
          <span className="text-4xl lg:text-6xl font-extrabold tracking-wider text-[#2b387a] uppercase whitespace-nowrap">
            PRESTRESSING
          </span>
          <span className="flex-1 h-1 bg-[#2b387a]"></span>
        </div> */}

      {/* PRESTRESSING Content */}
      {/* <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start">
          <div className="lg:w-1/2 flex justify-center lg:justify-start">
            <img
              src="/assets/prestressing-diagram.jpeg"
              alt="Prestressing Diagram"
              className="w-auto h-[500px] max-w-full rounded-lg shadow-xl"
            />
          </div>

          <div className="lg:w-1/2 lg:pl-10 mt-10 lg:mt-0 indent-8">
            <p className="text-lg leading-relaxed text-gray-700 font-semibold text-justify mb-5">
              Prestressing is a structural technique in which internal compressive
              forces are intentionally introduced into concrete before it is subjected
              to service loads. This is achieved by tensioning high-strength steel
              tendons placed within or adjacent to the concrete, thereby counteracting
              tensile stresses that would otherwise lead to cracking.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-semibold text-justify mb-5">
              Tendons may consist of single wires, multi-wire strands, or threaded bars
              manufactured from high-tensile steel or advanced composite materials.
              Once prestress is applied, the concrete–steel system behaves as a
              composite structural element, combining the compressive strength of
              concrete with the tensile capacity of steel.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-semibold text-justify">
              Prestressed concrete enables longer spans, reduced structural depth,
              improved crack control, and material efficiency, making it a preferred
              system for performance-driven structures.
            </p>
          </div>
        </div>
      </section> */}

      {/* Overview Section */}
      <section
        id="post-tensioning-systems"
        className={`relative px-10 lg:px-16 py-16 lg:py-24 min-h-[60vh] overflow-hidden max-[800px]:px-2 ${isSectionVisible('post-tensioning-systems') ? 'block' : 'hidden'
          }`}
      >

        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-16 text-center relative z-10 min-[2500px]:text-[8rem] min-[2500px]:mb-32">
          POST TENSIONING SYSTEMS
        </h2>

        {/* Added PTS image */}
        <div className="max-w-6xl mx-auto mb-16 px-4 relative z-10 min-[2500px]:max-w-[2000px] min-[2500px]:mb-32">
          <img
            src="/assets/prestressing-2.png"
            alt="Post Tensioning Systems"
            className="w-full h-auto cursor-default"
            data-cursor="default"
          />
        </div>

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 min-[2500px]:max-w-[1800px]">
          <div className="w-full indent-8">
            <p className="text-lg leading-relaxed text-gray-700 font-medium text-justify mb-4 min-[2500px]:text-4xl min-[2500px]:mb-12">
              Post-tensioning concrete is a specialised form of prestressed concrete in which high-strength steel tendons are tensioned after the surrounding concrete has been cast and has attained the required strength. The objective is to introduce a controlled compressive force into the concrete, counteracting tensile stresses generated by dead and live loads during service.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-medium text-justify mb-4 min-[2500px]:text-4xl min-[2500px]:mb-12">
              In post-tensioning systems, the tendons are not placed in direct contact with the concrete during casting. Instead, they are housed within sheathing or ducts that allow controlled stressing and anchorage. Each tendon is anchored at its ends using mechanical anchorage assemblies designed to safely transfer prestressing forces into the concrete.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-medium text-justify mb-4 min-[2500px]:text-4xl min-[2500px]:mb-12">
              Once the concrete reaches the specified strength, the tendons are stressed using calibrated hydraulic jacks. After stressing, the tendons are locked off at the anchorages, resulting in a permanent compressive stress state within the structural element. This compression significantly improves behaviour of slab and beams by reducing tensile cracking, limiting deflections, and enhancing long-term durability.
            </p>

            <p className="text-lg leading-relaxed text-gray-700 font-medium text-justify min-[2500px]:text-4xl">
              Depending on the tendon encapsulation and bonding mechanism, post-tensioning systems are broadly classified into two principal types:
            </p>
          </div>
        </div>
        {/* TYPES OF POST-TENSIONING SYSTEMS */}

        <div className="max-w-9xl mx-auto px-4 md:px-6">
          {/* Inner Gradient Box */}
          <div className="relative animate-gradient rounded-3xl shadow-xl p-6 md:p-12 pt-6 md:pt-2 mt-10">
            <div className="relative z-10 w-full mt-8 md:mt-16 px-0 md:px-4">
              <div className="max-w-5xl mx-auto min-[2500px]:max-w-[1600px]">

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center text-[#1a2a5e] mb-8 md:mb-12 min-[2500px]:text-6xl min-[2500px]:mb-20">
                  TYPES OF POST-TENSIONING SYSTEMS
                </h2>

                {/* Cards Container */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-[2500px]:gap-16">

                  {/* Bonded System Card */}
                  <a
                    href="/technology#unbonded-tensioning-systems"
                    className="group relative bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#0095AA] min-[2500px]:p-16 min-[2500px]:rounded-3xl"
                  >
                    <div className="flex flex-col h-full">
                      {/* Number Badge */}
                      <div className="w-12 h-12 rounded-lg bg-[#0095AA] text-white flex items-center justify-center text-xl font-bold mb-4 min-[2500px]:w-24 min-[2500px]:h-24 min-[2500px]:text-4xl min-[2500px]:mb-8">
                        01
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-[#1a2a5e] mb-3 min-[2500px]:text-5xl min-[2500px]:mb-6">
                        Unbonded Post-Tensioning Systems
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-6 flex-grow text-sm md:text-base min-[2500px]:text-3xl min-[2500px]:mb-12">
                        Free-moving tendons with protective coating for faster installation in residential and commercial projects.

                      </p>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-[#0095AA] font-semibold text-sm md:text-base min-[2500px]:text-3xl">Explore System</span>
                        <div className="w-10 h-10 rounded-full bg-[#0095AA]/10 flex items-center justify-center group-hover:bg-[#0095AA] transition-colors duration-300 min-[2500px]:w-20 min-[2500px]:h-20">
                          <svg className="w-5 h-5 text-[#0095AA] group-hover:text-white transition-colors duration-300 min-[2500px]:w-10 min-[2500px]:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>

                  {/* Unbonded System Card */}
                  <a
                    href="/technology#bonded-tensioning-systems"
                    className="group relative bg-white rounded-xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#0095AA] min-[2500px]:p-16 min-[2500px]:rounded-3xl"
                  >
                    <div className="flex flex-col h-full">
                      {/* Number Badge */}
                      <div className="w-12 h-12 rounded-lg bg-[#0095AA] text-white flex items-center justify-center text-xl font-bold mb-4 min-[2500px]:w-24 min-[2500px]:h-24 min-[2500px]:text-4xl min-[2500px]:mb-8">
                        02
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-[#1a2a5e] mb-3 min-[2500px]:text-5xl min-[2500px]:mb-6">
                        Bonded Post-Tensioning Systems
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 mb-6 flex-grow text-sm md:text-base min-[2500px]:text-3xl min-[2500px]:mb-12">
                        Tendons permanently bonded through grouting for enhanced structural performance in heavy-load applications.
                      </p>

                      {/* CTA */}
                      <div className="flex items-center justify-between">
                        <span className="text-[#0095AA] font-semibold text-sm md:text-base min-[2500px]:text-3xl">Explore System</span>
                        <div className="w-10 h-10 rounded-full bg-[#0095AA]/10 flex items-center justify-center group-hover:bg-[#0095AA] transition-colors duration-300 min-[2500px]:w-20 min-[2500px]:h-20">
                          <svg className="w-5 h-5 text-[#0095AA] group-hover:text-white transition-colors duration-300 min-[2500px]:w-10 min-[2500px]:h-10" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* STRUCTURAL BEHAVIOUR & SYSTEM PERFORMANCE */}
        <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 px-4 min-[2500px]:max-w-[1800px] min-[2500px]:mt-24">

          {/* Heading – CENTER */}
          <h2 className="text-[#1aa0b5] text-xl md:text-2xl font-bold tracking-wide text-center mb-6 min-[2500px]:text-6xl min-[2500px]:mb-12">
            ADVANTAGES OF POST-TENSIONING SYSTEM
          </h2>

          {/* Description – slight left space */}
          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 text-justify pl-4 indent-8 min-[2500px]:text-4xl min-[2500px]:mb-12">
            Casting the tendon ducts or sheathing into the concrete prior to stressing allows tendons to be profiled to the desired geometry, including vertical and horizontal curvature. When stressed, this profiling generates beneficial reaction forces within the concrete, improving load balancing and structural efficiency.
          </p>

          <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6 pl-4 min-[2500px]:text-4xl min-[2500px]:mb-12">
            As a result, post-tensioning systems enable:
          </p>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 min-[2500px]:gap-12 min-[2500px]:mb-12">
            {[
              'Thinner sections of slab and beams',
              'Reduced self weight of structure',
              'Longer, column-free spans',
              'Improved crack and deflection control',
              'Faster and more predictable construction cycles',
              'Greater architectural and structural flexibility',
              'Enhanced long-term serviceability and durability',
              'Suitable for higher loadings'
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 border border-gray-200 rounded-lg px-5 py-3 text-gray-900 font-medium shadow-sm text-center min-[2500px]:text-3xl min-[2500px]:py-8 min-[2500px]:px-12"
              >
                {item}
              </div>
            ))}
          </div>


          {/* Footer note */}
          <p className="text-gray-700 text-justify italic text-sm md:text-base pl-4 min-[2500px]:text-2xl">
            And several other performance benefits depending on structural configuration, loading conditions, and system selection.
          </p>

        </div>

      </section>

      <section
        id="bonded-tensioning-systems"
        className={`relative px-10 lg:px-16 py-16 lg:py-24 min-h-[60vh] overflow-hidden max-[800px]:px-2 ${isSectionVisible('bonded-tensioning-systems') ? 'block' : 'hidden'
          }`}
      >

        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-16 text-center relative z-10 min-[2500px]:text-[8rem] min-[2500px]:mb-32">
          BONDED POST-TENSIONING SYSTEMS
        </h2>
        {/* BONDED POST-TENSIONING SYSTEM */}
        <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 px-4 min-[2500px]:max-w-[2000px] min-[2500px]:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] items-start min-[2500px]:grid-cols-[800px_1fr] min-[2500px]:gap-24">

            {/* LEFT – IMAGE */}
            <div>
              <img
                src="/assets/bonded-img.png"
                alt="Bonded Post-Tensioning System"
                className="w-full max-w-[400px] mx-auto h-[550px] rounded-lg shadow-md object-cover min-[2500px]:max-w-[800px] min-[2500px]:h-[900px] min-[2500px]:rounded-3xl"
              />
            </div>

            {/* RIGHT – CONTENT */}
            <div className="text-gray-700 text-base lg:text-lg leading-relaxed text-justify lg:text-justify space-y-5 self-center indent-12 mt-8 lg:mt-0 min-[2500px]:text-4xl min-[2500px]:space-y-12">

              <p>
                In bonded post-tensioning systems, high-strength steel tendons are permanently bonded to the surrounding concrete after stressing. This bond is achieved by pressure-grouting the ducts with cementitious grout, ensuring continuous load transfer along the entire tendon length.
              </p>

              {/* <p>
                Once grouted, the steel, grout, and concrete act together as a single composite structural system, providing enhanced stiffness, redundancy, and durability. The bonded nature of the tendon improves resistance to cracking, fatigue, and long-term deterioration.
              </p>

              <p>
                Bonded post-tensioning is particularly suited for structures where higher stiffness, robust load distribution, and long-term structural reliability are essential. The system is commonly adopted in podium slabs, transfer structures, bridges, and other elements subjected to heavy loading or stringent serviceability requirements.
              </p> */}

            </div>
          </div>
        </div>

        <h2 className="text-[clamp(2.5rem,4vw,2rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-16 mt-16 text-center relative z-10 min-[2500px]:text-[8rem] min-[2500px]:mb-32">
          COMPONENTS OF BONDED POST-TENSIONING SYSTEM
        </h2>

        {/* Added Bonded Installation image */}
        <div className="max-w-6xl mx-auto my-16 px-4 relative z-10 min-[2500px]:max-w-[2000px] min-[2500px]:my-32">
          <img
            src="/assets/Bonded-Installation.png"
            alt="Bonded Post-Tensioning System Installation"
            className="w-full h-auto cursor-default"
            data-cursor="default"
          />
        </div>

        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-16 text-center relative z-10 top-16 min-[2500px]:text-[6rem] min-[2500px]:mb-32">
          FIELD EXECUTION METHODOLOGY
        </h2>

        <div className="max-w-6xl mx-auto py-12 min-[2500px]:max-w-[2000px] min-[2500px]:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-[2500px]:gap-24">
            {/* Left side: Accordion titles */}
            <div className="space-y-4 min-[2500px]:space-y-12">
              {bondedInstallationSteps.map((step) => (
                <div key={step.id} className="border-b border-gray-200 last:border-b-0">
                  <button
                    className={`w-full flex justify-between items-center py-5 px-6 text-left focus:outline-none transition-colors duration-300 ${activeBondedAccordion === step.id ? 'bg-gray-100' : ''
                      } min-[2500px]:py-12 min-[2500px]:px-12`}
                    onClick={() => setActiveBondedAccordion(step.id)}
                  >
                    <span className={`text-xl md:text-2xl font-semibold ${activeBondedAccordion === step.id ? 'text-[#0095aa]' : 'text-gray-800'
                      } min-[2500px]:text-5xl`}>
                      {step.id.toString().padStart(2, '0')}. {step.title}
                    </span>
                    {activeBondedAccordion === step.id ? <Minus className="w-6 h-6 text-[#0095aa] min-[2500px]:w-12 min-[2500px]:h-12" /> : <Plus className="w-6 h-6 text-gray-500 min-[2500px]:w-12 min-[2500px]:h-12" />}
                  </button>

                  <AnimatePresence>
                    {activeBondedAccordion === step.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden lg:hidden bg-gray-50"
                      >
                        <div className="p-6">
                          <img
                            src={step.imgSrc}
                            alt={step.title}
                            className="w-full h-56 md:h-96 object-cover rounded-lg shadow-md mb-4"
                          />
                          <div className="text-gray-600 text-justify leading-relaxed text-sm">
                            {Array.isArray(step.description) ? step.description.map((p, i) => <p key={i} className="mb-2 text-justify">{p}</p>) : <p className="text-justify">{step.description}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right side: Image and Description */}
            <div className="relative h-[600px] mt-5 lg:mt-0 hidden lg:block min-[2500px]:h-[1000px]">
              <AnimatePresence mode="wait">
                {activeBondedAccordion && (
                  <motion.div
                    key={activeBondedAccordion}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <div className="h-full flex flex-col">
                      <img
                        src={bondedInstallationSteps.find(s => s.id === activeBondedAccordion).imgSrc}
                        alt={bondedInstallationSteps.find(s => s.id === activeBondedAccordion).title}
                        className="w-full h-1/2 object-cover rounded-lg shadow-xl min-[2500px]:rounded-3xl"
                      />
                      <div className="mt-6 text-gray-600 leading-relaxed indent-8 min-[2500px]:mt-12 min-[2500px]:text-4xl min-[2500px]:leading-snug">
                        {(() => {
                          const step = bondedInstallationSteps.find(s => s.id === activeBondedAccordion);
                          if (Array.isArray(step.description)) {
                            return step.description.map((paragraph, index) => (
                              <p key={index} className={`text-justify ${index > 0 ? "mt-4 min-[2500px]:mt-8" : ""}`}>{paragraph}</p>
                            ));
                          }
                          return <p className="text-justify">{step.description}</p>;
                        })()}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {!activeBondedAccordion && (
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg min-[2500px]:rounded-3xl">
                  <p className="text-gray-500 text-lg min-[2500px]:text-4xl">Select a step to see the details</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="max-w-9xl mx-auto px-4 md:px-6 min-[2500px]:max-w-[2200px]">
          {/* Inner Gradient Box */}
          <div className="relative animate-gradient rounded-3xl shadow-xl p-6 md:p-12 pt-8 md:pt-4 min-[2500px]:p-24 min-[2500px]:rounded-[4rem]">
            <h2 className="text-[clamp(2.2rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-8 md:mb-16 text-center relative z-10 top-0 md:top-16 min-[2500px]:text-[7rem] min-[2500px]:top-0 min-[2500px]:mb-32">
              KEY COMPONENTS USED
            </h2>

            <div className="relative z-10 max-w-6xl mx-auto px-2 md:px-4 mb-10 md:mb-18 mt-12 md:mt-32 min-[2500px]:max-w-[2000px] min-[2500px]:mt-0 min-[2500px]:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-[2500px]:gap-12">
                {/* Component 1 */}
                <Link href="/materials#bonded-prestressing-steel-strands" className="block group">
                  <div className="bg-white rounded-xl overflow-hidden transition-all hover:scale-105 min-[2500px]:rounded-3xl h-full" style={{ boxShadow: '0 10px 15px -3px rgba(27, 52, 55, 0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(26, 46, 49, 0.4)'}>
                    <div className="w-full h-50 bg-gradient-to-br from-[#0095aa]/20 to-[#0095aa]/5 flex items-center justify-center relative overflow-hidden min-[2500px]:h-96">
                      <img src="/assets/bonded-prestressing.png" alt="High-Strength Tendons" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 min-[2500px]:p-12">
                      <h3 className="text-lg font-bold text-[#1a2a5e] mb-3 min-[2500px]:text-4xl min-[2500px]:mb-6 uppercase">PRESTRESSING STEEL</h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-[2500px]:text-2xl min-[2500px]:line-clamp-4">
                        These strands are engineered to deliver high tensile capacity, minimal relaxation losses, and stable performance during stressing and throughout the service life of the structure.
                      </p>
                      <span className="text-[#0095aa] font-semibold text-sm group-hover:underline mt-3 inline-block min-[2500px]:text-2xl min-[2500px]:mt-6">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Component 2 */}
                <Link href="/materials#bonded-wedges" className="block group">
                  <div className="bg-white rounded-xl overflow-hidden transition-all hover:scale-105 min-[2500px]:rounded-3xl h-full" style={{ boxShadow: '0 10px 15px -3px rgba(27, 52, 55, 0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(26, 46, 49, 0.4)'}>
                    <div className="w-full h-50 bg-gradient-to-br from-[#0095aa]/20 to-[#0095aa]/5 flex items-center justify-center relative overflow-hidden min-[2500px]:h-96">
                      <img src="/assets/bonded-wedges.png" alt="Corrugated Ducts" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 min-[2500px]:p-12">
                      <h3 className="text-lg font-bold text-[#1a2a5e] mb-3 min-[2500px]:text-4xl min-[2500px]:mb-6 uppercase">WEDGES</h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-[2500px]:text-2xl min-[2500px]:line-clamp-4">
                        Wedges are precision-engineered mechanical components used within the anchorage system to grip and lock the prestressing strand securely.
                      </p>
                      <span className="text-[#0095aa] font-semibold text-sm group-hover:underline mt-3 inline-block min-[2500px]:text-2xl min-[2500px]:mt-6">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Component 3 */}
                <Link href="/materials#bonded-ducts" className="block group">
                  <div className="bg-white rounded-xl overflow-hidden transition-all hover:scale-105 min-[2500px]:rounded-3xl h-full" style={{ boxShadow: '0 10px 15px -3px rgba(27, 52, 55, 0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(26, 46, 49, 0.4)'}>
                    <div className="w-full h-56 bg-gradient-to-br from-[#0095aa]/20 to-[#0095aa]/5 flex items-center justify-center relative overflow-hidden min-[2500px]:h-96">
                      <img src="/assets/bonded-ducts-1.png" alt="Anchorages & Couplers" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 min-[2500px]:p-12">
                      <h3 className="text-lg font-bold text-[#1a2a5e] mb-3 min-[2500px]:text-4xl min-[2500px]:mb-6 uppercase">DUCTS</h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-[2500px]:text-2xl min-[2500px]:line-clamp-4">
                        Ducts form the protective pathway for prestressing strands in bonded post-tensioning systems.
                      </p>
                      <span className="text-[#0095aa] font-semibold text-sm group-hover:underline mt-3 inline-block min-[2500px]:text-2xl min-[2500px]:mt-6">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Component 4 */}
                <Link href="/materials#bonded-anchor-block" className="block group">
                  <div className="bg-white rounded-xl overflow-hidden transition-all hover:scale-105 min-[2500px]:rounded-3xl h-full" style={{ boxShadow: '0 10px 15px -3px rgba(27, 52, 55, 0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(26, 46, 49, 0.4)'}>
                    <div className="w-full h-56 bg-gradient-to-br from-[#0095aa]/20 to-[#0095aa]/5 flex items-center justify-center relative overflow-hidden min-[2500px]:h-96">
                      <img src="/assets/bonded-anchor-1.png" alt="Corrugated Ducts" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 min-[2500px]:p-12">
                      <h3 className="text-lg font-bold text-[#1a2a5e] mb-3 min-[2500px]:text-4xl min-[2500px]:mb-6 uppercase">ANCHOR BLOCK</h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-[2500px]:text-2xl min-[2500px]:line-clamp-4">
                        Anchor blocks, also referred to as anchorage heads, are critical load-transfer components that convey prestressing forces from the strands into the concrete member.
                      </p>
                      <span className="text-[#0095aa] font-semibold text-sm group-hover:underline mt-3 inline-block min-[2500px]:text-2xl min-[2500px]:mt-6">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>



        <h2 className="text-[clamp(2.2rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-8 md:mb-16 mt-16 md:mt-0 text-center relative z-10 top-0 md:top-16 min-[2500px]:text-[6rem] min-[2500px]:top-0 min-[2500px]:mb-32 min-[2500px]:mt-48">
          FIELD EXECUTION GALLERY
        </h2>

        <div className="relative z-10 max-w-6xl mx-auto px-4 mb-10 md:mb-18 mt-12 md:mt-32 min-[2500px]:max-w-[2000px] min-[2500px]:mt-0 min-[2500px]:mb-32">
          <ImageGrid
            images={bondedGalleryImages}
            onImageClick={(index) => {
              setCurrentIndex(index);
              setOpen(true);
            }}
          />
        </div>

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={bondedGalleryImages.map(step => ({ src: step.imgSrc }))}
          index={currentIndex}
          plugins={[Zoom]}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, .8)" },
            slide: { padding: isMobile ? "16px" : "32px" }
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            doubleClickDelay: 300,
          }}
        />
      </section>

      <section
        id="unbonded-tensioning-systems"
        className={`relative px-10 lg:px-16 py-16 lg:py-24 min-h-[60vh] overflow-hidden max-[800px]:px-2 ${isSectionVisible('unbonded-tensioning-systems') ? 'block' : 'hidden'
          }`}
      >

        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-16 text-center relative z-10 min-[2500px]:text-[8rem] min-[2500px]:mb-32">
          UNBONDED POST-TENSIONING SYSTEMS
        </h2>

        <div className="relative z-10 w-full max-w-5xl mx-auto mt-16 px-4 min-[2500px]:max-w-[2000px] min-[2500px]:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] items-start min-[2500px]:grid-cols-[800px_1fr] min-[2500px]:gap-24">

            {/* LEFT – IMAGE */}
            <div>
              <img
                src="/assets/unbonded-img.png"
                alt="Unbonded Post-Tensioning System"
                className="w-full max-w-[400px] mx-auto h-[550px] rounded-lg shadow-md object-cover min-[2500px]:max-w-[800px] min-[2500px]:h-[900px] min-[2500px]:rounded-3xl"
              />
            </div>

            {/* RIGHT – CONTENT */}
            <div className="text-gray-700 text-base lg:text-lg leading-relaxed text-justify lg:text-justify space-y-5 self-center indent-12 mt-8 lg:mt-0 min-[2500px]:text-4xl min-[2500px]:space-y-12">

              <p className="text-justify">
                Unbonded (mono-strand) post-tensioning system are characterised by tendons that remain free to move relative to the surrounding concrete throughout the structure’s service life. Each tendon is individually coated with corrosion-resistant grease and enclosed within a seamless plastic sheathing, forming a fully encapsulated unit.
              </p>

              {/* <p>
                Because the tendon is not bonded to the concrete, it can elongate uniformly during stressing and adapt to long-term effects such as creep, shrinkage, temperature variation, and differential slab movement. This flexibility reduces internal restraint, minimises cracking, and helps maintain serviceability over time.
              </p>

              <p>
                Unbonded post-tensioning is widely used in residential and commercial floor slabs, where faster execution, simpler installation, and efficient slab behaviour are critical. The system allows larger spans with reduced slab thickness and lower reinforcement congestion, supporting rapid construction while maintaining durability and performance.
              </p> */}

            </div>
          </div>
        </div>

        <h2 className="text-[clamp(2.5rem,4vw,2rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-16 mt-16 text-center relative z-10 min-[2500px]:text-[8rem] min-[2500px]:mb-32">
          COMPONENTS OF UNBONDED POST-TENSIONING SYSTEM
        </h2>

        <div className="max-w-6xl mx-auto my-16 px-4 relative z-10 min-[2500px]:max-w-[2000px] min-[2500px]:my-32">
          <img
            src="/assets/Unbonded-Installation.png"
            alt="Unbonded Post-Tensioning System Installation"
            className="w-full h-auto cursor-default"
            data-cursor="default"
          />
        </div>


        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-16 text-center relative z-10 top-16 min-[2500px]:text-[6rem] min-[2500px]:mb-32">
          FIELD EXECUTION METHODOLOGY
        </h2>

        <div className="max-w-6xl mx-auto py-12 min-[2500px]:max-w-[2000px] min-[2500px]:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 min-[2500px]:gap-24">
            {/* Left side: Accordion titles */}
            <div className="space-y-4 min-[2500px]:space-y-12">
              {unbondedInstallationSteps.map((step) => (
                <div key={step.id} className="border-b border-gray-200 last:border-b-0">
                  <button
                    className={`w-full flex justify-between items-center py-5 px-6 text-left focus:outline-none transition-colors duration-300 ${activeUnbondedAccordion === step.id ? 'bg-gray-100' : ''
                      } min-[2500px]:py-12 min-[2500px]:px-12`}
                    onClick={() => setActiveUnbondedAccordion(step.id)}
                  >
                    <span className={`text-xl md:text-2xl font-semibold ${activeUnbondedAccordion === step.id ? 'text-[#0095aa]' : 'text-gray-800'
                      } min-[2500px]:text-5xl`}>
                      {step.id.toString().padStart(2, '0')}. {step.title}
                    </span>
                    {activeUnbondedAccordion === step.id ? <Minus className="w-6 h-6 text-[#0095aa] min-[2500px]:w-12 min-[2500px]:h-12" /> : <Plus className="w-6 h-6 text-gray-500 min-[2500px]:w-12 min-[2500px]:h-12" />}
                  </button>

                  <AnimatePresence>
                    {activeUnbondedAccordion === step.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden lg:hidden bg-gray-50"
                      >
                        <div className="p-6">
                          <img
                            src={step.imgSrc}
                            alt={step.title}
                            className="w-full h-56 md:h-96 object-cover rounded-lg shadow-md mb-4"
                          />
                          <div className="text-gray-600 text-justify leading-relaxed text-sm">
                            {Array.isArray(step.description) ? step.description.map((p, i) => <p key={i} className="mb-2 text-justify">{p}</p>) : <p className="text-justify">{step.description}</p>}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right side: Image and Description */}
            <div className="relative h-[600px] mt-5 lg:mt-0 hidden lg:block min-[2500px]:h-[1000px]">
              <AnimatePresence mode="wait">
                {activeUnbondedAccordion && (
                  <motion.div
                    key={activeUnbondedAccordion}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                  >
                    <div className="h-full flex flex-col">
                      <img
                        src={unbondedInstallationSteps.find(s => s.id === activeUnbondedAccordion).imgSrc}
                        alt={unbondedInstallationSteps.find(s => s.id === activeUnbondedAccordion).title}
                        className="w-full h-1/2 object-cover rounded-lg shadow-xl min-[2500px]:rounded-3xl"
                      />
                      <div className="mt-6 text-justify text-gray-600 leading-relaxed indent-8 min-[2500px]:mt-12 min-[2500px]:text-4xl min-[2500px]:leading-snug">
                        {(() => {
                          const step = unbondedInstallationSteps.find(s => s.id === activeUnbondedAccordion);
                          if (Array.isArray(step.description)) {
                            return step.description.map((paragraph, index) => (
                              <p key={index} className={`text-justify ${index > 0 ? "mt-4 min-[2500px]:mt-8" : ""}`}>{paragraph}</p>
                            ));
                          }
                          return <p className="text-justify">{step.description}</p>;
                        })()}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {!activeUnbondedAccordion && (
                <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg min-[2500px]:rounded-3xl">
                  <p className="text-gray-500 text-lg min-[2500px]:text-4xl">Select a step to see the details</p>
                </div>
              )}
            </div>
          </div>
        </div>


        <div className="max-w-9xl mx-auto px-4 md:px-6 min-[2500px]:max-w-[2200px]">
          {/* Inner Gradient Box */}
          <div className="relative animate-gradient rounded-3xl shadow-xl p-6 md:p-12 pt-8 md:pt-4 min-[2500px]:p-24 min-[2500px]:rounded-[4rem]">
            <h2 className="text-[clamp(2.2rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-8 md:mb-16 text-center relative z-10 top-0 md:top-16 min-[2500px]:text-[7rem] min-[2500px]:top-0 min-[2500px]:mb-32">
              KEY COMPONENTS USED
            </h2>

            <div className="relative z-10 max-w-5xl mx-auto px-2 md:px-4 mb-10 md:mb-18 mt-12 md:mt-32 min-[2500px]:max-w-[2000px] min-[2500px]:mt-0 min-[2500px]:mb-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 place-items-center gap-6 min-[2500px]:gap-16">
                {/* Component 1 */}
                <Link href="/materials#unbonded-prestressing-steel-mono-strands" className="block group">
                  <div className="bg-white rounded-xl overflow-hidden transition-all hover:scale-105 max-w-[270px] w-full min-[2500px]:max-w-[600px] min-[2500px]:rounded-3xl h-full" style={{ boxShadow: '0 10px 15px -3px rgba(27, 52, 55, 0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(26, 46, 49, 0.4)'}>
                    <div className="w-full h-50 bg-gradient-to-br from-[#0095aa]/20 to-[#0095aa]/5 flex items-center justify-center relative overflow-hidden min-[2500px]:h-96">
                      <img src="/assets/unbonded-mono.png" alt="High-Strength Tendons" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 min-[2500px]:p-12">
                      <h3 className="text-lg font-bold text-[#1a2a5e] mb-3 min-[2500px]:text-4xl min-[2500px]:mb-6">PRESTRESSING STEEL</h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-[2500px]:text-2xl min-[2500px]:line-clamp-4">
                        These strands are engineered to perform reliably under long-term service loads, accommodate slab movements, and retain prestressing force with minimal relaxation losses.
                      </p>
                      <span className="text-[#0095aa] font-semibold text-sm group-hover:underline mt-3 inline-block min-[2500px]:text-2xl min-[2500px]:mt-6">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Component 2 */}
                <Link href="/materials#unbonded-wedges" className="block group">
                  <div className="bg-white rounded-xl overflow-hidden transition-all hover:scale-105 max-w-[270px] w-full min-[2500px]:max-w-[600px] min-[2500px]:rounded-3xl h-full" style={{ boxShadow: '0 10px 15px -3px rgba(27, 52, 55, 0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(26, 46, 49, 0.4)'}>
                    <div className="w-full h-50 bg-gradient-to-br from-[#0095aa]/20 to-[#0095aa]/5 flex items-center justify-center relative overflow-hidden min-[2500px]:h-96">
                      <img src="/assets/unbonded-wedges.png" alt="Corrugated Ducts" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 min-[2500px]:p-12">
                      <h3 className="text-lg font-bold text-[#1a2a5e] mb-3 min-[2500px]:text-4xl min-[2500px]:mb-6">WEDGES</h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-[2500px]:text-2xl min-[2500px]:line-clamp-4">
                        Wedges are precision-engineered mechanical components that grip the prestressing strand and transfer stressing force into the anchor plate.
                      </p>
                      <span className="text-[#0095aa] font-semibold text-sm group-hover:underline mt-3 inline-block min-[2500px]:text-2xl min-[2500px]:mt-6">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Component 3 */}
                <Link href="/materials#unbonded-anchor-plate" className="block group">
                  <div className="bg-white rounded-xl overflow-hidden transition-all hover:scale-105 max-w-[270px] w-full min-[2500px]:max-w-[600px] min-[2500px]:rounded-3xl h-full" style={{ boxShadow: '0 10px 15px -3px rgba(27, 52, 55, 0.2)' }} onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 25px 50px -12px rgba(26, 46, 49, 0.4)'}>
                    <div className="w-full h-50 bg-gradient-to-br from-[#0095aa]/20 to-[#0095aa]/5 flex items-center justify-center relative overflow-hidden min-[2500px]:h-96">
                      <img src="/assets/unbonded-anchor-plate-1.jpg" alt="Anchorages & Couplers" className="w-full h-full object-cover" />
                    </div>
                    <div className="p-6 min-[2500px]:p-12">
                      <h3 className="text-lg font-bold text-[#1a2a5e] mb-3 min-[2500px]:text-4xl min-[2500px]:mb-6 uppercase">ANCHOR PLATE</h3>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2 min-[2500px]:text-2xl min-[2500px]:line-clamp-4">
                        The anchor plate is a critical component of the PT anchorage system.
                      </p>
                      <span className="text-[#0095aa] font-semibold text-sm group-hover:underline mt-3 inline-block min-[2500px]:text-2xl min-[2500px]:mt-6">
                        Learn More →
                      </span>
                    </div>
                  </div>
                </Link>

              </div>
            </div>

          </div>
        </div>

        <h2 className="text-[clamp(2.2rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-8 md:mb-16 mt-16 md:mt-0 text-center relative z-10 top-0 md:top-16 min-[2500px]:text-[6rem] min-[2500px]:top-0 min-[2500px]:mb-32 min-[2500px]:mt-48">
          FIELD EXECUTION GALLERY
        </h2>

        <div className="relative z-10 max-w-6xl mx-auto px-4 mb-10 md:mb-18 mt-12 md:mt-32 min-[2500px]:max-w-[2000px] min-[2500px]:mt-0 min-[2500px]:mb-32">
          <ImageGrid
            images={unbondedGalleryImages}
            onImageClick={(index) => {
              setUnbondedCurrentIndex(index);
              setUnbondedOpen(true);
            }}
          />
        </div>

        <Lightbox
          open={unbondedOpen}
          close={() => setUnbondedOpen(false)}
          slides={unbondedGalleryImages.map(step => ({ src: step.imgSrc }))}
          index={unbondedCurrentIndex}
          plugins={[Zoom]}
          styles={{
            container: { backgroundColor: "rgba(0, 0, 0, .8)" },
            slide: { padding: isMobile ? "16px" : "32px" }
          }}
          zoom={{
            maxZoomPixelRatio: 3,
            doubleClickDelay: 300,
          }}
        />
      </section>
      <section
        id="structural-geometry"
        className={`relative px-10 lg:px-16 py-16 lg:py-24 min-h-[60vh] overflow-hidden max-[800px]:px-2 ${isSectionVisible('structural-geometry') ? 'block' : 'hidden'}`}
      >
        <h2 className="text-[clamp(2.5rem,7vw,5rem)] font-black text-[#1a2a5e] font-anton mx-auto mb-16 text-center relative z-10 min-[2500px]:text-[8rem] min-[2500px]:mb-32">
          STRUCTURAL GEOMETRY
        </h2>

        <div className="max-w-7xl mx-auto px-4 relative z-10 min-[2500px]:max-w-[2400px]">
          {/* Defensive fallback for hot-reload state consistency */}
          {(() => {
            const activeData = geometryContent[selectedGeometry] || geometryContent['FLAT PLATE'];
            const activeImages = geometryImages[selectedGeometry] || geometryImages['FLAT PLATE'];
            // Create a dedicated slide for the main image to allow zooming
            const mainImageSlide = [{ src: activeData.image }];
            // Combine with other gallery images if any
            const allSlides = [...mainImageSlide, ...(activeImages.map(img => ({ src: img.imgSrc })))];

            return (
              <>
                {/* Filter Tabs Moved Up */}
                <div
                  className="mobile-filters-scrollbar"
                  style={{
                    display: 'flex',
                    justifyContent: !isMobile ? 'center' : 'flex-start',
                    gap: 4,
                    marginBottom: 48,
                    overflowX: 'scroll',
                    flexWrap: 'nowrap',
                    WebkitOverflowScrolling: 'touch',
                    paddingBottom: isMobile ? '12px' : '4px',
                    paddingRight: isMobile ? '40px' : '0px',
                  }}
                >
                  {geometryFilters.map(filter => (
                    <button
                      key={filter}
                      onClick={() => setSelectedGeometry(filter)}
                      style={{
                        flex: '0 0 auto',
                        border: 'none',
                        background: selectedGeometry === filter ? '#0095AA' : '#f1f5f9',
                        color: selectedGeometry === filter ? '#fff' : '#1a2a5e',
                        fontWeight: 700,
                        fontSize: isMobile ? 14 : 16,
                        padding: '10px 24px',
                        borderRadius: '8px 8px 0 0',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        minWidth: 'fit-content'
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                  {/* Spacer to ensure scrollability doesn't "end" abruptly and hide the bar */}
                  {isMobile && <div style={{ flex: '0 0 60px', width: 60 }} aria-hidden="true" />}
                </div>

                <div className="flex flex-col gap-12 mb-16 min-[2500px]:gap-24 min-[2500px]:mb-32">
                  <motion.div
                    key={selectedGeometry + "-img"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex justify-center border-b border-gray-200 pb-12"
                  >
                    <div
                      className="cursor-pointer max-w-4xl w-full"
                      onClick={() => {
                        setGeometryCurrentIndex(0);
                        setGeometryOpen(true);
                      }}
                    >
                      <img
                        src={activeData.image}
                        alt={selectedGeometry}
                        className="w-full h-auto rounded-xl"
                      />
                    </div>
                  </motion.div>
                  <motion.div
                    key={selectedGeometry + "-content"}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-8 min-[2500px]:space-y-16"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0">
                      <div className="md:col-span-1 md:pr-8 md:border-r border-gray-200 pb-8 md:pb-0 border-b md:border-b-0">
                        <h3 className="text-[#0095AA] font-black text-xl lg:text-2xl mb-4 min-[2500px]:text-6xl min-[2500px]:mb-12 uppercase tracking-wider border-b-2 border-[#0095AA]/20 pb-2 inline-block whitespace-nowrap">Description</h3>
                        <p className="text-gray-700 text-justify leading-relaxed text-lg min-[2500px]:text-4xl">{activeData.description}</p>
                      </div>
                      <div className="md:col-span-1 md:px-8 md:border-r border-gray-200 py-8 md:py-0 border-b md:border-b-0">
                        <h3 className="text-[#0095AA] font-black text-xl lg:text-2xl mb-4 min-[2500px]:text-6xl min-[2500px]:mb-12 uppercase tracking-wider border-b-2 border-[#0095AA]/20 pb-2 inline-block whitespace-nowrap">Structural Appearance</h3>
                        <ul className="list-disc text-justify pl-5 space-y-2 text-gray-700 text-lg min-[2500px]:text-4xl min-[2500px]:space-y-6">
                          {activeData.appearance.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="md:col-span-1 md:pl-8 pt-8 md:pt-0">
                        <h3 className="text-[#0095AA] font-black text-xl lg:text-2xl mb-4 min-[2500px]:text-6xl min-[2500px]:mb-12 uppercase tracking-wider border-b-2 border-[#0095AA]/20 pb-2 inline-block whitespace-nowrap">Where It Is Used</h3>
                        <p className="text-gray-700 leading-relaxed text-justify text-lg min-[2500px]:text-4xl">{activeData.usage}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="mt-8">
                  <ImageGrid
                    images={activeImages}
                    onImageClick={(index) => {
                      setGeometryCurrentIndex(index + 1);
                      setGeometryOpen(true);
                    }}
                  />
                </div>
                <Lightbox
                  open={geometryOpen}
                  close={() => setGeometryOpen(false)}
                  slides={allSlides}
                  index={geometryCurrentIndex}
                  plugins={[Zoom]}
                  styles={{
                    container: { backgroundColor: "rgba(0, 0, 0, .8)" },
                    slide: { padding: isMobile ? "16px" : "32px" }
                  }}
                  zoom={{
                    maxZoomPixelRatio: 3,
                    doubleClickDelay: 300,
                  }}
                />
              </>
            );
          })()}
        </div>
      </section>
    </div>
  );
};

export default Technology;