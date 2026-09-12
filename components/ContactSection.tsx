"use client";

import React, { useState } from "react";
import Link from "next/link";
import { NexoraLogo } from "@/components/NexoraLogo";
import {
  Mail,
  Phone,
  Instagram,
  Linkedin,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  Check,
  ArrowUpRight,
  ArrowUp,
  Clock,
  Sparkles,
  Loader2,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface ContactSectionProps {
  isStandalone?: boolean;
}

export function ContactSection({ isStandalone = false }: ContactSectionProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    teamId: "",
    subject: "General Inquiry",
    message: "",
  });

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = createClient();
      if (supabase) {
        await supabase.from("contact_messages").insert([
          {
            name: formData.name.trim(),
            email: formData.email.trim().toLowerCase(),
            team_id: formData.teamId.trim() || null,
            subject: formData.subject,
            message: formData.message.trim(),
          },
        ]);
      }
    } catch (err) {
      console.warn("Contact form dispatch notice:", err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({
          name: "",
          email: "",
          teamId: "",
          subject: "General Inquiry",
          message: "",
        });
      }, 4000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const phoneNumbers = [
    { number: "9392567773", label: "Lead Coordinator", display: "+91 93925 67773" },
    { number: "6281432036", label: "Technical Desk", display: "+91 62814 32036" },
    { number: "6300713305", label: "Logistics & Venue", display: "+91 63007 13305" },
  ];

  return (
    <footer
      id="contact"
      className="relative pt-20 sm:pt-28 pb-12 px-4 sm:px-6 max-w-7xl mx-auto w-full overflow-hidden border-t border-border-subtle"
    >
      {/* Subtle Ambient Background Light */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
        <div className="w-[500px] h-[350px] bg-primary/[0.03] rounded-full blur-[160px] opacity-70" />
      </div>

      {/* Main Two-Column Minimalist Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 sm:mb-24">
        
        {/* Left Column: Editorial Information & Direct Channels */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Live Status Indicator */}
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-[10px] font-caps tracking-[0.1em] text-emerald-400 font-semibold mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Support Desk Live • 09:00 AM – 09:00 PM IST</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-caps tracking-[0.02em] text-foreground leading-tight">
              Get In Touch
            </h2>

            <p className="text-xs sm:text-sm font-caps tracking-[0.04em] text-muted-foreground leading-relaxed mt-3 max-w-md">
              Have questions regarding challenge tracks, team roster verification, hardware access, or event logistics? Reach out directly to our student coordination team.
            </p>
          </div>

          {/* Minimalist Hairline Separated Channels List */}
          <div className="divide-y divide-border-subtle/70 border-y border-border-subtle/70 pt-1">
            
            {/* 1. Official Email */}
            <div className="py-4 space-y-1.5">
              <span className="text-[10px] font-caps tracking-[0.1em] text-muted-foreground uppercase block">
                Official Email
              </span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href="mailto:coding_club@rguktsklm.ac.in"
                  className="text-xs sm:text-sm font-caps font-bold text-foreground hover:text-primary transition-colors truncate"
                >
                  coding_club@rguktsklm.ac.in
                </a>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => copyToClipboard("coding_club@rguktsklm.ac.in", "email")}
                    className="p-1.5 rounded hover:bg-surface/80 text-muted-foreground hover:text-foreground transition-colors"
                    title="Copy email address"
                  >
                    {copiedItem === "email" ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <a
                    href="mailto:coding_club@rguktsklm.ac.in"
                    className="p-1.5 rounded hover:bg-surface/80 text-muted-foreground hover:text-primary transition-colors"
                    title="Send email"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* 2. Direct Helplines */}
            <div className="py-4 space-y-2">
              <span className="text-[10px] font-caps tracking-[0.1em] text-muted-foreground uppercase block">
                Direct Helplines
              </span>
              <div className="space-y-2">
                {phoneNumbers.map((phone, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-foreground">
                        {phone.display}
                      </span>
                      <span className="text-[10px] font-caps text-muted-foreground">
                        — {phone.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={"tel:" + phone.number}
                        className="px-2 py-0.5 rounded text-[10px] font-caps font-semibold text-primary hover:bg-primary/10 transition-colors"
                      >
                        Call
                      </a>
                      <button
                        onClick={() => copyToClipboard(phone.number, phone.number)}
                        className="p-1 rounded text-muted-foreground hover:text-foreground transition-colors"
                        title="Copy number"
                      >
                        {copiedItem === phone.number ? (
                          <Check className="w-3 h-3 text-emerald-400" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Social Channels */}
            <div className="py-4 space-y-2">
              <span className="text-[10px] font-caps tracking-[0.1em] text-muted-foreground uppercase block">
                Official Channels
              </span>
              <div className="flex flex-wrap items-center gap-4 text-xs font-caps">
                <a
                  href="https://www.instagram.com/coding_club_sklm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-[#E1306C] transition-colors group"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#E1306C]" />
                  <span>@coding_club_sklm</span>
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-[#E1306C] transition-colors" />
                </a>

                <span className="text-border-subtle">•</span>

                <a
                  href="https://www.linkedin.com/company/coding-club-rgukt-sklm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-[#0A66C2] transition-colors group"
                >
                  <Linkedin className="w-3.5 h-3.5 text-[#0A66C2]" />
                  <span>Coding Club RGUKT SKLM</span>
                  <ArrowUpRight className="w-3 h-3 text-muted-foreground group-hover:text-[#0A66C2] transition-colors" />
                </a>
              </div>
            </div>

            {/* 4. Physical Campus Venue */}
            <div className="py-4 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-caps tracking-[0.1em] text-muted-foreground uppercase">
                  Physical Hackathon Arena
                </span>
                <a
                  href="https://maps.google.com/?q=RGUKT+Srikakulam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[10px] font-caps font-semibold text-primary hover:underline"
                >
                  <span>Google Maps</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <div className="text-xs font-caps font-bold text-foreground">
                RGUKT Srikakulam Campus
              </div>
              <p className="text-[11px] font-caps text-muted-foreground leading-relaxed">
                Central Computer Center • S.M. Puram (V), Etcherla (M), Srikakulam District, Andhra Pradesh — 532410
              </p>
            </div>

          </div>
        </div>

        {/* Right Column: Sleek Product-Style Inquiry Dispatch Form */}
        <div className="lg:col-span-7">
          <div className="rounded-xl border border-border-subtle bg-surface/30 backdrop-blur-sm p-6 sm:p-8">
            
            <div className="space-y-1 mb-6">
              <div className="inline-flex items-center gap-1.5 text-[10px] font-caps tracking-[0.1em] text-primary uppercase font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Direct Dispatch Portal</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-caps text-foreground">
                Send A Message
              </h3>
              <p className="text-xs font-caps text-muted-foreground">
                Submit an inquiry and the secretariat desk will respond to your email.
              </p>
            </div>

            {formSubmitted ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold font-caps text-foreground">
                  Inquiry Transmitted Successfully
                </h4>
                <p className="text-xs font-caps text-muted-foreground max-w-sm leading-relaxed">
                  Thank you for reaching out. The Coding Club coordination team will review your query and respond shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-left">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                      Your Name / Team Lead
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Chen"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="builder@example.com"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                      Team ID (If Registered)
                    </label>
                    <input
                      type="text"
                      value={formData.teamId}
                      onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
                      placeholder="NX-2026-042 (Optional)"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-mono font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps transition-all"
                    >
                      <option value="General Inquiry" className="bg-[#141417] text-white">General Inquiry</option>
                      <option value="Registration & Roster" className="bg-[#141417] text-white">Registration & Roster</option>
                      <option value="Domain Tracks & Problem Specs" className="bg-[#141417] text-white">Domain Tracks & Problem Specs</option>
                      <option value="Hardware & Travel Logistics" className="bg-[#141417] text-white">Hardware & Travel Logistics</option>
                      <option value="Paytm Sponsorship & Bounties" className="bg-[#141417] text-white">Paytm Sponsorship & Bounties</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-caps tracking-wider text-zinc-300 uppercase font-semibold block">
                    Message Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry or request..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#141417] border border-white/20 text-xs sm:text-sm text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/40 font-caps resize-none transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 px-4 rounded-lg bg-foreground text-background font-caps font-bold text-xs tracking-wider flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting To Supabase...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

      {/* Minimalist Site Footer Strip */}
      <div className="pt-8 border-t border-border-subtle/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <NexoraLogo size={18} variant="prism" showWordmark />
          <span className="text-[10px] font-caps text-muted-foreground ml-2">
            • Coding Club RGUKT SKLM • Official Paytm Partner
          </span>
        </div>

        <div className="flex items-center gap-4 text-[10px] font-caps text-muted-foreground">
          <a href="#overview" className="hover:text-foreground transition-colors">Overview</a>
          <a href="#tracks" className="hover:text-foreground transition-colors">Tracks</a>
          <a href="#timeline" className="hover:text-foreground transition-colors">Timeline</a>
          <a href="#rules" className="hover:text-foreground transition-colors">Rules</a>
          <button
            onClick={scrollToTop}
            className="p-1.5 rounded-full border border-border-subtle hover:border-primary text-muted-foreground hover:text-foreground transition-colors"
            title="Scroll to top"
          >
            <ArrowUp className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="mt-4 text-center text-[9px] font-caps tracking-wider text-muted-foreground/50">
        © 2026 Nexora Hackathon • All Rights Reserved. Built with Linear & Vercel Design Philosophy.
      </div>
    </footer>
  );
}

export default ContactSection;
