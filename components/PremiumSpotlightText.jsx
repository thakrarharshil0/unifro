import React, { useRef, useEffect } from "react";

/**
 * PremiumSpotlightText
 * - Large text with a torch/spotlight hover effect (ChronicleHQ style)
 * - Uses CSS mask-image with radial-gradient and CSS variables for spotlight
 * - Tailwind for base, custom CSS for effect
 *
 * Props:
 *   text: string | ReactNode
 *   className?: string
 */
export default function PremiumSpotlightText({
  text = "PREMIUM SPOTLIGHT TEXT",
  className = ""
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty("--spot-x", `${x}px`);
      el.style.setProperty("--spot-y", `${y}px`);
    };
    const handleLeave = () => {
      // Move spotlight offscreen on leave
      el.style.setProperty("--spot-x", `-999px`);
      el.style.setProperty("--spot-y", `-999px`);
    };
    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    // Init offscreen
    handleLeave();
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={
        "relative w-full flex items-center justify-center min-h-[300px] md:min-h-[400px] select-none " +
        className
      }
      style={{
        // fallback for mask-image support
          WebkitMaskImage:
            "radial-gradient(180px at var(--spot-x, -999px) var(--spot-y, -999px), #090000 50%, transparent 100%)",
          maskImage:
            "radial-gradient(180px at var(--spot-x, -999px) var(--spot-y, -999px), #170303 50%, transparent 100%)",
        transition: "mask-image 0.2s, -webkit-mask-image 0.2s"
      }}
    >
      <span
        className="spotlight-text block text-[clamp(2.5rem,8vw,6rem)] font-black tracking-tight text-center"
        style={{
          display: 'inline-block',
          lineHeight: 1,
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
          WebkitTextFillColor: 'transparent',
        }}
      >
        <img
          src="assets/Unified%20New%20Logo.png"
          alt="Unified Logo"
          style={{
            width: 'auto',
            height: '18rem',
            maxWidth: '90vw',
            objectFit: 'contain',
            filter: 'drop-shadow(0 2px 24px #ffffff55)',
            transition: 'filter 0.3s',
            margin: '0 auto',
            display: 'block',
            dataCursor: 'default',
            maskImage: "url('assets/Unified%20New%20Logo.png')",
            WebkitMaskImage: "url('assets/Unified%20New%20Logo.png')",
            maskRepeat: 'no-repeat',
            WebkitMaskRepeat: 'no-repeat',
            maskPosition: 'center',
            WebkitMaskPosition: 'center',
            maskSize: 'contain',
            WebkitMaskSize: 'contain',
            background: "url('/assets/Photos/PROJECT VISUALS OF BONDED PT SYSTEM/9.jpg') center/cover no-repeat"
          }}
        />
      </span>
      <style jsx>{`
        .spotlight-text {
          color: #fff;
          -webkit-text-stroke: 2px #0095aa;
          text-stroke: 2px #0095aa;
          opacity: 0.18;
          transition: opacity 0.3s;
          position: relative;
          z-index: 1;
        }
        div:hover .spotlight-text {
          opacity: 1;
          color: #0095aa;
          -webkit-text-stroke: 0px #0095aa;
          text-stroke: 0px #0095aa;
          filter: drop-shadow(0 2px 24px #0095aa55);
        }
        div {
          background: transparent;
        }
        @media (max-width: 600px) {
          .spotlight-text {
            -webkit-text-stroke: 1px #0095aa;
            text-stroke: 1px #0095aa;
          }
        }
      `}</style>
    </div>
  );
}
