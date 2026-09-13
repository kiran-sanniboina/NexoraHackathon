"use client";

import React, { useEffect, useRef } from "react";
import lottie, { type AnimationItem } from "lottie-web";

/**
 * BackgroundAnimation
 * Renders the custom Lottie 3D isometric & constellation looping animation
 * as a hardware-accelerated, responsive, non-blocking background layer.
 */
export function BackgroundAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const isMobile = window.innerWidth < 768;

    animRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/animations/background-loop.json",
      rendererSettings: {
        preserveAspectRatio: isMobile ? "xMidYMid meet" : "xMidYMid slice",
      },
    });

    const handleResize = () => {
      const mobileNow = window.innerWidth < 768;
      const svg = containerRef.current?.querySelector("svg");
      if (svg) {
        svg.setAttribute("preserveAspectRatio", mobileNow ? "xMidYMid meet" : "xMidYMid slice");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      animRef.current?.destroy();
      animRef.current = null;
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none flex items-center justify-center"
    >
      {/* 1. Ambient radial glow behind the center */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,186,242,0.14)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(0,186,242,0.09)_0%,transparent_70%)]" />

      {/* 2. Lottie Animation Layer */}
      <div
        ref={containerRef}
        className="w-full h-full opacity-95 dark:opacity-95 blur-0 transition-opacity duration-700 [&>svg]:w-full [&>svg]:h-full scale-[2.2] sm:scale-100"
      />

      {/* 3. Blurred Visual Veil Overlay (4px blur effect for both desktop and mobile view) */}
      <div className="absolute inset-0 backdrop-blur-[4px] bg-background/10 sm:bg-background/25 pointer-events-none" />

      {/* 4. Ambient vignette to keep text and interactive cards readable */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--background)_95%)] pointer-events-none" />
    </div>
  );
}

export default BackgroundAnimation;
