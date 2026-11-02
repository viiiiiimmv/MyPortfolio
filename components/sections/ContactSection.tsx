"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  Send,
  Loader2,
  CheckCircle,
  AlertCircle,
  Copy,
  Check,
  RotateCw,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetCodeIcon, ShivChauhanLogo } from "@/components/common/Icons";
import { ProfileDTO, ContactMessageRequest, ProblemDetail } from "@/types/portfolio";
import { submitContactMessage } from "@/services/api";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "@/lib/motion";

const CTA_PHRASES = [
  "Curious about something?",
  "Want to connect?",
  "Have an idea to build?",
  "Need a backend partner?",
  "Looking for collaboration?",
  "Ready to work together?",
  "Let's architect a system?",
];

const EMAILJS_SERVICE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_portfolio835";
const EMAILJS_TEMPLATE_ID =
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_5nfkixy";
const EMAILJS_PUBLIC_KEY =
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "3Og7VoKZ9lJgv9k8h";

interface ContactSectionProps {
  profile: ProfileDTO;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formData, setFormData] = useState<ContactMessageRequest>({
    senderName: "",
    senderEmail: "",
    subject: "",
    message: "",
  });

  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof ContactMessageRequest, string>>>({});
  const [loading, setLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "";
  }>({ message: "", type: "" });

  const handleCopy = (text: string | undefined, fieldKey: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(fieldKey);
    setTimeout(() => {
      setCopiedField((curr) => (curr === fieldKey ? null : curr));
    }, 2200);
  };

  // Initialize EmailJS with Public Key from environment
  useEffect(() => {
    if (EMAILJS_PUBLIC_KEY) {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    }
  }, []);

  // Typewriter heading animation
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = CTA_PHRASES[phraseIndex];
    const typingSpeed = isDeleting ? 40 : 80;
    const holdDelay = 1400;
    const resetDelay = 300;

    let timeout: NodeJS.Timeout;

    if (!isDeleting && typedText === currentPhrase) {
      timeout = setTimeout(() => setIsDeleting(true), holdDelay);
    } else if (isDeleting && typedText === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % CTA_PHRASES.length);
      }, resetDelay);
    } else {
      timeout = setTimeout(() => {
        const nextLength = isDeleting ? typedText.length - 1 : typedText.length + 1;
        setTypedText(currentPhrase.slice(0, nextLength));
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, phraseIndex]);

  // Form field change handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for field
    if (fieldErrors[name as keyof ContactMessageRequest]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Client-side validation
  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof ContactMessageRequest, string>> = {};

    if (!formData.senderName.trim()) {
      errors.senderName = "Name cannot be empty";
    }

    if (!formData.senderEmail.trim()) {
      errors.senderEmail = "Email cannot be empty";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.senderEmail.trim())) {
      errors.senderEmail = "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      errors.subject = "Subject cannot be empty";
    }

    if (!formData.message.trim()) {
      errors.message = "Message cannot be empty";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    if (!validateForm()) {
      setToast({
        message: "Please fix the validation errors in the form.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    setToast({ message: "", type: "" });

    try {
      // 1. Send via EmailJS (credentials fetched from MyPortfolio.zip via .env)
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          username: formData.senderName.trim(),
          name: formData.senderName.trim(),
          from_name: formData.senderName.trim(),
          email: formData.senderEmail.trim(),
          from_email: formData.senderEmail.trim(),
          reply_to: formData.senderEmail.trim(),
          subject: formData.subject.trim(),
          description: formData.message.trim(),
          message: formData.message.trim(),
        },
        EMAILJS_PUBLIC_KEY
      );

      // 2. Also record in backend database if running
      try {
        await submitContactMessage({
          senderName: formData.senderName.trim(),
          senderEmail: formData.senderEmail.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        });
      } catch {
        // Backend optional / offline; EmailJS already delivered the message
      }

      setToast({
        message: "Your message has been delivered successfully. I will get back to you soon!",
        type: "success",
      });

      setFormData({
        senderName: "",
        senderEmail: "",
        subject: "",
        message: "",
      });
    } catch (err: unknown) {
      console.error("Contact form error:", err);
      const errorObj = err as { problemDetail?: ProblemDetail; message?: string; text?: string };
      // Check RFC 7807 problem detail errors
      if (errorObj.problemDetail?.errors) {
        setFieldErrors(errorObj.problemDetail.errors);
      }
      setToast({
        message:
          errorObj.problemDetail?.detail ||
          errorObj.text ||
          errorObj.message ||
          "Failed to send message. Please try again or reach out directly.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setToast((curr) => (curr.type === "success" ? { message: "", type: "" } : curr));
      }, 5000);
    }
  };

  const links = profile.socialLinks || {};

  const currentYear = 2026;

  return (
    <motion.section
      id="contact"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 lg:px-12 md:py-32"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {toast.message && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed right-6 top-6 z-50 flex max-w-md items-center gap-3 rounded-xl border p-4 shadow-2xl backdrop-blur-xl ${
              toast.type === "success"
                ? "border-white/30 bg-neutral-900/95 text-white"
                : "border-white/40 bg-neutral-900/95 text-neutral-200"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle className="h-5 w-5 shrink-0 text-white" />
            ) : (
              <AlertCircle className="h-5 w-5 shrink-0 text-white" />
            )}
            <p className="font-satoshi text-sm leading-snug">{toast.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-7xl">
        {/* Section Header: Dynamic Typewriter with Reserved Stable Height */}
        <motion.div className="max-w-4xl" variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
            CONNECT
          </p>
          <div className="mt-4 flex min-h-[4.5rem] items-center md:min-h-[5.5rem] lg:min-h-[6.5rem]">
            <h2 className="font-satoshi text-3xl font-light tracking-tight text-white md:text-5xl lg:text-7xl">
              <span>{typedText}</span>
              <span className="ml-1 inline-block h-[0.85em] w-[2px] translate-y-1 bg-gray-400 animate-pulse" />
            </h2>
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="mt-14 grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* Left Column: Interactive 3D Dark Information Card */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-5">
            <motion.div
              className="relative h-[500px] w-full [perspective:1400px] select-none"
              variants={fadeUp}
            >
              <motion.div
                className="relative h-full w-full [transform-style:preserve-3d] cursor-pointer"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => setIsFlipped((prev) => !prev)}
                role="button"
                tabIndex={0}
                aria-label="Click to flip profile and direct contact card"
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsFlipped((prev) => !prev);
                  }
                }}
              >
                {/* FRONT FACE: Identity, Current Role, VIII.III.MMV Logo, CTA buttons */}
                <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-white/15 bg-neutral-950/90 p-7 md:p-8 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] transition-colors duration-300 hover:border-white/30 group">
                  {/* Ambient Light Accent */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/[0.03] blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/[0.02] blur-3xl" />

                  {/* Top Bar: Status + Logo */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 backdrop-blur-md">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-300">
                        Available
                      </span>
                    </div>

                    {/* Geometric Personal Logo */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.06] text-white shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/[0.1] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                      title="Shiv Chauhan Emblem"
                    >
                      <ShivChauhanLogo className="h-6 w-auto text-white transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Middle: Identity, Current Role & CTA Buttons */}
                  <div className="relative z-10 my-auto space-y-4">
                    <div>
                      <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-neutral-500">
                        Identity
                      </span>
                      <h3 className="mt-1.5 font-satoshi text-3xl font-light tracking-tight text-white md:text-4xl">
                        {profile.fullName}
                      </h3>
                      <p className="mt-2 font-satoshi text-sm md:text-base font-light leading-relaxed text-neutral-300">
                        {profile.headline}
                      </p>
                      {profile.location && (
                        <p className="mt-2 font-mono text-xs text-neutral-500 tracking-wider">
                          {profile.location}
                        </p>
                      )}
                    </div>

                    {/* Prominent CTA Buttons */}
                    <div className="pt-2 flex flex-wrap gap-3">
                      {links.github && (
                        <a
                          href={links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="group/btn inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/[0.05] px-4 py-2.5 font-satoshi text-xs font-medium uppercase tracking-wider text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                        >
                          <GithubIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                          <span>GitHub</span>
                          <ExternalLink className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      )}
                      {links.linkedin && (
                        <a
                          href={links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="group/btn inline-flex items-center gap-2.5 rounded-xl border border-white/20 bg-white/[0.05] px-4 py-2.5 font-satoshi text-xs font-medium uppercase tracking-wider text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                        >
                          <LinkedinIcon className="h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110" />
                          <span>LinkedIn</span>
                          <ExternalLink className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                        </a>
                      )}
                      {links.leetcode && (
                        <a
                          href={links.leetcode}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="group/btn inline-flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 font-satoshi text-xs font-medium uppercase tracking-wider text-neutral-400 transition-all duration-300 hover:border-white/40 hover:text-white"
                          title="LeetCode Profile"
                        >
                          <LeetCodeIcon className="h-4 w-4" />
                          <span>LeetCode</span>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Bottom: Flip affordance hint */}
                  <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-4 text-neutral-400 transition-colors group-hover:text-white">
                    <div className="flex items-center gap-2 font-mono text-xs tracking-wider">
                      <RotateCw className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-180" />
                      <span>Click card to reveal contact info</span>
                    </div>
                    <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-500 transition-colors group-hover:text-neutral-300">
                      Flip ➔
                    </span>
                  </div>
                </div>

                {/* BACK FACE: Direct Contact, Both Emails, Phone Number, Geometric Logo */}
                <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-white/20 bg-neutral-950/95 p-7 md:p-8 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85),inset_0_1px_0_rgba(255,255,255,0.15)] [transform:rotateY(180deg)] [backface-visibility:hidden] [-webkit-backface-visibility:hidden] transition-colors duration-300 hover:border-white/30">
                  {/* Ambient Light Accent */}
                  <div className="pointer-events-none absolute -right-16 -bottom-16 h-48 w-48 rounded-full bg-white/[0.03] blur-3xl" />

                  {/* Top Bar: Comms label + Logo */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 backdrop-blur-md">
                      <Mail className="h-3.5 w-3.5 text-neutral-300" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-300">
                        Direct Comms
                      </span>
                    </div>

                    {/* Geometric Personal Logo */}
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.06] text-white shadow-sm backdrop-blur-md transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/[0.1] group-hover:shadow-[0_0_20px_rgba(255,255,255,0.12)]"
                      title="Shiv Chauhan Emblem"
                    >
                      <ShivChauhanLogo className="h-6 w-auto text-white transition-transform duration-300 group-hover:scale-110" />
                    </div>
                  </div>

                  {/* Middle: Both Emails & Phone Number */}
                  <div className="relative z-10 my-auto space-y-3.5">
                    {/* Primary Email */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-white/30">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                          Primary Email (Work)
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(profile.primaryEmail, "primaryEmail");
                          }}
                          className="flex items-center gap-1 font-mono text-[11px] text-neutral-400 hover:text-white transition-colors"
                          title="Copy primary email"
                          aria-label="Copy primary email"
                        >
                          {copiedField === "primaryEmail" ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-300" />
                              <span className="text-emerald-300">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <a
                        href={`mailto:${profile.primaryEmail}`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 block font-satoshi text-sm md:text-base font-normal text-white hover:text-neutral-300 underline underline-offset-4 truncate"
                      >
                        {profile.primaryEmail}
                      </a>
                    </div>

                    {/* Secondary Email */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-white/30">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                          Secondary Email (Personal)
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(profile.email, "email");
                          }}
                          className="flex items-center gap-1 font-mono text-[11px] text-neutral-400 hover:text-white transition-colors"
                          title="Copy secondary email"
                          aria-label="Copy secondary email"
                        >
                          {copiedField === "email" ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-300" />
                              <span className="text-emerald-300">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <a
                        href={`mailto:${profile.email}`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 block font-satoshi text-sm md:text-base font-normal text-white hover:text-neutral-300 underline underline-offset-4 truncate"
                      >
                        {profile.email}
                      </a>
                    </div>

                    {/* Phone Number */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 transition-colors hover:border-white/30">
                      <div className="flex items-center justify-between text-neutral-400">
                        <span className="font-mono text-[10px] uppercase tracking-[0.22em]">
                          Direct Phone
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopy(profile.phoneNumber || "+1 (555) 019-2834", "phone");
                          }}
                          className="flex items-center gap-1 font-mono text-[11px] text-neutral-400 hover:text-white transition-colors"
                          title="Copy phone number"
                          aria-label="Copy phone number"
                        >
                          {copiedField === "phone" ? (
                            <>
                              <Check className="h-3 w-3 text-emerald-300" />
                              <span className="text-emerald-300">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" />
                              <span>Copy</span>
                            </>
                          )}
                        </button>
                      </div>
                      <a
                        href={`tel:${(profile.phoneNumber || "+15550192834").replace(/[^0-9+]/g, "")}`}
                        onClick={(e) => e.stopPropagation()}
                        className="mt-1 flex items-center gap-2 font-satoshi text-sm md:text-base font-normal text-white hover:text-neutral-300 truncate"
                      >
                        <Phone className="h-3.5 w-3.5 text-neutral-400" />
                        <span>{profile.phoneNumber || "+1 (555) 019-2834"}</span>
                      </a>
                    </div>
                  </div>

                  {/* Bottom: Return / Flip Back Button */}
                  <div className="relative z-10 pt-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsFlipped(false);
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] py-3 font-mono text-xs uppercase tracking-wider text-neutral-300 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                    >
                      <RotateCw className="h-3.5 w-3.5" />
                      <span>Return to Overview</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Footer Copyright */}
            <motion.div className="pt-2 text-center lg:text-left" variants={fadeUp}>
              <p className="font-satoshi text-xs leading-relaxed text-neutral-500">
                © {currentYear}, {profile.fullName}.
                <br />
                All Rights Reserved
              </p>
            </motion.div>
          </div>

          {/* Right Column: Contact Form */}
          <motion.div
            className="space-y-8 lg:col-span-7"
            variants={fadeUp}
          >
            <div>
              <h2 className="font-satoshi mb-2 text-2xl font-light tracking-wide md:text-3xl">
                DROP ME A MESSAGE!
              </h2>
              <div className="h-px w-16 bg-white" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div className="group space-y-2">
                <label
                  htmlFor="senderName"
                  className="block font-mono text-xs uppercase tracking-widest text-gray-400"
                >
                  Your Name *
                </label>
                <input
                  id="senderName"
                  type="text"
                  name="senderName"
                  value={formData.senderName}
                  onChange={handleChange}
                  placeholder="Your Name"
                  disabled={loading}
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.senderName)}
                  aria-describedby={fieldErrors.senderName ? "senderName-error" : undefined}
                  className={`w-full border-b bg-transparent py-3 font-satoshi text-lg text-white placeholder-gray-600 transition-colors duration-300 focus:outline-none ${
                    fieldErrors.senderName
                      ? "border-white focus:border-white"
                      : "border-gray-700 focus:border-white"
                  }`}
                />
                {fieldErrors.senderName && (
                  <p id="senderName-error" role="alert" className="font-satoshi text-xs text-neutral-300">{fieldErrors.senderName}</p>
                )}
              </div>

              {/* Email */}
              <div className="group space-y-2">
                <label
                  htmlFor="senderEmail"
                  className="block font-mono text-xs uppercase tracking-widest text-gray-400"
                >
                  Your Email *
                </label>
                <input
                  id="senderEmail"
                  type="email"
                  name="senderEmail"
                  value={formData.senderEmail}
                  onChange={handleChange}
                  placeholder="Your Email"
                  disabled={loading}
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.senderEmail)}
                  aria-describedby={fieldErrors.senderEmail ? "senderEmail-error" : undefined}
                  className={`w-full border-b bg-transparent py-3 font-satoshi text-lg text-white placeholder-gray-600 transition-colors duration-300 focus:outline-none ${
                    fieldErrors.senderEmail
                      ? "border-white focus:border-white"
                      : "border-gray-700 focus:border-white"
                  }`}
                />
                {fieldErrors.senderEmail && (
                  <p id="senderEmail-error" role="alert" className="font-satoshi text-xs text-neutral-300">{fieldErrors.senderEmail}</p>
                )}
              </div>

              {/* Subject */}
              <div className="group space-y-2">
                <label
                  htmlFor="subject"
                  className="block font-mono text-xs uppercase tracking-widest text-gray-400"
                >
                  Subject *
                </label>
                <input
                  id="subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Subject of your message"
                  disabled={loading}
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.subject)}
                  aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
                  className={`w-full border-b bg-transparent py-3 font-satoshi text-lg text-white placeholder-gray-600 transition-colors duration-300 focus:outline-none ${
                    fieldErrors.subject
                      ? "border-white focus:border-white"
                      : "border-gray-700 focus:border-white"
                  }`}
                />
                {fieldErrors.subject && (
                  <p id="subject-error" role="alert" className="font-satoshi text-xs text-neutral-300">{fieldErrors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div className="group space-y-2">
                <label
                  htmlFor="message"
                  className="block font-mono text-xs uppercase tracking-widest text-gray-400"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  disabled={loading}
                  aria-required="true"
                  aria-invalid={Boolean(fieldErrors.message)}
                  aria-describedby={fieldErrors.message ? "message-error" : undefined}
                  className={`w-full resize-none border-b bg-transparent py-3 font-satoshi text-lg text-white placeholder-gray-600 transition-colors duration-300 focus:outline-none ${
                    fieldErrors.message
                      ? "border-white focus:border-white"
                      : "border-gray-700 focus:border-white"
                  }`}
                />
                {fieldErrors.message && (
                  <p id="message-error" role="alert" className="font-satoshi text-xs text-neutral-300">{fieldErrors.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <motion.button
                  type="submit"
                  disabled={loading}
                  className="group relative inline-flex items-center gap-3 bg-white px-8 py-4 font-satoshi text-sm font-medium uppercase tracking-wide text-black transition-colors duration-300 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  whileHover={subtleHover}
                  whileTap={subtlePress}
                >
                  <span>
                    {loading ? "Sending..." : "Start a Conversation"}
                  </span>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
