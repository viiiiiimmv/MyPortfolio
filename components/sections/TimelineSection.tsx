"use client";

import { motion, useReducedMotion } from "framer-motion";
import { NormalizedTimelineItem } from "@/types/portfolio";
import {
  fadeUp,
  sectionReveal,
  viewportConfig,
  MOTION_EASE,
} from "@/lib/motion";
import type { TargetAndTransition } from "framer-motion";

interface TimelineSectionProps {
  timeline: NormalizedTimelineItem[];
}

export default function TimelineSection({ timeline }: TimelineSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const lineAnimation: TargetAndTransition = shouldReduceMotion
    ? { scaleY: 1 }
    : { scaleY: 1, transition: { duration: 0.65, ease: MOTION_EASE } };

  if (!timeline || timeline.length === 0) return null;

  return (
    <motion.section
      id="timeline"
      className="relative overflow-hidden bg-black px-6 py-24 text-white md:px-10 lg:px-12 md:py-32"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div className="max-w-3xl" variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
            THE JOURNEY
          </p>
          <h2 className="font-satoshi mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Where I started, what I learned, where I&apos;m going.
          </h2>
        </motion.div>

        {/* Timeline Flow */}
        <div className="relative mt-14 md:mt-20">
          {/* Vertical Connecting Line */}
          <motion.div
            className="absolute bottom-10 left-[4.65rem] top-3 w-px origin-top bg-white/16 md:left-[11.9rem]"
            initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
            whileInView={lineAnimation}
            viewport={viewportConfig}
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {timeline.map((item, index) => {
              const showYear =
                index === 0 || item.startYear !== timeline[index - 1].startYear;
              const isUpcoming = Boolean(item.isUpcoming);

              return (
                <motion.article
                  key={item.id}
                  className="grid grid-cols-[4rem_1.25rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[10rem_1.8rem_minmax(0,1fr)] md:gap-x-6"
                  variants={fadeUp}
                >
                  {/* Year Indicator on the Left */}
                  <div className="pt-1 text-right">
                    {showYear ? (
                      <span className="font-mono text-2xl text-neutral-300 md:text-5xl">
                        {item.startYear}
                      </span>
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-700">
                        same year
                      </span>
                    )}
                  </div>

                  {/* Node Dot on the timeline bar */}
                  <div className="relative flex justify-center pt-2">
                    <span
                      className={`relative z-10 h-4 w-4 rounded-full border ${
                        isUpcoming
                          ? "border-emerald-300 bg-emerald-300"
                          : "border-white/45 bg-black"
                      }`}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Main Entry Content */}
                  <div
                    className={`border-t pt-5 ${
                      isUpcoming ? "border-emerald-300/35" : "border-white/14"
                    }`}
                  >
                    {/* Header: Label, Type & Status */}
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
                        {String(index + 1).padStart(2, "0")} / {item.type === "EDUCATION" ? "Education" : "Experience"}
                      </span>
                      {item.status ? (
                        <span className="border border-emerald-300/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                          {item.status}
                        </span>
                      ) : null}
                    </div>

                    {/* Title */}
                    <h3
                      className={`font-satoshi mt-4 text-2xl leading-tight tracking-tight text-white md:text-4xl ${
                        isUpcoming ? "font-semibold" : "font-medium"
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Organization / Company / Institution Name with embedded URL */}
                    {item.websiteUrl ? (
                      <div className="mt-2">
                        <a
                          href={item.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block font-satoshi text-lg font-medium text-neutral-200 transition-colors hover:text-white"
                          title={`Visit ${item.organization}`}
                        >
                          <span className="underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white">
                            {item.organization}
                          </span>
                        </a>
                      </div>
                    ) : (
                      <p className="font-satoshi mt-2 text-lg font-medium text-neutral-200">
                        {item.organization}
                      </p>
                    )}

                    {/* Metadata */}
                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">
                      <span>{item.dateRange}</span>
                      {item.location && <span>{item.location}</span>}
                    </div>

                    {/* Tags */}
                    {item.tags && item.tags.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {item.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="border border-white/20 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-neutral-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
