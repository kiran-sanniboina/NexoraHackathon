import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
  variant?: "prism" | "nexus" | "hyper";
  showWordmark?: boolean;
}

/**
 * NEXORA Monogram Logo
 * Architectural Prism (Facet N) Monogram paired with minimalist small-caps wordmark.
 */
export function NexoraLogo({
  size = 32,
  className = "",
  variant = "prism",
  showWordmark = false,
}: LogoProps) {
  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      {variant === "prism" && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M 10 14 L 19 8 L 19 34 L 10 40 Z"
            fill="currentColor"
          />
          <path
            d="M 19 8 L 29 22 L 29 40 L 19 26 Z"
            fill="currentColor"
            className="opacity-70 text-primary"
          />
          <path
            d="M 29 22 L 38 16 L 38 42 L 29 48 Z"
            fill="currentColor"
            className="opacity-40"
          />
        </svg>
      )}

      {variant === "nexus" && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <rect x="8" y="8" width="6.5" height="32" rx="1" fill="currentColor" />
          <rect x="33.5" y="8" width="6.5" height="32" rx="1" fill="currentColor" />
          <path
            d="M 14.5 9.5 L 34 37 L 33.5 39.5 L 29.5 39.5 L 12 14.5 L 14.5 9.5 Z"
            fill="currentColor"
          />
          <path
            d="M 33.5 11 L 27.5 19.5 L 23.5 16.5 L 28 10 L 33.5 11 Z"
            className="text-primary fill-current opacity-90"
          />
          <path
            d="M 20.5 29 L 14.5 37.5 L 18 39 L 24.5 31.5 L 20.5 29 Z"
            className="text-primary fill-current opacity-90"
          />
        </svg>
      )}

      {variant === "hyper" && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          <path
            d="M 10 39 V 11 C 10 9.5 11.5 8.5 13 9.5 L 35 28.5 V 9"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 38 9 V 37 C 38 38.5 36.5 39.5 35 38.5 L 13 19.5 V 39"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="opacity-40"
          />
          <circle cx="24" cy="24" r="2.5" className="fill-primary" />
        </svg>
      )}

      {showWordmark && (
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-caps font-semibold text-foreground text-xs sm:text-base tracking-[0.08em]">
            Nexora
          </span>
          <span className="hidden sm:inline-block font-caps text-[11px] text-muted-foreground tracking-[0.1em] px-1.5 py-0.5 rounded border border-border-subtle bg-surface/40">
            2026 Edition
          </span>
        </div>
      )}
    </div>
  );
}

export default NexoraLogo;

