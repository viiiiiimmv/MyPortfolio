"use client";

import { Terminal } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { noHover, subtlePress } from "@/lib/motion";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#upcoming", label: "Upcoming" },
];

const navLinkVariants: Variants = {
  rest: { y: 0 },
  hover: { y: 0 },
};

const navUnderlineVariants: Variants = {
  rest: {
    scaleX: 0,
    opacity: 0.75,
    originX: 0,
  },
  hover: {
    scaleX: 1,
    opacity: 1,
    originX: 0,
  },
};

interface NavbarProps {
  statusText?: string;
  resumeUrl?: string;
}

export default function Navbar({ statusText = "Available", resumeUrl }: NavbarProps) {
  return (
    <motion.header
      className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-black/60 backdrop-blur-xl transition-all"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        {/* Brand / Terminal badge */}
        <motion.a
          href="#"
          title={`Availability: ${statusText}`}
          className="flex items-center space-x-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-300 font-synonym transition-colors hover:border-white/30"
          whileHover={noHover}
        >
          <Terminal className="h-4 w-4" />
          <span>{"Portfolio"}</span>
          <div className="h-2 w-2 rounded-full bg-emerald-300" />
        </motion.a>

        {/* Section Navigation Links */}
        <nav className="hidden items-center space-x-8 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="group relative font-satoshi text-sm text-gray-400 transition-colors hover:text-white focus-visible:text-white focus-visible:outline-none"
              variants={navLinkVariants}
              initial="rest"
              animate="rest"
              whileHover="hover"
              whileFocus="hover"
              whileTap={subtlePress}
            >
              {link.label}
              <motion.span
                className="pointer-events-none absolute -bottom-1 left-0 h-px w-full bg-white"
                style={{ originX: 0 }}
                variants={navUnderlineVariants}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Action button: Resume or Contact jump */}
        <div className="flex items-center gap-4">
          {resumeUrl ? (
            <motion.a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg border border-white/20 bg-white/[0.04] px-3.5 py-1.5 font-synonym text-xs uppercase tracking-[0.14em] text-neutral-200 transition-colors hover:border-white/50 hover:bg-white/10 sm:inline-block"
              whileHover={noHover}
              whileTap={subtlePress}
            >
              Resume
            </motion.a>
          ) : null}
        </div>
      </div>
    </motion.header>
  );
}
