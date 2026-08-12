import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  sectionReveal,
  viewportConfig,
} from "../lib/motion";

const timelineItems = [
  {
    year: "2022",
    label: "01",
    type: "Education",
    title: "B.E. Computer Science & Engineering",
    organization: "Chandigarh University",
    date: "2022 — 2026",
    details: ["CGPA: 7.9"],
    topics: ["Computer Science", "Software Engineering", "DSA", "DBMS", "Web Development"],
    state: "completed",
  },
  {
    year: "2026",
    label: "02",
    type: "Professional Training",
    title: "Capgemini",
    organization: "Technical Training",
    date: "2026",
    topics: ["Java", ".NET", "Azure", "Power Skills"],
    state: "completed",
  },
  {
    year: "2026",
    label: "03",
    type: "Next Chapter",
    title: "Software Engineer",
    organization: "Capgemini",
    date: "Joining 2026",
    status: "Upcoming",
    state: "upcoming",
  },
];

export default function Journey() {
  const shouldReduceMotion = useReducedMotion();
  const lineAnimation = shouldReduceMotion
    ? { scaleY: 1 }
    : { scaleY: 1, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } };

  return (
    <Motion.section
      id="journey"
      className="relative overflow-hidden bg-black py-20 text-white md:py-28"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
      aria-labelledby="journey-title"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <Motion.div className="max-w-3xl" variants={fadeUp}>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500">
            THE JOURNEY
          </p>
          <h2
            id="journey-title"
            className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl"
          >
            Where I started, what I learned, where I'm going.
          </h2>
        </Motion.div>

        <div className="relative mt-14 md:mt-20">
          <Motion.div
            className="absolute bottom-10 left-[4.65rem] top-3 w-px origin-top bg-white/16 md:left-[11.9rem]"
            initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
            whileInView={lineAnimation}
            viewport={viewportConfig}
            aria-hidden="true"
          />

          <div className="space-y-12 md:space-y-16">
            {timelineItems.map((item, index) => {
              const showYear =
                index === 0 || item.year !== timelineItems[index - 1].year;
              const isUpcoming = item.state === "upcoming";

              return (
                <Motion.article
                  key={`${item.label}-${item.type}`}
                  className="grid grid-cols-[4rem_1.25rem_minmax(0,1fr)] gap-x-4 md:grid-cols-[10rem_1.8rem_minmax(0,1fr)] md:gap-x-6"
                  variants={fadeUp}
                >
                  <div className="pt-1 text-right">
                    {showYear ? (
                      <span className="font-mono text-2xl text-neutral-300 md:text-5xl">
                        {item.year}
                      </span>
                    ) : (
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-700">
                        same year
                      </span>
                    )}
                  </div>

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

                  <div
                    className={`border-t pt-5 ${
                      isUpcoming ? "border-emerald-300/35" : "border-white/14"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
                        {item.label} / {item.type}
                      </span>
                      {item.status ? (
                        <span className="border border-emerald-300/40 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-300">
                          {item.status}
                        </span>
                      ) : null}
                    </div>

                    <h3
                      className={`mt-4 text-2xl leading-tight tracking-tight md:text-4xl ${
                        isUpcoming ? "font-semibold" : "font-medium"
                      }`}
                    >
                      {item.title}
                    </h3>

                    <p className="mt-2 text-lg font-medium text-neutral-200">
                      {item.organization}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.14em] text-neutral-500">
                      <span>{item.date}</span>
                      {item.details?.map((detail) => (
                        <span key={detail}>{detail}</span>
                      ))}
                    </div>

                    {item.topics?.length ? (
                      <p className="mt-5 max-w-3xl text-sm leading-relaxed text-neutral-400">
                        {item.topics.join(" · ")}
                      </p>
                    ) : null}
                  </div>
                </Motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </Motion.section>
  );
}
