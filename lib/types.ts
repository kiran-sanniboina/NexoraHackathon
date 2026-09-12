export type Role = "user" | "admin";

export type RegistrationStatus =
  | "DRAFT"
  | "PENDING"
  | "VERIFIED"
  | "REJECTED"
  | "COMPLETED"
  | "CANCELLED";

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  college?: string;
  branch?: string;
  gradYear?: string;
  skills?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  role: Role;
  teamId?: string;
  createdAt: string;
  avatarUrl?: string;
}

export interface TeamMember {
  id: string;
  fullName: string;
  email: string;
  college: string;
  role: "Leader" | "Member";
  skills?: string[];
  githubUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  code: string;
  leaderId: string;
  track?: string;
  members: TeamMember[];
  maxMembers: number;
  createdAt: string;
}

export interface RegistrationRecord {
  id: string;
  teamId: string;
  teamName: string;
  leaderName: string;
  leaderEmail: string;
  college: string;
  track: string;
  memberCount: number;
  status: RegistrationStatus;
  projectTitle?: string;
  projectDescription?: string;
  githubUrl?: string;
  demoUrl?: string;
  submittedAt: string;
  updatedAt: string;
  notes?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  category: "General" | "Urgent" | "Schedule" | "Prizes" | "Mentorship";
  publishedAt: string;
  authorName: string;
  isPinned?: boolean;
}

export interface TrackInfo {
  id: string;
  title: string;
  sponsorBadge?: string;
  sponsorName?: string;
  tagline: string;
  description: string;
  prizeAmount: string;
  technologies: string[];
  iconName: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface TimelineEvent {
  time: string;
  day: string;
  title: string;
  description: string;
  stage: "Registration" | "Hackathon" | "Mentoring" | "Evaluation" | "Ceremony";
}

export type ThemeMode = "dark" | "light";
export type ThemePalette = "paytm" | "matrix";

