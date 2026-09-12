"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Announcement, RegistrationRecord, Role, Team, UserProfile } from "./types";
import { DEMO_USERS, INITIAL_ANNOUNCEMENTS, INITIAL_REGISTRATIONS } from "./mock-data";
import { generateTeamCode } from "./utils";

interface NexoraStoreContextType {
  currentUser: UserProfile | null;
  currentTeam: Team | null;
  registrations: RegistrationRecord[];
  announcements: Announcement[];
  isRegistrationOpen: boolean;
  maxTeamSize: number;
  login: (role: Role, email?: string, name?: string) => void;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => void;
  createTeam: (teamName: string, track: string) => Team;
  joinTeamByCode: (code: string) => { success: boolean; message: string };
  leaveTeam: () => void;
  submitRegistration: (registrationData: Partial<RegistrationRecord>) => void;
  updateRegistrationStatus: (id: string, status: RegistrationRecord["status"], notes?: string) => void;
  addAnnouncement: (title: string, content: string, category: Announcement["category"]) => void;
  deleteAnnouncement: (id: string) => void;
  toggleRegistrationOpen: () => void;
  updateMaxTeamSize: (size: number) => void;
}

const NexoraStoreContext = createContext<NexoraStoreContextType | undefined>(undefined);

export function NexoraStoreProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>(INITIAL_REGISTRATIONS);
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState<boolean>(true);
  const [maxTeamSize, setMaxTeamSize] = useState<number>(4);
  const [initialized, setInitialized] = useState(false);

  // Initialize from LocalStorage or default demo data
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("nexora_user");
      const storedTeam = localStorage.getItem("nexora_team");
      const storedRegistrations = localStorage.getItem("nexora_registrations");
      const storedAnnouncements = localStorage.getItem("nexora_announcements");
      const storedSettings = localStorage.getItem("nexora_settings");

      if (storedUser) {
        setCurrentUser(JSON.parse(storedUser));
      } else {
        // Default to demo participant for instant exploration
        setCurrentUser(DEMO_USERS.participant);
      }

      if (storedTeam) {
        setCurrentTeam(JSON.parse(storedTeam));
      } else {
        // Initial default team
        setCurrentTeam({
          id: "team-01",
          name: "PaytmPulse Ops",
          code: "NX8921",
          leaderId: "user-demo-participant",
          track: "FinTech & Digital Payments",
          maxMembers: 4,
          createdAt: "2026-03-01T10:00:00Z",
          members: [
            {
              id: "user-demo-participant",
              fullName: "Kiran Sanniboina",
              email: "hacker@nexora.dev",
              college: "Indian Institute of Information Technology",
              role: "Leader",
              skills: ["Next.js", "TypeScript", "Python"],
              githubUrl: "https://github.com/kiran-sanniboina",
            },
            {
              id: "user-02",
              fullName: "Aditi Rao",
              email: "aditi.rao@iiit.ac.in",
              college: "Indian Institute of Information Technology",
              role: "Member",
              skills: ["UI/UX", "Figma", "Tailwind CSS"],
              githubUrl: "https://github.com/aditi-rao",
            },
            {
              id: "user-03",
              fullName: "Samarth Gupta",
              email: "samarth.g@rvce.edu",
              college: "RV College of Engineering",
              role: "Member",
              skills: ["Go", "Kafka", "PostgreSQL"],
              githubUrl: "https://github.com/samarthg",
            },
          ],
        });
      }

      if (storedRegistrations) {
        setRegistrations(JSON.parse(storedRegistrations));
      }

      if (storedAnnouncements) {
        setAnnouncements(JSON.parse(storedAnnouncements));
      }

      if (storedSettings) {
        const settings = JSON.parse(storedSettings);
        setIsRegistrationOpen(settings.isOpen ?? true);
        setMaxTeamSize(settings.maxSize ?? 4);
      }
    } catch {
      // Fallback in case of storage error
      setCurrentUser(DEMO_USERS.participant);
    }
    setInitialized(true);
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (!initialized) return;
    try {
      if (currentUser) {
        localStorage.setItem("nexora_user", JSON.stringify(currentUser));
      } else {
        localStorage.removeItem("nexora_user");
      }
    } catch {
      // Ignore storage error
    }
  }, [currentUser, initialized]);

  useEffect(() => {
    if (!initialized) return;
    try {
      if (currentTeam) {
        localStorage.setItem("nexora_team", JSON.stringify(currentTeam));
      } else {
        localStorage.removeItem("nexora_team");
      }
    } catch {
      // Ignore
    }
  }, [currentTeam, initialized]);

  useEffect(() => {
    if (!initialized) return;
    try {
      localStorage.setItem("nexora_registrations", JSON.stringify(registrations));
    } catch {
      // Ignore
    }
  }, [registrations, initialized]);

  useEffect(() => {
    if (!initialized) return;
    try {
      localStorage.setItem("nexora_announcements", JSON.stringify(announcements));
    } catch {
      // Ignore
    }
  }, [announcements, initialized]);

  const login = (role: Role, email?: string, name?: string) => {
    if (role === "admin") {
      setCurrentUser(DEMO_USERS.admin);
    } else {
      if (email && name) {
        const newUser: UserProfile = {
          id: `user-${Date.now()}`,
          email,
          fullName: name,
          role: "user",
          createdAt: new Date().toISOString(),
          college: "Tech University",
        };
        setCurrentUser(newUser);
      } else {
        setCurrentUser(DEMO_USERS.participant);
      }
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setCurrentTeam(null);
    try {
      localStorage.removeItem("nexora_user");
      localStorage.removeItem("nexora_team");
    } catch {
      // Ignore
    }
  };

  const updateProfile = (data: Partial<UserProfile>) => {
    setCurrentUser((prev) => (prev ? { ...prev, ...data } : null));
  };

  const createTeam = (teamName: string, track: string): Team => {
    const code = generateTeamCode();
    const newTeam: Team = {
      id: `team-${Date.now()}`,
      name: teamName,
      code,
      leaderId: currentUser?.id || "user-demo-participant",
      track,
      maxMembers: maxTeamSize,
      createdAt: new Date().toISOString(),
      members: [
        {
          id: currentUser?.id || "user-demo-participant",
          fullName: currentUser?.fullName || "Kiran Sanniboina",
          email: currentUser?.email || "hacker@nexora.dev",
          college: currentUser?.college || "IIIT Bangalore",
          role: "Leader",
          skills: currentUser?.skills || ["Next.js"],
          githubUrl: currentUser?.githubUrl,
        },
      ],
    };
    setCurrentTeam(newTeam);
    return newTeam;
  };

  const joinTeamByCode = (code: string): { success: boolean; message: string } => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === currentTeam?.code) {
      return { success: false, message: "You are already in this team!" };
    }
    if (cleanCode.length < 4) {
      return { success: false, message: "Invalid team invite code." };
    }
    // Simulate joining team
    const joinedTeam: Team = {
      id: `team-joined-${Date.now()}`,
      name: `Joined Team (${cleanCode})`,
      code: cleanCode,
      leaderId: "other-user",
      track: "FinTech & Digital Payments",
      maxMembers: maxTeamSize,
      createdAt: new Date().toISOString(),
      members: [
        {
          id: "other-leader",
          fullName: "Sneha Reddy",
          email: "sneha.r@rvce.edu",
          college: "RV College of Engineering",
          role: "Leader",
        },
        {
          id: currentUser?.id || "current-user",
          fullName: currentUser?.fullName || "Kiran Sanniboina",
          email: currentUser?.email || "hacker@nexora.dev",
          college: currentUser?.college || "IIIT Bangalore",
          role: "Member",
        },
      ],
    };
    setCurrentTeam(joinedTeam);
    return { success: true, message: "Successfully joined the team!" };
  };

  const leaveTeam = () => {
    setCurrentTeam(null);
  };

  const submitRegistration = (registrationData: Partial<RegistrationRecord>) => {
    const newReg: RegistrationRecord = {
      id: `reg-${Date.now()}`,
      teamId: currentTeam?.id || "team-new",
      teamName: currentTeam?.name || "Independent Hackers",
      leaderName: currentUser?.fullName || "Lead Hacker",
      leaderEmail: currentUser?.email || "hacker@nexora.dev",
      college: currentUser?.college || "National Institute of Technology",
      track: currentTeam?.track || "FinTech & Digital Payments",
      memberCount: currentTeam?.members.length || 1,
      status: "PENDING",
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...registrationData,
    };
    setRegistrations((prev) => [newReg, ...prev]);
  };

  const updateRegistrationStatus = (id: string, status: RegistrationRecord["status"], notes?: string) => {
    setRegistrations((prev) =>
      prev.map((reg) => (reg.id === id ? { ...reg, status, notes: notes ?? reg.notes, updatedAt: new Date().toISOString() } : reg))
    );
  };

  const addAnnouncement = (title: string, content: string, category: Announcement["category"]) => {
    const newAnn: Announcement = {
      id: `ann-${Date.now()}`,
      title,
      content,
      category,
      publishedAt: new Date().toISOString(),
      authorName: currentUser?.fullName || "Nexora Admin",
      isPinned: false,
    };
    setAnnouncements((prev) => [newAnn, ...prev]);
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const toggleRegistrationOpen = () => {
    setIsRegistrationOpen((prev) => !prev);
  };

  const updateMaxTeamSize = (size: number) => {
    setMaxTeamSize(size);
  };

  return (
    <NexoraStoreContext.Provider
      value={{
        currentUser,
        currentTeam,
        registrations,
        announcements,
        isRegistrationOpen,
        maxTeamSize,
        login,
        logout,
        updateProfile,
        createTeam,
        joinTeamByCode,
        leaveTeam,
        submitRegistration,
        updateRegistrationStatus,
        addAnnouncement,
        deleteAnnouncement,
        toggleRegistrationOpen,
        updateMaxTeamSize,
      }}
    >
      {children}
    </NexoraStoreContext.Provider>
  );
}

export function useNexoraStore() {
  const context = useContext(NexoraStoreContext);
  if (!context) {
    throw new Error("useNexoraStore must be used within a NexoraStoreProvider");
  }
  return context;
}
