import { motion as Motion, useReducedMotion } from "framer-motion";
import {
  fadeUp,
  sectionReveal,
  viewportConfig,
} from "../lib/motion";

const currently = [
  "Software Engineering",
  "Full-Stack Development",
  "AI Systems",
];

const exploring = [
  "System Design",
  "AI Engineering",
  "Application Security",
  "Distributed Systems",
];

const workflow = ["Think", "Build", "Test", "Ship", "Iterate"];

function InterestBlock({ title, items }) {
  return (
    <Motion.div variants={fadeUp}>
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-neutral-500">
        {title}
      </p>
      <div className="mt-3 h-px w-16 bg-white/28" />
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="text-base text-neutral-300 md:text-lg">
            {item}
          </li>
        ))}
      </ul>
    </Motion.div>
  );
}

export default function Terminal() {
  const shouldReduceMotion = useReducedMotion();
  const lineTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: [0.22, 1, 0.36, 1] };

  return (
    <Motion.section
      id="about"
      className="relative overflow-hidden bg-black py-20 text-white md:py-28"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
      aria-labelledby="about-title"
    >
      <div className="mx-auto w-full max-w-7xl px-5 md:px-10">
        <Motion.p
          id="about-title"
          className="font-mono text-xs uppercase tracking-[0.28em] text-neutral-500"
          variants={fadeUp}
        >
          A LITTLE ABOUT ME
        </Motion.p>

        <div className="mt-10 grid gap-12 border-y border-white/14 py-10 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] md:gap-16 md:py-14">
          <Motion.div variants={fadeUp}>
            <h2 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl">
              I like turning ideas into software that actually ships.
            </h2>

            <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-neutral-300 md:text-lg">
              <p>
                I'm a Computer Science engineer focused on full-stack
                development, backend systems, AI, and developer tooling. I enjoy
                understanding problems deeply, building practical solutions, and
                taking projects from an initial idea to something people can
                actually use.
              </p>
              <p>
                I'm particularly interested in backend engineering, system
                design, AI systems, and the engineering decisions that make
                software reliable beyond the prototype.
              </p>
            </div>
          </Motion.div>

          <div className="grid content-start gap-10 md:border-l md:border-white/12 md:pl-10">
            <InterestBlock title="Currently" items={currently} />
            <InterestBlock title="Exploring" items={exploring} />
          </div>
        </div>

        <Motion.div className="pt-8" variants={fadeUp}>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 font-mono text-[11px] uppercase tracking-[0.16em] text-neutral-500 md:gap-x-5">
            {workflow.map((step, index) => (
              <span key={step} className="flex items-center gap-4 md:gap-5">
                <span>{step}</span>
                {index < workflow.length - 1 ? (
                  <Motion.span
                    className="h-px w-8 origin-left bg-white/25 md:w-14"
                    initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={viewportConfig}
                    transition={lineTransition}
                    aria-hidden="true"
                  />
                ) : null}
              </span>
            ))}
          </div>
        </Motion.div>
      </div>
    </Motion.section>
  );
}
