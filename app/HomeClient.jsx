"use client";

import dynamic from "next/dynamic";

// browser / animation heavy
const Hero = dynamic(() => import("@/components/Hero"), { ssr: false });
const Metrics = dynamic(() => import("@/components/Metrics"), { ssr: false });
const ProjectsSection = dynamic(
  () => import("@/components/ProjectsSection"),
  { ssr: false }
);

// normal components

import WhoWeAre from "@/components/WhoWeAre";
import VideoScrollSection from "@/components/VideoScrollSection";

import ValueSection from "@/components/ValueSection";
import CompletedProjects from "@/components/CompletedProjects";
import WhyUnified from "@/components/WhyUnified";
import OurClients from "@/components/OurClients";
import Testimonials from "@/components/Testimonials";
import { useEffect, useState } from "react";

export default function HomeClient() {
  const [showVideo, setShowVideo] = useState(true);

  useEffect(() => {
    if (showVideo) {
      const timer = setTimeout(() => setShowVideo(false), 3200); // 3.2s or video duration
      return () => clearTimeout(timer);
    }
  }, [showVideo]);

  return (
    <>
      {showVideo && (
        <div style={{
          position: 'fixed',
          zIndex: 9999,
          inset: 0,
          background: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'opacity 0.5s',
        }}>
          <video
            src="/assets/logo.mp4"
            autoPlay
            muted
            playsInline
            className="max-w-[60vw] max-h-[60vh] lg:max-w-[35vw] lg:max-h-[35vh] min-[1800px]:max-w-[25vw] min-[1800px]:max-h-[25vh]"
            style={{ background: 'transparent' }}
            onEnded={() => setShowVideo(false)}
          />
        </div>
      )}
      <div style={{ opacity: showVideo ? 0 : 1, transition: 'opacity 0.5s' }}>
        <Hero />
        <WhoWeAre />
        <VideoScrollSection />
        <ValueSection />
        <CompletedProjects />
        <WhyUnified />
        <OurClients />
        <Testimonials />
      </div>
    </>
  );
}
