"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Terminal, Compass, ShieldAlert, Cpu } from "lucide-react";
import { ShivChauhanLogo } from "@/components/common/Icons";

export default function NotFound() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const failedPath = mounted && pathname ? pathname : "/requested-route";

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col justify-between overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Background Matrix Dot Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.12) 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Cybernetic Ambient Glow Centers */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[400px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[240px] h-[240px] bg-emerald-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Horizon Accent Lines */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Top Header / Identity Bar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
        <Link
          href="/"
          className="group flex items-center gap-3 text-neutral-300 hover:text-white transition-colors"
        >
          <div className="relative flex items-center justify-center h-9 w-9 rounded-lg bg-neutral-950 border border-white/10 group-hover:border-emerald-500/40 transition-colors">
            <ShivChauhanLogo className="h-5 w-auto text-emerald-400 group-hover:scale-110 transition-transform duration-200" />
          </div>
          <div className="flex flex-col">
            <span className="font-clash text-xs sm:text-sm font-semibold tracking-wider uppercase text-white">
              SHIV CHAUHAN
            </span>
            <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
              SYSTEM DIAGNOSTICS
            </span>
          </div>
        </Link>

        {/* Status Beacon */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-950/80 border border-emerald-500/30 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          <span className="font-mono text-[11px] font-medium tracking-wider text-rose-400/90 uppercase">
            ERR_404_UNRESOLVED
          </span>
        </div>
      </header>

      {/* Main Core Viewport */}
      <main className="relative z-10 w-full max-w-4xl mx-auto px-6 py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        {/* Animated 404 Identity */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative select-none"
        >
          {/* Unmapped Sector Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-4 rounded-full bg-neutral-900/90 border border-white/10 text-emerald-400 font-mono text-xs tracking-widest uppercase shadow-[0_0_20px_rgba(52,211,153,0.15)]">
            <ShieldAlert className="w-3.5 h-3.5 text-emerald-400" />
            <span>ROUTING EXCEPTION // SECTOR UNMAPPED</span>
          </div>

          {/* Massive 404 Headline */}
          <div className="relative">
            <h1 className="font-clash text-8xl sm:text-[11rem] md:text-[13rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-b from-white via-neutral-200 to-neutral-700/30">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="font-clash text-8xl sm:text-[11rem] md:text-[13rem] font-black tracking-tighter leading-none text-emerald-500/10 blur-xl">
                404
              </span>
            </div>
          </div>
        </motion.div>

        {/* Narrative & Explanatory Description */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mx-auto mt-2"
        >
          <h2 className="font-clash text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white">
            Lost in Distributed Space
          </h2>
          <p className="font-synonym text-neutral-400 text-sm sm:text-base mt-2 leading-relaxed">
            The requested resource could not be found at this endpoint. The route may have been migrated during an architectural deployment or never existed.
          </p>
        </motion.div>

        {/* System Diagnostics Terminal Widget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-2xl mt-8 rounded-xl bg-neutral-950/90 border border-white/10 shadow-2xl backdrop-blur-md overflow-hidden text-left"
        >
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-neutral-900/60 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="font-mono text-[11px] text-neutral-400 ml-2">
                telemetry@nexus-edge:~ // diagnostics
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-neutral-500 font-mono text-[10px]">
              <Cpu className="w-3 h-3 text-emerald-400" />
              <span>AWS_AP_SOUTHEAST_2</span>
            </div>
          </div>

          {/* Terminal Output Stream */}
          <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed space-y-1.5 text-neutral-300">
            <div className="flex items-start gap-2">
              <span className="text-emerald-400 select-none">&gt;</span>
              <div>
                <span className="text-neutral-500">REQUEST: </span>
                <span className="text-rose-400 font-semibold">{failedPath}</span>
                <span className="text-neutral-500"> HTTP/1.1</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-emerald-400 select-none">&gt;</span>
              <div>
                <span className="text-neutral-500">STATUS: </span>
                <span className="text-amber-300">404 NOT_FOUND </span>
                <span className="text-neutral-500">[Resource unmapped in reverse proxy]</span>
              </div>
            </div>

            <div className="flex items-start gap-2">
              <span className="text-emerald-400 select-none">&gt;</span>
              <div>
                <span className="text-neutral-500">ACTION: </span>
                <span className="text-emerald-300">
                  Reroute to primary orchestrator root (/) or inspect known cluster sectors.
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Controls */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 w-full max-w-md"
        >
          <Link
            href="/"
            className="group relative w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white text-black font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-neutral-100 hover:shadow-[0_0_24px_rgba(255,255,255,0.25)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <Home className="w-4 h-4 text-black group-hover:-translate-y-0.5 transition-transform" />
            <span>Return to Root</span>
          </Link>

          <button
            type="button"
            onClick={() => {
              if (typeof window !== "undefined") {
                window.history.back();
              }
            }}
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-neutral-900 border border-white/15 text-neutral-300 font-mono text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:bg-neutral-800 hover:text-white hover:border-emerald-500/40 active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400 group-hover:-translate-x-0.5 transition-transform" />
            <span>Previous Sector</span>
          </button>
        </motion.div>

        {/* Fast Navigation Quick Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-8 pt-6 border-t border-white/[0.08] w-full max-w-lg"
        >
          <div className="font-mono text-[10px] uppercase tracking-widest text-neutral-500 mb-3">
            Known Architecture Sectors
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { label: "// 01. PROJECTS", href: "/#projects" },
              { label: "// 02. STACK & ABOUT", href: "/#about" },
              { label: "// 03. EXPERIENCE", href: "/#experience" },
              { label: "// 04. GET IN TOUCH", href: "/#contact" },
            ].map((sector) => (
              <Link
                key={sector.href}
                href={sector.href}
                className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-white/[0.08] font-mono text-[11px] text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-neutral-900 transition-all duration-200"
              >
                {sector.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Bottom Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-neutral-500 font-mono text-[11px] border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span>VIII · III · MMV</span>
          <span>•</span>
          <span>SHIV CHAUHAN PORTFOLIO</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="text-neutral-400">EDGE GATEWAY OPERATIONAL</span>
        </div>
      </footer>
    </div>
  );
}

