import type { Metadata } from "next";
import "./globals.css";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";

export const metadata: Metadata = {
  title: "NEXORA 2026 — Coding Club Hackathon",
  description: "A premier national technology hackathon organized by Coding Club in partnership with Paytm.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/nexora-logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/nexora-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-background text-foreground selection:bg-foreground selection:text-background relative">
        <BackgroundAnimation />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
