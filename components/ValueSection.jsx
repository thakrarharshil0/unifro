"use client";
import { useState } from "react";
import './ValueSection.css';


const sectors = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
      </svg>
    ),
    title: 'COMMERCIAL',
    image: '/assets/Commercial - values.jpg',
    description: 'PT enables large, open floor plates with fewer columns, maximising usable space, design flexibility, and long-term asset value for commercial developments.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
    title: 'RESIDENTIAL',
    image: '/assets/recidential.jpeg',
    description: 'PT supports faster slab construction, improved cost efficiency, and optimised structural performance for modern residential buildings.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 13h-4v-3h4v3zm-6 0h-4v-3h4v3zm-6 0H3v-3h4v3zm12-5h-4V5h4v3zm-6 0h-4V5h4v3zM7 8H3V5h4v3zm12 10h-4v-3h4v3zm-6 0h-4v-3h4v3zm-6 0H3v-3h4v3zM21 3H1v18h20V3z" />
      </svg>
    ),
    title: 'INDUSTRIAL',
    image: '/assets/Industrial.png',
    description: 'PT delivers high-strength slabs with long spans, allowing heavy load capacity, durability, and uninterrupted industrial operations.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z" />
      </svg>
    ),
    title: 'BASEMENTS & PODIUMS',
    image: '/assets/basement.png',
    description: 'PT reduces slab thickness while efficiently handling heavy loads, limited heights,clean height and complex basement structural requirements.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z" />
      </svg>
    ),
    title: 'HOSPITALS',
    image: '/assets/hospital.png',
    description: 'PT allows long, flexible spans that support efficient planning, minimal vibration, and smooth integration of hospital facilities.'
  },




  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V9h2v2zm0-4h-2V5h2v2zm6 12h-2v-2h2v2zm0-4h-2v-2h2v2z" />
      </svg>
    ),
    title: 'HOTELS',
    image: '/assets/hotels.png',
    description: 'PT provides lightweight structural systems suitable for tall buildings, enabling faster vertical construction and efficient floor layouts.'
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z" />
      </svg>
    ),
    title: 'SCHOOL',
    image: '/assets/school-12.png',
    description: 'PT creates durable, crack-controlled slabs that ensure structural stability, safety, and long-term performance for educational buildings.'
  }
];

const ValueSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="value-section">
      {/* Background decoration */}
      <div className="value-bg-decoration"></div>

      <div className="value-container">
        <h2 className="text-[#1a2a5e] font-anton font-black text-center relative z-10 text-[clamp(1.5rem,5vw,3rem)] pt-12 min-[2500px]:text-[70px]">
          WHERE POST-TENSIONING CREATES VALUE
        </h2>
        <div className="absolute inset-0 hidden xl:flex justify-center font-['Impact'] text-[70px] min-[2500px]:text-[120px] text-black/5 uppercase pointer-events-none min-[1024px]:max-[1324px]:text-[60px]">
          WHERE POST-TENSIONING CREATES VALUE
        </div>

        <div className="value-content">
          {/* Left Side - Text + Image */}
          <div className="value-left">
            <div className="value-intro">
              <p className="value-intro-highlight">Post-tensioning is<br />not just reinforcement.</p>
              <p className="value-intro-text">
                It is a structural strategy that allows larger spans, reduces overall cost, and expands architectural possibilities.
              </p>
            </div>
            <div className="value-image-box">
              {sectors.map((sector, index) => (
                <img
                  key={index}
                  src={sector.image}
                  alt={sector.title}
                  className={activeIndex === index ? 'active' : ''}
                />
              ))}
            </div>
          </div>

          {/* Sectors List */}
          <div className="value-right">
            {sectors.map((sector, index) => (
              <div
                key={index}
                className={`sector-item ${activeIndex === index ? 'active' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <div className="sector-icon-wrapper">
                  <div className="sector-icon">{sector.icon}</div>
                </div>

                <div className="sector-desc-box">
                  <h3 className="sector-title">{sector.title}</h3>
                  <p className="sector-description">{sector.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueSection;