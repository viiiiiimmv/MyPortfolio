import { useMemo, useState } from "react";
import {
  AnimatePresence,
  motion as Motion,
  useReducedMotion,
} from "framer-motion";
import {
  fadeUp,
  sectionReveal,
  viewportConfig,
} from "../lib/motion";

const STACK_CATEGORIES = [
  {
    id: "languages",
    label: "Languages",
    items: [
      { name: "Java", meta: "Backend · OOP · DSA" },
      { name: "C#", meta: "Backend · Web · .NET" },
      { name: "JavaScript", meta: "Frontend · Backend · Web" },
      { name: "SQL", meta: "Queries · Data Modeling · Databases" },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    items: [
      { name: "React", meta: "Components · State · Interfaces" },
      { name: "Next.js", meta: "Routing · Rendering · Full-stack UI" },
      { name: "Tailwind CSS", meta: "Responsive UI · Design Systems" },
      { name: "HTML", meta: "Semantic Markup · Accessibility" },
      { name: "CSS", meta: "Layout · Motion · Responsive Design" },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    items: [
      { name: "Spring Boot", meta: "Java APIs · Services" },
      { name: "Node.js", meta: "Runtime · APIs · Tooling" },
      { name: "Express.js", meta: "Routing · Middleware · REST" },
      { name: "REST APIs", meta: "Contracts · Resources · Integration" },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    items: [
      { name: "PostgreSQL", meta: "Relational Data · SQL" },
      { name: "MySQL", meta: "Schema Design · Queries" },
      { name: "MongoDB", meta: "Documents · Flexible Data" },
    ],
  },
  {
    id: "infrastructure",
    label: "Infrastructure",
    items: [
      { name: "Docker", meta: "Containers · Local Environments" },
      { name: "Git", meta: "Version Control · Branching" },
      { name: "GitHub Actions", meta: "CI · Automation" },
      { name: "Vercel", meta: "Frontend Deployments" },
      { name: "Render", meta: "Services · Deployments" },
    ],
  },
  {
    id: "concepts",
    label: "Concepts",
    items: [
      { name: "Data Structures & Algorithms", meta: "Complexity · Problem Solving" },
      { name: "Object-Oriented Programming", meta: "Models · Abstractions" },
      { name: "Database Systems", meta: "Schema · Transactions · Queries" },
      { name: "Authentication", meta: "Sessions · Security · Access" },
      { name: "API Design", meta: "Contracts · Resources · DX" },
      { name: "System Design", meta: "Scalability · Boundaries · Tradeoffs" },
    ],
  },
];

export default function EngineeringStack() {
  const [activeCategoryId, setActiveCategoryId] = useState("languages");
  const shouldReduceMotion = useReducedMotion();

  const activeCategory = useMemo(
    () =>
      STACK_CATEGORIES.find((category) => category.id === activeCategoryId) ||
      STACK_CATEGORIES[0],
    [activeCategoryId]
  );

  const contentTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.32, ease: [0.22, 1, 0.36, 1] };

  return (
    <Motion.section
      id="stack"
      className="relative overflow-hidden bg-black py-20 text-white md:py-28"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
      aria-labelledby="engineering-stack-title"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <Motion.div className="max-w-3xl" variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
            ENGINEERING STACK
          </p>
          <h2
            id="engineering-stack-title"
            className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl"
          >
            Tools, technologies, and concepts I use to build software.
          </h2>
        </Motion.div>

        <Motion.div className="mt-12 border-b border-white/16" variants={fadeUp}>
          <div
            className="flex gap-x-7 gap-y-4 overflow-x-auto pb-5 md:flex-wrap md:overflow-visible"
            role="tablist"
            aria-label="Engineering stack categories"
          >
            {STACK_CATEGORIES.map((category) => {
              const isActive = category.id === activeCategory.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`stack-panel-${category.id}`}
                  id={`stack-tab-${category.id}`}
                  onClick={() => setActiveCategoryId(category.id)}
                  className={`group relative shrink-0 pb-3 font-mono text-xs uppercase tracking-[0.2em] outline-none transition-colors duration-300 focus-visible:text-white ${
                    isActive ? "text-emerald-300" : "text-neutral-500 hover:text-white"
                  }`}
                >
                  {category.label}
                  <span
                    className={`absolute bottom-0 left-0 h-px bg-emerald-300 transition-[width,opacity] duration-300 ${
                      isActive
                        ? "w-full opacity-100"
                        : "w-0 opacity-0 group-hover:w-full group-hover:opacity-45"
                    }`}
                    aria-hidden="true"
                  />
                </button>
              );
            })}
          </div>
        </Motion.div>

        <div className="min-h-[24rem] pt-12 md:pt-16">
          <AnimatePresence mode="wait">
            <Motion.div
              key={activeCategory.id}
              id={`stack-panel-${activeCategory.id}`}
              role="tabpanel"
              aria-labelledby={`stack-tab-${activeCategory.id}`}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 12 }}
              animate={shouldReduceMotion ? false : { opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
              transition={contentTransition}
            >
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-emerald-300">
                {activeCategory.label}
              </p>

              <div className="mt-8 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
                {activeCategory.items.map((item) => (
                  <div
                    key={item.name}
                    className="group border-t border-white/12 pt-5 transition-colors duration-300 hover:border-emerald-300/45"
                  >
                    <p className="text-3xl font-normal leading-tight tracking-normal text-neutral-100 transition-colors duration-300 group-hover:text-white md:text-5xl">
                      {item.name}
                    </p>
                    <p className="mt-3 translate-y-1 font-mono text-xs uppercase tracking-[0.14em] text-neutral-600 opacity-80 transition-all duration-300 group-hover:translate-y-0 group-hover:text-emerald-300 group-hover:opacity-100">
                      {item.meta}
                    </p>
                  </div>
                ))}
              </div>
            </Motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Motion.section>
  );
}
