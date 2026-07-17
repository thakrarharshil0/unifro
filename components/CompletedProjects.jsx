import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const TEXT = 'BUILT ON ENGINEERING DELIVERED WITH CERTAINTY  ';

export default function CompletedProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://admin.unifiedpts.com/api";
        const fetchUrl = process.env.NODE_ENV === 'development' ? '/api-proxy' : apiUrl;
        const response = await fetch(`${fetchUrl}/projects`);
        if (response.ok) {
          const data = await response.json();
          // Map backend projects to component structure
          const mapped = data.map(p => {
            const baseUrl = apiUrl.replace('/api', '');
            const location = [p.city_name, p.state_name].filter(Boolean).join(', ') || 'India';
            return {
              id: p.id,
              title: p.name,
              location: location,
              image: p.image ? `${baseUrl}/storage/${p.image}` : '/placeholder-project.jpg',
              category: 'Construction', // Static category since type was removed
            };
          });
          setProjects(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const doubledProjects = projects.length > 0
    ? (projects.length < 5 ? [...projects, ...projects, ...projects, ...projects] : [...projects, ...projects])
    : [];

  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const moveMouse = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.left = mouse.current.x + 'px';
        dotRef.current.style.top = mouse.current.y + 'px';
      }
    };

    document.addEventListener('mousemove', moveMouse);

    const animate = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.15;

      if (ringRef.current) {
        ringRef.current.style.left =
          ringPos.current.x + 'px';
        ringRef.current.style.top =
          ringPos.current.y + 'px';
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', moveMouse);
    };
  }, []);
  const textRef = useRef(null);

  const resetText = () => {
    const letters = textRef.current?.querySelectorAll('.letter');
    letters?.forEach((l) => (l.style.color = '#9ca3af'));
  };

  return (
    <section className="relative w-full bg-white overflow-hidden px-[60px] max-xl:px-[40px] max-lg:px-[30px] max-md:px-[20px] max-sm:px-[15px] min-[2500px]:px-40">
      <div className="max-w-[1600px] mx-auto min-[2500px]:max-w-[2200px]">

        {/* TITLE */}
        <div className="text-center mb-[50px] max-md:mb-[30px]">
          <h2 className="text-[#1a2a5e] font-anton font-black text-center mb-16 relative z-10 text-[clamp(2.5rem,7vw,5rem)] pt-24 min-[2500px]:text-[8rem] min-[2500px]:mt-20">
            COMPLETED PROJECTS
          </h2>
          <div className="absolute inset-0 hidden lg:flex justify-center font-['Impact'] text-[120px] text-black/5 uppercase pointer-events-none min-[2500px]:text-[200px]">
            COMPLETED PROJECTS
          </div>
        </div>

        {/* SLIDER */}
        <div
          className="
    relative w-full overflow-hidden bg-sky-300 py-[35px]

    [mask-image:linear-gradient(to_right,
      transparent_0%,
      black_12%,
      black_88%,
      transparent_100%
    )]
    [-webkit-mask-image:linear-gradient(to_right,
      transparent_0%,
      black_12%,
      black_88%,
      transparent_100%
    )]
  "
        >
          <div className="pointer-events-none absolute top-0 left-0 h-full w-[60px] sm:w-[200px] z-50
    bg-gradient-to-r from-white via-white/2 to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-[60px] sm:w-[200px] z-50
    bg-gradient-to-l from-white via-white/2 to-transparent" />
          <div className="relative bg-sky-300 px-[20px] py-[10px]">
            <div className="flex gap-[10px] min-w-max animate-infiniteScroll hover:[animation-play-state:paused] max-md:gap-[12px]">


              {doubledProjects.map((project, index) => (
                <div
                  key={`${project.id}-${index}`}
                  className="
                group relative flex-shrink-0
                w-[230px] h-[450px] hover:w-[500px]
                max-sm:w-[160px] max-sm:h-[320px] max-sm:hover:w-[220px]
                backdrop-blur-xl bg-white
                border border-white
                rounded-2xl p-[10px]
                shadow-lg hover:shadow-2xl
                transition-all duration-700
                ease-[cubic-bezier(0.4,0,0.2,1)]
                min-[2500px]:w-[350px] min-[2500px]:h-[650px] min-[2500px]:hover:w-[750px]
              "
                >

                  <div
                    className="
    relative w-full h-full overflow-hidden rounded-2xl

    border border-white
    ring-2 ring-white
    ring-offset-0

    shadow-[inset_0_0_25px_rgba(255,255,255,0.25)]

    transition-all duration-700
  "
                  >


                    {/* Location badge: show above image on desktop, below image on mobile */}
                    <div
                      className="
                    absolute top-2 left-1/2 z-20
                    -translate-x-1/2
                    bg-black/30 backdrop-blur-md
                    text-white text-sm font-semibold
                    px-6 py-2.5 rounded-full
                    border border-white
                    whitespace-nowrap
                    transition-all duration-500 ease-out
                    opacity-100 group-hover:opacity-0
                    translate-y-0 group-hover:-translate-y-4
                    max-sm:hidden
                    min-[2500px]:text-xl min-[2500px]:px-10 min-[2500px]:py-4
                  "
                    >
                      📍 {project.location}
                    </div>

                    {/* Mobile location badge at top over image */}
                    <div
                      className="
                    sm:hidden
                    absolute left-1/2 top-2 z-30
                    -translate-x-1/2
                    bg-black/60 backdrop-blur-md
                    text-white text-xs font-semibold
                    px-3 py-1.5 rounded-full
                    border border-white
                    whitespace-nowrap
                    origin-top
                  "
                    >
                      📍 {project.location}
                    </div>




                    <img
                      src={project.image}
                      alt={project.title}
                      className="
                        absolute inset-0 w-full h-full
                        object-cover

                        /* default state */
                        scale-100
                        brightness-75

                        /* hover state */
                        group-hover:blur-0
                        group-hover:brightness-100

                        transition-all duration-700 ease-out
                      "
                    />


                    {/* OVERLAY */}
                    <div
                      className="
    absolute inset-x-0 bottom-0 z-20
    p-[25px] min-[2500px]:p-12

    bg-gradient-to-t
    from-black/90 via-black/60 to-transparent

    translate-y-full group-hover:translate-y-0
    transition-transform duration-700
  "
                    >
                      <span
                        className="
       inline-block mb-3
      bg-[#0095AA] text-white text-[11px]
      font-bold uppercase tracking-[1.5px]
      px-4 py-1 rounded-full
      min-[2500px]:text-lg min-[2500px]:px-8 min-[2500px]:py-2
    "
                      >
                        {project.category}
                      </span>

                      <h3 className="text-white text-[22px] font-semibold mb-2 min-[2500px]:text-4xl">
                        {project.title}
                      </h3>

                      <p className="text-white/80 text-sm leading-relaxed max-sm:hidden min-[2500px]:text-2xl">
                        High-performance engineering project delivered with precision and certainty.
                      </p>
                    </div>


                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>

        {/* TAGLINE SLIDER */}
        <section
          className="relative w-full bg-white min-h-[180px] overflow-hidden"
        >

          {/* 🌫️ EDGE FADES */}
          <div className="pointer-events-none absolute top-0 left-0 w-full h-[80px] z-20 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute bottom-0 left-0 w-full h-[80px] z-20 bg-gradient-to-t from-white to-transparent" />
          <div className="pointer-events-none absolute top-0 left-0 h-full w-[80px] z-20 bg-gradient-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 h-full w-[80px] z-20 bg-gradient-to-l from-white to-transparent" />

          {/* CONTENT */}
          <div
            className="
    relative z-30
    w-full
    overflow-hidden

    [mask-image:linear-gradient(to_right,
      transparent_0%,
      black_12%,
      black_88%,
      transparent_100%
    )]
    [-webkit-mask-image:linear-gradient(to_right,
      transparent_0%,
      black_12%,
      black_88%,
      transparent_100%
    )]
  "
          >
            <div className="flex w-max animate-slideBanner pt-12">

              {[0, 1].map((_, loopIndex) => (
                <div
                  key={loopIndex}
                  className="flex items-center gap-[30px] whitespace-nowrap"
                >
                  <img
                    src="/assets/icon.png"
                    alt="icon"
                    width={80}
                    height={80}
                    className="animate-rotateAsterisk object-contain min-[2500px]:w-32 min-[2500px]:h-32"
                  />

                  <span
                    className="text-[4.2rem] max-md:text-[3rem] max-sm:text-[2rem]
          font-bold tracking-[2px] font-[Anton] text-gray-400 min-[2500px]:text-[6.5rem]"
                  >
                    {TEXT.split('').map((char, i) => (
                      <span
                        key={i}
                        className="
              inline-block
              transition-all duration-300
              hover:scale-[1.3]
              hover:text-[#0095AA]
              hover:drop-shadow-[0_0_8px_rgba(0,149,170,0.6)]
              cursor-default
            "
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


      </div>
    </section>
  );
}
