"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NexoraLogo } from "@/components/NexoraLogo";
import {
  Sun,
  Moon,
  ArrowLeft,
  Users,
  CheckCircle2,
  Ticket,
  Copy,
  Check,
  Download,
  Plus,
  Trash2,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Laptop,
  LogIn,
  Loader2,
  Database,
  Brain,
  Activity,
  ShieldAlert,
  Atom,
  Layers,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const DOMAINS = [
  {
    id: "ai-ml",
    name: "AI & Machine Learning",
    subtitle: "Autonomous Agents & Deep Learning",
    color: "#00BAF2",
    icon: Brain,
  },
  {
    id: "health",
    name: "Health & BioTech",
    subtitle: "Precision Diagnostics & Telehealth",
    color: "#10B981",
    icon: Activity,
  },
  {
    id: "disaster-management",
    name: "Disaster Management",
    subtitle: "Crisis Mitigation & Emergency Dispatch",
    color: "#F59E0B",
    icon: ShieldAlert,
  },
  {
    id: "quantum",
    name: "Quantum Computing",
    subtitle: "Next-Gen Quantum Algorithms",
    color: "#8B5CF6",
    icon: Atom,
  },
  {
    id: "product-based",
    name: "Product Based",
    subtitle: "Scalable Digital Ecosystems",
    color: "#EC4899",
    icon: Layers,
  },
  {
    id: "cyber-security",
    name: "Cyber Security",
    subtitle: "Zero-Trust & Digital Defense",
    color: "#06B6D4",
    icon: ShieldCheck,
  },
];

interface TeamMember {
  name: string;
  rollNo: string;
  branch: string;
  year: string;
  email: string;
}

export default function RegisterPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [copied, setCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbStatus, setDbStatus] = useState<"synced" | "needs_migration" | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [generatedTeamId, setGeneratedTeamId] = useState("");

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

  // Form State
  const [teamName, setTeamName] = useState("");
  const [domain, setDomain] = useState("AI & Machine Learning");

  // Sync domain from URL query parameters (e.g. ?domain=quantum or ?domain=ai-ml)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const queryDomain = params.get("domain") || params.get("track");
      if (queryDomain) {
        const found = DOMAINS.find(
          (d) =>
            d.id.toLowerCase() === queryDomain.toLowerCase() ||
            d.name.toLowerCase().includes(queryDomain.toLowerCase())
        );
        if (found) {
          setDomain(found.name);
        }
      }
    }
  }, []);
  
  // Lead State
  const [leadName, setLeadName] = useState("");
  const [leadRoll, setLeadRoll] = useState("");
  const [leadBranch, setLeadBranch] = useState("Computer Science & Engineering");
  const [leadYear, setLeadYear] = useState("3rd Year / E3");
  const [leadEmail, setLeadEmail] = useState("");
  const [leadPhone, setLeadPhone] = useState("");

  // Additional Members (1 to 3 members -> 2 to 4 total)
  const [members, setMembers] = useState<TeamMember[]>([
    { name: "", rollNo: "", branch: "Computer Science & Engineering", year: "3rd Year / E3", email: "" }
  ]);

  // Checkboxes
  const [hardwareAgreed, setHardwareAgreed] = useState(false);
  const [rulesAgreed, setRulesAgreed] = useState(false);

  const addMember = () => {
    if (members.length < 3) {
      setMembers([
        ...members,
        { name: "", rollNo: "", branch: "Computer Science & Engineering", year: "3rd Year / E3", email: "" }
      ]);
    }
  };

  const removeMember = (index: number) => {
    if (members.length > 0) {
      setMembers(members.filter((_, idx) => idx !== index));
    }
  };

  const updateMember = (index: number, field: keyof TeamMember, value: string) => {
    const updated = [...members];
    updated[index][field] = value;
    setMembers(updated);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const fallbackId = "NX-2026-" + randomNum;

    const cleanedMembers = members.filter((m) => m.name.trim().length > 0);
    const payload = {
      teamName: teamName.trim(),
      domain,
      leadName: leadName.trim(),
      leadEmail: leadEmail.trim().toLowerCase(),
      leadPhone: leadPhone.trim(),
      leadRoll: leadRoll.trim(),
      leadBranch,
      leadYear,
      members: cleanedMembers,
    };

    let assignedId = fallbackId;
    let syncSuccess = false;
    let errorMessage = "";

    // 1. Primary Route: Server-side /api/register
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        assignedId = result.code || fallbackId;
        syncSuccess = true;
        setDbStatus("synced");
      } else {
        console.warn("Backend API route warning:", result);
        errorMessage = result.error || "Failed to persist registration to database.";
      }
    } catch (apiErr: any) {
      console.warn("Primary API route error, attempting direct database fallback:", apiErr);
      errorMessage = apiErr?.message || "Network error contacting registration endpoint.";
    }

    // 2. Fallback Route: Direct Supabase client insert (using track column matching public.teams schema)
    if (!syncSuccess) {
      try {
        const supabase = createClient();
        if (supabase) {
          const { error } = await supabase.from("teams").insert([
            {
              code: fallbackId,
              name: teamName.trim(),
              track: domain, // Strictly track column, matching public.teams schema
              leader_name: leadName.trim(),
              leader_email: leadEmail.trim().toLowerCase(),
              leader_phone: leadPhone.trim() || null,
              leader_roll: leadRoll.trim(),
              leader_branch: leadBranch,
              leader_year: leadYear,
              members: cleanedMembers,
              status: "CONFIRMED",
            },
          ]);

          if (error) {
            console.error("Direct Supabase fallback notice:", error);
            errorMessage = error.message || "Failed to save to database.";
            setDbStatus("needs_migration");
          } else {
            assignedId = fallbackId;
            syncSuccess = true;
            setDbStatus("synced");
          }
        }
      } catch (dbErr: any) {
        console.error("Supabase insert exception:", dbErr);
        errorMessage = dbErr?.message || "Failed to connect to database.";
        setDbStatus("needs_migration");
      }
    }

    // 3. LocalStorage persistence for instant offline & dashboard view consistency
    if (syncSuccess) {
      try {
        const existingLocal = localStorage.getItem("nexora_registrations");
        const existingList = existingLocal ? JSON.parse(existingLocal) : [];
        const newLocalRecord = {
          id: `reg-${Date.now()}`,
          teamId: assignedId,
          teamName: teamName.trim(),
          leaderName: leadName.trim(),
          leaderEmail: leadEmail.trim().toLowerCase(),
          college: "RGUKT Srikakulam",
          track: domain,
          memberCount: cleanedMembers.length + 1,
          status: "CONFIRMED",
          submittedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem(
          "nexora_registrations",
          JSON.stringify([newLocalRecord, ...existingList])
        );
      } catch {
        // Safe to ignore localStorage issues
      }

      setGeneratedTeamId(assignedId);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSubmitError(
        errorMessage ||
          "Unable to save your registration to the database. Please verify your details and try again."
      );
    }

    setIsSubmitting(false);
  };

  const copyTeamId = () => {
    if (generatedTeamId) {
      navigator.clipboard.writeText(generatedTeamId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    window.print();
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
              href="/login"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 bg-[#121214] hover:bg-white/10 text-xs font-caps text-zinc-200 hover:text-primary transition-colors"
            >
              <LogIn className="w-3 h-3 text-primary" />
              <span>Team Login</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Registration Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 pb-20">
        
        {isSubmitted ? (
          /* DIGITAL TICKET CONFIRMATION VIEW */
          <div className="space-y-8 animate-fade-in-1">
            
            {/* Success Header */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-caps font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Registration Confirmed • Ticket Issued</span>
              </div>
              <h1 className="text-3xl sm:text-5xl font-extrabold font-caps tracking-[0.02em] text-foreground">
                Your Official Team Pass
              </h1>
              <p className="text-xs sm:text-sm font-caps text-zinc-400 max-w-md mx-auto">
                Present this digital ticket along with your student identification cards on September 20 at RGUKT Srikakulam.
              </p>
            </div>

            {/* Architectural Digital Ticket Card */}
            <div className="relative rounded-2xl border border-white/20 bg-[#0f0f11] backdrop-blur-2xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden max-w-2xl mx-auto">
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

              {/* Ticket Top Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <NexoraLogo size={20} variant="prism" showWordmark />
                  <span className="text-[10px] font-caps text-zinc-400 ml-1">
                    • Official Entry Pass
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {dbStatus === "synced" && (
                    <div className="px-2 py-0.5 rounded border border-emerald-500/40 bg-emerald-500/10 text-[10px] font-caps font-bold text-emerald-400 flex items-center gap-1">
                      <Database className="w-2.5 h-2.5" />
                      <span>Supabase Synced</span>
                    </div>
                  )}
                  <div className="px-2 py-0.5 rounded border border-primary/40 bg-primary/10 text-[10px] font-caps font-bold text-primary">
                    VERIFIED
                  </div>
                </div>
              </div>

              {/* Unique Team ID Display */}
              <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-dashed border-white/15">
                <div>
                  <span className="text-[10px] font-caps text-zinc-400 uppercase tracking-widest block">
                    Assigned Team ID
                  </span>
                  <div className="text-2xl sm:text-3xl font-mono font-extrabold text-white tracking-wider mt-0.5">
                    {generatedTeamId}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyTeamId}
                    className="px-3 py-1.5 rounded-lg border border-white/20 bg-[#141416] hover:bg-white/10 text-xs font-caps text-white hover:text-primary transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy ID"}</span>
                  </button>
                  <button
                    onClick={handlePrint}
                    className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-caps font-semibold flex items-center gap-1.5 hover:opacity-90 transition-opacity cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Print Ticket</span>
                  </button>
                </div>
              </div>

              {/* Ticket Details Grid */}
              <div className="py-6 grid grid-cols-2 gap-4 text-xs font-caps border-b border-white/10">
                <div>
                  <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">Team Name</span>
                  <span className="font-bold text-white text-sm">{teamName}</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">Selected Domain</span>
                  <span className="font-semibold text-primary">{domain}</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">Team Lead</span>
                  <span className="font-medium text-white">{leadName} ({leadRoll})</span>
                </div>
                <div>
                  <span className="text-[9px] text-zinc-400 uppercase tracking-wider block">Total Members</span>
                  <span className="font-medium text-white">{members.length + 1} Builders</span>
                </div>
              </div>

              {/* Roster Strip */}
              <div className="pt-4 space-y-1.5">
                <span className="text-[9px] font-caps text-zinc-400 uppercase tracking-wider block">
                  Registered Builders
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#18181b] border border-white/15 text-[11px] font-caps text-white">
                    ★ {leadName} (Lead)
                  </span>
                  {members.map((m, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-[#141416] border border-white/10 text-[11px] font-caps text-zinc-300">
                      {m.name || "Member " + (idx + 2)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Venue & Time Footer */}
              <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-[10px] font-caps text-zinc-400 gap-2">
                <span>📍 RGUKT Srikakulam • Central Computer Center</span>
                <span>🗓️ Sept 20, 2026 • 09:00 AM Inauguration</span>
              </div>
            </div>

            {/* Next Steps Buttons */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <Link
                href="/login"
                className="px-5 py-2.5 rounded-lg bg-white text-black font-caps font-bold text-xs tracking-wider flex items-center gap-2 hover:opacity-90 transition-opacity"
              >
                <span>Proceed To Team Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => setIsSubmitted(false)}
                className="px-4 py-2 rounded-lg border border-white/20 text-xs font-caps text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                Register Another Team
              </button>
            </div>

          </div>
        ) : (
          /* REGISTRATION FORM VIEW */
          <div className="space-y-8">
            
            {/* Page Header */}
            <div className="space-y-3 text-center sm:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-[10px] font-caps tracking-[0.1em] text-primary font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Registration Open • Sept 15 — Sept 18</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-caps tracking-[0.02em] text-foreground">
                Team Registration
              </h1>

              <p className="text-xs sm:text-sm font-caps text-zinc-400 max-w-2xl leading-relaxed">
                Form your squad of 2 to 4 students from any year and any branch. Register before September 18 to lock in your hackathon ticket and team credentials.
              </p>
            </div>

            {/* Eligibility & Guidelines Notice Strip */}
            <div className="p-4 rounded-xl border border-white/15 bg-[#0f0f11] backdrop-blur-sm grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-caps text-zinc-300">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary shrink-0" />
                <span>2 – 4 Members Per Squad</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Any Year • Any Branch Allowed</span>
              </div>
              <div className="flex items-center gap-2">
                <Laptop className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Bring Own Laptops & Adapters</span>
              </div>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Submission Error Banner */}
              {submitError && (
                <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-400 text-xs font-caps flex items-start gap-3 animate-fade-in-1">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-400" />
                  <div className="space-y-1">
                    <span className="font-bold text-sm block text-red-300">Registration Failed to Persist</span>
                    <p className="text-zinc-300 normal-case">{submitError}</p>
                    <p className="text-[11px] text-zinc-400">
                      Your registration was not saved to the database. Please verify your details and network, then try submitting again.
                    </p>
                  </div>
                </div>
              )}

              {/* SECTION 1: Team & Domain Selection */}
              <div className="space-y-5 p-5 sm:p-6 rounded-xl border border-white/15 bg-[#0e0e10]">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Ticket className="w-4 h-4 text-primary" />
                  <h2 className="text-sm sm:text-base font-bold font-caps text-white">
                    1. Team Identity & Domain Selection
                  </h2>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                    Team Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g. CyberKnights"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps transition-all"
                  />
                </div>

                {/* Domain Selection Component */}
                <div className="space-y-2.5 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                    <div>
                      <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                        Select Your Domain *
                      </label>
                      <p className="text-[11px] text-zinc-400">
                        Choose the official challenge domain your team will build under for NEXORA '26
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-[10px] font-caps font-semibold self-start sm:self-auto">
                      <span className="text-zinc-400">Chosen:</span>
                      <span className="text-white font-bold">{domain}</span>
                    </div>
                  </div>

                  {/* Interactive Domain Selection Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {DOMAINS.map((d) => {
                      const Icon = d.icon;
                      const isSelected = domain === d.name;
                      return (
                        <button
                          key={d.id}
                          type="button"
                          onClick={() => setDomain(d.name)}
                          className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between gap-3 group cursor-pointer ${
                            isSelected
                              ? "border-primary bg-primary/10 shadow-[0_0_20px_rgba(0,186,242,0.18)] ring-1 ring-primary/40 text-white"
                              : "border-white/10 bg-[#141417] hover:border-white/25 hover:bg-[#18181c] text-zinc-300"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center border"
                              style={{
                                backgroundColor: `${d.color}15`,
                                borderColor: `${d.color}40`,
                                color: d.color,
                              }}
                            >
                              <Icon className="w-3.5 h-3.5" />
                            </div>
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                                isSelected
                                  ? "border-primary bg-primary text-black"
                                  : "border-white/20 bg-transparent group-hover:border-white/40"
                              }`}
                            >
                              {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </div>
                          </div>

                          <div>
                            <div className="text-xs sm:text-sm font-bold font-caps text-white group-hover:text-primary transition-colors">
                              {d.name}
                            </div>
                            <div className="text-[10px] text-zinc-400 line-clamp-1 mt-0.5">
                              {d.subtitle}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Accessible Synced Dropdown for Mobile / Keyboard */}
                  <div className="pt-1">
                    <select
                      value={domain}
                      onChange={(e) => setDomain(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps transition-all cursor-pointer"
                      aria-label="Select Challenge Domain"
                    >
                      {DOMAINS.map((d) => (
                        <option key={d.id} value={d.name} className="bg-[#141417] text-white">
                          {d.name} — {d.subtitle}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION 2: Team Lead Information */}
              <div className="space-y-4 p-5 sm:p-6 rounded-xl border border-white/15 bg-[#0e0e10]">
                <div className="flex items-center gap-2 pb-2 border-b border-white/10">
                  <Users className="w-4 h-4 text-primary" />
                  <h2 className="text-sm sm:text-base font-bold font-caps text-white">
                    2. Team Lead Details (Primary Contact)
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                      Lead Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Alex Chen"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                      College ID / Roll Number *
                    </label>
                    <input
                      type="text"
                      required
                      value={leadRoll}
                      onChange={(e) => setLeadRoll(e.target.value)}
                      placeholder="e.g. S190123"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-mono font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                      Engineering Branch *
                    </label>
                    <select
                      value={leadBranch}
                      onChange={(e) => setLeadBranch(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps transition-all"
                    >
                      <option value="Computer Science & Engineering" className="bg-[#141417] text-white">Computer Science & Engineering (CSE)</option>
                      <option value="Electronics & Communication" className="bg-[#141417] text-white">Electronics & Communication (ECE)</option>
                      <option value="Mechanical Engineering" className="bg-[#141417] text-white">Mechanical Engineering (ME)</option>
                      <option value="Civil Engineering" className="bg-[#141417] text-white">Civil Engineering (CE)</option>
                      <option value="Chemical Engineering" className="bg-[#141417] text-white">Chemical Engineering (CHE)</option>
                      <option value="Electrical & Electronics" className="bg-[#141417] text-white">Electrical & Electronics (EEE)</option>
                      <option value="Other" className="bg-[#141417] text-white">Other Academic Program</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                      Academic Year *
                    </label>
                    <select
                      value={leadYear}
                      onChange={(e) => setLeadYear(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps transition-all"
                    >
                      <option value="1st Year / E1" className="bg-[#141417] text-white">1st Year / E1</option>
                      <option value="2nd Year / E2" className="bg-[#141417] text-white">2nd Year / E2</option>
                      <option value="3rd Year / E3" className="bg-[#141417] text-white">3rd Year / E3</option>
                      <option value="4th Year / E4" className="bg-[#141417] text-white">4th Year / E4</option>
                      <option value="PUC / Pre-University" className="bg-[#141417] text-white">PUC / Pre-University</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={leadEmail}
                      onChange={(e) => setLeadEmail(e.target.value)}
                      placeholder="lead@rguktsklm.ac.in"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                      Mobile Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={(e) => setLeadPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-mono font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION 3: Additional Team Members */}
              <div className="space-y-4 p-5 sm:p-6 rounded-xl border border-white/15 bg-[#0e0e10]">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <h2 className="text-sm sm:text-base font-bold font-caps text-white">
                      3. Additional Team Members ({members.length} added, total team size: {members.length + 1})
                    </h2>
                  </div>

                  {members.length < 3 && (
                    <button
                      type="button"
                      onClick={addMember}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-primary/40 bg-primary/10 text-primary hover:bg-primary/20 text-xs font-caps font-semibold transition-colors cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add Member</span>
                    </button>
                  )}
                </div>

                <div className="space-y-4">
                  {members.map((member, index) => (
                    <div key={index} className="p-4 rounded-lg border border-white/10 bg-[#121215] space-y-3">
                      <div className="flex items-center justify-between text-xs font-caps">
                        <span className="font-bold text-white">Member #{index + 2}</span>
                        {members.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeMember(index)}
                            className="text-red-400 hover:text-red-300 p-1 transition-colors cursor-pointer"
                            title="Remove member"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          required
                          value={member.name}
                          onChange={(e) => updateMember(index, "name", e.target.value)}
                          placeholder="Member Name"
                          className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-white/20 text-xs sm:text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary font-caps"
                        />
                        <input
                          type="text"
                          required
                          value={member.rollNo}
                          onChange={(e) => updateMember(index, "rollNo", e.target.value)}
                          placeholder="Roll Number (e.g. S190456)"
                          className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-white/20 text-xs sm:text-sm text-white font-mono font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <select
                          value={member.branch}
                          onChange={(e) => updateMember(index, "branch", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-white/20 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-primary font-caps"
                        >
                          <option value="Computer Science & Engineering" className="bg-[#18181c] text-white">CSE</option>
                          <option value="Electronics & Communication" className="bg-[#18181c] text-white">ECE</option>
                          <option value="Mechanical Engineering" className="bg-[#18181c] text-white">ME</option>
                          <option value="Civil Engineering" className="bg-[#18181c] text-white">CE</option>
                          <option value="Chemical Engineering" className="bg-[#18181c] text-white">CHE</option>
                          <option value="Electrical & Electronics" className="bg-[#18181c] text-white">EEE</option>
                        </select>

                        <select
                          value={member.year}
                          onChange={(e) => updateMember(index, "year", e.target.value)}
                          className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-white/20 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-primary font-caps"
                        >
                          <option value="1st Year / E1" className="bg-[#18181c] text-white">1st Year / E1</option>
                          <option value="2nd Year / E2" className="bg-[#18181c] text-white">2nd Year / E2</option>
                          <option value="3rd Year / E3" className="bg-[#18181c] text-white">3rd Year / E3</option>
                          <option value="4th Year / E4" className="bg-[#18181c] text-white">4th Year / E4</option>
                        </select>

                        <input
                          type="email"
                          required
                          value={member.email}
                          onChange={(e) => updateMember(index, "email", e.target.value)}
                          placeholder="Member Email"
                          className="w-full px-3 py-2 rounded-lg bg-[#18181c] border border-white/20 text-xs sm:text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary font-caps"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 4: Compliance Checkboxes */}
              <div className="space-y-3 p-4 rounded-xl border border-white/15 bg-[#0e0e10] text-xs font-caps text-zinc-300">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={hardwareAgreed}
                    onChange={(e) => setHardwareAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-white/30 bg-[#18181c] text-primary focus:ring-primary/20 cursor-pointer w-4 h-4"
                  />
                  <span>
                    Our team understands and agrees that we must bring our own laptops, charging adapters, and hardware required for building.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={rulesAgreed}
                    onChange={(e) => setRulesAgreed(e.target.checked)}
                    className="mt-0.5 rounded border-white/30 bg-[#18181c] text-primary focus:ring-primary/20 cursor-pointer w-4 h-4"
                  />
                  <span>
                    We agree to build our project entirely during the hackathon rounds starting after problem statements announcement, and will keep our team ticket throughout the event.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-white text-black font-caps font-bold text-sm tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-black" />
                      <span>Registering With Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4 text-primary" />
                      <span>Register Team & Generate Official Pass</span>
                    </>
                  )}
                </button>
              </div>

            </form>

          </div>
        )}

      </main>

    </div>
  );
}
