"use client";

import { motion } from "framer-motion";
import { Clock, GitBranch } from "lucide-react";
import { ProjectDTO } from "@/types/portfolio";
import { resolveProjectSkills } from "@/services/api";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  viewportConfig,
} from "@/lib/motion";

interface UpcomingProjectsSectionProps {
  upcomingProjects: ProjectDTO[];
}

export default function UpcomingProjectsSection({
  upcomingProjects,
}: UpcomingProjectsSectionProps) {
  if (!upcomingProjects || upcomingProjects.length === 0) return null;

  const sortedProjects = [...upcomingProjects].sort((a, b) => {
    const orderA = typeof a.displayOrder === "number" ? a.displayOrder : 999;
    const orderB = typeof b.displayOrder === "number" ? b.displayOrder : 999;
    return orderA - orderB;
  });

  return (
    <motion.section
      id="upcoming"
      className="relative overflow-hidden border-t border-dashed border-white/15 bg-neutral-950/80 px-6 py-24 text-white md:px-10 lg:px-12 md:py-32"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      {/* Background blueprint subtle accents */}
      <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
        <div className="absolute right-10 top-10 h-72 w-72 rounded-full bg-white/[0.02] blur-3xl" />
        <div className="absolute left-10 bottom-10 h-72 w-72 rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div className="max-w-3xl" variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
            IN THE PIPELINE
          </p>
          <h2 className="font-satoshi mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Upcoming systems and experimental architectures.
          </h2>
          <p className="font-satoshi mt-4 text-base font-light text-neutral-400 md:text-lg">
            Active prototypes and research initiatives exploring next-generation distributed systems and high-throughput infrastructure.
          </p>
        </motion.div>

        {/* Full-Width Rectangular Cards Stacked Vertically */}
        <div className="mt-14 space-y-6">
          {sortedProjects.map((project, idx) => {
            const statusLabel = project.status || "PLANNED";
            const isProgress =
              statusLabel === "IN_PROGRESS" ||
              statusLabel.toLowerCase().includes("progress");

            const skills = resolveProjectSkills(project);
            const timeline =
              project.startDate || project.endDate
                ? `${project.startDate || "Upcoming"} — ${project.endDate || "TBD"}`
                : "Active Development";

            return (
              <motion.article
                key={project.publicId || idx}
                variants={fadeUp}
                whileHover={subtleHover}
                className={`group relative w-full rounded-2xl border p-7 md:p-8 backdrop-blur-xl transition-all duration-300 ${
                  isProgress
                    ? "border-amber-400/25 bg-gradient-to-r from-neutral-950 via-neutral-900/40 to-neutral-950 hover:border-amber-400/50 hover:shadow-[0_12px_40px_rgba(251,191,36,0.06)]"
                    : "border-white/12 bg-white/[0.02] hover:border-white/30 hover:bg-white/[0.04] hover:shadow-[0_12px_40px_rgba(255,255,255,0.04)]"
                }`}
              >
                {/* Top Row: Category + Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
                    {project.category || "Research & Architecture"}
                  </span>

                  {/* Yellow Indicator for In Progress, Neutral for Planned */}
                  <div
                    className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-wider backdrop-blur-md ${
                      isProgress
                        ? "border-amber-400/40 bg-amber-400/10 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.15)]"
                        : "border-white/15 bg-white/5 text-neutral-400"
                    }`}
                  >
                    <span className="relative flex h-2 w-2">
                      {isProgress && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                      )}
                      <span
                        className={`relative inline-flex h-2 w-2 rounded-full ${
                          isProgress ? "bg-amber-400" : "bg-neutral-500"
                        }`}
                      />
                    </span>
                    <span>{statusLabel.replace("_", " ")}</span>
                  </div>
                </div>

                {/* Main Body: Title, Description & Tech Stack */}
                <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-start lg:gap-8">
                  {/* Left Column: Title & Description */}
                  <div className="lg:col-span-8">
                    <h3 className="font-satoshi text-2xl font-light tracking-tight text-white transition-colors group-hover:text-neutral-100 md:text-3xl">
                      {project.title}
                    </h3>

                    <p className="font-satoshi mt-3 text-sm leading-relaxed text-neutral-400 md:text-base">
                      {project.shortDescription || project.description}
                    </p>
                  </div>

                  {/* Right Column: Tech Stack Badges */}
                  <div className="lg:col-span-4 flex flex-col lg:items-end justify-center">
                    {skills.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 lg:justify-end">
                        {skills.map((skill) => (
                          <span
                            key={skill.publicId || skill.name}
                            className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-300"
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Info Row */}
                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-xs text-neutral-500">
                  <div className="flex items-center gap-2 text-neutral-400">
                    <Clock className="h-3.5 w-3.5 text-neutral-400" />
                    <span>{timeline}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <GitBranch className="h-3.5 w-3.5" />
                    <span>Pipeline Prototype</span>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
