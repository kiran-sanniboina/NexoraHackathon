"use client";

import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  animate,
} from "framer-motion";
import {
  Brain,
  Activity,
  ShieldAlert,
  Atom,
  Layers,
  Sprout,
  ShieldCheck,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowDown,
  LucideIcon,
} from "lucide-react";

interface DomainItem {
  id: string;
  tag: string;
  name: string;
  subtitle: string;
  color: string;
  icon: LucideIcon;
  description: string;
  challenges: string[];
}

const DOMAINS: DomainItem[] = [
  {
    id: "ai-ml",
    tag: "Track 01",
    name: "AI & Machine Learning",
    subtitle: "Autonomous Agents & Deep Learning",
    color: "#00BAF2", // Nexora Cyan
    icon: Brain,
    description:
      "Architect autonomous multi-agent pipelines, localized edge neural models, generative synthesis engines, and real-time decision systems to address complex bottlenecks.",
    challenges: [
      "Agentic LLM Autonomous Workflows",
      "Real-Time Edge Computer Vision",
      "Predictive Analytics",
    ],
  },
  {
    id: "health",
    tag: "Track 02",
    name: "Health & BioTech",
    subtitle: "Precision Diagnostics & Telehealth",
    color: "#10B981", // Emerald Green
    icon: Activity,
    description:
      "Revolutionize healthcare accessibility with proactive telemetry diagnostics, AI-assisted clinical triage, and secure decentralized health systems engineered for rapid interventions.",
    challenges: [
      "Early Diagnostic Biomarker AI",
      "Decentralized Patient Data",
      "Assistive Medical Intelligence",
    ],
  },
  {
    id: "disaster-management",
    tag: "Track 03",
    name: "Disaster Management",
    subtitle: "Crisis Mitigation & Emergency Dispatch",
    color: "#F59E0B", // Amber / Flame
    icon: ShieldAlert,
    description:
      "Build resilient offline mesh communication protocols, geospatial risk prediction grids, and automated disaster logistics infrastructure to save lives in critical hours.",
    challenges: [
      "Offline Mesh Emergency Comms",
      "Geospatial Hazard Warning",
      "Autonomous Supply Dispatching",
    ],
  },
  {
    id: "quantum",
    tag: "Track 04",
    name: "Quantum Computing",
    subtitle: "Next-Gen Quantum Algorithms",
    color: "#8B5CF6", // Electric Violet
    icon: Atom,
    description:
      "Explore variational quantum optimization, quantum circuit simulation, and post-quantum cryptographic primitives to formulate solutions intractable on classical silicon.",
    challenges: [
      "Post-Quantum Cryptography",
      "Quantum Annealing Optimizers",
      "Noisy Qubit Simulation",
    ],
  },
  {
    id: "product-based",
    tag: "Track 05",
    name: "Product Based",
    subtitle: "Scalable Digital Ecosystems",
    color: "#EC4899", // Magenta Pink
    icon: Layers,
    description:
      "Design category-defining digital products, high-throughput consumer platforms, decentralized exchange networks, and intuitive developer tooling built for massive scale.",
    challenges: [
      "FinTech High-Throughput Engines",
      "Collaborative Real-Time Systems",
      "Autonomous SaaS Infrastructure",
    ],
  },
  {
    id: "cyber-security",
    tag: "Track 06",
    name: "Cyber Security",
    subtitle: "Zero-Trust & Digital Defense",
    color: "#06B6D4", // Cyber Cyan / Electric Teal
    icon: ShieldCheck,
    description:
      "Engineer resilient zero-trust architectures, autonomous threat intelligence pipelines, cryptographic defense primitives, and vulnerability mitigation protocols to secure critical systems.",
    challenges: [
      "Zero-Trust Identity Infrastructure",
      "Automated Exploit & Threat AI",
      "Cryptographic Data Protection",
    ],
  },
];

/**
 * Challenge Domains — Pinned 3D Horizontal Carousel
 * The section stays completely pinned to the viewport as the user scrolls,
 * smoothly revolving each card around the 3D cylindrical carousel.
 * ONLY after the user scrolls all the way through to the 6th card (Agriculture)
 * ONLY after the user scrolls all the way through to the 6th card (Cyber Security)
 * and finishes exploring does the page unpin and proceed to the next section.
 */
export function DomainsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeTrack, setActiveTrack] = useState<number>(0);

  // Manual rotation offset for button triggers and direct track pill clicks
  const manualOffset = useMotionValue(0);

  // Pinned scroll progress through the 460vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map scroll progress:
  // 0% -> 5%: Card 1 is locked in view
  // 5% -> 85%: Carousel revolves smoothly through cards (0deg to 300deg)
  // 85% -> 100%: Card 6 (final card) stays locked in view for dwell time
  // After 100%: Page unpins and naturally continues to next section
  const scrollRotation = useTransform(
    scrollYProgress,
    [0.05, 0.85],
    [0, 300],
    { clamp: true }
  );

  // Combine scroll rotation and manual interaction
  const combinedRotation = useTransform(
    [scrollRotation, manualOffset],
    ([sr, mo]) => Number(sr) + Number(mo)
  );

  const smoothRotation = useSpring(combinedRotation, {
    stiffness: 85,
    damping: 24,
    mass: 0.6,
  });

  // Negative Y-rotation revolves the carousel forward as user scrolls down
  const carouselRotateY = useTransform(smoothRotation, (val) => -val);

  // Track the currently active front card
  useEffect(() => {
    const unsubscribe = smoothRotation.on("change", (latest) => {
      const positiveAngle = ((latest % 360) + 360) % 360;
      const index = Math.min(5, Math.max(0, Math.round(positiveAngle / 60) % 6));
      setActiveTrack(index);
    });
    return () => unsubscribe();
  }, [smoothRotation]);

  // Jump to specific track by clicking pill or arrow
  const handleSelectTrack = (index: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const containerTop = rect.top + scrollTop;
    const scrollDistance = rect.height - window.innerHeight;

    // Calculate target scroll position within [0.05, 0.85]
    const targetProgress = 0.05 + (index / 5) * 0.8;
    const targetScrollY = containerTop + targetProgress * scrollDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    if (activeTrack < 5) {
      handleSelectTrack(activeTrack + 1);
    }
  };

  const handlePrev = () => {
    if (activeTrack > 0) {
      handleSelectTrack(activeTrack - 1);
    }
  };

  const isLastTrack = activeTrack === 5;

  return (
    <section
      id="tracks"
      ref={containerRef}
      className="relative w-full h-[460vh]"
    >
      {/* Sticky Viewport Stage — Stays pinned until user scrolls through the last card */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between items-center overflow-hidden pt-20 sm:pt-24 pb-4 sm:pb-6 px-3 sm:px-6 select-none">
        
        {/* Soft Ambient Radial Glow */}
        <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
          <div className="w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] bg-primary/8 rounded-full blur-[140px] opacity-40" />
        </div>

        {/* 1. Header Section */}
        <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center space-y-2 sm:space-y-2.5 z-20">
          
          {/* Top Pill with Pulsing Live Indicator */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-surface/60 backdrop-blur-md text-[9px] sm:text-[11px] font-caps tracking-[0.09em] text-muted-foreground shadow-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
            </span>
            <span className="text-foreground font-semibold">Frontier Domains</span>
            <span className="text-border">|</span>
            <span className="text-primary font-medium">Choose</span>
            <span className="text-primary font-medium">Your Domain</span>
          </div>

          {/* Section Title in Minimalist Small-Caps */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-caps tracking-[0.03em] text-foreground">
            Challenge Domains
          </h2>

          {/* Track Selection Navigation Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 pt-1 max-w-2xl px-2">
            {DOMAINS.map((domain, i) => {
              const isActive = activeTrack === i;
              return (
                <button
                  key={domain.id}
                  onClick={() => handleSelectTrack(i)}
                  className={`px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[11px] font-caps tracking-[0.06em] transition-all duration-300 flex items-center gap-1.5 border ${
                    isActive
                      ? "border-primary bg-primary/15 text-foreground font-semibold shadow-[0_0_12px_rgba(0,186,242,0.25)]"
                      : "border-border-subtle bg-surface/40 text-muted-foreground hover:text-foreground hover:border-white/20"
                  }`}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full transition-transform duration-300"
                    style={{
                      backgroundColor: domain.color,
                      transform: isActive ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                  <span>{domain.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. 3D Horizontal Carousel Stage */}
        <div className="relative w-full flex-grow flex items-center justify-center my-auto overflow-visible py-2 sm:py-4">
          
          {/* 3D Perspective Viewport */}
          <div
            className="relative w-[88vw] max-w-[310px] sm:max-w-[350px] md:max-w-[380px] h-[340px] sm:h-[380px] md:h-[410px]"
            style={{
              perspective: 1200,
              perspectiveOrigin: "50% 50%",
            }}
          >
            {/* Depth Offset Container (Centers active front card at Z=0) */}
            <div
              className="w-full h-full relative"
              style={{
                transformStyle: "preserve-3d",
                transform: `translateZ(calc(-1 * var(--carousel-radius, 340px)))`,
              }}
            >
              {/* The 3D Rotating Carousel Cylinder */}
              <motion.div
                className="w-full h-full relative"
                style={{
                  transformStyle: "preserve-3d",
                  rotateY: carouselRotateY,
                }}
              >
                {DOMAINS.map((domain, index) => {
                  const Icon = domain.icon;
                  const isActive = activeTrack === index;

                  return (
                    <div
                      key={domain.id}
                      onClick={() => !isActive && handleSelectTrack(index)}
                      className={`absolute inset-0 w-full h-full transition-all duration-300 ${
                        !isActive ? "cursor-pointer" : ""
                      }`}
                      style={{
                        transform: `rotateY(${index * 60}deg) translateZ(var(--carousel-radius, 340px))`,
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                      }}
                    >
                      {/* Domain Card Body */}
                      <div
                        className={`group relative h-full rounded-xl sm:rounded-2xl border bg-surface/95 dark:bg-[#0c0c0c]/95 backdrop-blur-2xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)] ${
                          isActive
                            ? "border-primary shadow-[0_0_30px_rgba(0,186,242,0.22)] ring-1 ring-primary/40 opacity-100 scale-100"
                            : "border-white/10 dark:border-white/10 opacity-40 hover:opacity-80 scale-95"
                        }`}
                      >
                        {/* Ambient Color Glow */}
                        <div
                          className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-[70px] opacity-25 pointer-events-none"
                          style={{ backgroundColor: domain.color }}
                        />

                        {/* 90° Precision Corner Accents */}
                        <div className="absolute top-0 left-0 w-2.5 h-2.5 pointer-events-none">
                          <div
                            className="absolute top-0 left-0 w-full h-[1.5px]"
                            style={{ backgroundColor: domain.color }}
                          />
                          <div
                            className="absolute top-0 left-0 h-full w-[1.5px]"
                            style={{ backgroundColor: domain.color }}
                          />
                        </div>
                        <div className="absolute top-0 right-0 w-2.5 h-2.5 pointer-events-none">
                          <div
                            className="absolute top-0 right-0 w-full h-[1.5px]"
                            style={{ backgroundColor: domain.color }}
                          />
                          <div
                            className="absolute top-0 right-0 h-full w-[1.5px]"
                            style={{ backgroundColor: domain.color }}
                          />
                        </div>
                        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 pointer-events-none">
                          <div
                            className="absolute bottom-0 left-0 w-full h-[1.5px]"
                            style={{ backgroundColor: domain.color }}
                          />
                          <div
                            className="absolute bottom-0 left-0 h-full w-[1.5px]"
                            style={{ backgroundColor: domain.color }}
                          />
                        </div>
                        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 pointer-events-none">
                          <div
                            className="absolute bottom-0 right-0 w-full h-[1.5px]"
                            style={{ backgroundColor: domain.color }}
                          />
                          <div
                            className="absolute bottom-0 right-0 h-full w-[1.5px]"
                            style={{ backgroundColor: domain.color }}
                          />
                        </div>

                        {/* Card Header: Tag & Icon */}
                        <div className="flex items-center justify-between gap-3 mb-2 sm:mb-3">
                          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-border-subtle bg-surface/70 backdrop-blur-sm text-[9px] sm:text-[10px] font-caps tracking-[0.08em] text-muted-foreground">
                            <span
                              className="w-1.5 h-1.5 rounded-full animate-pulse"
                              style={{ backgroundColor: domain.color }}
                            />
                            <span>{domain.tag}</span>
                          </div>

                          <div
                            className="p-1.5 sm:p-2 rounded-lg border transition-all duration-300 shadow-sm"
                            style={{
                              backgroundColor: `${domain.color}15`,
                              borderColor: `${domain.color}40`,
                              color: domain.color,
                            }}
                          >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                        </div>

                        {/* Title & Subtitle */}
                        <div className="space-y-0.5 mb-2 text-left">
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold font-caps tracking-[0.04em] text-foreground group-hover:text-primary transition-colors duration-200">
                            {domain.name}
                          </h3>
                          <p
                            className="text-[10px] sm:text-xs font-caps tracking-[0.07em] font-medium"
                            style={{ color: domain.color }}
                          >
                            {domain.subtitle}
                          </p>
                        </div>

                        {/* Description */}
                        <p className="text-[11px] sm:text-xs font-caps tracking-[0.035em] text-muted-foreground leading-relaxed mb-3 text-left line-clamp-3">
                          {domain.description}
                        </p>

                        {/* Core Focus Arenas */}
                        <div className="space-y-1 mb-3 pt-2.5 border-t border-border-subtle text-left">
                          <span className="text-[8.5px] sm:text-[9.5px] font-caps tracking-[0.09em] text-muted-foreground block font-semibold uppercase">
                            Focus Arenas
                          </span>
                          <div className="flex flex-wrap gap-1">
                            {domain.challenges.map((c, idx) => (
                              <span
                                key={idx}
                                className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-border-subtle bg-surface/50 text-[8.5px] sm:text-[10px] font-caps tracking-[0.04em] text-foreground/85"
                              >
                                <span
                                  className="w-1 h-1 rounded-full"
                                  style={{ backgroundColor: domain.color }}
                                />
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Card Action Footer */}
                        <Link
                          href={`/register?domain=${encodeURIComponent(domain.id)}`}
                          className="flex items-center justify-between pt-2.5 border-t border-border-subtle/80 group-hover:text-primary transition-colors duration-200"
                        >
                          <span className="text-[10px] sm:text-[11px] font-caps tracking-[0.07em] text-muted-foreground group-hover:text-foreground transition-colors duration-200">
                            Select This Domain
                          </span>
                          <div
                            className="flex items-center justify-center w-6 h-6 rounded-full border border-border-subtle transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            style={{ color: domain.color }}
                          >
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </div>

        {/* 3. Bottom Kinetic Action & Status Bar */}
        <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-2 z-20 pt-2 px-2 border-t border-border-subtle/60">
          
          {/* Controls: Prev, Indicator, Next */}
          <div className="w-full flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={activeTrack === 0}
              className={`flex items-center gap-1 sm:gap-1.5 px-3 py-1 sm:py-1.5 rounded-full border text-[9px] sm:text-[11px] font-caps tracking-[0.08em] transition-all duration-200 active:scale-95 ${
                activeTrack === 0
                  ? "border-border-subtle/40 opacity-40 cursor-not-allowed text-muted-foreground"
                  : "border-border-subtle bg-surface/50 hover:bg-surface text-foreground"
              }`}
            >
              <ChevronLeft className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span>Prev Track</span>
            </button>

            {/* Track Step Dots */}
            <div className="flex items-center gap-1.5">
              {DOMAINS.map((domain, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectTrack(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    activeTrack === i
                      ? "w-6 bg-primary"
                      : "w-1.5 bg-white/20 hover:bg-white/40"
                  }`}
                  aria-label={`Jump to track ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={activeTrack === 5}
              className={`flex items-center gap-1 sm:gap-1.5 px-3 py-1 sm:py-1.5 rounded-full border text-[9px] sm:text-[11px] font-caps tracking-[0.08em] transition-all duration-200 active:scale-95 ${
                activeTrack === 5
                  ? "border-border-subtle/40 opacity-40 cursor-not-allowed text-muted-foreground"
                  : "border-border-subtle bg-surface/50 hover:bg-surface text-foreground"
              }`}
            >
              <span>Next Track</span>
              <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>

          {/* Dynamic Scroll Helper Caption */}
          <div className="flex items-center gap-2 text-[9px] sm:text-[10px] font-caps tracking-[0.08em] text-muted-foreground">
            {isLastTrack ? (
              <span className="inline-flex items-center gap-1 text-primary font-semibold animate-pulse">
                <span>Final Track 06 Reached</span>
                <span>•</span>
                <span>Scroll Down To Continue</span>
                <ArrowDown className="w-2.5 h-2.5" />
              </span>
            ) : (
              <span>
                Scroll Down To Revolve Carousel ({activeTrack + 1}/6) • Pinned Until Final Track
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Embedded Dynamic CSS for responsive carousel radius */}
      <style jsx>{`
        :global(:root) {
          --carousel-radius: 270px;
        }
        @media (min-width: 640px) {
          :global(:root) {
            --carousel-radius: 310px;
          }
        }
        @media (min-width: 768px) {
          :global(:root) {
            --carousel-radius: 350px;
          }
        }
      `}</style>
    </section>
  );
}

