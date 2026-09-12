"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  CheckSquare,
  Bot,
  Laptop,
  CalendarClock,
  AlertTriangle,
  Trophy,
  Ticket,
  IdCard,
  Scale,
  Sparkles,
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  HandMetal,
} from "lucide-react";

export interface RuleItem {
  id: number;
  ruleNumber: string;
  category: string;
  title: string;
  coreRule: string;
  explanation: string;
  accentColor: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
}

export const RULES_DATA: RuleItem[] = [
  {
    id: 1,
    ruleNumber: "01",
    category: "ELIGIBILITY",
    title: "Cross-Year & Branch Freedom",
    coreRule: "Team can be formed of any year students with any branch.",
    explanation:
      "Squads of 2–4 members can be flexibly formed across any undergraduate year (1st to 4th year) and from any academic department. Cross-disciplinary teams uniting engineering, design, and analytics are strongly encouraged.",
    accentColor: "#00BAF2", // Nexora Cyan
    icon: Users,
    tag: "OPEN ELIGIBILITY",
  },
  {
    id: 2,
    ruleNumber: "02",
    category: "SUBMISSIONS",
    title: "Mandatory Round Deliverables",
    coreRule: "Team must give mentioned deliverables for every round.",
    explanation:
      "All 3 hackathon rounds have strictly defined deliverables: Round 01 requires the System Architecture Blueprint; Round 02 requires a working prototype; and Round 03 demands the complete deployed product with a comprehensive PPT pitch deck.",
    accentColor: "#3B82F6", // Blue
    icon: CheckSquare,
    tag: "EVALUATION CRITERIA",
  },
  {
    id: 3,
    ruleNumber: "03",
    category: "AI & INTEGRITY",
    title: "AI Tools & Jury Defense",
    coreRule: "Team can use any AI tool but must answer the questions framed by the jury about code or approach.",
    explanation:
      "Participants may leverage modern AI assistants (Copilot, Claude, ChatGPT, v0) to accelerate prototyping. However, every member must thoroughly understand, defend, and explain the architecture, algorithms, and code logic when questioned by the jury panel.",
    accentColor: "#8B5CF6", // Violet
    icon: Bot,
    tag: "AI DEFENSE REQUIRED",
  },
  {
    id: 4,
    ruleNumber: "04",
    category: "LOGISTICS",
    title: "Bring Your Own Hardware",
    coreRule: "Teams must bring their own laptops and adapters.",
    explanation:
      "Every hacker is responsible for bringing their personal laptop, charging bricks, extension cords/adapters, and required hardware peripherals. High-speed networking, table power drops, and venue access will be provided by the organizers.",
    accentColor: "#EC4899", // Magenta
    icon: Laptop,
    tag: "HARDWARE PROTOCOL",
  },
  {
    id: 5,
    ruleNumber: "05",
    category: "REGISTRATION",
    title: "Strict Registration Deadline",
    coreRule: "Every team should register beforehand in the specified deadline only.",
    explanation:
      "Registration opens on September 15, 2026, and strictly locks on September 18, 2026 at midnight IST. Late admissions or on-spot walk-in team registrations will not be accommodated under any circumstances.",
    accentColor: "#F59E0B", // Amber
    icon: CalendarClock,
    tag: "STRICT DEADLINE",
  },
  {
    id: 6,
    ruleNumber: "06",
    category: "EVALUATION",
    title: "Non-Submission Disqualification",
    coreRule: "The teams who fail to give deliverables at the jury panel will be disqualified.",
    explanation:
      "Submitting deliverables on schedule is non-negotiable. Teams unable to showcase the mandatory stage outputs when the jury evaluates their workstation or stage will be automatically disqualified and eliminated from subsequent sprint rounds.",
    accentColor: "#EF4444", // Red
    icon: AlertTriangle,
    tag: "ZERO TOLERANCE",
  },
  {
    id: 7,
    ruleNumber: "07",
    category: "SPONSORSHIP",
    title: "Paytm Official Prize Sponsorship",
    coreRule: "All the prizes are sponsored by Paytm official and budget came from collection amount.",
    explanation:
      "All cash bounties, trophies, and awards are officially backed and sponsored by Paytm in partnership with the Coding Club. The total prize pool and operational budget are funded through official Paytm sponsorship and verified pool collections.",
    accentColor: "#00BAF2", // Paytm Cyan
    icon: Trophy,
    tag: "OFFICIAL PARTNER",
  },
  {
    id: 8,
    ruleNumber: "08",
    category: "CREDENTIALS",
    title: "Registration Ticket & Team ID",
    coreRule: "Teams will receive a ticket after registration along with a team ID.",
    explanation:
      "Upon successful roster verification and registration approval, teams will receive an official digital entry ticket embedded with a unique alphanumeric Team ID, workstation cluster coordinates, and authentication QR code.",
    accentColor: "#10B981", // Emerald
    icon: Ticket,
    tag: "ENTRY CREDENTIAL",
  },
  {
    id: 9,
    ruleNumber: "09",
    category: "IDENTIFICATION",
    title: "Continuous Ticket Possession",
    coreRule: "Team must have their team ticket along with them throughout the hackathon.",
    explanation:
      "The official team ticket must remain accessible (digitally or physically) throughout the 12-hour building marathon. Tickets will be scanned during morning gate entry, meal counters, workstation visits, and before each jury evaluation.",
    accentColor: "#06B6D4", // Teal
    icon: IdCard,
    tag: "MANDATORY PASS",
  },
  {
    id: 10,
    ruleNumber: "10",
    category: "DECORUM",
    title: "Jury Instructions & Coordination",
    coreRule: "Teams must respect and obey the jury's instructions for better coordination.",
    explanation:
      "Professional sportsmanship and prompt adherence to the jury's schedules, time limits, and feedback are essential. The decisions and scoring metrics of the judging panel and organizers are binding and final.",
    accentColor: "#8B5CF6", // Violet
    icon: Scale,
    tag: "CODE OF CONDUCT",
  },
  {
    id: 11,
    ruleNumber: "11",
    category: "FRESH BUILD",
    title: "No Prior Work (Zero Pre-Existing Code)",
    coreRule: "Teams should not showcase their before work if any problem statement met their previous projects. Everything must be built right after announcement.",
    explanation:
      "All solutions must be engineered from scratch starting strictly after the 09:00 AM problem statement announcement on September 20. Reusing or presenting pre-existing repositories or past semester projects will lead to immediate disqualification.",
    accentColor: "#F59E0B", // Amber
    icon: Sparkles,
    tag: "FRESH CODEBASE ONLY",
  },
  {
    id: 12,
    ruleNumber: "12",
    category: "COMPLIANCE",
    title: "Event Rules Enforcement & Disqualification",
    coreRule: "Team who fail to follow above rules while event happens will be disqualified.",
    explanation:
      "Adherence to all Nexora 2026 regulations is strictly enforced throughout the event. Any squad found violating guidelines, compromising fair play, or failing compliance checkpoints will face immediate removal and forfeit all prize eligibility.",
    accentColor: "#EF4444", // Red
    icon: ShieldAlert,
    tag: "STRICT ENFORCEMENT",
  },
];

export function RulesSection() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const totalRules = RULES_DATA.length;
  const currentRule = RULES_DATA[currentIndex];
  const Icon = currentRule.icon;

  // Navigation handlers
  // Per user prompt:
  // "if he swipes right he should see next rule and if he swipes left he should again see previous rule until he visits the last rule"
  const goToNext = useCallback(() => {
    if (currentIndex < totalRules - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    }
  }, [currentIndex, totalRules]);

  const goToPrev = useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNext();
      } else if (e.key === "ArrowLeft") {
        goToPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Animation variants for card slide transitions
  const cardVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.95,
      filter: "blur(4px)",
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section
      id="rules"
      className="relative py-16 sm:py-24 md:py-32 px-3 sm:px-6 max-w-7xl mx-auto w-full overflow-hidden"
    >
      {/* Background Ambient Radial Glow */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div
          className="w-[300px] sm:w-[550px] h-[300px] sm:h-[550px] rounded-full blur-[140px] opacity-25 transition-colors duration-500"
          style={{ backgroundColor: currentRule.accentColor }}
        />
      </div>

      {/* 1. Section Header */}
      <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border-subtle bg-surface/60 backdrop-blur-md text-[9px] sm:text-[11px] font-caps tracking-[0.09em] text-muted-foreground shadow-sm">
          <ShieldCheck className="w-3 h-3 text-primary animate-pulse" />
          <span className="text-foreground font-semibold">Guidelines & Compliance</span>
          <span className="text-border">•</span>
          <span className="text-primary font-medium">12 Core Protocols</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold font-caps tracking-[0.03em] text-foreground">
          Hackathon Rules & Regulations
        </h2>

        <p className="text-xs sm:text-sm md:text-base font-caps tracking-[0.05em] text-muted-foreground max-w-xl leading-relaxed text-center">
          Essential Protocols For Fair Competition, Deliverable Deadlines, AI Assistance Defense, And Paytm Official Guidelines.
        </p>
      </div>

      {/* 2. Interactive Swipeable Small Card Container */}
      <div className="relative max-w-xl mx-auto flex flex-col items-center">
        
        {/* Progress Tracker Pill */}
        <div className="flex items-center justify-between w-full px-2 mb-3 text-[10px] sm:text-xs font-caps tracking-[0.08em] text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="text-foreground font-bold">Rule {currentRule.ruleNumber}</span>
            <span>of {totalRules}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-mono text-muted-foreground hidden sm:inline-block">
              {currentIndex === totalRules - 1 ? "Final Protocol" : "Swipe Right for Next →"}
            </span>
            <div className="w-24 sm:w-32 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${((currentIndex + 1) / totalRules) * 100}%`,
                  backgroundColor: currentRule.accentColor,
                }}
              />
            </div>
          </div>
        </div>

        {/* The Swipeable Card with Navigation Arrows */}
        <div className="relative w-full flex items-center justify-center">
          
          {/* Previous Arrow Button (Desktop & Touch) */}
          <button
            onClick={goToPrev}
            disabled={currentIndex === 0}
            aria-label="Previous Rule"
            className={`absolute -left-3 sm:-left-6 md:-left-12 z-20 p-2 sm:p-2.5 rounded-full border bg-surface/90 backdrop-blur-md transition-all duration-200 shadow-md ${
              currentIndex === 0
                ? "opacity-30 cursor-not-allowed border-border-subtle text-muted-foreground"
                : "opacity-80 hover:opacity-100 hover:scale-105 border-white/20 text-foreground cursor-pointer hover:border-primary"
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Next Arrow Button (Desktop & Touch) */}
          <button
            onClick={goToNext}
            disabled={currentIndex === totalRules - 1}
            aria-label="Next Rule"
            className={`absolute -right-3 sm:-right-6 md:-right-12 z-20 p-2 sm:p-2.5 rounded-full border bg-surface/90 backdrop-blur-md transition-all duration-200 shadow-md ${
              currentIndex === totalRules - 1
                ? "opacity-30 cursor-not-allowed border-border-subtle text-muted-foreground"
                : "opacity-80 hover:opacity-100 hover:scale-105 border-white/20 text-foreground cursor-pointer hover:border-primary"
            }`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Swipe Card Area with Framer Motion Drag Gestures */}
          <div className="w-full relative min-h-[380px] sm:min-h-[360px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentRule.id}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDragEnd={(_, info) => {
                  // Per user request:
                  // "if he swipes right he should see next rule and if he swipes left he should again see previous rule"
                  if (info.offset.x > 35) {
                    goToNext();
                  } else if (info.offset.x < -35) {
                    goToPrev();
                  }
                }}
                className="w-full cursor-grab active:cursor-grabbing select-none"
              >
                <div className="relative rounded-2xl border border-white/10 dark:border-white/10 bg-surface/95 dark:bg-[#0c0c0c]/95 backdrop-blur-2xl p-5 sm:p-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)] overflow-hidden">
                  
                  {/* Subtle Top-Right Ambient Halo */}
                  <div
                    className="absolute -top-20 -right-20 w-44 h-44 rounded-full blur-[70px] opacity-20 pointer-events-none"
                    style={{ backgroundColor: currentRule.accentColor }}
                  />

                  {/* 90° Precision Architectural Corner Accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none">
                    <div
                      className="absolute top-0 left-0 w-full h-[1.5px]"
                      style={{ backgroundColor: currentRule.accentColor }}
                    />
                    <div
                      className="absolute top-0 left-0 h-full w-[1.5px]"
                      style={{ backgroundColor: currentRule.accentColor }}
                    />
                  </div>
                  <div className="absolute top-0 right-0 w-3 h-3 pointer-events-none">
                    <div
                      className="absolute top-0 right-0 w-full h-[1.5px]"
                      style={{ backgroundColor: currentRule.accentColor }}
                    />
                    <div
                      className="absolute top-0 right-0 h-full w-[1.5px]"
                      style={{ backgroundColor: currentRule.accentColor }}
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none">
                    <div
                      className="absolute bottom-0 left-0 w-full h-[1.5px]"
                      style={{ backgroundColor: currentRule.accentColor }}
                    />
                    <div
                      className="absolute bottom-0 left-0 h-full w-[1.5px]"
                      style={{ backgroundColor: currentRule.accentColor }}
                    />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none">
                    <div
                      className="absolute bottom-0 right-0 w-full h-[1.5px]"
                      style={{ backgroundColor: currentRule.accentColor }}
                    />
                    <div
                      className="absolute bottom-0 right-0 h-full w-[1.5px]"
                      style={{ backgroundColor: currentRule.accentColor }}
                    />
                  </div>

                  {/* Card Top Strip: Rule Index & Category Badge */}
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-border-subtle">
                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs sm:text-sm font-bold font-mono tracking-wider"
                        style={{ color: currentRule.accentColor }}
                      >
                        RULE {currentRule.ruleNumber}
                      </span>
                      <span className="text-border">/</span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {totalRules < 10 ? `0${totalRules}` : totalRules}
                      </span>
                    </div>

                    <span
                      className="px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-caps tracking-[0.08em] font-semibold border"
                      style={{
                        backgroundColor: `${currentRule.accentColor}15`,
                        borderColor: `${currentRule.accentColor}40`,
                        color: currentRule.accentColor,
                      }}
                    >
                      {currentRule.category}
                    </span>
                  </div>

                  {/* Card Main Body: Icon, Title & Core Statement */}
                  <div className="space-y-3 mb-4 text-left">
                    <div className="flex items-center gap-3">
                      <div
                        className="p-2.5 rounded-xl border flex items-center justify-center shrink-0 shadow-sm"
                        style={{
                          backgroundColor: `${currentRule.accentColor}15`,
                          borderColor: `${currentRule.accentColor}35`,
                          color: currentRule.accentColor,
                        }}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>

                      <div>
                        <span className="text-[10px] font-caps tracking-[0.08em] text-muted-foreground block">
                          Protocol Specification
                        </span>
                        <h3 className="text-base sm:text-lg font-bold font-caps tracking-[0.03em] text-foreground leading-tight">
                          {currentRule.title}
                        </h3>
                      </div>
                    </div>

                    {/* Core Rule Highlighted Box */}
                    <div
                      className="p-3 rounded-lg border text-xs sm:text-sm font-caps font-semibold tracking-[0.03em] leading-relaxed"
                      style={{
                        backgroundColor: `${currentRule.accentColor}10`,
                        borderColor: `${currentRule.accentColor}30`,
                        color: currentRule.accentColor,
                      }}
                    >
                      "{currentRule.coreRule}"
                    </div>

                    {/* Detailed Explanation */}
                    <p className="text-[11px] sm:text-xs font-caps tracking-[0.03em] text-muted-foreground leading-relaxed">
                      {currentRule.explanation}
                    </p>
                  </div>

                  {/* Card Bottom Strip: Severity Tag & Interactive Hint */}
                  <div className="pt-3 border-t border-border-subtle flex items-center justify-between text-[10px] font-caps">
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <CheckCircle2
                        className="w-3.5 h-3.5"
                        style={{ color: currentRule.accentColor }}
                      />
                      <span className="font-semibold" style={{ color: currentRule.accentColor }}>
                        {currentRule.tag}
                      </span>
                    </div>

                    <span className="text-[9px] text-muted-foreground font-mono">
                      {currentIndex === totalRules - 1 ? (
                        <span className="text-primary font-bold">✓ All Rules Reviewed</span>
                      ) : (
                        "Swipe Right →"
                      )}
                    </span>
                  </div>

                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* 3. Pagination Dots / Quick Selector */}
        <div className="flex items-center justify-center gap-1.5 mt-4 sm:mt-6 flex-wrap max-w-sm mx-auto">
          {RULES_DATA.map((rule, idx) => (
            <button
              key={rule.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              aria-label={`Go to rule ${rule.ruleNumber}`}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx
                  ? "w-6 bg-primary"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Swipe Instructions Footer */}
        <div className="mt-4 flex items-center justify-center gap-2 text-[10px] sm:text-xs font-caps tracking-[0.06em] text-muted-foreground">
          <span>Swipe Right for Next</span>
          <span className="text-border">•</span>
          <span>Swipe Left for Previous</span>
          <span className="text-border">•</span>
          <span className="hidden sm:inline">Use Arrow Keys or Buttons</span>
        </div>

      </div>
    </section>
  );
}

export default RulesSection;
