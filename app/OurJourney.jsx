import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SECTIONS = [
  "who-we-are",
  "our-journey",
  "project-reach-portfolio",
  "leadership",
  "certification",
  "events",
];

const OurJourney = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const rafRef = useRef(null);

  const [activeSection, setActiveSection] = useState("our-journey");

  /* ===============================
     HANDLE HASH ON LOAD / CHANGE
  =============================== */
  useEffect(() => {
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);

    if (!el) return;

    setActiveSection(id);

    const t = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth" });
    }, 80);

    return () => clearTimeout(t);
  }, [location.hash]);

  /* ===============================
     SCROLL SPY (PERFORMANCE SAFE)
  =============================== */
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        const scrollPos = window.scrollY + 220;

        for (let i = SECTIONS.length - 1; i >= 0; i--) {
          const el = document.getElementById(SECTIONS[i]);
          if (el && el.offsetTop <= scrollPos) {
            setActiveSection(SECTIONS[i]);
            break;
          }
        }

        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* ===============================
     NAV HANDLER
  =============================== */
  const scrollToSection = useCallback(
    (id) => {
      if (id !== "our-journey") {
        navigate(`/about-us#${id}`);
        return;
      }

      const el = document.getElementById(id);
      if (!el) return;

      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
      window.history.replaceState(null, "", `#${id}`);
    },
    [navigate]
  );

  /* ===============================
     JSX (UNCHANGED UI)
  =============================== */
  return (
    <div className="our-journey-page" style={{ overflowX: "hidden" }}>
      {/* HERO */}
      <section style={{ position: "relative", minHeight: "50vh" }}>
        <video autoPlay loop muted playsInline style={heroVideoStyle}>
          <source src="/assets/Our Journey.mp4" type="video/mp4" />
        </video>

        <div style={heroOverlayStyle} />

        <h1 style={heroTitleStyle}>OUR JOURNEY</h1>

        {/* SUB NAV */}
        <div style={subNavStyle}>
          {[
            ["who-we-are", "WHO WE ARE"],
            ["our-journey", "OUR JOURNEY"],
            ["project-reach-portfolio", "PROJECT REACH"],
            ["leadership", "LEADERSHIP"],
            ["certification", "CERTIFICATION"],
            ["events", "EVENTS"],
          ].map(([id, label], i) => (
            <span key={id} style={{ display: "flex", alignItems: "center" }}>
              {i !== 0 && <span style={dash}>-</span>}
              <button
                onClick={() => scrollToSection(id)}
                style={{
                  ...navBtn,
                  color:
                    activeSection === id ? "#0095AA" : "#000000",
                  fontWeight:
                    activeSection === id ? "700" : "600",
                }}
              >
                {label}
              </button>
            </span>
          ))}
        </div>
      </section>

      {/* ===============================
          JOURNEY CONTENT (UNCHANGED)
      =============================== */}
      {/* KEEP ALL YOUR EXISTING JSX BELOW THIS LINE */}
      {/* NOTHING VISUAL WAS MODIFIED */}
    </div>
  );
};

/* ===============================
   STYLES (UNCHANGED)
=============================== */
const heroVideoStyle = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const heroOverlayStyle = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,149,170,0.6)",
};

const heroTitleStyle = {
  fontSize: "clamp(3rem,8vw,6rem)",
  fontWeight: 900,
  color: "#fff",
  textAlign: "center",
  paddingTop: "120px",
  position: "relative",
  zIndex: 1,
  fontFamily: "Anton, sans-serif",
};

const subNavStyle = {
  marginTop: "auto",
  background: "rgba(255,255,255,0.95)",
  padding: "15px 30px",
  display: "flex",
  gap: "14px",
  justifyContent: "center",
  borderRadius: "15px 15px 0 0",
};

const navBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "1.2rem",
  padding: "5px 10px",
  transition: "all .3s ease",
};

const dash = { color: "#0095AA", margin: "0 8px" };

export default OurJourney;
