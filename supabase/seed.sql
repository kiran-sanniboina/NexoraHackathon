-- ==============================================================================
-- NEXORA 2026 HACKATHON PLATFORM - SAMPLE SEED DATA
-- ==============================================================================
-- Run this in your Supabase SQL Editor AFTER running 20260912_init.sql
-- ==============================================================================

-- 1. Sample Teams
INSERT INTO public.teams (
  code,
  name,
  track,
  leader_name,
  leader_email,
  leader_phone,
  leader_roll,
  leader_branch,
  leader_year,
  members,
  status,
  project_title,
  project_description,
  github_url,
  demo_url,
  presentation_url,
  submission_status
)
VALUES
(
  'NX-2026-4821',
  'Apex Cybernetica',
  'AI & Intelligent Systems',
  'Kiran S.',
  'builder@rguktsklm.ac.in',
  '+91 93925 67773',
  'S200142',
  'Computer Science & Engineering',
  '3rd Year / E3',
  '[
    {"name": "Sai Teja", "rollNo": "S200188", "branch": "Computer Science & Engineering", "year": "3rd Year", "email": "saiteja@rguktsklm.ac.in"},
    {"name": "Pravallika N.", "rollNo": "S200210", "branch": "Electronics & Communication", "year": "3rd Year", "email": "pravallika@rguktsklm.ac.in"}
  ]'::jsonb,
  'CHECKED-IN',
  'AuraScan: Real-time Edge Diagnostic Vision System',
  'An on-device multimodal computer vision pipeline designed for low-latency triage screening in rural clinics without continuous internet connectivity.',
  'https://github.com/nexora-builders/aurascan',
  'https://aurascan.preview.nexora.io',
  'https://pitch.nexora.io/aurascan-deck.pdf',
  'SUBMITTED'
),
(
  'NX-2026-5519',
  'SentinelGuard',
  'Cloud Infrastructure, DevOps & Cyber Defense',
  'Farhan Ali',
  'farhan.ali@rguktsklm.ac.in',
  '+91 94400 11223',
  'S200551',
  'Computer Science & Engineering',
  '3rd Year / E3',
  '[
    {"name": "Vinay C.", "rollNo": "S200555", "branch": "Computer Science & Engineering", "year": "3rd Year", "email": "vinay@rguktsklm.ac.in"},
    {"name": "Harshitha G.", "rollNo": "S200560", "branch": "Computer Science & Engineering", "year": "3rd Year", "email": "harshitha@rguktsklm.ac.in"}
  ]'::jsonb,
  'SHORTLISTED',
  'eBPF Zero-Day Kernel Defense Daemon',
  'Runtime security agent utilizing kernel eBPF probes to intercept anomalous syscall spikes and prevent container escape vulnerabilities.',
  'https://github.com/sentinel/ebpf-shield',
  'https://sentinelguard.io',
  'https://docs.google.com/presentation/d/sentinel',
  'SUBMITTED'
),
(
  'NX-2026-8834',
  'HyperGrid IoT',
  'IoT, Robotics & Smart Embedded Systems',
  'Sneha Reddy',
  'sneha.r@rguktsklm.ac.in',
  '+91 91234 56789',
  'S200405',
  'Electronics & Communication',
  '3rd Year / E3',
  '[
    {"name": "Manojkumar B.", "rollNo": "S200412", "branch": "Electronics & Communication", "year": "3rd Year", "email": "manoj@rguktsklm.ac.in"}
  ]'::jsonb,
  'CONFIRMED',
  'Autonomous Agro-drone Swarm Gateway',
  'Decentralized mesh telemetry protocol enabling multi-rotor drones to synchronize aerial crop health thermal scanning.',
  'https://github.com/hypergrid/agro',
  'https://hypergrid-iot.vercel.app',
  'https://pitch.nexora.io/hypergrid.pdf',
  'SUBMITTED'
),
(
  'NX-2026-1092',
  'QuantumLedger',
  'Web3, FinTech & Cryptographic Trust',
  'Anand Verma',
  'anand.v@rguktsklm.ac.in',
  '+91 98480 22334',
  'S200311',
  'Computer Science & Engineering',
  '3rd Year / E3',
  '[
    {"name": "Rohit K.", "rollNo": "S200315", "branch": "Computer Science & Engineering", "year": "3rd Year", "email": "rohit@rguktsklm.ac.in"},
    {"name": "Divya M.", "rollNo": "S200320", "branch": "Computer Science & Engineering", "year": "3rd Year", "email": "divya@rguktsklm.ac.in"}
  ]'::jsonb,
  'CONFIRMED',
  'Zero-Knowledge Micro-settlement Rail',
  'High-throughput zk-SNARK rollup infrastructure for batch settling cross-institution university credentials.',
  'https://github.com/quantum/settle',
  'https://quantumledger.io',
  'https://pitch.nexora.io/zk-settle.pdf',
  'PENDING'
)
ON CONFLICT (code) DO NOTHING;

-- 2. Sample Inquiries
INSERT INTO public.contact_messages (name, email, team_id, subject, message, status)
VALUES
(
  'Pooja Sharma',
  'pooja.s@gmail.com',
  NULL,
  'Hardware Access & Microcontroller Kits',
  'Can our team bring our own ESP32 boards and LiDAR sensors, or will specific kits be provided on-site at RGUKT Srikakulam?',
  'NEW'
),
(
  'Venkatesh Rao',
  'venkatesh.rao@rguktsklm.ac.in',
  'NX-2026-4821',
  'Roster Modification',
  'Requesting to verify our 3rd member registration due to academic schedule update.',
  'RESOLVED'
);

-- 3. Sample Announcements
INSERT INTO public.announcements (title, content, category, is_pinned)
VALUES
(
  'WiFi Network Credentials & Campus Power Outlets',
  'Connect your builder machines to SSID: Nexora-HighSpeed-5G. High-power extension strips are deployed at each bench row.',
  'General',
  true
),
(
  'Architecture Blueprint Submissions Window',
  'Round 1 evaluation desk closes promptly at 01:00 PM IST. Ensure your GitHub repo README includes system architecture diagrams.',
  'Round 1',
  false
),
(
  'Paytm Developer Sandbox & API Keys Live!',
  'Registered teams can now test mock payment flows and webhooks in the developer sandbox. Check your resource tab for credentials.',
  'Prizes',
  false
);

-- 4. Sample Jury Evaluations
INSERT INTO public.evaluations (team_code, judge_name, score_innovation, score_technical, score_design, score_impact, total_score, feedback)
VALUES
(
  'NX-2026-5519',
  'Prof. R. V. Sharma',
  23,
  25,
  21,
  24,
  93,
  'Exceptional low-level implementation with eBPF probes. The live terminal exploit mitigation demo was flawless.'
);
