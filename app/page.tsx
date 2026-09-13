"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DomainsSection } from "@/components/DomainsSection";
import { TimelineSection } from "@/components/TimelineSection";
import { RulesSection } from "@/components/RulesSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-clip bg-transparent text-foreground selection:bg-primary selection:text-black">
      {/* 1. Centered Glassmorphed Navbar with Corner Accents & Kinetic Rolling Hover */}
      <Navbar theme={theme} onToggleTheme={toggleTheme} />

      {/* 2. Hero Section with Big Dual-Sided Convergence & Rotating Mix Typography */}
      <HeroSection />

      {/* 3. Challenge Domains Section with 3D Rolling Cards on Scroll */}
      <DomainsSection />

      {/* 4. Hackathon Timeline Section (Pre-event + 3 Sequential (3 + 1) Hour Sprints) */}
      <TimelineSection />

      {/* 5. Hackathon Rules & Regulations Section (Swipeable 12 Core Protocol Cards) */}
      <RulesSection />

      {/* 6. Contact Section (Official Communications & Support Desk - Last Section at the Bottom) */}
      <ContactSection />
    </div>
  );
}
