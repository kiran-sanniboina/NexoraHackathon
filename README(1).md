# NEXORA — Coding Club Hackathon Platform

A sleek, modern, minimal, production-ready hackathon registration platform for **NEXORA**, organized by the Coding Club and conducted in partnership with **PAYTM**.

This README defines the recommended architecture, technology stack, project structure, development phases, database model, authentication model, and CLI setup required to build the application.

---

## 1. Project Vision

NEXORA should feel like a premium technology event rather than a generic college registration website.

The platform should provide:

- A polished public-facing hackathon website
- Dedicated informational pages
- User authentication
- Participant registration
- Team creation and management
- User dashboard
- Admin authentication
- Admin dashboard
- Participant and registration management
- Secure database access
- File storage when required
- Transactional email
- Analytics
- Responsive design
- Accessibility
- SEO
- Production-ready deployment

The design philosophy is:

> **Sleek + Modern + Minimal + Fast + Professional**

Animations should be implemented deliberately. Do not add excessive animations by default. Animation requirements will be specified separately during development.

---

# 2. Recommended Technology Stack

## Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Motion**

## Backend

Use Next.js server-side functionality instead of introducing a separate backend initially.

- Next.js Server Actions
- Next.js Route Handlers where appropriate
- Server Components
- Middleware for route protection

## Database

- **PostgreSQL**
- Hosted through **Supabase**

## Authentication

- **Supabase Auth**

Potential providers:

- Email + password
- Google OAuth

## Validation

- **Zod**
- **React Hook Form**

## Storage

- **Supabase Storage**

Use this for files such as:

- Profile images
- College identification documents
- Project files
- Other approved participant documents

## Email

- **Resend**

Use for:

- Registration confirmation
- Password reset
- Team invitations
- Event announcements
- Administrative notifications

## Analytics

Start with:

- Vercel Analytics

Optionally add:

- PostHog

## Version Control

- Git
- GitHub

## Deployment

- Vercel
- Supabase

---

# 3. Technologies to Avoid Initially

Do not introduce unnecessary infrastructure.

Avoid initially:

- Express
- MongoDB
- Redux
- GraphQL
- Kubernetes
- Microservices
- Redis
- Docker
- Three.js
- GSAP

These can be introduced later only if a real requirement appears.

The goal is a maintainable monolithic Next.js application with Supabase services.

---

# 4. High-Level Architecture

```text
                         NEXORA
                           │
             ┌─────────────┴─────────────┐
             │                           │
        PUBLIC WEBSITE              APPLICATION
             │                           │
     ┌───────┼────────┐          ┌───────┴────────┐
     │       │        │          │                │
  Landing  Rules    Info       User Portal     Admin Portal
     │       │        │          │                │
     └───────┴────────┘          │                │
                                 │                │
                            Registration      Management
                                 │                │
                                 └────────┬───────┘
                                          │
                                     Supabase
                                          │
                              ┌───────────┼───────────┐
                              │           │           │
                          PostgreSQL     Auth       Storage
```

---

# 5. Application Architecture

```text
Browser
   │
   ▼
Next.js
   │
   ├── App Router
   ├── Server Components
   ├── Client Components
   ├── Server Actions
   ├── Route Handlers
   └── Middleware
   │
   ▼
Supabase
   │
   ├── PostgreSQL
   ├── Authentication
   ├── Row Level Security
   └── Storage
```

---

# 6. Required Pages

## Public Pages

### Landing

Route:

```text
/
```

Purpose:

- Introduce NEXORA
- Communicate the event identity
- Show partnership with PAYTM
- Display registration CTA
- Show countdown
- Highlight key event information
- Provide navigation to important pages

Potential sections:

```text
Hero
Event Overview
Why Participate
Themes / Tracks
Timeline
Prizes
Sponsors / Partners
FAQ
Registration CTA
Footer
```

Do not implement all sections automatically. Final content and section requirements should be confirmed before implementation.

---

### Rules

Route:

```text
/rules
```

Contains:

- Eligibility
- Team-size requirements
- Participation rules
- Submission rules
- Code of conduct
- Disqualification conditions
- Judging rules
- Intellectual-property requirements
- Other official rules

Rules should be presented in a highly readable format.

---

### Information

Route:

```text
/info
```

Contains:

- Event date
- Venue
- Registration deadline
- Eligibility
- Team size
- Tracks
- Schedule
- Prizes
- Required preparation
- Frequently asked questions

---

### About

Route:

```text
/about
```

Contains:

- Coding Club
- NEXORA
- Event purpose
- Organizing team
- Partnership information
- Mission

---

### Contact

Route:

```text
/contact
```

Contains:

- Organizer contact information
- Email
- Social links
- Venue/location information
- Contact form if required

---

# 7. Authentication Pages

## User Login

Route:

```text
/login
```

Features:

- Email/password login
- Google login if enabled
- Forgot password
- Registration CTA
- Error handling
- Loading states

---

## User Registration

Route:

```text
/register
```

Initial account creation.

Recommended flow:

```text
Create Account
      ↓
Personal Information
      ↓
Team Information
      ↓
College Information
      ↓
Confirmation
      ↓
Registration Complete
```

---

## Admin Login

Route:

```text
/admin/login
```

Admin authentication must be separate at the UI level.

Do NOT implement security through frontend-only checks.

Admin authorization must be enforced server-side and through database policies.

---

# 8. User Application

After authentication:

```text
/dashboard
```

Recommended dashboard sections:

```text
Overview
Profile
Team
Registration
Announcements
Settings
```

---

# 9. Team System

Participants should be able to:

- Create a team
- Join a team
- Invite members
- View team members
- Leave a team where permitted
- View registration status

Example flow:

```text
User
 │
 ├── Create Team
 │      │
 │      ├── Team Name
 │      └── Team Description
 │
 └── Join Team
        │
        └── Invitation / Team Code
```

Team rules should be configurable according to the actual hackathon requirements.

---

# 10. Registration System

Registration should be treated as a structured workflow rather than a single large form.

Recommended UI:

```text
REGISTRATION

●────●────●────●
Account Team Details Confirm
```

Potential data:

- Full name
- Email
- Phone
- College
- Course
- Year
- Team
- Skills
- GitHub profile
- LinkedIn profile
- Other required information

Only collect information actually required by the event.

---

# 11. Registration States

Use explicit registration states.

Example:

```text
DRAFT
PENDING
COMPLETED
VERIFIED
REJECTED
CANCELLED
```

The exact state model should be finalized based on event operations.

---

# 12. Admin Application

Base route:

```text
/admin
```

Recommended sections:

```text
/admin/dashboard
/admin/registrations
/admin/participants
/admin/teams
/admin/announcements
/admin/settings
```

---

## Admin Dashboard

Display:

```text
Total Users
Total Teams
Completed Registrations
Pending Registrations
Verified Registrations
Colleges Represented
```

Example:

```text
NEXORA ADMIN

┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│    1,284     │ │     387      │ │     142      │
│    Users     │ │    Teams     │ │   Colleges   │
└──────────────┘ └──────────────┘ └──────────────┘
```

---

## Registration Management

Admins should be able to:

- View registrations
- Search
- Filter
- Sort
- View registration details
- Change registration status
- Verify participants
- View team information
- Export registration data

CSV export should be supported.

---

## Participant Management

Admins should be able to:

- Search participants
- View participant profiles
- View associated teams
- View registration status
- Filter by college
- Filter by status

---

## Team Management

Admins should be able to:

- View teams
- View team members
- Search teams
- Filter teams
- Inspect team registration status

---

# 13. Admin Security

Never implement admin security like:

```typescript
if (email === "admin@example.com") {
  showAdmin();
}
```

This is not sufficient.

Use:

```text
Authentication
      ↓
Authenticated User
      ↓
Server-side Role Verification
      ↓
ADMIN?
   /      \
 YES       NO
 ↓         ↓
Admin    Reject
Portal
```

Authorization must be enforced on the server and database layer.

Use Supabase Row Level Security where applicable.

Never rely on hiding buttons or routes on the client as the only security mechanism.

---

# 14. Database Schema

Use PostgreSQL.

Initial conceptual schema:

```text
users
─────
id
name
email
phone
role
created_at
updated_at
```

```text
teams
─────
id
name
leader_id
created_at
updated_at
```

```text
team_members
────────────
id
team_id
user_id
joined_at
```

```text
registrations
─────────────
id
team_id
status
registered_at
updated_at
```

```text
hackathons
──────────
id
name
description
start_date
end_date
registration_open
created_at
updated_at
```

```text
submissions
───────────
id
team_id
github_url
demo_url
description
submitted_at
updated_at
```

Additional tables may be introduced when requirements are finalized.

---

# 15. Database Design Principles

Follow these rules:

1. Use UUID primary keys where appropriate.
2. Add timestamps to important entities.
3. Use foreign keys.
4. Add indexes for frequently queried fields.
5. Enforce uniqueness where required.
6. Use PostgreSQL constraints.
7. Use Row Level Security.
8. Never trust client-provided authorization information.
9. Validate input on the server.
10. Never expose service-role credentials to the browser.

---

# 16. Environment Variables

Create:

```text
.env.local
```

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

SUPABASE_SERVICE_ROLE_KEY=

RESEND_API_KEY=

NEXT_PUBLIC_SITE_URL=
```

Never commit `.env.local`.

Add it to:

```text
.gitignore
```

---

# 17. Project Structure

Recommended structure:

```text
nexora/
│
├── app/
│   │
│   ├── page.tsx
│   │
│   ├── rules/
│   │   └── page.tsx
│   │
│   ├── info/
│   │   └── page.tsx
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── contact/
│   │   └── page.tsx
│   │
│   ├── login/
│   │   └── page.tsx
│   │
│   ├── register/
│   │   └── page.tsx
│   │
│   ├── dashboard/
│   │   ├── page.tsx
│   │   ├── profile/
│   │   ├── team/
│   │   └── registration/
│   │
│   ├── admin/
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── registrations/
│   │   ├── participants/
│   │   ├── teams/
│   │   ├── announcements/
│   │   └── settings/
│   │
│   └── api/
│
├── components/
│   ├── ui/
│   ├── navbar/
│   ├── footer/
│   ├── hero/
│   ├── registration/
│   ├── dashboard/
│   └── admin/
│
├── lib/
│   ├── supabase/
│   ├── auth/
│   ├── validations/
│   └── utils/
│
├── types/
│
├── public/
│   ├── images/
│   ├── logos/
│   └── fonts/
│
├── supabase/
│   ├── migrations/
│   └── seed.sql
│
├── middleware.ts
│
├── package.json
├── tsconfig.json
├── next.config.ts
├── components.json
├── .env.local
├── .gitignore
└── README.md
```

---

# 18. UI / Design System

The NEXORA interface should be:

- Minimal
- Spacious
- Typography-focused
- High contrast
- Responsive
- Professional
- Fast
- Consistent

Do not use excessive:

- Gradients
- Glassmorphism
- Glow effects
- Decorative shapes
- Huge amounts of animation
- Random card layouts
- Generic template sections

Every visual element should have a purpose.

---

# 19. Typography

Typography should establish the NEXORA identity.

Use a modern sans-serif typeface.

Possible choices:

- Geist
- Inter
- Manrope
- Plus Jakarta Sans

Choose one primary typeface and use it consistently.

Use a clear type hierarchy:

```text
Display
Heading
Subheading
Body
Caption
Label
```

---

# 20. Color System

Start with a restrained palette.

Define semantic tokens rather than hardcoding colors everywhere.

Example conceptual system:

```text
background
foreground
muted
muted-foreground
primary
primary-foreground
secondary
secondary-foreground
border
success
warning
error
```

The final NEXORA color palette should be established during the design phase.

PAYTM branding should be used carefully and only according to the applicable partnership/brand guidelines.

NEXORA should remain the primary visual identity.

---

# 21. Component Strategy

Create reusable components.

Examples:

```text
Navbar
Footer
Button
Container
Section
Heading
Card
Badge
Input
Select
Dialog
Toast
FormField
LoadingState
EmptyState
ErrorState
```

Application-specific components:

```text
Hero
Countdown
RegistrationForm
TeamCard
ParticipantCard
RegistrationStatus
AdminStatCard
AdminTable
```

Avoid creating large monolithic components.

---

# 22. Forms

Use:

```text
React Hook Form
        +
Zod
```

Architecture:

```text
User Input
    ↓
React Hook Form
    ↓
Zod Validation
    ↓
Server Action / Route Handler
    ↓
Authorization
    ↓
Database
```

Always validate on the server even if client-side validation exists.

---

# 23. Error Handling

Implement proper states for:

```text
Loading
Success
Empty
Error
Unauthorized
Forbidden
Not Found
Network Failure
Validation Failure
```

Never leave users with silent failures.

---

# 24. Responsive Design

The website must work properly on:

```text
Mobile
Tablet
Laptop
Desktop
Large Desktop
```

Mobile should not be treated as an afterthought.

The registration flow in particular must be fully usable on mobile devices.

---

# 25. Accessibility

Follow WCAG principles.

Requirements:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Proper labels
- Sufficient contrast
- Alt text for meaningful images
- Accessible form errors
- Accessible dialogs
- Screen-reader-friendly navigation

Do not sacrifice accessibility for visual effects.

---

# 26. SEO

Configure:

- Page titles
- Meta descriptions
- Open Graph metadata
- Twitter/X metadata
- Sitemap
- Robots configuration
- Canonical URLs
- Structured metadata where useful

Landing page should be optimized for search engines and social sharing.

---

# 27. Performance

Prioritize:

- Server Components where appropriate
- Optimized images
- Next.js Image
- Lazy loading
- Minimal JavaScript
- Font optimization
- Code splitting
- Avoiding unnecessary client components

Do not turn the entire application into a Client Component.

---

# 28. Animation Strategy

Animations should be intentional.

Default state:

```text
Minimal animation
```

When animation requirements are explicitly provided, use:

```text
Motion
```

Potential animation areas:

```text
Hero entrance
Page transitions
Scroll reveals
Navigation interactions
Button interactions
Cards
Registration progress
Success states
Dashboard transitions
```

Use advanced animation technologies only when necessary.

Possible future tools:

```text
GSAP
React Three Fiber
Three.js
```

Do not add them unless a specific visual requirement justifies them.

---

# 29. Authentication Flow

```text
User
 │
 ▼
Login
 │
 ▼
Supabase Auth
 │
 ├── Invalid
 │      ↓
 │    Error
 │
 └── Valid
        ↓
   Session Created
        ↓
   Role Verification
        │
      ┌─┴────────┐
      │          │
    USER       ADMIN
      │          │
      ▼          ▼
 Dashboard    Admin Portal
```

---

# 30. Route Protection

Protect authenticated routes.

Example conceptual routing:

```text
/public
   ↓
Anyone

/dashboard/*
   ↓
Authenticated USER

/admin/*
   ↓
Authenticated ADMIN
```

Unauthorized access should return a proper redirect or forbidden response.

Do not expose protected data to the client before authorization.

---

# 31. File Storage Security

If file uploads are required:

```text
Browser
   ↓
Authenticated Request
   ↓
Validation
   ↓
Supabase Storage
```

Validate:

- File type
- File size
- User authorization
- Storage path

Do not allow unrestricted public uploads.

---

# 32. Email Architecture

Example:

```text
Registration completed
        ↓
Server
        ↓
Resend
        ↓
Participant email
```

Potential emails:

```text
Welcome
Registration Confirmation
Team Invitation
Password Reset
Registration Status Update
Announcement
```

---

# 33. Analytics

Track useful events such as:

```text
page_view
registration_started
account_created
registration_completed
team_created
team_joined
```

Avoid collecting unnecessary personal data.

Useful funnel:

```text
Visitors
   ↓
Landing
   ↓
Register CTA
   ↓
Account Created
   ↓
Registration Started
   ↓
Registration Completed
```

---

# 34. Git Workflow

Use feature branches.

Example:

```text
main
│
├── develop
│
├── feature/landing-page
├── feature/authentication
├── feature/registration
├── feature/admin-dashboard
└── feature/email-system
```

Commit messages should be meaningful.

Examples:

```text
feat: add registration flow
feat: add admin dashboard
fix: protect admin routes
refactor: extract registration form components
style: improve mobile navigation
```

---

# 35. Development Phases

## Phase 1 — Project Initialization

Tasks:

- Create Next.js project
- Configure TypeScript
- Configure Tailwind
- Configure shadcn/ui
- Configure ESLint
- Configure Prettier if desired
- Initialize Git
- Create base folder structure
- Create environment variable template

---

## Phase 2 — Design System

Tasks:

- Define typography
- Define color tokens
- Define spacing
- Define container widths
- Define buttons
- Define inputs
- Define cards
- Define navigation
- Define footer
- Define responsive breakpoints

Do not build all pages before the design system is stable.

---

## Phase 3 — Public Website

Build:

```text
Landing
Rules
Info
About
Contact
```

Focus on:

- Layout
- Typography
- Content hierarchy
- Responsive behavior
- Navigation
- Footer

Do not add complex animation yet.

---

## Phase 4 — Supabase

Tasks:

- Create Supabase project
- Create PostgreSQL schema
- Configure Auth
- Configure Storage
- Configure RLS
- Create migrations
- Create seed data where useful

---

## Phase 5 — Authentication

Build:

```text
/login
/register
/admin/login
```

Implement:

- Login
- Registration
- Logout
- Password reset
- Session handling
- Role management
- Protected routes

---

## Phase 6 — User Dashboard

Build:

```text
/dashboard
/dashboard/profile
/dashboard/team
/dashboard/registration
```

---

## Phase 7 — Registration

Implement:

```text
Account
 ↓
Personal Details
 ↓
College Details
 ↓
Team
 ↓
Confirmation
```

Add validation and server-side authorization.

---

## Phase 8 — Admin Dashboard

Build:

```text
/admin/dashboard
/admin/registrations
/admin/participants
/admin/teams
/admin/announcements
/admin/settings
```

Implement:

- Search
- Filtering
- Sorting
- Status management
- Registration inspection
- CSV export

---

## Phase 9 — Email

Integrate Resend.

Implement required transactional emails.

---

## Phase 10 — Analytics

Add:

- Vercel Analytics
- Optional PostHog

Track only meaningful events.

---

## Phase 11 — Animation

Only now implement the requested animations.

Use Motion as the default animation library.

---

## Phase 12 — Production Hardening

Check:

```text
Security
Performance
SEO
Accessibility
Responsive Design
Error Handling
Database Policies
Authentication
Authorization
Rate Limiting
File Upload Security
Environment Variables
```

---

# 36. CLI Initialization

Create the application with:

```bash
npx create-next-app@latest nexora
```

Recommended selections:

```text
TypeScript: Yes
ESLint: Yes
Tailwind CSS: Yes
src/: Yes
App Router: Yes
Turbopack: Yes
Import alias: Yes
```

Then:

```bash
cd nexora
```

Initialize Git:

```bash
git init
git add .
git commit -m "chore: initialize NEXORA"
```

---

# 37. Install Core Dependencies

Install:

```bash
npm install motion @supabase/ssr @supabase/supabase-js react-hook-form zod @hookform/resolvers
```

Install Resend when email functionality is implemented:

```bash
npm install resend
```

Initialize shadcn/ui:

```bash
npx shadcn@latest init
```

Add components only when required.

Example:

```bash
npx shadcn@latest add button
npx shadcn@latest add input
npx shadcn@latest add form
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add table
npx shadcn@latest add toast
```

Do not install every component unnecessarily.

---

# 38. Supabase Setup

Create a Supabase project.

Configure:

```text
Database
Authentication
Storage
Row Level Security
```

Add environment variables:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

The service-role key must remain server-only.

---

# 39. Local Development

Run:

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

Production build test:

```bash
npm run build
npm run start
```

---

# 40. Quality Checklist

Before production deployment:

## UI

- [ ] Consistent typography
- [ ] Consistent spacing
- [ ] Responsive layout
- [ ] Mobile navigation
- [ ] Accessible forms
- [ ] Loading states
- [ ] Empty states
- [ ] Error states

## Authentication

- [ ] Login works
- [ ] Registration works
- [ ] Logout works
- [ ] Password reset works
- [ ] Protected routes work
- [ ] Admin routes are protected

## Database

- [ ] Foreign keys configured
- [ ] Constraints configured
- [ ] Indexes configured
- [ ] RLS enabled
- [ ] Policies tested

## Security

- [ ] No service-role key in client code
- [ ] Server-side authorization
- [ ] Input validation
- [ ] File upload validation
- [ ] Rate limiting where appropriate
- [ ] No sensitive data exposed in logs

## Performance

- [ ] Images optimized
- [ ] Fonts optimized
- [ ] Unnecessary client components removed
- [ ] Bundle checked
- [ ] Lighthouse checked

## SEO

- [ ] Metadata
- [ ] Sitemap
- [ ] Robots
- [ ] Open Graph
- [ ] Canonical URLs

## Deployment

- [ ] Environment variables configured
- [ ] Supabase production project configured
- [ ] Database migrations applied
- [ ] Vercel deployment tested
- [ ] Production authentication tested

---

# 41. Final Technology Architecture

```text
                         NEXORA
                           │
                           ▼
                    ┌─────────────┐
                    │   Next.js   │
                    │ TypeScript  │
                    └──────┬──────┘
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
          React        Tailwind       Motion
             │             │
             └──────┬──────┘
                    ▼
                shadcn/ui
                    │
                    ▼
              Server Actions
             / Route Handlers
                    │
                    ▼
                Supabase
             ┌──────┼──────┐
             │      │      │
             ▼      ▼      ▼
        PostgreSQL  Auth  Storage
             │
             ▼
        Row Level Security

                    │
                    ▼
                 Resend
                 Emails

                    │
                    ▼
             Vercel Analytics
              / PostHog

                    │
                    ▼
                  Vercel
               Production
```

---

# 42. Non-Functional Requirements

NEXORA should aim for:

### Performance

Fast initial load and minimal client-side JavaScript.

### Security

Authentication and authorization must be enforced server-side.

### Scalability

The architecture should support a significant increase in registrations without requiring a complete rewrite.

### Maintainability

Use reusable components, typed interfaces, validation schemas, and clear separation of concerns.

### Accessibility

Public and authenticated interfaces should be keyboard accessible and screen-reader friendly.

### Reliability

Critical registration operations should be transactional and idempotent where appropriate.

---

# 43. Development Principle

Do not build the entire application in one giant step.

Use this sequence:

```text
DESIGN
  ↓
DESIGN SYSTEM
  ↓
PUBLIC WEBSITE
  ↓
DATABASE
  ↓
AUTHENTICATION
  ↓
REGISTRATION
  ↓
USER DASHBOARD
  ↓
ADMIN DASHBOARD
  ↓
EMAIL
  ↓
ANALYTICS
  ↓
ANIMATION
  ↓
SECURITY
  ↓
PERFORMANCE
  ↓
DEPLOYMENT
```

At every stage:

1. Implement
2. Run locally
3. Test
4. Fix
5. Commit
6. Continue

---

# 44. AI-Assisted Development Rules

When using AI coding tools to build NEXORA:

- Do not ask the AI to generate the entire application in one prompt.
- Build feature-by-feature.
- Keep the database schema explicit.
- Keep authentication requirements explicit.
- Review every database policy.
- Review every server-side authorization check.
- Test registration flows manually.
- Never paste production secrets into prompts.
- Run the application continuously during development.
- Commit working milestones to Git.

Recommended workflow:

```text
AI
 ↓
Generate small feature
 ↓
Run application
 ↓
Inspect result
 ↓
Test feature
 ↓
Fix issues
 ↓
Commit
 ↓
Next feature
```

---

# 45. Definition of Done

NEXORA is considered production-ready when:

```text
✓ Public website complete
✓ Responsive design complete
✓ User authentication complete
✓ User registration complete
✓ Team management complete
✓ Registration workflow complete
✓ User dashboard complete
✓ Admin authentication complete
✓ Admin dashboard complete
✓ Participant management complete
✓ Team management complete
✓ Registration management complete
✓ Database security complete
✓ RLS policies tested
✓ Email system complete
✓ Analytics configured
✓ SEO configured
✓ Accessibility reviewed
✓ Performance reviewed
✓ Production environment tested
✓ Deployment complete
```

---

# 46. Final Stack

```text
Frontend:
Next.js
React
TypeScript
Tailwind CSS
shadcn/ui
Motion

Backend:
Next.js Server Actions
Next.js Route Handlers

Database:
PostgreSQL
Supabase

Authentication:
Supabase Auth

Validation:
Zod
React Hook Form

Storage:
Supabase Storage

Email:
Resend

Analytics:
Vercel Analytics
PostHog (optional)

Version Control:
Git
GitHub

Deployment:
Vercel
Supabase
```

---

## NEXORA

**Code. Create. Conquer.**

A modern hackathon platform built for the next generation of builders.
