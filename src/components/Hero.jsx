import { useCallback, useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Terminal } from "lucide-react";
import { motion as Motion } from "framer-motion";
import VolumeControl from "./VolumeControl";
import {
  fadeIn,
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "../lib/motion";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
  { href: "#resume", label: "Resume" }
];

export default function Hero({ isMuted, setIsMuted }) {
  const [scrambledText, setScrambledText] = useState("");
  const [isScrambling, setIsScrambling] = useState(false);

  const originalText = "SHIV CHAUHAN";
  const subtitle =
    "Software Engineer building full-stack products, AI systems, and developer tools.";

  const scrambleText = useCallback(() => {
    if (isScrambling) return;

    setIsScrambling(true);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let iterations = 0;

    const interval = setInterval(() => {
      const nextText = originalText
        .split("")
        .map((char, index) => {
          if (char === " ") return " ";
          if (iterations > index * 2) return originalText[index];
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      setScrambledText(nextText);
      iterations += 1;

      if (iterations > originalText.length * 2) {
        setScrambledText(originalText);
        setIsScrambling(false);
      }
    }, 55);
  }, [isScrambling, originalText]);

  useEffect(() => {
    const introTimeout = setTimeout(scrambleText, 650);

    return () => {
      clearTimeout(introTimeout);
    };
  }, [scrambleText]);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <Motion.section
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-black text-white"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-0 top-16 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-6 right-10 h-64 w-64 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <Motion.nav
        className="relative z-10 flex items-center justify-between px-6 py-6 md:px-10 lg:px-12"
        variants={fadeUp}
      >
        <Motion.div
          className="flex items-center space-x-3 rounded-full border border-white/15 bg-white/[0.04] px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-300"
          style={{ fontFamily: "Synonym, sans-serif" }}
          whileHover={subtleHover}
        >
          <Terminal className="h-4 w-4" />
          <span>Portfolio</span>
          <div className="h-2 w-2 rounded-full bg-emerald-300" />
        </Motion.div>

        <div className="hidden space-x-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Motion.a
              key={link.label}
              href={link.href}
              className="group relative text-sm text-gray-400 transition-colors hover:text-white"
              style={{ fontFamily: "Satoshi, sans-serif" }}
              variants={{
                rest: { y: 0 },
                hover: { y: -2 },
              }}
              whileHover="hover"
              whileTap={subtlePress}
              initial="rest"
              animate="rest"
            >
              {link.label}
              <Motion.span
                className="absolute -bottom-1 left-0 h-px w-full bg-white"
                style={{ originX: 0 }}
                variants={{
                  rest: { scaleX: 0, opacity: 0.75 },
                  hover: { scaleX: 1, opacity: 1 },
                }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </Motion.a>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          <VolumeControl isMuted={isMuted} setIsMuted={setIsMuted} />
        </div>
      </Motion.nav>

      <div className="relative z-10 flex min-h-0 flex-1 items-center justify-center px-6 pb-10 md:px-10 lg:px-12">
        <div className="grid h-full w-full max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 xl:col-span-6">
            <Motion.p
              className="mb-3 text-sm uppercase tracking-[0.24em] text-gray-500"
              style={{ fontFamily: "Synonym, sans-serif" }}
              variants={fadeUp}
            >
              This is
            </Motion.p>

            <Motion.div variants={fadeUp}>
              <h1
                className="cursor-pointer text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-7xl"
                onClick={scrambleText}
                style={{
                  fontFamily: "Clash Grotesk, sans-serif",
                }}
              >
                {scrambledText || originalText}
              </h1>
            </Motion.div>

            <Motion.div
              className="mt-6 h-px w-36 bg-gradient-to-r from-white/70 to-transparent"
              variants={fadeIn}
            />

            <Motion.p
              className="mt-7 max-w-2xl text-base leading-relaxed text-gray-300 md:text-lg"
              style={{ fontFamily: "Satoshi, sans-serif" }}
              variants={fadeUp}
            >
              {subtitle}
            </Motion.p>

            <Motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              variants={fadeUp}
            >
              <Motion.div
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs uppercase tracking-[0.16em] text-gray-400"
                style={{ fontFamily: "Synonym, sans-serif" }}
                whileHover={subtleHover}
              >
              </Motion.div>

              <Motion.a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition-colors hover:border-white/50"
                style={{ fontFamily: "Satoshi, sans-serif" }}
                whileHover={subtleHover}
                whileTap={subtlePress}
              >
                View projects
                <ArrowRight className="h-4 w-4" />
              </Motion.a>

              <div
                className="hidden items-center gap-2 text-xs text-gray-500 lg:flex"
                style={{ fontFamily: "Synonym, sans-serif" }}
              >
                <span>Press ↓ to continue</span>
                <ArrowDown className="h-4 w-4 animate-bounce" />
              </div>
            </Motion.div>
          </div>

          <div className="hidden justify-end lg:flex lg:col-span-5 xl:col-span-6">
            <div className="relative w-full max-w-xl">
              <div className="rounded-3xl border border-white/15 bg-white/[0.03] p-3 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl">
                <img
                  src="/assets/hero-portrait.jpeg"
                  alt="Portrait"
                  width="960"
                  height="1280"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="h-full max-h-[68vh] w-full rounded-2xl object-cover grayscale brightness-95"
                />
                <div className="pointer-events-none absolute inset-3 rounded-2xl bg-gradient-to-t from-black/45 via-transparent to-black/10" />
              </div>

              <div className="absolute -bottom-4 left-6 rounded-xl border border-white/15 bg-black/60 px-4 py-2 text-xs text-gray-300 backdrop-blur-xl">
                <span style={{ fontFamily: "Synonym, sans-serif" }}>
                  Full-stack developer • Product-focused execution
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Motion.section>
  );
}
