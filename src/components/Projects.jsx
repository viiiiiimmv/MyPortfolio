import { useEffect, useState } from "react";
import { motion as Motion } from "framer-motion";
import projects from "../assets/data/projectsData";
import {
  fadeUp,
  sectionReveal,
  subtleHover,
  subtlePress,
  viewportConfig,
} from "../lib/motion";

const AUTO_ROTATE_MS = 5200;

const wrapIndex = (value, total) => {
  if (total <= 0) return 0;
  return (value + total) % total;
};

const getCircularOffset = (index, activeIndex, total) => {
  let offset = index - activeIndex;
  const half = total / 2;

  if (offset > half) offset -= total;
  if (offset < -half) offset += total;

  return offset;
};

export default function ProjectsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = projects.length;
  const activeProject = projects[activeIndex];

  useEffect(() => {
    if (isPaused || total <= 1) return undefined;

    const interval = setInterval(() => {
      setActiveIndex((prev) => wrapIndex(prev + 1, total));
    }, AUTO_ROTATE_MS);

    return () => clearInterval(interval);
  }, [isPaused, total]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        setActiveIndex((prev) => wrapIndex(prev + 1, total));
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        setActiveIndex((prev) => wrapIndex(prev - 1, total));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [total]);

  if (!activeProject) return null;

  return (
    <Motion.section
      id="projects"
      className="relative min-h-screen overflow-hidden bg-black text-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      <Motion.div
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-6 py-16 md:px-10"
        variants={fadeUp}
      >
        <Motion.div
          className="mb-8 flex flex-wrap items-end justify-between gap-4"
          variants={fadeUp}
        >
          <div>
            <Motion.p
              className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500"
              variants={fadeUp}
            >
              Projects / Interactive Deck
            </Motion.p>
            <Motion.h2
              className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl"
              variants={fadeUp}
            >
              Explore my work in motion.
            </Motion.h2>
          </div>

          <Motion.p
            className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-600"
            variants={fadeUp}
          >
            {isPaused ? "Deck paused on hover" : "Deck auto cycling"}
          </Motion.p>
        </Motion.div>

        <div className="relative mx-auto h-[23rem] w-full max-w-6xl md:h-[27rem]">
          {projects.map((project, index) => {
            const offset = getCircularOffset(index, activeIndex, total);
            const distance = Math.abs(offset);
            const isActive = offset === 0;
            const shouldRender = distance <= 2;

            if (!shouldRender) return null;

            const x = offset * 44;
            const y = distance * 16;
            const scale = isActive ? 1 : Math.max(0.64, 1 - distance * 0.16);
            const opacity = isActive ? 1 : Math.max(0.22, 0.82 - distance * 0.26);
            const blur = isActive ? 0 : distance * 1.5;
            const rotate = offset * -7;

            return (
              <button
                key={project.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`absolute left-1/2 top-0 h-full w-[min(86vw,820px)] overflow-hidden rounded-2xl border text-left transition-[transform,opacity,filter,border-color] duration-500 ${
                  isActive
                    ? "border-white/50 shadow-[0_30px_70px_rgba(0,0,0,0.55)]"
                    : "border-neutral-800"
                }`}
                style={{
                  transform: `translate3d(calc(-50% + ${x}%), ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                  opacity,
                  filter: `grayscale(${isActive ? 30 : 100}%) blur(${blur}px)`,
                  zIndex: 100 - distance,
                }}
                aria-label={`View ${project.title}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  loading={isActive ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={isActive ? "high" : "low"}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/58 to-black/35" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/62 via-transparent to-black/45" />

                <div className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/55 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-300">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="absolute bottom-5 left-5 right-5">
                  <h3 className="text-2xl font-semibold leading-tight md:text-4xl">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-300 md:text-base">
                    {isActive
                      ? project.description.slice(0, 130) + "..."
                      : project.skills.slice(0, 2).join(" / ")}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        <Motion.div
          className="mt-7 flex items-center justify-center gap-3"
          variants={fadeUp}
        >
          <Motion.button
            type="button"
            onClick={() => setActiveIndex((prev) => wrapIndex(prev - 1, total))}
            className="rounded-full border border-neutral-700 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-neutral-300 transition-colors hover:border-white hover:text-white"
            whileHover={subtleHover}
            whileTap={subtlePress}
          >
            Prev
          </Motion.button>

          <Motion.span
            className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-500"
            variants={fadeUp}
          >
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </Motion.span>

          <Motion.button
            type="button"
            onClick={() => setActiveIndex((prev) => wrapIndex(prev + 1, total))}
            className="rounded-full border border-neutral-700 px-4 py-2 font-mono text-xs uppercase tracking-[0.18em] text-neutral-300 transition-colors hover:border-white hover:text-white"
            whileHover={subtleHover}
            whileTap={subtlePress}
          >
            Next
          </Motion.button>
        </Motion.div>

        <Motion.div
          className="mx-auto mt-7 w-full max-w-5xl rounded-2xl border border-neutral-800 bg-neutral-950/70 p-6 md:p-7"
          variants={fadeUp}
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-2xl font-semibold tracking-tight md:text-3xl">
              {activeProject.title}
            </h3>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-neutral-500">
              Active Project
            </p>
          </div>

          <p className="mt-4 max-w-4xl text-sm leading-relaxed text-neutral-300 md:text-base">
            {activeProject.description}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {activeProject.skills.map((skill) => (
              <span
                key={`${activeProject.title}-${skill}`}
                className="rounded-full border border-neutral-700 px-3 py-1 font-mono text-xs uppercase tracking-[0.14em] text-neutral-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            {activeProject.links.map((link) => {
              const isDisabled = !link.url || link.url === "#";

              if (isDisabled) {
                return (
                  <span
                    key={`${activeProject.title}-${link.text}`}
                    className="inline-flex items-center rounded-lg border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-500"
                  >
                    {link.text}
                  </span>
                );
              }

              return (
                <Motion.a
                  key={`${activeProject.title}-${link.text}`}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg border border-neutral-600 px-4 py-2 text-sm text-white transition-colors hover:bg-white hover:text-black"
                  whileHover={subtleHover}
                  whileTap={subtlePress}
                >
                  {link.text}
                </Motion.a>
              );
            })}
          </div>
        </Motion.div>

        <Motion.p
          className="mt-6 text-center font-mono text-xs uppercase tracking-[0.18em] text-neutral-600"
          variants={fadeUp}
        >
          Use arrow keys, side cards, or prev/next.
        </Motion.p>
      </Motion.div>

    </Motion.section>
  );
}
