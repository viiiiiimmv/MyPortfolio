import { motion as Motion } from "framer-motion";
import {
  fadeUp,
  sectionReveal,
  staggerChildren,
  subtleHover,
  viewportConfig,
} from "../lib/motion";

const ABOUT_SIGNALS = [
  {
    label: "Who I Am",
    lead: "Shiv Chauhan. Builder. Operator.",
    text: "A full-stack developer who takes products from idea to dependable release.",
  },
  {
    label: "What I Specialize In",
    lead: "React + Node execution.",
    text: "Fast interfaces, resilient APIs, and maintainable architecture built for product growth.",
  },
  {
    label: "What Makes Me Different",
    lead: "Product judgment + engineering depth.",
    text: "I optimize user clarity and long-term code health in the same decision loop.",
  },
  {
    label: "Value I Bring",
    lead: "Higher velocity. Less rework.",
    text: "Teams ship faster with cleaner systems and UX that feels deliberate.",
  },
];

export default function Terminal() {
  return (
    <Motion.section
      id="about"
      className="relative min-h-[88vh] w-full overflow-hidden bg-black text-white"
      initial="hidden"
      whileInView="show"
      viewport={viewportConfig}
      variants={sectionReveal}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/3 top-20 h-56 w-56 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-20 right-8 h-52 w-52 rounded-full bg-cyan-300/10 blur-3xl" />
      </div>

      <Motion.div
        className="relative z-10 mx-auto flex min-h-[88vh] w-full max-w-6xl flex-col justify-center px-6 py-14 md:px-10 md:py-16"
        variants={staggerChildren}
      >
        <Motion.p
          className="text-xs uppercase tracking-[0.28em] text-neutral-500"
          style={{ fontFamily: "Synonym, sans-serif" }}
          variants={fadeUp}
        >
          About / Focused Value
        </Motion.p>

        <Motion.h2
          className="mt-3 max-w-4xl text-4xl font-semibold leading-tight tracking-tight md:text-6xl"
          style={{ fontFamily: "Clash Grotesk, sans-serif" }}
          variants={fadeUp}
        >
          Full-stack execution with product sense.
        </Motion.h2>

        <Motion.p
          className="mt-4 max-w-3xl text-base leading-relaxed text-neutral-300 md:text-lg"
          style={{ fontFamily: "Satoshi, sans-serif" }}
          variants={fadeUp}
        >
          I build web products that <span className="font-semibold text-white">ship fast</span>,{" "}
          <span className="font-semibold text-white">scale cleanly</span>, and{" "}
          <span className="font-semibold text-white">feel clear</span>. The focus is
          strong outcomes without unnecessary complexity.
        </Motion.p>

        <Motion.div
          className="mt-8 grid items-start gap-5 md:mt-9 md:grid-cols-[minmax(0,0.55fr)_minmax(0,1fr)] md:gap-7"
          variants={fadeUp}
        >
          <div className="self-start">
            <Motion.div
              className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 md:p-5"
              style={{ fontFamily: "Satoshi, sans-serif" }}
              whileHover={subtleHover}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                Positioning
              </p>
              <p className="mt-3 text-lg leading-relaxed text-neutral-100">
                Product-focused full-stack engineer for teams that need{" "}
                <span className="font-semibold text-white">clean execution</span> and{" "}
                <span className="font-semibold text-white">dependable delivery</span>.
              </p>

              <div className="mt-4 border-t border-white/10 pt-3">
                <p
                  className="text-xs uppercase tracking-[0.18em] text-neutral-500"
                  style={{ fontFamily: "Synonym, sans-serif" }}
                >
                  Open to full-time and high-impact contract roles
                </p>
              </div>
            </Motion.div>
          </div>

          <Motion.ul className="space-y-1" variants={staggerChildren}>
            {ABOUT_SIGNALS.map((signal, index) => (
              <Motion.li
                key={signal.label}
                className="group rounded-xl border border-transparent px-3 py-3 transition-colors duration-300 hover:border-white/15"
                variants={fadeUp}
                whileHover={subtleHover}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p
                      className="text-[11px] uppercase tracking-[0.22em] text-neutral-500"
                      style={{ fontFamily: "Synonym, sans-serif" }}
                    >
                      {signal.label}
                    </p>

                    <p
                      className="mt-1.5 text-base leading-relaxed text-neutral-200 md:text-lg"
                      style={{ fontFamily: "Satoshi, sans-serif" }}
                    >
                      <span className="font-bold text-white">
                        {signal.lead}{" "}
                      </span>
                      {signal.text}
                    </p>
                  </div>

                  <span
                    className="mt-0.5 text-xs uppercase tracking-[0.16em] text-neutral-600 transition-colors duration-300 group-hover:text-neutral-200"
                    style={{ fontFamily: "Synonym, sans-serif" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </Motion.li>
            ))}
          </Motion.ul>
        </Motion.div>

        <Motion.p
          className="mt-6 text-xs uppercase tracking-[0.18em] text-neutral-600"
          style={{ fontFamily: "Synonym, sans-serif" }}
          variants={fadeUp}
        >
          Strong systems. Clear UX. Reliable execution.
        </Motion.p>
      </Motion.div>
    </Motion.section>
  );
}
