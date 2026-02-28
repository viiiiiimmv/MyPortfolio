import React, { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import {
  Camera,
  Download,
  Globe,
  Instagram,
  Mail,
  MoveRight,
} from "lucide-react";
import ProblemStatsChart from "./ProblemStatsChart";
import images from "../assets/data/imageData";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "../lib/motion";

const LEETCODE_PROFILE_URL = "https://leetcode.com/u/viii-iii-mmv/";
const RESUME_URL =
  "https://drive.google.com/file/d/180o5z1N69kH0GgS4QMjojMA9mm4Hrv5i/view?usp=share_link";

const Stats = () => {
  const [currentImage, setCurrentImage] = useState(() => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = Math.floor(Math.random() * images.length);
      setCurrentImage(images[nextIndex]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Motion.section
      className="relative w-full min-h-screen overflow-hidden bg-black text-white"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-12 top-1/4 h-60 w-60 rounded-full bg-white/5 blur-3xl" />
      </div>

      <Motion.div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:py-24"
        variants={fadeUp}
      >
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Motion.div className="mb-8 flex items-center gap-4" variants={fadeUp}>
              <Camera className="h-5 w-5 text-neutral-300" />
              <div className="h-px w-14 bg-white/40" />
              <span
                className="text-xs uppercase tracking-[0.24em] text-neutral-500"
                style={{ fontFamily: "Synonym, sans-serif" }}
              >
                Photography
              </span>
            </Motion.div>

            <Motion.h2
              className="text-3xl leading-tight tracking-tight md:text-5xl"
              style={{ fontFamily: "Clash Grotesk, sans-serif" }}
              variants={fadeUp}
            >
              Fueled by code, coffee, and a lens for detail.
            </Motion.h2>

            <Motion.p
              className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-300"
              style={{ fontFamily: "Satoshi, sans-serif" }}
              variants={fadeUp}
            >
              My visual work influences how I design products: cleaner framing,
              stronger hierarchy, and better storytelling through interfaces.
            </Motion.p>

            <Motion.div
              className="group mt-8 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-3 shadow-[0_18px_42px_rgba(0,0,0,0.38)] backdrop-blur-xl"
              variants={fadeUp}
              whileHover={subtleHover}
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={currentImage}
                  alt="Photography showcase"
                  className="h-[22rem] w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                <Motion.a
                  href="https://www.instagram.com/stealthy.shutter"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-neutral-200 transition-colors hover:border-white/40"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                  whileHover={subtleHover}
                  whileTap={subtlePress}
                >
                  <Instagram className="h-4 w-4" />
                  @stealthy.shutter
                </Motion.a>

                <Motion.a
                  href="https://stealthyshutter.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-black/40 px-3 py-2 text-sm text-neutral-200 transition-colors hover:border-white/40"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                  whileHover={subtleHover}
                  whileTap={subtlePress}
                >
                  <Globe className="h-4 w-4" />
                  stealthyshutter.netlify.app
                </Motion.a>
              </div>
            </Motion.div>
          </div>

          <div className="lg:col-span-6 lg:border-l lg:border-white/10 lg:pl-8">
            <Motion.div className="mb-6" variants={fadeUp}>
              <span
                className="text-xs uppercase tracking-[0.24em] text-neutral-500"
                style={{ fontFamily: "Synonym, sans-serif" }}
              >
                Coding Proof
              </span>
              <div className="mt-3 h-px w-16 bg-white/45" />
            </Motion.div>

            <Motion.div
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8"
              variants={fadeUp}
            >
              <ProblemStatsChart profile={LEETCODE_PROFILE_URL} />
            </Motion.div>

            <Motion.div
              className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/25"
              variants={fadeUp}
              whileHover={subtleHover}
            >
              <p
                className="text-xs uppercase tracking-[0.2em] text-neutral-500"
                style={{ fontFamily: "Synonym, sans-serif" }}
              >
                Resume
              </p>

              <div className="mt-3 flex items-center justify-between gap-4">
                <div>
                  <h3
                    className="text-xl"
                    style={{ fontFamily: "Clash Grotesk, sans-serif" }}
                  >
                    Download CV
                  </h3>
                  <p
                    className="mt-1 text-sm text-neutral-400"
                    style={{ fontFamily: "Satoshi, sans-serif" }}
                  >
                    Latest version in PDF format
                  </p>
                </div>

                <Motion.a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition-colors hover:border-white/45"
                  style={{ fontFamily: "Satoshi, sans-serif" }}
                  whileHover={subtleHover}
                  whileTap={subtlePress}
                >
                  <Download className="h-4 w-4" />
                  Get CV
                </Motion.a>
              </div>
            </Motion.div>

            <Motion.a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-white"
              style={{ fontFamily: "Satoshi, sans-serif" }}
              variants={fadeUp}
              whileHover={subtleHover}
              whileTap={subtlePress}
            >
              <Mail className="h-4 w-4" />
              Let’s discuss an opportunity
              <MoveRight className="h-4 w-4" />
            </Motion.a>
          </div>
        </div>
      </Motion.div>
    </Motion.section>
  );
};

export default Stats;
