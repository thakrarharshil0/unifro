"use client";

import { useEffect, useRef, useState } from "react";
import "./Preloader.css";

const MAX_DURATION = 7000; // hard fallback
const POST_END_DELAY = 1500; // after video end
const FADE_DURATION = 600;

const Preloader = ({ onLoadingComplete }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const finishedRef = useRef(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const fallback = setTimeout(finishLoading, MAX_DURATION);
    return () => clearTimeout(fallback);
  }, []);

  const finishLoading = () => {
    if (finishedRef.current) return;
    finishedRef.current = true;

    setTimeout(() => {
      setFadeOut(true);
      setTimeout(onLoadingComplete, FADE_DURATION);
    }, POST_END_DELAY);
  };

  const handleEnded = () => finishLoading();
  const handleError = () => finishLoading();

  return (
    <div className={`preloader ${fadeOut ? "fade-out" : ""}`}>
      <div className="preloader-content">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleEnded}
          onError={handleError}
          className="preloader-video"
        >
          <source
            src="/assets/WhatsApp Video 2025-12-15 at 4.46.35 PM.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </div>
  );
};

export default Preloader;
