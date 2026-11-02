"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, BookOpen, X, ChevronRight, Sparkles } from "lucide-react";
import { GithubIcon } from "@/components/common/Icons";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectDTO } from "@/types/portfolio";
import { resolveProjectSkills } from "@/services/api";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "@/lib/motion";

interface ProjectsSectionProps {
  featuredProjects: ProjectDTO[];
  publishedProjects: ProjectDTO[];
}

export default function ProjectsSection({
  featuredProjects,
  publishedProjects,
}: ProjectsSectionProps) {
  const [activeAccordionIndex, setActiveAccordionIndex] = useState<number | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const seeAllButtonRef = useRef<HTMLButtonElement>(null);

  // Close modal handler
  const closeModal = () => {
    setIsModalOpen(false);
    window.requestAnimationFrame(() => seeAllButtonRef.current?.focus());
  };

  // Keyboard accessibility for modal (Esc, Tab trapping)
  useEffect(() => {
    if (!isModalOpen) return undefined;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }

      if (e.key !== "Tab" || !modalRef.current) return;

      const focusable = modalRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  // Combine list for showcase accordion (featured first, then published)
  const showcaseList = featuredProjects.length > 0 ? featuredProjects : publishedProjects;

  return (
    <motion.section
      id="projects"
      className="relative w-full overflow-hidden bg-black py-24 text-white md:py-32"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      <div className="px-6 md:px-10 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Section Header */}
          <motion.div className="max-w-3xl" variants={fadeUp}>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
              BUILT & SHIPPED
            </p>
            <h2 className="font-satoshi mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
              Things I&apos;ve designed, built, and shipped.
            </h2>
          </motion.div>
        </div>
      </div>

      {/* Featured Projects Accordion / Interactive List */}
      <motion.div className="mt-14 w-full border-t border-white/15" variants={fadeUp}>
        {showcaseList.map((project, index) => {
          const isActive = activeAccordionIndex === index;
          const imgUrl = project.projectImage?.cloudinaryUrl;
          const skillsList = resolveProjectSkills(project);

          return (
            <article key={project.publicId || index} className="border-b border-white/15">
              <button
                type="button"
                onClick={() =>
                  setActiveAccordionIndex((curr) => (curr === index ? null : index))
                }
                aria-expanded={isActive}
                className={`group grid w-full grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-4 px-6 py-7 text-left transition-colors duration-300 md:grid-cols-[6rem_minmax(0,1fr)_minmax(8rem,16rem)] md:px-10 lg:px-12 md:py-8 ${
                  isActive
                    ? "bg-white text-black"
                    : "bg-transparent text-white hover:bg-white hover:text-black"
                }`}
              >
                <span
                  className={`font-mono text-xl transition-colors duration-300 md:text-3xl ${
                    isActive
                      ? "text-emerald-300 font-semibold"
                      : "text-neutral-500 group-hover:text-black"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="min-w-0">
                  <span
                    className={`font-satoshi block truncate text-2xl uppercase tracking-tight transition-[font-weight] duration-300 md:text-5xl ${
                      isActive
                        ? "font-semibold text-black"
                        : "font-normal text-white group-hover:text-black"
                    }`}
                  >
                    {project.title}
                  </span>
                  <span
                    className={`font-satoshi mt-1 block truncate text-xs md:hidden ${
                      isActive
                        ? "text-neutral-700"
                        : "text-neutral-400 group-hover:text-neutral-700"
                    }`}
                  >
                    {project.shortDescription}
                  </span>
                </div>

                <div
                  className={`col-start-2 flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] md:col-start-auto md:justify-end ${
                    isActive
                      ? "text-neutral-800"
                      : "text-neutral-500 group-hover:text-neutral-800"
                  }`}
                >
                  <span>{project.category}</span>
                  <ChevronRight
                    className={`ml-3 h-4 w-4 transition-transform duration-300 ${
                      isActive
                        ? "rotate-90 text-black"
                        : "text-neutral-400 group-hover:text-black"
                    }`}
                  />
                </div>
              </button>

              {/* Collapsible Panel */}
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden bg-neutral-950/60"
                  >
                    <div className="px-6 py-8 md:px-10 lg:px-12 md:py-10">
                      <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
                        {/* Project Preview Image */}
                        {imgUrl ? (
                          <div className="md:col-span-5">
                            <div className="aspect-[16/10] overflow-hidden border border-white/15 bg-neutral-950">
                              <Image
                                src={imgUrl}
                                alt={project.title ? `${project.title} — Architectural preview` : "Engineering project architecture preview"}
                                width={800}
                                height={500}
                                priority={index === 0}
                                unoptimized
                                className="h-full w-full object-cover"
                              />
                            </div>
                          </div>
                        ) : null}

                        {/* Project Details */}
                        <div className={imgUrl ? "md:col-span-7 flex flex-col justify-center" : "col-span-12"}>
                          <p className="font-satoshi text-base leading-relaxed text-neutral-300 md:text-lg">
                            {project.shortDescription}
                          </p>

                          {/* Tech Stack Badges */}
                          {skillsList.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-2">
                              {skillsList.map((skill) => (
                                <span
                                  key={skill.publicId || skill.name}
                                  className="border border-white/20 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-300"
                                >
                                  {skill.name}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Action Links */}
                          <div className="mt-7 flex flex-wrap gap-3">
                            {project.liveUrl?.link && (
                              <motion.a
                                href={project.liveUrl.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 border border-white/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-black"
                                whileHover={subtleHover}
                                whileTap={subtlePress}
                              >
                                <ExternalLink className="h-3.5 w-3.5" />
                                Live Demo
                              </motion.a>
                            )}

                            {project.githubUrl?.link && (
                              <motion.a
                                href={project.githubUrl.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 border border-white/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-black"
                                whileHover={subtleHover}
                                whileTap={subtlePress}
                              >
                                <GithubIcon className="h-3.5 w-3.5" size={14} />
                                Repository
                              </motion.a>
                            )}

                            {project.documentationUrl?.link && (
                              <motion.a
                                href={project.documentationUrl.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 border border-white/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-black"
                                whileHover={subtleHover}
                                whileTap={subtlePress}
                              >
                                <BookOpen className="h-3.5 w-3.5" />
                                Documentation
                              </motion.a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </motion.div>

      {/* Button to see all published projects */}
      <motion.div className="mt-12 flex justify-center px-5" variants={fadeUp}>
        <motion.button
          ref={seeAllButtonRef}
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="border border-white/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black inline-flex items-center gap-3"
          whileHover={subtleHover}
          whileTap={subtlePress}
        >
          <span>See All Published Projects ({publishedProjects.length})</span>
          <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </motion.button>
      </motion.div>

      {/* Modal: All Published Projects */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) closeModal();
            }}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="all-projects-title"
              initial={{ scale: 0.98, opacity: 0, y: 18 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative max-h-[88vh] w-full max-w-5xl overflow-y-auto border border-white/18 bg-black p-5 text-white outline-none md:p-7"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-5">
                <div>
                  <p
                    id="all-projects-title"
                    className="font-mono text-sm uppercase tracking-[0.24em] text-white"
                  >
                    ALL PROJECTS
                  </p>
                  <p className="font-satoshi mt-2 text-sm text-neutral-400">
                    Comprehensive catalogue of production & open-source work.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close all projects"
                  className="flex h-10 w-10 items-center justify-center border border-white/20 text-neutral-300 transition-colors hover:bg-white hover:text-black"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              {/* Modal Scrollable Content */}
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {publishedProjects.map((proj, idx) => {
                  const img = proj.projectImage?.cloudinaryUrl;
                  const skills = resolveProjectSkills(proj);

                  return (
                    <article
                      key={proj.publicId || idx}
                      className="flex min-h-56 flex-col border border-white/14 p-5 transition-colors hover:border-white/40"
                    >
                      <div>
                        {img && (
                          <div className="mb-4 aspect-[16/9] w-full overflow-hidden border border-white/15 bg-neutral-950">
                            <Image
                              src={img}
                              alt={proj.title ? `${proj.title} — System showcase preview` : "Engineering project showcase preview"}
                              width={800}
                              height={450}
                              unoptimized
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-400">
                            {proj.category}
                          </span>
                          {proj.isFeatured && (
                            <span className="flex items-center gap-1 font-mono text-[10px] uppercase text-white">
                              <Sparkles className="h-3 w-3" /> Featured
                            </span>
                          )}
                        </div>
                        <h3 className="font-satoshi mt-2 text-xl font-normal leading-tight text-white">
                          {proj.title}
                        </h3>
                        <p className="font-satoshi mt-3 text-sm leading-relaxed text-neutral-300">
                          {proj.shortDescription || proj.description}
                        </p>

                        {skills.length > 0 && (
                          <p className="mt-4 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-neutral-400">
                            {skills.map((s) => s.name).join(" / ")}
                          </p>
                        )}
                      </div>

                      <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-6">
                        {proj.liveUrl?.link && (
                          <a
                            href={proj.liveUrl.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:text-neutral-300"
                          >
                            Live Demo
                            <ExternalLink size={12} strokeWidth={1.7} />
                          </a>
                        )}
                        {proj.githubUrl?.link && (
                          <a
                            href={proj.githubUrl.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-400 transition-colors hover:text-white"
                          >
                            GitHub
                            <ExternalLink size={12} strokeWidth={1.7} />
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
