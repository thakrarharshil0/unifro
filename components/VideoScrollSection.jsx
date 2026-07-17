"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react"; // I'll check if lucide-react is available, otherwise use SVGs

export default function VideoScrollSection() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Raw transforms - width expands + height reveals from bottom
  const rawWidth = useTransform(scrollYProgress, [0.2, 0.7], ["40%", "100%"]);
  const rawHeight = useTransform(scrollYProgress, [0.2, 0.7], ["0%", "100%"]);
  const rawRadius = useTransform(scrollYProgress, [0.2, 0.7], ["32px", "0px"]);

  // Smooth springs
  const width = useSpring(rawWidth, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });

  const height = useSpring(rawHeight, {
    stiffness: 60,
    damping: 20,
    mass: 0.8,
  });

  const borderRadius = useSpring(rawRadius, {
    stiffness: 80,
    damping: 20,
  });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[50vh] flex items-end justify-center bg-white py-12"
    >
      <a
        href="https://youtu.be/kyOsFEB6Oww?si=E3ev-x1WGzJVkwVX"
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-center w-full"
      >
        <motion.div
          style={{ width, height, borderRadius }}
          className="relative overflow-hidden shadow-2xl"
        >
          <video
            ref={videoRef}
            src="/assets/home-video.mp4"
            autoPlay
            muted={isMuted}
            loop
            playsInline
            className="w-full h-[80vh] object-cover"
            data-cursor="play-video"
          />

          {/* Sound Toggle Button */}
          <button
            onClick={toggleMute}
            suppressHydrationWarning
            className="absolute bottom-6 right-6 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-black/20 backdrop-blur-md border border-white/30 text-white transition-all duration-300 hover:bg-black/40 hover:scale-110"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
            )}
          </button>
        </motion.div>
      </a>
    </section>
  );
}
