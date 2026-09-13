"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { NexoraLogo } from "@/components/NexoraLogo";
import { createClient } from "@/lib/supabase/client";
import {
  Sun,
  Moon,
  ArrowLeft,
  Users,
  CheckCircle2,
  Ticket,
  Copy,
  Check,
  LogOut,
  ShieldCheck,
  Laptop,
  Scale,
  Clock,
  Printer,
  Sparkles,
  Award,
  AlertTriangle,
  FileCheck,
  UserCheck,
  Loader2,
} from "lucide-react";

interface TeamMember {
  name: string;
  rollNo: string;
  branch: string;
  year: string;
  email: string;
}

interface TeamRecord {
  id?: string;
  code: string;
  name: string;
  track: string;
  leader_name: string;
  leader_email: string;
  leader_phone?: string;
  leader_roll?: string;
  leader_branch?: string;
  leader_year?: string;
  members?: TeamMember[];
  status: string;
  created_at?: string;
}

const DEFAULT_TEAM: TeamRecord = {
  code: "NX-2026-4821",
  name: "Apex Cybernetica",
  track: "AI & Intelligent Systems",
  leader_name: "Kiran S.",
  leader_email: "builder@rguktsklm.ac.in",
  leader_phone: "+91 93925 67773",
  leader_roll: "S200142",
  leader_branch: "Computer Science & Engineering",
  leader_year: "3rd Year / E3",
  status: "CONFIRMED",
  members: [
    {
      name: "Sai Teja",
      rollNo: "S200188",
      branch: "Computer Science & Engineering",
      year: "3rd Year / E3",
      email: "saiteja@rguktsklm.ac.in",
    },
    {
      name: "Pravallika N.",
      rollNo: "S200210",
      branch: "Electronics & Communication",
      year: "3rd Year / E3",
      email: "pravallika@rguktsklm.ac.in",
    },
  ],
};

function TeamDashboardContent() {
  const searchParams = useSearchParams();
  const codeParam = searchParams.get("code") || searchParams.get("id");

  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [team, setTeam] = useState<TeamRecord>(DEFAULT_TEAM);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  // Fetch live team from Supabase
  useEffect(() => {
    if (!codeParam) return;
    const fetchTeam = async () => {
      setIsLoading(true);
      try {
        const supabase = createClient();
        if (supabase) {
          const { data, error } = await supabase
            .from("teams")
            .select("*")
            .ilike("code", codeParam.trim())
            .maybeSingle();

          if (data && !error) {
            setTeam(data);
          }
        }
      } catch (err) {
        console.warn("Could not load team from Supabase:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTeam();
  }, [codeParam]);

  const copyTeamCode = () => {
    navigator.clipboard.writeText(team.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-primary selection:text-black">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-background/80 backdrop-blur-xl print:hidden">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-caps text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Main Stage</span>
            </Link>
            <div className="h-4 w-px bg-border-subtle hidden sm:block" />
            <div className="flex items-center gap-2">
              <NexoraLogo size={18} variant="prism" showWordmark />
              <span className="text-[10px] font-caps px-2 py-0.5 rounded-full border border-primary/30 bg-primary/10 text-primary font-bold hidden md:inline">
                Team Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Team ID pill - visible on sm screens and larger to save mobile space */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-border-subtle bg-surface/50 text-xs font-mono text-foreground font-semibold">
              <span>{team.code}</span>
              <button
                onClick={copyTeamCode}
                title="Copy Team ID"
                className="p-1 hover:text-primary transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            {/* Print Pass Button */}
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-caps font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              title="Print Pass"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print Pass</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded-lg border border-border-subtle bg-surface/40 hover:bg-surface text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              {theme === "dark" ? <Sun size={15} className="text-yellow-400" /> : <Moon size={15} className="text-blue-500" />}
            </button>

            {/* Sign Out */}
            <Link
              href="/login"
              title="Sign Out"
              className="p-1.5 rounded-lg border border-border-subtle text-muted-foreground hover:text-red-400 hover:border-red-500/30 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-12 space-y-8 sm:space-y-12">
        
        {/* =================================================================== */}
        {/* 1. OFFICIAL TEAM TICKET & CREDENTIAL DETAILS                        */}
        {/* =================================================================== */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[10px] font-caps tracking-wider text-primary uppercase font-bold">
                <Ticket className="w-3.5 h-3.5" />
                <span>Official Registration Credential</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-caps text-foreground mt-0.5">
                Team Entry Pass
              </h2>
            </div>
            <button
              onClick={handlePrint}
              className="print:hidden inline-flex items-center gap-1.5 text-xs font-caps text-primary hover:underline self-start sm:self-auto cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Physical Ticket</span>
            </button>
          </div>

          {/* Architectural Ticket Card */}
          <div className="relative rounded-2xl border border-white/20 bg-[#0f0f11] text-white backdrop-blur-2xl p-4 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
            
            {/* Precision 90° Corner Accents */}
            <div className="absolute top-0 left-0 w-3 h-3 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-[1.5px] bg-primary" />
              <div className="absolute top-0 left-0 h-full w-[1.5px] bg-primary" />
            </div>
            <div className="absolute top-0 right-0 w-3 h-3 pointer-events-none">
              <div className="absolute top-0 right-0 w-full h-[1.5px] bg-primary" />
              <div className="absolute top-0 right-0 h-full w-[1.5px] bg-primary" />
            </div>
            <div className="absolute bottom-0 left-0 w-3 h-3 pointer-events-none">
              <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-primary" />
              <div className="absolute bottom-0 left-0 h-full w-[1.5px] bg-primary" />
            </div>
            <div className="absolute bottom-0 right-0 w-3 h-3 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-full h-[1.5px] bg-primary" />
              <div className="absolute bottom-0 right-0 h-full w-[1.5px] bg-primary" />
            </div>

            {/* Ticket Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 gap-2">
              <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
                <NexoraLogo size={18} variant="prism" showWordmark />
                <span className="text-[10px] font-caps text-zinc-400 ml-1 truncate hidden xs:inline">
                  • 12H Hackathon Entry Credential
                </span>
              </div>
              <div className="px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-[10px] font-caps font-bold text-emerald-400 flex items-center gap-1 shrink-0">
                <CheckCircle2 className="w-3 h-3" />
                <span>{team.status}</span>
              </div>
            </div>

            {/* Main Ticket Body */}
            <div className="py-5 sm:py-6 grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center border-b border-dashed border-white/15">
              <div className="md:col-span-7 space-y-2">
                <span className="text-[10px] font-caps text-zinc-400 uppercase tracking-widest block">
                  Assigned Team ID
                </span>
                <div className="text-2xl sm:text-4xl font-mono font-extrabold text-white tracking-wider flex items-center gap-2 sm:gap-3">
                  <span>{team.code}</span>
                  <button
                    onClick={copyTeamCode}
                    className="p-1.5 rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer text-xs font-sans print:hidden shrink-0"
                    title="Copy Team ID"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-caps text-primary mt-1">
                  {team.name}
                </h3>
                <p className="text-xs font-caps text-zinc-300">
                  Track: <span className="text-white font-medium">{team.track}</span>
                </p>
              </div>

              <div className="md:col-span-5 p-3.5 sm:p-4 rounded-xl border border-white/10 bg-[#141417] space-y-2 text-xs font-caps">
                <div className="flex justify-between text-zinc-400 border-b border-white/10 pb-1.5">
                  <span>Venue</span>
                  <span className="text-white font-medium">RGUKT Srikakulam</span>
                </div>
                <div className="flex justify-between text-zinc-400 border-b border-white/10 pb-1.5">
                  <span>Inauguration</span>
                  <span className="text-white font-mono">Sept 20, 09:00 AM</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Team Size</span>
                  <span className="text-white font-mono font-bold">
                    {team.members ? team.members.length + 1 : 1} Builders
                  </span>
                </div>
              </div>
            </div>

            {/* Ticket Footer Details */}
            <div className="pt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-xs font-caps text-zinc-400">
              <div>
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Lead Architect</span>
                <span className="text-white font-semibold">{team.leader_name}</span>
                <span className="text-zinc-500 block font-mono text-[10px] break-all">{team.leader_email}</span>
              </div>
              <div className="sm:text-right">
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Security Hash</span>
                <span className="text-zinc-400 font-mono text-[10px]">SHA-256: NX-2026-VERIFIED-PASS</span>
              </div>
            </div>

          </div>
        </section>

        {/* =================================================================== */}
        {/* 2. TEAM DETAILS & ROSTER                                            */}
        {/* =================================================================== */}
        <section className="space-y-4">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-caps tracking-wider text-primary uppercase font-bold">
              <Users className="w-3.5 h-3.5" />
              <span>Full Team Roster</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-caps text-foreground">
              Team Details & Member Profiles
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Team Leader Card */}
            <div className="p-4 sm:p-6 rounded-2xl border border-primary/30 bg-surface/40 backdrop-blur-sm space-y-3 relative overflow-hidden">
              <div className="flex items-center justify-between gap-2">
                <span className="px-2.5 py-0.5 rounded-full border border-primary/40 bg-primary/10 text-primary text-[10px] font-caps font-bold truncate">
                  ★ Team Leader & Primary Contact
                </span>
                <span className="text-xs font-mono text-muted-foreground shrink-0">{team.leader_roll || "N/A"}</span>
              </div>

              <div>
                <h3 className="text-lg font-bold font-caps text-foreground">{team.leader_name}</h3>
                <p className="text-xs font-caps text-muted-foreground mt-0.5">
                  {team.leader_branch || "Computer Science & Engineering"} • {team.leader_year || "3rd Year"}
                </p>
              </div>

              <div className="pt-2 border-t border-border-subtle/60 text-xs font-caps space-y-1.5">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2">
                  <span className="text-muted-foreground text-[11px]">Email:</span>
                  <span className="font-mono text-foreground text-[11px] sm:text-xs break-all">{team.leader_email}</span>
                </div>
                {team.leader_phone && (
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2">
                    <span className="text-muted-foreground text-[11px]">Phone:</span>
                    <span className="font-mono text-foreground text-[11px] sm:text-xs">{team.leader_phone}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Additional Members */}
            {team.members &&
              team.members.map((member, idx) => (
                <div
                  key={idx}
                  className="p-4 sm:p-6 rounded-2xl border border-border-subtle bg-surface/30 backdrop-blur-sm space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full border border-border-subtle bg-surface text-muted-foreground text-[10px] font-caps font-semibold">
                      Builder {idx + 2}
                    </span>
                    <span className="text-xs font-mono text-muted-foreground shrink-0">{member.rollNo || "N/A"}</span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold font-caps text-foreground">{member.name}</h3>
                    <p className="text-xs font-caps text-muted-foreground mt-0.5">
                      {member.branch} • {member.year}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-border-subtle/60 text-xs font-caps space-y-1.5">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-0.5 sm:gap-2">
                      <span className="text-muted-foreground text-[11px]">Email:</span>
                      <span className="font-mono text-foreground text-[11px] sm:text-xs break-all">{member.email}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 3. RULES OF THE COMPETITION                                         */}
        {/* =================================================================== */}
        <section className="space-y-4">
          <div className="space-y-0.5">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-caps tracking-wider text-primary uppercase font-bold">
              <Scale className="w-3.5 h-3.5" />
              <span>Official Guidelines</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-caps text-foreground">
              Rules of the Competition
            </h2>
            <p className="text-xs font-caps text-muted-foreground">
              All participating teams must abide by these official guidelines throughout the 12-hour sprint.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-caps">
            
            {/* Rule 1 */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface/30 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <Users className="w-4 h-4 text-primary" />
                <span>1. Team Composition & Verification</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Teams must consist of 2 to 4 registered participants. All members must carry their official institutional ID cards. Inter-disciplinary and cross-branch teams are allowed and encouraged.
              </p>
            </div>

            {/* Rule 2 */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface/30 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <FileCheck className="w-4 h-4 text-primary" />
                <span>2. Code Originality & Git Commits</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                All development, design, and code commits must occur during the official hackathon window after problem statements are announced. Open-source libraries and APIs are permitted, but pre-built proprietary applications are strictly disqualified.
              </p>
            </div>

            {/* Rule 3 */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface/30 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <Laptop className="w-4 h-4 text-primary" />
                <span>3. Hardware & BYOD Policy</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Teams must bring their own laptops, charging adapters, extension cords, and development boards. High-speed campus Wi-Fi and power strips are provided at assigned bench workstations.
              </p>
            </div>

            {/* Rule 4 */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface/30 space-y-2">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <Clock className="w-4 h-4 text-primary" />
                <span>4. Milestone Submissions & Rounds</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Deliverables must be submitted before each deadline: Round 1 Architecture Blueprint at 01:00 PM, Round 2 Working MVP Prototype at 08:00 PM, and Round 3 Final Demonstration on Sept 21.
              </p>
            </div>

            {/* Rule 5 */}
            <div className="p-5 rounded-2xl border border-border-subtle bg-surface/30 space-y-2 md:col-span-2">
              <div className="flex items-center gap-2 text-foreground font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>5. Academic Integrity & Conduct</span>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Plagiarism, unauthorized access to another team's repository, or disrespectful conduct will result in immediate disqualification. The organizing secretariat and faculty committee hold final authority on all event disputes.
              </p>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
}

export default function TeamDashboardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground font-caps text-xs">
          <Loader2 className="w-5 h-5 animate-spin text-primary mr-2" />
          <span>Loading Team Details...</span>
        </div>
      }
    >
      <TeamDashboardContent />
    </Suspense>
  );
}
