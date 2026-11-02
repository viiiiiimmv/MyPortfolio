"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShivChauhanLogo } from "@/components/common/Icons";

interface PreloaderProps {
  progress?: number;
  statusMessage?: string;
  isStaticLoader?: boolean;
}

const TELEMETRY_STEPS = [
  "INITIALIZING RUNTIME ENVIRONMENT...",
  "RESOLVING DEVELOPER CREDENTIALS & PROFILE...",
  "COMPILING TECHNICAL ARCHITECTURES & STACK...",
  "INDEXING FEATURED & PUBLISHED PROJECTS...",
  "BUILDING CHRONOLOGICAL JOURNEY TIMELINE...",
  "SYNCING GITHUB ACTIVITY & ALGORITHMIC RIGOR...",
  "GRAPHICAL SHADERS READY. LAUNCHING PORTFOLIO...",
];

export default function Preloader({
  progress = 0,
  statusMessage,
  isStaticLoader = false,
}: PreloaderProps) {
  // Static animation state for fallback when used in Next.js loading.tsx
  const [internalProgress, setInternalProgress] = useState(isStaticLoader ? 15 : progress);

  useEffect(() => {
    if (!isStaticLoader) {
      setInternalProgress(progress);
      return;
    }

    // Smooth progressive ticker for server streaming phase
    const interval = setInterval(() => {
      setInternalProgress((prev) => {
        if (prev >= 92) return 92; // Hold at 92% until server payload hydrates
        const increment = Math.max(1, Math.floor((92 - prev) / 6));
        return prev + increment;
      });
    }, 180);

    return () => clearInterval(interval);
  }, [progress, isStaticLoader]);

  // Determine current telemetry step based on progress percentage
  const currentStepIndex = Math.min(
    TELEMETRY_STEPS.length - 1,
    Math.floor((internalProgress / 100) * TELEMETRY_STEPS.length)
  );

  const displayMessage =
    statusMessage ||
    (internalProgress >= 100
      ? "SYSTEM READY. ENTERING WORKSPACE..."
      : TELEMETRY_STEPS[currentStepIndex]);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black text-white selection:bg-none overflow-hidden"
    >
      {/* Background radial spotlight and grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.12) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />
      <div className="global-grid-overlay" aria-hidden="true" />

      {/* Top HUD Telemetry Bar */}
      <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
        <div className="flex items-center space-x-3 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300">
            SYS.BOOT // SCN835
          </span>
        </div>

        <div className="hidden items-center space-x-6 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-500 sm:flex">
          <span>ENV: PRODUCTION</span>
          <span className="text-white/20">|</span>
          <span>PROTOCOL: TLS/1.3</span>
        </div>
      </header>

      {/* Centerpiece: Monogram & Brand Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Glowing Insignia Container */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mb-8 flex items-center justify-center"
        >
          {/* Luminous emerald halo */}
          <div className="absolute h-28 w-28 rounded-full bg-emerald-400/20 blur-2xl animate-pulse" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.04] p-4 shadow-[0_0_35px_rgba(52,211,153,0.18)] backdrop-blur-xl">
            <ShivChauhanLogo className="h-12 w-12 text-emerald-300" />
          </div>
        </motion.div>

        {/* Identity Headings */}
        <motion.div
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2"
        >
          <h1 className="font-clash text-2xl font-semibold tracking-tight text-white md:text-4xl">
            SHIV CHAUHAN
          </h1>
          <p className="font-synonym text-xs uppercase tracking-[0.28em] text-neutral-400 md:text-sm">
            Full-Stack & Distributed Systems Engineer
          </p>
        </motion.div>

        {/* Precision Progress Counter */}
        <div className="mt-10 flex flex-col items-center">
          <div className="flex items-baseline font-mono font-light tracking-tight text-white">
            <span className="text-5xl md:text-7xl font-mono">
              {String(Math.min(100, Math.max(0, Math.round(internalProgress)))).padStart(2, "0")}
            </span>
            <span className="ml-1 text-2xl md:text-3xl font-mono text-emerald-300">
              %
            </span>
          </div>

          {/* Precision Progress Bar Track */}
          <div className="relative mt-5 h-[2px] w-64 md:w-80 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-gradient-to-r from-emerald-500 via-emerald-300 to-white"
              style={{ width: `${Math.min(100, Math.max(0, internalProgress))}%` }}
              transition={{ ease: "easeOut" }}
            />
            {/* Glowing lead edge indicator */}
            <div
              className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_#34d399]"
              style={{
                left: `calc(${Math.min(100, Math.max(0, internalProgress))}% - 3px)`,
              }}
            />
          </div>

          {/* Dynamic Telemetry Log Feed */}
          <div className="mt-4 flex h-6 items-center">
            <motion.p
              key={displayMessage}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-xs uppercase tracking-[0.16em] text-neutral-400 md:text-[13px]"
            >
              <span className="text-emerald-300 mr-2">&gt;&gt;</span>
              {displayMessage}
            </motion.p>
          </div>
        </div>
      </main>

      {/* Bottom HUD Metadata */}
      <footer className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-neutral-500">
        <div>
          <span>INITIALIZING CORE SERVICES</span>
        </div>
        <div className="flex items-center space-x-2 text-neutral-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>PORTFOLIO OS // V2026.1</span>
        </div>
      </footer>

      {/* Bottom accent glow border */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
        aria-hidden="true"
      />
    </div>
  );
}

