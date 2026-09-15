-- ==============================================================================
-- NEXORA 2026 HACKATHON PLATFORM - ADD DOMAIN COLUMN (OPTIONAL COMPATIBILITY)
-- ==============================================================================
-- This script safely adds the explicit 'domain' column to public.teams if it
-- does not already exist, and populates it from the existing 'track' column.
-- ==============================================================================

ALTER TABLE public.teams ADD COLUMN IF NOT EXISTS domain TEXT;

-- Backfill domain from track for existing records
UPDATE public.teams
SET domain = track
WHERE domain IS NULL;

-- Create index on domain for fast querying
CREATE INDEX IF NOT EXISTS idx_teams_domain ON public.teams(domain);

