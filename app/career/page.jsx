// Hide navbar when modal is open

"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Image from "next/image";

import { motion, AnimatePresence } from 'framer-motion';

import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

const Careers = () => {

  const router = useRouter();


  const [activeCity, setActiveCity] = useState(null);
  const [activeSection, setActiveSection] = useState("project-reach-portfolio");
  const [currentHash, setCurrentHash] = useState("");
  const [isClient, setIsClient] = useState(false);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});

  const TEXT = 'BUILT ON ENGINEERING DELIVERED WITH CERTAINTY'
  const lightRef = useRef(null);


  const cities = [
    {
      id: 'delhi',
      name: 'New Delhi',
      lat: 28.6139,
      lng: 77.2090,
      type: 'capital',
      description: 'The capital of India, a sprawling metropolitan area in the north. A historic city featuring iconic landmarks like the Red Fort, India Gate, and Qutub Minar, blending ancient history with modern governance.',
      image: 'https://images.unsplash.com/photo-1585464231875-d9ef1f5ad396?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'mumbai',
      name: 'Mumbai',
      lat: 19.0760,
      lng: 72.8777,
      type: 'finance',
      description: 'The financial powerhouse and home of Bollywood. Mumbai is a city of dreams, known for its vibrant street life, Marine Drive, and the historic Gateway of India overlooking the Arabian Sea.',
      image: 'https://images.unsplash.com/photo-1562337590-8957b1efac63?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'bengaluru',
      name: 'Bengaluru',
      lat: 12.9716,
      lng: 77.5946,
      type: 'tech',
      description: 'Known as the Silicon Valley of India, Bengaluru is famous for its pleasant climate, lush green parks, and thriving tech scene. A hub for innovation and cosmopolitan culture.',
      image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'hyderabad',
      name: 'Hyderabad',
      lat: 17.3850,
      lng: 78.4867,
      type: 'tech',
      description: 'The City of Pearls, known for its rich history, biryani, and growing IT sector. Home to historic monuments like Charminar and modern tech parks.',
      image: 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'chennai',
      name: 'Chennai',
      lat: 13.0827,
      lng: 80.2707,
      type: 'culture',
      description: 'The cultural capital of South India, known for its classical music, temples, and beautiful Marina Beach. A major economic and educational hub.',
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'kolkata',
      name: 'Kolkata',
      lat: 22.5726,
      lng: 88.3639,
      type: 'culture',
      description: 'The City of Joy, known for its intellectual heritage, colonial architecture, and vibrant arts scene. Home to the iconic Howrah Bridge and Victoria Memorial.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'pune',
      name: 'Pune',
      lat: 18.5204,
      lng: 73.8567,
      type: 'tech',
      description: 'The Oxford of the East, known for its educational institutions, pleasant weather, and growing IT industry. A perfect blend of tradition and modernity.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'ahmedabad',
      name: 'Ahmedabad',
      lat: 23.0225,
      lng: 72.5714,
      type: 'business',
      description: 'The Manchester of India, known for its textile industry, business acumen, and rich cultural heritage. Home to the Sabarmati Ashram.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'jaipur',
      name: 'Jaipur',
      lat: 26.9124,
      lng: 75.7873,
      type: 'culture',
      description: 'The Pink City, known for its stunning palaces, forts, and vibrant markets. A major tourist destination showcasing Rajasthan\'s royal heritage.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 'surat',
      name: 'Surat',
      lat: 21.1702,
      lng: 72.8311,
      type: 'business',
      description: 'The Diamond City of India, known for its diamond cutting and polishing industry, textile manufacturing, and rapid urban development.',
      image: 'https://images.unsplash.com/photo-1582979512210-99b6a53386f9?auto=format&fit=crop&q=80&w=800'
    }
  ];

  const handleCityClick = (city) => {
    setActiveCity(city);
    if (mapInstance.current) {
      mapInstance.current.flyTo([city.lat, city.lng], 7, {
        duration: 1.5,
        easeLinearity: 0.25
      });
    }
  };

  const closePanel = () => {
    setActiveCity(null);
    if (mapInstance.current) {
      mapInstance.current.flyTo([22.9734, 78.6569], 5, {
        duration: 1.5
      });
    }
  };

  useEffect(() => {
    setIsClient(true);
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
          `;
          document.head.appendChild(style);
        }

        // Initialize Map
        mapInstance.current = window.L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
          scrollWheelZoom: false
        }).setView([22.9734, 78.6569], 5);

        // Standard OSM Tiles
        window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19
        }).addTo(mapInstance.current);

        mapInstance.current.invalidateSize();

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
          markersRef.current[city.id] = marker;

          marker.on('click', () => {
            handleCityClick(city);
          });
        });
      }
    };

    const timer = setTimeout(() => {
      if (window.L) {
        initializeMap();
      }
    }, 500);

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
        if (timer) clearTimeout(timer);
        observer.disconnect();
        if (mapInstance.current) {
          mapInstance.current.remove();
          mapInstance.current = null;
        }
      };
    }

    return () => {
      if (timer) clearTimeout(timer);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [isClient]);

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


  const formRef = useRef(null);

  const [selectedJob, setSelectedJob] = useState(null);
  const [expandedJob, setExpandedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    resume: null,
  });

  const [openPositions, setOpenPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState({ loading: false, success: false, error: '' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
        const fetchUrl = process.env.NODE_ENV === 'development' ? '/api-proxy' : apiUrl;
        const response = await fetch(`${fetchUrl}/job-openings`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        const data = await response.json();
        setOpenPositions(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  const benefits = [
    'Market-leading compensation',
    'Health & accident insurance',
    'Career advancement roadmap',
    'Paid certifications',
    'Balanced work culture',
    'Elite engineering team',
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({ ...formData, [name]: files ? files[0] : value });
  };

  const handleApply = (title) => {
    setFormData((prev) => ({ ...prev, position: title }));
    setSelectedJob(title);
  };

  const closeForm = () => {
    setSelectedJob(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      resume: null,
    });
    setSubmitStatus({ loading: false, success: false, error: '' });
  };

  const toggleJobDetails = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ loading: true, success: false, error: '' });

    const data = new FormData();
    data.append('name', formData.name);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('position', formData.position);
    if (formData.resume) {
      data.append('resume', formData.resume);
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
      const fetchUrl = process.env.NODE_ENV === 'development' ? '/api-proxy' : apiUrl;
      const response = await fetch(`${fetchUrl}/job-applications`, {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Backend error:', errorData);
        throw new Error(errorData.message || 'Failed to submit application');
      }

      setSubmitStatus({ loading: false, success: true, error: '' });
      alert('Application submitted successfully!');
      closeForm();
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus({ loading: false, success: false, error: 'Failed to submit application. Please try again later.' });
      alert('Failed to submit application. Please try again later.');
    }
  };

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape' && selectedJob) {
        closeForm();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [selectedJob]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const body = document.body;
    if (selectedJob) {
      body.classList.add('hide-navbar');
    } else {
      body.classList.remove('hide-navbar');
    }
    return () => {
      body.classList.remove('hide-navbar');
    };
  }, [selectedJob]);

  return (
    <div className="bg-[#f7fafc]">
      {/* HERO */}
      <section className="relative min-h-[50vh] max-h-[50vh] flex flex-col justify-center items-center overflow-hidden">

        {/* Background Video */}
        <video
          key="career-video"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source
            src="/assets/career.mp4"
            type="video/mp4"
          />
        </video>

        {/* Overlay Layer */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,149,170,0.6)] z-[0.5]"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 pb-12">
          {/* Main Heading */}
          <h1 className="text-white text-shadow-lg tracking-wider font-anton font-normal text-[clamp(3rem,8vw,6rem)] font-black">
            CAREER AT UNIFIED
          </h1>

          {/* Paragraph */}


        </div>


        <div className="absolute bottom-0 left-0 w-full bg-[#0095AA] overflow-hidden z-20 mt-20">
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
                    className="inline-flex items-center px-10 py-4 text-lg md:text-xl font-semibold text-white tracking-wide"
                  >
                    {text}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </section>
      {/* News Ticker */}



      <section className="w-full bg-[#f6f8f9] py-20">

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

            {/* LEFT CONTENT */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#1a2a5e] mb-6">
                Meet the Team Behind Our Success
              </h2>

              <p className="text-gray-600 text-justify leading-relaxed mb-5">
                At Unified, our strength lies in the people who plan,
                execute, and deliver post-tensioning systems with
                precision and accountability.
              </p>

              <p className="text-gray-600 text-justify leading-relaxed mb-5">
                Our teams include engineers, execution specialists,
                supervisors, and support functions working together to
                ensure every project meets structural intent and quality
                expectations.
              </p>

              <p className="text-gray-700 text-justify font-medium">
                We believe strong structures are built by strong teams,
                aligned in purpose and responsibility.
              </p>
            </div>

            {/* RIGHT IMAGE */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/assets/Group-Photo.png" // image path
                  alt="Team Meeting"
                  width={700}
                  height={450}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>


      <section className="bg-[#f6f8f9] py-10 md:py-20">
        <div className="max-w-9xl mx-auto px-4 md:px-6">

          {/* Outer White Container */}
          <div className="max-w-9xl mx-auto">
            {/* Inner Gradient Box */}
            <div className="relative animate-gradient rounded-3xl shadow-xl p-6 md:p-12">
              {/* Heading */}
              <h2 className="text-2xl md:text-4xl font-semibold text-center text-[#1b3437] mb-8 md:mb-14">
                Why Work With Unified
              </h2>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                {/* Card 1 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className="text-[#2f7e89]">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 21h18M6 21V7l6-4 6 4v14M9 21v-6h6v6" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-[#1b3437] mb-2">
                        Engineering-Driven Culture
                      </h3>

                    </div>
                  </div>
                  <p className="text-gray-600 text-justify leading-relaxed text-sm md:text-base">
                    We prioritise technical clarity, correct detailing, and disciplined execution over shortcuts.
                  </p>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="text-[#2f7e89]">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M3 10h18M4 6h16M4 14h16M6 18h12" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-[#1b3437] mb-2">
                        Exposure to Complex Projects
                      </h3>

                    </div>
                  </div>
                  <p className="text-gray-600 text-justify leading-relaxed text-sm md:text-base">
                    Work on residential, commercial, podium, and long-span structures across multiple regions.
                  </p>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="text-[#2f7e89]">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M12 6v6l4 2M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-[#1b3437] mb-2">
                        Learning Through Real Execution
                      </h3>

                    </div>
                  </div>
                  <p className="text-gray-600 text-justify leading-relaxed text-sm md:text-base">
                    Hands-on exposure to site execution, coordination, and system behaviour — not just desk work.
                  </p>
                </div>

                {/* Card 4 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="text-[#2f7e89]">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 12h6m-6 4h6m-7 4h8a2 2 0 002-2V6a2 2 0 00-2-2H9l-3 3v11a2 2 0 002 2z" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-[#1b3437] mb-2">
                        Structured Processes & Accountability
                      </h3>

                    </div>
                  </div>
                  <p className="text-gray-600 text-justify leading-relaxed text-sm md:text-base">
                    Clear roles, defined workflows, and responsibility at every level.
                  </p>
                </div>

                {/* Card 5 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="text-[#2f7e89]">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-[#1b3437] mb-2">
                        Growth with Responsibility
                      </h3>

                    </div>
                  </div>
                  <p className="text-gray-600 text-justify leading-relaxed text-sm md:text-base">
                    Performance and commitment are recognised through increased responsibility and career growth.
                  </p>
                </div>

                {/* Card 6 */}
                <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md">
                  <div className="flex items-start gap-4">
                    <div className="text-[#2f7e89]">
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>

                    <div>
                      <h3 className="text-lg md:text-xl font-semibold text-[#1b3437] mb-2">
                        Respect for Quality & Safety
                      </h3>

                    </div>
                  </div>
                  <p className="text-gray-600 text-justify leading-relaxed text-sm md:text-base">
                    Quality and safety are non-negotiable — they are part of how we work every day.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>

        <style jsx global>{`
    @keyframes gradientRotate {
      0% { background-position: 0% 50%; }
      25% { background-position: 50% 0%; }
      50% { background-position: 100% 50%; }
      75% { background-position: 50% 100%; }
      100% { background-position: 0% 50%; }
    }
    .animate-gradient {
      background: linear-gradient(45deg, white 0%, rgba(135, 206, 235, 0.3) 25%, white 50%, rgba(135, 206, 235, 0.3) 75%, white 100%);
      background-size: 400% 400%;
      animation: gradientRotate 20s ease-in-out infinite;
    }
    body.hide-navbar header,
    body.hide-navbar div[class*="h-[110px]"] {
      display: none !important;
    }
  `}</style>
      </section>

      <section className="bg-[#f5f5f3] py-24">
        <div className="max-w-6xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center mb-14">
            <h2 className="text-4xl font-semibold text-gray-900">
              Current Open Positions
            </h2>
            <p className="mt-4  text-gray-600 max-w-3xl mx-auto">
              We are always looking for motivated professionals who are eager to learn,
              contribute, and grow within the post-tensioning and construction engineering domain.
            </p>
          </div>

          {/* Cards List - FAQ Style */}
          <div className="max-w-4xl mx-auto space-y-4">

            {openPositions.map((job) => (
              <motion.div
                key={job.id}
                className="bg-white rounded-2xl shadow-[0_10px_25px_rgba(0,0,0,0.08)] overflow-hidden transition-all duration-300"
                initial={false}
              >
                {/* Card Header - Always Visible */}
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        {job.experience}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleJobDetails(job.id)}
                    className="flex-shrink-0 flex items-center gap-2 bg-[#0095aa] hover:bg-[#256b77] text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    {expandedJob === job.id ? 'Hide Details' : 'View Details'}
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ rotate: expandedJob === job.id ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </motion.svg>
                  </button>
                </div>

                {/* Expandable Content - FAQ Style */}
                <AnimatePresence initial={false}>
                  {expandedJob === job.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 border-t border-gray-100">
                        <div className="pt-4">
                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-[#1a2a5e] mb-2">Job Description</h4>
                            <div
                              className="text-gray-600 text-justify leading-relaxed mb-4 prose max-w-none"
                              dangerouslySetInnerHTML={{ __html: job.description }}
                            />
                          </div>

                          <button
                            onClick={() => handleApply(job.title)}
                            className="w-full flex items-center justify-center gap-2 bg-[#0095aa] hover:bg-[#007a8c] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                          >
                            Apply Now
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M5 12h14M13 5l6 7-6 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* Application Form Modal/Popup */}
      <AnimatePresence>
        {selectedJob && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeForm}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full my-4"
              >

                {/* Modal Header */}
                <div className="bg-[#0095AA] text-white px-8 py-4 rounded-t-2xl flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold mb-1">
                      Apply Now
                    </h2>
                    <p className="text-sm text-white/90">
                      {selectedJob}
                    </p>
                  </div>
                  <button
                    onClick={closeForm}
                    className="text-white hover:bg-white/20 rounded-full p-2 transition-all duration-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-4">

                  {/* Name Field */}
                  <div className="mb-3">
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0095AA] focus:border-transparent outline-none transition"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="mb-3">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0095AA] focus:border-transparent outline-none transition"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="mb-3">
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0095AA] focus:border-transparent outline-none transition"
                      placeholder="+91 XXXXX XXXXX"
                    />
                  </div>

                  {/* Position Field (Read-only) */}
                  <div className="mb-3">
                    <label htmlFor="position" className="block text-sm font-semibold text-gray-700 mb-2">
                      Position Applied For
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={formData.position}
                      readOnly
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                    />
                  </div>

                  {/* Resume Upload */}
                  <div className="mb-4">
                    <label htmlFor="resume" className="block text-sm font-semibold text-gray-700 mb-2">
                      Upload Resume <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      id="resume"
                      name="resume"
                      onChange={handleChange}
                      required
                      accept=".pdf,.doc,.docx"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#0095AA] focus:border-transparent outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0095AA] file:text-white hover:file:bg-[#007a8c] file:cursor-pointer"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 mt-2">
                    <button
                      type="submit"
                      disabled={submitStatus.loading}
                      className="flex-1 bg-[#0095AA] hover:bg-[#007a8c] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitStatus.loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                    <button
                      type="button"
                      onClick={closeForm}
                      className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                    >
                      Cancel
                    </button>
                  </div>

                </form>

              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>



    </div>
  );
};

export default Careers;
