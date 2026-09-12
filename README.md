# NEXORA — Coding Club Hackathon Platform (Partnered with PAYTM)

A sleek, modern, minimal, production-ready hackathon registration and management platform for **NEXORA 2026**, conducted by Coding Club in partnership with **PAYTM**.

Built according to the [Architectural Specification](file:///./README(1).md) and following **UI/UX Pro Max** guidelines with **switchable color palettes for both Dark and Light modes**.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Or build and start production server
npm run build
npm run start -- -p 3000
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🎨 Switchable Palettes & Theme System

The top navigation bar includes an interactive theme controller that supports:
- **Modes**: Dark Mode & Light Mode (with WCAG AAA/AA audited contrast)
- **Palette 1: Paytm Pulse**: Electric Cyan (`#00BAF2`) & Deep Cobalt Blue (`#0284C7`)
- **Palette 2: Neon Matrix**: Cyber Emerald (`#10B981`) & Tech Mint (`#14B8A6`)

Selections persist automatically to `localStorage`.

---

## 📁 Key Routes

- **Public Pages**:
  - `/`: Landing page with live countdown, Paytm partner spotlight, tracks, prizes, timeline, FAQs, and registration CTA
  - `/rules`: Official rulebook, eligibility, scoring matrix, IP retention, and code of conduct
  - `/info`: Venue coordinates, commute, packing checklist, facilities, and security
  - `/about`: Coding Club heritage, Paytm alliance, and organizing committee
  - `/contact`: Direct channels, map directions, and inquiry form
- **Authentication**:
  - `/login`: User login with instant **One-Click Demo Hacker Login**
  - `/register`: 4-step onboarding (Account -> Academic Details -> Team Setup -> Confirmation)
  - `/admin/login`: Dedicated admin portal with **Demo Admin Login**
- **Participant Portal (`/dashboard`)**:
  - `/dashboard`: Status badge, workstation allocation, project submission, and announcements feed
  - `/dashboard/team`: Roster management, copyable 6-character team code, join team
  - `/dashboard/registration`: Digital entry pass, QR code, and verification checklist
  - `/dashboard/profile`: Academic profile, skills, and portfolio links
- **Admin Console (`/admin`)**:
  - `/admin/dashboard`: Metrics, KPIs, track distribution breakdown, and review queue
  - `/admin/registrations`: Application review data table, search/filter, inline status actions, and **Export to CSV**
  - `/admin/participants`: Participant directory and college breakdown
  - `/admin/teams`: Team directory and code verification
  - `/admin/announcements`: Broadcast alert composer
  - `/admin/settings`: Master registration gate toggle and team sizing rules
- **Database Migrations**:
  - `supabase/migrations/20260912_init.sql`: Full PostgreSQL schema, indexes, and Row Level Security policies
  - `supabase/seed.sql`: Sample test records

---

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router, Server Components & Client Hooks)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, CSS Custom Variable Tokens
- **Icons**: Lucide React
- **Animations & Effects**: Framer Motion & CSS keyframe glows
- **Database & Auth**: PostgreSQL / Supabase with local interactive state fallback

