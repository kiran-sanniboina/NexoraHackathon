"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NexoraLogo } from "@/components/NexoraLogo";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { CountdownClock } from "@/components/CountdownClock";

/**
 * Rotating Mix Phrases
 * Displayed in Small-Caps with generous tracking.
 */
const ROTATING_PHRASES = [
  "12 Hours Of Autonomous Building",
  "₹ Exciting Paytm Prizes & Cash Bounties",
  "Internship Opportunities With Paytm For Top Builders",
  "6 Domain-Specific Challenge Tracks",
  "( 3 + 1 ) Hour Sprints Across 3 Sequential Rounds",
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  // Rotating Mix Typography Transition Cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
        setFadeState("in");
      }, 350);
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="overview" className="relative min-h-[85vh] sm:min-h-[90vh] flex flex-col justify-center items-center text-center px-3 sm:px-6 pt-20 sm:pt-32 pb-14 sm:pb-24 overflow-hidden w-full">
      
      {/* Background Architectural Grid Lines & Soft Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        {/* Subtle Radial Ambient Glow in Nexora Cyan */}
        <div className="w-[300px] sm:w-[550px] h-[200px] sm:h-[300px] bg-primary/10 rounded-full blur-[90px] sm:blur-[130px] opacity-60" />
        <div className="absolute w-[220px] sm:w-[350px] h-[160px] sm:h-[220px] bg-blue-600/10 rounded-full blur-[80px] sm:blur-[110px] opacity-40 translate-y-16 sm:translate-y-20" />
        
        {/* Precision Architectural Grid Hairlines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4.5rem_4.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_45%,#000_70%,transparent_100%)]" />
      </div>

      {/* Main Centered Container with Strict Horizontal Alignment on All Screens */}
      <div className="max-w-3xl mx-auto w-full flex flex-col items-center justify-center relative z-10 space-y-4 sm:space-y-8">
        
        {/* 1. Top Event Badge with Pulsing Live Signal */}
        <div className="animate-fade-in-1 flex justify-center w-full">
          <div className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border border-border-subtle bg-surface/50 backdrop-blur-md text-[9px] sm:text-[11px] font-caps tracking-[0.09em] text-muted-foreground shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="text-foreground font-semibold">September – 20, 2026</span>
            <span className="text-border">•</span>
            <span>RGUKT, Srikakulam</span>
          </div>
        </div>

        {/* 2. Grand Convergence Line: CODING CLUB ✕ PAYTM — Symmetrically Centered on Every Viewport */}
        <div className="w-full flex flex-col items-center justify-center pt-0.5">
          <div className="w-full max-w-sm sm:max-w-xl flex items-center justify-center text-sm sm:text-2xl md:text-3xl font-medium font-caps tracking-[0.05em] sm:tracking-[0.06em] text-foreground select-none">
            
            {/* Left Wing: Coding Club (aligned toward center cross) */}
            <div className="flex-1 flex justify-end items-center pr-1.5 sm:pr-3 overflow-hidden">
              <div className="animate-slide-left text-foreground whitespace-nowrap will-change-transform">
                <span>Coding Club</span>
              </div>
            </div>

            {/* Center Anchor: Kinetic Cross 'X' locked at exact 50% */}
            <div className="shrink-0 flex items-center justify-center">
              <div className="animate-pop-cross relative inline-flex items-center justify-center text-primary font-mono text-xs sm:text-xl font-light px-1 will-change-transform">
                <span className="relative z-10">✕</span>
                <span className="absolute inset-0 bg-primary/25 blur-md rounded-full pointer-events-none" />
              </div>
            </div>

            {/* Right Wing: Paytm (aligned away from center cross) */}
            <div className="flex-1 flex justify-start items-center pl-1.5 sm:pl-3 gap-1 sm:gap-1.5 overflow-hidden">
              <div className="animate-slide-right flex items-center gap-1 sm:gap-1.5 text-foreground whitespace-nowrap will-change-transform">
                <span>Paytm</span>
                <span className="inline-block text-[7px] sm:text-[9px] font-mono px-1 sm:px-1.5 py-0.5 rounded border border-primary/30 bg-primary/10 text-primary font-bold tracking-wider sm:tracking-widest shrink-0">
                  OFFICIAL
                </span>
              </div>
            </div>

          </div>

          {/* Subtitle "Presents" */}
          <div className="animate-fade-in-1 text-[8px] sm:text-[10px] font-caps tracking-[0.2em] text-muted-foreground mt-1 sm:mt-2 uppercase text-center w-full">
            Presents
          </div>
        </div>

        {/* 3. Main Brand Monument: NEXORA '26 — Centered on All Screens */}
        <div className="animate-rise-up flex flex-col items-center justify-center w-full will-change-transform">
          <div className="inline-flex items-center justify-center relative">
            <NexoraLogo size={36} variant="prism" className="drop-shadow-[0_0_20px_rgba(0,186,242,0.25)] hidden sm:inline-flex mr-2 sm:mr-3" />
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold font-caps tracking-[0.04em] sm:tracking-[0.05em] text-foreground leading-none">
              Nexora
            </h1>
            <span className="text-base sm:text-2xl md:text-3xl font-mono text-primary font-bold self-start mt-0.5 sm:mt-1 ml-1 sm:ml-1.5">
              '26
            </span>
          </div>

          <p className="text-[9px] sm:text-xs font-caps tracking-[0.12em] sm:tracking-[0.16em] text-muted-foreground mt-1.5 sm:mt-2.5 max-w-xs sm:max-w-lg text-center leading-relaxed">
            Think Beyond - Build Beyond
          </p>
        </div>

        {/* 4. Rotating Mix Typography Animation — Centered with Equal Margins */}
        <div className="w-full max-w-[320px] sm:max-w-md mx-auto flex justify-center">
          <div className="h-8 sm:h-10 w-full flex items-center justify-center overflow-hidden relative border-y border-border-subtle bg-surface/20 backdrop-blur-sm rounded-md px-2 sm:px-3">
            <div
              className={`w-full flex items-center justify-center gap-1.5 sm:gap-2 text-[10px] sm:text-sm font-caps font-medium tracking-[0.05em] sm:tracking-[0.07em] text-foreground text-center transition-all duration-350 ease-out transform ${
                fadeState === "in"
                  ? "opacity-100 translate-y-0 filter-none scale-100"
                  : "opacity-0 -translate-y-2 sm:-translate-y-3 blur-sm scale-95"
              }`}
            >
              <Sparkles size={12} className="text-primary shrink-0 animate-pulse" />
              <span className="truncate">{ROTATING_PHRASES[currentIndex]}</span>
            </div>
          </div>
        </div>

        {/* 5. Live Countdown Clock to September 20, 2026 */}
        <div className="animate-fade-in-1 w-full flex justify-center pt-0.5 sm:pt-1">
          <CountdownClock />
        </div>

        {/* 6. Action Controls: Perfectly Symmetrical & Centered */}
        <div className="animate-fade-in-1 flex flex-row items-center justify-center gap-2 sm:gap-3 w-full max-w-[280px] sm:max-w-none mx-auto">
          {/* Primary Register Button with Kinetic Rolling Text */}
          <Link
            href="/register"
            className="group relative flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md sm:rounded-lg bg-foreground text-background font-caps font-semibold text-[10px] sm:text-xs tracking-[0.06em] sm:tracking-[0.07em] hover:opacity-90 transition-all duration-200 shadow-sm cursor-pointer whitespace-nowrap text-center"
          >
            <span className="relative inline-flex flex-col overflow-hidden h-[14px] sm:h-[16px] leading-[14px] sm:leading-[16px]">
              <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                Register Now
              </span>
              <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-background font-bold">
                Register Now
              </span>
            </span>
            <ArrowUpRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          {/* Secondary Explore Tracks Button with Kinetic Roll */}
          <a
            href="#tracks"
            className="group relative flex-1 sm:flex-initial inline-flex items-center justify-center gap-1 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-md sm:rounded-lg border border-border-subtle bg-surface/40 hover:bg-surface text-foreground font-caps font-medium text-[10px] sm:text-xs tracking-[0.06em] sm:tracking-[0.07em] transition-all duration-200 cursor-pointer whitespace-nowrap text-center"
          >
            <span className="relative inline-flex flex-col overflow-hidden h-[14px] sm:h-[16px] leading-[14px] sm:leading-[16px]">
              <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                Explore Tracks
              </span>
              <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-foreground font-bold">
                Explore Tracks
              </span>
            </span>
          </a>
        </div>

        {/* 7. Precision Event Metrics Ribbon: Centered & Balanced */}
        <div className="animate-fade-in-2 w-full max-w-[310px] sm:max-w-2xl mx-auto pt-1 sm:pt-3 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2 py-2 sm:py-3 px-2 sm:px-4 rounded-md sm:rounded-lg border border-border-subtle bg-surface/30 backdrop-blur-md w-full text-center">
            
            <div className="flex flex-col items-center justify-center text-center p-1 sm:p-1.5">
              <span className="text-xs sm:text-base font-bold font-mono text-primary">Sponsored Prizes</span>
              <span className="text-[8px] sm:text-[10px] font-caps tracking-[0.07em] text-muted-foreground mt-0.5">- Paytm</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-1 sm:p-1.5 border-l border-border-subtle">
              <span className="text-xs sm:text-base font-bold font-mono text-foreground">12 Hours</span>
              <span className="text-[8px] sm:text-[10px] font-caps tracking-[0.07em] text-muted-foreground mt-0.5">Building</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-1 sm:p-1.5 border-t sm:border-t-0 sm:border-l border-border-subtle">
              <span className="text-xs sm:text-base font-bold font-mono text-foreground">6 Domains</span>
              <span className="text-[8px] sm:text-[10px] font-caps tracking-[0.07em] text-muted-foreground mt-0.5">Tech • Design</span>
            </div>

            <div className="flex flex-col items-center justify-center text-center p-1 sm:p-1.5 border-t sm:border-t-0 border-l border-border-subtle">
              <span className="text-xs sm:text-base font-bold font-mono text-foreground">Internships</span>
              <span className="text-[8px] sm:text-[10px] font-caps tracking-[0.07em] text-muted-foreground mt-0.5">T & C Apply</span>
            </div>

          </div>
        </div>

      </div>

      {/* 7. Subtle Rotating Circular Typography Seal (Hidden on mobile) */}
      <div className="hidden lg:flex absolute bottom-8 right-8 items-center justify-center pointer-events-none opacity-60 hover:opacity-100 transition-opacity">
        <div className="relative w-24 h-24 flex items-center justify-center">
          <svg
            className="w-full h-full animate-spin-slow"
            viewBox="0 0 120 120"
          >
            <path
              id="seal-path"
              d="M 60,60 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
              fill="none"
            />
            <text className="text-[9px] font-caps tracking-[0.18em] fill-muted-foreground uppercase">
              <textPath href="#seal-path" startOffset="0%">
                • Coding Club • Partnered With Paytm • Nexora 2026
              </textPath>
            </text>
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-auto">
            <NexoraLogo size={20} variant="prism" />
          </div>
        </div>
      </div>

    </section>
  );
}

export default HeroSection;

