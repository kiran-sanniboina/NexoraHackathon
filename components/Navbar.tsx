"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NexoraLogo } from "@/components/NexoraLogo";
import { Sun, Moon, LogIn, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  theme?: "dark" | "light";
  onToggleTheme?: () => void;
}

/**
 * Minimalist Kinetic Rolling Text Component
 * In Small-Caps: all capital letters with first letter slightly larger.
 */
function RollText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <span className={`relative inline-flex flex-col overflow-hidden h-[18px] sm:h-[20px] leading-[18px] sm:leading-[20px] font-caps select-none ${className}`}>
      <span className="inline-block transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full will-change-transform">
        {text}
      </span>
      <span className="absolute top-0 left-0 inline-block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-foreground font-semibold will-change-transform">
        {text}
      </span>
    </span>
  );
}

export function Navbar({ theme = "dark", onToggleTheme }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Overview", href: "/#overview" },
    { name: "Tracks", href: "/#tracks" },
    { name: "Timeline", href: "/#timeline" },
    { name: "Rules", href: "/#rules" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pt-2.5 sm:pt-5 pointer-events-none">
      {/* Centered Glassmorphed Rectangle Box */}
      <div className="pointer-events-auto relative w-full max-w-5xl rounded-lg sm:rounded-xl border border-white/10 dark:border-white/10 bg-background/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] transition-all duration-300">
        
        {/* Architectural 90° Precision Corner Accents */}
        <div className="absolute -top-[1.5px] -left-[1.5px] w-2 sm:w-2.5 h-2 sm:h-2.5 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1.5px] bg-primary" />
          <div className="absolute top-0 left-0 h-full w-[1.5px] bg-primary" />
        </div>
        <div className="absolute -top-[1.5px] -right-[1.5px] w-2 sm:w-2.5 h-2 sm:h-2.5 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-[1.5px] bg-primary" />
          <div className="absolute top-0 right-0 h-full w-[1.5px] bg-primary" />
        </div>
        <div className="absolute -bottom-[1.5px] -left-[1.5px] w-2 sm:w-2.5 h-2 sm:h-2.5 pointer-events-none">
          <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary" />
          <div className="absolute bottom-0 left-0 h-full w-[1.5px] bg-primary" />
        </div>
        <div className="absolute -bottom-[1.5px] -right-[1.5px] w-2 sm:w-2.5 h-2 sm:h-2.5 pointer-events-none">
          <div className="absolute bottom-0 right-0 w-full h-[1.5px] bg-primary" />
          <div className="absolute bottom-0 right-0 h-full w-[1.5px] bg-primary" />
        </div>

        {/* Inner Content Bar */}
        <div className="flex items-center justify-between px-3 sm:px-6 h-11 sm:h-16">
          {/* Logo with Architectural Prism Monogram */}
          <Link
            href="/"
            className="group flex items-center gap-1.5 sm:gap-2 transition-transform hover:scale-[1.02] duration-200"
          >
            <NexoraLogo size={22} variant="prism" showWordmark />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative inline-flex items-center py-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                <RollText text={link.name} />
              </a>
            ))}
          </div>

          {/* Actions: Theme Toggle, Icon-Only Login & Register */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Theme Toggle Button */}
            {onToggleTheme && (
              <button
                onClick={onToggleTheme}
                aria-label="Toggle theme"
                className="group p-1 text-muted-foreground hover:text-foreground transition-transform duration-300 hover:rotate-90 cursor-pointer"
              >
                {theme === "dark" ? (
                  <Sun size={15} className="text-yellow-400 group-hover:scale-110 transition-transform" />
                ) : (
                  <Moon size={15} className="text-blue-500 group-hover:scale-110 transition-transform" />
                )}
              </button>
            )}

            {/* Icon-Only Login Button with Kinetic Roll & Zero Highlight Box */}
            <Link
              href="/login"
              aria-label="Login"
              title="Login to dashboard"
              className="group relative inline-flex items-center justify-center p-1 sm:p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <span className="relative inline-flex flex-col overflow-hidden h-[15px] sm:h-[16px] w-[15px] sm:w-[16px]">
                <LogIn
                  size={15}
                  className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full text-primary will-change-transform"
                />
                <LogIn
                  size={15}
                  className="absolute top-0 left-0 translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 text-primary will-change-transform"
                />
              </span>
            </Link>

            {/* Register CTA (Desktop only) */}
            <Link
              href="/register"
              className="group relative hidden sm:inline-flex items-center gap-1.5 py-1 text-sm font-semibold text-primary hover:text-foreground transition-colors cursor-pointer"
            >
              <RollText text="Register" />
              <span className="relative inline-flex flex-col overflow-hidden h-[14px] w-[14px]">
                <ArrowUpRight
                  size={13}
                  className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-hover:translate-x-full will-change-transform"
                />
                <ArrowUpRight
                  size={13}
                  className="absolute top-0 left-0 -translate-x-full translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:translate-y-0 text-foreground will-change-transform"
                />
              </span>
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Open menu"
            >
              {mobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 px-3 py-3 space-y-2 bg-background/95 backdrop-blur-2xl rounded-b-lg">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="group block py-1 text-xs text-muted-foreground hover:text-foreground transition-colors font-caps"
              >
                <RollText text={link.name} />
              </a>
            ))}
            <div className="pt-2 border-t border-border-subtle flex items-center justify-between">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center gap-1 py-1 text-xs text-muted-foreground hover:text-foreground font-medium font-caps"
              >
                <LogIn size={12} className="text-primary" />
                <RollText text="Login" />
              </Link>
              <Link
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="group flex items-center gap-1 py-1 text-xs font-semibold text-primary hover:text-foreground font-caps"
              >
                <RollText text="Register" />
                <ArrowUpRight size={12} />
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
