"use client";

import React from "react";

/**
 * FlowGradientBackground
 * Hardware-accelerated, infinite multi-layered aurora gradient flow.
 * Engineered to run at 60/120fps with zero layout thrashing or CPU blocking.
 * Completely non-intrusive (pointer-events-none, fixed -z-10, overflow-hidden).
 */
export function FlowGradientBackground() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* 1. Deep Atmospheric Gradient Mesh Base */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#00BAF2]/30 via-[#0284C7]/15 to-transparent dark:from-primary/10 dark:via-background dark:to-background opacity-90 dark:opacity-80" />

      {/* 2. Fluid Flowing Aurora Orb 1: Rich Electric Cyan & Vivid Azure */}
      <div className="absolute -top-[10%] -left-[10%] w-[500px] sm:w-[750px] lg:w-[900px] h-[500px] sm:h-[750px] lg:h-[900px] rounded-full bg-gradient-to-br from-[#0090D9]/55 via-[#00BAF2]/45 to-[#0284C7]/40 dark:from-[#00BAF2]/20 dark:to-[#0284C7]/10 blur-[80px] sm:blur-[130px] opacity-85 dark:opacity-60 animate-aurora-1" />

      {/* 3. Fluid Flowing Aurora Orb 2: Deep Saturated Cobalt & Royal Sapphire */}
      <div className="absolute -bottom-[15%] -right-[10%] w-[450px] sm:w-[700px] lg:w-[850px] h-[450px] sm:h-[700px] lg:h-[850px] rounded-full bg-gradient-to-tl from-[#1D4ED8]/55 via-[#0284C7]/45 to-[#0369A1]/35 dark:from-[#0284C7]/20 dark:via-[#1D4ED8]/10 dark:to-transparent blur-[90px] sm:blur-[140px] opacity-85 dark:opacity-55 animate-aurora-2" />

      {/* 4. Fluid Flowing Aurora Orb 3: Deep Vivid Tech Emerald / Jewel Teal */}
      <div className="absolute top-[35%] -right-[15%] w-[380px] sm:w-[600px] lg:w-[720px] h-[380px] sm:h-[600px] lg:h-[720px] rounded-full bg-gradient-to-bl from-[#059669]/50 via-[#0D9488]/40 to-[#047857]/30 dark:from-[#10B981]/15 dark:via-[#14B8A6]/08 dark:to-transparent blur-[85px] sm:blur-[125px] opacity-80 dark:opacity-45 animate-aurora-3" />

      {/* 5. Fluid Flowing Aurora Orb 4: Rich Deep Cosmic Violet & Purple */}
      <div className="absolute top-[45%] -left-[15%] w-[420px] sm:w-[650px] lg:w-[780px] h-[420px] sm:h-[650px] lg:h-[780px] rounded-full bg-gradient-to-tr from-[#6366F1]/50 via-[#7C3AED]/40 to-[#4338CA]/30 dark:from-[#6366F1]/15 dark:via-[#8B5CF6]/08 dark:to-transparent blur-[95px] sm:blur-[135px] opacity-80 dark:opacity-40 animate-aurora-4" />

      {/* 6. Precision Architectural Grid Lines (Adaptive hairlines in light mode, preserved in dark mode) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.035)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] sm:bg-[size:6rem_6rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_50%,transparent_100%)] opacity-70" />

      {/* 7. Subtle Ambient Vignette Overlay for Crisp Typography Contrast */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--background)_100%)] opacity-40 dark:opacity-50" />
    </div>
  );
}

export default FlowGradientBackground;

