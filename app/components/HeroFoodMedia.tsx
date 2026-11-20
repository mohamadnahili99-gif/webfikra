"use client";

import { useEffect, useRef, useState } from "react";

// The still image in the hero remains visible when video isn't available,
// motion is reduced, or the visitor has asked to save data.
export default function HeroFoodMedia() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (prefersReducedMotion || connection?.saveData) return;

    const container = containerRef.current;
    if (!container || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0" aria-hidden="true">
      {shouldLoadVideo && (
        <video
          className="h-full w-full object-cover"
          src="/webfikra-hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
    </div>
  );
}
