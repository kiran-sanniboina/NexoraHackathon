"use client";

import React, { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  Clock,
  UserCheck,
  ShieldCheck,
  Layers,
  Cpu,
  Trophy,
  CheckCircle2,
  Sparkles,
  FileText,
  Zap,
} from "lucide-react";

interface TimelineItem {
  id: string;
  phase: string;
  stageBadge: string;
  date: string;
  timeSlot?: string;
  durationLabel?: string;
  title: string;
  subtitle: string;
  accentColor: string;
  icon: React.ComponentType<{ className?: string }>;
  isRound: boolean;
  procedure: string[];
  deliverables: string[];
  qualificationNote?: string;
}

const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: "stage-01",
    phase: "Phase 01 • Registration Gate",
    stageBadge: "Stage 01",
    date: "September 15, 2026",
    timeSlot: "12:00 AM IST",
    title: "Registrations Open",
    subtitle: "Team Portal & Track Selection Goes Live",
    accentColor: "#00BAF2", // Nexora Cyan
    icon: UserCheck,
    isRound: false,
    procedure: [
      "Official registration portal opens for builders worldwide.",
      "Form teams of 2–4 members and lock in hacker profiles.",
      "Browse challenge domains and select preliminary track interest.",
    ],
    deliverables: [
      "Verified Squad Roster (2–4 Builders)",
      "Individual Hacker Badges & Profiles",
      "Preliminary Domain Track Selection",
    ],
    qualificationNote: "Registrations open up to September 18, 2026 midnight.",
  },
  {
    id: "stage-02",
    phase: "Phase 01 • Registration Gate",
    stageBadge: "Stage 02",
    date: "September 18, 2026",
    timeSlot: "11:59 PM IST",
    title: "Registrations Close",
    subtitle: "Portal Lock & Workstation Verification",
    accentColor: "#F59E0B", // Amber
    icon: ShieldCheck,
    isRound: false,
    procedure: [
      "Registration portal strictly locks; no subsequent squad entry.",
      "Team credentials and workstation allocations verified.",
      "Hackathon Day briefing packet issued to team captains.",
    ],
    deliverables: [
      "Confirmed Workstation & Desk Allocations",
      "Official Hacker Discord / Platform Credentials",
      "Final Verification Pass for Sprint Day",
    ],
    qualificationNote: "Only confirmed teams receive entry to Hackathon Sprint Day.",
  },
  {
    id: "round-01",
    phase: "Phase 02 • Hackathon Sprint Day",
    stageBadge: "Round 01",
    date: "September 20, 2026",
    timeSlot: "09:00 AM — 01:00 PM",
    durationLabel: "3h Build + 1h Jury",
    title: "Inauguration & Architecture Blueprint",
    subtitle: "Problem Statement Release & High-Level System Design",
    accentColor: "#00BAF2", // Nexora Cyan
    icon: Layers,
    isRound: true,
    procedure: [
      "09:00 AM Grand Inauguration & Keynote Address begins.",
      "Domain problem statements officially announced & unlocked.",
      "Teams choose challenge arena and formulate innovative idea.",
      "1 hour dedicated jury review on architecture & design feasibility.",
    ],
    deliverables: [
      "System Architecture Diagram & Technical Blueprint",
      "Problem-Solution Fit & Innovation Pitch",
      "Selected Domain Problem Statement Commitment",
    ],
    qualificationNote: "All registered teams participate in Round 01 evaluation.",
  },
  {
    id: "round-02",
    phase: "Phase 02 • Hackathon Sprint Day",
    stageBadge: "Round 02",
    date: "September 20, 2026",
    timeSlot: "01:00 PM — 05:00 PM",
    durationLabel: "3h Coding + 1h Jury",
    title: "Prototype Build & Mid-Evaluation",
    subtitle: "Rapid Implementation & High-Stakes Qualification Filter",
    accentColor: "#F59E0B", // Amber
    icon: Cpu,
    isRound: true,
    procedure: [
      "3 hours of intensive sprint coding and core implementation.",
      "Developing working prototype addressing problem specs.",
      "1 hour dedicated jury evaluation at team workstations.",
      "Jury reviews code quality, functionality, and execution depth.",
    ],
    deliverables: [
      "Working Functional Prototype with Core Specs",
      "Git Repository Checkpoint with Documented Commits",
      "Live API & Data Pipeline Integration Proof",
    ],
    qualificationNote: "Crucial Filter: Only qualifying shortlisted teams advance to Round 03!",
  },
  {
    id: "round-03",
    phase: "Phase 02 • Hackathon Sprint Day",
    stageBadge: "Round 03",
    date: "September 20, 2026",
    timeSlot: "05:00 PM — 09:00 PM",
    durationLabel: "3h Polish + 1h Grand Pitch",
    title: "Final Product & Grand Jury Pitch",
    subtitle: "Production Hardening, Stage Pitch & Winners Announcement",
    accentColor: "#10B981", // Emerald
    icon: Trophy,
    isRound: true,
    procedure: [
      "3 hours for production hardening, cloud deploy, and polish.",
      "Finalizing comprehensive PPT pitch deck highlighting impact.",
      "1 hour Grand Stage Pitches with live demonstrations & jury Q&A.",
      "Climax: Final jury scoring & official Winners Announcement.",
    ],
    deliverables: [
      "Complete Working End-to-End Deployed Product",
      "Comprehensive PPT Pitch Deck (Problem, Tech, Impact)",
      "Live Stage Demonstration & Paytm Jury Q&A",
    ],
    qualificationNote: "Finalist teams compete for Paytm cash prizes & internship offers!",
  },
];

export function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Dynamic Scroll Progress along the central spine
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 75%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative py-16 sm:py-24 md:py-32 px-3 sm:px-6 max-w-7xl mx-auto w-full overflow-hidden"
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[320px] sm:w-[650px] h-[320px] sm:h-[650px] bg-primary/5 rounded-full blur-[140px] opacity-60" />
      </div>

      {/* 1. Header Section */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-surface/60 backdrop-blur-md text-[9px] sm:text-[11px] font-caps tracking-[0.09em] text-muted-foreground shadow-sm">
          <Clock className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-foreground font-semibold">Event Schedule</span>
          <span className="text-border">•</span>
          <span className="text-primary font-medium">12 Hours Building</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-caps tracking-[0.03em] text-foreground">
          Hackathon Timeline
        </h2>

        <p className="text-xs sm:text-sm md:text-base font-caps tracking-[0.05em] text-muted-foreground max-w-2xl leading-relaxed text-center">
          From Registration Gate To Grand Finals. Three Sequential (3 + 1) Hour Sprints Designed To Validate Architecture, Functional Working Prototypes, And Live Pitching.
        </p>
      </div>

      {/* 2. Alternating Scrolling Timeline Spine Container */}
      <div className="relative max-w-5xl mx-auto">
        
        {/* Central Vertical Spine (Centered on md+, Left-aligned on mobile) */}
        <div className="absolute top-4 bottom-4 left-5 md:left-1/2 md:-translate-x-1/2 w-[2px] bg-white/10 dark:bg-white/10 pointer-events-none">
          {/* Animated Luminous Scroll Progress Beam */}
          <motion.div
            className="w-full bg-gradient-to-b from-[#00BAF2] via-[#F59E0B] to-[#10B981] origin-top shadow-[0_0_12px_rgba(0,186,242,0.6)]"
            style={{ scaleY: smoothProgress, height: "100%" }}
          />
        </div>

        {/* Timeline Events Stream */}
        <div className="space-y-10 sm:space-y-14 md:space-y-16">
          {TIMELINE_ITEMS.map((item, index) => {
            const isLeft = index % 2 === 0;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="relative flex flex-col md:flex-row items-start md:items-center w-full group"
              >
                {/* Central Node Indicator on the Spine */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center pointer-events-none">
                  <div
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 bg-background flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110"
                    style={{ borderColor: item.accentColor }}
                  >
                    <div
                      className="w-2.5 h-2.5 rounded-full animate-pulse"
                      style={{ backgroundColor: item.accentColor }}
                    />
                  </div>
                </div>

                {/* Horizontal Connecting Hairline (Desktop Only) */}
                <div
                  className={`hidden md:block absolute top-1/2 -translate-y-1/2 h-[1px] w-8 z-10 pointer-events-none transition-opacity duration-300 opacity-60 group-hover:opacity-100 ${
                    isLeft
                      ? "right-1/2 mr-3.5 bg-gradient-to-l from-white/30 to-transparent"
                      : "left-1/2 ml-3.5 bg-gradient-to-r from-white/30 to-transparent"
                  }`}
                  style={{
                    backgroundImage: isLeft
                      ? `linear-gradient(to left, ${item.accentColor}80, transparent)`
                      : `linear-gradient(to right, ${item.accentColor}80, transparent)`,
                  }}
                />

                {/* Card Container: Sliding from alternating sides while scrolling */}
                <motion.div
                  initial={{
                    opacity: 0,
                    x: isLeft ? -70 : 70,
                    filter: "blur(4px)",
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                  }}
                  viewport={{
                    once: false,
                    amount: 0.18,
                    margin: "-40px 0px",
                  }}
                  transition={{
                    duration: 0.6,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`w-full pl-12 md:pl-0 md:w-[calc(50%-2.5rem)] ${
                    isLeft
                      ? "md:mr-auto md:pr-0"
                      : "md:ml-auto md:pl-0"
                  }`}
                >
                  <div className="relative rounded-xl sm:rounded-2xl border border-white/10 dark:border-white/10 bg-surface/90 dark:bg-[#0c0c0c]/90 backdrop-blur-xl p-4 sm:p-5 shadow-[0_12px_32px_rgba(0,0,0,0.35)] transition-all duration-300 hover:border-white/25 overflow-hidden">
                    
                    {/* Subtle Radial Ambient Glow */}
                    <div
                      className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-[60px] opacity-15 pointer-events-none"
                      style={{ backgroundColor: item.accentColor }}
                    />

                    {/* 90° Precision Architectural Corner Accents */}
                    <div className="absolute top-0 left-0 w-2.5 h-2.5 pointer-events-none">
                      <div
                        className="absolute top-0 left-0 w-full h-[1.5px]"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <div
                        className="absolute top-0 left-0 h-full w-[1.5px]"
                        style={{ backgroundColor: item.accentColor }}
                      />
                    </div>
                    <div className="absolute top-0 right-0 w-2.5 h-2.5 pointer-events-none">
                      <div
                        className="absolute top-0 right-0 w-full h-[1.5px]"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <div
                        className="absolute top-0 right-0 h-full w-[1.5px]"
                        style={{ backgroundColor: item.accentColor }}
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 w-2.5 h-2.5 pointer-events-none">
                      <div
                        className="absolute bottom-0 left-0 w-full h-[1.5px]"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <div
                        className="absolute bottom-0 left-0 h-full w-[1.5px]"
                        style={{ backgroundColor: item.accentColor }}
                      />
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 pointer-events-none">
                      <div
                        className="absolute bottom-0 right-0 w-full h-[1.5px]"
                        style={{ backgroundColor: item.accentColor }}
                      />
                      <div
                        className="absolute bottom-0 right-0 h-full w-[1.5px]"
                        style={{ backgroundColor: item.accentColor }}
                      />
                    </div>

                    {/* Card Header Strip: Badge, Time Slot, and Duration */}
                    <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-border-subtle/80">
                      <div className="flex items-center gap-2">
                        <div
                          className="p-1.5 rounded-lg border flex items-center justify-center shrink-0"
                          style={{
                            backgroundColor: `${item.accentColor}15`,
                            borderColor: `${item.accentColor}35`,
                            color: item.accentColor,
                          }}
                        >
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                        </div>

                        <div>
                          <div className="flex items-center gap-1.5">
                            <span
                              className="text-[10px] sm:text-xs font-bold font-caps tracking-[0.08em]"
                              style={{ color: item.accentColor }}
                            >
                              {item.stageBadge}
                            </span>
                            <span className="text-border">•</span>
                            <span className="text-[10px] sm:text-xs font-semibold font-caps text-foreground">
                              {item.date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {item.durationLabel ? (
                        <span className="px-2 py-0.5 rounded-full border border-border-subtle bg-surface/60 text-[9px] sm:text-[10px] font-caps tracking-wider text-muted-foreground whitespace-nowrap">
                          {item.durationLabel}
                        </span>
                      ) : (
                        <span className="text-[9px] sm:text-[10px] font-mono text-muted-foreground">
                          {item.timeSlot}
                        </span>
                      )}
                    </div>

                    {/* Card Body: Title & Subtitle */}
                    <div className="space-y-1 mb-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm sm:text-base font-bold font-caps tracking-[0.03em] text-foreground">
                          {item.title}
                        </h3>
                        {item.timeSlot && item.durationLabel && (
                          <span className="text-[9px] font-mono text-primary font-medium shrink-0 ml-2">
                            {item.timeSlot}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] sm:text-xs font-caps tracking-[0.03em] text-muted-foreground line-clamp-2">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Compact Procedure & Agenda */}
                    <div className="space-y-2 mb-3 bg-surface/30 rounded-lg p-2.5 border border-border-subtle/50">
                      <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-caps tracking-[0.08em] font-semibold text-foreground uppercase">
                        <Zap className="w-3 h-3 text-primary shrink-0" />
                        <span>Agenda & Procedure</span>
                      </div>
                      <ul className="space-y-1.5 text-left">
                        {item.procedure.map((step, sIdx) => (
                          <li
                            key={sIdx}
                            className="text-[10px] sm:text-[11px] font-caps tracking-[0.02em] text-muted-foreground flex items-start gap-2 leading-relaxed"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                              style={{ backgroundColor: item.accentColor }}
                            />
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Mandatory Deliverables Checklist */}
                    <div className="space-y-1.5 mb-3">
                      <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-caps tracking-[0.08em] font-semibold text-foreground uppercase">
                        <FileText className="w-3 h-3 text-primary shrink-0" />
                        <span>Deliverables Checklist</span>
                      </div>

                      <div className="grid grid-cols-1 gap-1.5">
                        {item.deliverables.map((deliv, dIdx) => (
                          <div
                            key={dIdx}
                            className="px-2.5 py-1.5 rounded-md border border-border-subtle/80 bg-surface/40 flex items-center gap-2 text-[10px] sm:text-[11px] font-caps tracking-[0.03em] text-foreground"
                          >
                            <CheckCircle2
                              className="w-3 h-3 shrink-0"
                              style={{ color: item.accentColor }}
                            />
                            <span className="truncate">{deliv}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Qualification Note / Alert Footer */}
                    {item.qualificationNote && (
                      <div
                        className="px-2.5 py-1.5 rounded-md border text-[9px] sm:text-[10px] font-caps tracking-[0.04em] flex items-center gap-1.5"
                        style={{
                          backgroundColor: `${item.accentColor}10`,
                          borderColor: `${item.accentColor}30`,
                          color: item.accentColor,
                        }}
                      >
                        <Sparkles className="w-3 h-3 shrink-0" />
                        <span className="font-semibold">{item.qualificationNote}</span>
                      </div>
                    )}

                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default TimelineSection;
