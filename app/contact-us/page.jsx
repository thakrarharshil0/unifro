"use client";

import {
  Mail,
  Phone,
  MapPin,
  User,
  MessageSquare,
  Clock,
  HelpCircle,
  Download,
  Send,
  Building
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import PremiumSpotlightText from "@/components/PremiumSpotlightText";
import 'leaflet/dist/leaflet.css';
import { useRef } from "react";
import BrochureModal from "@/components/BrochureModal";




export default function ContactPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentHash, setCurrentHash] = useState("");
  const [activeSection, setActiveSection] = useState('overview');
  const [mapReady, setMapReady] = useState(false);
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markersRef = useRef({});
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load Leaflet library dynamically if not available
    if (!window.L && !document.getElementById('leaflet-script')) {
      const leafletScript = document.createElement('script');
      leafletScript.id = 'leaflet-script';
      leafletScript.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      leafletScript.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
      leafletScript.crossOrigin = '';
      document.head.appendChild(leafletScript);
    }

    const checkLeaflet = setInterval(() => {
      if (window.L) {
        clearInterval(checkLeaflet);
        if (mapRef.current && !mapInstance.current) {
          mapInstance.current = window.L.map(mapRef.current, {
            zoomControl: true,
            attributionControl: false,
            scrollWheelZoom: false
          }).setView([22, 78], 5);

          window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
            subdomains: 'abcd',
            maxZoom: 19
          }).addTo(mapInstance.current);

          // Add Markers
          const locations = [
            { name: "Mumbai (Head Office)", lat: 19.11123, lng: 72.91829, color: "red" },
            { name: "Hyderabad", lat: 17.4338, lng: 78.4877, color: "yellow" },
            { name: "Vadodara", lat: 22.3167, lng: 73.1678, color: "yellow" },
            { name: "Pune", lat: 18.6298, lng: 73.8446, color: "yellow" },
            { name: "Indore", lat: 22.7533, lng: 75.8948, color: "yellow" },
            { name: "Lucknow", lat: 26.8500, lng: 81.0210, color: "yellow" },
          ];

          locations.forEach(loc => {
            const customIcon = window.L.divIcon({
              className: 'custom-marker',
              html: `
                <div class="marker-wrapper color-${loc.color}">
                  <div class="marker-label">${loc.name}</div>
                  <div class="marker-pin"></div>
                </div>
              `,
              iconSize: [30, 30],
              iconAnchor: [15, 15]
            });

            window.L.marker([loc.lat, loc.lng], { icon: customIcon })
              .addTo(mapInstance.current)
              .bindPopup(`<b>${loc.name}</b>`);
          });

          setMapReady(true);
        }
      }
    }, 100);

    return () => {
      clearInterval(checkLeaflet);
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentHash(window.location.hash);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);




  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  const getVideoSrc = () => {
    return '/assets/contact-us.mp4';
  };

  const getHeadingText = () => {
    return 'CONTACT US';
  };

  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const currentTime = now.getHours() + now.getMinutes() / 60;


  const faqs = [
    {
      q: "What is Post Tensioning?",
      a: "Post Tensioning is a prestressed concrete system in which steel tendons are tensioned after the concrete has gained sufficient strength."
    },
    {
      q: "What is the difference between Post Tensioning and Pre-Tensioning?",
      a: "In Post Tensioning tendons are stressed after concreting, whereas in Pre-Tensioning they are stressed before casting."
    },
    {
      q: "What is bonded and unbonded Post Tensioning?",
      a: "Bonded Post Tensioning uses grouted tendons while unbonded Post Tensioning uses greased and sheathed free tendons."
    },
    {
      q: "What are the advantages of Post Tensioning?",
      a: "Advantages include thinner concrete sections, longer spans, reduced cracking, and overall material savings, leading to more flexible and economical designs."
    },
    {
      q: "Where is Post Tensioning commonly used?",
      a: "It is widely used in buildings, bridges, parking structures, slabs-on-ground, and containment tanks to create more efficient and durable structures."
    },
    {
      q: "Is Post Tensioning sustainable?",
      a: "Yes, by optimizing material use and reducing the amount of concrete and steel required, Post Tensioning contributes to more sustainable construction practices."
    }
  ];

  const leftFaqs = faqs.slice(0, 3);
  const rightFaqs = faqs.slice(3, 6);

  let statusText = "Closed";
  let statusColor = "text-red-400";
  let dotColor = "bg-red-400";


  if (day >= 1 && day <= 5) {
    // Monday–Friday (9 AM – 6 PM)
    if (currentTime >= 9 && currentTime < 18) {
      statusText = "Open Now";
      statusColor = "text-green-400";
      dotColor = "bg-green-400";
    }
  } else if (day === 6) {
    // Saturday (10 AM – 4 PM)
    if (currentTime >= 10 && currentTime < 16) {
      statusText = "Open Now";
      statusColor = "text-green-400";
      dotColor = "bg-green-400";
    }
  } else {
    statusText = "Closed Today";
  }

  const cities = [
    {
      name: "Hyderabad",
      address: "Pramukh Residency, 5th Floor, Plot No.38, D.V. Colony, Minister Road, Hyderabad, Telangana - 500003",
    },
    {
      name: "Vadodara",
      address: "702-703, Block 1A, East Avenue, Sarabhai Campus, Dr. Vikram Sarabhai Marg, Near Genda Circle, Vadodara, Gujarat-390023",
    },
    {
      name: "Pune",
      address: "Office No.126, G- Wing, Jay Ganesh Samarajya, Spine Road, Bhosari, Pune 411039",
    },
    {
      name: "Indore",
      address: "A-88 Pt. Dindayal Upadhyay Nagar Sukhliya, Indore, Madhya Pradesh-452010",
    },
    {
      name: "Lucknow",
      address: "5/1215, Viram Khand, Gomti Nagar, Lucknow (U.P) 226010",
    },
  ];

  return (
    <main className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[50vh] max-h-[50vh] flex flex-col justify-center items-center overflow-hidden">
        {/* Background Video */}
        <video
          key={currentHash}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        >
          <source src={getVideoSrc()} type="video/mp4" />
        </video>

        {/* Overlay Layer */}
        <div className="absolute top-0 left-0 w-full h-full bg-[rgba(0,149,170,0.7)] z-10"></div>

        {/* Main Heading */}
        <h1 className="text-[clamp(3rem,8vw,6rem)] min-[2500px]:text-[10rem] font-black text-white text-center mx-auto z-20 relative drop-shadow-lg tracking-wider font-anton font-normal">
          {getHeadingText()}
        </h1>


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
                    className="inline-flex items-center px-10 min-[2500px]:px-20 py-4 min-[2500px]:py-8 text-lg md:text-xl min-[2500px]:text-3xl font-semibold text-white tracking-wide"
                  >
                    {text}
                  </span>
                ))}
            </div>
          </div>
        </div>

      </section>
      <div className="container mx-auto px-4 mt-[4rem] min-[2500px]:mt-48 pb-24">
        <div className="max-w-5xl min-[2500px]:max-w-[2000px] mx-auto">
          {/* Tagline Row - Left Aligned to Form Column */}
          {/* <div className="md:w-[calc(100%-350px-1.5rem)] mb-6 min-[2500px]:mb-12">
            <h3 className="text-[#0095aa] text-center text-xs md:text-sm min-[2500px]:text-2xl font-bold uppercase tracking-[0.3em] px-2">
              Let’s Build Stronger Structures Together with Expert PT Design & Execution
            </h3>
          </div> */}

          <div className="flex flex-col lg:flex-row gap-12 items-start">
            {/* Form Column - Sticky */}
            <div className="flex-1 w-full lg:sticky lg:top-24 ">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="w-full bg-white rounded-2xl shadow-xl p-10 min-[2500px]:p-20 z-10 border border-gray-100"
              >
                <div className="text-left mb-10">
                  <p className="text-[#1a2a5e] text-2xl min-[2500px]:text-7xl font-bold italic mb-6 tracking-wide">
                    Share your project details and our team will get back to you shortly.
                  </p>
                  {/* <h2 className="text-4xl min-[2500px]:text-6xl font-bold text-[#1a2a5e]">Send a Message</h2> */}
                </div>
                <form className="space-y-6" onSubmit={async (e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    message: formData.get('message'),
                  };

                  try {
                    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
                    const fetchUrl = process.env.NODE_ENV === 'development' ? '/api-proxy' : apiUrl;
                    const res = await fetch(`${fetchUrl}/contact-us`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(data),
                    });
                    if (res.ok) {
                      alert('Message sent successfully!');
                      e.target.reset();
                    } else {
                      alert('Failed to send message.');
                    }
                  } catch (err) {
                    console.error(err);
                    alert('Error sending message.');
                  }
                }}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <FloatingInput label="Your Name" name="name" icon={<User size={18} />} required />
                    <FloatingInput label="Email Address" name="email" type="email" icon={<Mail size={18} />} required />
                  </div>
                  <FloatingInput label="Phone Number" name="phone" type="tel" icon={<Phone size={18} />} required pattern="[6-9]{1}[0-9]{9}" />
                  <FloatingTextarea label="Your Message" name="message" icon={<MessageSquare size={18} />} required />
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-[#0095aa] hover:bg-[#007f91] text-white px-10 min-[2500px]:px-20 py-5 min-[2500px]:py-10 rounded-full font-bold text-lg min-[2500px]:text-3xl transition-all duration-300 hover:scale-[1.02] shadow-lg"
                  >
                    <Send size={18} className="min-[2500px]:size-8" />
                    Submit Message
                  </button>
                </form>
              </motion.div>
            </div>

            {/* Info Column */}
            <div className="w-full lg:w-[400px] min-[2500px]:w-[600px] flex flex-col gap-10">
              {/* Primary Contact */}
              <div className="flex flex-col gap-6">
                <h4 className="text-[#1a2a5e] text-2xl min-[2500px]:text-3xl font-black border-b-2 pb-2 uppercase border-black tracking-tighter">Get in Touch</h4>
                <div className="flex flex-col gap-6">
                  <ContactItem icon={<Mail size={22} />} title="Email Support" value="unifiedpts@gmail.com" />
                  <ContactItem icon={<Phone size={22} />} title="Contact Number" value="+91 95740 76889" />
                  <ContactItem icon={<Building size={22} />} title="Head Office - Mumbai" value="C-1804-1807, Kailash Business Park, Vikhroli West, Mumbai - 400079" isHeadOffice={true} />

                  {/* Head Office Map Embed */}
                  <div className="mt-4 w-full h-[220px] min-[2500px]:h-[400px] rounded-2xl overflow-hidden shadow-md border-2 border-[#0095aa]/10 transition-all hover:border-[#0095aa]/30">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.0163351989065!2d72.91829!3d19.11123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c7f763f68349%3A0xc023f03403248384!2sKailash%20Business%20Park!5e0!3m2!1sen!2sin!4v1710570000000!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Branch Offices */}
              <div className="flex flex-col gap-6">
                <h4 className="text-[#1a2a5e] text-2xl min-[2500px]:text-3xl font-black border-b-2 pb-2 uppercase border-black tracking-tighter">Our Branch Offices</h4>
                <div className="grid gap-6">
                  {cities.map((city, idx) => (
                    <ContactItem key={idx} icon={<MapPin size={20} />} title={city.name} value={city.address} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Brochure Download Section */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-5xl min-[2500px]:max-w-[2000px] mx-auto">
          <div className="bg-white backdrop-blur-sm rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-gray-200 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center gap-6">
              <div className="bg-[#0095aa]/10 p-4 rounded-full min-[2500px]:p-8">
                <HelpCircle size={32} className="text-[#0095aa] min-[2500px]:size-16" />
              </div>
              <div>
                <h3 className="text-[#1a2a5e] text-2xl md:text-3xl min-[2500px]:text-6xl font-black mb-2 tracking-tight">Need more details?</h3>
                <p className="text-gray-600 text-lg md:text-xl min-[2500px]:text-4xl font-medium">For more information, download our brochure now.</p>
              </div>
            </div>
            <button
              onClick={() => setIsBrochureModalOpen(true)}
              className="flex items-center justify-center gap-3 bg-white border-2 border-[#0095aa] text-[#0095aa] hover:bg-[#0095aa] hover:text-white px-10 py-4 rounded-xl font-black text-xl min-[2500px]:text-5xl transition-all duration-300 shadow-sm hover:scale-[1.05] group"
            >
              Download
              <Download size={20} className="group-hover:translate-y-1 transition-transform min-[2500px]:size-10" />
            </button>
          </div>
        </div>
      </div>

      <BrochureModal
        isOpen={isBrochureModalOpen}
        onClose={() => setIsBrochureModalOpen(false)}
        brochurePath="/assets/Unified_Brochure.pdf"
      />

      <style jsx>{`
        @keyframes tickerScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-tickerScroll {
          animation: tickerScroll 25s linear infinite;
        }
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

        /* Leaflet Custom Marker Styles */
        .custom-marker { background: none; border: none; }
        .marker-wrapper { 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          width: 30px; 
          height: 30px; 
          animation: markerFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
        }
        .marker-pin { 
          width: 16px; 
          height: 16px; 
          background: var(--pin-color, #0095AA); 
          border: 3px solid white; 
          border-radius: 50%; 
          box-shadow: 0 0 0 6px var(--pin-glow, rgba(0, 149, 170, 0.3)); 
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1); 
        }
        .color-red { 
          --pin-color: #ef4444; 
          --pin-glow: rgba(239, 68, 68, 0.4); 
        }
        .color-yellow { 
          --pin-color: #facc15; 
          --pin-glow: rgba(250, 204, 21, 0.4); 
        }
        .marker-pin::after { 
          content: ''; 
          position: absolute; 
          top: 50%; 
          left: 50%; 
          width: 100%; 
          height: 100%; 
          background: var(--pin-color); 
          border-radius: 50%; 
          transform: translate(-50%, -50%); 
          animation: markerRadar 2s infinite; 
          z-index: -1; 
          opacity: 0.5; 
        }
        @keyframes markerRadar { 0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; } 100% { transform: translate(-50%, -50%) scale(4); opacity: 0; } }
        @keyframes markerFloat { 0% { transform: translateY(0px); } 50% { transform: translateY(-5px); } 100% { transform: translateY(0px); } }
        .marker-label { 
          position: absolute; 
          bottom: 30px; 
          background: #1a2a5e; 
          color: white; 
          padding: 4px 10px; 
          border-radius: 6px; 
          font-size: 10px; 
          font-weight: 700; 
          white-space: nowrap; 
          opacity: 0; 
          transform: translateY(10px) scale(0.9); 
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); 
          pointer-events: none; 
          border: 1px solid rgba(255,255,255,0.1);
        }
        .marker-wrapper:hover .marker-label { opacity: 1; transform: translateY(0) scale(1); }
        .marker-wrapper:hover .marker-pin { transform: scale(1.3); }
        .leaflet-container { background: #f8fafc !important; outline: 0; }
      `}</style>



      {/* <PremiumSpotlightText /> */}
    </main>
  );
}

/* ================= SMALL COMPONENT ================= */
function ContactItem({ icon, title, value, isHeadOffice = false }) {
  return (
    <div className="flex gap-4 min-[2500px]:gap-8 items-start group">
      <div className={`mt-1 flex-shrink-0 w-10 h-10 min-[2500px]:w-20 min-[2500px]:h-20 flex items-center justify-center rounded-lg ${isHeadOffice ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-[#0095aa]'} transition-colors duration-300 group-hover:bg-[#0095aa] group-hover:text-white`}>
        <div className="min-[2500px]:scale-[2]">{icon}</div>
      </div>
      <div className="flex-1">
        <h5 className="text-sm min-[2500px]:text-2xl font-bold text-[#1a2a5e] mb-1 uppercase tracking-tight">{title}</h5>
        <p className="text-gray-600 text-sm min-[2500px]:text-xl leading-relaxed tracking-tighter">{value}</p>
      </div>
    </div>
  );
}
function FloatingInput({ label, name, type = "text", icon, required = false, pattern }) {
  const id = label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className="relative">
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        pattern={pattern}
        placeholder=" "
        className="peer w-full border border-gray-300 rounded-xl px-5 pt-6 pb-2 min-[2500px]:pt-12 min-[2500px]:pb-5 text-base min-[2500px]:text-3xl focus:outline-none focus:ring-2 focus:ring-[#0095aa]/20 focus:border-[#0095aa] transition-all"
      />
      <label
        htmlFor={id}
        className="absolute left-5 top-4.5 min-[2500px]:top-8 text-gray-400 text-base min-[2500px]:text-3xl transition-all duration-200 peer-placeholder-shown:top-4.5 min-[2500px]:peer-placeholder-shown:top-8 peer-placeholder-shown:text-base min-[2500px]:peer-placeholder-shown:text-2xl peer-focus:top-2 min-[2500px]:peer-focus:top-3 peer-focus:text-xs min-[2500px]:peer-focus:text-xl peer-focus:text-[#0095aa] peer-valid:top-2 min-[2500px]:peer-valid:top-3 peer-valid:text-xs min-[2500px]:peer-valid:text-xl"
      >
        {label}{required && " *"}
      </label>
    </div>
  );
}

function FloatingTextarea({ label, name, icon }) {
  const id = label.replace(/\s+/g, '-').toLowerCase();
  return (
    <div className="relative">
      <textarea
        id={id}
        name={name}
        rows={4}
        placeholder=" "
        className="peer w-full border border-gray-300 rounded-xl px-5 pt-6 pb-2 min-[2500px]:pt-12 min-[2500px]:pb-5 text-base min-[2500px]:text-3xl focus:outline-none focus:ring-2 focus:ring-[#0095aa]/20 focus:border-[#0095aa] transition-all"
      />
      <label
        htmlFor={id}
        className="absolute left-5 top-5 min-[2500px]:top-8 text-gray-400 text-base min-[2500px]:text-3xl transition-all duration-200 peer-placeholder-shown:top-5 min-[2500px]:peer-placeholder-shown:top-8 peer-focus:top-2 min-[2500px]:peer-focus:top-3 peer-focus:text-xs min-[2500px]:peer-focus:text-xl peer-focus:text-[#0095aa] peer-valid:top-2 min-[2500px]:peer-valid:top-3 peer-valid:text-xs min-[2500px]:peer-valid:text-xl"
      >
        {label}
      </label>
    </div>
  );
}