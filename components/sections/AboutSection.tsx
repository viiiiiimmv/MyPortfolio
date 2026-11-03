"use client";

import { motion } from "framer-motion";
import { MapPin, Briefcase, Award } from "lucide-react";
import { ProfileDTO, SkillDTO } from "@/types/portfolio";
import {
  fadeUp,
  sectionReveal,
  viewportConfig,
} from "@/lib/motion";

interface AboutSectionProps {
  profile: ProfileDTO;
  skills?: SkillDTO[];
}

export default function AboutSection({ profile }: AboutSectionProps) {
  return (
    <motion.section
      id="about"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 lg:px-12 md:py-32"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* Section Header */}
        <motion.div className="max-w-3xl" variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
            A LITTLE ABOUT ME
          </p>
          <h2 className="font-satoshi mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Engineering philosophy and core competencies.
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Bio & Core Philosophy */}
          <motion.div className="flex flex-col lg:col-span-7" variants={fadeUp}>
            <div className="flex h-full flex-col justify-center rounded-2xl border border-white/10 bg-white/[0.02] p-8 backdrop-blur-sm md:p-10">
              <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                Background & Approach
              </h3>
              <p className="font-satoshi mt-5 text-base font-normal leading-relaxed text-neutral-200 md:text-lg">
                {profile.bio}
              </p>
              <p className="font-satoshi mt-4 text-sm leading-relaxed text-neutral-400 md:text-base">
                Driven by building resilient, low-latency architectures with distributed fault tolerance, clean API contracts, and scalable backend pipelines.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Three Cards Stacked Vertically */}
          <motion.div className="flex flex-col justify-between gap-4 lg:col-span-5" variants={fadeUp}>
            {/* Experience Card */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] md:p-7 md:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-white">
                  <Briefcase className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-white" />
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                    Experience
                  </span>
                </div>
              </div>
              <p className="font-satoshi mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {profile.yearsOfExperience > 0 ? `${profile.yearsOfExperience}+ ` : "Graduate / "}
                <span className="text-sm font-normal text-neutral-400">
                  {profile.yearsOfExperience > 0 ? "Years" : "Early Career"}
                </span>
              </p>
              <p className="font-satoshi mt-1 text-xs text-neutral-500">
                Production systems & software delivery
              </p>
            </div>

            {/* Location Card */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] md:p-7 md:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-white">
                  <MapPin className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-white" />
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                    Location
                  </span>
                </div>
              </div>
              <p className="font-satoshi mt-3 text-xl font-medium tracking-tight text-white md:text-2xl truncate">
                {profile.location || "Remote"}
              </p>
              <p className="font-satoshi mt-1 text-xs text-neutral-500">
                Available for remote work opportunities
              </p>
            </div>

            {/* Domain Card */}
            <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04] md:p-7 md:px-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 text-white">
                  <Award className="h-4 w-4 text-neutral-400 transition-colors group-hover:text-white" />
                  <span className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                    Domain
                  </span>
                </div>
              </div>
              <p className="font-satoshi mt-3 text-xl font-medium tracking-tight text-white md:text-2xl">
                {profile.headline}
              </p>
              <p className="font-satoshi mt-1 text-xs text-neutral-500">
                Fully integrated and deployed systems
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
