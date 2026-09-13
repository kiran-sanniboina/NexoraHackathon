"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { NexoraLogo } from "@/components/NexoraLogo";
import { createClient } from "@/lib/supabase/client";
import {
  Sun,
  Moon,
  ArrowLeft,
  Users,
  ShieldCheck,
  Search,
  Filter,
  Download,
  Mail,
  CheckCircle2,
  Clock,
  ExternalLink,
  RefreshCw,
  LogOut,
  Layers,
  Database,
  Eye,
  Trash2,
  Printer,
  X,
  Phone,
  Calendar,
  Sparkles,
} from "lucide-react";

interface TeamMember {
  name: string;
  rollNo?: string;
  branch?: string;
  year?: string;
  email?: string;
}

interface TeamItem {
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

interface ContactItem {
  id?: string;
  name: string;
  email: string;
  team_id?: string;
  subject?: string;
  message: string;
  status?: string;
  created_at?: string;
}

const SAMPLE_TEAMS: TeamItem[] = [
  {
    code: "NX-2026-4821",
    name: "Apex Cybernetica",
    track: "AI & Intelligent Systems",
    leader_name: "Kiran S.",
    leader_email: "builder@rguktsklm.ac.in",
    leader_phone: "+91 93925 67773",
    leader_roll: "S200142",
    leader_branch: "Computer Science & Engineering",
    leader_year: "3rd Year / E3",
    status: "CHECKED-IN",
    created_at: "2026-09-12T09:30:00Z",
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
  },
  {
    code: "NX-2026-1092",
    name: "QuantumLedger",
    track: "Web3, FinTech & Cryptographic Trust",
    leader_name: "Anand Verma",
    leader_email: "anand.v@rguktsklm.ac.in",
    leader_phone: "+91 98480 22334",
    leader_roll: "S200311",
    leader_branch: "Computer Science & Engineering",
    leader_year: "3rd Year / E3",
    status: "CONFIRMED",
    created_at: "2026-09-12T10:15:00Z",
    members: [
      {
        name: "Rohit K.",
        rollNo: "S200315",
        branch: "Computer Science & Engineering",
        year: "3rd Year / E3",
        email: "rohit@rguktsklm.ac.in",
      },
      {
        name: "Divya M.",
        rollNo: "S200320",
        branch: "Computer Science & Engineering",
        year: "3rd Year / E3",
        email: "divya@rguktsklm.ac.in",
      },
      {
        name: "Karthik P.",
        rollNo: "S200325",
        branch: "Mechanical Engineering",
        year: "2nd Year / E2",
        email: "karthik@rguktsklm.ac.in",
      },
    ],
  },
  {
    code: "NX-2026-8834",
    name: "HyperGrid IoT",
    track: "IoT, Robotics & Smart Embedded Systems",
    leader_name: "Sneha Reddy",
    leader_email: "sneha.r@rguktsklm.ac.in",
    leader_phone: "+91 91234 56789",
    leader_roll: "S200405",
    leader_branch: "Electronics & Communication",
    leader_year: "3rd Year / E3",
    status: "CONFIRMED",
    created_at: "2026-09-12T11:00:00Z",
    members: [
      {
        name: "Manojkumar B.",
        rollNo: "S200412",
        branch: "Electronics & Communication",
        year: "3rd Year / E3",
        email: "manoj@rguktsklm.ac.in",
      },
    ],
  },
  {
    code: "NX-2026-5519",
    name: "SentinelGuard",
    track: "Cloud Infrastructure, DevOps & Cyber Defense",
    leader_name: "Farhan Ali",
    leader_email: "farhan.ali@rguktsklm.ac.in",
    leader_phone: "+91 94400 11223",
    leader_roll: "S200551",
    leader_branch: "Computer Science & Engineering",
    leader_year: "3rd Year / E3",
    status: "SHORTLISTED",
    created_at: "2026-09-12T11:45:00Z",
    members: [
      {
        name: "Vinay C.",
        rollNo: "S200555",
        branch: "Computer Science & Engineering",
        year: "3rd Year / E3",
        email: "vinay@rguktsklm.ac.in",
      },
      {
        name: "Harshitha G.",
        rollNo: "S200560",
        branch: "Computer Science & Engineering",
        year: "3rd Year / E3",
        email: "harshitha@rguktsklm.ac.in",
      },
    ],
  },
];

export default function AdminDashboardPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [teams, setTeams] = useState<TeamItem[]>(SAMPLE_TEAMS);
  const [inquiries, setInquiries] = useState<ContactItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");
  const [selectedTeam, setSelectedTeam] = useState<TeamItem | null>(null);
  const [activeTab, setActiveTab] = useState<"teams" | "inbox">("teams");

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

  const loadData = async () => {
    setIsLoading(true);
    try {
      const supabase = createClient();
      if (supabase) {
        // Query live teams from Supabase
        const { data: teamsData, error: teamsError } = await supabase
          .from("teams")
          .select("*")
          .order("created_at", { ascending: false });

        if (teamsData && teamsData.length > 0) {
          setTeams(teamsData);
        }

        // Query inquiries
        const { data: contactData } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (contactData && contactData.length > 0) {
          setInquiries(contactData);
        }
      }
    } catch (err) {
      console.warn("Could not query Supabase in admin dashboard:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (teamCode: string, newStatus: string) => {
    setTeams((prev) =>
      prev.map((t) => (t.code === teamCode ? { ...t, status: newStatus } : t))
    );

    if (selectedTeam && selectedTeam.code === teamCode) {
      setSelectedTeam((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    try {
      const supabase = createClient();
      if (supabase) {
        await supabase
          .from("teams")
          .update({ status: newStatus })
          .ilike("code", teamCode);
      }
    } catch (err) {
      console.warn("Status update error:", err);
    }
  };

  // Filter teams
  const filteredTeams = teams.filter((t) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      t.name.toLowerCase().includes(query) ||
      t.code.toLowerCase().includes(query) ||
      t.leader_name.toLowerCase().includes(query) ||
      t.leader_email.toLowerCase().includes(query) ||
      (t.leader_roll && t.leader_roll.toLowerCase().includes(query)) ||
      (t.members &&
        t.members.some(
          (m) =>
            m.name.toLowerCase().includes(query) ||
            (m.rollNo && m.rollNo.toLowerCase().includes(query))
        ));

    const matchesTrack = selectedTrack === "ALL" || t.track === selectedTrack;
    const matchesStatus = selectedStatus === "ALL" || t.status === selectedStatus;

    return matchesSearch && matchesTrack && matchesStatus;
  });

  // Calculate metrics
  const totalTeams = teams.length;
  const totalBuilders = teams.reduce(
    (acc, t) => acc + 1 + (t.members ? t.members.length : 0),
    0
  );
  const totalCheckedIn = teams.filter((t) => t.status === "CHECKED-IN").length;
  const totalConfirmed = teams.filter((t) => t.status === "CONFIRMED").length;

  // Export full teams data as CSV
  const handleExportCSV = () => {
    const headers = [
      "Team ID",
      "Team Name",
      "Track / Domain",
      "Registration Status",
      "Registered At",
      "Lead Name",
      "Lead Email",
      "Lead Phone",
      "Lead Roll No",
      "Lead Branch",
      "Lead Year",
      "Total Members",
      "Member 2",
      "Member 2 Roll",
      "Member 3",
      "Member 3 Roll",
      "Member 4",
      "Member 4 Roll",
    ];

    const rows = teams.map((t) => {
      const m1 = t.members && t.members[0] ? t.members[0] : null;
      const m2 = t.members && t.members[1] ? t.members[1] : null;
      const m3 = t.members && t.members[2] ? t.members[2] : null;

      return [
        t.code,
        `"${t.name.replace(/"/g, '""')}"`,
        `"${t.track}"`,
        t.status,
        t.created_at || "",
        `"${t.leader_name}"`,
        t.leader_email,
        t.leader_phone || "",
        t.leader_roll || "",
        `"${t.leader_branch || ""}"`,
        `"${t.leader_year || ""}"`,
        t.members ? t.members.length + 1 : 1,
        m1 ? `"${m1.name}"` : "",
        m1 ? m1.rollNo || "" : "",
        m2 ? `"${m2.name}"` : "",
        m2 ? m2.rollNo || "" : "",
        m3 ? `"${m3.name}"` : "",
        m3 ? m3.rollNo || "" : "",
      ];
    });

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      `nexora2026_complete_registered_teams_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-transparent text-foreground selection:bg-primary selection:text-black">
      
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-background/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2">
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
              <span className="text-[10px] font-caps px-2 py-0.5 rounded-full border border-red-500/30 bg-red-500/10 text-red-400 font-bold hidden xs:inline">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Refresh Live Data */}
            <button
              onClick={loadData}
              disabled={isLoading}
              title="Refresh Supabase Live Data"
              className="p-1.5 rounded-lg border border-border-subtle bg-surface/40 hover:bg-surface text-muted-foreground hover:text-foreground transition-all cursor-pointer"
            >
              <RefreshCw size={14} className={isLoading ? "animate-spin text-primary" : ""} />
            </button>

            {/* Export Full CSV */}
            <button
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-foreground text-background text-xs font-caps font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              title="Export Full CSV"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export Full CSV</span>
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

      {/* Metrics Banner */}
      <section className="border-b border-border-subtle bg-surface/20 py-4 sm:py-6 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
            <div className="p-3 sm:p-4 rounded-xl border border-border-subtle bg-surface/40 space-y-1">
              <span className="text-[9px] sm:text-[10px] font-caps uppercase tracking-wider text-muted-foreground block truncate">
                Registered Teams
              </span>
              <div className="text-xl sm:text-3xl font-mono font-bold text-foreground">
                {totalTeams}
              </div>
              <span className="text-[9px] sm:text-[10px] font-caps text-muted-foreground block truncate">Across all tracks</span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl border border-border-subtle bg-surface/40 space-y-1">
              <span className="text-[9px] sm:text-[10px] font-caps uppercase tracking-wider text-muted-foreground block truncate">
                Registered Builders
              </span>
              <div className="text-xl sm:text-3xl font-mono font-bold text-primary">
                {totalBuilders}
              </div>
              <span className="text-[9px] sm:text-[10px] font-caps text-muted-foreground block truncate">Leads + Members</span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl border border-border-subtle bg-surface/40 space-y-1">
              <span className="text-[9px] sm:text-[10px] font-caps uppercase tracking-wider text-muted-foreground block truncate">
                Checked-In Venue
              </span>
              <div className="text-xl sm:text-3xl font-mono font-bold text-emerald-400">
                {totalCheckedIn}
              </div>
              <span className="text-[9px] sm:text-[10px] font-caps text-muted-foreground block truncate">Physical presence</span>
            </div>

            <div className="p-3 sm:p-4 rounded-xl border border-border-subtle bg-surface/40 space-y-1">
              <span className="text-[9px] sm:text-[10px] font-caps uppercase tracking-wider text-muted-foreground block truncate">
                Pending Verification
              </span>
              <div className="text-xl sm:text-3xl font-mono font-bold text-amber-400">
                {totalConfirmed}
              </div>
              <span className="text-[9px] sm:text-[10px] font-caps text-muted-foreground block truncate">Registered online</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex gap-2 p-1 rounded-xl border border-border-subtle bg-surface/40 text-xs font-caps max-w-sm">
          <button
            onClick={() => setActiveTab("teams")}
            className={
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-bold transition-all cursor-pointer " +
              (activeTab === "teams" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground")
            }
          >
            <Users className="w-3.5 h-3.5" />
            <span>Registered Teams ({teams.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("inbox")}
            className={
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-bold transition-all cursor-pointer " +
              (activeTab === "inbox" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground")
            }
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Support Inbox ({inquiries.length})</span>
          </button>
        </div>

        {/* TAB 1: REGISTERED TEAMS DATA DESK */}
        {activeTab === "teams" && (
          <div className="space-y-4">
            
            {/* Search & Filter Bar */}
            {/* Search and Filters Bar */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by Team ID, name, lead, or member roll..."
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-lg bg-surface border border-border-subtle text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary font-caps"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 rounded-lg bg-surface border border-border-subtle text-xs font-caps text-foreground focus:outline-none focus:border-primary cursor-pointer truncate"
                >
                  <option value="ALL">All Tracks</option>
                  <option value="AI & Intelligent Systems">AI & Intelligent Systems</option>
                  <option value="Web3, FinTech & Cryptographic Trust">Web3 & FinTech</option>
                  <option value="IoT, Robotics & Smart Embedded Systems">IoT & Robotics</option>
                  <option value="Cloud Infrastructure, DevOps & Cyber Defense">Cloud & Cyber</option>
                </select>

                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full sm:w-auto px-3 py-2 rounded-lg bg-surface border border-border-subtle text-xs font-caps text-foreground focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="CHECKED-IN">CHECKED-IN</option>
                  <option value="SHORTLISTED">SHORTLISTED</option>
                  <option value="FINALIST">FINALIST</option>
                </select>
              </div>
            </div>

            {/* MOBILE VIEW: Responsive Touch-Friendly Team Cards */}
            <div className="block md:hidden space-y-3">
              {filteredTeams.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground text-xs font-caps rounded-xl border border-border-subtle bg-surface/30">
                  No registered teams found matching your query.
                </div>
              ) : (
                filteredTeams.map((team) => (
                  <div
                    key={team.code}
                    className="p-4 rounded-xl border border-border-subtle bg-surface/40 backdrop-blur-sm space-y-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-primary">{team.code}</span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface border border-border-subtle text-[10px] font-mono text-muted-foreground">
                          <Users className="w-2.5 h-2.5" />
                          <span>{team.members ? team.members.length + 1 : 1}</span>
                        </span>
                      </div>
                      
                      <select
                        value={team.status}
                        onChange={(e) => handleUpdateStatus(team.code, e.target.value)}
                        className="px-2 py-1 rounded border border-border-subtle bg-surface text-[10px] font-caps font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer"
                      >
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="CHECKED-IN">CHECKED-IN</option>
                        <option value="SHORTLISTED">SHORTLISTED</option>
                        <option value="FINALIST">FINALIST</option>
                      </select>
                    </div>

                    <div>
                      <h4 className="font-bold text-base text-foreground font-caps">{team.name}</h4>
                      <span className="text-[10px] font-caps text-muted-foreground block mt-0.5">
                        {team.track}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-surface/60 border border-border-subtle/50 text-xs font-caps space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-foreground">{team.leader_name}</span>
                        <span className="text-[10px] text-primary">Lead</span>
                      </div>
                      <div className="font-mono text-[10px] text-muted-foreground break-all">{team.leader_email}</div>
                      {team.leader_phone && (
                        <div className="font-mono text-[10px] text-muted-foreground/80">{team.leader_phone}</div>
                      )}
                    </div>

                    <button
                      onClick={() => setSelectedTeam(team)}
                      className="w-full py-2 px-3 rounded-lg border border-border-subtle bg-surface hover:bg-surface-elevated text-foreground hover:text-primary transition-colors text-xs font-caps font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-primary" />
                      <span>View Full Dossier & Roster</span>
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* DESKTOP / TABLET VIEW: Comprehensive Teams Data Table */}
            <div className="hidden md:block rounded-2xl border border-border-subtle bg-surface/30 overflow-hidden backdrop-blur-sm shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs font-caps">
                  <thead>
                    <tr className="border-b border-border-subtle bg-surface/60 text-muted-foreground">
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Team ID</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Team Name</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Assigned Track</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Team Leader & Contact</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">Roster Size</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider">Status</th>
                      <th className="py-3 px-4 font-semibold uppercase tracking-wider text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border-subtle/60">
                    {filteredTeams.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-muted-foreground">
                          No registered teams found matching your query.
                        </td>
                      </tr>
                    ) : (
                      filteredTeams.map((team) => (
                        <tr key={team.code} className="hover:bg-surface/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-primary">
                            {team.code}
                          </td>

                          <td className="py-3.5 px-4 font-bold text-foreground">
                            {team.name}
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded border border-border-subtle bg-surface text-[10px] text-muted-foreground">
                              {team.track.split(",")[0]}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 space-y-0.5">
                            <span className="font-semibold text-foreground block">{team.leader_name}</span>
                            <span className="font-mono text-[10px] text-muted-foreground block">{team.leader_email}</span>
                            {team.leader_phone && (
                              <span className="font-mono text-[10px] text-muted-foreground/80 block">{team.leader_phone}</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface border border-border-subtle text-[11px] font-mono">
                              <Users className="w-3 h-3 text-muted-foreground" />
                              <span>{team.members ? team.members.length + 1 : 1}</span>
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <select
                              value={team.status}
                              onChange={(e) => handleUpdateStatus(team.code, e.target.value)}
                              className="px-2 py-1 rounded border border-border-subtle bg-surface text-[11px] font-caps font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer"
                            >
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="CHECKED-IN">CHECKED-IN</option>
                              <option value="SHORTLISTED">SHORTLISTED</option>
                              <option value="FINALIST">FINALIST</option>
                            </select>
                          </td>

                          <td className="py-3.5 px-4 text-center">
                            <button
                              onClick={() => setSelectedTeam(team)}
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border-subtle bg-surface hover:bg-surface-elevated text-foreground hover:text-primary transition-colors text-[11px] font-semibold cursor-pointer"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View Full</span>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: SUPPORT INBOX */}
        {activeTab === "inbox" && (
          <div className="rounded-2xl border border-border-subtle bg-surface/30 p-6 sm:p-8 space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] font-caps tracking-wider text-primary uppercase font-bold">
                Inquiries Dispatched From Website
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-caps text-foreground">
                Support & Participant Messages
              </h2>
            </div>

            {inquiries.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground text-xs font-caps">
                No inquiries recorded in Supabase yet.
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-border-subtle bg-surface/40 space-y-2 text-xs font-caps"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border-subtle/50 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-foreground text-sm">{inq.name}</span>
                        <span className="text-muted-foreground font-mono">({inq.email})</span>
                        {inq.team_id && (
                          <span className="px-2 py-0.5 rounded border border-primary/30 bg-primary/10 text-primary font-mono text-[10px]">
                            {inq.team_id}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground">
                        {inq.created_at ? new Date(inq.created_at).toLocaleTimeString() : "Recent"}
                      </span>
                    </div>

                    <div className="space-y-1 pt-1">
                      <span className="font-bold text-primary block">{inq.subject || "General Inquiry"}</span>
                      <p className="text-muted-foreground leading-relaxed font-sans text-xs">
                        {inq.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </main>

      {/* =================================================================== */}
      {/* DETAILED TEAM DATA MODAL / DRAWER                                   */}
      {/* =================================================================== */}
      {selectedTeam && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-sm">
          <div
            style={{ backgroundColor: "#0f0f11" }}
            className="w-full max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto rounded-t-2xl sm:rounded-2xl border border-white/20 text-white p-5 sm:p-8 space-y-5 shadow-2xl relative"
          >
            
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-caps text-zinc-400 uppercase tracking-widest block">
                  Complete Team Data Record
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-caps text-white mt-0.5">
                  {selectedTeam.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="font-mono text-primary text-sm font-bold">{selectedTeam.code}</span>
                  <span className="text-xs text-zinc-400">• {selectedTeam.track}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedTeam(null)}
                className="p-1.5 rounded-lg border border-white/10 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                title="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Status Bar */}
            <div className="p-3 sm:p-4 rounded-xl border border-white/10 bg-[#141417] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-caps">
              <span className="text-zinc-400">Current Registration Status:</span>
              <select
                value={selectedTeam.status}
                onChange={(e) => handleUpdateStatus(selectedTeam.code, e.target.value)}
                className="w-full sm:w-auto px-3 py-1.5 rounded-lg border border-white/20 bg-black text-xs font-caps font-bold text-white focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="CHECKED-IN">CHECKED-IN</option>
                <option value="SHORTLISTED">SHORTLISTED</option>
                <option value="FINALIST">FINALIST</option>
              </select>
            </div>

            {/* Leader Details Card */}
            <div className="space-y-2">
              <span className="text-[10px] font-caps tracking-wider text-primary uppercase font-bold block">
                Lead Architect Details
              </span>
              <div className="p-3.5 sm:p-4 rounded-xl border border-primary/30 bg-primary/5 space-y-1.5 sm:space-y-2 text-xs font-caps">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-white/10 gap-0.5 sm:gap-2">
                  <span className="text-zinc-400 text-[11px]">Full Name:</span>
                  <span className="text-white font-bold">{selectedTeam.leader_name}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-white/10 gap-0.5 sm:gap-2">
                  <span className="text-zinc-400 text-[11px]">Institutional Email:</span>
                  <span className="font-mono text-primary text-[11px] sm:text-xs break-all">{selectedTeam.leader_email}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-white/10 gap-0.5 sm:gap-2">
                  <span className="text-zinc-400 text-[11px]">Phone Number:</span>
                  <span className="font-mono text-white text-[11px] sm:text-xs">{selectedTeam.leader_phone || "Not Provided"}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-white/10 gap-0.5 sm:gap-2">
                  <span className="text-zinc-400 text-[11px]">Student Roll No:</span>
                  <span className="font-mono text-white text-[11px] sm:text-xs">{selectedTeam.leader_roll || "N/A"}</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 border-b border-white/10 gap-0.5 sm:gap-2">
                  <span className="text-zinc-400 text-[11px]">Branch & Academic Year:</span>
                  <span className="text-white text-[11px] sm:text-xs">{selectedTeam.leader_branch || "CSE"} • {selectedTeam.leader_year || "3rd Year"}</span>
                </div>
              </div>
            </div>

            {/* Team Members Roster */}
            <div className="space-y-2">
              <span className="text-[10px] font-caps tracking-wider text-zinc-300 uppercase font-bold block">
                Registered Team Members ({selectedTeam.members ? selectedTeam.members.length : 0} Additional)
              </span>

              {selectedTeam.members && selectedTeam.members.length > 0 ? (
                <div className="space-y-2">
                  {selectedTeam.members.map((member, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-3.5 rounded-xl border border-white/10 bg-[#141417] text-xs font-caps space-y-1.5"
                    >
                      <div className="flex justify-between items-center gap-2">
                        <span className="font-bold text-white">Member #{idx + 2}: {member.name}</span>
                        <span className="font-mono text-zinc-400 shrink-0">{member.rollNo || "No Roll"}</span>
                      </div>
                      <div className="text-[11px] text-zinc-400 flex flex-col sm:flex-row sm:justify-between gap-1">
                        <span>{member.branch} • {member.year}</span>
                        <span className="font-mono text-primary/80 break-all">{member.email}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 rounded-xl border border-white/10 bg-[#141417] text-center text-xs font-caps text-zinc-400">
                  Solo Lead Registration (No additional members listed).
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-end border-t border-white/10">
              <button
                onClick={() => setSelectedTeam(null)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-white/20 hover:bg-white/10 text-xs font-caps text-white transition-colors cursor-pointer text-center"
              >
                Close Data View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
