import { Announcement, FaqItem, RegistrationRecord, TimelineEvent, TrackInfo, UserProfile } from "./types";

export const EVENT_DETAILS = {
  name: "NEXORA",
  year: "2026",
  tagline: "Code. Create. Conquer.",
  subtitle: "The Premier National Technology Hackathon organized by Coding Club in strategic partnership with PAYTM.",
  dates: "March 27 – 29, 2026",
  targetKickoffDate: "2026-03-27T10:00:00+05:30",
  venue: "Nexora Technology Hub & Main Campus Auditorium",
  city: "Bengaluru, Karnataka",
  prizePool: "₹5,00,000+",
  expectedHackers: "600+",
  collegesExpected: "150+",
  durationHours: 36,
  registrationDeadline: "March 20, 2026",
  partnerName: "PAYTM",
  partnerTagline: "Official FinTech & Innovation Partner",
};

export const TRACKS: TrackInfo[] = [
  {
    id: "paytm-fintech",
    title: "FinTech & Digital Payments",
    sponsorBadge: "Title Track",
    sponsorName: "PAYTM",
    tagline: "Revolutionizing high-frequency payments, smart QR, and merchant ecosystems.",
    description:
      "Design next-generation financial architectures: zero-latency UPI reconciliation, voice-authenticated payments, intelligent micro-credit underwriting for small retailers, or fraud prevention neural models.",
    prizeAmount: "₹1,50,000",
    technologies: ["Next.js", "Paytm API", "WebSockets", "Rust", "PostgreSQL", "Kafka"],
    iconName: "CreditCard",
  },
  {
    id: "ai-agents",
    title: "AI & Autonomous Agents",
    tagline: "Building autonomous systems that solve multi-step real-world problems.",
    description:
      "Craft collaborative multi-agent ecosystems, automated developer workflows, intelligent knowledge synthesis engines, or self-correcting task agents utilizing modern LLM paradigms.",
    prizeAmount: "₹1,00,000",
    technologies: ["Python", "PyTorch", "LangChain", "Vector DBs", "FastAPI"],
    iconName: "Cpu",
  },
  {
    id: "web3-infra",
    title: "Web3 & Decentralized Protocols",
    tagline: "Trust-minimized infrastructure, cryptographic identity, and verifiable compute.",
    description:
      "Solve critical decentralized systems challenges: zero-knowledge verifiable credentials, gas-efficient state channels, decentralized file provenance, and programmable token economics.",
    prizeAmount: "₹85,000",
    technologies: ["Solidity", "ZK-SNARKs", "IPFS", "Ethereum", "Foundry"],
    iconName: "Shield",
  },
  {
    id: "healthtech",
    title: "HealthTech & Bio-Informatics",
    tagline: "Transformative medical triage, genomics insights, and patient privacy.",
    description:
      "Engineer assistive medical diagnostic tools, federated learning on sensitive clinical datasets, emergency response dispatch optimizers, or genomic sequence visualization tooling.",
    prizeAmount: "₹85,000",
    technologies: ["TensorFlow", "FHIR APIs", "React", "Node.js", "Docker"],
    iconName: "Activity",
  },
  {
    id: "open-innovation",
    title: "Open Innovation & Green Tech",
    tagline: "Clean energy optimization, civic intelligence, and planetary scale impact.",
    description:
      "Pioneer solutions for smart micro-grids, carbon footprint auditing for tech infrastructure, civic problem reporting, and accessible education technologies.",
    prizeAmount: "₹80,000",
    technologies: ["IoT", "Next.js", "GIS Mapping", "MQTT", "Python"],
    iconName: "Sparkles",
  },
];

export const TIMELINE: TimelineEvent[] = [
  {
    day: "Day 1 - March 27",
    time: "08:30 AM",
    title: "Check-in & Hacker Kit Distribution",
    description: "Badge collection, swags, breakfast, and designated workstation assignment.",
    stage: "Registration",
  },
  {
    day: "Day 1 - March 27",
    time: "10:00 AM",
    title: "Opening Keynote & Paytm Challenge Reveal",
    description: "Kickoff keynote from Paytm engineering leaders and Coding Club organizers.",
    stage: "Hackathon",
  },
  {
    day: "Day 1 - March 27",
    time: "11:30 AM",
    title: "Hacking Officially Begins",
    description: "36-hour timer starts. Repository initialization and team check-ins.",
    stage: "Hackathon",
  },
  {
    day: "Day 1 - March 27",
    time: "04:00 PM",
    title: "Paytm API & Architecture Masterclass",
    description: "Hands-on deep dive into production payment webhooks, idempotency, and scaling.",
    stage: "Mentoring",
  },
  {
    day: "Day 1 - March 27",
    time: "08:30 PM",
    title: "Mentorship Round 1: Architecture Check",
    description: "Industry mentors assess system designs, tech stacks, and scope feasibility.",
    stage: "Mentoring",
  },
  {
    day: "Day 2 - March 28",
    time: "12:00 AM",
    title: "Midnight Dev Sprint & Fuel Station",
    description: "Energy drinks, midnight pizza drop, and rapid mini-trivia games.",
    stage: "Hackathon",
  },
  {
    day: "Day 2 - March 28",
    time: "09:30 AM",
    title: "Mentorship Round 2: Prototype Validation",
    description: "Dry-run demo with mentors. Feedback on UI, edge cases, and pitch deck.",
    stage: "Mentoring",
  },
  {
    day: "Day 2 - March 28",
    time: "05:00 PM",
    title: "Code Freeze & Final Project Submission",
    description: "GitHub commits lock, demonstration video and documentation submission deadline.",
    stage: "Evaluation",
  },
  {
    day: "Day 2 - March 28",
    time: "06:30 PM",
    title: "Top 10 Finalist Live Pitch Arena",
    description: "Main auditorium pitch in front of the grand jury and Paytm tech leadership.",
    stage: "Evaluation",
  },
  {
    day: "Day 2 - March 28",
    time: "08:30 PM",
    title: "Grand Valedictory & Paytm Awards Ceremony",
    description: "Prize distribution, internship offers, and closing celebration.",
    stage: "Ceremony",
  },
];

export const FAQS: FaqItem[] = [
  {
    category: "Participation",
    question: "Who is eligible to participate in NEXORA 2026?",
    answer:
      "All currently enrolled undergraduate, postgraduate, and diploma students from any recognized university or college across India are eligible. Inter-college teams are welcome!",
  },
  {
    category: "Participation",
    question: "What is the team size requirement?",
    answer:
      "Teams must consist of 2 to 4 members. Solo participation is not permitted to encourage cross-functional collaboration. You can form your team during registration or invite members later using your unique Team Code.",
  },
  {
    category: "Logistics",
    question: "Is there any registration fee?",
    answer:
      "No! Participation in NEXORA 2026 is 100% free of cost, thanks to our partnership with Paytm and our sponsors. Food, snacks, high-speed Wi-Fi, and hacker kits are provided complimentary.",
  },
  {
    category: "Rules",
    question: "Can we use pre-existing code?",
    answer:
      "All code submitted for judging must be written during the hackathon. You may use open-source libraries, frameworks, APIs (including Paytm APIs), and publicly accessible design systems, provided they are attributed.",
  },
  {
    category: "Judging",
    question: "How will projects be judged?",
    answer:
      "Projects will be evaluated on Innovation (25%), Technical Complexity & Architecture (25%), Execution & UI/UX (25%), and Real-World Viability/Impact (25%).",
  },
  {
    category: "Partner",
    question: "What are the perks for the Paytm FinTech Track?",
    answer:
      "In addition to the ₹1,50,000 track prize pool, winning teams receive direct interview fast-tracks for summer/fall engineering internships and full-time SDE roles at Paytm.",
  },
];

export const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: "ann-1",
    title: "Paytm Developer Sandbox & API Keys Live!",
    content:
      "Registered teams can now test mock payment flows and webhooks in the developer sandbox. Check your dashboard resource tab for access credentials.",
    category: "Prizes",
    publishedAt: "2026-03-12T14:30:00Z",
    authorName: "Paytm DevRel Team",
    isPinned: true,
  },
  {
    id: "ann-2",
    title: "Registration Milestone: Over 450 Teams Onboarded",
    content:
      "Registrations are closing in 8 days! Ensure your team roster has between 2 and 4 verified participants to guarantee workstation allocation.",
    category: "General",
    publishedAt: "2026-03-11T10:00:00Z",
    authorName: "Coding Club Lead",
    isPinned: false,
  },
  {
    id: "ann-3",
    title: "High-Speed Hardware Lab & Device Policy",
    content:
      "Participants are advised to bring their own laptops and chargers. Dedicated hardware test-benches (microcontrollers, RFID, NFC readers) will be available in Lab 3.",
    category: "Schedule",
    publishedAt: "2026-03-10T16:00:00Z",
    authorName: "Logistics Team",
    isPinned: false,
  },
];

export const INITIAL_REGISTRATIONS: RegistrationRecord[] = [
  {
    id: "reg-101",
    teamId: "team-01",
    teamName: "PaytmPulse Ops",
    leaderName: "Aarav Sharma",
    leaderEmail: "aarav.sharma@rvce.edu.in",
    college: "RV College of Engineering, Bengaluru",
    track: "FinTech & Digital Payments",
    memberCount: 4,
    status: "VERIFIED",
    projectTitle: "Offline QR SoundSync",
    projectDescription: "A cryptographic acoustic handshake for offline POS verification.",
    submittedAt: "2026-03-09T11:20:00Z",
    updatedAt: "2026-03-10T09:15:00Z",
    githubUrl: "https://github.com/nexora-demo/sound-sync",
  },
  {
    id: "reg-102",
    teamId: "team-02",
    teamName: "NeuralSentinels",
    leaderName: "Pooja Hegde",
    leaderEmail: "pooja.h@pes.edu",
    college: "PES University, Bengaluru",
    track: "AI & Autonomous Agents",
    memberCount: 3,
    status: "PENDING",
    projectTitle: "OmniAgent Triage",
    projectDescription: "Autonomous medical triage reasoning using localized slm models.",
    submittedAt: "2026-03-10T14:40:00Z",
    updatedAt: "2026-03-10T14:40:00Z",
    githubUrl: "https://github.com/nexora-demo/omni-agent",
  },
  {
    id: "reg-103",
    teamId: "team-03",
    teamName: "ZeroKnowledge Titans",
    leaderName: "Rohan Varma",
    leaderEmail: "rohan@iiitb.ac.in",
    college: "IIIT Bangalore",
    track: "Web3 & Decentralized Protocols",
    memberCount: 4,
    status: "VERIFIED",
    projectTitle: "ZkPay Anonymous Payroll",
    projectDescription: "Verifiable salary disbursement without leaking employee identity.",
    submittedAt: "2026-03-08T18:00:00Z",
    updatedAt: "2026-03-09T14:20:00Z",
    githubUrl: "https://github.com/nexora-demo/zk-pay",
  },
  {
    id: "reg-104",
    teamId: "team-04",
    teamName: "BioNexus AI",
    leaderName: "Sneha Mukherjee",
    leaderEmail: "sneha.m@bmsce.ac.in",
    college: "BMS College of Engineering",
    track: "HealthTech & Bio-Informatics",
    memberCount: 2,
    status: "PENDING",
    projectTitle: "CardioEarly Predictor",
    projectDescription: "Realtime ECG signal anomaly detection on low-power IoT microchips.",
    submittedAt: "2026-03-11T12:00:00Z",
    updatedAt: "2026-03-11T12:00:00Z",
  },
  {
    id: "reg-105",
    teamId: "team-05",
    teamName: "GridOptimizers",
    leaderName: "Vikram Nair",
    leaderEmail: "vikram.nair@msrit.edu",
    college: "M.S. Ramaiah Institute of Technology",
    track: "Open Innovation & Green Tech",
    memberCount: 3,
    status: "REJECTED",
    projectTitle: "Solar Peer Microgrid",
    projectDescription: "Decentralized energy trading protocol for university campuses.",
    submittedAt: "2026-03-07T09:10:00Z",
    updatedAt: "2026-03-08T16:30:00Z",
    notes: "Duplicate team registration or missing college ID verification.",
  },
];

export const DEMO_USERS: Record<string, UserProfile> = {
  participant: {
    id: "user-demo-participant",
    email: "hacker@nexora.dev",
    fullName: "Kiran Sanniboina",
    phone: "+91 98765 43210",
    college: "Indian Institute of Information Technology",
    branch: "Computer Science & Engineering",
    gradYear: "2026",
    skills: ["Next.js", "TypeScript", "Python", "Tailwind CSS", "PostgreSQL"],
    githubUrl: "https://github.com/kiran-sanniboina",
    linkedinUrl: "https://linkedin.com/in/kiransanniboina",
    role: "user",
    teamId: "team-01",
    createdAt: "2026-03-01T10:00:00Z",
    avatarUrl: "",
  },
  admin: {
    id: "user-demo-admin",
    email: "admin@nexora.dev",
    fullName: "Nexora Administrator",
    phone: "+91 99999 88888",
    college: "Coding Club Faculty & Dev Committee",
    branch: "Faculty Lead",
    gradYear: "Staff",
    skills: ["System Architecture", "Hackathon Operations", "Security"],
    role: "admin",
    createdAt: "2026-01-01T00:00:00Z",
  },
};

