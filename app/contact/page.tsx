"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ContactSection } from "@/components/ContactSection";
import { ArrowLeft } from "lucide-react";

export default function ContactPage() {
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
    <div className="min-h-screen relative overflow-x-clip bg-background text-foreground selection:bg-primary selection:text-black">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      
      <div className="pt-24 sm:pt-28 px-4 sm:px-6 max-w-7xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-caps text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back To Main Stage</span>
        </Link>
      </div>

      <ContactSection isStandalone />
    </div>
  );
}
