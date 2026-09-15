import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getSupabaseServerClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      teamName,
      domain,
      leadName,
      leadEmail,
      leadPhone,
      leadRoll,
      leadBranch,
      leadYear,
      members = [],
    } = body;

    // Validation
    if (!teamName || typeof teamName !== "string" || !teamName.trim()) {
      return NextResponse.json(
        { success: false, error: "Team name is required." },
        { status: 400 }
      );
    }

    if (!leadName || typeof leadName !== "string" || !leadName.trim()) {
      return NextResponse.json(
        { success: false, error: "Leader full name is required." },
        { status: 400 }
      );
    }

    if (!leadEmail || typeof leadEmail !== "string" || !leadEmail.trim()) {
      return NextResponse.json(
        { success: false, error: "Leader email address is required." },
        { status: 400 }
      );
    }

    if (!leadRoll || typeof leadRoll !== "string" || !leadRoll.trim()) {
      return NextResponse.json(
        { success: false, error: "Leader roll / college ID number is required." },
        { status: 400 }
      );
    }

    if (!domain || typeof domain !== "string" || !domain.trim()) {
      return NextResponse.json(
        { success: false, error: "Challenge domain selection is required." },
        { status: 400 }
      );
    }

    const supabase = getSupabaseServerClient();
    if (!supabase) {
      return NextResponse.json(
        {
          success: false,
          error: "Database configuration is missing or invalid on the server.",
        },
        { status: 500 }
      );
    }

    // Generate unique team code with collision avoidance
    let teamCode = "";
    let isUnique = false;
    let attempts = 0;

    while (!isUnique && attempts < 5) {
      attempts++;
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const candidateCode = `NX-2026-${randomNum}`;

      const { data: existing } = await supabase
        .from("teams")
        .select("code")
        .eq("code", candidateCode)
        .maybeSingle();

      if (!existing) {
        teamCode = candidateCode;
        isUnique = true;
      }
    }

    if (!teamCode) {
      teamCode = `NX-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    const cleanedMembers = Array.isArray(members)
      ? members.filter(
          (m: any) =>
            m && typeof m.name === "string" && m.name.trim().length > 0
        )
      : [];

    const recordPayload: Record<string, any> = {
      code: teamCode,
      name: teamName.trim(),
      track: domain.trim(), // Stored in track column in public.teams
      leader_name: leadName.trim(),
      leader_email: leadEmail.trim().toLowerCase(),
      leader_phone: leadPhone ? leadPhone.trim() : null,
      leader_roll: leadRoll.trim(),
      leader_branch: leadBranch || "Computer Science & Engineering",
      leader_year: leadYear || "3rd Year / E3",
      members: cleanedMembers,
      status: "CONFIRMED",
    };

    const { data, error } = await supabase
      .from("teams")
      .insert([recordPayload])
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error in /api/register:", error);
      return NextResponse.json(
        {
          success: false,
          error: error.message || "Failed to persist registration in database.",
          details: error.details,
          code: error.code,
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Registration successfully recorded in database.",
        code: teamCode,
        team: data,
      },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Exception in /api/register handler:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "An unexpected error occurred while processing registration.",
      },
      { status: 500 }
    );
  }
}

