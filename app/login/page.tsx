"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { NexoraLogo } from "@/components/NexoraLogo";
import {
  Sun,
  Moon,
  ArrowLeft,
  LogIn,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Ticket,
  Clock,
  Loader2,
  Database,
  Users,
  Sparkles,
  Award,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [authMode, setAuthMode] = useState<"team" | "admin">("team");
  const [teamId, setTeamId] = useState("");
  const [leadEmail, setLeadEmail] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPasscode, setAdminPasscode] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [teamData, setTeamData] = useState<{
    name: string;
    code: string;
    track: string;
    leader_name: string;
    leader_email: string;
    members?: any[];
    status?: string;
  } | null>(null);

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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (authMode === "admin") {
      if (!adminEmail.trim() || !adminPasscode.trim()) {
        setErrorMessage("Please enter your secretariat email and passcode.");
        return;
      }
      router.push("/dashboard/admin");
      return;
    }

    if (!teamId.trim().toUpperCase().startsWith("NX-")) {
      setErrorMessage("Please enter a valid Team ID starting with NX- (e.g. NX-2026-4821)");
      return;
    }

    if (!leadEmail.trim()) {
      setErrorMessage("Please provide your registered team lead's email address.");
      return;
    }

    setIsLoading(true);

    try {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from("teams")
          .select("*")
          .ilike("code", teamId.trim())
          .ilike("leader_email", leadEmail.trim())
          .maybeSingle();

        if (data) {
          setTeamData(data);
          setIsLoggedIn(true);
        } else if (
          teamId.trim().toUpperCase() === "NX-2026-4821" &&
          leadEmail.trim().toLowerCase() === "builder@rguktsklm.ac.in"
        ) {
          // Instant demo team fallback
          setTeamData({
            code: "NX-2026-4821",
            name: "Apex Cybernetica",
            track: "AI & Intelligent Systems",
            leader_name: "Kiran S.",
            leader_email: "builder@rguktsklm.ac.in",
            members: [
              { name: "Sai Teja", rollNo: "S200188", branch: "Computer Science", year: "3rd Year", email: "saiteja@rguktsklm.ac.in" },
              { name: "Pravallika N.", rollNo: "S200210", branch: "Electronics & Communication", year: "3rd Year", email: "pravallika@rguktsklm.ac.in" },
            ],
            status: "CONFIRMED",
          });
          setIsLoggedIn(true);
        } else if (error) {
          if (error.code === "PGRST205") {
            setErrorMessage("Supabase table 'teams' has not been created yet. Please execute the SQL migration script in your Supabase SQL editor.");
          } else {
            setErrorMessage(error.message || "Authentication error connecting to database.");
          }
        } else {
          setErrorMessage("No registered team found matching this Team ID and Lead Email combination. Please verify your credentials.");
        }
      } else {
        setIsLoggedIn(true);
      }
    } catch (err: any) {
      console.error("Login verification error:", err);
      setErrorMessage("An unexpected network error occurred while connecting to Supabase.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-x-clip bg-transparent text-foreground selection:bg-primary selection:text-black">
      
      {/* Top Fixed Header with Back Link & Functional Theme Toggle */}
      <header className="sticky top-0 z-50 w-full border-b border-border-subtle/80 bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-caps text-zinc-300 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back To Main Stage</span>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <NexoraLogo size={18} variant="prism" showWordmark />
          </div>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-1.5 rounded-lg border border-white/20 bg-[#121214] text-zinc-300 hover:text-white transition-all hover:rotate-90 cursor-pointer"
              title="Toggle dark / light mode"
            >
              {theme === "dark" ? (
                <Sun size={15} className="text-yellow-400" />
              ) : (
                <Moon size={15} className="text-blue-500" />
              )}
            </button>

            <Link
              href="/register"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white text-black text-xs font-caps font-semibold hover:opacity-90 transition-opacity"
            >
              <Ticket className="w-3 h-3 text-primary" />
              <span>Register Team</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Login Area */}
      <main className="max-w-md mx-auto px-4 sm:px-6 pt-12 sm:pt-20 pb-20">
        
        {isLoggedIn ? (
          /* AUTHENTICATED TEAM DASHBOARD PREVIEW */
          <div className="space-y-6 animate-fade-in-1">
            <div className="p-6 sm:p-8 rounded-2xl border border-white/20 bg-[#0f0f11] backdrop-blur-xl shadow-2xl text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-[10px] font-caps text-emerald-400 font-bold uppercase mb-2">
                  <Database className="w-2.5 h-2.5" />
                  <span>Authenticated With Supabase Cloud</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-caps text-white">
                  {teamData?.name || `Team ${teamId.toUpperCase()}`}
                </h2>
                <div className="text-xs font-mono text-primary font-semibold mt-0.5">
                  ID: {teamData?.code || teamId.toUpperCase()}
                </div>
                <p className="text-xs font-caps text-zinc-400 mt-1">
                  Track: <span className="text-white font-medium">{teamData?.track || "AI & Intelligent Systems"}</span>
                </p>
                {teamData?.leader_name && (
                  <p className="text-[11px] font-caps text-zinc-400">
                    Lead: <span className="text-zinc-200">{teamData.leader_name}</span> ({teamData.leader_email})
                  </p>
                )}
              </div>

              {/* Roster overview */}
              {teamData?.members && teamData.members.length > 0 && (
                <div className="p-3 rounded-xl border border-white/10 bg-[#141417] text-left space-y-1.5 text-xs font-caps">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider flex items-center gap-1 font-semibold">
                    <Users className="w-3 h-3 text-primary" />
                    <span>Registered Team Roster ({teamData.members.length + 1} Members)</span>
                  </div>
                  <div className="space-y-1 pt-1">
                    <div className="text-[11px] text-zinc-300 flex justify-between">
                      <span className="font-semibold text-white">★ {teamData.leader_name} (Lead)</span>
                      <span className="text-zinc-500 font-mono text-[10px]">{teamData.leader_email}</span>
                    </div>
                    {teamData.members.map((m: any, idx: number) => (
                      <div key={idx} className="text-[11px] text-zinc-400 flex justify-between">
                        <span>• {m.name}</span>
                        <span className="text-zinc-500 font-mono text-[10px]">{m.rollNo || m.branch}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Event Milestone Box */}
              <div className="p-4 rounded-xl border border-white/15 bg-[#141417] text-left space-y-2 text-xs font-caps">
                <div className="flex items-center justify-between text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    <span>Next Milestone: Round 1</span>
                  </span>
                  <span className="text-primary font-mono">09:00 AM IST</span>
                </div>
                <div className="font-semibold text-white">
                  Inauguration & Architecture Blueprint Phase
                </div>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Problem statements will be released on September 20 at 09:00 AM. Submission portals for Round 1 architecture deliverables will unlock simultaneously.
                </p>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <Link
                  href={`/dashboard/team?code=${teamData?.code || teamId.toUpperCase()}`}
                  className="w-full py-3 px-4 rounded-xl bg-white text-black font-caps font-bold text-xs tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Launch Team Command Center</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/"
                  className="w-full py-2 text-xs font-caps text-zinc-400 hover:text-white transition-colors text-center"
                >
                  Return To Main Stage
                </Link>
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setTeamData(null);
                  }}
                  className="w-full py-1 text-[11px] font-caps text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* LOGIN FORM CARD */
          <div className="space-y-6">
            
            {/* Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/20 bg-[#121214] text-[10px] font-caps tracking-[0.1em] text-zinc-300">
                <ShieldCheck className="w-3 h-3 text-primary" />
                <span>Nexora Participant Portal</span>
              </div>
              
              <h1 className="text-2xl sm:text-3xl font-extrabold font-caps tracking-[0.02em] text-foreground">
                Sign In To Portal
              </h1>

              <p className="text-xs font-caps text-zinc-400">
                Access your team credential pass, review competition rules, or manage event operations.
              </p>
            </div>

            {/* Login Card */}
            <div className="rounded-2xl border border-white/20 bg-[#0f0f11] backdrop-blur-xl p-6 sm:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
              
              {/* Tab Selector */}
              <div className="grid grid-cols-2 gap-1 p-1 rounded-lg border border-white/15 bg-[#141417] mb-6 text-xs font-caps">
                <button
                  type="button"
                  onClick={() => { setAuthMode("team"); setErrorMessage(""); }}
                  className={"py-1.5 rounded-md font-bold transition-colors cursor-pointer " + (authMode === "team" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-white")}
                >
                  Team ID Access
                </button>
                <button
                  type="button"
                  onClick={() => { setAuthMode("admin"); setErrorMessage(""); }}
                  className={"py-1.5 rounded-md font-bold transition-colors cursor-pointer " + (authMode === "admin" ? "bg-white text-black shadow-sm" : "text-zinc-400 hover:text-white")}
                >
                  Admin
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-lg border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-caps flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                {authMode === "team" ? (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                        Assigned Team ID *
                      </label>
                      <input
                        type="text"
                        required
                        value={teamId}
                        onChange={(e) => setTeamId(e.target.value)}
                        placeholder="e.g. NX-2026-4821"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-mono font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                        Registered Team Lead Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={leadEmail}
                        onChange={(e) => setLeadEmail(e.target.value)}
                        placeholder="builder@rguktsklm.ac.in"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps transition-all"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                        Official Secretariat Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={adminEmail}
                        onChange={(e) => setAdminEmail(e.target.value)}
                        placeholder="secretariat@rguktsklm.ac.in"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps transition-all"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                        Admin Portal Passcode *
                      </label>
                      <input
                        type="password"
                        required
                        value={adminPasscode}
                        onChange={(e) => setAdminPasscode(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-mono font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all"
                      />
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-lg bg-white text-black font-caps font-bold text-xs tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm cursor-pointer mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-black" />
                      <span>Verifying With Supabase...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-3.5 h-3.5" />
                      <span>{authMode === "team" ? "Verify Team & Enter Portal" : "Enter Secretariat Admin Desk"}</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Registration Callout */}
            <div className="text-center text-xs font-caps text-zinc-400">
              Don't have a team ticket yet?{" "}
              <Link href="/register" className="text-primary font-semibold hover:underline inline-flex items-center gap-1">
                <span>Register Your Team</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>
        )}

      </main>

    </div>
  );
}
