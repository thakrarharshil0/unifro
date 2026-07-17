
'use client';
// Navbar fix - app/components/Navbar.jsx

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaSearch,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaChevronRight,
  FaYoutube,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { type } from 'os';


const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openNestedDropdown, setOpenNestedDropdown] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false); // ✅ New state for search popup

  // Scroll mobile menu to top when opened
  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      // Find the nav element and scroll it to top
      const navMenu = document.querySelector('nav');
      if (navMenu) navMenu.scrollTop = 0;
    }
  }, [isMobileMenuOpen, isMobile]);

  const lastScrollY = useRef(0);
  const dropdownRef = useRef(null);
  const nestedDropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchPopupRef = useRef(null);

  // Handle body scroll lock for mobile menu
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const body = document.body;
    if (isMobileMenuOpen) {
      body.style.overflow = 'hidden';
      // Prevent touchmove to stop scrolling on some mobile devices
    } else {
      body.style.overflow = '';
    }
    return () => {
      body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  /* ================= HANDLE WINDOW SIZE ================= */

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 992);
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /* ================= SCROLL + OUTSIDE CLICK ================= */
  useEffect(() => {
    // ✅ Check if window exists (SSR fix)
    if (typeof window === 'undefined') return;

    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 50);
      setIsNavbarVisible(!(y > lastScrollY.current && y > 100));
      lastScrollY.current = y;
    };

    const outsideClick = (e) => {
      const dropdownEl = dropdownRef.current;
      const nestedDropdownEl = nestedDropdownRef.current;
      const searchPopupEl = searchPopupRef.current;

      // Close search popup if clicked outside
      if (isSearchOpen && searchPopupEl && !searchPopupEl.contains(e.target)) {
        setIsSearchOpen(false);
        window.dispatchEvent(new CustomEvent('searchPopupToggle', { detail: { isSearchOpen: false } }));
      }

      if (!dropdownEl) return;

      if (isMobile) {
        if (!dropdownEl.contains(e.target)) {
          setOpenDropdown(null);
          setOpenNestedDropdown(null);
        }
      } else {
        if (
          nestedDropdownEl &&
          !nestedDropdownEl.contains(e.target) &&
          !dropdownEl.contains(e.target)
        ) {
          setOpenNestedDropdown(null);
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', outsideClick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', outsideClick);
    };
  }, [isMobile, isSearchOpen]); // ✅ Added isSearchOpen as dependency

  /* ================= SEARCH FUNCTIONALITY ================= */
  const handleSearchClick = (e) => {
    e.stopPropagation();
    setIsSearchOpen(true);
    window.dispatchEvent(new CustomEvent('searchPopupToggle', { detail: { isSearchOpen: true } }));
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  // Project images from /our-projects/page.jsx
  const projectImages = [
    '18 PU 4 project.JPG',
    '2324-064 PCB for CPR.jpg',
    '2425-558 SRR Infra.jpg',
    '5926-08-AR-3D-C-04.jpg',
    'Anadam 1 navi mumbai.jpg',
    'Ashray Eminenties Vadodara.jpg',
    'cAM 04  (1).jpg',
    'Cam_01_01.jpg',
    'Cam_18 night.jpg',
    'Commercial for Manish raghuvanshi ji ( Urban shivansh).JPG',
    'Commercial for rajesh soni ji project.jpg',
    'Commercial project at kharadi-pune.jpg',
    'Commercial project for Mr Vinay and Mr kaushik.jpg',
    'Daksh Avlon.jpg',
    'Dolphin Advante.jpg',
    'Global port - pune.jpg',
    'KHUSHI GROUP.jpg',
    'Khushiram Ahuja ji project.jpeg',
    'Kompally 6.jpg',
    'Kompally-3.jpg',
    'Kompally-5.jpg',
    'Maruti showroom pune.jpg',
    'Mukesh ji commercial project indore.jpg',
    'Raichandani mall-Hyderabad.jpeg',
    'Sahil elegant.jpeg',
    'Sanyuga clubhouse.jpg',
    'Shree Datta Mangal.jpg',
    'Shriram Empire Site, Nashik.jpg',
    'Sky Life.jpeg',
    'Spectrum mall indore.jpeg',
    'The Rise.jpg',
    'Town Square -Pune.jpg',
    'view 01 night (1).jpg',
    'Viraj Plazza.jpg',
  ];

  const mockResults = [
    { title: 'Home', path: '/', keywords: 'home homepage main index advanced bonded unbonded post-tensioning pt slabs mono strand multi-strand tendons anchorage systems ducts structural engineering solutions' },
    { title: 'About Us', path: '/about-us', keywords: 'about us company story mission leadership services design detailing supply installation stressing technical support' },
    { title: 'Who We Are', path: '/about-us#who-we-are', keywords: 'who we are company profile history background' },
    { title: 'Our Journey', path: '/our-journey', keywords: 'our journey history timeline milestones achievements' },
    { title: 'Technology Overview', path: '/technology', keywords: 'technology post-tensioning prestressing steel strands anchorage systems wedges ducts stressing process structural load optimization high-performance concrete systems' },
    { title: 'Post-Tensioning Systems', path: '/technology#post-tensioning-systems', keywords: 'pts advantages types performance' },
    { title: 'Unbonded Post-Tensioning Systems', path: '/technology#unbonded-tensioning-systems', keywords: 'unbonded pt system greased sheathed mono strand tendons flexible slab design faster construction cycles reduced slab thickness efficient load distribution hdpe corrosion-inhibiting grease' },
    { title: 'Bonded Post-Tensioning Systems', path: '/technology#bonded-tensioning-systems', keywords: 'bonded pt system multi-strand tendons grouting ducts anchorage bridges heavy-load structures long-term structural durability' },
    { title: 'Structural Geometry', path: '/technology#structural-geometry', keywords: 'structural geometry flat plate slab drop cap beams' },
    { title: 'Materials', path: '/materials', keywords: 'materials components high-quality prestressing steel strands greased sheathed mono strands corrosion-inhibiting grease hdpe sheathing precision wedges anchor plates corrugated ducts' },
    { title: 'Prestressing Steel (Mono-Strands)', path: '/materials#unbonded-prestressing-steel-mono-strands', keywords: 'unbonded prestressing steel mono strands high-strength low-relaxation grade 1860 controlled elongation high tensile capacity is 14268 standards seven-wire grease coating sheathing' },
    { title: 'Wedges (Unbonded)', path: '/materials#unbonded-wedges', keywords: 'unbonded wedges precision-engineered anchorage grip high hardness secure load transfer heat-treated locking resistance prestressing forces' },
    { title: 'Anchor Plate (Unbonded)', path: '/materials#unbonded-anchor-plate', keywords: 'unbonded anchor plate high-strength astm is standards efficient load transfer structural integrity consistent load distribution' },
    { title: 'Prestressing Steel (Strands)', path: '/materials#bonded-prestressing-steel-strands', keywords: 'bonded prestressing steel strands high-strength low-relaxation grade 1860' },
    { title: 'Wedges (Bonded)', path: '/materials#bonded-wedges', keywords: 'bonded wedges precision-engineered anchorage grip locking' },
    { title: 'Ducts (Bonded)', path: '/materials#bonded-ducts', keywords: 'bonded ducts corrugated galvanized steel grout flow tendon protection improved bond performance flexible stability' },
    { title: 'Anchor Block (Bonded)', path: '/materials#bonded-anchor-block', keywords: 'bonded anchor block plates high-strength' },
    { title: 'Project Workflow', path: '/project-workflow', keywords: 'project workflow tendon profiling stressing hydraulic jacks anchorage locking controlled load transfer on-site installation elongation monitoring quality control optimized structural performance' },
    { title: 'Our Projects (Applications)', path: '/our-projects', keywords: 'our projects portfolio applications solutions commercial residential industrial infrastructure long spans reduced structural weight crack control basements podiums high-rise buildings bridges heavy-load efficiently' },
    { title: 'Clientele', path: '/clients', keywords: 'clientele clients partners trust' },
    { title: 'Careers', path: '/career', keywords: 'career jobs opportunities hiring positions openings' },
    { title: 'Contact Us', path: '/contact-us', keywords: 'contact us connect experts bonded unbonded pt slab design technical consultation execution support map address phone email' },
    // Add project images as results
    ...projectImages.map(name => ({
      title: name.replace(/\.[^.]+$/, ''),
      path: `/our-projects?project=${encodeURIComponent(name)}`,
      image: `/selected/${name}`,
      keywords: 'project image photo gallery'
    })),
  ];

  const filteredResults = searchQuery.trim()
    ? mockResults.filter(r => {
      const query = searchQuery.trim().toLowerCase();
      const matchesTitle = r.title.toLowerCase().includes(query);
      const matchesKeywords = r.keywords && r.keywords.toLowerCase().includes(query);
      return matchesTitle || matchesKeywords;
    })
    : [];

  const handleResultClick = (path) => {
    if (path.includes('#')) {
      const [basePath, sectionId] = path.split('#');
      if (pathname === basePath || (pathname === '/' && basePath === '')) {
        window.location.hash = sectionId;
      } else {
        router.push(path);
      }
    } else {
      router.push(path);
    }
    setIsSearchOpen(false);
    window.dispatchEvent(new CustomEvent('searchPopupToggle', { detail: { isSearchOpen: false } }));
    setSearchQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() && filteredResults.length > 0) {
      // Navigate to the first result
      handleResultClick(filteredResults[0].path);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsSearchOpen(false);
      window.dispatchEvent(new CustomEvent('searchPopupToggle', { detail: { isSearchOpen: false } }));
    }
  };

  /* ================= NAVIGATION ================= */
  const handleNavigate = useCallback((basePath, sectionId) => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
    setOpenNestedDropdown(null);

    if (sectionId === 'our-journey') {
      router.push('/our-journey');
      return;
    }

    // For materials page, use the exact section ID from materials page
    if (basePath === '/materials') {
      // If already on materials page, update hash
      if (pathname === '/materials') {
        window.location.hash = sectionId;
      } else {
        // Navigate to materials page with hash
        router.push(`/materials#${sectionId}`);
      }
    } else if (pathname === basePath) {
      // If already on the same page, update hash
      window.location.hash = sectionId;
    } else {
      // Navigate to different page with hash
      router.push(`${basePath}#${sectionId}`);
    }
  }, [router, pathname]);

  const handleParentClick = useCallback((basePath, itemId, hasNested, e) => {
    if (isMobile && hasNested) {
      e.preventDefault();
      setOpenNestedDropdown(openNestedDropdown === itemId ? null : itemId);
    } else {
      handleNavigate(basePath, itemId);
    }
  }, [isMobile, openNestedDropdown, handleNavigate]);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about-us', type: 'about' },
    { name: 'TECHNOLOGY', path: '/technology', type: 'technology' },
    { name: 'MATERIALS', path: '/materials', type: 'materials' },
    { name: 'PROJECT WORKFLOW', path: '/project-workflow' },
    { name: 'OUR PROJECTS', path: '/our-projects' },
    { name: 'CLIENTELE', path: '/clients' },
    { name: 'CAREER', path: '/career' },
  ];

  const dropdownItems = {
    about: [
      { name: 'WHO WE ARE', id: 'who-we-are' },
      { name: 'OUR JOURNEY', id: 'our-journey' },
      { name: 'PROJECT REACH & PORTFOLIO DISTRIBUTION', id: 'project-reach-portfolio' },
      // { name: 'LEADERSHIP', id: 'leadership' },
      { name: 'CERTIFICATION', id: 'certification' },
      // { name: 'TESTIMONIALS', id: 'testimonials' },
      // { name: 'EVENTS', id: 'events' },
    ],
    technology: [
      // { name: 'OVERVIEW', id: 'overview' },
      // { name: 'PRESTRESSED SYSTEMS', id: 'prestressed-systems' },
      { name: 'POST-TENSIONING SYSTEMS', id: 'post-tensioning-systems' },
      { name: 'UNBONDED POST-TENSIONING SYSTEMS', id: 'unbonded-tensioning-systems' },
      { name: 'BONDED POST-TENSIONING SYSTEMS', id: 'bonded-tensioning-systems' },
      { name: 'STRUCTURAL GEOMETRY', id: 'structural-geometry' },
    ],
    materials: [
      {
        name: 'UNBONDED POST-TENSIONING',
        id: 'unbonded-prestressing-steel-mono-strands',
        hasNested: true,
        nestedItems: [
          { name: 'PRESTRESSING STEEL(MONO-STRANDS)', id: 'unbonded-prestressing-steel-mono-strands' },
          { name: 'WEDGES', id: 'unbonded-wedges' },
          { name: 'ANCHOR PLATE', id: 'unbonded-anchor-plate' },
        ]
      },
      {
        name: 'BONDED POST-TENSIONING',
        id: 'bonded-prestressing-steel-strands',
        hasNested: true,
        nestedItems: [
          { name: 'PRESTRESSING STEEL(STRANDS)', id: 'bonded-prestressing-steel-strands' },
          { name: 'WEDGES', id: 'bonded-wedges' },
          { name: 'DUCTS', id: 'bonded-ducts' },
          { name: 'ANCHOR BLOCK', id: 'bonded-anchor-block' },
        ]
      },
    ],
  };

  return (
    <>
      {/* Spacer for fixed navbar - add margin-top to prevent cut-off */}
      <div className="h-[110px] max-[992px]:h-[70px] max-[576px]:h-[80px] mt-2 min-[2500px]:h-[100px]" />

      <header
        className={`
          fixed top-0 left-0 w-full z-[2000]
          bg-white/95 backdrop-blur-sm
          shadow-[0_2px_10px_rgba(0,0,0,0.08)]
          transition-transform duration-300
          ${!isNavbarVisible && isScrolled && !isMobileMenuOpen ? '-translate-y-full' : 'translate-y-0'}
          min-[2500px]:min-h-[100px]
        `}
        style={{ WebkitOverflowScrolling: 'touch', touchAction: 'manipulation', minHeight: '70px' }}
      >
        {/* ================= TOP BAR ================= */}
        <div className="relative flex items-center justify-between px-10 py-3 max-[992px]:justify-center max-[576px]:px-3 max-[576px]:py-2" style={{ minHeight: '70px' }}>
          {/* Social icons hidden on mobile */}
          <div className="flex gap-2 max-[992px]:absolute max-[992px]:left-4 max-[992px]:top-1/2 max-[992px]:-translate-y-1/2 max-[576px]:hidden">
            {[
              { Icon: FaFacebookF, href: "https://www.facebook.com/UnifiedPTS/" },
              { Icon: FaInstagram, href: "https://www.instagram.com/unified_pts_llp/?hl=en" },
              { Icon: FaXTwitter, href: "https://x.com/Unified_PTS_LLP" },
              { Icon: FaLinkedinIn, href: "https://www.linkedin.com/company/unifiedpt/?viewAsMember=true" },
              { Icon: FaYoutube, href: "https://www.youtube.com/@UNIFIEDPTS1915" }
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[#333] text-white flex items-center justify-center text-sm hover:bg-[#0095aa] transition"
              >
                <Icon />
              </a>
            ))}
          </div>

          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <img
              src="/assets/Unified New Logo.png"
              alt="Unified"
              className="h-[60px] max-[768px]:h-[48px] max-[576px]:h-[36px]"
            />
          </Link>

          {/* Mobile Search Button */}
          <button
            onClick={handleSearchClick}
            className="hidden max-[992px]:block absolute right-16 top-1/2 -translate-y-1/2 text-xl text-gray-600 hover:text-[#0095aa] max-[576px]:right-12 max-[400px]:right-11"
            style={{ padding: '6px' }}
            aria-label="Open search"
            suppressHydrationWarning
          >
            <FaSearch />
          </button>

          {/* Hamburger menu for mobile */}
          <button
            className="hidden max-[992px]:block absolute right-8 top-1/2 -translate-y-1/2 text-2xl max-[576px]:right-3 max-[400px]:right-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ padding: '6px' }}
            suppressHydrationWarning
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Search Bar */}
          <div className="max-[992px]:hidden">
            <div
              className="flex items-center border rounded-full overflow-hidden bg-white cursor-pointer"
              onClick={handleSearchClick}
            >
              <div className="px-4 py-2 text-[13px] text-gray-500 w-[150px]">
                Search...
              </div>
              <div className="px-4 text-gray-500 hover:text-[#0095aa]">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>

        {/* ================= SEARCH POPUP OVERLAY ================= */}
        <div
          ref={searchPopupRef}
          className={`
            fixed inset-0 z-[3000] transition-all duration-300
            ${isSearchOpen
              ? 'opacity-100 visible backdrop-blur-sm bg-black/20'  // ✅ Page background blur
              : 'opacity-0 invisible backdrop-blur-none bg-transparent'
            }
          `}
          onClick={() => {
            setIsSearchOpen(false);
            window.dispatchEvent(new CustomEvent('searchPopupToggle', { detail: { isSearchOpen: false } }));
          }}
        >
          <div
            className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-2xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <form
              onSubmit={handleSearchSubmit}
              className={`
                bg-white/90 backdrop-blur-md border border-white/50 shadow-[0_8px_40px_rgba(0,149,170,0.18)]
                rounded-3xl transition-all duration-500
                ring-2 ring-[#0095AA]/40
                ${isSearchOpen ? 'scale-100 opacity-100 premium-glow' : 'scale-95 opacity-0'}
              `}
              style={{ boxShadow: '0 8px 40px 0 rgba(0,149,170,0.18), 0 1.5px 8px 0 rgba(0,0,0,0.10)' }}
            >
              {/* Premium animated blue glow for search popup */}
              <style>{`
                      .premium-glow {
                        box-shadow:
                          0 8px 40px 0 rgba(0,149,170,0.18),
                          0 1.5px 8px 0 rgba(0,0,0,0.10),
                          0 0 32px 8px #0095AA44;
                        position: relative;
                        animation: premiumGlowPulse 2.2s infinite alternate;
                      }
                      @keyframes premiumGlowPulse {
                        0% {
                          box-shadow:
                            0 8px 40px 0 rgba(0,149,170,0.18),
                            0 1.5px 8px 0 rgba(0,0,0,0.10),
                            0 0 32px 8px #0095AA44;
                        }
                        100% {
                          box-shadow:
                            0 8px 40px 0 rgba(0,149,170,0.18),
                            0 1.5px 8px 0 rgba(0,0,0,0.10),
                            0 0 48px 16px #0095AA66;
                        }
                      }
                    `}</style>
              <div className="flex items-center p-4 relative">
                <FaSearch className="text-gray-600 text-xl ml-4" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Search for anything..."
                  className="w-full bg-transparent border-none outline-none
                    px-6 py-4 text-gray-900 text-lg placeholder-gray-500
                    focus:ring-0"
                  autoFocus
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    window.dispatchEvent(new CustomEvent('searchPopupToggle', { detail: { isSearchOpen: false } }));
                  }}
                  className="text-gray-600 hover:text-gray-900 text-2xl px-4 py-2"
                  suppressHydrationWarning
                >
                  <FaTimes />
                </button>
                {/* Search Results Dropdown */}
                {searchQuery.trim() && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white/95 rounded-2xl shadow-xl border border-[#0095AA]/10 z-50 overflow-hidden animate-fade-in max-h-80 overflow-y-auto">
                    {filteredResults.length > 0 ? (
                      filteredResults.map((result, idx) => (
                        <button
                          key={result.path}
                          type="button"
                          onClick={() => handleResultClick(result.path)}
                          className="w-full text-left px-6 py-4 hover:bg-[#0095AA]/10 text-base text-gray-900 font-medium border-b last:border-b-0 border-[#0095AA]/10 transition flex items-center gap-3"
                          style={{ outline: 'none' }}
                        >
                          {result.image && (
                            <img src={result.image} alt={result.title} className="w-10 h-10 object-cover rounded-md border border-gray-200" />
                          )}
                          {result.title}
                        </button>
                      ))
                    ) : (
                      <div className="px-6 py-4 text-gray-500 text-base">No results found.</div>
                    )}
                  </div>
                )}
              </div>

              {/* Optional: Search suggestions */}
              <div className="border-t border-gray-200 p-4">
                <p className="text-gray-600 text-sm mb-2">Try searching for:</p>
                <div className="flex flex-wrap gap-2">
                  {['Technology', 'Projects', 'Materials', 'Careers'].map((term) => (
                    <button
                      key={term}
                      type="button"
                      onClick={() => {
                        setSearchQuery(term);
                        searchInputRef.current?.focus();
                      }}
                      className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100
                        text-blue-700 rounded-full text-sm transition"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* ================= MOBILE MENU BACKDROP ================= */}
        <div
          className={`
            fixed z-[2500] left-0
            w-screen h-screen
            bg-black/40 backdrop-blur-md
            transition-all duration-500
            ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
            min-[993px]:hidden
          `}
          style={{ top: '70px', height: 'calc(100vh - 70px)' }}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* ================= NAV MENU ================= */}
        <nav
          className={`
            flex justify-center gap-2 px-10 pb-3
            max-[992px]:fixed max-[992px]:top-[70px] max-[992px]:right-0 
            max-[992px]:max-h-[calc(100vh-70px)] 
            max-[992px]:w-[80vw] max-[576px]:w-[99vw] max-[992px]:z-[3000]
            max-[992px]:flex-col max-[992px]:items-center max-[992px]:justify-start
            max-[992px]:pt-0
            max-[992px]:rounded-bl-3xl
            transition-all duration-[800ms] ease-[cubic-bezier(0.32,0.72,0,1)] origin-top-right
            ${isMobileMenuOpen
              ? 'max-[992px]:scale-100 max-[992px]:opacity-100 max-[992px]:visible max-[992px]:bg-[#0095aa]'
              : 'max-[992px]:scale-0 max-[992px]:opacity-0 max-[992px]:invisible'}
            ${isMobileMenuOpen ? 'overflow-y-auto' : ''}
            max-[992px]:shadow-xl
          `}
          style={{
            boxShadow: isMobileMenuOpen ? '0 10px 15px -3px rgba(0, 0, 0, 0.1)' : 'none',
            background: isMobileMenuOpen && isMobile ? '#0095aa' : undefined,
            overscrollBehavior: 'contain'
          }}
        >
          <ul
            ref={dropdownRef}
            className="flex items-center bg-[#199eb6] rounded-full px-1 gap-[2px]
              max-[992px]:flex-col max-[992px]:bg-transparent
              max-[992px]:w-full max-[992px]:max-w-[500px] max-[576px]:max-w-full"
            style={{ paddingBottom: isMobileMenuOpen ? 24 : 0 }}
          >
            {navLinks.map((link) => {
              const isActive =
                pathname === link.path ||
                (link.type && pathname.startsWith(link.path));

              return (
                <li
                  key={link.name}
                  className="relative w-full"
                  onMouseEnter={() => {
                    if (!isMobile) {
                      setOpenDropdown(link.type);
                      if (link.type !== 'materials') {
                        setOpenNestedDropdown(null);
                      }
                    }
                  }}
                  onMouseLeave={() => {
                    if (!isMobile) {
                      setOpenDropdown(null);
                      setOpenNestedDropdown(null);
                    }
                  }}
                  style={isMobile ? { borderBottom: '1px solid rgba(255,255,255,0.2)', marginBottom: 0 } : {}}
                >
                  {link.type ? (
                    <>
                      <button
                        className={`nav-link inline-flex items-center justify-center
                          gap-[6px] px-4 py-[10px] whitespace-nowrap leading-none w-full
                          max-[992px]:px-6 max-[992px]:py-4 max-[576px]:px-4 max-[576px]:py-3
                          ${isActive && !isMobile ? 'active' : ''}`}
                        style={isMobile ? { fontSize: 16, fontWeight: 600, textAlign: 'left', width: '100%', color: '#fff', justifyContent: 'flex-start' } : {}}
                        onClick={() => {
                          if (isMobile) {
                            setOpenDropdown(openDropdown === link.type ? null : link.type);
                            if (link.type === 'materials') {
                              setOpenNestedDropdown(null);
                            }
                          }
                        }}
                      >
                        {link.name}
                        <FaChevronDown
                          className={`text-[10px] transition-transform ${openDropdown === link.type ? 'rotate-180' : ''}`}
                        />
                      </button>
                      <div
                        className={`
                          absolute top-full left-0 bg-white rounded-lg
                          shadow-[0_4px_20px_rgba(0,0,0,0.15)]
                          min-w-[280px] py-2
                          transition-all duration-300
                          ${!isMobile
                            ? openDropdown === link.type
                              ? 'opacity-100 translate-y-0 visible'
                              : 'opacity-0 -translate-y-2 invisible'
                            : openDropdown === link.type
                              ? 'block'
                              : 'hidden'
                          }
                          max-[992px]:static max-[992px]:bg-[#f8fdff] max-[992px]:shadow-md
                          max-[992px]:w-full max-[992px]:rounded-none max-[992px]:py-0
                        `}
                        style={isMobile ? {
                          boxShadow: '0 2px 12px 0 rgba(0,149,170,0.10)',
                          background: '#fff',
                          minWidth: 0,
                          width: '100%',
                          padding: '0',
                          borderTop: '1px solid #d0e7ef',
                          marginTop: 12,
                          zIndex: 10
                        } : {}}
                      >
                        {dropdownItems[link.type]?.map((item, index) => (
                          <div
                            key={item.name}
                            className={`relative ${index !== dropdownItems[link.type].length - 1
                              ? 'border-b border-gray-200'
                              : ''
                              }`}
                            onMouseEnter={() => {
                              if (!isMobile && item.hasNested) {
                                setOpenNestedDropdown(item.id);
                              }
                            }}
                            onMouseLeave={() => {
                              if (!isMobile) {
                                setOpenNestedDropdown(null);
                              }
                            }}
                          >
                            {item.hasNested ? (
                              <div className="relative group">
                                <div className="flex w-full">
                                  <button
                                    onClick={(e) => handleParentClick(link.path, item.id, item.hasNested, e)}
                                    className="flex-1 text-left px-5 py-3 text-[12px]
                                      font-medium hover:bg-[#e6f6fa]
                                      hover:text-[#0095aa] transition
                                      max-[992px]:text-[#222] max-[992px]:bg-transparent max-[992px]:hover:bg-[#e6f6fa] max-[992px]:hover:text-[#0095aa]"
                                    style={isMobile ? {
                                      fontSize: 16,
                                      fontWeight: 600,
                                      padding: '16px 18px',
                                      width: '100%',
                                      borderBottom: '1px solid #e0e0e0',
                                      background: '#f8fdff',
                                      textAlign: 'left',
                                    } : {}}
                                  >
                                    {item.name}
                                  </button>
                                  {/* Show chevron for nested on mobile and desktop */}
                                  <button
                                    onClick={() => {
                                      if (isMobile) {
                                        setOpenNestedDropdown(
                                          openNestedDropdown === item.id ? null : item.id
                                        );
                                      }
                                    }}
                                    className="flex items-center justify-center"
                                    style={{
                                      width: isMobile ? '60px' : '50px',
                                      padding: '0',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      background: '#333',
                                      color: '#fff',
                                      height: 'auto',
                                      borderLeft: '1px solid #e0e0e0',
                                      borderBottom: isMobile ? '1px solid #e0e0e0' : 'none',
                                      cursor: isMobile ? 'pointer' : 'default'
                                    }}
                                  >
                                    <FaChevronRight className={`text-[14px] transition-transform ${openNestedDropdown === item.id ? 'rotate-90' : ''}`} />
                                  </button>
                                </div>

                                <div
                                  ref={nestedDropdownRef}
                                  className={`
                                    absolute left-full top-0 bg-white rounded-lg
                                    shadow-[0_4px_20px_rgba(0,0,0,0.15)]
                                    min-w-[280px] py-2 ml-1
                                    transition-all duration-300
                                    ${!isMobile
                                      ? openNestedDropdown === item.id
                                        ? 'opacity-100 translate-x-0 visible'
                                        : 'opacity-0 -translate-x-2 invisible'
                                      : ''
                                    }
                                    max-[992px]:static max-[992px]:ml-0
                                    max-[992px]:shadow-none max-[992px]:bg-[#f8fdff]
                                    max-[992px]:w-full max-[992px]:rounded-none max-[992px]:py-0
                                    ${isMobile
                                      ? openNestedDropdown === item.id
                                        ? 'block'
                                        : 'hidden'
                                      : ''
                                    }
                                  `}
                                  style={isMobile ? {
                                    boxShadow: '0 2px 12px 0 rgba(0,149,170,0.10)',
                                    background: '#fff',
                                    minWidth: 0,
                                    width: '100%',
                                    padding: 0,
                                    borderTop: '1px solid #d0e7ef',
                                    zIndex: 11
                                  } : {}}
                                >
                                  {item.nestedItems.map((nestedItem, nestedIndex) => (
                                    <div
                                      key={nestedItem.name}
                                      className={`
                                        ${nestedIndex !== item.nestedItems.length - 1
                                          ? 'border-b border-gray-200'
                                          : ''
                                        }
                                      `}
                                    >
                                      <button
                                        onClick={() => handleNavigate(link.path, nestedItem.id)}
                                        className="w-full text-left px-5 py-3 text-[12px]
                                          font-medium hover:bg-[#e6f6fa]
                                          hover:text-[#0095aa] transition
                                          max-[992px]:text-[#222] max-[992px]:bg-transparent max-[992px]:hover:bg-[#e6f6fa] max-[992px]:hover:text-[#0095aa]"
                                        style={isMobile ? {
                                          fontSize: 16,
                                          fontWeight: 600,
                                          padding: '16px 18px',
                                          width: '100%',
                                          borderBottom: '1px solid #e0e0e0',
                                          background: '#f8fdff',
                                          textAlign: 'left',
                                        } : {}}
                                      >
                                        {nestedItem.name}
                                      </button>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => handleNavigate(link.path, item.id)}
                                className="w-full text-left px-5 py-3 text-[12px]
                                  font-medium hover:bg-[#f0f9fa]
                                  hover:text-[#0095aa] transition
                                  max-[992px]:text-[#222] max-[992px]:bg-transparent max-[992px]:hover:bg-[#e6f6fa] max-[992px]:hover:text-[#0095aa]"
                                style={isMobile ? { fontSize: 15, fontWeight: 500, padding: '14px 18px' } : {}}
                              >
                                {item.name}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`nav-link px-4 py-[10px]
                        whitespace-nowrap leading-none block text-center
                        max-[992px]:px-6 max-[992px]:py-4 max-[576px]:px-4 max-[576px]:py-3
                        ${isActive && !isMobile ? 'active' : ''}`}
                      style={isMobile ? { fontSize: 16, fontWeight: 600, textAlign: 'left', width: '100%', color: '#fff' } : {}}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact-us"
            onClick={() => setIsMobileMenuOpen(false)}
            className="bg-[#333] text-white px-7 py-[14px] rounded-full
              text-[12px] font-semibold hover:bg-[#444] transition
              hover:shadow-[0_8px_20px_0_#0095aa55] max-[992px]:w-full max-[992px]:max-w-[500px] max-[576px]:max-w-full
              max-[992px]:mt-4 text-center"
            style={isMobile ? { fontSize: 16, fontWeight: 700, marginTop: 18, padding: '16px 0' } : {}}
          >
            CONTACT US
          </Link>
          {/* Prevent background scroll when mobile menu is open - now handled in globals.css */}
        </nav>
      </header>
    </>
  );
};

export default Navbar;