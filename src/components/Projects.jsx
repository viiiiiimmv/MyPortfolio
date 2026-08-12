import { useEffect, useMemo, useRef, useState } from "react";
import { X, ExternalLink } from "lucide-react";
import {
  motion as Motion,
  AnimatePresence,
  useReducedMotion,
} from "framer-motion";
import projects from "../assets/data/projectsData";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "../lib/motion";

const PROJECT_LIMIT = 4;

const getProjectName = (project) => project.title || project.name;

const getProjectCategory = (project) =>
  project.category || project.type || project.role || project.domain;

const getProjectTech = (project) =>
  project.technologies || project.tech || project.stack || project.skills || [];

const getProjectLinks = (project) =>
  [
    project.github && { text: "GitHub", url: project.github },
    project.githubUrl && { text: "GitHub", url: project.githubUrl },
    project.repo && { text: "GitHub", url: project.repo },
    project.live && { text: "Live Demo", url: project.live },
    project.demo && { text: "Live Demo", url: project.demo },
    project.url && { text: "Live Demo", url: project.url },
    project.caseStudy && { text: "Case Study", url: project.caseStudy },
    project.caseStudyUrl && { text: "Case Study", url: project.caseStudyUrl },
    ...(Array.isArray(project.links) ? project.links : []),
  ].filter((link) => link?.url && link.url !== "#");

const selectShowcaseProjects = (projectList) => {
  const featuredProjects = projectList.filter(
    (project) => project.featured || project.isFeatured
  );

  return (featuredProjects.length ? featuredProjects : projectList).slice(
    0,
    PROJECT_LIMIT
  );
};

export default function ProjectsSection() {
  const showcaseProjects = useMemo(() => selectShowcaseProjects(projects), []);
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  const seeAllButtonRef = useRef(null);

  const modalTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.28, ease: [0.22, 1, 0.36, 1] };

  const closeModal = () => {
    setIsModalOpen(false);
    window.requestAnimationFrame(() => seeAllButtonRef.current?.focus());
  };

  useEffect(() => {
    if (!isModalOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeModal();
        return;
      }

      if (event.key !== "Tab" || !modalRef.current) return;

      const focusableElements = modalRef.current.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      }

      if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  if (!showcaseProjects.length) return null;

  return (
    <Motion.section
      id="projects"
      className="relative w-screen overflow-hidden bg-black py-20 text-white md:py-28"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      <Motion.div className="px-5 md:px-10" variants={fadeUp}>
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
          BUILT & SHIPPED
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          Things I've designed, built, and shipped.
        </h2>
      </Motion.div>

      <Motion.div className="mt-12 w-full border-t border-white/20" variants={fadeUp}>
        {showcaseProjects.map((project, index) => {
          const name = getProjectName(project);
          const category = getProjectCategory(project);
          const tech = getProjectTech(project);
          const links = getProjectLinks(project);
          const isActive = activeIndex === index;

          return (
            <article key={name || index} className="border-b border-white/20">
              <button
                type="button"
                className="grid w-full grid-cols-[3.75rem_minmax(0,1fr)] items-center gap-4 px-5 py-6 text-left transition-colors duration-300 hover:bg-white hover:text-black md:grid-cols-[6rem_minmax(0,1fr)_minmax(8rem,18rem)] md:px-10 md:py-8"
                onClick={() =>
                  setActiveIndex((currentIndex) =>
                    currentIndex === index ? null : index
                  )
                }
                aria-expanded={isActive}
                aria-controls={`project-panel-${index}`}
              >
                <span
                  className={`font-mono text-xl transition-colors duration-300 md:text-3xl ${
                    isActive ? "text-emerald-300" : "text-current/60"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                {name ? (
                  <span
                    className={`min-w-0 text-2xl uppercase leading-tight tracking-normal transition-[font-weight] duration-300 md:text-5xl ${
                      isActive ? "font-semibold" : "font-normal"
                    }`}
                  >
                    {name}
                  </span>
                ) : null}
                {category ? (
                  <span className="col-start-2 font-mono text-xs uppercase tracking-[0.18em] text-current/60 md:col-start-auto md:text-right">
                    {category}
                  </span>
                ) : null}
              </button>

              <AnimatePresence initial={false}>
                {isActive ? (
                  <Motion.div
                    id={`project-panel-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-8 px-5 pb-8 md:grid-cols-[minmax(20rem,0.82fr)_1fr] md:px-10 md:pb-10">
                      {project.image ? (
                        <div className="aspect-[16/10] overflow-hidden border border-white/15 bg-neutral-950">
                          <img
                            src={project.image}
                            alt={name || "Project preview"}
                            loading={index === 0 ? "eager" : "lazy"}
                            decoding="async"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ) : null}

                      <div className="flex min-w-0 flex-col justify-center">
                        {project.description ? (
                          <p className="max-w-4xl text-base leading-relaxed text-neutral-300 md:text-lg">
                            {project.description}
                          </p>
                        ) : null}

                        {tech.length ? (
                          <div className="mt-6 flex flex-wrap gap-2">
                            {tech.map((item) => (
                              <span
                                key={`${name || index}-${item}`}
                                className="border border-white/20 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-neutral-300"
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        ) : null}

                        {links.length ? (
                          <div className="mt-7 flex flex-wrap gap-3">
                            {links.map((link) => (
                              <Motion.a
                                key={`${name || index}-${link.text}-${link.url}`}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="border border-white/25 px-4 py-2 font-mono text-xs uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-black"
                                whileHover={subtleHover}
                                whileTap={subtlePress}
                              >
                                {link.text}
                              </Motion.a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </Motion.div>
                ) : null}
              </AnimatePresence>
            </article>
          );
        })}
      </Motion.div>

      <Motion.div className="mt-12 flex justify-center px-5" variants={fadeUp}>
        <Motion.button
          ref={seeAllButtonRef}
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="border border-white/30 px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-white hover:text-black"
          whileHover={subtleHover}
          whileTap={subtlePress}
        >
          SEE ALL PROJECTS
        </Motion.button>
      </Motion.div>

      <AnimatePresence>
        {isModalOpen ? (
          <Motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/82 px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={modalTransition}
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) closeModal();
            }}
          >
            <Motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="all-projects-title"
              className="max-h-[88vh] w-full max-w-5xl overflow-y-auto border border-white/18 bg-black p-5 text-white outline-none md:p-7"
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 18, scale: 0.98 }
              }
              animate={
                shouldReduceMotion ? false : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                shouldReduceMotion ? false : { opacity: 0, y: 12, scale: 0.98 }
              }
              transition={modalTransition}
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-5">
                <div>
                  <p
                    id="all-projects-title"
                    className="font-mono text-sm uppercase tracking-[0.24em] text-emerald-300"
                  >
                    ALL PROJECTS
                  </p>
                  <p className="mt-2 text-sm text-neutral-400">
                    Compact archive from the same project source.
                  </p>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeModal}
                  className="flex h-10 w-10 items-center justify-center border border-white/20 text-neutral-300 transition-colors hover:bg-white hover:text-black"
                  aria-label="Close all projects"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {projects.map((project, index) => {
                  const name = getProjectName(project);
                  const tech = getProjectTech(project);
                  const links = getProjectLinks(project);

                  return (
                    <article
                      key={`${name || "project"}-${index}`}
                      className="flex min-h-56 flex-col border border-white/14 p-5 transition-colors hover:border-emerald-300/45"
                    >
                      {name ? (
                        <h3 className="text-xl font-normal leading-tight text-white">
                          {name}
                        </h3>
                      ) : null}

                      {project.description ? (
                        <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                          {project.description}
                        </p>
                      ) : null}

                      {tech.length ? (
                        <p className="mt-5 font-mono text-[11px] uppercase leading-relaxed tracking-[0.12em] text-neutral-400">
                          {tech.join(" / ")}
                        </p>
                      ) : null}

                      {links.length ? (
                        <div className="mt-auto flex flex-wrap gap-x-4 gap-y-2 pt-6">
                          {links.map((link) => (
                            <a
                              key={`${name || index}-${link.text}-${link.url}`}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-emerald-300 transition-colors hover:text-white"
                            >
                              {link.text}
                              <ExternalLink size={12} strokeWidth={1.7} />
                            </a>
                          ))}
                        </div>
                      ) : null}
                    </article>
                  );
                })}
              </div>
            </Motion.div>
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </Motion.section>
  );
}
