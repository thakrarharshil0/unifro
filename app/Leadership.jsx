import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Leadership = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('leadership');
  const location = useLocation();

  // Handle hash routing - scroll to section when hash is present
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.substring(1); // Remove the #
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          setActiveSection(sectionId);
        }
      }, 100);
    } else {
      // Default to leadership section
      setActiveSection('leadership');
    }
  }, [location.hash]);

  const scrollToSection = (sectionId) => {
    // If section is not on this page, navigate to about-us with hash
    if (sectionId !== 'leadership') {
      navigate(`/about-us#${sectionId}`);
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      // Update URL hash without triggering navigation
      window.history.replaceState(null, '', `#${sectionId}`);
    }
  };

  return (
    <div className="leadership-page" style={{ overflowX: 'hidden', width: '100%' }}>
      {/* Hero Section */}
      <section style={{
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
          <source src="/assets/leadership-bg.mp4" type="video/mp4" />
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
          position: 'relative',
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
          letterSpacing: '2px',
          fontFamily: 'Anton, sans-serif',
          fontStyle: 'normal',
          paddingTop: '120px'
        }}>
          LEADERSHIP
        </h1>

        {/* Sub-Navigation */}
        <div style={{
          marginTop: 'auto',
          marginBottom: '0',
          zIndex: 1,
          position: 'relative',
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '15px 15px 0 0',
          padding: '15px 30px',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button 
            onClick={() => scrollToSection('who-we-are')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'who-we-are' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'who-we-are' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            WHO WE ARE
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('our-journey')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'our-journey' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'our-journey' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            OUR JOURNEY
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('project-reach-portfolio')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'project-reach-portfolio' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'project-reach-portfolio' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            PROJECT REACH
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('leadership')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'leadership' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'leadership' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            LEADERSHIP
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('certification')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'certification' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'certification' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            CERTIFICATION
          </button>
          <span style={{ color: '#0095AA', fontSize: '1.2rem' }}>-</span>
          <button 
            onClick={() => scrollToSection('events')}
            style={{
              background: 'none',
              border: 'none',
              color: activeSection === 'events' ? '#0095AA' : '#000000',
              fontSize: '1.2rem',
              fontWeight: activeSection === 'events' ? '700' : '600',
              cursor: 'pointer',
              padding: '5px 10px',
              fontFamily: 'sans-serif',
              transition: 'all 0.3s ease'
            }}
          >
            EVENTS
          </button>
        </div>
      </section>

      {/* Leadership Content Section */}
      <section id="leadership" style={{
        position: 'relative',
        padding: '80px 40px 100px 40px',
        minHeight: '60vh',
        overflow: 'hidden',
        background: '#ffffff'
      }}>
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <h2 style={{
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            fontWeight: '900',
            color: '#1a2a5e',
            fontFamily: 'Anton, sans-serif',
            margin: '0 auto 60px',
            letterSpacing: '2px',
            textTransform: 'uppercase'
          }}>
            LEADERSHIP
          </h2>
          <p style={{
            fontSize: '1.2rem',
            color: '#666',
            lineHeight: '1.8'
          }}>
            Coming Soon...
          </p>
        </div>
      </section>
    </div>
  )
}

export default Leadership





