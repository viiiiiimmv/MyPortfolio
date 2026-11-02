"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ProfileDTO } from "@/types/portfolio";
import {
  fadeIn,
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "@/lib/motion";

interface HeroSectionProps {
  profile: ProfileDTO;
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const [scrambledText, setScrambledText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const originalName = profile.fullName.toUpperCase();

  const scrambleText = useCallback(() => {
    if (isScrambling) return;
    setIsScrambling(true);

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iterations = 0;

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      const nextText = originalName
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (iterations > index * 2) return originalName[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setScrambledText(nextText);
      iterations += 1;

      if (iterations > originalName.length * 2) {
        setScrambledText(originalName);
        setIsScrambling(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }, 50);
  }, [isScrambling, originalName]);

  useEffect(() => {
    const timeout = setTimeout(scrambleText, 450);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scrambleText]);

  const heroTagline =
    profile.heroTagLine ||
    profile.headline ||
    "Software Engineer building full-stack products, AI systems, and developer tools.";

  const profileImageUrl =
    profile.profileImage?.cloudinaryUrl ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80";

  return (
    <motion.section
      id="hero"
      className="relative flex min-h-[calc(100vh-73px)] w-full flex-col justify-center overflow-hidden bg-black px-6 py-16 text-white md:px-10 lg:px-12"
      initial="hidden"
      animate="show"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      {/* Background glow effects */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -left-20 top-12 h-96 w-96 rounded-full bg-white/[0.02] blur-3xl" />
        <div className="absolute -right-20 bottom-10 h-96 w-96 rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute right-1/3 top-1/2 h-80 w-80 rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Main Hero Content */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Eyebrow Label */}
            <motion.p
              className="mb-3 font-synonym text-sm uppercase tracking-[0.24em] text-gray-500"
              variants={fadeUp}
            >
              This is
            </motion.p>

            {/* Interactive Name with scramble effect */}
            <motion.div variants={fadeUp}>
              <h1
                onClick={scrambleText}
                title="Click to scramble"
                className="font-clash inline-block cursor-pointer select-none whitespace-nowrap text-5xl font-semibold leading-[1.03] tracking-tight text-white transition-colors duration-200 hover:text-neutral-200 sm:text-6xl lg:text-7xl"
                style={{
                  minWidth: `${Math.max(originalName.length, 12) + 2}ch`,
                }}
              >
                {scrambledText || originalName}
              </h1>
            </motion.div>

            {/* Horizontal Line Accent */}
            <motion.div
              className="mt-6 h-px w-36 bg-gradient-to-r from-white/70 to-transparent"
              variants={fadeIn}
            />

            {/* Professional Headline / Hero Statement */}
            <motion.p
              className="font-satoshi mt-7 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg"
              variants={fadeUp}
            >
              {heroTagline}
            </motion.p>

            {/* Primary Actions */}
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              variants={fadeUp}
            >
              <motion.a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 font-satoshi text-sm text-white transition-colors hover:border-white/50"
                whileHover={subtleHover}
                whileTap={subtlePress}
              >
                View projects
                <ArrowRight className="h-4 w-4" />
              </motion.a>

              <motion.a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2 font-satoshi text-sm text-neutral-300 transition-colors hover:border-white/30 hover:text-white"
                whileHover={subtleHover}
                whileTap={subtlePress}
              >
                Contact Me
              </motion.a>

              <div
                className="hidden items-center gap-2 font-synonym text-xs text-gray-500 lg:flex lg:ml-2"
              >
                <span>Press ↓ to continue</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </div>
            </motion.div>
          </div>

          {/* Visual Element: Profile Image */}
          <div className="flex justify-center lg:col-span-5 xl:col-span-5 lg:justify-end">
            <motion.div
              className="relative w-full max-w-xl"
              variants={fadeUp}
            >
              <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <Image
                  src={profileImageUrl}
                  alt={
                    profile.fullName
                      ? `${profile.fullName} — Senior Backend & Distributed Systems Engineer`
                      : "Shiv Chauhan — Senior Backend & Distributed Systems Engineer"
                  }
                  width={960}
                  height={1280}
                  priority
                  unoptimized
                  className="h-full max-h-[68vh] w-full rounded-2xl object-cover grayscale brightness-95"
                />
                <div className="pointer-events-none absolute inset-3 rounded-2xl bg-gradient-to-t from-black/45 via-transparent to-black/10" />
              </div>

              {/* Floating identity badge */}
              <div className="absolute -bottom-4 left-6 rounded-xl border border-white/15 bg-black/60 px-4 py-2 text-xs text-gray-300 backdrop-blur-xl">
                <span className="font-synonym">
                  {profile.headline || "Full-stack developer • Product-focused execution"}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
