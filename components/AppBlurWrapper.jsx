"use client";
import { useState, useEffect } from "react";

export default function AppBlurWrapper({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      if (e.detail && typeof e.detail.isSearchOpen === "boolean") {
        setIsSearchOpen(e.detail.isSearchOpen);
      }
    };
    window.addEventListener("searchPopupToggle", handler);
    return () => window.removeEventListener("searchPopupToggle", handler);
  }, []);

  return (
    <>
      {isSearchOpen ? (
        <div key="blur-overlay" className="fixed inset-0 z-[2000] pointer-events-none backdrop-blur-[16px]" />
      ) : null}
      {children}
    </>
  );
}
