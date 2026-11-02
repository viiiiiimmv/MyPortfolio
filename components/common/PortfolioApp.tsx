"use client";

import React, { useEffect, useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Preloader from "@/components/common/Preloader";
import Navbar from "@/components/common/Navbar";
import CustomCursor from "@/components/common/CustomCursor";
import FixedSocialLinks from "@/components/common/FixedSocialLinks";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import UpcomingProjectsSection from "@/components/sections/UpcomingProjectsSection";
import TimelineSection from "@/components/sections/TimelineSection";
import CodeActivitySection from "@/components/sections/CodeActivitySection";
import ContactSection from "@/components/sections/ContactSection";
import {
  ProfileDTO,
  SkillDTO,
  ProjectDTO,
  NormalizedTimelineItem,
  GitHubContributionsDTO,
} from "@/types/portfolio";

export interface PortfolioInitialData {
  profile: ProfileDTO;
  skills: SkillDTO[];
  featuredProjects: ProjectDTO[];
  publishedProjects: ProjectDTO[];
  upcomingProjects: ProjectDTO[];
  timeline: NormalizedTimelineItem[];
  githubContributions: GitHubContributionsDTO;
}

interface PortfolioAppProps {
  initialData: PortfolioInitialData;
}

export default function PortfolioApp({ initialData }: PortfolioAppProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(15);
  const [statusMessage, setStatusMessage] = useState("INITIALIZING SYSTEM RUNTIME...");

  const {
    profile,
    skills,
    featuredProjects,
    publishedProjects,
    upcomingProjects,
    timeline,
    githubContributions,
  } = initialData;

  // Preload critical visual assets in the background prior to unveiling the UI
  useEffect(() => {
    let isCancelled = false;

    // 1. Collect critical image URLs to preload
    const imagesToPreload: string[] = [];
    if (profile?.profileImage?.cloudinaryUrl) {
      imagesToPreload.push(profile.profileImage.cloudinaryUrl);
    }
    if (featuredProjects && featuredProjects.length > 0) {
      for (const p of featuredProjects.slice(0, 2)) {
        if (p.projectImage?.cloudinaryUrl) {
          imagesToPreload.push(p.projectImage.cloudinaryUrl);
        }
      }
    }

    // Preload image promises
    const preloadImage = (src: string): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Don't block loading on image failure
      });

    // Choreographed progress milestone stages
    const runLoadingStages = async () => {
      // Stage 1: Protocol handshake
      if (isCancelled) return;
      setProgress(30);
      setStatusMessage("RESOLVING DEVELOPER PROFILE & CREDENTIALS...");
      await new Promise((r) => setTimeout(r, 260));

      // Stage 2: Tech stack & projects
      if (isCancelled) return;
      setProgress(58);
      setStatusMessage("INDEXING ARCHIVES & PRODUCTION REPOSITORIES...");
      await new Promise((r) => setTimeout(r, 300));

      // Stage 3: Timeline & metrics + asset caching
      if (isCancelled) return;
      setProgress(82);
      setStatusMessage("RESOLVING JOURNEY TIMELINE & GITHUB ACTIVITY...");
      
      // Concurrently ensure critical images are cached
      await Promise.all([
        ...imagesToPreload.map(preloadImage),
        new Promise((r) => setTimeout(r, 320)),
      ]);

      // Stage 4: Readiness completion
      if (isCancelled) return;
      setProgress(100);
      setStatusMessage("SYSTEM VERIFIED. ENTERING PORTFOLIO...");
      await new Promise((r) => setTimeout(r, 400));

      if (!isCancelled) {
        setIsLoading(false);
      }
    };

    runLoadingStages();

    return () => {
      isCancelled = true;
    };
  }, [profile, featuredProjects]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="global-preloader"
            initial={{ opacity: 1 }}
            exit={{
              y: "-100%",
              opacity: 0.95,
              transition: {
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="fixed inset-0 z-[100]"
          >
            <Preloader progress={progress} statusMessage={statusMessage} />
            {/* Emerald glowing horizon scan line on curtain sweep */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-400 shadow-[0_0_15px_#34d399]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Portfolio Container */}
      <motion.div
        className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Interactive custom cursor with spotlight */}
        <CustomCursor />

        {/* Ambient grid and spotlight overlays */}
        <div className="global-grid-overlay" aria-hidden="true" />
        <div className="global-spotlight-overlay" aria-hidden="true" />

        {/* Navigation Header */}
        <Navbar
          statusText={profile.availabilityStatus}
          resumeUrl={profile.resumeUrl?.link}
        />

        {/* Main Page Landmark */}
        <main id="main-content" tabIndex={-1} className="outline-none">
          {/* 1. Hero Section */}
          <HeroSection profile={profile} />

          {/* 2. About Section */}
          <AboutSection profile={profile} skills={skills} />

          {/* 3. Projects Section */}
          <ProjectsSection
            featuredProjects={featuredProjects}
            publishedProjects={publishedProjects}
          />

          {/* 4. Upcoming Projects Section */}
          <UpcomingProjectsSection upcomingProjects={upcomingProjects} />

          {/* 5. Timeline Section */}
          <TimelineSection timeline={timeline} />

          {/* 6. Code Activity & Algorithmic Rigor */}
          <CodeActivitySection githubContributions={githubContributions} />

          {/* 7. Contact Form & Pinned Socials */}
          <ContactSection profile={profile} />
        </main>

        {/* Fixed pinned social links dock */}
        <FixedSocialLinks socialLinks={profile.socialLinks} />
      </motion.div>
    </>
  );
}

