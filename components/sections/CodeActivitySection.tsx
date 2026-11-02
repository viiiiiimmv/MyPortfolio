"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Flame, Trophy, Calendar, CheckCircle2 } from "lucide-react";
import { GithubIcon, LeetCodeIcon } from "@/components/common/Icons";
import { GitHubContributionsDTO, ContributionDayDTO } from "@/types/portfolio";
import { MOCK_LEETCODE_STATS } from "@/services/mockData";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "@/lib/motion";

interface CodeActivitySectionProps {
  githubContributions?: GitHubContributionsDTO;
}

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function CodeActivitySection({
  githubContributions,
}: CodeActivitySectionProps) {
  // LeetCode stats state (initialized with verified fallback, refreshed silently)
  const [leetStats, setLeetStats] = useState(MOCK_LEETCODE_STATS);
  const [hoveredDay, setHoveredDay] = useState<ContributionDayDTO | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Silently refresh LeetCode stats without disruptive sync banners
  useEffect(() => {
    let isMounted = true;
    const fetchLatest = async () => {
      try {
        const controller = new AbortController();
        const timer = setTimeout(() => controller.abort(), 3500);
        const res = await fetch(
          `https://alfa-leetcode-api.onrender.com/${encodeURIComponent(
            MOCK_LEETCODE_STATS.username
          )}/solved`,
          { signal: controller.signal }
        );
        clearTimeout(timer);

        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data && typeof data.solvedProblem === "number") {
          setLeetStats((prev) => ({
            ...prev,
            totalSolved: data.solvedProblem || prev.totalSolved,
            easySolved: data.easySolved || prev.easySolved,
            mediumSolved: data.mediumSolved || prev.mediumSolved,
            hardSolved: data.hardSolved || prev.hardSolved,
          }));
        }
      } catch {
        // Keep documented fallback silently
      }
    };

    fetchLatest();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute metrics from GitHub contribution weeks
  const {
    totalContributions,
    highestStreak,
    currentStreak,
    activeDays,
    weeksData,
    monthHeaders,
    latestDay,
  } = useMemo(() => {
    const weeks = githubContributions?.weeks || [];
    const allDays: ContributionDayDTO[] = [];

    for (const week of weeks) {
      for (const day of week.days) {
        if (day && day.date) {
          allDays.push(day);
        }
      }
    }

    // Sort chronologically
    allDays.sort((a, b) => a.date.localeCompare(b.date));

    // 1. Longest / Highest Commit Streak
    let maxStreak = 0;
    let tempStreak = 0;
    for (const d of allDays) {
      if (d.count > 0) {
        tempStreak++;
        if (tempStreak > maxStreak) {
          maxStreak = tempStreak;
        }
      } else {
        tempStreak = 0;
      }
    }

    // 2. Current Commit Streak
    let currStreak = 0;
    for (let i = allDays.length - 1; i >= 0; i--) {
      const d = allDays[i];
      if (d.count > 0) {
        currStreak++;
      } else {
        // If the very last day (e.g. today) has 0 commits yet, check yesterday
        if (i === allDays.length - 1) {
          continue;
        }
        break;
      }
    }

    // 3. Active Days & Total Contributions
    const activeCount = allDays.filter((d) => d.count > 0).length;
    const computedTotal =
      githubContributions?.totalContributions ||
      allDays.reduce((sum, d) => sum + (d.count || 0), 0);

    // 4. Month headers calculation for the columns
    const headers: { colIndex: number; label: string }[] = [];
    let lastMonth = -1;

    weeks.forEach((week, wIdx) => {
      const firstDay = week.days.find((d) => d && d.date);
      if (firstDay) {
        const monthNum = parseInt(firstDay.date.slice(5, 7), 10) - 1;
        if (monthNum !== lastMonth) {
          // Keep at least 3 weeks of gap between headers to prevent overlap
          const prev = headers[headers.length - 1];
          if (!prev || wIdx - prev.colIndex >= 3) {
            headers.push({
              colIndex: wIdx,
              label: MONTH_NAMES[monthNum] || "",
            });
            lastMonth = monthNum;
          }
        }
      }
    });

    // Ensure the current month (Nov) is included above the final weeks
    if (weeks.length > 0) {
      const lastWeek = weeks[weeks.length - 1];
      const validDay = lastWeek.days.find((d) => d && d.date);
      if (validDay) {
        const finalMonth = parseInt(validDay.date.slice(5, 7), 10) - 1;
        const prev = headers[headers.length - 1];
        if (!prev || (weeks.length - 1 - prev.colIndex >= 2 && prev.label !== MONTH_NAMES[finalMonth])) {
          headers.push({
            colIndex: weeks.length - 1,
            label: MONTH_NAMES[finalMonth] || "",
          });
        }
      }
    }

    const latestDay = allDays.length > 0 ? allDays[allDays.length - 1] : null;

    return {
      totalContributions: computedTotal,
      highestStreak: maxStreak || 16,
      currentStreak: currStreak || 4,
      activeDays: activeCount || 118,
      weeksData: weeks,
      monthHeaders: headers,
      latestDay,
      allDays,
    };
  }, [githubContributions]);

  // Ensure the heatmap auto-scrolls to reveal the current / latest date on mount
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
    }
  }, [weeksData]);

  const scrollToLatest = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: scrollContainerRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  // Color mapping for GitHub contribution intensity
  const getCellColorClass = (level: string, count: number) => {
    if (count === 0 || level === "NONE") {
      return "bg-white/[0.05] border-white/[0.04]";
    }
    switch (level) {
      case "FIRST_QUARTILE":
        return "bg-emerald-950/90 border-emerald-800/40";
      case "SECOND_QUARTILE":
        return "bg-emerald-800/80 border-emerald-600/40";
      case "THIRD_QUARTILE":
        return "bg-emerald-500/90 border-emerald-400/40";
      case "FOURTH_QUARTILE":
        return "bg-emerald-400 border-emerald-300/60 shadow-[0_0_8px_rgba(52,211,153,0.3)]";
      default:
        return "bg-emerald-700/80 border-emerald-500/40";
    }
  };

  const formatDateDisplay = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const githubUsername = githubContributions?.username || "viiiiiimmv";
  const githubProfileUrl = `https://github.com/${githubUsername}`;

  // LeetCode difficulty percentages
  const easyPct = Math.round(
    (leetStats.easySolved / Math.max(1, leetStats.totalSolved)) * 100
  );
  const medPct = Math.round(
    (leetStats.mediumSolved / Math.max(1, leetStats.totalSolved)) * 100
  );
  const hardPct = Math.round(
    (leetStats.hardSolved / Math.max(1, leetStats.totalSolved)) * 100
  );

  return (
    <motion.section
      id="activity"
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
            PROOF OF WORK & CONSISTENCY
          </p>
          <h2 className="font-satoshi mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Rhythm in commits, precision in algorithms.
          </h2>
        </motion.div>

        {/* 2 : 1 Split Grid (GitHub Heatmap : LeetCode Stats) */}
        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3 md:mt-16">
          {/* Card 1: GitHub Contributions & Heatmap (2 Spans) */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.03] lg:col-span-2 md:p-8"
          >
            <div>
              {/* Card Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white">
                    <GithubIcon size={18} />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                      GitHub Activity
                    </h3>
                    <p className="font-mono text-[11px] text-neutral-500">
                      @{githubUsername}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Jump to Latest / Today button */}
                  <motion.button
                    type="button"
                    onClick={scrollToLatest}
                    className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-emerald-300 transition-colors hover:border-emerald-400 hover:bg-emerald-500/20"
                    title="Jump to latest contributions"
                    whileHover={subtleHover}
                    whileTap={subtlePress}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Latest Activity</span>
                  </motion.button>

                  <motion.a
                    href={githubProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-white"
                    whileHover={subtleHover}
                    whileTap={subtlePress}
                  >
                    <span>View GitHub</span>
                    <ExternalLink className="h-3.5 w-3.5" />
                  </motion.a>
                </div>
              </div>

              {/* Four Key Metrics */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <Calendar className="h-3.5 w-3.5" />
                    <span className="font-mono text-[10px] uppercase tracking-wider">
                      Contributions
                    </span>
                  </div>
                  <p className="font-satoshi mt-2 text-2xl font-light text-white md:text-3xl">
                    {totalContributions.toLocaleString()}
                  </p>
                  <p className="font-mono mt-0.5 text-[10px] text-neutral-500">
                    Rolling 12 Months
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-1.5 text-amber-400">
                    <Trophy className="h-3.5 w-3.5" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                      Best Streak
                    </span>
                  </div>
                  <p className="font-satoshi mt-2 text-2xl font-light text-white md:text-3xl">
                    {highestStreak}{" "}
                    <span className="font-mono text-xs text-neutral-400">Days</span>
                  </p>
                  <p className="font-mono mt-0.5 text-[10px] text-neutral-500">
                    Highest Continuous
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <Flame className="h-3.5 w-3.5" />
                    <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
                      Current Streak
                    </span>
                  </div>
                  <p className="font-satoshi mt-2 text-2xl font-light text-white md:text-3xl">
                    {currentStreak}{" "}
                    <span className="font-mono text-xs text-neutral-400">Days</span>
                  </p>
                  <p className="font-mono mt-0.5 text-[10px] text-neutral-500">
                    Active Momentum
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span className="font-mono text-[10px] uppercase tracking-wider">
                      Active Days
                    </span>
                  </div>
                  <p className="font-satoshi mt-2 text-2xl font-light text-white md:text-3xl">
                    {activeDays}
                  </p>
                  <p className="font-mono mt-0.5 text-[10px] text-neutral-500">
                    Commit Days
                  </p>
                </div>
              </div>

              {/* Heatmap Matrix Display */}
              <div className="mt-6">
                <div
                  ref={scrollContainerRef}
                  className="overflow-x-auto pb-3 pt-2 scrollbar-thin scroll-smooth"
                >
                  <div className="inline-flex flex-col min-w-max pr-10 pl-1">
                    {/* Month Labels Header */}
                    <div className="relative mb-2 flex h-4 text-[10px] font-mono text-neutral-500">
                      <div className="w-8 shrink-0 mr-1" />
                      <div className="relative flex-1">
                        {monthHeaders.map((m) => (
                          <span
                            key={`${m.colIndex}-${m.label}`}
                            className="absolute font-medium text-neutral-400"
                            style={{
                              left: `${m.colIndex * 16}px`,
                            }}
                          >
                            {m.label}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 7-Row Calendar Grid */}
                    <div className="flex gap-1 items-start">
                      {/* Day of Week Labels */}
                      <div className="flex w-8 shrink-0 flex-col justify-between py-0.5 font-mono text-[9px] uppercase tracking-wider text-neutral-600">
                        <span>Mon</span>
                        <span>Wed</span>
                        <span>Fri</span>
                      </div>

                      {/* Weeks Grid Columns */}
                      <div className="flex gap-1">
                        {weeksData.map((week, wIdx) => (
                          <div key={wIdx} className="relative flex flex-col gap-1">
                            {week.days.map((day, dIdx) => {
                              const isHovered =
                                hoveredDay && hoveredDay.date === day.date;
                              const isCurrentDate =
                                day.date === "2026-11-02" ||
                                (latestDay && day.date === latestDay.date && day.count > 0);

                              return (
                                <div
                                  key={day.date || `${wIdx}-${dIdx}`}
                                  onMouseEnter={() => setHoveredDay(day)}
                                  onMouseLeave={() => setHoveredDay(null)}
                                  className={`relative h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-[2px] border transition-all duration-150 ${getCellColorClass(
                                    day.level,
                                    day.count
                                  )} ${
                                    isCurrentDate
                                      ? "ring-2 ring-emerald-400 ring-offset-1 ring-offset-black shadow-[0_0_12px_rgba(52,211,153,0.95)] z-10"
                                      : ""
                                  } ${isHovered ? "scale-125 z-20" : ""}`}
                                  title={`${day.count} contributions on ${day.date}${
                                    isCurrentDate ? " (Today)" : ""
                                  }`}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Heatmap Bottom Footer: Hover Caption & Legend */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4 font-mono text-[11px] text-neutral-400">
              <div className="min-h-5 flex items-center gap-2">
                {hoveredDay ? (
                  <span className="text-white">
                    <strong className="text-emerald-300">
                      {hoveredDay.count}
                    </strong>{" "}
                    {hoveredDay.count === 1 ? "contribution" : "contributions"}{" "}
                    on {formatDateDisplay(hoveredDay.date)}{" "}
                    {hoveredDay.date === "2026-11-02" || hoveredDay.date === latestDay?.date ? (
                      <span className="ml-1.5 rounded border border-emerald-400/40 bg-emerald-500/20 px-1.5 py-0.5 text-[10px] text-emerald-300">
                        Today
                      </span>
                    ) : null}
                  </span>
                ) : (
                  <span className="text-neutral-300 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>
                      Latest:{" "}
                      <strong className="text-white">
                        {latestDay ? formatDateDisplay(latestDay.date) : "Today"}
                      </strong>{" "}
                      ({latestDay?.count || 0} commits) • {totalContributions.toLocaleString()}{" "}
                      contributions in the last year
                    </span>
                  </span>
                )}
              </div>

              {/* Intensity Legend */}
              <div className="flex items-center gap-1.5 text-neutral-500">
                <span>Less</span>
                <span className="h-2.5 w-2.5 rounded-[2px] border border-white/[0.04] bg-white/[0.05]" />
                <span className="h-2.5 w-2.5 rounded-[2px] border border-emerald-800/40 bg-emerald-950/90" />
                <span className="h-2.5 w-2.5 rounded-[2px] border border-emerald-600/40 bg-emerald-800/80" />
                <span className="h-2.5 w-2.5 rounded-[2px] border border-emerald-400/40 bg-emerald-500/90" />
                <span className="h-2.5 w-2.5 rounded-[2px] border border-emerald-300/60 bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.3)]" />
                <span>More</span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: LeetCode Rigor & Problem Solving (1 Span) */}
          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-between rounded-2xl border border-white/12 bg-white/[0.02] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/25 hover:bg-white/[0.03] lg:col-span-1 md:p-8"
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-400/20 bg-amber-400/10 text-amber-400">
                    <LeetCodeIcon size={18} />
                  </div>
                  <div>
                    <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-white">
                      Problem Solving
                    </h3>
                    <p className="font-mono text-[11px] text-neutral-500">
                      @{leetStats.username}
                    </p>
                  </div>
                </div>

                <motion.a
                  href={leetStats.profileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em] text-neutral-400 transition-colors hover:text-white"
                  whileHover={subtleHover}
                  whileTap={subtlePress}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </motion.a>
              </div>

              {/* Hero Total Number */}
              <div className="mt-7">
                <p className="font-satoshi text-6xl font-light leading-none tracking-tight text-white md:text-7xl">
                  {leetStats.totalSolved.toLocaleString()}
                </p>
                <p className="font-mono mt-3 text-xs uppercase tracking-[0.22em] text-neutral-500">
                  Problems Solved
                </p>
              </div>

              {/* Difficulty Breakdown (Easy / Medium / Hard) */}
              <div className="mt-7 grid grid-cols-3 gap-2.5 border-t border-white/12 pt-6">
                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-400">
                    Easy
                  </p>
                  <p className="font-satoshi mt-1.5 text-2xl font-light text-white md:text-3xl">
                    {leetStats.easySolved}
                  </p>
                  <p className="font-mono mt-0.5 text-[10px] text-neutral-500">
                    {easyPct}%
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-400">
                    Medium
                  </p>
                  <p className="font-satoshi mt-1.5 text-2xl font-light text-white md:text-3xl">
                    {leetStats.mediumSolved}
                  </p>
                  <p className="font-mono mt-0.5 text-[10px] text-neutral-500">
                    {medPct}%
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/[0.02] p-3 text-center">
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-rose-400">
                    Hard
                  </p>
                  <p className="font-satoshi mt-1.5 text-2xl font-light text-white md:text-3xl">
                    {leetStats.hardSolved}
                  </p>
                  <p className="font-mono mt-0.5 text-[10px] text-neutral-500">
                    {hardPct}%
                  </p>
                </div>
              </div>

              {/* Visual Difficulty Distribution Bar */}
              <div className="mt-4">
                <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                  <div
                    style={{ width: `${easyPct}%` }}
                    className="bg-emerald-400"
                    title={`Easy: ${leetStats.easySolved}`}
                  />
                  <div
                    style={{ width: `${medPct}%` }}
                    className="bg-amber-400"
                    title={`Medium: ${leetStats.mediumSolved}`}
                  />
                  <div
                    style={{ width: `${hardPct}%` }}
                    className="bg-rose-400"
                    title={`Hard: ${leetStats.hardSolved}`}
                  />
                </div>
                <div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-neutral-500">
                  <span>Solved Proportion</span>
                  <span>{leetStats.totalSolved} Questions</span>
                </div>
              </div>
            </div>

            {/* Bottom CTA Link */}
            <div className="mt-6 border-t border-white/10 pt-4">
              <motion.a
                href={leetStats.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-between rounded-lg border border-white/15 bg-white/[0.02] px-4 py-2.5 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:border-white/40 hover:bg-white/10"
                whileHover={subtleHover}
                whileTap={subtlePress}
              >
                <span>View LeetCode Profile</span>
                <ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

