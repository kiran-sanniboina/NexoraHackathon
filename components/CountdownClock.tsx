"use client";

import React, { useState, useEffect } from "react";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  isComplete: boolean;
}

interface CountdownClockProps {
  targetDate?: string; // ISO format or string readable by Date
  className?: string;
  showTitle?: boolean;
}

export function CountdownClock({
  targetDate = "2026-09-20T09:00:00+05:30",
  className = "",
  showTitle = true,
}: CountdownClockProps) {
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    isComplete: false,
  });

  useEffect(() => {
    setMounted(true);

    const calculateTime = () => {
      const targetTime = new Date(targetDate).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
          isComplete: true,
        });
        return;
      }

      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const m = Math.floor((difference / (1000 * 60)) % 60);
      const s = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        days: String(d).padStart(2, "0"),
        hours: String(h).padStart(2, "0"),
        minutes: String(m).padStart(2, "0"),
        seconds: String(s).padStart(2, "0"),
        isComplete: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className={`flex flex-col items-center justify-center text-center space-y-1.5 sm:space-y-2 select-none ${className}`}>
      {/* 1. Header Label with Live Signal (Frameless, Sits Along with Page) */}
      {showTitle && (
        <div className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-caps tracking-[0.12em] text-muted-foreground uppercase">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
          </span>
          <span>Inauguration Starts Sept 20, 09:00 AM IST</span>
        </div>
      )}

      {/* 2. Sleek Minimal Digits Display - No Floating Box / Cards */}
      <div className="inline-flex items-center justify-center gap-3 sm:gap-5 py-0.5">
        
        {/* Days */}
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-foreground leading-none">
            {mounted ? timeLeft.days : "--"}
          </span>
          <span className="text-[8px] sm:text-[9px] font-caps tracking-[0.14em] text-muted-foreground mt-1 uppercase">
            Days
          </span>
        </div>

        <span className="text-primary/40 font-mono text-sm sm:text-base -translate-y-2 select-none font-bold">:</span>

        {/* Hours */}
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-foreground leading-none">
            {mounted ? timeLeft.hours : "--"}
          </span>
          <span className="text-[8px] sm:text-[9px] font-caps tracking-[0.14em] text-muted-foreground mt-1 uppercase">
            Hours
          </span>
        </div>

        <span className="text-primary/40 font-mono text-sm sm:text-base -translate-y-2 select-none font-bold">:</span>

        {/* Minutes */}
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-foreground leading-none">
            {mounted ? timeLeft.minutes : "--"}
          </span>
          <span className="text-[8px] sm:text-[9px] font-caps tracking-[0.14em] text-muted-foreground mt-1 uppercase">
            Mins
          </span>
        </div>

        <span className="text-primary/40 font-mono text-sm sm:text-base -translate-y-2 select-none font-bold">:</span>

        {/* Seconds */}
        <div className="flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-mono font-bold tracking-tight text-primary leading-none">
            {mounted ? timeLeft.seconds : "--"}
          </span>
          <span className="text-[8px] sm:text-[9px] font-caps tracking-[0.14em] text-primary/70 mt-1 uppercase">
            Secs
          </span>
        </div>

      </div>
    </div>
  );
}

export default CountdownClock;
