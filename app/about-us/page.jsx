"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import 'leaflet/dist/leaflet.css';
import Container from '../../components/ui/Container.jsx';
import SectionTitle from '../../components/ui/SectionTitle.jsx';
import { motion } from "framer-motion";

import {
  Eye,
  Target,
  Diamond,
  ShieldCheck,
  Lightbulb,
  Users,
  HeartHandshake,
  ClipboardCheck,
} from "lucide-react";
import { desc } from "framer-motion/client";

export default function AboutUs() {
  const router = useRouter();

  const [activeCity, setActiveCity] = useState(null);
  const [activeProject, setActiveProject] = useState(null);
  const [mapReady, setMapReady] = useState(false);
  const [activeSection, setActiveSection] = useState("project-reach-portfolio");
  const [currentHash, setCurrentHash] = useState("");
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef(null);
  const projectsGridRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});

  const [isMobile, setIsMobile] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  const TEXT = 'BUILT ON ENGINEERING DELIVERED WITH CERTAINTY';
  const lightRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // On mobile, clicking a city pin will show its projects below the map
  const handleCityPinClickMobile = (city) => {
    if (isMobile) {
      setActiveCity(city);
      setActiveProject(null);
    }
  };

  // --- EVENTS SECTION DATA ---
  const [events, setEvents] = useState([]);
  const [eventYears, setEventYears] = useState([]);
  const [eventImages, setEventImages] = useState({});
  const [selectedYear, setSelectedYear] = useState(null);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
        const fetchUrl = process.env.NODE_ENV === 'development' ? '/api-proxy' : apiUrl;
        const response = await fetch(`${fetchUrl}/events`);
        if (response.ok) {
          const data = await response.json();
          setEvents(data);

          const baseUrl = apiUrl.replace('/api', '');

          // Group by year
          const yearsSet = new Set();
          const imagesByYear = {};

          data.forEach(event => {
            const year = event.year;
            if (year) {
              yearsSet.add(year);
              if (!imagesByYear[year]) imagesByYear[year] = [];

              // Handle multiple images per event
              const eventImages = Array.isArray(event.image) ? event.image : [event.image];

              eventImages.forEach(img => {
                const fullImageUrl = img ? `${baseUrl}/storage/${img}` : '/placeholder-event.png';
                imagesByYear[year].push(fullImageUrl);
              });
            }
          });

          const sortedYears = Array.from(yearsSet).sort((a, b) => b - a);
          setEventYears(sortedYears);
          setEventImages(imagesByYear);

          if (sortedYears.length > 0) {
            setSelectedYear(sortedYears[0]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      } finally {
        setLoadingEvents(false);
      }
    }
    fetchEvents();
  }, []);

  const projects = [
    { id: 21, name: 'Swastik Divine', city: 'indore', lat: 22.7196, lng: 75.8577, type: 'Residential', image: '/compressed-projects/2526-1091SwastikDivineIndore.jpeg' },
    { id: 25, name: 'Monarch royal park', city: 'indore', lat: 22.7196, lng: 75.8577, type: 'Residential', image: '/compressed-projects/Monarchroyalparkindor.jpeg' },
    { id: 26, name: 'Spectrum mall', city: 'indore', lat: 22.7196, lng: 75.8577, type: 'Commercial', image: '/compressed-projects/Spectrummallindore.jpeg' },
    { id: 22, name: 'Maruti Showroom', city: 'pune', lat: 18.5204, lng: 73.8567, type: 'Commercial', image: '/compressed-projects/Marutishowroompune.jpg' },
    { id: 24, name: 'Commissioner office', city: 'pune', lat: 18.5204, lng: 73.8567, type: 'Commercial', image: '/compressed-projects/Commissionerofficepune.jpeg' },
    { id: 23, name: 'Aashray eminent', city: 'vadodara', lat: 22.3072, lng: 73.1812, type: 'Residential', image: '/compressed-projects/Aashray_eminentVadodara.jpeg' },
    { id: 27, name: 'Pawar hospital', city: 'nashik', lat: 19.9975, lng: 73.7898, type: 'Healthcare', image: '/compressed-projects/Pawarhospitalnashi.jpeg' },
    { id: 28, name: 'ShriramEmpireSite', city: 'nashik', lat: 19.9975, lng: 73.7898, type: 'Residential', image: '/compressed-projects/ShriramEmpireSiteNashik.jpg' },
    { id: 29, name: 'Raichandanimall', city: 'hyderabad', lat: 17.3850, lng: 78.4867, type: 'Commercial', image: '/compressed-projects/Raichandanimall-Hyderabad.webp' },
  ];

  const cities = [
    {
      id: 'pune',
      name: 'Pune',
      lat: 18.5204,
      lng: 73.8567,
      type: 'tech',
      description: 'A major IT and educational hub.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'indore',
      name: 'Indore',
      lat: 22.7196,
      lng: 75.8577,
      type: 'culture',
      description: 'The cleanest city in India and a commercial powerhouse.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'vadodara',
      name: 'Vadodara',
      lat: 22.3072,
      lng: 73.1812,
      type: 'business',
      description: 'A major industrial and cultural center of Gujarat.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'nashik',
      name: 'Nashik',
      lat: 19.9975,
      lng: 73.7898,
      type: 'culture',
      description: 'The wine capital of India and a spiritual center.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad',
      lat: 17.3850,
      lng: 78.4867,
      type: 'tech',
      description: 'A major IT and tech hub of Southern India.',
      image: 'https://images.unsplash.com/photo-1572445271230-a78b5944a659?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const getNearbyProjects = (cityId) => {
    return projects.filter(project => project.city === cityId);
  };

  const handleCityClick = (city) => {
    setActiveCity(city);
    setActiveProject(null); // Reset project selection
    if (mapInstance.current) {
      mapInstance.current.flyTo([city.lat, city.lng], 12, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }

    // Scroll to projects grid only on small/medium screens
    if (window.innerWidth < 1024) {
      setTimeout(() => {
        if (projectsGridRef.current) {
          projectsGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 1000);
    }
  };

  const closePanel = () => {
    setActiveProject(null);
    setActiveCity(null);
    if (mapInstance.current) {
      mapInstance.current.flyTo([23.5937, 80.9629], 5, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  };

  useEffect(() => {
    setIsClient(true);

    // Load Leaflet library
    if (!window.L && !document.getElementById('leaflet-script')) {
      const leafletScript = document.createElement('script');
      leafletScript.id = 'leaflet-script';
      leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      leafletScript.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      leafletScript.crossOrigin = '';
      document.head.appendChild(leafletScript);
    }
  }, []);

  // Map initialization
  useEffect(() => {
    if (!isClient) return;

    const initializeMap = () => {
      if (mapRef.current && !mapInstance.current && window.L) {
        // Add Custom Styles for Map
        if (!document.getElementById('map-custom-styles')) {
          const style = document.createElement('style');
          style.id = 'map-custom-styles';
          style.innerHTML = `
            .custom-marker { background: none; border: none; }
            .marker-wrapper { 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              justify-content: center; 
              width: 30px; 
              height: 30px; 
              animation: float 3s ease-in-out infinite;
              filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
            }
            .marker-pin { 
              width: 16px; 
              height: 16px; 
              background: #0095AA; 
              border: 3px solid white; 
              border-radius: 50%; 
              box-shadow: 0 0 0 6px rgba(0, 149, 170, 0.4); 
              transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); 
              cursor: pointer; 
              position: relative; 
              z-index: 2; 
            }
            .type-capital { --marker-color: #ef4444; --marker-glow: rgba(239, 68, 68, 0.3); }
            .type-finance { --marker-color: #f59e0b; --marker-glow: rgba(245, 158, 11, 0.3); }
            .type-tech { --marker-color: #3b82f6; --marker-glow: rgba(59, 130, 246, 0.3); }
            .type-culture { --marker-color: #a855f7; --marker-glow: rgba(168, 85, 247, 0.3); }
            .type-business { --marker-color: #10b981; --marker-glow: rgba(16, 185, 129, 0.3); }
            .marker-pin::after { 
              content: ''; 
              position: absolute; 
              top: 50%; 
              left: 50%; 
              width: 100%; 
              height: 100%; 
              background: #0095AA; 
              border-radius: 50%; 
              transform: translate(-50%, -50%); 
              animation: radar-pulse 2s infinite; 
              z-index: -1; 
              opacity: 0.5; 
            }
            @keyframes radar-pulse { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; } 100% { transform: translate(-50%, -50%) scale(4); opacity: 0; } }
            @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }
            .marker-label { 
              position: absolute; 
              bottom: 30px; 
              background: #1e293b; 
              color: white; 
              padding: 6px 12px; 
              border-radius: 8px; 
              font-size: 11px; 
              font-weight: 700; 
              white-space: nowrap; 
              text-transform: uppercase;
              box-shadow: 0 10px 20px rgba(0,0,0,0.2); 
              opacity: 0; 
              transform: translateY(10px) scale(0.9); 
              transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); 
              pointer-events: none; 
            }
            .marker-wrapper:hover .marker-label { opacity: 1; transform: translateY(0) scale(1); }
            .marker-wrapper:hover .marker-pin { transform: scale(1.3); background: #fff; border-color: #0095AA; }
            .marker-pin.active { background: #fff; border-color: #0095AA; transform: scale(1.3); }
            .leaflet-container { background: #cbd5e1 !important; outline: 0; }
            @keyframes slideInLeft {
              from { transform: translateX(-100%); opacity: 0; }
              to { transform: translateX(0); opacity: 1; }
            }
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
          `;
          document.head.appendChild(style);
        }

        // Initialize Map
        mapInstance.current = window.L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false
        }).setView([23.5937, 80.9629], 5);
        // Add Zoom Control to Top Right
        window.L.control.zoom({
          position: 'topright'
        }).addTo(mapInstance.current);

        // Standard OSM Tiles
        window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(mapInstance.current);

        mapInstance.current.invalidateSize();
        setMapReady(true);
      }
    };

    // Marker Management removed from here

    // Wait for Leaflet to load
    const checkLeaflet = setInterval(() => {
      if (window.L) {
        clearInterval(checkLeaflet);
        const timer = setTimeout(() => {
          initializeMap();
        }, 500);

        return () => {
          if (timer) clearTimeout(timer);
        };
      }
    }, 100);

    const section = document.getElementById('project-reach-portfolio');
    if (section) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !mapInstance.current && window.L) {
            setTimeout(() => {
              initializeMap();
            }, 300);
          }
        });
      }, { threshold: 0.1 });

      observer.observe(section);

      return () => {
        clearInterval(checkLeaflet);
        observer.disconnect();
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }

    return () => {
      clearInterval(checkLeaflet);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [isClient]);

  // Marker Management
  useEffect(() => {
    if (!isClient || !mapInstance.current || !window.L || !mapReady) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach(marker => marker.remove());
    markersRef.current = {};

    if (activeCity) {
      // Re-add the active city pin so it stays visible when zoomed
      const city = activeCity;
      const customIcon = window.L.divIcon({
        className: 'custom-marker',
        html: `
              <div class="marker-wrapper type-${city.type}">
                  <div class="marker-label">${city.name}</div>
                  <div class="marker-pin active" id="pin-${city.id}"></div>
              </div>
              `,
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });

      const marker = window.L.marker([city.lat, city.lng], { icon: customIcon }).addTo(mapInstance.current);
      markersRef.current[`city-${city.id}`] = marker;

      marker.on('click', () => {
        handleCityClick(city);
      });
    } else {
      // SHOW CITY PINS
      cities.forEach(city => {
        const customIcon = window.L.divIcon({
          className: 'custom-marker',
          html: `
                <div class="marker-wrapper type-${city.type}">
                    <div class="marker-label">${city.name}</div>
                    <div class="marker-pin" id="pin-${city.id}"></div>
                </div>
                `,
          iconSize: [30, 30],
          iconAnchor: [15, 15]
        });

        const marker = window.L.marker([city.lat, city.lng], { icon: customIcon }).addTo(mapInstance.current);
        markersRef.current[`city-${city.id}`] = marker;

        marker.on('click', () => {
          handleCityClick(city);
        });
      });
    }
  }, [activeCity, mapReady, isClient]);

  // Handle hash-based routing
  useEffect(() => {
    if (!isClient) return;

    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentHash(hash);
      if (hash) {
        setActiveSection(hash);
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        setActiveSection('project-reach-portfolio');
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [isClient]);

  const scrollToSection = (sectionId) => {
    if (!isClient) return;

    if (sectionId === 'our-journey') {
      router.push('/our-journey');
      return;
    }

    window.location.hash = sectionId;
    setActiveSection(sectionId);

    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const isSectionVisible = (sectionId) => {
    if (!currentHash) return true;
    return currentHash === sectionId;
  };

  // Track active section on scroll
  useEffect(() => {
    if (!isClient || currentHash) return;

    const handleScroll = () => {
      const sections = ['who-we-are', 'our-journey', 'project-reach-portfolio', 'vision-values-mission', 'leadership'];
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.style.display !== 'none') {
          const sectionTop = section.offsetTop;
          if (scrollPosition >= sectionTop) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentHash, isClient]);

  const values = [
    {
      icon: '🏗️',
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in all our post-tensioning systems and services.',
    },
    {
      icon: '💡',
      title: 'Innovation',
      description: 'Continuously advancing our technology and methods to deliver cutting-edge solutions.',
    },
    {
      icon: '🤝',
      title: 'Client Partnership',
      description: 'Building long-term relationships based on trust, transparency, and mutual success.',
    },
    {
      icon: '🌱',
      title: 'Sustainability',
      description: 'Committed to environmentally responsible construction practices.',
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] max-h-[50vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Video */}
        <video
          key={isClient && currentHash === 'leadership' ? 'leadership-video' : isClient && currentHash === 'certification' ? 'certification-video' : isClient && currentHash === 'project-reach-portfolio' ? 'project-reach-bg-video' : isClient && currentHash === 'testimonials' ? 'testimonials-bg-video' : isClient && currentHash === 'events' ? 'events-bg-video' : 'aboutus-video'}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={
            // isClient && currentHash === 'leadership' ? "/assets/leadership-bg.mp4" :
            isClient && currentHash === 'certification' ? "/assets/certification-bg.mp4" :
              isClient && currentHash === 'project-reach-portfolio' ? "/assets/project-reach-bg-video.mp4" :
                // isClient && currentHash === 'testimonials' ? "/assets/testimonials-bg-video.mp4" :
                // isClient && currentHash === 'events' ? "/assets/events-bg-video.mp4" :
                "/assets/aboutusbgvideo.mp4"
          } type="video/mp4" />
        </video>

        {/* Overlay Layer */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,149,170,0.6)] z-[0.5]"></div>

        {/* Main Heading */}
        <h1 className="text-white text-center m-auto z-10 relative text-shadow-lg tracking-wider font-anton font-normal pt-16 text-[clamp(3rem,8vw,6rem)] font-black min-[2500px]:pt-0 min-[2500px]:m-0 min-[2500px]:absolute min-[2500px]:top-1/2 min-[2500px]:left-1/2 min-[2500px]:-translate-x-1/2 min-[2500px]:-translate-y-1/2 min-[2500px]:w-full">
          {/* {isClient && currentHash === 'leadership' ? 'LEADERSHIP' : */}
          {isClient && currentHash === 'certification' ? 'CERTIFICATION' :
            isClient && currentHash === 'project-reach-portfolio' ? 'PROJECT REACH' :
              // isClient && currentHash === 'testimonials' ? 'TESTIMONIALS' :
              // isClient && currentHash === 'events' ? 'EVENTS' :
              'ABOUT US'}
        </h1>

        {/* Sub-Navigation */}
        <div className="hidden lg:flex mt-auto mb-0 z-10 relative bg-white/95 rounded-t-2xl px-8 py-4 gap-5 flex-wrap justify-center items-center min-[2500px]:absolute min-[2500px]:bottom-0 min-[2500px]:mb-0">          {[
          { id: 'who-we-are', label: 'WHO WE ARE' },
          { id: 'our-journey', label: 'OUR JOURNEY' },
          { id: 'project-reach-portfolio', label: 'PROJECT REACH' },
          // { id: 'leadership', label: 'LEADERSHIP' },
          { id: 'certification', label: 'CERTIFICATION' },
          // { id: 'testimonials', label: 'TESTIMONIALS' }
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
        <div className="flex w-full overflow-hidden">
          <div className="flex animate-[tickerScroll_25s_linear_infinite] whitespace-nowrap">
            {[
              '★ Quality Matters Over Quantity ★',
              '★ Post-Tensioning Company You Can Trust ★',
              '★ Delivering Structural Efficiency Every Time ★'
            ].map((text, index) => (
              <span key={index} className="inline-flex items-center px-[60px] py-[18px] text-2xl font-semibold text-white tracking-[0.5px]">
                {text}
              </span>
            ))}
            {[
              '★ Quality Matters Over Quantity ★',
              '★ Post-Tensioning Company You Can Trust ★',
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

      {/* WHO WE ARE Section */}
      <section
        id="who-we-are"
        className={`relative px-10 py-16 min-h-[60vh] overflow-hidden min-[2500px]:px-40 max-[800px]:px-4 ${isSectionVisible('who-we-are') ? 'block' : 'hidden'}`}
      >
        {/* Background Image */}
        <img
          src="/assets/structural-geometry/flat_slab_with_drop_cap.png"
          alt="Who We Are Background"
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-20"
        />

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-white/70 z-[0.5]" />

        {/* WHO WE ARE Heading */}
        <h2 className="text-[#1a2a5e] font-anton font-black text-center mb-16 relative z-10 text-[clamp(2.5rem,7vw,5rem)] min-[2500px]:text-[8rem] min-[2500px]:mt-20">
          WHO WE ARE
        </h2>

        {/* Content */}
        <div className="relative z-10 max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12 items-center min-[2500px]:max-w-[2200px] min-[2500px]:gap-24">          {/* Video */}
          <div className="flex-[0.8] w-full md:w-[80%] lg:w-[100%] rounded-lg overflow-hidden shadow-2xl">
            <video autoPlay loop muted playsInline className="w-full">
              <source src="/assets/whowearevideo.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Right Side - Text Content */}
          <div className="flex-1 flex flex-col gap-4 indent-8">
            <p className="text-lg leading-relaxed text-gray-800 text-justify font-medium min-[2500px]:text-4xl">
              Unified Post-Tensioning Systems LLP is a specialised engineering firm delivering unbonded and bonded post-tensioning solutions for modern construction across India.
            </p>

            <p className="text-lg leading-relaxed text-gray-800 text-justify font-medium min-[2500px]:text-4xl">
              We operate with a disciplined, process-driven approach that integrates design, detailing, material control, and site execution into a single, accountable system. Our focus is on engineering clarity, execution accuracy, and long-term structural performance not shortcuts or site-level improvisation.
            </p>

            <p className="text-lg leading-relaxed text-gray-800 text-justify font-medium min-[2500px]:text-4xl">
              Unified is built on dependability, consistency, and cost efficiency. Our systems enable longer spans, optimised slab behaviour, reduced structural weight, and predictable construction outcomes without compromising safety or quality.
            </p>

            <p className="text-lg leading-relaxed text-gray-800 text-justify font-medium min-[2500px]:text-4xl">
              We do not treat post-tensioning as a routine site activity. We treat it as a critical structural system that demands planning, traceability, and technical accountability at every stage of the project lifecycle.
            </p>
          </div>
        </div>

        <div className="py-20 bg-accent-light relative z-10">
          <div className="max-w-[1000px] mx-auto min-[2500px]:max-w-[2200px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 min-[2500px]:gap-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-2xl shadow-lg min-[2500px]:p-20 min-[2500px]:min-h-[500px] flex flex-col justify-center"
              >
                <h3 className="text-3xl text-center font-heading font-bold text-primary uppercase mb-4 text-[#0095AA] min-[2500px]:text-7xl min-[2500px]:mb-10">
                  Our Mission
                </h3>
                <p className="text-text-light leading-relaxed text-center indent-4 min-[2500px]:text-4xl">
                  To constantly deliver excellent value-based, innovative solutions that are sure to elevate the benchmarks of quality in construction and exceed the expectations of our customers.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg min-[2500px]:p-20 min-[2500px]:min-h-[500px] flex flex-col justify-center"
              >
                <h3 className="text-3xl text-center font-heading font-bold text-primary uppercase mb-4 text-[#0095AA] min-[2500px]:text-7xl min-[2500px]:mb-10">
                  Our Vision
                </h3>
                <p className="text-text-light leading-relaxed text-center indent-4 min-[2500px]:text-4xl">
                  To become the most preferred choice of real estate developers, structural consultants and architects of India and assist them in creating robust infrastructure for our modern India.
                </p>
              </motion.div>
            </div>
          </div>
        </div>

        {/* New Vision/Mission/Values Design */}
        <div className="pt-10 pb-20 relative z-10">
          <div className="max-w-[1400px] mx-auto min-[2500px]:max-w-[2200px]">
            <SectionTitle
              title="Our Core Values"
              subtitle="What We Stand For"
              className="text-[#1a2a5e]"
              titleClassName="min-[2500px]:text-8xl"
              subtitleClassName="min-[2500px]:text-3xl" />

            {/* Bottom Section - 5 Value Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6 min-[2500px]:gap-12 mx-auto">
              {/* Integrity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:border-2 hover:border-[#0095AA] transition-all duration-300 cursor-pointer group min-[2500px]:p-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 group-hover:bg-[#0095AA] transition-all duration-300 min-[2500px]:w-24 min-[2500px]:h-24 min-[2500px]:mb-8">
                  <svg className="w-8 h-8 text-[#0095AA] group-hover:text-white transition-all duration-300 min-[2500px]:w-12 min-[2500px]:h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold uppercase mb-3 text-gray-900 min-[2500px]:text-3xl min-[2500px]:mb-6">CUSTOMER FIRST</h4>
                <p className="text-xs leading-relaxed text-gray-600 min-[2500px]:text-xl">
                  Customer satisfaction is at the heart of our organization. We believe in sharing success through strong and long-term relationships with our customers.
                </p>
              </motion.div>

              {/* Innovation */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:border-2 hover:border-[#0095AA] transition-all duration-300 cursor-pointer group min-[2500px]:p-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 group-hover:bg-[#0095AA] transition-all duration-300 min-[2500px]:w-24 min-[2500px]:h-24 min-[2500px]:mb-8">
                  <svg className="w-8 h-8 text-[#0095AA] group-hover:text-white transition-all duration-300 min-[2500px]:w-12 min-[2500px]:h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold uppercase mb-3 text-gray-900 min-[2500px]:text-3xl min-[2500px]:mb-6">INTEGRITY</h4>
                <p className="text-xs leading-relaxed text-gray-600 min-[2500px]:text-xl">
                  We are recognized and respected across the industry for our utmost commitment to honesty and transparency.
                </p>
              </motion.div>

              {/* Teamwork */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:border-2 hover:border-[#0095AA] transition-all duration-300 cursor-pointer group min-[2500px]:p-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 group-hover:bg-[#0095AA] transition-all duration-300 min-[2500px]:w-24 min-[2500px]:h-24 min-[2500px]:mb-8">
                  <svg className="w-8 h-8 text-[#0095AA] group-hover:text-white transition-all duration-300 min-[2500px]:w-12 min-[2500px]:h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold uppercase mb-3 text-gray-900 min-[2500px]:text-3xl min-[2500px]:mb-6">INNOVATION</h4>
                <p className="text-xs leading-relaxed text-gray-600 min-[2500px]:text-xl">
                  We constantly strive to be more creative in our thinking and more efficient in our performance. Our determination to be the best in business by offering world-class products and services to customers.
                </p>
              </motion.div>

              {/* Customer First */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:border-2 hover:border-[#0095AA] transition-all duration-300 cursor-pointer group min-[2500px]:p-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 group-hover:bg-[#0095AA] transition-all duration-300 min-[2500px]:w-24 min-[2500px]:h-24 min-[2500px]:mb-8">
                  <svg className="w-8 h-8 text-[#0095AA] group-hover:text-white transition-all duration-300 min-[2500px]:w-12 min-[2500px]:h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold uppercase mb-3 text-gray-900 min-[2500px]:text-3xl min-[2500px]:mb-6">TEAMWORK</h4>
                <p className="text-xs leading-relaxed text-gray-600 min-[2500px]:text-xl">
                  Fostering a culture of teamwork allows us to work together within the company as well as with our customers to deliver better solutions.
                </p>
              </motion.div>

              {/* Accountability */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="bg-white p-6 rounded-2xl shadow-lg text-center hover:shadow-2xl hover:border-2 hover:border-[#0095AA] transition-all duration-300 cursor-pointer group min-[2500px]:p-12"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4 group-hover:bg-[#0095AA] transition-all duration-300 min-[2500px]:w-24 min-[2500px]:h-24 min-[2500px]:mb-8">
                  <svg className="w-8 h-8 text-[#0095AA] group-hover:text-white transition-all duration-300 min-[2500px]:w-12 min-[2500px]:h-12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-lg font-bold uppercase mb-3 text-gray-900 min-[2500px]:text-3xl min-[2500px]:mb-6">ACCOUNTABILITY</h4>
                <p className="text-xs leading-relaxed text-gray-600 min-[2500px]:text-xl">
                  We take the complete ownership of all our decisions and actions and under no circumstances run away from taking the responsibility.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>


      {/* OUR JOURNEY Section */}
      <section
        id="our-journey"
        className="relative py-[40px] px-[20px] md:px-[40px] md:pb-[100px] min-h-[60vh] overflow-hidden bg-white"
        style={{
          display: isSectionVisible('our-journey') ? 'block' : 'none'
        }}
      >
        {/* Background Image with Opacity */}
        <div style={{
          position: 'absolute',
          top: '100px',
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url("/assets/our journey bg.jpeg")',
          backgroundPosition: 'left top',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '80% auto',
          opacity: 0.3,
          zIndex: 0,
          pointerEvents: 'none'
        }}></div>
        {/* OUR JOURNEY Heading */}
        <h2 style={{
          fontSize: 'clamp(2.5rem, 7vw, 5rem)',
          fontWeight: '900',
          color: '#1a2a5e',
          fontFamily: 'Anton, sans-serif',
          margin: '0 auto 40px md:margin-b-[60px]',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          maxWidth: '1400px',
          padding: '0'
        }}>
          OUR JOURNEY
        </h2>

        {/* Company Establishment Block - Separate Div */}
        <div className="relative z-[1] max-w-[1400px] mx-auto mb-[40px] md:mb-[60px] text-center px-0">
          <p style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            lineHeight: '1.4',
            color: '#1a2a5e',
            margin: '0 0 5px 0',
            fontWeight: '900',
            letterSpacing: '0.5px',
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: 'normal'
          }}>
            Established in 2018,
          </p>
          <p style={{
            fontSize: 'clamp(1.4rem, 5vw, 2rem)',
            color: '#0095AA',
            margin: '0 0 5px 0',
            fontWeight: '700',
            letterSpacing: '1px',
            fontFamily: "'DM Sans', sans-serif"
          }}>
            Unified Post-Tensioning Systems LLP
          </p>
          <p style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            color: '#1a2a5e',
            fontWeight: '900',
            letterSpacing: '0.5px',
            fontFamily: "'DM Sans', sans-serif",
            fontStyle: 'normal'
          }}>
            was founded on a clear principle
          </p>
          <p style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
            color: '#1a2a5e',
            margin: '0',
            fontWeight: '900',
            fontStyle: 'italic',
            letterSpacing: '0.8px',
            fontFamily: "'DM Sans', sans-serif",
            display: 'inline-block',
            borderRadius: '8px'
          }}>
            "Quality matters more than quantity"
          </p>
        </div>

        {/* Image-Text Layout - Separate Div */}
        <div className="relative z-[1] max-w-[1400px] mx-auto flex flex-col md:flex-row gap-[40px] md:gap-[60px] items-start min-[2500px]:max-w-[2200px]">
          {/* Left Side - Text Content */}
          <div className="flex-1 flex flex-col gap-[20px] md:gap-[25px]">
            {/* Paragraph 1 */}
            <p className="text-[1rem] md:text-[1.1rem] leading-[1.6] md:leading-[1.8] text-[#333] m-0 text-justify font-[500] indent-[30px] md:indent-[50px] pl-0">
              As India's construction sector rapidly expanded, projects demanded longer spans, slimmer slabs, faster cycles, and tighter cost control. Post-tensioning was becoming essential but execution standards across the industry were inconsistent, often driven by shortcuts rather than engineering discipline.
            </p>

            {/* Highlight Bar 1 */}
            <div className="bg-[#1a2a5e] text-white p-[15px_20px] md:p-[15px_25px] text-center font-[900] text-[1.1rem] md:text-[1.5rem] tracking-[1px] uppercase my-[15px] md:my-[20px]">
              UNIFIED WAS CREATED TO CLOSE THIS GAP
            </div>

            {/* Paragraph 2 */}
            <p className="text-[1rem] md:text-[1.1rem] leading-[1.6] md:leading-[1.8] text-[#333] m-0 text-justify font-[700] indent-[30px] md:indent-[50px] pl-0">
              From the beginning, the company focused on premium bonded and unbonded post-tensioning systems, supported by structured planning, material traceability, trained execution teams, and strict compliance with engineering intent.
            </p>

            {/* Paragraph 3 */}
            <p className="text-[1rem] md:text-[1.1rem] leading-[1.6] md:leading-[1.8] text-[#333] m-0 text-justify font-[700] indent-[30px] md:indent-[50px] pl-0">
              Rather than treating PT as an isolated site task, Unified embedded a process-led methodology understanding structural intent, controlling tendon layouts and sequencing, executing with precision, and documenting every stressing operation against defined standards.
            </p>
          </div>

          {/* Right Side - Video */}
          <div className="flex-1 w-full rounded-[10px] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.15)] max-h-[600px]">
            <video
              autoPlay
              loop
              muted
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            >
              <source src="/assets/Our Journey Video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>

        {/* JOURNEY TIMELINE */}
        <div className="relative max-w-[1400px] mx-auto mb-[40px] md:mb-[80px] px-0 z-[1] mt-[60px] min-[2500px]:max-w-[2200px]">
          {/* Timeline Content for Each Year */}
          {[
            {
              year: 2018,
              title: "Foundation of Pramukh PT Execution",
              description: "Pramukh began operations with a focused approach to post-tensioning execution, establishing on-site discipline, reliable manpower deployment, and consistent delivery standards across early projects."
            },
            {
              year: 2019,
              title: "Operational Strength Improvement",
              description: "Operational strength improved through increased manpower and exposure to larger residential projects. Processes for site coordination and material management began taking shape."
            },
            {
              year: 2020,
              title: "Standardization of Execution",
              description: "Core execution procedures were standardized, including stressing logs, duct alignment checks, and material traceability. A structured training approach for supervisors and labour teams was introduced to ensure uniform execution quality."
            },
            {
              year: 2021,
              title: "Unified Post Tensioning Systems Entry",
              description: "Unified Post Tensioning Systems LLP entered the industry, adding engineering review, layout verification, and planned sequencing to bring technical clarity and stability to PT execution."
            },
            {
              year: 2022,
              title: "Engineering & QA Integration",
              description: "Engineering modelling practices and a formal QA system were incorporated. This improved accuracy, documentation, and compliance, strengthening the PT workflow from design coordination to final stressing records."
            },
            {
              year: 2023,
              title: "Regional Expansion & Capacity Growth",
              description: "Multiple trained site teams were added and deployed across new regions. This increased execution capacity and enabled simultaneous bonded and unbonded PT projects with stronger technical oversight."
            },
            {
              year: 2024,
              title: "Unified & Pramukh Integration",
              description: "Unified and Pramukh aligned operations to merge field expertise with engineering governance, enhancing agility, speed, and overall system reliability across project categories."
            },
            {
              year: 2025,
              title: "Complex Sector Expansion",
              description: "With stronger systems, trained manpower, and deeper consultant relationships, the organization expanded into more complex PT structures across residential, commercial, and infrastructure sectors."
            }
          ].map((milestone, index) => (
            <div
              key={milestone.year}
              className={`flex flex-col md:flex-row gap-[20px] md:gap-[60px] items-start ${index === 7 ? '' : 'mb-[40px] md:mb-[80px]'}`}
            >
              {/* Left - Year */}
              <div className="md:flex-[0_0_120px] w-full md:w-auto text-left md:text-right pt-[10px]">
                <div
                  style={{
                    fontSize: "clamp(2rem, 5vw, 3rem)",
                    fontWeight: "900",
                    color: "#1a2a5e",
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                >
                  {milestone.year}
                </div>
              </div>

              {/* Timeline Dot and Line - Hidden on Mobile, Visible on Desktop */}
              <div className="hidden md:flex flex-[0_0_30px] flex-col items-center pt-[15px]">
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "#1a2a5e",
                    border: "3px solid #fff",
                    boxShadow: "0 0 0 3px #1a2a5e"
                  }}
                />
                {index < 7 && (
                  <div
                    style={{
                      width: "2px",
                      height: "100%",
                      minHeight: "60px",
                      background: "#ddd",
                      marginTop: "12px"
                    }}
                  />
                )}
              </div>

              {/* Right - Content */}
              <div className="flex-1 pt-0 transition-all duration-300">
                <h4 className="text-[1.2rem] md:text-[1.5rem] font-[700] text-[#1a2a5e] m-0 mb-[10px] md:mb-[15px] font-['DM_Sans']">
                  {milestone.title}
                </h4>
                <p className="text-[1rem] md:text-[1.1rem] leading-[1.6] md:leading-[1.8] text-[#333] m-0 font-['DM_Sans'] text-justify">
                  {milestone.description}
                </p>
              </div>
            </div>
          ))}
        </div>


        {/* Today Unified Box - Separate Section */}
        <div className="relative z-[1] max-w-[1400px] mx-auto mt-[40px] md:mt-[60px] flex flex-col md:flex-row gap-[40px] md:gap-[60px] items-start px-0 min-[2500px]:max-w-[2200px]">
          {/* Left Side - Empty (Spacer on desktop) */}
          <div className="hidden md:block flex-1"></div>

          {/* Right Side - Teal Box */}
          <div className="flex-1 w-full bg-[#0095AA] rounded-[15px] p-[30px] md:p-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
            {/* Main Text */}
            <p className="text-[1rem] md:text-[1.1rem] text-white max-w-full md:max-w-[800px] leading-[1.7] m-[0_0_20px_0] text-center md:text-left">
              Today, Unified stands as a trusted PT partner across multiple regions, delivering systems aligned with modern engineering requirements and the evolving expectations of India's construction industry.
            </p>

            {/* Explore Our Projects Heading */}
            <h3 style={{
              fontSize: '0.9rem',
              fontWeight: '700',
              color: '#ffffff',
              margin: '0 0 20px 0',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              textAlign: 'center'
            }}>
              EXPLORE OUR PROJECTS
            </h3>

            {/* Visit Projects Button */}
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => navigate('/our-projects')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  background: '#ffffff',
                  color: '#0095AA',
                  padding: '14px 28px',
                  borderRadius: '50px',
                  border: 'none',
                  fontSize: '20px',
                  fontWeight: '900',
                  fontFamily: "'DM Sans', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
                }}
              >
                <span>Visit Projects</span>
                <div style={{
                  width: '28px',
                  height: '28px',
                  background: '#0095AA',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s ease'
                }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sliding Banner - BUILT ON ENGINEERING DELIVERED WITH CERTAINTY */}
      <section style={{
        position: 'relative',
        width: '100%',
        background: '#ffffff',
        padding: '30px 0',
        overflow: 'hidden',
        display: !currentHash ? 'block' : 'none'
      }}>
        <div style={{
          display: 'flex',
          width: 'fit-content',
          animation: 'slideBanner 20s linear infinite'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            whiteSpace: 'nowrap',
            padding: '0 50px'
          }}>
            {[...Array(3)].map((_, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '30px'
              }}>
                <img
                  src="/assets/icon.png"
                  alt="Icon"
                  style={{
                    width: '4.8rem',
                    height: '5rem',
                    animation: 'rotateAsterisk 2s linear infinite',
                    display: 'inline-block',
                    objectFit: 'contain',
                    verticalAlign: 'middle',
                    marginTop: '0.5rem'
                  }}
                />
                <span style={{
                  fontSize: '4.2rem',
                  fontWeight: '700',
                  letterSpacing: '2px',
                  fontFamily: 'Anton, sans-serif',
                  display: 'inline-block'
                }}>
                  {'BUILT ON ENGINEERING DELIVERED WITH CERTAINTY  '.split('').map((char, idx) => (
                    <span
                      key={idx}
                      className="banner-letter-hover"
                      style={{
                        color: '#9ca3af',
                        transition: 'color 0.3s ease',
                        display: 'inline-block'
                      }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @keyframes slideBanner {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes rotateAsterisk {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .banner-letter-hover:hover {
          color: #0095AA !important;
        }
      `}</style>

      {/* Vision Values Mission Section */}


      {/* PROJECT REACH PORTFOLIO Section */}
      <section
        id="project-reach-portfolio"
        style={{
          padding: '0',
          minHeight: '100vh',
          backgroundColor: '#ffffff',
          position: 'relative',
          overflow: 'visible',
          zIndex: 1,
          display: isSectionVisible('project-reach-portfolio') ? 'block' : 'none'
        }}
      >

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '60px 20px 0 20px' : '80px 40px 0 40px', marginBottom: '40px', position: 'relative', zIndex: 1, textAlign: 'center' }} className="min-[2500px]:max-w-[1800px] min-[2500px]:padding-[120px_80px_0_80px] min-[2500px]:mb-[80px]">
          <div style={{ textAlign: 'center' }}>
            <h2
              className="font-[900] text-[#1a252f] min-[2500px]:text-[5rem] min-[2500px]:mb-[40px]"
              style={{
                fontSize: isMobile ? '2rem' : '3rem',
                marginBottom: isMobile ? '15px' : '20px'
              }}
            >
              GEOGRAPHICAL <span style={{ color: '#0095AA' }}>PRESENCE</span>
            </h2>
            <p className="text-[1.1rem] text-[#4a5568] max-w-[800px] leading-[1.7] text-center mx-auto min-[2500px]:text-3xl min-[2500px]:max-w-[1400px]">
              Unified has executed and managed post-tensioning projects across key construction markets in India. Click on the pins to explore our regional impact.
            </p>
          </div>
        </div>

        <div
          style={{
            width: '100%',
            height: isMobile ? '420px' : 'calc(100vh - 250px)', // ✅ FIX
            minHeight: isMobile ? '420px' : '650px',
            position: 'relative',
            background: '#f8fafc',
            borderTop: '1px solid #e2e8f0',
            zIndex: 1
          }}
          className="min-[2500px]:h-[calc(100vh-400px)] min-[2500px]:min-h-[1000px]"
        >


          {/* Map rendering: Only one city pin on mobile, all pins on desktop */}
          <div
            ref={mapRef}
            style={{
              height: '100%',
              width: '100%',
              zIndex: 1,
              cursor: 'grab',
              position: 'relative'
            }}
          >
            {/* Leaflet map will render pins via its own marker management */}
          </div>

          {/* Desktop Only: Project Cards Overlay on Left Side (1024px to 2560px) */}
          {isLargeScreen && activeCity && (
            <div
              style={{
                position: 'absolute',
                top: '30px',
                left: '30px',
                bottom: '30px',
                width: '420px',
                background: 'rgba(255, 255, 255, 0.96)',
                backdropFilter: 'blur(10px)',
                borderRadius: '32px',
                zIndex: 1000,
                boxShadow: '0 20px 50px rgba(0,0,0,0.15)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                animation: 'slideInLeft 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
              className="min-[2500px]:width-[600px] min-[2500px]:top-[60px] min-[2500px]:left-[60px] min-[2500px]:bottom-[60px] min-[2500px]:border-radius-[50px]"
            >
              <div style={{
                padding: '24px',
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'white'
              }} className="min-[2500px]:padding-[40px]">
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1a2a5e', margin: 0, textTransform: 'uppercase' }}>
                    {activeCity.name} Projects
                  </h3>
                  <p style={{ color: '#0095AA', fontWeight: '#600', margin: '5px 0 0', fontSize: '0.9rem', textTransform: 'uppercase' }}>
                    {getNearbyProjects(activeCity.id).length} Projects Found
                  </p>
                </div>
                <button
                  onClick={closePanel}
                  style={{
                    background: '#f1f5f9',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1.4rem',
                    color: '#1a2a5e',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#e2e8f0'}
                  onMouseLeave={(e) => e.target.style.background = '#f1f5f9'}
                >
                  ×
                </button>
              </div>

              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }} className="custom-scrollbar min-[2500px]:padding-[40px] min-[2500px]:gap-[40px]">
                {getNearbyProjects(activeCity.id).map(project => (
                  <div
                    key={project.id}
                    style={{
                      background: 'white',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      border: '1px solid #f1f5f9',
                      transition: 'transform 0.2s ease',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      flexShrink: 0
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    onClick={() => router.push('/our-projects')}
                  >
                    <div style={{ height: '200px', overflow: 'hidden' }} className="min-[2500px]:height-[350px]">
                      <img src={project.image} alt={project.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ padding: '24px' }} className="min-[2500px]:padding-[40px]">
                      <div style={{ color: '#0095AA', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>{project.type}</div>
                      <h4 style={{ fontSize: '1.3rem', fontWeight: '800', color: '#1a2a5e', marginBottom: '12px', lineHeight: '1.4', textTransform: 'uppercase' }}>{project.name}</h4>
                      <p style={{ fontSize: '0.95rem', color: '#64748b', margin: 0, lineHeight: '1.6' }}>{project.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile: Show selected city's projects below map, not in modal */}
          {/* Project Cards Grid - Unified for Mobile & Desktop (Hidden on Large Screen Overlay) */}
          {activeCity && !isLargeScreen && (
            <div
              ref={projectsGridRef}
              style={{
                maxWidth: 1100,
                margin: '40px auto 0',
                padding: '0 24px 60px',
                animation: 'fadeIn 0.5s ease-out'
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'flex-start' : 'center',
                marginBottom: '30px',
                borderBottom: '2px solid #e2e8f0',
                paddingBottom: '15px',
                gap: isMobile ? '15px' : '0'
              }}>
                <div>
                  <h3 style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', fontWeight: '800', color: '#1a2a5e', margin: 0, textTransform: 'uppercase' }}>
                    Projects in {activeCity.name}
                  </h3>
                  <p style={{ color: '#0095AA', fontWeight: '#600', margin: '5px 0 0', textTransform: 'uppercase' }}>
                    {getNearbyProjects(activeCity.id).length} Projects Found
                  </p>
                </div>
                <button
                  onClick={closePanel}
                  style={{
                    background: '#f1f5f9',
                    color: '#1a2a5e',
                    padding: '10px 24px',
                    borderRadius: '30px',
                    fontWeight: '700',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#e2e8f0'}
                  onMouseLeave={(e) => e.target.style.background = '#f1f5f9'}
                >
                  <span>← Back to All Cities</span>
                </button>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fill, minmax(320px, 1fr))',
                gap: '30px'
              }}>
                {getNearbyProjects(activeCity.id).map(project => (
                  <div
                    key={project.id}
                    style={{
                      background: 'white',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      transition: 'transform 0.3s ease, boxShadow 0.3s ease',
                      border: '1px solid #f1f5f9',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-10px)';
                      e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                    }}
                    onClick={() => router.push('/our-projects')}
                  >
                    <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                      <img
                        src={project.image}
                        alt={project.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>
                    <div style={{ padding: '24px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ color: '#0095AA', fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '1px' }}>
                        {project.type}
                      </div>
                      <h4 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1a2a5e', marginBottom: '12px', lineHeight: '1.2', textTransform: 'uppercase' }}>
                        {project.name}
                      </h4>
                      <p style={{ fontSize: '1rem', color: '#64748b', lineHeight: '1.6', margin: 0 }}>
                        {project.description}
                      </p>
                      <div style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '5px', color: '#0095AA', fontWeight: '700', fontSize: '0.9rem' }}>
                        Learn More <span>→</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        {/* PROJECTS GRID BELOW MAP */}

      </section>



      {/* EVENTS AT UNIFIED SECTION */}
      <section
        id="events"
        style={{
          background: '#fff',
          padding: '48px 0 32px 0',
          borderRadius: 16,
          margin: '40px 0',
          display: isSectionVisible('events') ? 'block' : 'none',
        }}
      >
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <h2 style={{ textAlign: 'center', fontSize: 32, fontWeight: 800, marginBottom: 8, color: '#1a2a5e' }}>Events at Unified</h2>
          <div style={{ textAlign: 'center', color: '#64748b', fontSize: 17, marginBottom: 28 }}>
            Moments that bring our teams together beyond project execution.
          </div>
          {/* Year Filter */}
          {loadingEvents ? (
            <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>Loading events...</div>
          ) : eventYears.length > 0 ? (
            <>
              <div
                className="mobile-filters-scrollbar"
                style={{
                  display: 'flex',
                  justifyContent: !isMobile ? 'center' : 'flex-start',
                  gap: 4,
                  marginBottom: 32,
                  overflowX: 'auto',
                  flexWrap: 'nowrap',
                  WebkitOverflowScrolling: 'touch',
                  paddingBottom: isMobile ? '12px' : '4px',
                }}
              >
                {eventYears.map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    style={{
                      flex: '0 0 auto',
                      border: 'none',
                      background: selectedYear === year ? '#0095AA' : '#f1f5f9',
                      color: selectedYear === year ? '#fff' : '#1a2a5e',
                      fontWeight: 700,
                      fontSize: 18,
                      padding: '10px 32px',
                      borderRadius: '8px 8px 0 0',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      minWidth: 'fit-content'
                    }}
                  >
                    {year}
                  </button>
                ))}
              </div>
              {/* Masonry Image Gallery */}
              <div style={{
                columnCount: isMobile ? 1 : (eventImages[selectedYear]?.length > 2 ? 3 : eventImages[selectedYear]?.length),
                columnGap: '18px',
                width: '100%',
              }}>
                {(eventImages[selectedYear] || []).map((img, idx) => (
                  <div key={img + idx} style={{
                    breakInside: 'avoid',
                    marginBottom: '18px',
                    borderRadius: 16,
                    overflow: 'hidden',
                    background: '#f8fafc',
                    boxShadow: '0 2px 8px #0001',
                    width: '100%',
                  }}>
                    <img
                      src={img}
                      alt={`Unified Event ${selectedYear} #${idx + 1}`}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px', color: '#64748b' }}>No events found for this year.</div>
          )}
        </div>
      </section>

      {/* LEADERSHIP Section */}
      {/* <section
        id="leadership"
        className={`relative py-[60px] md:py-[80px] px-[20px] md:px-[40px] min-h-[80vh] overflow-hidden bg-white ${isSectionVisible('leadership') ? 'block' : 'hidden'}`}
      > */}
      {/* Content */}
      {/* <div className="relative z-[1] max-w-[1400px] mx-auto px-0 md:px-[40px] min-[2500px]:max-w-[2200px]">
          <h2 style={{
            fontWeight: '900',
            color: '#1a2a5e',
            fontFamily: 'Anton, sans-serif',
            margin: '0 auto 0px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center'
          }} className="text-[clamp(2.5rem,7vw,5rem)] min-[2500px]:text-[8rem] min-[2500px]:mb-[40px]">
            LEADERSHIP
          </h2>

          <p style={{
            color: '#1a1a1a',
            lineHeight: '1.8',
            fontFamily: 'Segoe UI, sans-serif',
            fontWeight: '600',
            textAlign: 'center'
          }} className="text-[1.2rem] max-w-[1000px] mx-auto mb-[10px] min-[2500px]:text-3xl min-[2500px]:max-w-[1600px] min-[2500px]:mb-[80px]">
            Unified's leadership combines technical governance, execution discipline, and strategic planning. Each director operates with clearly defined accountability, ensuring quality, coordination, and consistency across every project.
          </p> */}

      {/* Urvesh Shah Profile Section */}
      {/* <div className="w-full py-[20px] mt-[80px]">
            <div className="max-w-[1400px] mx-auto px-[10px] md:px-[40px] min-[1024px]:max-[1324px]:pr-0 min-[2500px]:max-w-[2200px]">
              <div className="flex flex-col lg:flex-row relative w-full gap-[20px] md:gap-[40px] rounded-[30px] min-[1024px]:max-[1324px]:block"> */}
      {/* Left Side - Image */}
      {/* <div className="flex-[0_0_100%] md:flex-[0_0_45%] min-[1440px]:flex-[0_0_50%] min-[1024px]:max-[1324px]:flex-[0_0_35%] relative z-[1] flex items-end overflow-visible mt-[-100px] md:ml-[-40px] md:mt-[60px] max-[450px]:mt-[-140px] max-[450px]:mb-[-120px]"> */}
      {/* Background Text - URVESH SHAH */}
      {/* <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 md:left-[10px] md:translate-x-0 text-[clamp(3rem,8vw,7rem)] font-[900] text-black/5 font-anton tracking-[5px] uppercase z-0 pointer-events-none leading-[1.2] whitespace-nowrap w-max max-[450px]:top-[50px] min-[1460px]:max-[2499px]:top-[-100px] min-[2500px]:text-[12rem] min-[2500px]:top-[-100px] min-[2500px]:tracking-[10px] min-[2500px]:left-[200px] min-[1024px]:max-[1324px]:left-[120px] min-[1024px]:max-[1324px]:top-[20px] min-[1024px]:max-[1324px]:text-[7rem] min-[768px]:left-[40px] min-[768px]:text-[6rem]">
                    URVESH SHAH
                  </div>
                  <div className="w-full relative z-[1] top-[-100px] min-[1024px]:max-[1324px]:top-0 min-[2500px]:top-[-130px]">
                    <img
                      src="/assets/Urvesh sir.png"
                      alt="Urvesh Shah"
                      className="w-[100%] min-[1440px]:scale-[1] min-[1440px]:-top-[120px] min-[1440px]:-left-[80px] h-auto object-cover block mt-[60px] md:mt-0 ml-[40px] md:ml-[-10px] relative -top-[100px] max-[450px]:-top-[0px] max-[450px]:ml-[-40px] max-[400px]:mt-[80px] min-[1024px]:max-[1324px]:scale-[0.7] min-[1024px]:max-[1324px]:relative min-[1024px]:max-[1324px]:top-[-290px] min-[2500px]:scale-110 min-[1024px]:max-[1324px]:left-[-80px] min-[768px]:left-[-50px] min-[768px]:top-[-140px]"
                    />
                  </div>
                </div> */}

      {/* Right Side - Text Content */}
      {/* <div className="flex-1 p-[10px] relative z-[1] flex flex-col justify-center md:mt-[-320px] min-[1440px]:mt-[-380px] min-[1024px]:max-[1390px]:mt-[-460px] text-center md:text-left min-[2500px]:mt-[-300px] min-[2500px]:p-[0_120px_100px_300px] min-[1024px]:max-[1324px]:relative min-[1024px]:max-[1324px]:top-[-80px] min-[768px]:top-[-100px]">
                  {/* Name */}
      {/* <h3 className="text-center md:text-left text-[clamp(2rem,4vw,3rem)] font-[900] text-[#1a2a5e] font-anton tracking-[2px] uppercase min-[2500px]:text-[5rem]">
                    URVESH SHAH
                  </h3> */}

      {/* Title */}
      {/* <p className="text-[1.15rem] text-[#0095AA] m-[0_0_20px_0] font-['Segoe_UI'] font-[900] leading-none min-[2500px]:text-4xl min-[2500px]:mb-10">
                    Director – Business Development & Technical Strategy
                  </p> */}

      {/* Role & Responsibilities */}
      {/* <div className="mb-[10px] min-[2500px]:mb-8">
                    <h4 className="text-[1rem] font-[900] text-[#1a1a1a] m-[0_0_5px_0] font-['Segoe_UI'] uppercase tracking-[1px] min-[2500px]:text-3xl">
                      Role & Focus:
                    </h4>
                    <p className="text-[1.05rem] text-[#333] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl">Leads client engagement and strategic growth while ensuring every project’s commercial commitments are
                      aligned with technical feasibility and execution realities.</p>
                    <br />
                    <h4 className="text-[1rem] font-[900] text-[#1a1a1a] m-[0_0_5px_0] font-['Segoe_UI'] uppercase tracking-[1px] text-left min-[2500px]:text-3xl">
                      Key Responsibilities:
                    </h4>
                    <ul className="list-none p-0 m-0 text-left inline-block md:block min-[2500px]:mt-4">
                      <li className="text-[1.05rem] text-[#333] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl min-[2500px]:mb-4">
                        <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                        Drives business development and client relationships across residential and commercial PT projects
                      </li>
                      <li className="text-[1.05rem] text-[#333] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl min-[2500px]:mb-4">
                        <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                        Translates developer and consultant requirements into executable technical strategies
                      </li>
                      <li className="text-[1.05rem] text-[#333] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl min-[2500px]:mb-4">
                        <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                        Oversees material planning, sequencing, and supply coordination
                      </li>
                      <li className="text-[1.05rem] text-[#333] leading-[1.4] mb-[12px] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl">
                        <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                        Builds long-term partnerships with developers, consultants, and contractors
                      </li>
                    </ul>
                  </div> */}

      {/* Experience */}
      {/* <div className="min-[2500px]:mt-8">
                    <h4 className="text-[1rem] font-[900] text-[#1a1a1a] m-[0_0_5px_0] font-['Segoe_UI'] uppercase tracking-[1px] min-[2500px]:text-3xl">
                      Experience:
                    </h4>
                    <p className="text-[1.05rem] text-[#333] leading-[1.4] m-0 font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl">
                      Extensive experience in post-tensioning systems, client handling, and project coordination — bridging design intent with commercial and site execution.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

      {/* Sachin Patil Profile Section */}
      {/* <div className="w-full bg-[#f8fafc] py-[20px] mt-[-210px] max-[770px]:mt-[-10px] min-[1024px]:max-[1324px]:mt-[-20px]">
            <div className="max-w-[1400px] mx-auto px-[10px] md:px-[40px] min-[2500px]:max-w-[2200px]">
              <div className="flex flex-col lg:flex-row-reverse relative w-full gap-[20px] md:gap-[40px] rounded-[30px] min-[1024px]:max-[1324px]:block">
                {/* Right Side - Image */}
      {/* <div className="flex-[0_0_100%] md:flex-[0_0_45%] min-[1440px]:flex-[0_0_55%] relative z-[1] flex items-start overflow-visible mr-0 mt-[50px] ml-0 md:mr-[-40px] md:mt-[-30px] md:ml-[-80px] min-[1024px]:max-[1324px]:mt-0"> */}
      {/* Background Text - SACHIN PATIL */}
      {/* <div className="absolute top-[60px] md:top-auto left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[20px] text-[clamp(2.5rem,8vw,7rem)] font-[900] text-[#0000000d] font-anton tracking-[5px] uppercase z-0 pointer-events-none leading-[1.2] whitespace-nowrap w-max min-[2500px]:text-[10rem] min-[2500px]:right-[80px] min-[1024px]:max-[1324px]:top-[20px] min-[1024px]:max-[1324px]:left-[160px] min-[1024px]:max-[1324px]:right-auto min-[1024px]:max-[1324px]:text-[7rem] min-[768px]:top-[20px] min-[768px]:left-[100px] min-[768px]:text-[6rem]">
                    SACHIN PATIL
                  </div>
                  <div className="w-full relative z-[1] overflow-visible ml-0 md:ml-[-20px] min-[2500px]:ml-0">
                    <img
                      src="/assets/Sachin sir.png"
                      alt="Sachin Patil"
                      className="w-full min-[1440px]:scale-[1.2] min-[1440px]:relative min-[1440px]:-top-[-40px] h-auto object-cover block mt-[60px] md:mt-0 min-[2500px]:scale-110 min-[2500px]:translate-y-[30px] min-[2500px]:mt-[20px] min-[2500px]:ml-[-80px] min-[1024px]:max-[1324px]:scale-[0.8] min-[1024px]:max-[1324px]:relative min-[1024px]:max-[1324px]:top-[-60px]"
                    />
                  </div>
                </div> */}

      {/* Left Side - Text Content */}
      {/* <div className="flex-1 p-[10px_10px_10px_0px] md:p-[0px_80px_0px_0px] relative z-[1] flex flex-col justify-center text-center md:text-left min-[2500px]:p-[0_200px_0_120px] min-[1024px]:max-[1324px]:top-[-80px]">
                  {/* Name */}
      {/* <h3 className="text-center md:text-left text-[clamp(2rem,4vw,3rem)] font-[900] text-[#1a2a5e] font-anton tracking-[2px] uppercase min-[2500px]:text-[5rem] min-[1024px]:max-[1324px]:text-[4.5rem]">
                    SACHIN PATIL
                  </h3> */}

      {/* Title */}
      {/* <p className="text-[1.15rem] text-[#0095AA] m-[0_0_20px_0] font-['Segoe_UI'] font-[900] leading-none min-[2500px]:text-4xl min-[2500px]:mb-10 min-[1024px]:max-[1324px]:text-[1.8rem]">
                    Director – Quality Assurance & Technical Compliance
                  </p> */}

      {/* Role & Responsibilities */}
      {/* <div className="mb-[10px] min-[2500px]:mb-8">
                    <h4 className="text-[1rem] font-[900] text-[#1a1a1a] m-[0_0_5px_0] font-['Segoe_UI'] uppercase tracking-[1px] min-[2500px]:text-3xl">
                      Role & Focus:
                    </h4>
                    <p className="text-[1.05rem] text-[#333] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl">Custodian of quality, compliance, and system integrity across all post-tensioning operations.
                    </p>
                    <br />
                    <h4 className="text-[1rem] font-[900] text-[#1a1a1a] m-[0_0_5px_0] font-['Segoe_UI'] uppercase tracking-[1px] text-left min-[2500px]:text-3xl">
                      Key Responsibilities:
                    </h4>
                    <ul className="list-none p-0 m-0 text-left inline-block md:block min-[2500px]:mt-4">
                      <li className="text-[1.05rem] text-[#333] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl min-[2500px]:mb-4">
                        <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                        Ensures material traceability, testing protocols, and code compliance
                      </li>
                      <li className="text-[1.05rem] text-[#333] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl min-[2500px]:mb-4">
                        <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                        Reviews PT layouts, anchorage zones, stressing records, and as-built documentation
                      </li>
                      <li className="text-[1.05rem] text-[#333] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl min-[2500px]:mb-4">
                        <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                        Implements and monitors QA/QC systems across active project sites
                      </li>
                      <li className="text-[1.05rem] text-[#333] leading-[1.4] mb-[12px] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl">
                        <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                        Leads technical training for supervisors and execution teams
                      </li>
                    </ul>
                  </div>

                  {/* Experience */}
      {/* <div className="min-[2500px]:mt-8">
                    <h4 className="text-[1rem] font-[900] text-[#1a1a1a] m-[0_0_5px_0] font-['Segoe_UI'] uppercase tracking-[1px] min-[2500px]:text-3xl">
                      Experience:
                    </h4>
                    <p className="text-[1.05rem] text-[#333] leading-[1.4] m-0 font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl">
                      Strong background in PT quality control, system inspection, stressing documentation, and compliance management across bonded and unbonded systems.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div> */}

      {/* <div className="relative z-[1] max-w-[1400px] mx-auto px-0 md:px-[40px] min-[768px]:mt-[0px] mt-[60px] min-[2500px]:max-w-[2200px]"> */}
      {/* Akshay Patel Profile Section */}
      {/* <div className="relative w-full flex flex-col lg:flex-row gap-[20px] md:gap-[40px] min-h-auto md:min-h-[600px] mt-[0px] ml-0 md:ml-[30px] min-[1024px]:max-[1324px]:block"> */}
      {/* Left Side - Image */}
      {/* <div className="flex-[0_0_100%] md:flex-[0_0_35%] relative z-[1] flex items-end overflow-visible ml-0 md:ml-[-10px] mt-[-80px] md:mt-[-5px]">
                {/* Background Text - AKSHAY PATEL */}
      {/* <div className="absolute top-[110px] md:top-[100px] left-1/2 -translate-x-1/2 md:left-[-30px] md:translate-x-0 text-[clamp(2.5rem,8vw,7rem)] font-[900] text-[#0000000d] font-anton tracking-[5px] uppercase z-0 pointer-events-none leading-[1.2] whitespace-nowrap w-max min-[2500px]:text-[10rem] min-[2500px]:top-[130px] min-[2500px]:left-[40px] min-[1024px]:max-[1324px]:left-[30px] min-[1024px]:max-[1324px]:text-[7rem] min-[768px]:top-[140px] min-[768px]:left-[0px] min-[768px]:text-[6rem]">
                  AKSHAY PATEL
                </div>
                <div className="w-full relative z-[1] overflow-visible ml-0 md:ml-[0px] min-[1024px]:max-[1324px]:top-[-280px] min-[1024px]:max-[1324px]:ml-[-60px]">
                  <img
                    src="/assets/Akshay sir.png"
                    alt="Akshay Patel"
                    className="w-full h-auto object-cover block mt-[0px] ml-[40px] md:mt-[-60px] ml-0 md:ml-[30px] min-[1024px]:max-[1324px]:scale-[0.6] min-[2500px]:scale-110 min-[768px]:scale-[0.8] min-[768px]:top-[-40px]"
                  />
                </div>
              </div>

              {/* Right Side - Text Content */}
      {/* <div className="flex-1 p-[10px] relative z-[1] flex flex-col justify-center mt-[-100px] md:mt-[-180px] items-center text-center md:items-start md:text-left min-[2500px]:p-[0_120px_0_240px] min-[2500px]:mt-[-110px] min-[1024px]:max-[1324px]:mt-[-650px] min-[1024px]:max-[1324px]:pl-0">
                {/* Name */}
      {/* <h3 className="text-center md:text-left text-[clamp(2rem,4vw,3rem)] font-[900] text-[#1a2a5e] font-anton tracking-[2px] uppercase min-[2500px]:text-[5rem] min-[1024px]:max-[1324px]:text-[4.5rem]">
                  AKSHAY PATEL
                </h3> */}

      {/* Title */}
      {/* <p className="text-[1.15rem] text-[#0095AA] m-[0_0_20px_0] font-['Segoe_UI'] font-[900] leading-none min-[2500px]:text-4xl min-[2500px]:mb-10 min-[1024px]:max-[1324px]:text-[1.8rem]">
                  Director – Operations & Execution
                </p> */}

      {/* Role & Responsibilities */}
      {/* <div className="mb-[10px] min-[2500px]:mb-8">
                  <h4 className="text-[1rem] font-[900] text-[#1a1a1a] m-[0_0_5px_0] font-['Segoe_UI'] uppercase tracking-[1px] min-[2500px]:text-3xl">
                    Role & Focus:
                  </h4>
                  <p className="text-[1.05rem] text-[#333] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl">Leads on-site execution and delivery of post-tensioning systems with strict adherence to drawings, safety standards, and timelines.
                  </p>
                  <br />
                  <h4 className="text-[1rem] text-left font-[900] text-[#1a1a1a] m-[0_0_5px_0] font-['Segoe_UI'] uppercase tracking-[1px] min-[2500px]:text-3xl">
                    Key Responsibilities:
                  </h4>
                  <ul className="list-none p-0 m-0 text-left inline-block md:block min-[2500px]:mt-4">
                    <li className="text-[1.05rem] text-[#333] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl min-[2500px]:mb-4">
                      <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                      Manages PT execution teams across multiple project sites
                    </li>
                    <li className="text-[1.05rem] text-[#333] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl min-[2500px]:mb-4">
                      <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                      Ensures compliance with approved drawings and stressing procedures
                    </li>
                    <li className="text-[1.05rem] text-[#333] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl min-[2500px]:mb-4">
                      <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                      Oversees quality checks, safety practices, and slab cycle schedules
                    </li>
                    <li className="text-[1.05rem] text-[#333] leading-[1.4] mb-[12px] pl-[20px] relative font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl">
                      <span className="absolute left-0 text-[#0095AA] font-bold">•</span>
                      Coordinates closely with contractors and structural consultants
                    </li>
                  </ul>
                </div> */}

      {/* Experience */}
      {/* <div className="min-[2500px]:mt-8">
                  <h4 className="text-[1rem] font-[900] text-[#1a1a1a] m-[0_0_5px_0] font-['Segoe_UI'] uppercase tracking-[1px] min-[2500px]:text-3xl">
                    Experience:
                  </h4>
                  <p className="text-[1.05rem] text-[#333] leading-[1.4] m-0 font-['Segoe_UI'] font-[700] min-[2500px]:text-3xl">
                    Hands-on expertise in execution of bonded and unbonded PT systems, managing complex slab cycles, site logistics, and field operations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div >
      </section > */}

      {/* CERTIFICATION Section */}
      < section
        id="certification"
        className="relative py-[20px] px-[20px] md:px-[40px] md:pb-[100px] min-h-[60vh] overflow-hidden bg-white"
        style={{
          display: isSectionVisible('certification') ? 'block' : 'none'
        }}
      >

        {/* Content */}
        < div className="relative z-[1] max-w-[1400px] mx-auto px-0 md:px-[40px] min-[2500px]:max-w-[2200px]" >
          <h2 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: '900',
            color: '#1a2a5e',
            fontFamily: 'Anton, sans-serif',
            margin: '0 auto 40px md:margin-b-[60px]',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            textAlign: 'center'
          }} className="min-[2500px]:!text-[12rem] min-[2500px]:mb-32">
            CERTIFICATION
          </h2>

          {/* Main Content - Image Top (Mobile/MD), Image Right (Large) */}
          <div className="flex flex-col lg:flex-row-reverse gap-[40px] lg:gap-[60px] items-center lg:items-start mb-[40px] md:mb-[60px]">
            {/* ISO Logo */}
            <div className="w-full lg:flex-[0_0_400px] flex justify-center items-start pt-[20px] min-[2500px]:flex-[0_0_900px] min-[2500px]:pt-0 min-[2500px]:items-center">
              <img
                src="/assets/iso-certified-company-stamp-logo-png_seeklogo-556487.png"
                alt="ISO Certified Company"
                className="w-full max-w-[250px] md:max-w-[400px] h-auto object-contain min-[2500px]:max-w-[700px]"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 flex flex-col gap-[20px] md:gap-[25px] indent-[2em] text-left min-[2500px]:max-w-[1200px]">
              <p className="text-[1rem] text-justify md:text-[1.1rem] text-[#333] m-0 font-['Segoe_UI'] font-[600] min-[2500px]:text-4xl">
                <strong>Unified Post-Tensioning Systems LLP</strong> operates under a structured Quality Management System aligned with <strong>ISO 9001:2015</strong> standards.
              </p>

              <p className="text-[1rem] text-justify md:text-[1.1rem] text-[#333] m-0 font-['Segoe_UI'] font-[600] min-[2500px]:text-4xl">
                Our processes are built to ensure consistency, traceability, and engineering accountability across design, material handling, site execution and project handover.
              </p>

              <h3 className="text-[1.3rem] md:text-[1.5rem] font-[700] text-[#1a2a5e] my-[15px] md:my-[20px] font-['Segoe_UI'] indent-0 text-center md:text-left min-[2500px]:text-5xl min-[2500px]:my-16">
                Quality Policy
              </h3>

              <p className="text-[1rem] text-justify md:text-[1.1rem] text-[#333] m-0 font-['Segoe_UI'] font-[600] min-[2500px]:text-4xl">
                At Unified, quality is not treated as documentation compliance – it is embedded into how we design, plan, execute, and review every post-tensioning system.
              </p>

              <p className="text-[1rem] text-justify md:text-[1.1rem] text-[#333] m-0 font-['Segoe_UI'] font-[600] min-[2500px]:text-4xl">
                We are committed to delivering dependable post-tensioning solutions by:
              </p>

              <ul className="list-none p-0 m-0 flex flex-col gap-[10px] md:gap-[12px] indent-0">
                <li className="text-[1rem] text-justify md:text-[1.1rem] text-[#333] pl-[30px] relative font-['Segoe_UI'] font-[600] min-[2500px]:text-4xl min-[2500px]:pl-16">
                  <span className="absolute left-0 text-[#0095AA] text-[1.2rem] min-[2500px]:text-4xl">✓</span>
                  Clearly understanding project-specific structural and execution requirements.
                </li>
                <li className="text-[1rem] text-justify md:text-[1.1rem] text-[#333] pl-[30px] relative font-['Segoe_UI'] font-[600] min-[2500px]:text-4xl min-[2500px]:pl-16">
                  <span className="absolute left-0 text-[#0095AA] text-[1.2rem] min-[2500px]:text-4xl">✓</span>
                  Providing technically appropriate, engineer-approved PT system solutions.
                </li>
                <li className="text-[1rem] text-justify md:text-[1.1rem] text-[#333] pl-[30px] relative font-['Segoe_UI'] font-[600] min-[2500px]:text-4xl min-[2500px]:pl-16">
                  <span className="absolute left-0 text-[#0095AA] text-[1.2rem] min-[2500px]:text-4xl">✓</span>
                  Supplying certified, durable materials with controlled quality checks.
                </li>
                <li className="text-[1rem] text-justify md:text-[1.1rem] text-[#333] pl-[30px] relative font-['Segoe_UI'] font-[600] min-[2500px]:text-4xl min-[2500px]:pl-16">
                  <span className="absolute left-0 text-[#0095AA] text-[1.2rem] min-[2500px]:text-4xl">✓</span>
                  Adhering to applicable codes, standards, and consultant specifications.
                </li>
                <li className="text-[1rem] text-justify md:text-[1.1rem] text-[#333] pl-[30px] relative font-['Segoe_UI'] font-[600] min-[2500px]:text-4xl min-[2500px]:pl-16">
                  <span className="absolute left-0 text-[#0095AA] text-[1.2rem] min-[2500px]:text-4xl">✓</span>
                  Maintaining disciplined execution practices at site level.
                </li>
                <li className="text-[1rem] text-justify md:text-[1.1rem] text-[#333] pl-[30px] relative font-['Segoe_UI'] font-[600] min-[2500px]:text-4xl min-[2500px]:pl-16">
                  <span className="absolute left-0 text-[#0095AA] text-[1.2rem] min-[2500px]:text-4xl">✓</span>
                  Continuously improving processes based on audits, feedback, and performance reviews.
                </li>
              </ul>
            </div>
          </div>

          <section className="relative w-full bg-white py-[40px] min-h-[180px] overflow-hidden">

            <div ref={lightRef} className="pointer-events-none absolute inset-0 z-10" />

            <div className="relative z-30 w-full overflow-hidden">
              <div className="flex w-max animate-slideBanner">
                {[0, 1].map((_, loopIndex) => (
                  <div key={loopIndex} className="flex items-center pl-8 whitespace-nowrap">
                    <img
                      src="/assets/icon.png"
                      alt="icon"
                      width={80}
                      height={80}
                      className="animate-rotateAsterisk object-contain mr-6 min-[2500px]:w-[150px] min-[2500px]:h-[150px] min-[2500px]:mr-12"
                    />

                    <span className="text-[4.2rem] font-bold tracking-[2px] font-anton text-gray-400 min-[2500px]:text-[8rem]">
                      {TEXT.split('').map((char, i) => (
                        <span
                          key={i}
                          className="inline-block transition-all duration-300 hover:scale-[1.3] hover:text-[#0095AA] hover:drop-shadow-[0_0_8px_rgba(0,149,170,0.6)] cursor-default"
                        >
                          {char === ' ' ? '\u00A0' : char}
                        </span>
                      ))}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </section>
        </div >
      </section >
    </div >
  );
} 